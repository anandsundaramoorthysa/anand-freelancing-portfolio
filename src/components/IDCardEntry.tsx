import { useState, useRef, useEffect, useCallback } from 'react';

interface IDCardEntryProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

const MAX_ROTATION = 15;
const ROPE_X_DRAG_FACTOR = 0.08; // Adjusted for better feel
const ROPE_Y_DRAG_FACTOR = 0.08; // Adjusted for better feel
const RETURN_ANIMATION_DURATION = 800;
const CARD_INITIAL_Y_OFFSET = -400; // Starting position far above
const CARD_DROP_FINAL_Y_OFFSET_FROM_CENTER = 0; // Final resting Y position for the card's center
const CARD_DROP_ANIMATION_DURATION = 800; // How long the initial drop animation takes
const CONTENT_FADE_IN_DELAY = 300; // Delay before text and scanner appear after component mount

// Define card dimensions for calculations (w-80 h-48 in Tailwind)
const ID_CARD_HEIGHT_TAILWIND = 48;
const TAILWIND_UNIT_TO_PX = 4; // Default Tailwind unit conversion
const ID_CARD_HEIGHT_PX = ID_CARD_HEIGHT_TAILWIND * TAILWIND_UNIT_TO_PX; // 48 * 4 = 192px

// New constants for spring physics
const SPRING_STIFFNESS = 0.1; // How quickly it pulls back
const DAMPING_FACTOR = 0.85; // How much it slows down (0.85 is good for a slightly bouncy feel)
const MAX_ROPE_DRAG_OFFSET = 120; // Limit how far the rope can be distorted horizontally/vertically

export const IDCardEntry = ({ onUnlock, isUnlocked }: IDCardEntryProps) => {
  const [isDragging, setIsDragging] = useState(false);
  // Position is relative to the container's center (0,0)
  const [position, setPosition] = useState({ x: 0, y: CARD_INITIAL_Y_OFFSET });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInScanner, setIsInScanner] = useState(false);
  // ropeOffset now represents the *deviation* from a straight vertical line
  const [ropeOffset, setRopeOffset] = useState({ x: 0, y: 0 });

  // For spring physics simulation of rope
  const ropeVelocity = useRef({ x: 0, y: 0 });
  const targetRopeOffset = useRef({ x: 0, y: 0 }); // Where the rope *wants* to be

  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [showWelcomeAndScanner, setShowWelcomeAndScanner] = useState(false);
  const [cardDropAnimationDone, setCardDropAnimationDone] = useState(false);

  // New state for dynamic lanyard SVG path, SVG height/width will be fixed to viewport
  const [lanyardPathD, setLanyardPathD] = useState(""); // Starts empty

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // This is the full viewport container
  const scannerZoneRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const ropeAnimationFrameRef = useRef<number>(); // New ref for rope animation loop

  // Initial setup: document title, connection check, content fade-in
  useEffect(() => {
    document.title = "Welcome | Anand Works";

    const checkConnection = async () => {
      setConnectionStatus('checking');
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const isOnline = navigator.onLine;
        setConnectionStatus(isOnline ? 'connected' : 'error');
      } catch (error) {
        setConnectionStatus('error');
      }
    };
    checkConnection();

    const contentTimer = setTimeout(() => {
      setShowWelcomeAndScanner(true);
    }, CONTENT_FADE_IN_DELAY);

    return () => {
      clearTimeout(contentTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (ropeAnimationFrameRef.current) {
        cancelAnimationFrame(ropeAnimationFrameRef.current);
      }
    };
  }, []);

  // --- Rope Physics Animation Loop ---
  // This runs continuously to simulate spring physics for the rope's "sag"
  const startRopePhysicsAnimation = useCallback(() => {
    const animateRope = () => {
      // Calculate spring force
      const forceX = (targetRopeOffset.current.x - ropeOffset.x) * SPRING_STIFFNESS;
      const forceY = (targetRopeOffset.current.y - ropeOffset.y) * SPRING_STIFFNESS;

      // Apply force to velocity, then damping
      ropeVelocity.current.x = (ropeVelocity.current.x + forceX) * DAMPING_FACTOR;
      ropeVelocity.current.y = (ropeVelocity.current.y + forceY) * DAMPING_FACTOR;

      // Update current rope offset
      setRopeOffset(prev => ({
        x: prev.x + ropeVelocity.current.x,
        y: prev.y + ropeVelocity.current.y,
      }));

      // Continue animation if significant movement or far from target
      if (
        Math.abs(ropeVelocity.current.x) > 0.1 || Math.abs(ropeVelocity.current.y) > 0.1 ||
        Math.abs(targetRopeOffset.current.x - ropeOffset.x) > 1 || Math.abs(targetRopeOffset.current.y - ropeOffset.y) > 1
      ) {
        ropeAnimationFrameRef.current = requestAnimationFrame(animateRope);
      } else {
        // Snap to target if very close and stop to save resources
        setRopeOffset(targetRopeOffset.current);
        ropeVelocity.current = { x: 0, y: 0 };
        cancelAnimationFrame(ropeAnimationFrameRef.current!);
        ropeAnimationFrameRef.current = undefined; // Reset ref
      }
    };

    // Only start if not already running
    if (!ropeAnimationFrameRef.current) {
      ropeAnimationFrameRef.current = requestAnimationFrame(animateRope);
    }
  }, [ropeOffset]); // ropeOffset is a dependency because setRopeOffset is called based on its previous value

  // Effect for the initial card drop animation, dependent on connectionStatus
  useEffect(() => {
    if (connectionStatus === 'connected' && !cardDropAnimationDone) {
      const startTime = Date.now();
      const animateInitialDrop = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / CARD_DROP_ANIMATION_DURATION, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

        // Card Y position relative to container's center
        const currentCardY = CARD_INITIAL_Y_OFFSET + (CARD_DROP_FINAL_Y_OFFSET_FROM_CENTER - CARD_INITIAL_Y_OFFSET) * easedProgress;
        setPosition(prev => ({
          ...prev,
          y: currentCardY
        }));

        // Also update the target rope offset during the drop for a smoother start
        // The rope should initially be straight and follow the card down
        targetRopeOffset.current = { x: 0, y: 0 }; // Rope should be centered initially

        startRopePhysicsAnimation(); // Ensure rope animation is active during drop

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateInitialDrop);
        } else {
          setCardDropAnimationDone(true); // Mark animation as complete
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
          }
          // After drop, rope should settle
          targetRopeOffset.current = { x: 0, y: 0 }; // Ensure it settles to straight
          startRopePhysicsAnimation();
        }
      };
      animationFrameRef.current = requestAnimationFrame(animateInitialDrop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [connectionStatus, cardDropAnimationDone, startRopePhysicsAnimation]);


  // Effect to update lanyard SVG path based on card's *absolute* position
  useEffect(() => {
    if (cardRef.current && containerRef.current && connectionStatus === 'connected') {
      const containerRect = containerRef.current.getBoundingClientRect(); // Viewport dimensions
      const cardRect = cardRef.current.getBoundingClientRect();

      // Absolute coordinates of the attachment point on the card (top-center of card)
      // This is relative to the viewport.
      const cardAttachmentXAbsolute = cardRect.left + cardRect.width / 2;
      const cardAttachmentYAbsolute = cardRect.top;

      // The lanyard path starts at the top-center of the viewport.
      const pathStartX = containerRect.width / 2;
      const pathStartY = 0;

      // The lanyard path ends at the card's attachment point.
      // These coordinates are relative to the *SVG's* top-left, which is (0,0) as it covers the viewport.
      const pathEndX = cardAttachmentXAbsolute;
      const pathEndY = cardAttachmentYAbsolute;

      // Now, calculate the control points for the cubic Bezier curve.
      // These are influenced by the `ropeOffset` (deviation from straight)
      // The `ropeOffset` is applied *relative to the midpoint* of the straight line.
      const midX = (pathStartX + pathEndX) / 2;
      const midY = (pathStartY + pathEndY) / 2;

      // Control Point 1: Closer to the top, influenced more by ropeOffset.x (horizontal sway)
      // and less by ropeOffset.y (vertical sag for horizontal movement)
      const controlPoint1X = pathStartX + (ropeOffset.x * 0.7);
      const controlPoint1Y = midY + (ropeOffset.y * 0.2); // Smaller sag influence here

      // Control Point 2: Closer to the card, influenced less by ropeOffset.x
      // and more by ropeOffset.y (to emphasize sag closer to card)
      const controlPoint2X = pathEndX + (ropeOffset.x * 0.3);
      const controlPoint2Y = midY + (ropeOffset.y * 0.8); // Larger sag influence here

      setLanyardPathD(`M${pathStartX},${pathStartY} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${pathEndX},${pathEndY}`);

    } else {
      setLanyardPathD(""); // Empty path if not connected or refs not ready
    }
  }, [position, ropeOffset, connectionStatus]); // Rerun when card position, ropeOffset, or connection status changes


  const animateReturn = useCallback(() => {
    const startPosition = { ...position };
    const startRotation = { ... rotation };
    const startTime = Date.now();
    const duration = RETURN_ANIMATION_DURATION;

    // Set target rope offset to zero for return animation
    targetRopeOffset.current = { x: 0, y: 0 };
    startRopePhysicsAnimation(); // Ensure rope animates back

    const easeOutBounce = (t: number): number => {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutBounce(progress);

      // Animate card position and rotation back to resting state
      setPosition({
        x: startPosition.x * (1 - easedProgress),
        y: startPosition.y * (1 - easedProgress) + CARD_DROP_FINAL_Y_OFFSET_FROM_CENTER * easedProgress
      });
      setRotation({
        x: startRotation.x * (1 - easedProgress),
        y: startRotation.y * (1 - easedProgress)
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure it snaps to zero perfectly at the end of the animation
        setPosition({ x: 0, y: CARD_DROP_FINAL_Y_OFFSET_FROM_CENTER });
        setRotation({ x: 0, y: 0 });
        // Final snap for rope as well, though physics loop should handle
        targetRopeOffset.current = { x: 0, y: 0 };
        startRopePhysicsAnimation();
      }
    };

    animate();
  }, [position, rotation, startRopePhysicsAnimation]); // Dependencies for useCallback

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the container
    const mouseX = e.clientX - (containerRect.left + containerRect.width / 2);
    const mouseY = e.clientY - (containerRect.top + containerRect.height / 2);

    // Set card position relative to its "rest" state (0,0)
    setPosition({ x: mouseX, y: mouseY });

    // Calculate rotation based on mouse position relative to container
    const rotX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, (mouseY / containerRect.height) * 30));
    const rotY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, -(mouseX / containerRect.width) * 30));
    setRotation({ x: rotX, y: rotY });

    // Calculate desired rope offset based on card's deviation from central vertical line
    // The rope should sag in the direction the card is pulled
    let desiredRopeOffsetX = mouseX * ROPE_X_DRAG_FACTOR;
    let desiredRopeOffsetY = Math.abs(mouseY) * ROPE_Y_DRAG_FACTOR; // Sag mostly downwards when pulled down

    // Clamp the target rope offset to prevent extreme distortions
    desiredRopeOffsetX = Math.max(-MAX_ROPE_DRAG_OFFSET, Math.min(MAX_ROPE_DRAG_OFFSET, desiredRopeOffsetX));
    desiredRopeOffsetY = Math.max(0, Math.min(MAX_ROPE_DRAG_OFFSET, desiredRopeOffsetY)); // ensure it's always non-negative for sag

    targetRopeOffset.current = { x: desiredRopeOffsetX, y: desiredRopeOffsetY };
    startRopePhysicsAnimation(); // Ensure animation loop is running

    const scannerZone = scannerZoneRef.current;
    if (scannerZone) {
      const scannerRect = scannerZone.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const isOverlapping = !(
        cardRect.right < scannerRect.left ||
        cardRect.left > scannerRect.right ||
        cardRect.bottom < scannerRect.top ||
        cardRect.top > scannerRect.bottom
      );
      setIsInScanner(isOverlapping);
    }
  }, [isDragging, startRopePhysicsAnimation]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (isInScanner) {
      onUnlock();
    } else {
      animateReturn();
    }
    setIsInScanner(false);
  }, [isDragging, isInScanner, onUnlock, animateReturn]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (connectionStatus !== 'connected' || isUnlocked) return; // Only allow dragging if connected and not unlocked

    setIsDragging(true);
    // When starting to drag, snap the card's current position to the mouse
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const mouseX = e.clientX - (containerRect.left + containerRect.width / 2);
      const mouseY = e.clientY - (containerRect.top + containerRect.height / 2);
      setPosition({ x: mouseX, y: mouseY });

      // Immediately set rope target to current mouse position relative deviation
      targetRopeOffset.current = {
        x: mouseX * ROPE_X_DRAG_FACTOR,
        y: Math.abs(mouseY) * ROPE_Y_DRAG_FACTOR // Initial sag
      };
      startRopePhysicsAnimation();
    }
  }, [connectionStatus, isUnlocked, startRopePhysicsAnimation]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // It's crucial to cancel animation frames on unmount or when not needed
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      if (ropeAnimationFrameRef.current) {
        cancelAnimationFrame(ropeAnimationFrameRef.current);
        ropeAnimationFrameRef.current = undefined;
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Establishing secure connection...';
      case 'connected':
        return 'Drag the ID card to the scanner to access the portfolio';
      case 'error':
        return 'Connection issue detected. Please try again.';
      default:
        return 'Drag the ID card to the scanner to access the portfolio';
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-transparent to-transparent animate-pulse" />

      <div className="absolute inset-0 z-30 pointer-events-none"> {/* Full screen SVG container */}
        {connectionStatus === 'connected' && (
          <svg width="100%" height="100%" className="lanyard">
            <defs>
              <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="50%" stopColor="hsl(var(--muted-foreground))" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
              <linearGradient id="lanyardHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path
              d={lanyardPathD}
              stroke="url(#lanyardGradient)"
              strokeWidth="4" // Adjusted stroke width for visual rope thickness
              fill="none"
              className="drop-shadow-sm"
              strokeLinecap="round"
              strokeLinejoin="round" // Add this for smoother corners if applicable
            />
            <path
              d={lanyardPathD}
              stroke="url(#lanyardHighlight)"
              strokeWidth="1.5" // Thinner highlight
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(1,0)" // Offset highlight to one side of the rope
            />
          </svg>
        )}
      </div>

      <div className={`absolute top-1/4 text-center max-w-2xl mx-auto px-6 transition-opacity duration-1000 ease-out ${showWelcomeAndScanner ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Welcome
        </h1>

        {connectionStatus === 'checking' && (
          <div className="w-64 mx-auto mb-6">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                style={{ width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        )}

        <p className={`text-lg text-muted-foreground mb-8 transition-all duration-500 ${connectionStatus === 'connected' ? 'opacity-100' : 'opacity-60'
          }`}>
          {getConnectionStatusText()}
        </p>

      </div>

      {connectionStatus === 'connected' && (
        <div ref={scannerZoneRef} className={`scanner-zone absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-48 rounded-xl flex items-center justify-center transition-opacity duration-1000 ease-out ${showWelcomeAndScanner ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
          <div className="text-center">
            <div className={`text-2xl mb-2 transition-all duration-300 ${isInScanner ? 'animate-bounce' : ''}`}>
              {isInScanner ? '✨' : '🔍'}
            </div>
            <div className="text-sm text-muted-foreground">
              {isInScanner ? 'Release to unlock!' : 'Drop ID card here'}
            </div>
          </div>
        </div>
      )}

      {connectionStatus === 'error' && (
        <div className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ease-out ${showWelcomeAndScanner ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={() => setConnectionStatus('checking')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            Retry Connection
          </button>
        </div>
      )}

      {connectionStatus === 'connected' && (
        <>
          {/* ID Card */}
          <div
            ref={cardRef}
            className={`id-card w-80 h-48 rounded-xl cursor-grab active:cursor-grabbing select-none z-40
              ${isDragging ? 'scale-105 shadow-2xl z-50' : 'animate-swing hover:scale-102'
            } ${isUnlocked ? 'animate-unlock' : ''}`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d', // Crucial for 3D effect
              filter: isDragging ? 'brightness(1.1)' : 'none',
              // Use explicit transition for return, none for drag
              transition: isDragging ? 'none' : `transform ${RETURN_ANIMATION_DURATION}ms ${isUnlocked ? 'linear' : 'ease-out'}`,
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="h-full p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Pin at the very top center of the card, inside the card div */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border border-gray-500 shadow-sm z-50">
                <div className="absolute inset-0.5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" />
                <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full" />
              </div>

              <div className="flex justify-between items-start">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Freelancing Portfolio
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="Anand.jpg"
                    alt="Anand"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">ANAND SUNDARAMOORTHY SA</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Freelancer
                  </p>
                </div>
              </div>

              <div></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
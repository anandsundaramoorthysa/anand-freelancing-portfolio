import { useState, useRef, useEffect, useCallback } from 'react';

interface IDCardEntryProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

const MAX_ROTATION = 15;
const ROPE_X_DRAG_FACTOR = 0.3;
const ROPE_Y_DRAG_FACTOR = 0.2;
const RETURN_ANIMATION_DURATION = 800;
const CARD_DROP_DELAY = 300;
const TEXT_FADE_IN_DELAY = 1000;

export const IDCardEntry = ({ onUnlock, isUnlocked }: IDCardEntryProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInScanner, setIsInScanner] = useState(false);
  const [ropeOffset, setRopeOffset] = useState({ x: 0, y: 0 });
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [showWelcomeAndScanner, setShowWelcomeAndScanner] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerZoneRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

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

    setPosition({ x: 0, y: -200 });
    setTimeout(() => {
      setPosition({ x: 0, y: 0 });
      setRopeOffset({ x: 0, y: 0 });
    }, CARD_DROP_DELAY);


    const textTimer = setTimeout(() => {
      setShowWelcomeAndScanner(true);
    }, TEXT_FADE_IN_DELAY);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  const animateReturn = useCallback(() => {
    const startPosition = { ...position };
    const startRotation = { ...rotation };
    const startRopeOffset = { ...ropeOffset };
    const startTime = Date.now();
    const duration = RETURN_ANIMATION_DURATION;

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

      setPosition({
        x: startPosition.x * (1 - easedProgress),
        y: startPosition.y * (1 - easedProgress)
      });
      setRotation({
        x: startRotation.x * (1 - easedProgress),
        y: startRotation.y * (1 - easedProgress)
      });
      setRopeOffset({
        x: startRopeOffset.x * (1 - easedProgress),
        y: startRopeOffset.y * (1 - easedProgress)
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate(); 
  }, [position, rotation, ropeOffset]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - containerRect.width / 2;
    const y = e.clientY - containerRect.top - containerRect.height / 2;

    setPosition({ x, y });
    lastPositionRef.current = { x, y };

    const rotX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, (y / containerRect.height) * 30));
    const rotY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, -(x / containerRect.width) * 30));
    setRotation({ x: rotX, y: rotY });

    const ropeX = x * ROPE_X_DRAG_FACTOR;
    const ropeY = Math.max(0, y * ROPE_Y_DRAG_FACTOR);
    setRopeOffset({ x: ropeX, y: ropeY });

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
  }, [isDragging]);

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
    setIsDragging(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: offsetX, y: offsetY });
      lastPositionRef.current = { x: offsetX, y: offsetY };
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return '⏳';
      case 'connected':
        return '🔒';
      case 'error':
        return '⚠️';
      default:
        return '🔒';
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-transparent to-transparent animate-pulse" />

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
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out z-30"
            style={{
              transform: `translate(calc(-50% + ${ropeOffset.x}px), ${ropeOffset.y}px)`,
            }}
          >
            <svg width="4" height="160" className="lanyard">
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" />
                  <stop offset="50%" stopColor="hsl(var(--muted-foreground))" />
                  <stop offset="100%" stopColor="hsl(var(--muted))" />
                </linearGradient>
              </defs>
              <path
                d={`M2,0 Q${2 + ropeOffset.x * 0.5},${80 + ropeOffset.y * 0.5} 2,160`}
                stroke="url(#lanyardGradient)"
                strokeWidth="6"
                fill="none"
                className="drop-shadow-sm"
              />
            </svg>
          </div>

          <div
            className="absolute transition-all duration-500 ease-out z-40"
            style={{
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y + 158}px))`,
              left: '50%',
              top: '50%'
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border border-gray-500 shadow-sm relative">
              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" />
              <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full" />
            </div>
          </div>

          <div
            ref={cardRef}
            className={`id-card w-80 h-48 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-500 ${isDragging ? 'scale-105 shadow-2xl z-50' : 'animate-swing hover:scale-102 z-40'
              } ${isUnlocked ? 'animate-unlock' : ''}`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              filter: isDragging ? 'brightness(1.1)' : 'none',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="h-full p-6 flex flex-col justify-between relative overflow-hidden">
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
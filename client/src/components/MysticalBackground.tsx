import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export function MysticalBackground() {
  const [hearts, setHearts] = useState<Array<{ id: number; delay: number; left: number }>>([]);

  useEffect(() => {
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      left: Math.random() * 100,
    }));
    setHearts(heartElements);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1548] via-[#2d1b3d] to-[#1a0f2e]" />
      
      <div className="absolute inset-0">
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute text-pink-400/20 animate-heart-float"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-white/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${8 + Math.random() * 8}px`,
              height: `${8 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
  );
}

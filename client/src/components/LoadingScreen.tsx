import { Heart } from "lucide-react";
import { MysticalBackground } from "./MysticalBackground";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";

interface LoadingScreenProps {
  message: string;
  submessages?: string[];
}

export function LoadingScreen({ message, submessages }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <MysticalBackground />
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img 
              src={logoUrl} 
              alt="ReveLove.IA" 
              className="w-24 h-24 animate-pulse-glow"
            />
            <Heart 
              className="absolute inset-0 m-auto text-primary/50 animate-ping" 
              size={60}
              fill="currentColor"
            />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6" data-testid="loading-message">
          {message}
        </h2>

        {submessages && submessages.length > 0 && (
          <div className="space-y-3 max-w-md mx-auto">
            {submessages.map((msg, index) => (
              <p
                key={index}
                className="text-sm md:text-base text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {msg}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-1 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

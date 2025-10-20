interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index < currentStep
              ? "w-8 bg-primary"
              : index === currentStep
              ? "w-12 bg-primary animate-pulse-glow"
              : "w-2 bg-muted"
          }`}
          data-testid={`progress-dot-${index}`}
        />
      ))}
    </div>
  );
}

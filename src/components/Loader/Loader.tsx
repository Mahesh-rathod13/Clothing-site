const Loader = ({
  variant = "default",
  size = "md",
  text = "",
  className = "",
  overlay = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Spinning Dots Loader
  const SpinningDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  );

  // Spinning Ring Loader
  const SpinningRing = () => (
    <div
      className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
    />
  );

  // Pulse Loader
  const Pulse = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1.2s",
          }}
        />
      ))}
    </div>
  );

  // Wave Loader
  const Wave = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-2 bg-blue-500 rounded-t-sm animate-bounce"
          style={{
            height: `${Math.random() * 20 + 10}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );

  // Orbiting Loader
  const Orbiting = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
      <div
        className="absolute inset-2 rounded-full border-2 border-purple-500 border-b-transparent animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      ></div>
    </div>
  );

  // Grid Loader
  const Grid = () => (
    <div className="grid grid-cols-3 gap-1">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-sm animate-pulse"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>
  );

  const getLoaderComponent = () => {
    switch (variant) {
      case "dots":
        return <SpinningDots />;
      case "ring":
        return <SpinningRing />;
      case "pulse":
        return <Pulse />;
      case "wave":
        return <Wave />;
      case "orbit":
        return <Orbiting />;
      case "grid":
        return <Grid />;
      default:
        return <SpinningRing />;
    }
  };

  const LoaderContent = () => (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {getLoaderComponent()}
      {text && (
        <p
          className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
};

export default Loader;

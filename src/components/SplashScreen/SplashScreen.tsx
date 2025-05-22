import { useEffect, useState } from "react";

const SPLASH_SCREEN_MESSAGES: string[] = [
  //Short & Catchy
  "Your next favorite thing is just a click away.",
  "Shop Smarter. Live Better.",
  "Ready, Set, Shop!",
  "Unbox Happiness.",
  "Curated for You.",

  //Benefit-Oriented
  "Discover deals that delight.",
  "Style your life, effortlessly.",
  "Find exactly what you're looking for (and more!).",
  "Quality products, unbeatable prices.",
  "Experience shopping, redefined.",

  //Playful & Engaging
  "Warning: May cause extreme shopping satisfaction.",
  "Get ready to fill your cart!",
  "Your daily dose of retail therapy starts now.",
  "We've got something special for you.",
  "Let the Browse begin!",

  //Modern & Sleek
  "Future of Shopping. Now.",
  "Elevate Your Everyday.",
  "Designed for Your Desires.",
  "Seamless Shopping Awaits.",
  "Innovation in Every Item.",
];

const index = Math.floor(Math.random() * SPLASH_SCREEN_MESSAGES.length);

const SplashScreen = () => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const animationDuration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500"
        style={{
          clipPath: `circle(${animationProgress * 150}% at 0% 0%)`,
          transition: "clip-path 0.1s ease-out",
        }}
      />

      {/* Content */}
      <div className="text-center relative z-10">
        <div className="mb-8">
          <div
            className={`
              w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl 
              transition-all duration-700 ease-in-out transform bg-white scale-100
            `}
          >
            <span
              className={`
                text-4xl font-sans transition-all duration-700 ease-in-out transform bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent scale-100
              `}
            >
              A
            </span>
          </div>
        </div>
        <h1
          className={`
            font-sans text-7xl font-light text-blue-900 tracking-wider uppercase border-b border-gray-300 pb-1 mb-2 transition-all duration-700 ease-in-out transform
            ${
              animationProgress > 0.5
                ? "text-white scale-105 drop-shadow-lg animate-pulse"
                : "text-gray-800 scale-100"
            }
          `}
        >
          Aesthetica
        </h1>
        <p
          className={`
            text-lg opacity-90 mb-4 transition-all duration-700 ease-in-out transform
            ${
              animationProgress > 0.5
                ? "text-white/90 scale-105 drop-shadow-md"
                : "text-gray-600 scale-100"
            }
          `}
        >
          {SPLASH_SCREEN_MESSAGES[index]}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

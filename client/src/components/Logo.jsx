import React, { useState, useEffect } from "react";

const Logo = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const targetText = "TRNC";
  const [animationInterval, setAnimationInterval] = useState(null);
  const [animationTimeout, setAnimationTimeout] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    startAnimation();

    // Cleanup function to clear intervals and timeouts
    return () => {
      if (animationInterval) clearInterval(animationInterval);
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, []);

  const startAnimation = () => {
    let iteration = 0;

    // Clear existing interval and timeout
    if (animationInterval) clearInterval(animationInterval);
    if (animationTimeout) clearTimeout(animationTimeout);

    const interval = setInterval(() => {
      const newText = Array.from({ length: targetText.length }, (_, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      }).join("");

      setText(newText);

      if (iteration >= targetText.length) {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          startAnimation();
        }, 3000);
        setAnimationTimeout(timeout);
      }

      iteration += 1;
    }, 100);

    setAnimationInterval(interval);
  };

  return (
    <p className="items-center cursor-pointer text-2xl font-bold tracking-wide">
      {text}
    </p>
  );
};

export default Logo;

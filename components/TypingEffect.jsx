"use client";

import { useEffect, useState } from "react";

export default function TypingEffect() {

  const texts = [
    "Software Engineer",
    "Backend Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {

    const currentText = texts[textIndex];

    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {

      if (!isDeleting) {

        setDisplayText(
          currentText.substring(
            0,
            displayText.length + 1
          )
        );

        if (
          displayText === currentText
        ) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }

      } else {

        setDisplayText(
          currentText.substring(
            0,
            displayText.length - 1
          )
        );

        if (displayText === "") {
          setIsDeleting(false);

          setTextIndex(
            (textIndex + 1) % texts.length
          );
        }

      }

    }, speed);

    return () => clearTimeout(timer);

  }, [
    displayText,
    isDeleting,
    textIndex,
    texts
  ]);

  return (
    <span className="text-cyan-400">
      {displayText}
      <span className="animate-pulse">
        |
      </span>
    </span>
  );
}   
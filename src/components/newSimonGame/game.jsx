import React, { useState, useRef, useEffect } from "react";
import GameBtn1 from "./gameBtn";

const colors = ["green", "red", "yellow", "blue"];

export default function Game1() {
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(null); // ← חדש

  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  const resetGame = () => {
    setLastScore(score); // ← שמירת הניקוד האחרון
    setScore(0);         // ← איפוס הניקוד
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handleColorClick = (e) => {
    if (playing) {
      e.target.style.opacity = 0.5;

      setTimeout(() => {
        e.target.style.opacity = 1;
        const clickColor = e.target.getAttribute("color");
        if (sequence[playingIdx] === clickColor) {
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              updateScores();
              addNewColor();
            }, 250);
          } else {
            setPlayingIdx(playingIdx + 1);
          }
        } else {
          resetGame();
          alert("You lost! Your score: " + score); // ← הצגת ניקוד בשלב ההפסד
        }
      }, 250);
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;
        if (sequence[idx] === "green") ref = greenRef.current;
        if (sequence[idx] === "red") ref = redRef.current;
        if (sequence[idx] === "yellow") ref = yellowRef.current;
        if (sequence[idx] === "blue") ref = blueRef.current;

        if (ref) {
          setTimeout(() => {
            ref.style.filter = "brightness(2.5)";
            setTimeout(() => {
              ref.style.filter = "brightness(1)";
              if (idx < sequence.length - 1) showSequence(idx + 1);
            }, 250);
          }, 250);
        }
      };
      showSequence();
    }
  }, [sequence]);

  const updateScores = () => {
    setScore((prev) => prev + 10);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800 text-white">
      {/* ניקוד נוכחי + ניקוד אחרון */}
      <div className="text-center mb-4">
        <p className="text-lg sm:text-xl font-semibold">Score: {score}</p>
        {lastScore !== null && (
          <p className="text-sm sm:text-md text-gray-400">
            Last Player Score: {lastScore}
          </p>
        )}
      </div>

      <div className="relative flex flex-col justify-center items-center">
        <div>
          <GameBtn1
            border="rounded-tl-full"
            color="green"
            bg="bg-green-500"
            onClick={handleColorClick}
            ref={greenRef}
          />
          <GameBtn1
            border="rounded-tr-full"
            color="red"
            bg="bg-red-500"
            onClick={handleColorClick}
            ref={redRef}
          />
        </div>
        <div>
          <GameBtn1
            border="rounded-bl-full"
            color="yellow"
            bg="bg-yellow-400"
            onClick={handleColorClick}
            ref={yellowRef}
          />
          <GameBtn1
            border="rounded-br-full"
            color="blue"
            bg="bg-blue-500"
            onClick={handleColorClick}
            ref={blueRef}
          />
        </div>
        <button
          className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105"
          onClick={handleNextLevel}
        >
          {sequence.length === 0 ? "Play" : sequence.length}
        </button>
      </div>
    </div>
  );
}

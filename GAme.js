import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const scenarios = [
  {
    id: 1,
    text: "The government imposes an excise tax on luxury goods.",
    answer: "Taxation",
  },
  {
    id: 2,
    text: "A factory is shut down for violating environmental laws.",
    answer: "Police Power",
  },
  {
    id: 3,
    text: "The government expropriates a piece of private land to build a highway.",
    answer: "Eminent Domain",
  },
  {
    id: 4,
    text: "A law is passed banning smoking in public places.",
    answer: "Police Power",
  },
  {
    id: 5,
    text: "A 12% value-added tax is implemented on all goods and services.",
    answer: "Taxation",
  },
  {
    id: 6,
    text: "A heritage site is declared a public domain for preservation purposes.",
    answer: "Eminent Domain",
  },
  {
    id: 7,
    text: "The government mandates vaccination during a health emergency.",
    answer: "Police Power",
  },
  {
    id: 8,
    text: "Private farmland is acquired to build a public dam.",
    answer: "Eminent Domain",
  },
  {
    id: 9,
    text: "The government collects income taxes from all employed citizens.",
    answer: "Taxation",
  },
  {
    id: 10,
    text: "A law prohibits the sale of dangerous drugs.",
    answer: "Police Power",
  },
];

const Game = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (choice) => {
    const isCorrect = choice === scenarios[currentScenario].answer;

    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.textContent === scenarios[currentScenario].answer) {
        button.style.backgroundColor = "#4CAF50"; // Green for correct answer
      } else {
        button.style.backgroundColor = "#F44336"; // Red for incorrect answers
      }
    });

    if (!isCorrect) {
      const emojiContainer = document.getElementById("emoji");
      emojiContainer.textContent = "😢"; // Show crying emoji
      setTimeout(() => {
        emojiContainer.textContent = ""; // Clear crying emoji after delay
      }, 2000);
    }

    setTimeout(() => {
      if (currentScenario + 1 < scenarios.length) {
        setCurrentScenario(currentScenario + 1);
      } else {
        setShowResult(true);
      }

      buttons.forEach((button) => {
        button.style.backgroundColor = ""; // Reset button color
      });
    }, 2000);
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        {!showResult ? (
          <CardContent>
            <motion.h1
              className="text-xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Scenario {currentScenario + 1} of {scenarios.length}
            </motion.h1>
            <motion.p
              className="text-gray-700 text-lg mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {scenarios[currentScenario].text}
            </motion.p>
              <div className="grid grid-cols-1 gap-4">
                {["Police Power", "Taxation", "Eminent Domain".map((choice) => (
                  <Button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    className="w-full py-2 text-base font-semibold"
                  >
                    {choice}
                  </Button>
                ))]}
            </div>
            <div id="emoji" className="text-center text-4xl mt-4"></div>
          </CardContent>
        ) : (
          <CardContent className="text-center">
            <motion.h1
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Game Over!
            </motion.h1>
            <motion.p
              className="text-gray-700 text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your Score: {score} / {scenarios.length}
            </motion.p>
            <Button onClick={resetGame} className="py-2 text-base font-semibold">
              Play Again
            </Button>
          </CardContent>
        )}
      </Card>
      <p className="mt-4 text-gray-500 text-sm text-center">Prepared by: Sharmila Cruz</p>
    </div>
  );
};

export default Game;
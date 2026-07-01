import "./App.css";
import React from "react";
import { clsx } from "clsx";
import { getFarewellText, randomWord } from "./utils";
import Confetti from "react-confetti";

// import Languages from "../components/Languages";
import programmingLanguages from "./programmingLanguages";

function App() {
  const [currentWord, setCurrentWord] = React.useState(() => randomWord());
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= programmingLanguages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const langElements = programmingLanguages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const className = clsx(
      "relative px-2 py-1 rounded",
      isLanguageLost &&
        "before:content-['💀'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:bg-black/70 before:text-sm",
    );

    return (
      <span
        className={`rounded-[3px] p-[4.5px] text-black ${lang.color} ${className}`}
        key={lang.name}
      >
        {lang.lang}
      </span>
    );
  });

  function startNewGame() {
    setCurrentWord(randomWord());
    setGuessedLetters([]);
  }
  const letterElement = currentWord.split("").map((cur) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(cur);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(cur) && "bg-[#EC5D49]",
    );
    return (
      <span
        className={`${letterClassName} h-10 w-10 bg-[#323232] flex justify-center items-center text-[1.125rem] border-b border-b-[#F9F4DA]`}
      >
        {shouldRevealLetter ? cur.toUpperCase() : ""}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  const alphabetElement = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx(
      "w-10 h-10 border border-gray-400 rounded font-medium",
      {
        "bg-[#10A95B]": isCorrect,
        "bg-[#EC5D49]": isWrong,
        "bg-yellow-400": !isCorrect && !isWrong, // default color
      },
    );

    return (
      <button
        key={letter}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-50 text-black`}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx(
    "rounded flex flex-col items-center justify-center  w-full max-w-[350px] min-h-[60px] mx-auto",
    isGameWon &&
      "bg-[#10A95B] rounded flex flex-col items-center justify-center  w-full max-w-[350px] mx-auto",
    isGameLost &&
      "bg-[#BA2A2A] rounded flex flex-col items-center justify-center  w-full max-w-[350px] mx-auto",
    !isGameOver &&
      isLastGuessIncorrect &&
      "bg-[#7A5EA7] border border-dashed border-[#323232]",
  );

  const renderGameStatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="text-[20px] font-medium text-[#F9F4DA]">
          {getFarewellText(programmingLanguages[wrongGuessCount - 1].lang)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <p className="text-[20px] font-medium text-[#F9F4DA]">You Win</p>
          <p className="text-[16px] font-medium text-[#F9F4DA]">
            Well done! 🎉
          </p>
        </>
      );
    }

    if (isGameLost)
      return (
        <>
          <p className="text-[20px] font-medium text-[#F9F4DA]">Game Over</p>

          <p className="text-[16px] font-medium text-[#F9F4DA]">
            You lose! Better start learning Assembly 😭
          </p>
        </>
      );
    return null;
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#262626] text-[#D9D9D9] p-5">
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header className="text-center mb-9">
        <h1 className="text-[1.25rem] font-medium text-[#F9F4DA]">
          Assembly:Endgame
        </h1>

        <p className="text-[0.875rem] max-w-87.5  text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>

      <section className="flex flex-wrap justify-center gap-1.25 max-w-87.5 ">
        {langElements}
      </section>
      <section className="flex justify-center gap-0.5 my-8 mx-auto">
        {letterElement}
      </section>

      <section className="flex flex-wrap justify-center gap-2 max-w-112.5 mb-9 mx-auto">
        {alphabetElement}
      </section>
      {isGameOver && (
        <button
          onClick={startNewGame}
          className="bg-[#11B5E5] border border-[#D7D7D7] rounded w-56.25 h-10 px-3 py-1.5 block mx-auto cursor-pointer"
        >
          New Game
        </button>
      )}
    </main>
  );
}

export default App;

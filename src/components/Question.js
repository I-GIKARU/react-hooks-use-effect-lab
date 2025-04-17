import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    let timerId;
    
    if (timeRemaining > 0) {
      // Set up timeout to decrement timer every second
      timerId = setTimeout(() => {
        const newTimeRemaining = timeRemaining - 1;
        setTimeRemaining(newTimeRemaining);
        
        // Call onAnswered with false when timer reaches 0
        if (newTimeRemaining === 0) {
          onAnswered(false);
        }
      }, 1000);
    }
    
    // Clean up function to clear the timeout when component unmounts
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timeRemaining, onAnswered]);
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

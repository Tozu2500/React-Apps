import React, {useState, useEffect} from 'react';

const Question = ({ question, currentQuestion, totalQuestions, selectedAnswer, onAnswerSelect, showFeedback, isCorrect, onUseHint, hintsUsed }) => {
  const [hintsUsed, setHintUsed] = useState(false);

  // Reset hint state when the question changes
  useEffect(() => {
    setHintUsed(false);
  }, [currentQuestion]);

  const handleUseHint = () => {
    setHintUsed(true);
    onUseHint();
  };

  // Remove one wrong answer when a hint is used
  const getFilteredOptions = () => {
    if (!hintUsed) return question.options;

    const wrongIndexes = question.options
      .map((_, index) => index)
      .filter(index => index !== question.correctAnswer);

    // Remove one random wrong answer
    const indexToRemove = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];

    return question.options.map((opt, idx) => 
      idx === indexToRemove ? null : opt
    );
  };

  const filteredOptions = getFilteredOptions();

  // Keyboard support
  useEffect(() => {
    // Don't listen for keyboard if answer is already selected
    if (selectedAnswer !== null) return;

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      const keyMap = {'1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3};

      if (key in keyMap) {
        const answerIndex = keyMap[key];
        // Check if this option is available and not filtered by the hint
        if (filteredOptions[answerIndex] !== null) {
          onAnswerSelect(answerIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedAnswer, filteredOptions, onAnswerSelect]);

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-number">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        {!hintUsed && selectedAnswer === null && (
          <button className="hint-button" onClick={handleUseHint} aria-label="Use hint to eliminate one wrong answer">
            Use a Hint
          </button>
        )}
      </div>

      <h2 className="question-text">{question.question}</h2>

      {selectedAnswer === null && (
        <p className="keyboard-hint">Tip: Press 1-4 or A-D on your keyboard to select</p>
      )}

      {showFeedback && (
        <div className={`feedback-banner ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`} role="alert">
          {isCorrect ? 'Correct!' : 'Wrong Answer!'}
        </div>
      )}

      <div className="options-container">
        {question.options.map((option, index) => {
          if (filteredOptions[index] === null) return null;

          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const shouldShowCorrect = showFeedback && isCorrectOption;
          const shouldShowWrong = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              className={`option-button ${isSelected ? 'selected' : ''} ${shouldShowCorrect ? 'correct-option' : ''} ${shouldShowWrong ? 'wrong-option' : ''}`}
              onClick={() => onAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {shouldShowCorrect && <span className="option-icon" aria-label="Correct answer">✓</span>}
              {shouldShowWrong && <span className="option-icon" aria-label="Wrong answer">✗</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;

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

  // Remove one answer when a hint is used
  
}
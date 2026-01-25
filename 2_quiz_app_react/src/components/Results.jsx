import React from 'react';

const Results = ({ score, totalQuestions, answers, questions, onRestart, onBackToHome, hintsUsed, timeSpent }) => {
  // Safety check
  if (!questions || questions.length === 0) {
    return (
      <div className="results-container">
        <div className="results-header">
          <h1>Error</h1>
        </div>
        <p>No quiz data is available...</p>
        <button className="back-home-button" onClick={onBackToHome}>
          Back to home
        </button>
      </div>
    );
  }

  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', emoji: '🏆' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!', emoji: '🏆' };
    if (percentage >= 70) return { grade: 'B', message: 'Well Done!', emoji: '🏆' };
    if (percentage >= 60) return { grade: 'C', message: 'Great Effort!', emoji: '🏆' };
    if (percentage >= 50) return { grade: 'D', message: 'Keep Practicing!', emoji: '🏆' };
    return { grade: 'F', message: 'Try Again!', emoji: '🏆' };
  };

  const gradeInfo = getGrade();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Quiz Complete</h1>
        <div className="results-emoji">{gradeInfo.emoji}</div>
      </div>

      <div className="score-summary">
        <div className="score-circle">
          <div className="score-value">{percentage}%</div>
          <div className="score-grade">{gradeInfo.grade}</div>
        </div>
        <h2 className="score-message">{gradeInfo.message}</h2>
        <p className="score-details">
          You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly
        </p>
        <div className="quiz-stats">
          <span className="stat-item">Time: {formatTime(timeSpent)}</span>
          {hintsUsed > 0 && <span className="stat-item">Hints used: {hintsUsed}</span>}
        </div>
      </div>

      <div className="answers-review">
        <h3>Review your answers!</h3>
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const wasTimeout = userAnswer === -1;

          return (
            <div key={question.id} className={`answer-item ${isCorrect} ? 'correct' : 'incorrect'`}>
              <div className="answer-header">
                <span className="answer-number">Q{index + 1}</span>
                <span className={`answer-status ${isCorrect ? 'status-correct' : 'status-incorrect'}`}>
                  {wasTimeout ? 'Time is up' : isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <p className="answer-question">{question.question}</p>
              <div className="answer-details">
                {!wasTimeout && (
                  <p className="user-answer">
                    Your answer: <span>{question.options[userAnswer]}</span>
                  </p>
                )}
                {!isCorrect && (
                  <p className="correct-answer">
                    Correct answer: <span>{question.options[question.correctAnswer]}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="restart-button" onClick={onRestart}>
        Take the quiz again
      </button>

      <button className="back-home-button" onClick={onBackToHome}>
        Back to home
      </button>
    </div>
  );
};

export default Results;
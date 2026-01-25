import React, {useState} from 'react';

const CustomQuizCreator = ({ onStartCustomQuiz, onCancel }) => {
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 15
    }
  ]);
  const [quizName, setQuizName] = useState('');
  const [saveQuiz, setSaveQuiz] = useState(false);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = parseInt(value);
    setQuestions(newQuestions);
  };

  const handleTimeLimitChange = (qIndex, value) => {
    const newQuestions = [...questions];
    const timeValue = parseInt(value) || 15;
    // Ensure the time limit is between 5 and 60secs
    newQuestions[qIndex].timeLimit = Math.max(5, Math.min(60, timeValue));
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        timeLimit: 15
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const getValidQuestions = () => {
    return questions.filter(q => 
      q.question.trim() !== '' &&
      q.options.every(opt => opt.trim() !== '')
    );
  };

  const formatQuestions = (validQuestions) => {
    return validQuestions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      timeLimit: q.timeLimit
    }));
  };

  const validateAndStart = () => {
    const validateQuestions = getValidQuestions();

    if (validQuestions.length === 0) {
      alert("Please add at least one complete question with all options filled");
      return;
    }

    if (saveQuiz && quizName.trim() === '') {
      alert("Please enter a name for your quiz");
      return;
    }

    const formattedQuestions = formatQuestions(validQuestions);
    onStartCustomQuiz(formattedQuestions, saveQuiz, quizName);
  };

  const exportToJSON = () => {
    const validQuestions = getValidQuestions();

    if (validQuestions.length === 0) {
      alert("Please add at least one complete question with all options filled");
      return;
    }

    const formattedQuestions = formatQuestions(validQuestions);
    const jsonString = JSON.stringify(formattedQuestions, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quizName.trim() || 'custom-quiz'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const validQuestions = getValidQuestions();

    if (validQuestions.length === 0) {
      alert("Please add at least one complete question with all options filled");
      return;
    }

    const formattedQuestions = formatQuestions(validQuestions);

    // Create the CSV header
    let csvContent = 'Question,Option1,Option2,Option3,Option4,CorrectAnswer,TimeLimit\n';

    // Each question as a row
    formattedQuestions.forEach(q => {
      const escapedQuestion = `"${q.question.replace(/"/g, '""')}"`;
      const escapedOptions = q.options.map(opt => `"${opt.replace(/"/g, '""')}"`);
      csvContent += `${escapedQuestion},${escapedOptions.join(',')},${q.correctAnswer},${q.timeLimit}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${quizName.trim() || 'custom-quiz'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="custom-quiz-creator">
      <div className="creator-header">
        <h2>Create your custom quiz</h2>
        <button className="close-creator" onClick={onCancel}>✕</button>
      </div>

      <div className="quiz-name-section">
        <label className="save-quiz-checkbox">
          <input
            type="checkbox"
            checked={saveQuiz}
            onChange={(e) => setSaveQuiz(e.target.checked)}
          />
          Save this quiz for later
        </label>
        {saveQuiz && (
          <input 
            type="text"
            className="quiz-name-input"
            placeholder="Enter quiz name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        )}
      </div>
      
      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={qIndex} className="question-editor">
            <div className="question-editor-header">
              <h3>Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <button
                  className="remove-question-btn"
                  onClick={() => removeQuestion(qIndex)}
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="text"
              className="question-input"
              placeholder="Enter your question"
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />

            <div className="options-editor">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option-editor">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctAnswer === oIndex}
                    onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                  />
                  <input
                    type="text"
                    className="option-input"
                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                    value={option}
                    onChange={() => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="time-limit-editor">
              <label>Time limit {seconds}:</label>
              <input
                type="number"
                min="5"
                max="60"
                value={question.timeLimit}
                onChange={() => handleTimeLimitChange(qIndex, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="creator-actions">
        <button className="add-question-btn" onClick={addQuestion}>
          + Add question
        </button>
        <button className="start-custom-quiz-btn" onClick={validateAndStart}>
          Start quiz ({questions.filter(q => q.question.trim() !== '').length} questions)
        </button>
      </div>

      <div className="export-section">
        <h3>Export Quiz</h3>
        <p className="export-hint">Save your quiz to a file in JSON or CSV</p>
        <div className="export-buttons">
          <button className="export-json-btn" onClick={exportToJSON}>
            Export as JSON
          </button>
          <button className="export-csv-btn" onClick={exportToCSV}>
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomQuizCreator;
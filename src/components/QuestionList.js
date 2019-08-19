import React, {useEffect, useState} from 'react';
import Question from './Question';

const App = ({data}) => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [moreQuestions, setMoreQuestions] = useState(true);
  const [remainingQuestions, setRemainingQuestions] = useState(null)

  useEffect(() => {
    fetch("/api/v1/questions.json")
    .then(res => {
      if (!res.ok) { throw new Error("Fetch did not work: " + res.status)}
      return res.json()
    })
    .then(json => {
      setJsonData(json);
      setCurrentQuestionId(json.questions[0].id)
      setLoading(false);
      setRemainingQuestions(json.questions.map((question) => question.id).filter((question) => question !== json.questions[0].id))
    })
  }, [])

  const nextQuestion = (event) => {
    event.preventDefault();
    if (remainingQuestions.length > 0){
      let newQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
      setCurrentQuestionId(newQuestion);
      let newRemainingQuestions = remainingQuestions.filter((question) => question !== newQuestion)
      setRemainingQuestions(newRemainingQuestions);
    } else {
      setMoreQuestions(false);
    }
  }

  return(
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">React Quiz</span>
      </nav>
      { moreQuestions ? 
        <div id = "main" className = "d-flex justify-content-center">
          {
            loading ? 
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div> : 
              <Question 
                key = {currentQuestionId}
                data = {jsonData.questions.find((question) => question.id === currentQuestionId)}
                clickHandler = {nextQuestion}
              />
            } 
        </div>
        : 
        <div className = "text-center">
          <h3 id = "final">No More Questions</h3>
        </div>
      }
    </div>
  )
}

export default App

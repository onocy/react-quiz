import React, {useState} from 'react';
import Answer from './Answer';

const Question = (props) => {
    const data = props.data
    const nextQuestionClickHandler = props.clickHandler

    const [clickedId, setClickedId] = useState(null);
    const [clickedCorrect, setClickedCorrect] = useState(null);

    const checkIfFavorite = (id) => {
        return (id === data.correctAnswerId) ? setClickedCorrect(true) : setClickedCorrect(false);
    }

    const answers = data.answers.map((answer) => {
        const clickHandler = (event) => {
            event.preventDefault(); 
            setClickedId(answer.id)
            checkIfFavorite(answer.id)
        }

        return (
            <Answer
                key = {answer.id}
                answer = {answer}
                clickHandler = {clickHandler}
                clicked = {clickedId === answer.id}
            />
        );
    })

    return (
        <div>
            {
            data && 
            <div className = "text-center">
                <h2 className = "text-info">{data.body}</h2>
                <ul className = "list-group">
                    {answers}
                    <h4 id = "result">
                        { clickedId != null ? 
                            clickedCorrect ? 
                                <p className = "text-success">Correct!</p> 
                                : <p className = "text-danger">Incorrect</p> 
                            : ""}
                    </h4>
                </ul>
                <button onClick = {nextQuestionClickHandler} type="button" className="btn btn-success ">Next Question</button>
            </div>
            }
        </div>
    );
}

export default Question;
import React from 'react';

const Answers = (props) => {
    const answer = props.answer
    const selectedClass = props.clicked ? "list-group-item active" : "list-group-item"
    return (
        <li onClick = {props.clickHandler} id = "answer" className = {selectedClass}>
            {answer.body}
        </li>   
    );
}

export default Answers;
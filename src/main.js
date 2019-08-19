import React from 'react';
import ReactDOM from 'react-dom';
import QuestionList from './components/QuestionList'
import data from './constants/data';

ReactDOM.render(
  <QuestionList data={data}/>,
  document.getElementById('app')
);

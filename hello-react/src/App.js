import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

function App() {
  const text = '당신은 어썸한가요?';
  const condition = false;
  return (
    <div>
      <h1>리액트 안녕!</h1>
      <h2>{text}</h2>
      {
        condition && '보여주세요'
      }
    </div>
  );
}

export default App;

import React, {Component, Fragment} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

function App() {
  const text = '당신은 어썸한가요?';
  return (
    <div>
      <h1>리액트 안녕!</h1>
      <h2>{text}</h2>
    </div>
  );
}

export default App;

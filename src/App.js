import React,{ useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Chatbot from './components/Chatbot/Chatbot';

import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes';

import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch])


  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        <Chatbot />
      </Router>
    </div>
  );
}

export default App;

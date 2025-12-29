import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { Lobby } from './pages/Lobby';
import { QuizPlayer } from './pages/QuizPlayer';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/play/:id" element={<QuizPlayer />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
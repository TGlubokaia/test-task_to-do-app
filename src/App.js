import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TasksScreen from './components/tasks-screen/tasks-screen';
import ProjectsScreen from './components/projects-screen/projects-screen';
import './App.scss';
import { AppRoute } from './utils/const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={AppRoute.ROOT} element={<ProjectsScreen />} />
        <Route path={AppRoute.PROJECT} element={<TasksScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

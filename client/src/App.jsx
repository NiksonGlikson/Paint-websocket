import React from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import SettingBar from './components/SettingBar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<><Toolbar/><SettingBar/><Canvas/></>} />
        <Route path='/' element={<><Toolbar/><SettingBar/><Canvas/><Navigate to={`/f${(+new Date()).toString(16)}`} replace/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GameProvider from './context/GameProvider';
import PlayingGame from './pages/PlayingGame';
import SetUpGame from './pages/SetUpGame';
import './App.css';

function App() {
	return (
		<GameProvider>
			<HashRouter>
				<Routes>
					<Route path='/' element={<SetUpGame />} />
					<Route path='/playing' element={<PlayingGame />} />
				</Routes>
			</HashRouter>
		</GameProvider>
	);
}

export default App;

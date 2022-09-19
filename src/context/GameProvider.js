import React, { useEffect, useState } from 'react';
import GameContext from './GameContext';
import PropTypes from 'prop-types';

export default function GameProvider({children}) {
	const [multiPlayer, setMultiPlayer] = useState(false);
	const [player1, setPlayer1] = useState('');
	const [player2, setPlayer2] = useState('');
  
	useEffect(() => {
		setMultiPlayer(JSON.parse(localStorage.getItem('multiplayer')));
	}, []);

	const objectValue = {
		multiPlayer,
		setMultiPlayer,
		player1,
		setPlayer1,
		player2,
		setPlayer2,
	};

	return(
		<GameContext.Provider value={objectValue}>
			{children}
		</GameContext.Provider>
	);
}

GameProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
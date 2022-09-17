import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

export default function SetUpGame() {
	const {multiPlayer, setMultiPlayer, setPlayer1, setPlayer2} = useContext(GameContext);

	const [player1Name, setPlayer1Name] = useState('');
	const [player2Name, setPlayer2Name] = useState('');

	const navigate = useNavigate();

	useEffect(() => setMultiPlayer(false), []);

	return (
		<div>
			<h1>Let&#039;s play Tic-Tac-Toe</h1>
			<button
				onClick={() => {
					setPlayer1('You');
					localStorage.setItem('player1', 'You');
					setPlayer2('Computer');
					localStorage.setItem('player2', 'Computer');
					navigate('/playing');
				}}
			>
        Play alone
			</button>
			<button
				onClick={() => setMultiPlayer(true)}
			>
        Play with a friend
			</button>
			{multiPlayer && (
				<div>
					<label htmlFor='player1'>
          What&#039;s your name?
						<input
							id='player1'
							onChange={({target}) => setPlayer1Name(target.value)}
						/>
					</label>
					<label htmlFor='player2'>
            What&#039;s your friend&#039;s name?
						<input
							id='player2'
							onChange={({target}) => setPlayer2Name(target.value)}
						/>
					</label>
					<button
						onClick={() => {
							setPlayer1(player1Name);
							localStorage.setItem('player1', player1Name);
							setPlayer2(player2Name);
							localStorage.setItem('player2', player2Name);
							navigate('/playing');
						}}
					>
          Start game!
					</button>
				</div>
			)}
		</div>
	);
}
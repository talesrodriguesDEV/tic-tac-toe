import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

export default function SetUpGame() {
	const {multiPlayer, setMultiPlayer, setPlayer1, setPlayer2} = useContext(GameContext);

	const [player1Name, setPlayer1Name] = useState('');
	const [player2Name, setPlayer2Name] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		setMultiPlayer(false);
		localStorage.setItem('multiplayer', JSON.stringify(false));
	}, []);

	return (
		<div className='h-screen flex flex-col items-center justify-center bg-black! text-white!'>
			<h1 className='text-3xl bg-blue! w-full text-center py-10'>Tic-Tales-Toe!</h1>
			<div className='flex flex-col md:flex-row md:w-1/2 md:justify-around mt-16'>
				<button
					className='btn btn-dark text-xl mb-8 md:mb-0'
					onClick={() => {
						setPlayer1('You');
						localStorage.setItem('player1', 'You');
						setPlayer2('Computer');
						localStorage.setItem('player2', 'Computer');
						navigate('/playing');
					}}
				>
        One player
				</button>
				<button
					className='btn btn-dark text-xl'
					onClick={() => {
						setMultiPlayer(true);
						localStorage.setItem('multiplayer', JSON.stringify(true));
					}}
				>
        Two players
				</button>
			</div>
			{multiPlayer && (
				<div className='flex flex-col md:flex-row items-center mt-20 bg-blue! w-full p-16'>
					<input
						type='text'
						placeholder='Player 1'
						className='form-control mb-10 md:mb-0 md:mr-10'
						id='player1'
						onChange={({target}) => setPlayer1Name(target.value)}
					/>
					<input
						type='text'
						placeholder='Player 2'
						className='form-control mb-10 md:mb-0 md:mr-10'
						id='player2'
						onChange={({target}) => setPlayer2Name(target.value)}
					/>
					<button
						className='btn btn-dark text-xl'
						onClick={() => {
							setPlayer1(player1Name);
							localStorage.setItem('player1', player1Name);
							setPlayer2(player2Name);
							localStorage.setItem('player2', player2Name);
							navigate('/playing');
						}}
					>
          Start
					</button>
				</div>
			)}
		</div>
	);
}
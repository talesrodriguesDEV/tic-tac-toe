import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

export default function PlayingGame() {
	const { player1, player2, setPlayer1, setPlayer2, multiPlayer } = useContext(GameContext);

	const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
	const [XO, setXO] = useState('X');
	const [player1Playing, setPlayer1Playing] = useState(true);
	const [gameResult, setGameResult] = useState('');

	const gameHasBegan = squares.some((square) => square !== '');
	const draw = squares.every((square) => square !== '');
	const isGameOver = () => {
		return (
			gameHasBegan &&
			((squares[0] !== '' && squares[0] === squares[1] && squares[1] === squares[2]) ||
				(squares[3] !== '' && squares[3] === squares[4] && squares[4] === squares[5]) ||
				(squares[6] !== '' && squares[6] === squares[7] && squares[7] === squares[8]) ||
				(squares[0] !== '' && squares[0] === squares[3] && squares[3] === squares[6]) ||
				(squares[1] !== '' && squares[1] === squares[4] && squares[4] === squares[7]) ||
				(squares[2] !== '' && squares[2] === squares[5] && squares[5] === squares[8]) ||
				(squares[0] !== '' && squares[0] === squares[4] && squares[4] === squares[8]) ||
				(squares[2] !== '' && squares[2] === squares[4] && squares[4] === squares[6]) ||
				draw)
		);
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (!player1 && !player2) {
			setPlayer1(localStorage.getItem('player1'));
			setPlayer2(localStorage.getItem('player2'));
		}
	}, []);

	useEffect(() => {
		if (gameHasBegan && !isGameOver()) XO === 'X' ? setXO('O') : setXO('X');
		else if (draw) setGameResult('It\'s a draw!');
		else setGameResult(`${player1Playing ? player2 : player1} has won!`);
		if (!multiPlayer && !player1Playing && !isGameOver()) autoPlay();
	}, [player1Playing]);

	const autoPlay = () => {
		let emptySquares = squares.map((square, index) => ({square, index })).filter(({square}) => square === '').map(({index}) => index);
		if (!gameHasBegan) emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		const squareIndex = emptySquares.sort(() => Math.random() - 0.5)[0];
		const autoXO = XO === 'X' ? 'O' : 'X';
		const newSquares = squares.map((square, index) => squareIndex === index ? autoXO : square);
		setSquares(newSquares);
		setPlayer1Playing(!player1Playing);
	};

	const play = (squareIndex) => {
		const newSquares = squares.map((square, index) => squareIndex === index ? XO : square);
		setSquares(newSquares);
		setPlayer1Playing(!player1Playing);
	};

	return (
		<div>
			<h2>{`${player1} vs ${player2}`}</h2>
			<h3>{!multiPlayer && player1Playing ? 'Your turn' : `${player1Playing ? player1 : player2}'s turn`}</h3>
			<div className='border w-64 flex flex-wrap justify-center'>
				{squares.map((square, squareIndex) => (
					<button
						disabled={isGameOver() || square !== ''}
						className='border w-20 h-20'
						key={squareIndex}
						onClick={() => play(squareIndex)}
					>
						{square}
					</button>
				))}
			</div>
			{isGameOver() && (
				<div>
					<h2>{gameResult}</h2>
					<button
						onClick={() => {
							setSquares(['', '', '', '', '', '', '', '', '']);
							if (!multiPlayer) setPlayer1Playing(!player1Playing);
						}}
					>
						Play Again
					</button>
					<button
						onClick={() => navigate('/')}
					>
						New Game
					</button>
				</div>
			)}
		</div>
	);
}
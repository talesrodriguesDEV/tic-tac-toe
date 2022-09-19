import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

export default function PlayingGame() {
	const { player1, player2, setPlayer1, setPlayer2, multiPlayer } = useContext(GameContext);

	const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
	const [XO, setXO] = useState('X');
	const [player1Playing, setPlayer1Playing] = useState(true);
	const [gameResult, setGameResult] = useState('');
	const [points1, setPoints1] = useState(0);
	const [points2, setPoints2] = useState(0);

	const gameHasBegan = squares.some((square) => square !== '');
	const draw = squares.every((square) => square !== '') && (
		!(squares[0] === squares[1] && squares[1] === squares[2]) &&
		!(squares[3] === squares[4] && squares[4] === squares[5]) &&
		!(squares[6] === squares[7] && squares[7] === squares[8]) &&
		!(squares[0] === squares[3] && squares[3] === squares[6]) &&
		!(squares[1] === squares[4] && squares[4] === squares[7]) &&
		!(squares[2] === squares[5] && squares[5] === squares[8]) &&
		!(squares[0] === squares[4] && squares[4] === squares[8]) &&
		!(squares[2] === squares[4] && squares[4] === squares[6])
	);
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
		else setGameResult(`${player1Playing ? player2 : player1} won!`);
		if (isGameOver()) player1Playing ? setPoints2(points2 + 1) : setPoints1(points1 + 1);
		if (!multiPlayer && !player1Playing && !isGameOver()) autoPlay();
	}, [player1Playing]);

	const autoPlay = () => {
		const emptySquares = squares.map((square, index) => ({square, index })).filter(({square}) => square === '').map(({index}) => index);
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
			<div><div>{points1}</div><div>{points2}</div></div>
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
							if (!multiPlayer && !player1Playing) {
								const emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
								const randomIndex = emptySquares.sort(() => Math.random() - 0.5)[0];
								const newSquares = ['', '', '', '', '', '', '', '', ''].map((square, index) => randomIndex === index ? XO : square);
								setSquares(newSquares);
								setPlayer1Playing(!player1Playing);
							}
						}}
					>
						Rematch
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
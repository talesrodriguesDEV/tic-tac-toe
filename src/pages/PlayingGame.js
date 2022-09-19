import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';

export default function PlayingGame() {
	const { player1, player2, setPlayer1, setPlayer2, multiPlayer } = useContext(GameContext);

	const navigate = useNavigate();

	const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
	const [XO, setXO] = useState('X');
	const [player1Playing, setPlayer1Playing] = useState(true);
	const [gameResult, setGameResult] = useState('');
	const [points1, setPoints1] = useState(0);
	const [points2, setPoints2] = useState(0);

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
	const isGameOver = () => (
		gameHasBegan &&
		(
			(squares[0] !== '' && squares[0] === squares[1] && squares[1] === squares[2]) ||
			(squares[3] !== '' && squares[3] === squares[4] && squares[4] === squares[5]) ||
			(squares[6] !== '' && squares[6] === squares[7] && squares[7] === squares[8]) ||
			(squares[0] !== '' && squares[0] === squares[3] && squares[3] === squares[6]) ||
			(squares[1] !== '' && squares[1] === squares[4] && squares[4] === squares[7]) ||
			(squares[2] !== '' && squares[2] === squares[5] && squares[5] === squares[8]) ||
			(squares[0] !== '' && squares[0] === squares[4] && squares[4] === squares[8]) ||
			(squares[2] !== '' && squares[2] === squares[4] && squares[4] === squares[6]) ||
			draw
		)
	);

	const autoPlay = () => {
		const emptySquares = squares.map((square, index) => ({ square, index })).filter(({ square }) => square === '').map(({ index }) => index);
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
		<div className='bg-black! h-screen min-h-fit text-white! flex flex-col items-center justify-between pb-10'>
			<div className='bg-blue! py-8 flex justify-center w-full text-2xl'>
				<div className='w-2/5 flex flex-col items-center'>
					<div>{player1}</div>
					<div className='text-3xl mt-2'>{points1}</div>
				</div>
				<div className='w-1/5 flex justify-center items-center'>vs</div>
				<div className='w-2/5 flex flex-col items-center'>
					<div>{player2}</div>
					<div className='text-3xl mt-2'>{points2}</div>
				</div>
			</div>
			<h3 className='text-3xl text-red! my-10'>{!multiPlayer && player1Playing ? 'It\'s your turn' : `It's ${player1Playing ? player1 : player2}'s turn`}</h3>
			<div className='border w-4/5 flex sm:w-5/12 lg:w-1/3 xl:w-1/4 2xl:w-1/5 flex-wrap justify-center'>
				{squares.map((square, squareIndex) => (
					<button
						disabled={isGameOver() || square !== ''}
						className='border w-1/3 aspect-square text-3xl font-bold'
						key={squareIndex}
						onClick={() => play(squareIndex)}
					>
						{square}
					</button>
				))}
			</div>
			{isGameOver() && (
				<div className='w-full flex flex-col items-center'>
					<h3 className='text-3xl my-10 text-yellow!'>{gameResult}</h3>
					<div className='w-full flex justify-around'>
						<button
							className='btn btn-dark'
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
							className='btn btn-dark'
							onClick={() => navigate('/')}
						>
							New Game
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
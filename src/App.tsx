import React, { ReactElement, useState } from "react";
import "./App.css";

interface squareInterface {
  value: string;
  onSquareClick: any;
}

function Square({ value, onSquareClick }: squareInterface) {
  return (
    <button
      type="button"
      onClick={onSquareClick}
      className="square btn btn-dark"
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [isNext, setIsNext] = useState<boolean>(true);

  const winner: any = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = `Next Player ` + (isNext ? "X" : "O");
    console.log(isNext + status);
  }

  function handleClick(i: number) {
    const nextSqueres = squares;
    if (isNext) {
      nextSqueres[i] = "X";
    } else {
      nextSqueres[i] = "O";
    }
    console.log(isNext);

    setSquares(nextSqueres);
    setIsNext(!isNext);
  }

  return (
    <>
      <div> {status}</div>
      <div className="container">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares: string[] | null[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

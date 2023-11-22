import React, { useEffect, useState } from "react";
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

interface boardInterface {
  isNext: boolean;
  squares: any;
  onPlay: (val: any) => void;
}
function Board({ isNext, squares, onPlay }: boardInterface) {
  // const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  // const [isNext, setIsNext] = useState<boolean>(true);
  const winner = calculateWinner(squares);

  let status: string;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = `Next Player ` + (isNext ? "X" : "O");
  }

  function handleClick(i: number) {
    if (winner) {
      return;
    }
    // On créer un tableau de square a chaque coup
    const nextSqueres = squares.slice();
    console.log("Next Square avant : " + nextSqueres);

    if (isNext) {
      nextSqueres[i] = "X";
    } else {
      nextSqueres[i] = "O";
    }
    console.log("Nesxt History copie de square " + nextSqueres);

    onPlay(nextSqueres);
    // console.log(isNext);

    // setSquares(nextSqueres);
    // setIsNext(!isNext);
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

export default function Game() {
  const [history, setHistory] = useState<any>([Array(9).fill(null)]);
  const [isNext, setIsNext] = useState<boolean>(false);

  // On definie le tour
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquare = history[currentMove];

  // const currentSquare = history[history.length - 1];

  useEffect(() => {
    console.log("History : " + history[0]);
  }, [history]);

  const move = history.map((value: string, index: number) => {
    let des = "";
    if (index > 0) {
      des = `Coup n° ${index}`;
    } else {
      des = "Revenir au début";
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{des}</button>{" "}
      </li>
    );
  });

  function jumpTo(nextMove: any) {
    // Mettre a jour le tour
    setCurrentMove(nextMove);
    // ??
    setIsNext(nextMove % 2 !== 0);
    console.log("nextMove % 2 !== 0" + (nextMove % 2 !== 0));
  }

  console.log("CurrentSquare : " + currentSquare);
  // Récupérer la case du coup actuel

  // HandlePlay doit mettre à jour le composant Game
  function handlePlay(nextSquare: number) {
    //Créer un tableau avec l'historique
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Créer un nouveau tableau qui contient l'ancien et le nouveau tableau
    // setHistory([...history, nexthistory]);
    setIsNext(!isNext);
  }

  return (
    <>
      <Board isNext={isNext} squares={currentSquare} onPlay={handlePlay} />
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </>
  );
}

//Fonctions
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
    if (
      squares &&
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

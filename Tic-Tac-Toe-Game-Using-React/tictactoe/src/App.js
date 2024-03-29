import { useState } from 'react';
import './App.css';

export const Square = function({ value , onSquareClick }){
 
  return <button className='square' onClick={onSquareClick}>{value}</button>;
}
export const Box = function(){
  const [ xIsNext , setXIsNext] = useState(true);
  const [ status , setStatus ] = useState("Welcome To Tic Tac Toe");
  const [squares, setSquares] = useState(Array(9).fill(null));

 
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return ;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] ='X';
    }
    else{
      nextSquares[i] ='O';
    }
    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(nextSquares);
    const isDraw = !nextSquares.includes(null) && !winner;
    if(isDraw){
      setStatus("It's a Draw");
    }
    else{
      setStatus(winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`);
    }
    
  }
  
  return(
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square  value={ squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={ squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value = { squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value = { squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value = { squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value = { squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value = { squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value = { squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value = { squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
}
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i=0;i<lines.length; i++){
    const [ a,b,c]= lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
export const Game = function(){
  const[ resetGame, setResetGame] = useState(false);
  function handleReset(){
    setResetGame(!resetGame);
  }
  return(
    <div className='container'>
    <Box key={resetGame}/>
    <button onClick={handleReset} className='reset'>RESET</button>
    </div>
  );
}



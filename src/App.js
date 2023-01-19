import React from "react";
import { useState } from "react";
import "./styles.css";
export default function App() {
  const [turn, setTurn] = useState(true);
  const [value, setValue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [who, setWho] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [youWin, setYouWin] = useState(false);
  const [AIWin, setAIWin] = useState(false);
  const Turn = () => {
    if (turn) return <span>Your Turn</span>;
    else return <span>AI Turn</span>;
  };
  const check = () => {
    console.log("I am Called");
    const winnerMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerMoves.length; i++) {
      let move = who[winnerMoves[i][0]];
      if (move === 0) continue;
      let ok = false;
      let sum = parseInt(value[winnerMoves[i][0]]);
      for (let j = 1; j < 3; j++) {
        if (who[winnerMoves[i][j]] !== move) {
          ok = true;
          break;
        }
        sum += parseInt(value[winnerMoves[i][j]]);
      }
      if (!ok && sum === 15) {
        move === 1 ? setYouWin(true) : setAIWin(true);
      }
    }
  };
  const Square = (props) => {
    if (value[props.squareIndex] === 0 && !youWin && !AIWin) {
      return (
        <input
          onChange={(e) => {
            let temp = value;
            let tt = who;
            temp[props.squareIndex] =
              e.target.value < 10 && e.target.value > 0 ? e.target.value : 0;
            tt[props.squareIndex] = turn === true ? 1 : 2;
            setValue([...temp]);
            setWho([...tt]);
            setTurn(!turn);
            check();
          }}
          value={value[props.squareIndex] === 0 ? "" : value[props.squareIndex]}
          className="shadow-md h-24 w-24 rounded-lg bg-white text-7xl text-center cursor-pointer font-light flex items center justify-center x-player"
        />
      );
    }
    return (
      <div
        className={`shadow-md h-24 w-24 rounded-lg bg-white text-7xl text-center cursor-pointer font-light flex items center justify-center  ${
          who[props.squareIndex] === 1 ? "text-red-300" : "text-blue-300"
        }`}
      >
        {value[props.squareIndex]}
      </div>
    );
  };
  const YouWin = () => {
    return <div>You Win</div>;
  };
  const AIWIN = () => {
    return <div>AI Win</div>;
  };
  return (
    <div>
      <div className="text-center py-2 shadow-sm text-gray-400 z-50 sticky">
        <Turn />
      </div>
      <section className="game-board py-10">
        <div className="max-w-md mx-auto">
          <div className="max-w-lg flex flex-col gap-5 mx-auto">
            <div className="flex gap-5 mx-auto">
              <Square squareIndex={0} />
              <Square squareIndex={1} />
              <Square squareIndex={2} />
            </div>
            <div className="flex gap-5 mx-auto">
              <Square squareIndex={3} />
              <Square squareIndex={4} />
              <Square squareIndex={5} />
            </div>
            <div className="flex gap-5 mx-auto">
              <Square squareIndex={6} />
              <Square squareIndex={7} />
              <Square squareIndex={8} />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setValue([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                setWho([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                setTurn(true);
                setAIWin(false);
                setYouWin(false);
              }}
              className="bg-blue-400 text-white w-2/4 py-2 font-semibold mt-10 rounded-md shadow-lg"
            >
              Reset
            </button>
            {youWin ? <YouWin /> : ""}
            {AIWin ? <AIWIN /> : ""}
          </div>
        </div>
      </section>
    </div>
  );
}

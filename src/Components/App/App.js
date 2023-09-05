import { useState, useEffect, useContext } from "react";
import diceBag from "./diceBag";
import "./App.css";
import Timer from "../Timer/Timer";
import { ThemeContext } from "../../context/ThemeContext";

function App() {
  const [board, setBoard] = useState([]);
  const [playing, setPlaying] = useState(false);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    setBoard(newBoard(diceBag.sixBySixDice));
  }, []);

  const newBoard = (dice) => {
    const emptyBoard = Array.from({ length: dice.length }, () =>
      Math.floor(Math.random() * 6)
    );
    const board = emptyBoard.map((value, idx) => dice[idx][value]);
    shakeDice(board);

    function shakeDice(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    return board;
  };

  const resetBoard = () => {
    board.length === 16
      ? setBoard(newBoard(diceBag.fourByFourDice))
      : board.length === 25
      ? setBoard(newBoard(diceBag.fiveByFiveDice))
      : setBoard(newBoard(diceBag.sixBySixDice));
  };

  const changeBoardSize = (e) => {
    let boardSize = e.target.value;
    switch (boardSize) {
      case "fourByFourDice":
        setBoard(newBoard(diceBag.fourByFourDice));
        break;
      case "fiveByFiveDice":
        setBoard(newBoard(diceBag.fiveByFiveDice));
        break;
      case "sixBySixDice":
        setBoard(newBoard(diceBag.sixBySixDice));
        break;
      default:
        setBoard(newBoard(diceBag.fiveByFiveDice));
        break;
    }
  };

  const copyBoard = () => {
    let secretBoard = board.map((value) => {
      if (value === "#" || value.length === 2) {
        return value;
      } else if (value === "Z") return "A";
      return String.fromCharCode(value.charCodeAt(0) + 1);
    });
    let copyText = secretBoard.join("");
    navigator.clipboard.writeText(copyText);
  };

  const pasteBoard = async () => {
    const codedBoard = await navigator.clipboard.readText();
    const decodedBoard = codedBoard.split(/(?=[A-Z#])/).map((value) => {
      if (value === "#" || value.length === 2) {
        return value;
      } else if (value === "A") return "Z";
      return String.fromCharCode(value.charCodeAt(0) - 1);
    });
    if (decodedBoard.length === board.length) setBoard(decodedBoard);
  };

  return (
    <main className={theme.isDarkTheme ? "App App__dark" : "App"}>
      <div className="app-container">
        <Timer playing={playing} setPlaying={setPlaying} />
        <section className="board-container">
          <div
            className={
              board.length === 16
                ? "board board__4"
                : board.length === 25
                ? "board board__5"
                : "board"
            }
          >
            {board.map((value, index) => (
              <div key={index} className={theme.isDarkTheme ? "dice dice__dark" : "dice"}>
                {value}
              </div>
            ))}
          </div>
        </section>
        {!playing && (
          <section className="options">
            <button onClick={resetBoard}>Shuffle Board</button>
            <select
              name="board-size-selection"
              onChange={changeBoardSize}
              defaultValue="sixBySixDice"
            >
              <option value="fourByFourDice">4x4</option>
              <option value="fiveByFiveDice">5x5</option>
              <option value="sixBySixDice">6x6</option>
            </select>
            <button onClick={copyBoard}>Copy Board</button>
            <button onClick={pasteBoard}>Enter Board</button>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;

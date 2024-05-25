"use client";

import { useState } from "react";
import styles from "./minesweeper.module.css";

function Tile({ tile, rowNum, columnNum, onTileClick, onRightClick }) {
  return (
    <button
      className={
        tile.isFlagged
          ? styles.flagged
          : tile.isClicked
          ? styles.clicked
          : styles.tile
      }
      key={columnNum}
      onClick={(event) => {
        onTileClick(event, tile, rowNum, columnNum);
      }}
      onContextMenuCapture={(event) =>
        onRightClick(event, tile, rowNum, columnNum, !tile.isFlagged)
      }
    >
      {tile.isFlagged ? "⛳️" : tile.value}
    </button>
  );
}

function Row({ row, rowNum, onTileClick, onRightClick }) {
  return (
    <div className={styles.row} key={rowNum}>
      {row.map((tile, columnNum) => {
        return (
          <Tile
            tile={tile}
            rowNum={rowNum}
            columnNum={columnNum}
            onTileClick={onTileClick}
            onRightClick={onRightClick}
            key={`${rowNum}-${columnNum}`}
          />
        );
      })}
    </div>
  );
}

function StatusBar({ gameState, initializeGame }) {
  const minesLeft = gameState.layout.flat().reduce((count, tile) => {
    if (!tile.isFlagged && tile.value === "X") {
      return (count += 1);
    }
    return count;
  }, 0);

  return (
    <div className={styles.statusBar}>
      <div>{minesLeft}</div>
      <div>
        <button onClick={(event) => initializeGame()}>
          {gameState.status === "lost"
            ? "😵"
            : gameState.status === "won"
            ? "😎"
            : "🙂"}
        </button>
      </div>
      <div>{gameState.time}</div>
    </div>
  );
}

let timer;
function Page() {
  const layout = [
    [
      { value: 1, isClicked: false, isFlagged: false },
      { value: 2, isClicked: false, isFlagged: false },
      { value: "X", isClicked: false, isFlagged: false },
    ],
    [
      { value: "X", isClicked: false, isFlagged: false },
      { value: 3, isClicked: false, isFlagged: false },
      { value: 2, isClicked: false, isFlagged: false },
    ],
    [
      { value: 2, isClicked: false, isFlagged: false },
      { value: "X", isClicked: false, isFlagged: false },
      { value: 1, isClicked: false, isFlagged: false },
    ],
  ];

  const game = {
    layout,
    status: "notStarted",
    time: 0,
  };

  const [gameState, setGameState] = useState(game);

  const onTileClick = (event, tile, row, column) => {
    if (tile.isFlagged) return;
    setGameState((currentState) => {
      const newLayout = [...currentState.layout];
      newLayout[row][column].isClicked = true;
      const lost = newLayout[row][column].value === "X";
      const won =
        newLayout.flat().reduce((total, { value, isClicked }) => {
          if (value !== "X" && !isClicked) total++;
          return total;
        }, 0) === 0;

      if ((lost || won) && timer) {
        clearInterval(timer);
        timer = null;
      }
      if (lost) {
        return { ...currentState, layout: newLayout, status: "lost" };
      }
      if (won) {
        return { ...currentState, layout: newLayout, status: "won" };
      }
      if (!timer) timer = setInterval(updateTime, 1000);
      return { ...currentState, layout: newLayout, status: "inProgress" };
    });
  };

  const onRightClick = (event, tile, row, column, shouldAddFlag) => {
    event.preventDefault();
    setGameState((currentState) => {
      if (currentState.status === "lost") return { ...currentState };
      const newLayout = [...currentState.layout];
      newLayout[row][column].isFlagged = shouldAddFlag;
      return { ...currentState, layout: newLayout, status: "inProgress" };
    });
  };

  const updateTime = () => {
    setGameState((state) => {
      return { ...state, time: state.time++ };
    });
  };

  const initializeGame = () => {
    setGameState((state) => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return { ...state, layout, time: 0, status: "inProgress" };
    });
  };

  return (
    <article className={styles.board}>
      <StatusBar gameState={gameState} initializeGame={initializeGame} />
      {gameState.layout.map((row, idx) => {
        return (
          <Row
            rowNum={idx}
            onTileClick={onTileClick}
            onRightClick={onRightClick}
            row={row}
            key={idx}
          />
        );
      })}
    </article>
  );
}

export default Page;

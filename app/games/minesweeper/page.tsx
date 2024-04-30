"use client";

import { useState } from "react";
import styles from "./minesweeper.module.css";

function Tile({ tile, rowNum, columnNum, onTileClick }) {
  return (
    <button
      className={tile.isClicked ? styles.clicked : styles.tile}
      key={columnNum}
      onClick={() => onTileClick(tile, rowNum, columnNum)}
    >
      {tile.value}
    </button>
  );
}

function Row({ row, rowNum, onTileClick }) {
  return (
    <div className={styles.row} key={rowNum}>
      {row.map((tile, columnNum) => {
        return (
          <Tile
            tile={tile}
            rowNum={rowNum}
            columnNum={columnNum}
            onTileClick={onTileClick}
            key={`${rowNum}-${columnNum}`}
          />
        );
      })}
    </div>
  );
}

function StatusBar({ gameState }) {
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
        <button>😬</button>
      </div>
      <div>Time</div>
    </div>
  );
}

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
    isInProgress: false,
  };

  const [gameState, setGameState] = useState(game);

  const onTileClick = (tile, row, column) => {
    setGameState((currentState) => {
      const newLayout = [...currentState.layout];
      newLayout[row][column].isClicked = true;
      const isInProgress = newLayout[row][column].value !== "X";
      return { layout: newLayout, isInProgress };
    });
  };

  return (
    <article className={styles.board}>
      <StatusBar gameState={gameState} />
      {gameState.layout.map((row, idx) => {
        return (
          <Row rowNum={idx} onTileClick={onTileClick} row={row} key={idx} />
        );
      })}
    </article>
  );
}

export default Page;

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

  const onTileClick = (event, tile, row, column) => {
    if (tile.isFlagged) return;
    setGameState((currentState) => {
      const newLayout = [...currentState.layout];
      newLayout[row][column].isClicked = true;
      const isInProgress = newLayout[row][column].value !== "X";
      return { layout: newLayout, isInProgress };
    });
  };

  const onRightClick = (event, tile, row, column, shouldAddFlag) => {
    event.preventDefault();
    setGameState((currentState) => {
      const newLayout = [...currentState.layout];
      newLayout[row][column].isFlagged = shouldAddFlag;
      return { layout: newLayout, isInProgress: true };
    });
  };

  return (
    <article className={styles.board}>
      <StatusBar gameState={gameState} />
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

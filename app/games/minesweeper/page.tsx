"use client";

import { useState } from "react";
import styles from "./minesweeper.module.css";

let timer: NodeJS.Timeout;

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
      {tile.isFlagged ? "⛳️" : tile.value ? tile.value : ""}
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
  const minesLeft = gameState.layout
    .flat()
    .reduce(
      (count: number, tile: { value: number | "X"; isFlagged: boolean }) => {
        if (tile.value === "X") count++;
        if (tile.isFlagged) count--;
        return count;
      },
      0
    );

  return (
    <div className={styles.statusBar}>
      <div>{minesLeft < 0 ? 0 : minesLeft}</div>
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

function Page() {
  const basicConfig = {
    beginner: {
      width: 9,
      height: 9,
      mines: 10,
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40,
    },
    expert: {
      width: 16,
      height: 30,
      mines: 99,
    },
  };

  const [config, setConfig] = useState(basicConfig.beginner);

  const buildLayout = (config: {
    width: number;
    height: number;
    mines: number;
  }): { value: number | "X"; isClicked: boolean; isFlagged: boolean }[][] => {
    const basicTile = { value: 0, isClicked: false, isFlagged: false };
    const layout = [];
    for (let row = 0; row < config.height; row++) {
      layout.push([]);
      for (let column = 0; column < config.width; column++) {
        layout[row][column] = { ...basicTile };
      }
    }
    for (let minesLeft = config.mines; minesLeft > 0; minesLeft--) {
      let randomRow = Math.floor(Math.random() * config.height);
      let randomColumn = Math.floor(Math.random() * config.width);
      layout[randomRow][randomColumn].value = "X";
    }
    for (let row = 0; row < config.height; row++) {
      for (let column = 0; column < config.width; column++) {
        let value = 0;
        layout[row - 1]?.[column - 1]?.value === "X" ? value++ : null;
        layout[row - 1]?.[column]?.value === "X" ? value++ : null;
        layout[row - 1]?.[column + 1]?.value === "X" ? value++ : null;
        layout[row]?.[column - 1]?.value === "X" ? value++ : null;
        layout[row]?.[column + 1]?.value === "X" ? value++ : null;
        layout[row + 1]?.[column - 1]?.value === "X" ? value++ : null;
        layout[row + 1]?.[column]?.value === "X" ? value++ : null;
        layout[row + 1]?.[column + 1]?.value === "X" ? value++ : null;
        layout[row][column].value === "X"
          ? null
          : (layout[row][column].value = value);
      }
    }
    return layout;
  };

  const game = {
    layout: buildLayout(config),
    status: "notStarted",
    time: 0,
  };

  const [gameState, setGameState] = useState(game);
  const onTileClick = (event, tile, row, column) => {
    if (
      tile.isFlagged ||
      gameState.status === "won" ||
      gameState.status === "lost"
    )
      return;
    setGameState((currentState) => {
      const newLayout = [...currentState.layout];
      const recurse = (row: number, column: number) => {
        if (!newLayout[row]?.[column]) return;
        if (newLayout[row][column].value === "X") return;
        if (newLayout[row][column].isClicked) return;
        newLayout[row][column].isClicked = true;
        if ((newLayout[row][column].value as number) > 0) {
          return;
        }
        recurse(row - 1, column - 1);
        recurse(row - 1, column);
        recurse(row - 1, column + 1);
        recurse(row, column - 1);
        recurse(row, column + 1);
        recurse(row + 1, column - 1);
        recurse(row + 1, column);
        recurse(row + 1, column + 1);
      };
      recurse(row, column);
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
      return {
        ...state,
        layout: buildLayout(config),
        time: 0,
        status: "inProgress",
      };
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

"use client";

import { useState } from "react";
import styles from "./minesweeper.module.css";
import { basicConfig } from "./config";
import { buildLayout } from "./utils";

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
  const formatCountForCounter = (count: number) => {
    const res = ["0", "0", "0"];
    const current = count.toString().split("").reverse();
    current.forEach((digit, idx) => (res[idx] = digit));
    return res.reverse();
  };

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
      <div className={styles.counter}>
        {minesLeft < 0
          ? formatCountForCounter(0)
          : formatCountForCounter(minesLeft)}
      </div>
      <div>
        <button
          onClick={(event) => initializeGame()}
          className={styles.initializer}
        >
          {gameState.status === "lost"
            ? "😵"
            : gameState.status === "won"
            ? "😎"
            : "🙂"}
        </button>
      </div>
      <div className={styles.counter}>
        {formatCountForCounter(gameState.time)}
      </div>
    </div>
  );
}

function Page() {
  const [config, setConfig] = useState(basicConfig.beginner);

  const game = {
    layout: [],
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

  const updateConfig = (difficulty: keyof typeof basicConfig) => {
    setConfig(basicConfig[difficulty]);
    setGameState((state) => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return {
        ...state,
        layout: buildLayout(basicConfig[difficulty]),
        time: 0,
        status: "notStarted",
      };
    });
  };

  return (
    <>
      <article className={styles.board}>
        <StatusBar gameState={gameState} initializeGame={initializeGame} />
        <div className={styles.field}>
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
        </div>
      </article>
      <button onClick={() => updateConfig("beginner")}>beginner</button>
      <button onClick={() => updateConfig("intermediate")}>intermediate</button>
      <button onClick={() => updateConfig("expert")}>expert</button>
    </>
  );
}

export default Page;

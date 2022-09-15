// store gameboard as array inside gameboard object
// players stored in objects
// game flow stored in object

const Gameboard = () => {
  let _boardArray = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    _boardArray = ["", "", "", "", "", "", "", "", ""];
  }

  const getBoard = () => {
    return _boardArray;
  }

  return { resetBoard, getBoard };
}

const Player = () => {
  return { name };
}

const GameFlow = () => {
  let turn = 0;
  let gameOver = false;
  let xMove;
  let oMove;
  let winner;
  let isBotPlaying = false;
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const addMove = (e) => {
    turn === 0 ? (e.target.textContent = "X") : (e.target.textContent = "O");
  }

  const swapTurn = () => {
    turn === 0 ? (turn = 1) : (turn = 0);
  }

  const getTurn = () => {
    return turn;
  }

  const resetTurn = () => {
    return (turn = 0);
  }

  const changeTurn = (e) => {
    if (e.target.textContent === "") {
      addMove(e);
      swapTurn();
    }
  }

  const isGameOver = () => {
    return gameOver;
  }

  const resetGame = () => {
    return (gameOver = false);
  }

  const getXMove = () => {
    return xMove;
  }

  const getOMove = () => {
    return oMove;
  }

  const getWinner = () => {
    return winner;
  }

  const checkWinner = () => {
    xMove = Gameboard.getBoard().reduce(function(a, e, i) {
      if (e === "X") a.push(i);
      return a;
    }, [])
    oMove = Gameboard.getBoard().reduce(function(a, e, i) {
      if (e === "O") a.push(i);
      return a;
    }, [])

    for (const combo of winningCombos) {
      if (combo.every((arr) => xMove.includes(arr))) {
        gameOver = true;
        winner = "player1";
        xMove = combo;
      }
      if (combo.every((arr) => oMove.includes(arr))) {
        gameOver = true;
        winner = "player2";
        oMove = combo;
      }
    }

    if (!Gameboard.getBoard().includes("") && winner !== "player1" && winner !== "player2") {
      winner = "tie";
    }
  }

  const aiTurn = () => {
    if (GameFlow.isGameOver() === false && turn === 1) {
      let newArr = Gameboard
        .getBoard()
        .map((e, i) => (e === "" ? i : undefined))
        .filter((x) => x !== undefined)
      let randomNum = newArr[Math.floor(Math.random() * newArry.length)];

      const cells = document.querySelectorAll(".game-cell");
      cells.forEach((cell, index) => {
        if (index === randomNum) {
          Gameboard.getBoard().splice(randomNum, 1, "O");
          cell.textContent = "O";
          turn = 0;
          cell.classList.remove("hover");
          checkWinner();
        }
      })
    }
  }

  return {
    addMove,
    swapTurn,
    getTurn,
    resetTurn,
    changeTurn,
    isGameOver,
    resetGame,
    getXMove,
    getOMove,
    getWinner,
    checkWinner,
    isBotPlaying,
    aiTurn };
};
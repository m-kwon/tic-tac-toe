const player = (name) => {
  return { name }
}

const gameBoard = (() => {
  let _boardArr = ["", "", "", "", "", "", "", "", ""]

  const resetBoard = () => {
    _boardArr = ["", "", "", "", "", "", "", "", ""]
  }

  const getBoard = () => {
    return _boardArr
  }

  return { resetBoard, getBoard }
})()

const displayController = (() => {
  const form = document.querySelector("form")
  const exit = document.querySelector(".exit")
  const p1text = document.querySelector("#one")
  const p2text = document.querySelector("#two")
  const modal = document.querySelector(".modal")
  const p1display = document.querySelector(".one")
  const p2display = document.querySelector(".two")
  const display = document.querySelector(".gameboard")
  const resetBtn = document.querySelector(".reset-btn")
  const blueIcon = document.querySelector(".blue-marker")
  const greenIcon = document.querySelector(".green-marker")
  const startModal = document.querySelector(".start-modal")
  const selectPlayer = document.querySelector(".select-player")
  const selectComputer = document.querySelector(".select-computer")

  p1text.textContent = player("Player 1").name
  p2text.textContent = player("Player 2").name

  const gameInit = () => {
    showStartModal()
    _createBoard()
  }

  const showStartModal = () => {
    startModal.style.display = "block"
  }
  const hideStartModal = () => {
    startModal.style.display = "none"
  }
  const showPlayerModal = () => {
    modal.style.display = "block"
  }
  const hidePlayerModal = () => {
    modal.style.display = "none"
    form.reset()
  }

  const createCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("game-cell")
    cell.classList.add("hover")
    display.appendChild(cell)
  }

  const _createBoard = () => {
    document.querySelector(".green-marker").classList.add("marker-an")
    gameBoard.getBoard().forEach((cell) => {
      createCell(cell)
      addClick()
    })
  }

  const addPlayer = (e) => {
    e.preventDefault()
    const pText = document.querySelector(`#${modal.dataset.id}`)
    pText.textContent = player(e.target.name.value).name
    hidePlayerModal()
  }

  const addClick = () => {
    const cells = document.querySelectorAll(".game-cell")
    cells.forEach((cell, index) => {
      cell.addEventListener("click", (e) => {
        if (gameControl.isGameOver() === false) {
          cell.classList.remove("hover")
          gameControl.changeTurn(e)
          gameBoard.getBoard().splice(index, 1, e.target.textContent)

          gameControl.checkWinner()
          setTimeout(() => gameControl.aiTurn(), 300)

          displayTurn()
          if (!gameBoard.getBoard().includes("")) {
            removeMarkers()
          }
        }
      })
    })
  }

  const displayTurn = () => {
    changeMarker()
    updateMarkers()
  }

  const changeMarker = () => {
    if (gameControl.getTurn() === 0) {
      greenIcon.classList.add("marker-an")
      greenIcon.style.visibility = "visible"
      blueIcon.style.visibility = "hidden"
      blueIcon.classList.remove("marker-an")
    } else if (gameControl.getTurn() === 1) {
      blueIcon.classList.add("marker-an")
      blueIcon.style.visibility = "visible"
      greenIcon.style.visibility = "hidden"
      greenIcon.classList.remove("marker-an")
    }
  }

  const removeMarkers = () => {
    blueIcon.style.visibility = "hidden"
    greenIcon.style.visibility = "hidden"
    blueIcon.classList.remove("marker-an")
    greenIcon.classList.remove("marker-an")
  }

  const updateMarkers = () => {
    if (gameControl.isGameOver() === true) {
      removeMarkers()
      showWinner()
    }
  }

  const _deleteDOM = () => {
    display.innerHTML = ""
  }

  const resetPlayerWinners = () => {
    p1display.classList.remove("oneWin")
    p2display.classList.remove("twoWin")
  }

  const resetGame = () => {
    _deleteDOM()
    gameBoard.resetBoard()
    gameControl.resetGame()
    gameControl.resetTurn()
    resetPlayerWinners()
    changeMarker()
    _createBoard()
  }

  const showWinner = () => {
    const winningCells = document.querySelectorAll(".game-cell")
    winningCells.forEach((cell, index) => {
      if (
        gameControl.getWinner() === "player1" &&
        gameControl.getXmarker().includes(index)
      ) {
        cell.classList.add("xWin")
        p1display.classList.add("oneWin")
      }
      if (
        gameControl.getWinner() === "player2" &&
        gameControl.getOmarker().includes(index)
      ) {
        cell.classList.add("oWin")
        p2display.classList.add("twoWin")
      }
    })
  }

  form.addEventListener("submit", addPlayer)
  resetBtn.addEventListener("click", resetGame)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hidePlayerModal()
    }
  })
  ;[p1display, p2display].forEach((player) => {
    player.addEventListener("click", (e) => {
      modal.dataset.id = e.target.id
      showPlayerModal()
    })
  })
  selectPlayer.addEventListener("click", () => {
    hideStartModal()
    resetGame()
    p2text.textContent = player("Player 2").name
  })
  selectComputer.addEventListener("click", () => {
    gameControl.isBotPlaying = true
    hideStartModal()
    resetGame()
    p2text.textContent = "Computer"
  })
  exit.addEventListener("click", () => {
    showStartModal()
    gameControl.isBotPlaying = false
  })
  getIsBotPlaying = () => {
    return gameControl.isBotPlaying
  }

  return {
    gameInit,
    changeMarker,
    removeMarkers,
    getIsBotPlaying,
    updateMarkers,
  }
})()

const gameControl = (() => {
  let turn = 0
  let gameOver = false
  let xMarker
  let oMarker
  let winner
  let isBotPlaying = false
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const addMark = (e) => {
    turn === 0 ? (e.target.textContent = "X") : (e.target.textContent = "O")
  }

  const swapTurn = () => {
    turn === 0 ? (turn = 1) : (turn = 0)
  }

  const getTurn = () => {
    return turn
  }

  const resetTurn = () => {
    return (turn = 0)
  }

  const changeTurn = (e) => {
    if (e.target.textContent === "") {
      addMark(e)
      swapTurn()
    }
  }

  const isGameOver = () => {
    return gameOver
  }

  const resetGame = () => {
    return (gameOver = false)
  }

  const checkWinner = () => {
    xMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "X") a.push(i)
      return a
    }, [])
    oMarker = gameBoard.getBoard().reduce(function (a, e, i) {
      if (e === "O") a.push(i)
      return a
    }, [])

    for (const combo of winningCombos) {
      if (combo.every((arr) => xMarker.includes(arr))) {
        gameOver = true
        winner = "player1"
        xMarker = combo
      }
      if (combo.every((arr) => oMarker.includes(arr))) {
        gameOver = true
        winner = "player2"
        oMarker = combo
      }
    }

    if (
      !gameBoard.getBoard().includes("") &&
      winner !== "player1" &&
      winner !== "player2"
    ) {
      displayController.updateMarkers()
      winner = "tie"

    }
  }

  const getXmarker = () => {
    return xMarker
  }
  const getOmarker = () => {
    return oMarker
  }
  const getWinner = () => {
    return winner
  }

  const aiTurn = () => {
    if (
      gameControl.isGameOver() === false &&
      displayController.getIsBotPlaying() === true &&
      turn === 1
    ) {
      let newArr = gameBoard
        .getBoard()
        .map((e, i) => (e === "" ? i : undefined))
        .filter((x) => x !== undefined)
      let randomNum = newArr[Math.floor(Math.random() * newArr.length)]

      const cells = document.querySelectorAll(".game-cell")
      cells.forEach((cell, index) => {
        if (index === randomNum) {
          gameBoard.getBoard().splice(randomNum, 1, "O")
          cell.textContent = "O"
          turn = 0
          cell.classList.remove("hover")
          checkWinner()
          displayController.changeMarker()
          displayController.updateMarkers()
        }
      })
    }
  }

  return {
    swapTurn,
    addMark,
    getTurn,
    changeTurn,
    resetTurn,
    checkWinner,
    isGameOver,
    resetGame,
    getXmarker,
    getOmarker,
    getWinner,
    isBotPlaying,
    aiTurn,
    gameOver,
  }
})()

displayController.gameInit()
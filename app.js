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
  return {};
}
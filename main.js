//square constructor
function square(
  squareValue,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth
) {
  this.squareValue = squareValue;
  this.first = first;
  this.second = second;
  this.third = third;
  this.fourth = fourth;
  this.fifth = fifth;
  this.sixth = sixth;
  this.seventh = seventh;
  this.eighth = eighth;
}

function createGameBoard() {
  let gameBoard = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const currentSquare = [i, j];
      let iMinus2 = i - 2;
      let iMinus1 = i - 1;
      let iPlus2 = i + 2;
      let iPlus1 = i + 1;
      let jMinus2 = j - 2;
      let jMinus1 = j - 1;
      let jPlus2 = j + 2;
      let jPlus1 = j + 1;
      let tempArr = [];

      //push possible locations into a temp array
      tempArr.push([iMinus2, jMinus1]);
      tempArr.push([iMinus2, jPlus1]);
      tempArr.push([iMinus1, jMinus2]);
      tempArr.push([iMinus1, jPlus2]);
      tempArr.push([iPlus1, jMinus2]);
      tempArr.push([iPlus1, jPlus2]);
      tempArr.push([iPlus2, jMinus1]);
      tempArr.push([iPlus2, jPlus1]);

      //check temp array to see if the values for possible jumps are off the board, make that jump null
      for (let i = 0; i < tempArr.length; i++) {
        if (
          tempArr[i][0] >= 8 ||
          tempArr[i][0] < 0 ||
          tempArr[i][1] >= 8 ||
          tempArr[i][1] < 0
        ) {
          tempArr[i] = null;
        }
      }
      //make a new object and push to gameboard
      let newSquare = new square(
        currentSquare,
        tempArr[0],
        tempArr[1],
        tempArr[2],
        tempArr[3],
        tempArr[4],
        tempArr[5],
        tempArr[6],
        tempArr[7]
      );
      gameBoard.push(newSquare);
    }
  }
  return gameBoard;
}

function findIndex(arr) {
  //find index locates the index of a provided array of paired values
  let rval;
  //separate logic for first row as it starts with 0
  if (arr[0] === 0) {
    rval = arr[0] * 7 + arr[1];
  } else {
    rval = arr[0] * 8 + arr[1];
  }
  return rval;
}

function returnSquareFromIndex(index) {
  return gameBoard[index];
}
//just for visual output in chess format, not for use by any other function
function chessFormatSquareValue(object) {
  let alphabet = "ABCDEFGH".split("");
  let arr = object.squareValue;
  return alphabet[arr[0]] + arr[1].toString();
}

function writeAllIndex() {
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].squareValue);
    console.log(findIndex(gameBoard[i].squareValue));
  }
}

const gameBoard = createGameBoard();
console.log(gameBoard);

console.log(findIndex([6, 6]));
console.log(returnSquareFromIndex(54));
console.log(chessFormatSquareValue(returnSquareFromIndex(54)));
//writeAllIndex();

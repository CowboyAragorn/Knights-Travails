function createGameBoard() {
  let gameBoard = [];
  let alphabet = "abcdefgh".split("");
  //going to 1 index just because it makes it easier to read from a chess perspective
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
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
        //have to make them <= zero because not 0 indexing
        if (
          tempArr[i][0] > 8 ||
          tempArr[i][0] <= 0 ||
          tempArr[i][1] > 8 ||
          tempArr[i][1] <= 0
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
  console.log(gameBoard);
}

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

let square44 = new square(
  [4, 4],
  [2, 3],
  [2, 5],
  [3, 2],
  [3, 6],
  [5, 2],
  [5, 6],
  [6, 3],
  [6, 5]
);

let square442 = new square(
  ["d", 4],
  ["b", 3],
  ["b", 5],
  ["c", 2],
  ["c", 6],
  ["e", 2],
  ["e", 6],
  ["f", 3],
  ["f", 5]
);
console.log(square44);

console.log(square44.first);

createGameBoard();

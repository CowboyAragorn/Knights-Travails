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

function Knight(knightPosition, children) {
  this.knightPosition = knightPosition;
  this.children = children;
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
//Generates a knight at a random position
function generateKnight() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let knight = new square([getRandomInt(8), getRandomInt(8)]);
  return knight;
  //return [getRandomInt(7), getRandomInt(7)];
}
//find index of a provided array of paired values
function findIndex(arr) {
  //find index locates the index of a provided array of paired values
  let rval;
  rval = arr[0] * 8 + arr[1];
  return rval;
}
//returns the square object from a provided index
function returnSquareFromIndex(index) {
  return gameBoard[index];
}
//just for visual output in chess format, not for use by any other function
function chessFormatSquareValue(object) {
  let alphabet = "ABCDEFGH".split("");
  let arr = object.squareValue;
  let plusAr1 = arr[1] + 1;
  return alphabet[arr[0]] + plusAr1.toString();
}
//prompts user for a knights starting and ending position
function getKnightPosition() {
  let starting = prompt("Enter a knight's starting square");
  let startingArr = starting.split(",");
  let ending = prompt("Enter a knight's ending square");
  endingArr = ending.split(",");
  for (let i = 0; i < startingArr.length; i++) {
    startingArr[i] = parseInt(startingArr[i]);
    endingArr[i] = parseInt(endingArr[i]);
  }
  return [startingArr, endingArr];
}

//creates new knight object with a starting position and array of possible jumps
function buildKnightTree(arr) {
  let childrenArray = [];
  //find the index of the array and get access to its corresponding obj in the hash table
  let index = findIndex(arr);
  let knightGameBoardSpace = gameBoard[index];
  //iteratively push the possible knight jump spots to the children array
  let objKeys = Object.entries(knightGameBoardSpace);
  //1 index so as to avoid pushing to square value to children
  for (let i = 1; i < objKeys.length; i++) {
    childrenArray.push(objKeys[i][1]);
  }
  //create new knight obj with starting position and array of possible jumps
  let knight = new Knight(arr, childrenArray);
  return knight;
}

function writeAllIndex() {
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].squareValue);
    console.log(findIndex(gameBoard[i].squareValue));
  }
}

const gameBoard = createGameBoard();
const knight = generateKnight();
//console.log("get knight position");
//let knightPosition = getKnightPosition();
console.log(gameBoard);
console.log(knight.squareValue);
console.log("your knight is at " + chessFormatSquareValue(knight));

console.log(findIndex([7, 7]));
console.log(returnSquareFromIndex(54));
console.log(chessFormatSquareValue(returnSquareFromIndex(55)));
//writeAllIndex();
//console.log(buildKnightTree(knightPosition[0]));
console.log(buildKnightTree([0, 0]));

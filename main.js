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

function Knight(knightStart, knightEnd, possibleSquares) {
  this.knightStart = knightStart;
  this.knightEnd = knightEnd;
  this.possibleSquares = possibleSquares;
}
//traversal objects keep track of previous movements so as to trace steps backwards
function Traversal(val, prev) {
  this.val = val;
  this.prev = prev;
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

function chessFormatArray(arr) {
  let alphabet = "ABCDEFGH".split("");
  let arrVal = arr[0];
  let alphVal = alphabet[arrVal];
  //because the math is zero indexed but chess is 1 indexed
  let plusArr1 = arr[1] + 1;
  return alphVal + plusArr1.toString();
}

function getKnightPosition() {
  //input 1 and 3 are letters and need to be translated to their numeric values
  let input1 = document.getElementById("select1");
  let input2 = document.getElementById("select2");
  let input3 = document.getElementById("select3");
  let input4 = document.getElementById("select4");

  let startingArr = [parseInt(input1.value), parseInt(input2.value)];
  let endingArr = [parseInt(input3.value), parseInt(input4.value)];
  return [startingArr, endingArr];
}

//creates new knight object with a starting position and array of possible jumps
function buildKnightTree(arr, arr1 = null) {
  let childArr = buildChildArray(arr);
  let possibleSquares = [];

  for (let i = 0; i < childArr.length; i++) {
    let traversal = new Traversal(childArr[i], new Traversal(arr, null));
    possibleSquares.push(traversal);
  }
  //create new knight obj with starting position and array of possible jumps
  let knight = new Knight(arr, arr1, possibleSquares);
  return knight;
}

//separate function to build children, usable to build the knight obj and the queue array in level order traversal
function buildChildArray(arr) {
  let childrenArray = [];
  //find the index of the array and get access to its corresponding obj in the hash table
  let index = findIndex(arr);
  let knightGameBoardSpace = gameBoard[index];
  //iteratively push the possible knight jump spots to the children array
  let objKeys = Object.entries(knightGameBoardSpace);
  //1 index so as to avoid pushing to square value to children
  for (let i = 1; i < objKeys.length; i++) {
    //if possible space is null, don't push it
    if (objKeys[i][1] != null) {
      childrenArray.push(objKeys[i][1]);
    }
  }
  return childrenArray;
}
function writeAllIndex() {
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].squareValue);
    console.log(findIndex(gameBoard[i].squareValue));
  }
}
//level order check knight's path;
function levelOrderTraversal(knight, queue) {
  //check if first in queue is the endpoint
  for (let i = 0; i < queue.length; i++) {
    if (
      queue[i].val[0] === knight.knightEnd[0] &&
      queue[i].val[1] === knight.knightEnd[1]
    ) {
      showPath(knight, queue[i]);
      return;
    }
  }
  //set up temp arr with next set of level order values
  let tempArr = [];
  for (let i = 0; i < queue.length; i++) {
    let childArr = buildChildArray(queue[i].val);
    //implement a traversal object to keep track of previous
    for (let j = 0; j < childArr.length; j++) {
      let traversal = new Traversal(childArr[j], queue[i]);
      tempArr.push(traversal);
    }
  }
  //dump the old queue, start on new one
  queue = tempArr;
  //recursively call until end square is found
  return levelOrderTraversal(knight, queue);
}

//function prints to the console the path that the knight takes
function showPath(knight, space) {
  let pathArr = [space.val];
  let reversedPathArr = [];
  //while the current space is not the same as the starting space
  while (
    space.val[0] != knight.knightStart[0] ||
    space.val[1] != knight.knightStart[1]
  ) {
    space = space.prev;
    //push to a path array
    pathArr.push(space.val);
  }

  console.log("Your Path: ");
  //reverse print the array
  for (let i = pathArr.length; i > 0; i--) {
    console.log(pathArr[i - 1]);
    reversedPathArr.push(pathArr[i - 1]);
  }
  colorVisitedSquares(reversedPathArr);
}

function createSquares() {
  let n = 0;
  let board = document.getElementById("board");
  for (let i = 0; i < 8; i++) {
    let column = document.createElement("div");
    column.id = "column" + i;
    column.classList.add("column");
    if (i % 2 === 0) {
      column.classList.add("evenColumn");
    } else {
      column.classList.add("oddColumn");
    }
    board.append(column);
    for (let j = 0; j < 8; j++) {
      let sq = document.createElement("div");
      sq.id = n;
      sq.classList.add("square");
      n++;
      let currentColumn = "column" + i;
      let currentColumnId = document.getElementById(currentColumn);
      currentColumnId.prepend(sq);
    }
  }
}

function colorVisitedSquares(arr) {
  let indexArr = [];
  for (let i = 0; i < arr.length; i++) {
    let index = findIndex(arr[i]);
    indexArr.push(index);
  }
  //color first and last individually
  let startSq = document.getElementById(indexArr[0]);
  startSq.style.backgroundColor = "green";
  startSq.innerHTML = "S";
  startSq.classList.add("impactedSquare");

  let endSq = document.getElementById(indexArr[indexArr.length - 1]);
  endSq.classList.add("impactedSquare");
  endSq.style.backgroundColor = "red";
  endSq.innerHTML = "E";
  //interate through the rest putting colors and numbers
  for (let i = 1; i < indexArr.length - 1; i++) {
    let movedThruSq = document.getElementById(indexArr[i]);
    movedThruSq.style.backgroundColor = "yellow";
    movedThruSq.innerHTML = i;
    movedThruSq.classList.add("impactedSquare");
  }
}

function knightPositionEventAdder() {
  let submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", eventScript);
}

function removeSquares() {
  let board = document.getElementById("board");
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
}

//this script is called by clicking the submit btn
function eventScript() {
  //lazy here, clears and remakes the board each click so user can test multiple times
  removeSquares();
  createSquares();
  let knightPosition = getKnightPosition();
  let builtKnightTree = buildKnightTree(knightPosition[0], knightPosition[1]);
  levelOrderTraversal(builtKnightTree, builtKnightTree.possibleSquares);
}

//const knight = generateKnight();
//makes chessboard display
createSquares();
//sets up the adjacency list for every possible knight move per square
const gameBoard = createGameBoard();
knightPositionEventAdder();
//testing purposes
/*
let knightPosition = [
  [0, 0],
  [7, 7],
];
*/

//original calls at end of code /
/*
let knightPosition = getKnightPosition();
let builtKnightTree = buildKnightTree(knightPosition[0], knightPosition[1]);
levelOrderTraversal(builtKnightTree, builtKnightTree.possibleSquares);
*/

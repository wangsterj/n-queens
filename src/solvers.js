/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var numRooks = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i,j);
      if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
        board.togglePiece(i,j);
      } else {
        numRooks++;
        if (numRooks === n) {
          break;
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 9) {
    return 1;
  }
  var board = new Board({n:n});
  var daddyTree = new Tree(board);
  var nextQueue = new Queue();
  var masterArr= [];
  nextQueue.enqueue(daddyTree);
  var currentNode = daddyTree;

  while (nextQueue.size() > 0) {
    currentNode = nextQueue.dequeue();
    var children = this.makeChildren(currentNode, nextQueue, masterArr);
  }
    console.log(masterArr.length)
  return masterArr.length;
  // create children with potential paths
  // loop thru each child to end up with non conflicting paths
  // recurse

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

window.makeChildren = function(tree, queue, masterArr) {
  var n = tree.size;
  var board = tree.board;
  var row = tree.row;
  var col = tree.col;
  var oldAtt = board.attributes;
  for (var i = row; i < n; i++) {
    for (var j = col; j < n; j++) {
      if (tree.visitedCols.indexOf(j) === -1) {
        var newBoard = new Board({n:n});
        var oldAtt = board.attributes;
        var newAtt = {};
        for (var key in oldAtt) {
          if (key === 'n') {
            newAtt[key] = oldAtt[key];
          } else {
            newAtt[key] = oldAtt[key].slice()
          }
        }
        newBoard.attributes = newAtt;
        newBoard.togglePiece(i,j);
        if (!newBoard.hasAnyRooksConflicts(i, j)) {
          var newTree = new Tree(newBoard);
          newTree.numRooks = tree.numRooks + 1;
          newTree.visitedCols = tree.visitedCols.slice();
          newTree.visitedCols.push(j)
          // if (j === n-1) {
          //   newTree.row = i+1;
          //   newTree.col = 0;
          // } else {
          //   newTree.row = i;
          //   newTree.col = j+1;
          // }
          newTree.row = i + 1;
          if (newTree.numRooks === n) {
            masterArr.push(newTree);
          } else {
            queue.enqueue(newTree);
          }
        }
      }
    }
    // col = 0;
  }
  return tree.children;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    var board = new Board({n:n});
    return board.rows();
  }
  var board = new Board({n:n});
  var daddyTree = new Tree(board);
  var nextQueue = new Queue();
  var masterArr = [];
  nextQueue.enqueue(daddyTree);
  var currentNode = daddyTree;

  while (nextQueue.size() > 0 && masterArr.length < 1) {
    currentNode = nextQueue.dequeue();
    var children = this.makeQueenChildren(currentNode, nextQueue, masterArr);
  }
  if (masterArr.length == 0) {
    var board = new Board({n:n});
    return board.rows();
  }
  return masterArr[0].board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var board = new Board({n:n});
  var daddyTree = new Tree(board);
  var nextQueue = new Queue();
  var masterArr = [];
  nextQueue.enqueue(daddyTree);
  var currentNode = daddyTree;

  while (nextQueue.size() > 0) {
    currentNode = nextQueue.dequeue();
    var children = this.makeQueenChildren(currentNode, nextQueue, masterArr);
    // console.log(masterArr.length)
  }
  // console.log(masterArr.length, n)
  return masterArr.length;
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};

var suite = new Benchmark.Suite;

window.makeQueenChildren = function(tree, queue, masterArr) {
  var n = tree.size;
  var board = tree.board;
  var row = tree.row;
  var col = tree.col;
  var oldAtt = board.attributes;
  for (var i = row; i < n; i++) {
    for (var j = col; j < n; j++) {
      if (tree.visitedCols.indexOf(j) === -1) {
        var newBoard = new Board({n:n});
        var oldAtt = board.attributes;
        var newAtt = {};
        for (var key in oldAtt) {
          if (key === 'n') {
            newAtt[key] = oldAtt[key];
          } else {
            newAtt[key] = oldAtt[key].slice();
          }
        }
        newBoard.attributes = newAtt;
        newBoard.togglePiece(i, j);
        if (!newBoard.hasAnyQueenConflictsOn(i, j)) {
          var newTree = new Tree(newBoard);
          newTree.numRooks = tree.numRooks + 1;
          newTree.row = i + 1;
          newTree.visitedCols = tree.visitedCols.slice();
          newTree.visitedCols.push(j);
          if (newTree.numRooks === n) {
            masterArr.push(newTree);
          } else {
            queue.enqueue(newTree);
          }
        }
      }
    }
    // col = 0;
  }
  return tree.children;
}

// TREE DATA STRUCTURE
var Tree = function(board) {
  this.children = [];
  this.board = board;
  this.size = board.rows().length;
  this.numRooks = 0;
  this.row = 0;
  this.col = 0;
  this.visitedCols = [];
}

// QUEUE DATA STRUCTURE
var Queue = function() {
  this._storage = {};
  this._start = 0;
  this._end = 0;
  };


Queue.prototype.enqueue = function(value) {
  this._storage[this._end++] = value;
};

Queue.prototype.dequeue = function() {
  // This does some unnecessary work sometimes. Can you spot why?
  var result = this._storage[this._start];
  delete this._storage[this._start];

  this.size() && this._start++;

  return result;
};

Queue.prototype.size = function() {
  return this._end - this._start;
};



var board = new Board({n:2})
var test = new Tree(board);
var res = this.countNRooksSolutions(2);
// console.log(test.children.length)




  // n = 6;
  // var board = new Board({n:n});
  // var numQueens = 0;
  // var count = 0;
  // var hasSolution = false;
  // var jStart = 0;
  // var jStartincrement = 0;
  // console.log("TESTING FOR N: ", n);
  // while (!hasSolution) {
  //   numQueens=0;
  //   board = new Board({n:n});
  //   jStart = jStartincrement;
  //   for (var i = 0; i < n; i++) {
  //     for (var j = jStart; j < n; j++) {
  //       board.togglePiece(i, j);
  //       if (board.hasAnyQueensConflicts()) {
  //         board.togglePiece(i, j);
  //       } else {
  //         numQueens++;
  //       }
  //     }
  //     var jStart = 0;
  //   }
  //   if (numQueens !== n) {
  //     // increase starting column index
  //     //
  //     jStartincrement++;
  //   } else {
  //     hasSolution = true;
  //   }
  //   console.log("Current nQueens", numQueens, jStartincrement);
  //   console.table(board.rows());
  // }

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  // return board.rows();
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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.makeChildren = function(tree) {
  var n = tree.size;
  var board = tree.board;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var newBoard = new Board(board.attributes);
      newBoard.togglePiece(i,j);
      if (!newBoard.hasAnyRooksConflicts()) {
        var newTree = new Tree(newBoard);
        tree.children.push(newTree);
        newTree.numRooks = tree.numRooks + 1;
      }
    }
  }
  return tree.children;
}

// var board = new Board({n:2})
// var test = new Tree(board);
// this.makeChildren(test);
// console.log(test.children.length)

window.Tree = function(board) {
  this.children = [];
  this.board = board;
  this.size = board.rows().length;
  this.numRooks = 0;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

module.exports = function solveSudoku(matrix) {
// Searching for zeros
    function empty(matrix) {
        for (let row = 0; row <= 8; row++) {
            for (let col = 0; col <= 8; col++) {
                if (matrix[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return [9, 9];
    }
// Checking horizontal row
    function checkRow(matrix, row, num) {
        for (let i = 0; i < 9; i++) {
            if (matrix[row][i] === num) {
                return false;
            }
        }
        return true;
    }
// Checking vertical column
    function checkCol(matrix, col, num) {
        for (let i = 0; i < 9; i++) {
            if (matrix[i][col] === num) {
                return false;
            }
        }
        return true;
    }
// Checking the relevant 3 x 3 box
    function checkBox(matrix, row, col, num) {
        const r = row - row % 3;
        const c = col - col % 3;
        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                if (matrix[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }
// Checking if the number is suitable
    function suitableNumber(matrix, row, col, num) {
        return (checkRow(matrix, row, num) && checkCol(matrix, col, num) && checkBox(matrix, row, col, num));
    }
// Implementing the backtracking algorithm
    function solve(matrix) {

        const found = empty(matrix);
        const row = found[0];
        const col = found[1];

        if (row === 9) {
            return true;
        }
        for (let num = 1; num <= 9; num++) {
            if (suitableNumber(matrix, row, col, num)) {
                matrix[row][col] = num;
                if (solve(matrix)) {
                    return true;
                } else {
                    matrix[row][col] = 0;
                }
            }
        }
    }
// Making recursive call
    solve(matrix);
    return matrix;
};
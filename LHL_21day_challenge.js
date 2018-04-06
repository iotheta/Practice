const GRID = [
  ["", "", "", "^", "", "", "", "", "", ""],
  ["", "", "", "", "~", "", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "^", "~", "~", "", "", "", "^", "", ""],
  ["", "^", "", "~", "~", "", "", "", "", ""],
  ["", "^", "", "", "~", "~", "", "", "", ""],
];

// Determines the number of columns and rows in the GRID
// returns an array with number of columns then number of rows
function getGridDim() {
  let gridHeight = GRID.length;
  let gridWidth;
  
  gridHeight === 0 ? gridWidth = 0 : gridWidth = GRID[0].length;
  
  return [gridWidth, gridHeight];
}

// Formats the dimensions of the GRID
// and returns a string in "Width(col) x Height(row)" format
function gridSize() {
  let gridDim = getGridDim();
  
  return gridDim[0] + " x " + gridDim[1];
}

// Calculates the number of cells in the GRID
// returns a number
function totalCells() {
  let gridDim = getGridDim();
  
  return gridDim[0] * gridDim[1];
}

// Reveals the contents of a cell based on given valid coordinates
// and returns the content in a string or false if coordinates
// are invalid.
function lightCell(coordinates) {
  let x = coordinates.slice(1) - 1;
  let y = coordinates[0].toLowerCase().charCodeAt(0) - 97;
  let coordLength = coordinates.length;
  
  if (coordLength < 2 || x < 0 || x > 9 || y < 0 || y > 9) {
    return false;
  }
  else {
    return GRID[x][y];
  }
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isRock(coordinates) {
  return lightCell(coordinates) === "^";
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isCurrent(coordinates) {
  return lightCell(coordinates) === "~";
}

// Targets a given row in the GRID 
// and returns its contents
function lightRow(row) {
  return GRID[row - 1];
}

// Targets a given col in the GRID
// and returns its contentss
function lightColumn(col) {
  let gridDim = getGridDim();
  let numRows = gridDim[1];
  let numCols = gridDim[0];
  let column = col.toLowerCase().charCodeAt(0) - 97;
  
  // checks to see if there are any rows in the GRID
  if (typeof col === 'string' && numRows && numCols && column <= numCols) {
    let columnContent = [];

    for (let i = 0; i < numRows; i++) {
     columnContent.push(GRID[i][column]);
    }
    return columnContent;
    
  } else {
    return false;
  }
}

// Determines if a given coordinate is safe from rocks or strong current
// returns true if it is safe and false otherwise.
function isSafe(coordinates) {
  return !isRock(coordinates) && !isCurrent(coordinates);
}

// Reports all the rocks in the GRID.
// Returns an array of the coordinates of all the rocks in the GRID
function allRocks() {
  let gridDim = getGridDim();
  let columnLetter = "";  
  let coordinate = "";
  let rocksArray = [];

  for(let i = 1; i <= gridDim[0]; i++) {
    for(let j = 1; j <= gridDim[1]; j++) {
      columnLetter = String.fromCharCode(j + 64);
      coordinate = columnLetter + i;
      isRock(coordinate) ? rocksArray.push(coordinate) : false;
    }
  }
  
  return rocksArray;
}
console.log(allRocks());
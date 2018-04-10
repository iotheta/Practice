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

const TARGET_MAIN = 0;
const TARGET_UP = 1;
const TARGET_DOWN = 2;
const TARGET_LEFT = 3;
const TARGET_RIGHT = 4;

// Determines the number of columns and rows in the GRID
// returns an array with number of columns then number of rows
function getGridDim() {
  let y = GRID.length;
  let x;
  
  y === 0 ? x = 0 : x = GRID[0].length;
  
  return [x, y];
}

// Returns index of the GRID array that maps to the given coordinates and to
// adjacent coordinates (top, bottom, left, right) if adj === true.
function mapCoordIndex(coordinate, findAdj) {
  const coordLength = coordinate.length;
  const gridDim = getGridDim();
  const adjTransferArray = [[0, -1], [0, 1], [-1, 0], [1, 0]];

  let x = coordinate[0].toLowerCase().charCodeAt(0) - 97;
  let y = coordinate.slice(1) - 1;
  let coordIndex = [x, y];
  let coordsArray = [];

  if (coordLength >= 2 && x >= 0 && x < gridDim[0] && y >= 0 && y < gridDim[1]) {
    coordsArray.push(coordIndex); 
    if(findAdj) {
      for(let i = 0; i < adjTransferArray.length; i++) {
        x = coordIndex[0] + adjTransferArray[i][0];
        y = coordIndex[1] + adjTransferArray[i][1];
        if (coordLength >= 2 && x >= 0 && x < gridDim[0] && y >= 0 && y < gridDim[1]) {
          coordsArray.push([x, y]);
        } else {
          coordsArray.push(null);
        }
      }
    }
    return coordsArray;
  } else {
    return null;
  }
}

// Formats the dimensions of the GRID
// and returns a string in "Width(col) x Height(row)" format
function gridSize() {
  let gridDim = getGridDim();
  
  return gridDim[0] + " x " + gridDim[1];
}

// Calculates the number of cells in the GRID.
// Returns a number
function totalCells() {
  let gridDim = getGridDim();
  
  return gridDim[0] * gridDim[1];
}

// Reveals the contents of a cell based on given valid coordinate
// and returns the content in a string or false if coordinate
// are invalid.
function lightCell(coordinate, target) {
  let j, i;
  coordIndices = mapCoordIndex(coordinate, true);
  if (coordIndices) {
    switch(target) {
      case TARGET_MAIN:
        j = coordIndices[TARGET_MAIN] && coordIndices[TARGET_MAIN][0];
        i = coordIndices[TARGET_MAIN] && coordIndices[TARGET_MAIN][1];
        return coordIndices[TARGET_MAIN] && GRID[i][j];
      case TARGET_UP:
        j = coordIndices[TARGET_UP] && coordIndices[TARGET_UP][0];
        i = coordIndices[TARGET_UP] && coordIndices[TARGET_UP][1];
        return coordIndices[TARGET_UP] && GRID[i][j];
      case TARGET_DOWN:
        j = coordIndices[TARGET_DOWN] && coordIndices[TARGET_DOWN][0];
        i = coordIndices[TARGET_DOWN] && coordIndices[TARGET_DOWN][1];
        return coordIndices[TARGET_DOWN] && GRID[i][j];
      case TARGET_LEFT:
        j = coordIndices[TARGET_LEFT] && coordIndices[TARGET_LEFT][0];
        i = coordIndices[TARGET_LEFT] && coordIndices[TARGET_LEFT][1];
        return coordIndices[TARGET_LEFT] && GRID[i][j];
      case TARGET_RIGHT:
        j = coordIndices[TARGET_RIGHT] && coordIndices[TARGET_RIGHT][0];
        i = coordIndices[TARGET_RIGHT] && coordIndices[TARGET_RIGHT][1];
        return coordIndices[TARGET_RIGHT] && GRID[i][j];
      default:
        j = coordIndices[TARGET_MAIN] && coordIndices[TARGET_MAIN][0];
        i = coordIndices[TARGET_MAIN] && coordIndices[TARGET_MAIN][1];
        return coordIndices[TARGET_MAIN] && GRID[i][j];
    } 
  } else {
    return null;
  }
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isRock(coordinate, target) {
  return lightCell(coordinate, target) === "^";
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isCurrent(coordinate, target) {
  return lightCell(coordinate, target) === "~";
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
    return null;
  }
}

// Determines if a given coordinate is safe from rocks or strong current
// returns true if it is safe and false otherwise.
function isSafe(coordinate) {
  return !isRock(coordinate) && !isCurrent(coordinate);
}

// Reports the first or all of the specified item in the GRID.
// Returns the first or an array of the coordinate of all 
// the specific item in the GRID.
function find(instanceOf, thisItem) {
  let gridDim = getGridDim();
  let columnLetter = "";  
  let coordinate = "";
  let coordArray = [];

  for(let i = 1; i <= gridDim[1]; i++) {
    for(let j = 1; j <= gridDim[0]; j++) {
      columnLetter = String.fromCharCode(j + 64);
      coordinate = columnLetter + i;
      if (thisItem === "Rocks") {
        if (isRock(coordinate)) {
          if (instanceOf === "All") {
            coordArray.push(coordinate);
          } else if (instanceOf === "First") {
            return coordinate;
          }
        } 
      } else if (thisItem === "Currents") {
        if (isCurrent(coordinate)) {
          if (instanceOf === "All") {
            coordArray.push(coordinate);
          } else if (instanceOf === "First") {
             return coordinate;
          }
        } 
      }
    }
  }
  return coordArray;
}

// Reports all the rocks in the GRID.
// Returns an array of the coordinate of all the rocks in the GRID
function allRocks() {
  let rocksCoords = find("All", "Rocks");
  return rocksCoords;
}

// Reports all the currents in the GRID.
// Returns an array of the coordinate of all the currents in the GRID
function allCurrents() {
  let currentCoords = find("All", "Currents");
  return currentCoords;
}

// Returns the coordinate of the first rock in the GRID.
function firstRock() {
  let firstRock = find("First", "Rocks");
  return firstRock;
}

// Returns the coordinate of the first current in the GRID.
function firstCurrent() {
  let firstCurrent = find("First", "Currents");
  return firstCurrent;
}

// Returns true if the specified coordinate contains a rock or strong current 
// or if the cells immediately above, below, left or right of it contains a rock
// or strong current.
function isDangerous(coordinate) {
  for(let i = 0; i <= 4; i++) {
    if (isRock(coordinate, i) || isCurrent(coordinate, i)) {
      return true;
    }
  }
  return false;
}
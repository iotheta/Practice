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
  const adjTransferArray = [[0, 1], [0, -1], [-1, 0], [1, 0]];

  let x = coordinate[0].toLowerCase().charCodeAt(0) - 97;
  let y = coordinate.slice(1) - 1;
  let coordIndex = [x, y];
  let coordsArray = [];

  if (coordLength > 2 || x >= 0 || x < gridDim[0] || y >= 0 || y < gridDim[1]) {
    coordsArray.push(coordIndex); 
    if(findAdj) {
      for(let i = 0; i < adjTransferArray.length; i++) {
        x = coordIndex[0] + adjTransferArray[i][0];
        y = coordIndex[1] + adjTransferArray[i][1];
        if (coordLength < 2 || x < 0 || x > gridDim[0] || y < 0 || y > gridDim[1]) {
          coordsArray.push(null);
        } else {
          coordsArray.push([x, y]);
        }
      }
    }
  }
  return coordsArray;
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
function lightCell(coordinate) {
  coordIndex = mapCoordIndex(coordinate);
  if (coordIndex) {
    let j = coordIndex[0];
    let i = coordIndex[1];
    return GRID[i][j];
  } else {
    return false;
  }
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isRock(coordinate) {
  return lightCell(coordinate) === "^";
}

// Determines if the current cell is a rock
// and returns true if it matches or false otherwise
function isCurrent(coordinate) {
  return lightCell(coordinate) === "~";
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
  // // Determine index of top coordinate
  // let topCoord =  
  // // Determine bottom coordinate
  // let bottomCoord =
  // // Determine left coordinate
  // let leftCoord = 
  // // Determine right coordinate
  // let rightCoord = 
}


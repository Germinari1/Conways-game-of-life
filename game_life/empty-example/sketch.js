/*-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
//* Author: Lucas Germinari
//* Description: A visual representation of Conway's Game of Life (following the standard rules as per )
//* Notes:
  - Wrap around logic used for the edges
-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=*/

// Global variables for dimensions, grid, and states
let grid;
let cols;
let rows;
let resolution = 10; // Decreased resolution for a larger grid
let isPlaying = true;

// Colors
const aliveColor = [255, 255, 255]; // White
const deadColor = [25, 25, 25]; // Dark gray

// Initial density of live cells (0.0 - 1.0)
const initialDensity = 0.1;

function make2DArray(cols, rows) {
    /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Instanciates and returns a 2D array with the given dimensions
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
    return Array.from({ length: cols }, () => Array.from({ length: rows }, () => 0));
}

function setup() {
    /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Setup function for the Game of Life
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
    createCanvas(windowWidth, windowHeight); // Fullscreen canvas

    //calculate the number of columns and rows
    cols = floor(width / resolution);
    rows = floor(height / resolution);

    //create and populate the grid
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random() < initialDensity ? 1 : 0;
        }
    }

    // Get the "Play/Pause" button element
    // Get the "Play/Pause" button element
    const playPauseBtn = document.getElementById('playPauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Add an event listener for the "Play/Pause" button
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    });

    // Add an event listener for the "Reset" button
    resetBtn.addEventListener('click', resetGrid);
}

function resetGrid() {
  isPlaying = true;

  // Get the density value from the slider (0-100)
  const densitySlider = document.getElementById('densitySlider');
  const density = densitySlider.value / 100; // Convert to 0-1 range

  // Reset the grid with new random values based on the density
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() < density ? 1 : 0;
    }
  }
}

function countNeighbors(x, y) {
    /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Count the number of neighbors of a given cell
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
    let sum = 0;
    const offsets = [-1, 0, 1];

    for (const xOffset of offsets) {
        for (const yOffset of offsets) {
            if (xOffset === 0 && yOffset === 0) continue; // Skip the current cell
            const col = (x + xOffset + cols) % cols;
            const row = (y + yOffset + rows) % rows;
            sum += grid[col][row];
        }
    }

    return sum;
}

function draw() {
  background(0); // Black background

  // Display the grid
  for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
          const x = i * resolution;
          const y = j * resolution;
          const state = grid[i][j];

          fill(state === 1 ? aliveColor : deadColor);
          stroke(0); // Black outline
          rect(x, y, resolution, resolution);
      }
  }

  // Compute the next state and update the grid only when the game is playing
  if (isPlaying) {
      const nextGrid = grid.map((row, i) =>
          row.map((_, j) => {
              const state = grid[i][j];
              const neighbors = countNeighbors(i, j);

              return (state === 0 && neighbors === 3) ||
                  (state === 1 && (neighbors === 2 || neighbors === 3))
                  ? 1
                  : 0;
          })
      );

      // Update the grid with the next state
      grid = nextGrid;
  }
}
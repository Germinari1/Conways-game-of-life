# Conway's Game of Life

This project is a visual representation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway. It follows the standard rules of the game, which are:

1. Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Features

- A grid-based visualization of the Game of Life.
- Customizable grid size based on the user's screen resolution.
- Play/Pause and Reset buttons to control the simulation.
- A density slider to adjust the initial density of live cells.

## Dependencies

- [p5.js](https://p5js.org/) - A JavaScript library for creative coding.

## Usage

1. Open the `index.html` file in a web browser.
2. Use the "Play/Pause" button to start or stop the simulation.
3. Use the "Reset" button to reset the simulation with a new random seed based on the density slider value.
4. Adjust the density slider to change the initial density of live cells.

## Code Structure

- `index.html`: The main HTML file that includes the necessary scripts and styles.
- `sketch.js`: The JavaScript file containing the p5.js code for the Game of Life simulation.
- `style.css`: The CSS file for styling the user interface elements.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

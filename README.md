# Tic-Tac-Toe

A Tic-Tac-Toe web application built using Javascript, HTML, and CSS

[Live App](https://m-kwon.github.io/tic-tac-toe/)

## Table of Contents

- [Tic-Tac-Toe](#tic-tac-toe)
  - [Table of Contents](#table-of-contents)
  - [Objective](#objective)
  - [Scope](#scope)
  - [Credits](#credits)

## Objective

<details>

Source: <https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe>

1. Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

2. You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

    - Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

3. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

4. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

    - Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

5. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

7. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    - Start by just getting the computer to make a random legal move.

    - Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

</details>

<br/>

**Project Objective Source**: <https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe>

## Scope

- Build a Tic-Tac-Toe web application to practice using factory functions and to reduce usage of global variables as much as possible.

## Built with

- Javascript
- HTML
- CSS

## Summary

### What I learned

- Practiced using factory functions
- Practiced basic CSS skills
- Practiced mobile design with CSS

## Credits

- The Odin Project
  - Source: <https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe>
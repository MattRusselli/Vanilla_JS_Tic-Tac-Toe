////////////////////////////////
// Global Variables Here
const playerOne = 'Player X'
const playerTwo = 'Player O'
const tie = 'Tie'

let board = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let gameOn = true

const tiles = Array.from(document.querySelectorAll('.tile'))
const displayPlayer = document.querySelector('.display-player')
const resetButton = document.querySelector('#reset')
const state = document.querySelector('.announcer')

//Win Conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

////////////////////////////////
// Functions For Game Logic Here

function results() {
  let resultWin = false
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i]
    const first = board[winCondition[0]]
    const second = board[winCondition[1]]
    const third = board[winCondition[2]]
    if (first === '' || second === '' || third === '') {
      continue
    }
    if (first === second && second === third) {
      resultWin = true
      break
    }
  }

  if (resultWin) {
    announce(currentPlayer === 'X' ? playerOne : playerTwo)
    gameOn = false
    return
  }

  if (!board.includes('')) announce(tie)
}

const announce = (type) => {
  switch (type) {
    case playerTwo:
      state.innerHTML =
        'Player <span class="playerO">O</span> Has Beaten Player <span class="playerX">X</span>!'
      break
    case playerOne:
      state.innerHTML =
        'Player <span class="playerX">X</span> Has Beaten Player <span class="playerO">O</span>!'
      break
    case tie:
      state.innerText = "It's a Tie :("
  }
  state.classList.remove('hide')
}

const validChoice = (tile) => {
  if (tile.innerText === 'X' || tile.innerText === 'O') {
    return false
  }

  return true
}

const gameUpdates = (index) => {
  board[index] = currentPlayer
}

const changePlayer = () => {
  displayPlayer.classList.remove(`player${currentPlayer}`)
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  displayPlayer.innerText = currentPlayer
  displayPlayer.classList.add(`player${currentPlayer}`)
}

const userMove = (tile, index) => {
  if (validChoice(tile) && gameOn) {
    tile.innerText = currentPlayer
    tile.classList.add(`player${currentPlayer}`)
    gameUpdates(index)
    results()
    changePlayer()
  }
}

const gameReset = () => {
  board = ['', '', '', '', '', '', '', '', '']
  gameOn = true
  state.classList.add('hide')

  if (currentPlayer === 'O') {
    changePlayer()
  }

  tiles.forEach((tile) => {
    tile.innerText = ''
    tile.classList.remove('playerX')
    tile.classList.remove('playerO')
  })
}

////////////////////////////////
// Event Listeners Here

window.addEventListener('DOMContentLoaded', () => {
  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userMove(tile, index))
  })

  resetButton.addEventListener('click', gameReset)
})
////////////////////////////////
//Credit: I used these resources to follow along/help understand and build this code:

//https://dev.to/javascriptacademy/create-a-simple-tic-tac-toe-game-using-html-css-javascript-i4k

//https://www.javascripttutorial.net/javascript-dom/javascript-queryselector/#:~:text=The%20querySelector()%20is%20a,one%20or%20more%20CSS%20selectors.&text=In%20this%20syntax%2C%20the%20selector,descendant%20elements%20of%20the%20parentNode%20.

//i was able to know what i wanted to do to get started, but i kept drawing a blank on actually writing the code. once I have an example and read the code i tend to understand it, but right now i'm struggling to build the code on my own.

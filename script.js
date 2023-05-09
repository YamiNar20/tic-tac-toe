//IIFE Immediateely Invocked Functions Expression

//IPO-> Input, Process & Output
(function(){


// Constants-data that does not change

const winingCOMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
const LOOKUP = {
    '1': 'X',
    '-1': '0',
    'null': ''
};

//Variables (Application  State)- data that changes
let turn, winner, gameboard;
// Cached element references
const messageEl = document.querySelector('h2');
const gameboardEl= document.getElementById('gameboard');
const squareEls = document.querySelectorAll('.square');
const buttonEl = document.querySelector('button');
const canvas = document.querySelector('canvas');
const jsConfetti = new JSConfetti();

//Event Listeners
gameboardEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', init)
buttonEl.addEventListener('click',() => {
    jsConfetti.addConfetti()
})


//Functions

//Start the game upon initial load and whenever the resdt button is clicked
init();

function init() {
//pick and set the turn
turn= 1;// X will go first
//set winner to false
winner = false;
//set up the in memory gameboard to empty
//gameboard=[null, null,null,null,null, null,null, null, null];
gameboard = new Array(9).fill(null);
//visualize a new game to the DOM
render();
}

function checkWinner(){
    //loop over the combos array and check each collection of combination values
    for(let i = 0; i< winingCOMBOS.length; i++) {
        if(Math.abs(gameboard[winingCOMBOS[i][0]] +
                    gameboard[winingCOMBOS[i][1]] +
                    gameboard[winingCOMBOS[i][2]]) === 3) {
                return gameboard[winingCOMBOS[i][0]];
            }
    }

    if(gameboard.includes(null)) return false; 
    return 'T';
    //against the corresponding values inside of the gameboard array
}
function handleClick(event) {
    alert('Something in the gameboard was clicked');
    const position= event.target.dataset.index;
    if(gameboard[position] !== null) return; // exit the function's execution
    console.log(position);
    gameboard[position] = turn;
    turn *= -1;
    winner = checkWinner();
    console.log(gameboard);
    render();
}

function render() {
    squareEls.forEach (function(square, position){
        square.textContent = LOOKUP[gameboard[position]];
});
if(!winner) {
messageEl.textContent = `Player ${LOOKUP [turn]}'s turn `;
} else if (winner === 'T'){
    messageEl.textContent = 'Tie Game';
} else{
    messageEl.textContent = `Player ${LOOKUP[winner]} Wins!`;
}
}
})()
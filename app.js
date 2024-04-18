const board = document.querySelectorAll(".board div");
const player = document.querySelector(".player");
const winner = document.querySelector(".winner");
const restartBtn = document.querySelector(".restart-btn");
const possibilidades = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["7", "5", "3"],
];
let color = []
let vencedor = false;
let x = [];
let o = [];
let boardArray = Array.from(board);



// INICIAR O JOGO 
function startGame() {
  board.forEach((e) => {
    e.addEventListener("click", handleClick);
  });
}

function handleClick(e) {
  play(e.target, e.target.dataset.id);
  if (vencedor) {
    winner.innerHTML = e.target.innerHTML;
    alert("Temos um vencedor! Fim de jogo");
    paintWinner();
    disableBoard();
  } else if(checkIfFull()) {
    alert("Jogo empatado. Comece novamente");
    disableBoard();
  }
}



//FUNÇÃO PARA RETIRAR O LISTENER DE EVENTO DO TABULEIRO (PARA CONGELAR QDO O JOGO ACABAR)
function disableBoard() {
  board.forEach((e) => {
    e.removeEventListener("click", handleClick);
  });
}



// FUNÇÃO PARA REINICIAR A PARTIDA
restartBtn.addEventListener("click", restartGame);
function restartGame() {
  boardArray.forEach((b) => {
    b.innerHTML = "";
  });
  x = [];
  o = [];
  vencedor = false;
  winner.innerHTML = '';
  paintWinner();
  startGame();
}


// FUNÇÃO PARA VERIFICAR A JOGADA
function play(cel, celPosition) {
  if (cel.innerHTML != "") {
    alert("CÉLULA OCUPADA");
  } else {
    cel.innerHTML = player.innerHTML;
    if (player.innerHTML == "x") {
      x.push(celPosition);
      checkWin(x);
      player.innerHTML = "o";
    } else if (player.innerHTML == "o") {
      o.push(celPosition);
      checkWin(o);
      player.innerHTML = "x";
    }
  }
}


// FUNÇÃO PARA VERIFICAR SE HOUVE GANHADOR
function checkWin(jogador) {
  let contador = 0;
  possibilidades.forEach((item) => {
    jogador.forEach((element) => {
      if (item.includes(element)) {
        contador++;
        color.push(element)
      }
    });
    if (contador >= 3) {
      vencedor = true;
    } else {
      contador = 0;
      color = []
    }
  });
}


// FUNÇÃO PARA VERIFICAR SE TODAS AS CÉLULAS DO TABULEIRO FORAM PREENCHIDAS
function checkIfFull() {
  let full = boardArray.every((b) => (b.innerHTML !== ""));
  return full;
}


// FUNÇÃO PARA PINTAR AS CÉLULAS DO VENCEDOR
function paintWinner () {
  color.forEach ((c) => {
    board.forEach ((b) => {
      if (b.dataset.id == c) {
        b.classList.toggle ('bg-winner')
      }
    })
  })
}

startGame();
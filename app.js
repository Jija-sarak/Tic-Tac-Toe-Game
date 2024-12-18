const boxes = document.querySelectorAll(".box");
let index = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
const winPatterns = [
  ["0", "1", "2"],
  ["0", "3", "6"],
  ["0", "4", "8"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["2", "4", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
];
const msg = document.getElementById("msg");

let isWinner;

// Define the event listener function
function handleClick(e) {
  const id = e.target.getAttribute("id");
  index = index.filter((i) => i !== id);
  CheckPattern(id);

  // Remove the event listener after execution
  e.target.removeEventListener("click", handleClick);
}

function CheckPattern(id) {
  // Player move
  boxes[id].innerHTML = "X";

  // Computer move
  if (index.length > 0) {
    const randomIndex = Math.floor(Math.random() * index.length);
    const computerMoveId = index[randomIndex];
    boxes[computerMoveId].innerHTML = "O";

    // Remove the computer's move from the index array
    index = index.filter((i) => i !== computerMoveId);
    // Remove the click event listener from the box where the computer placed its move
    boxes[computerMoveId].removeEventListener("click", handleClick);
  }

  isWinner = checkWinner();

  if (index.length == 0 && !isWinner) {
    msg.innerText = 'Game was a Draw.';
    msg.style.color = "red";
    msg.style.display = "block";
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const pos1 = boxes[pattern[0]].innerText;
    const pos2 = boxes[pattern[1]].innerText;
    const pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3 && pos1 === pos3) {
        msg.innerText = `Congratulations, Winner is ${pos1}`;
        msg.style.color = "green";
        msg.style.display = "block";

        for (let i of index) {
          boxes[i].removeEventListener("click", handleClick);
        }
        return true;
      }
    }
  }

  return false;
}

// Add the event listener
boxes.forEach((box) => {
  box.addEventListener("click", handleClick);
});

function resetGame() {
  index = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

  // disable msg
  msg.style.display = "none";
  // Add the event listener & remove the previous moves
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.addEventListener("click", handleClick);
  });
}

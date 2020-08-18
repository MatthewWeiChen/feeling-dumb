const clickHereBtn = document.getElementById('click-here-btn')
clickHereBtn.addEventListener('click', generateSelection);
const hideThis = document.querySelectorAll('.hide-this');
const container = document.querySelector('.container');

const selectionInfo = ["Read a Dumb Quote", "Inspirational Quote"]

function generateSelection(event) {
  for (let i = 0; i < hideThis.length; i++) {
    hideThis[i].className = "hidden"
  }
  for (let i = 0; i < selectionInfo.length; i++) {
    let rowContainer = document.createElement('div');
    rowContainer.classList.add("row", "justify-content-center");
    let dumbHeading = document.createElement('h1');
    dumbHeading.className = "heading-selection";
    dumbHeading.textContent = selectionInfo[i]
    let buttonRow = document.createElement('div');
    buttonRow.classList.add("row", "justify-content-center");
    let topButton = document.createElement('button');
    topButton.className = "circle-button";
    topButton.textContent = "Press";
    rowContainer.appendChild(dumbHeading);
    buttonRow.appendChild(topButton);
    container.appendChild(rowContainer);
    container.appendChild(buttonRow);
  }
}

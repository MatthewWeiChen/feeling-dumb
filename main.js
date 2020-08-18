let clickHereBtn = document.getElementById('click-here-btn')
clickHereBtn.addEventListener('click', generateSelection);

let hideThis = document.querySelectorAll('.hide-this');

function generateSelection() {
  hideThis.className = "hidden"
}

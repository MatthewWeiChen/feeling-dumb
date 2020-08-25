const clickHereBtn = document.getElementById('click-here-btn')
const rows = document.querySelectorAll('.row');
const hideThis = document.querySelectorAll('.hide-this');
const container = document.querySelector('.container');
const currentRows = document.querySelectorAll('.selection-content');
const loader = document.getElementById('loader');

function showView(viewName) {
  const views = document.querySelectorAll('.view')
  for (let i = 0; i < views.length; i++) {
    if (views[i].dataset.viewName === viewName) {
      views[i].classList.remove('hidden')
    } else {
      views[i].classList.add('hidden')
    }
  }
}
clickHereBtn.addEventListener('click', () => {
  showView('selection')
})

let dumbQuoteBtn = document.querySelectorAll('button')[1];
dumbQuoteBtn.addEventListener("click", populateDumbPage);
let inspirationQuoteBtn = document.querySelector('#go-to-inspire')
inspirationQuoteBtn.addEventListener("click", populateInspirePage)


function populateDumbPage(event) {
  const currentTitle = document.createElement('h1')
  showView('on purpose to fail')
  currentTitle.textContent = "Dumb Quote";
  currentTitle.className = "quote-title";
  container.append(currentTitle);


  $.ajax({
    Method: "GET",
    url: "https://tronalddump.io/random/quote",
    beforeSend: function () {
      $("#loader").removeClass('hidden');
    },
    success: quoteReceived,
    complete: function () {
      $("#loader").addClass('hidden');
    },
    error: quoteRetrievalFailed
  })

  function quoteReceived(quote) {
    const $quote = document.createElement('div');
    const quoteTextContainer = document.createElement('div');
    const quoteText = document.createElement('div');
    const quoteRow = document.createElement('div');
    quoteRow.classList.add('row', 'justify-content-center', 'quote-row')
    $quote.classList.add("quote-box", "row", 'justify-content-center', 'view');
    quoteTextContainer.classList.add('quote-text-container')
    quoteText.classList.add("quote-text");
    quoteText.innerText = `${quote.value}

    -Donald Trump`;
    quoteRow.append($quote);
    quoteTextContainer.append(quoteText);
    $quote.append(quoteTextContainer);
    container.append(quoteRow);
  }

  function quoteRetrievalFailed(err) {
    const $error = document.createElement('div');
    const $errorBtn = document.createElement('button');
    $errorBtn.classList.add('btn-custom', 'absolute-position')
    $errorBtn.append($error);
    $error.textContent = "Error - Try Again"
    container.append($errorBtn);

    $errorBtn.addEventListener('click', () => {
      $.ajax({
        Method: "GET",
        url: "https://tronalddump.io/random/quote",
        beforeSend: function () {
          $("#loader").removeClass('hidden');
        },
        success: function (quote) {
          $errorBtn.remove();
          quoteReceived(quote);
        },
        complete: function () {
          $("#loader").addClass('hidden');
        },
      })
    })

  }
  createHomeButton();
}

function populateInspirePage() {

  const currentTitle = document.createElement('h1');
  showView(!'selection')
  currentTitle.textContent = "Inspiring Quote";
  currentTitle.className = "quote-title";
  container.append(currentTitle);

  $.ajax({
    Method: "GET",
    url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
    beforeSend: function () {
      $("#loader").removeClass('hidden');
    },
    success: quoteReceived,
    complete: function () {
      $("#loader").addClass('hidden');
    },
    error: quoteRetrievalFailed
  })

  function quoteReceived(quote) {
    const $quote = document.createElement('div');
    const quoteTextContainer = document.createElement('div');
    const quoteText = document.createElement('div');
    const quoteRow = document.createElement('div');
    quoteRow.classList.add('row', 'justify-content-center')
    $quote.classList.add("quote-box", 'justify-content-center', 'view');
    quoteTextContainer.classList.add('quote-text-container')
    quoteText.classList.add("quote-text");
    quoteText.innerText = `${quote.quote.quoteText}

    -${quote.quote.quoteAuthor}`;
    quoteRow.append($quote);
    quoteTextContainer.append(quoteText);
    $quote.append(quoteTextContainer);
    container.append(quoteRow);
  }

  function quoteRetrievalFailed(err) {
    const $error = document.createElement('div');
    const $errorBtn = document.createElement('button');
    $errorBtn.classList.add('btn-custom', 'absolute-position')
    $errorBtn.append($error);
    $error.textContent = "Error - Try Again"
    container.append($errorBtn);

    $errorBtn.addEventListener('click', () => {
      $.ajax({
        Method: "GET",
        url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
        beforeSend: function () {
          $("#loader").removeClass('hidden');
        },
        success: function (quote) {
          $errorBtn.remove();
          quoteReceived(quote);
        },
        complete: function () {
          $("#loader").addClass('hidden');
        },
      })
    })
  }
  createHomeButton();
}

function returnHome() {
  const hideRow = document.querySelector('.quote-row')
  container.removeChild(hideRow);
  const titleOfPage = document.querySelector('.quote-title');
  container.removeChild(titleOfPage);
  const homeRow = document.querySelector('.home-row');
  container.removeChild(homeRow);

  showView('home');
}

function createHomeButton() {
  const createHome = document.createElement('button')
  const homeRow = document.createElement('div')
  homeRow.classList.add('row', 'justify-content-center', 'home-row')
  createHome.classList.add('return-home', 'btn-custom', 'justify-content-center')
  createHome.textContent = "Return to Home"
  createHome.addEventListener("click", returnHome)
  homeRow.append(createHome)
  container.append(homeRow)
}

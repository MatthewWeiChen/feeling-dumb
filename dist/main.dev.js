"use strict";

var clickHereBtn = document.getElementById('click-here-btn');
var rows = document.querySelectorAll('.row');
var hideThis = document.querySelectorAll('.hide-this');
var container = document.querySelector('.container');
var currentRows = document.querySelectorAll('.selection-content');
var loader = document.getElementById('loader');

function showView(viewName) {
  var views = document.querySelectorAll('.view');

  for (var i = 0; i < views.length; i++) {
    if (views[i].dataset.viewName === viewName) {
      views[i].classList.remove('hidden');
    } else {
      views[i].classList.add('hidden');
    }
  }
}

clickHereBtn.addEventListener('click', function () {
  showView('selection');
});
var dumbQuoteBtn = document.querySelectorAll('button')[1];
dumbQuoteBtn.addEventListener("click", populateDumbPage);
var inspirationQuoteBtn = document.querySelector('#go-to-inspire');
inspirationQuoteBtn.addEventListener("click", populateInspirePage);

function populateDumbPage(event) {
  var currentTitle = document.createElement('h1');
  showView('on purpose to fail');
  currentTitle.textContent = "Dumb Quote";
  currentTitle.className = "quote-title";
  container.append(currentTitle);
  $.ajax({
    Method: "GET",
    url: "https://tronalddump.io/random/quote",
    beforeSend: function beforeSend() {
      $("#loader").removeClass('hidden');
    },
    success: quoteReceived,
    complete: function complete() {
      $("#loader").addClass('hidden');
    },
    error: quoteRetrievalFailed
  });

  function quoteReceived(quote) {
    var $quote = document.createElement('div');
    var quoteTextContainer = document.createElement('div');
    var quoteText = document.createElement('div');
    var quoteRow = document.createElement('div');
    quoteRow.classList.add('row', 'justify-content-center', 'quote-row');
    $quote.classList.add("quote-box", "row", 'justify-content-center', 'view');
    quoteTextContainer.classList.add('quote-text-container');
    quoteText.classList.add("quote-text");
    quoteText.innerText = "".concat(quote.value, "\n\n    -Donald Trump");
    quoteRow.append($quote);
    quoteTextContainer.append(quoteText);
    $quote.append(quoteTextContainer);
    container.append(quoteRow);
  }

  function quoteRetrievalFailed(err) {
    var $error = document.createElement('div');
    var $errorBtn = document.createElement('button');
    $errorBtn.classList.add('btn-custom', 'absolute-position');
    $errorBtn.append($error);
    $error.textContent = "Error - Try Again";
    container.append($errorBtn);
    $errorBtn.addEventListener('click', function () {
      $.ajax({
        Method: "GET",
        url: "https://tronalddump.io/random/quote",
        beforeSend: function beforeSend() {
          $("#loader").removeClass('hidden');
        },
        success: function success(quote) {
          $errorBtn.remove();
          quoteReceived(quote);
        },
        complete: function complete() {
          $("#loader").addClass('hidden');
        }
      });
    });
  }

  createHomeButton();
}

function populateInspirePage() {
  var currentTitle = document.createElement('h1');
  showView(!'selection');
  currentTitle.textContent = "Inspiring Quote";
  currentTitle.className = "quote-title";
  container.append(currentTitle);
  $.ajax({
    Method: "GET",
    url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
    beforeSend: function beforeSend() {
      $("#loader").removeClass('hidden');
    },
    success: quoteReceived,
    complete: function complete() {
      $("#loader").addClass('hidden');
    },
    error: quoteRetrievalFailed
  });

  function quoteReceived(quote) {
    var $quote = document.createElement('div');
    var quoteTextContainer = document.createElement('div');
    var quoteText = document.createElement('div');
    var quoteRow = document.createElement('div');
    quoteRow.classList.add('row', 'justify-content-center', 'quote-row');
    $quote.classList.add("quote-box", "row", 'justify-content-center', 'view');
    quoteTextContainer.classList.add('quote-text-container');
    quoteText.classList.add("quote-text");
    quoteText.innerText = "".concat(quote.quote.quoteText, "\n\n    -").concat(quote.quote.quoteAuthor);
    quoteRow.append($quote);
    quoteTextContainer.append(quoteText);
    $quote.append(quoteTextContainer);
    container.append(quoteRow);
  }

  function quoteRetrievalFailed(err) {
    var $error = document.createElement('div');
    var $errorBtn = document.createElement('button');
    $errorBtn.classList.add('btn-custom', 'absolute-position');
    $errorBtn.append($error);
    $error.textContent = "Error - Try Again";
    container.append($errorBtn);
    $errorBtn.addEventListener('click', function () {
      $.ajax({
        Method: "GET",
        url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
        beforeSend: function beforeSend() {
          $("#loader").removeClass('hidden');
        },
        success: function success(quote) {
          $errorBtn.remove();
          quoteReceived(quote);
        },
        complete: function complete() {
          $("#loader").addClass('hidden');
        }
      });
    });
  }

  createHomeButton();
}

function returnHome() {
  var hideRow = document.querySelector('.quote-row');
  container.removeChild(hideRow);
  var titleOfPage = document.querySelector('.quote-title');
  container.removeChild(titleOfPage);
  var homeRow = document.querySelector('.home-row');
  container.removeChild(homeRow);
  showView('home');
}

function createHomeButton() {
  var createHome = document.createElement('button');
  var homeRow = document.createElement('div');
  homeRow.classList.add('row', 'justify-content-center', 'home-row');
  createHome.classList.add('return-home', 'btn-custom', 'justify-content-center');
  createHome.textContent = "Return to Home";
  createHome.addEventListener("click", returnHome);
  homeRow.append(createHome);
  container.append(homeRow);
}
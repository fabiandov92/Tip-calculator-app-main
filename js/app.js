//*************************************Global Variables******************//
var billAmount = 0;
var peopleCount = 0;
var tip = 0;

//*************************************Functions************************//
function roundUpTwoDecimals(num) {
  return (Math.round(num * 100)) / 100;
}

function tipAmountPerPerson(bill, tip, numPeople) {
  var tipPerPerson = roundUpTwoDecimals((bill * tip) / numPeople);
  document.querySelector(".tip-amount").innerHTML = "$" + tipPerPerson;
  return tipPerPerson;
}

function totalAmountPerPerson(bill, tip, numPeople) {
  var totalPerPerson = roundUpTwoDecimals(bill / numPeople + ((bill * tip) / numPeople));
  document.querySelector(".total-amount").innerHTML = "$" + totalPerPerson;
  return totalPerPerson;
}

function addWarning() {
  document.querySelector(".people-amount-input").classList.add("warning-active");
  document.querySelector(".none-zero-warning").classList.remove("zero-warning-off");
}

function dropWarning() {
  document.querySelector(".people-amount-input").classList.remove("warning-active");
  document.querySelector(".none-zero-warning").classList.add("zero-warning-off");
}

function btnActive(btnclass) {

  for (var i = 0; i < document.querySelectorAll('.btn').length - 1; i++) {
    document.querySelectorAll('.btn')[i].classList.remove("btn-active");
  }
  if (btnclass != "input-custom") {
    document.querySelector("." + btnclass).classList.add("btn-active");
    document.querySelector(".input-custom").value = '';
    document.querySelector(".input-custom").attributes.placeholder.nodeValue = 'Custom';
  } else {

  }

}

function inputValidation() {
  if (peopleCount === 0) {
    // Zero Warning Active
    addWarning();
  } else if (peopleCount < 0 || billAmount < 0 || tip < 0) {
    if (peopleCount < 0) {
      alert(peopleCount + " is not a valid entry");
    }
    if (billAmount < 0) {
      alert(billAmount + " is not a valid entry");
    }
    if (tip < 0) {
      alert(roundUpTwoDecimals(tip * 100) + " is not a valid entry");
    }

  } else if (!isNaN(billAmount) && !isNaN(peopleCount)) {
    dropWarning();
    if (!isNaN(tip)) {
      tipAmountPerPerson(billAmount, tip, peopleCount);
      var checkTotal = totalAmountPerPerson(billAmount, tip, peopleCount);
      if (checkTotal != 0) {
        document.querySelector(".reset-btn").classList.remove("reset-btn-inactive");
      }
    }
  }
}

function scanEntry() {
  billAmount = document.querySelector(".bill-amount-input").valueAsNumber;
  peopleCount = document.querySelector(".people-amount-input").valueAsNumber;

  inputValidation();
}

function scanBtnEntry(btnClass) {

  switch (btnClass) {
    case "btn5":
      tip = 0.05;
      break;
    case "btn10":
      tip = 0.10;
      break;
    case "btn15":
      tip = 0.15;
      break;
    case "btn25":
      tip = 0.25;
      break;
    case "btn50":
      tip = 0.5;
      break;
    case "input-custom":
      tip = (document.querySelector(".input-custom").valueAsNumber) / 100;
      break;
    default:
      tip = 0;
  }
}

//***********************Event Listeners************************************//
document.querySelector(".bill-amount-input").addEventListener("click", function(e) {
  document.querySelector(".bill-amount-input").value = '';
});
document.querySelector(".people-amount-input").addEventListener("click", function(e) {
  document.querySelector(".people-amount-input").value = '';
});

document.querySelector(".bill-amount-input").addEventListener("change", function(e) {
  scanEntry();
});

document.querySelector(".people-amount-input").addEventListener("change", function(e) {
  scanEntry();
});

for (var i = 0; i < document.querySelectorAll('.btn').length - 1; i++) {

  document.querySelectorAll('.btn')[i].addEventListener("click", function(e) {

    var btnClass = e.srcElement.classList[1];
    btnActive(btnClass);
    scanBtnEntry(btnClass);
    scanEntry();
  });
}

document.querySelector(".input-custom").addEventListener("change", function(e) {

  e.target.attributes.placeholder.nodeValue = '';
  var btnClass = e.srcElement.classList[1];
  scanBtnEntry(btnClass);
  scanEntry();
});

document.querySelector(".input-custom").addEventListener("click", function(e) {

  e.target.attributes.placeholder.nodeValue = '';
  var btnClass = e.srcElement.classList[1];
  btnActive(btnClass);
});


document.querySelector(".reset-btn").addEventListener("click", function() {

  for (var i = 0; i < document.querySelectorAll('.btn').length - 1; i++) {
    document.querySelectorAll('.btn')[i].classList.remove("btn-active");
  }
  document.querySelector(".bill-amount-input").value = 0;
  document.querySelector(".people-amount-input").value = 0;
  document.querySelector(".input-custom").value = '';
  document.querySelector(".input-custom").attributes.placeholder.nodeValue = 'Custom';
  document.querySelector(".tip-amount").innerHTML = "$0.00";
  document.querySelector(".total-amount").innerHTML = "$0.00";
  billAmount = 0;
  peopleCount = 0;
  tip = 0;
  document.querySelector(".reset-btn").classList.add("reset-btn-inactive");
});

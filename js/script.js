let table = "";
let tableTotal = "";
let ttOne = "";
let ttTotal = "";
let totalAmount = 0;
let date = "";
let priceArray = [];
let qtyArray = [];
let discArray = [];
let totalArray = [];
let numberOfRows = 1;

window.onload = () => {
  var inputArray = [
    document.getElementById("txt-input-one"),
    document.getElementById("txt-input-two"),
    document.getElementById("txt-input-three"),
    document.getElementById("txt-input-four"),
    document.getElementById("txt-input-five"),
    document.getElementById("txt-input-six"),
    document.getElementById("date-in"),
    document.getElementById("month-in"),
    document.getElementById("year-in"),
    document.getElementById("txt-input-ten")
  ];

  var outputArray = [
    document.getElementById("client-name"),
    document.getElementById("client-id"),
    document.getElementById("client-address"),
    document.getElementById("client-phone"),
    document.getElementById("order-id"),
    document.getElementById("invoice-id"),
    null,
    null,
    null,
    document.getElementById("prepaid")
  ];

  
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", function () {
      if (i == 1 || i == 4 || i == 5) {
        console.log("1.4.5");
        outputArray[i].innerText = inputArray[i].value
          .toString()
          .padStart(5, "0");
      } 
      else if (i == 6 || i == 7 || i == 8) {
        if(i == 6){
          document.getElementById('date').innerText = inputArray[i].value;
        } else if(i == 7){
          document.getElementById('month').innerText = inputArray[i].value;
        } else if(i == 8){
          document.getElementById('year').innerText = inputArray[i].value;
        }
      } else if (i == 9){
        outputArray[i].innerText = inputArray[i].value;
        total();
      }else {
        outputArray[i].innerText = inputArray[i].value;
      }
    });
  }

  //Variables update on Load
  tableTotal = document.getElementById("table-total");
  table = document.getElementById("table");
  ttOne = tableTotal.getElementsByClassName("cell-1")[0];
  ttTotal = tableTotal.getElementsByClassName("cell-6")[0];

  //Functions on Load
  tArray();
  total();
  dateSetup();
  arrayUpdate();
  arrayEventsBegin();

  //Notifying the load
  console.log("loaded");
}

// Adds a new row in table
function addRow() {
  numberOfRows++;

  table.innerHTML =
    document.getElementById("table").innerHTML +
    `
    <div contenteditable class="cell cell-1">${numberOfRows}</div>
                        <div contenteditable class="cell cell-2">Item</div>
                        <div contenteditable class="cell cell-3">1000</div>
                        <div contenteditable class="cell cell-4">2</div>
                        <div contenteditable class="cell cell-5">0</div>
                        <div class="cell cell-6">2000</div>`;
                        
    arrayUpdate();
}

//Making the totalArray - array of all the individual total cells
function tArray() {
  totalArray = [];
  for (
    let i = 1;
    i < document.getElementsByClassName("cell-6").length - 1;
    i++
  ) {
    totalArray.push(document.getElementsByClassName("cell-6")[i]);
  }
}

// Making the array of price elements
function pArray() {
  priceArray = [];
  for (
    let i = 1;
    i < document.getElementsByClassName("cell-3").length - 1;
    i++
  ) {
    priceArray.push(document.getElementsByClassName("cell-3")[i]);
  }
}

// Making the array of price elements
function qArray() {
  qtyArray = [];
  for (
    let i = 1;
    i < document.getElementsByClassName("cell-4").length - 1;
    i++
  ) {
    qtyArray.push(document.getElementsByClassName("cell-4")[i]);
  }
}

// Making the array of price elements
function dArray() {
  discArray = [];
  for (
    let i = 1;
    i < document.getElementsByClassName("cell-5").length - 1;
    i++
  ) {
    discArray.push(document.getElementsByClassName("cell-5")[i]);
  }
}



//update a row
  function totalUpdate(num){
    console.log(num);
    let one = Number(priceArray[num].innerText) * Number(qtyArray[num].innerText);
    let two = Number(discArray[num].innerText) * Number(qtyArray[num].innerText);
    totalArray[num].innerText = one - two;
    total();
  }


// Updating the Grand Total Figures
function total() {
  totalAmount = 0;
  for (i = 1; i < document.getElementsByClassName("cell-6").length - 1; i++) {
    totalAmount =
      totalAmount +
      Number(document.getElementsByClassName("cell-6")[i].innerText);
  }
  ttTotal.innerText = totalAmount;
  document.getElementById('subtotal').innerText = totalAmount;
  document.getElementById('payable').innerText = (Number(document.getElementById('subtotal').innerText) - Number(document.getElementById('prepaid').innerText))

}

total();

function printStart() {
  var starter = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>INV-${document.getElementById('invoice-id').innerHTML}</title>
        <link rel="stylesheet" href="css/print.css">
    </head>
    <body>`;
  var printable = document.getElementById("printspace").outerHTML;
  var end = `</body>
    </html>`;
  var newWindowContent = `${starter}
    ${printable}
    ${end}`;
  var newWindow = window.open("", "", "");
  newWindow.document.write(newWindowContent);
  setTimeout(function(){
    newWindow.print();
    newWindow.close();
  }, 1000);
}

//Set date in the PDF
function dateSetup(){
  date = new Date();
  document.getElementById('date').innerText = date.getDate();
  document.getElementById('month').innerText = (Number(date.getMonth())+1);
  document.getElementById('year').innerText = date.getFullYear();
}

function arrayUpdate(){
  tArray();
  total();
  pArray();
  qArray();
  dArray();
  arrayEventsBegin();
}

function arrayEventsBegin(){

  //price array
for (let i = 0; i < priceArray.length; i++) {
  priceArray[i].addEventListener("input", function () {
    totalUpdate(i);
  });
}

//qty Array
for (let i = 0; i < qtyArray.length; i++) {
  qtyArray[i].addEventListener("input", function () {
    totalUpdate(i);
  });
}

//disc array
for (let i = 0; i < discArray.length; i++) {
  discArray[i].addEventListener("input", function () {
    totalUpdate(i);
  });
}
}
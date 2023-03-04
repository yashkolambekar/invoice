let table = "";
let tableTotal = "";
let ttOne = "";
let ttTotal = "";
let totalArray = [];
let totalAmount = 0;

window.onload = () => {
  var inputArray = [
    document.getElementById("txt-input-one"),
    document.getElementById("txt-input-two"),
    document.getElementById("txt-input-three"),
    document.getElementById("txt-input-four"),
  ];

  var outputArray = [
    document.getElementById("client-name"),
    document.getElementById("client-id"),
    document.getElementById("client-address"),
    document.getElementById("client-phone"),
  ];

  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", function () {
      if (i == 1) {
        outputArray[i].innerText = inputArray[i].value
          .toString()
          .padStart(5, "0");
      } else {
        console.log(outputArray[i]);
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
//   tUpdate();
//   tUpdate();

  //Notifying the load
  console.log("loaded");
};

let numberOfRows = 1;

function addRow() {
  numberOfRows++;
  ttOne.innerText = numberOfRows;

  table.innerHTML =
    document.getElementById("table").innerHTML +
    `
    <div contenteditable class="cell cell-1">${numberOfRows}</div>
                        <div contenteditable class="cell cell-2">Website Redesign lsafifhdufh</div>
                        <div contenteditable class="cell cell-3">1000</div>
                        <div contenteditable class="cell cell-4">2</div>
                        <div contenteditable class="cell cell-5">0</div>
                        <div contenteditable class="cell cell-6">2000</div>`;
  tArray();
  total();
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

// Grand Total Update when any individual total Updates
// function tUpdate() {
//   for (let i = 0; i < totalArray.length; i++) {
//     document.getElementsByClassName('cell-6')[i]
//       .addEventListener("input", function () {
//         total();
//       });
//   }
// }

//Updating the Grand Total Figures
function total() {
  totalAmount = 0;
  for (i = 1; i < document.getElementsByClassName("cell-6").length - 1; i++) {
    totalAmount =
      totalAmount +
      Number(document.getElementsByClassName("cell-6")[i].innerText);
  }
  ttTotal.innerText = totalAmount;
}

total();

function printStart() {
  var starter = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Print this shiii</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/print.css">
        <script src="js/script.js"></script>

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
}

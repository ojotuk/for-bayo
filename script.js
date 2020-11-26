let incomeDivList = document.querySelector(".income__list");
let expenseDivList = document.querySelector(".expenses__list");
let availableBudget = document.querySelector("#availableBudget");
let counter = 2;

class Transaction {
  constructor(description, amount) {
    this.description = description;
    this.amount = amount;
    this.date = new Date().toISOString().slice(0, 10);
    this.id = counter++;
  }
}

class TransactionList {
  constructor() {
    this.incomeList = [];
    this.expenseList = [];
    this.id = counter++;
  }

  budgetSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    for (let a = 0; a < this.incomeList.length; a++) {
      let i = this.incomeList[a];
      totalIncome += parseInt(i.amount);
    }

    for (let a = 0; a < this.expenseList.length; a++) {
      let e = this.expenseList[a];
      totalExpense += parseInt(e.amount);
    }

    document.querySelector(".budget__value").innerHTML = 0;
    document.querySelector(".budget__income--value").innerHTML = 0;
    document.querySelector(".budget__expenses--value").innerHTML = 0;
    document.querySelector(".budget__expenses--percentage").innerHTML = "%";
  }

  createDivs(transaction, type) {
    var percentDiv = null;
    var descrDiv = document.createElement("div");
    descrDiv.className = "item__description";
    descrDiv.innerHTML = transaction.description;

    var rightDiv = document.createElement("div");
    rightDiv.className = "right";

    var amtDiv = document.createElement("div");
    amtDiv.className = "item__value";

    if (type == "income") {
      amtDiv.innerHTML = "$" + transaction.amount;
    } else {
      amtDiv.innerHTML = "$" + transaction.amount;
      percentDiv = document.createElement("div");
      percentDiv.className = "item__percentage";
      var total = 0;
      for (let a = 0; a < this.incomeList.length; a++) {
        let t = this.incomeList[a];
        total += parseInt(t.amount);
      }
      let perc = (amount.value / total) * 100;
      percentDiv.innerHTML = perc.toFixed(2);
      +"%";
    }

    var deleteDiv = document.createElement("div");
    deleteDiv.className = "item__delete";
    deleteDiv.addEventListener("click", (e) => {
      this.removeTransaction(transaction.id);
    });

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "item__delete--btn";

    var iconBtn = document.createElement("i");
    iconBtn.className = "ion-ios-close-outline";

    deleteBtn.appendChild(iconBtn);
    deleteDiv.appendChild(deleteBtn);

    rightDiv.appendChild(amtDiv);
    if (percentDiv != null) {
      rightDiv.appendChild(percentDiv);
    }
    rightDiv.appendChild(deleteDiv);

    var dateDiv = document.createElement("div");
    dateDiv.className = "item__date";
    dateDiv.innerHTML = new Date().toISOString().slice(0, 10);

    var parentDiv = document.createElement("div");
    parentDiv.className = "item";
    parentDiv.setAttribute("data-transaction-id", transaction.id);

    parentDiv.appendChild(descrDiv);
    parentDiv.appendChild(rightDiv);
    parentDiv.appendChild(dateDiv);

    if (type == "income") {
      incomeDivList.appendChild(parentDiv);
      this.incomeList.push(transaction);
    } else {
      expenseDivList.appendChild(parentDiv);
      this.expenseList.push(transaction);
    }
  }

  removeTransaction(id) {
    alert("remove element for id");
  }

  addNewTransaction(description, amount) {
    let transaction = new Transaction(description, amount);
    if (amount > 0) {
      this.createDivs(transaction, "income");
    } else {
      this.createDivs(transaction, "expenses");
    }
    this.budgetSummary();
  }
}

const transactionList = new TransactionList();

let description = document.querySelector(".add__description");
let amount = document.querySelector(".add__value");
let btn = document.querySelector(".add__btn");
document.querySelector(
  ".budget__title--month"
).innerHTML = new Date().toISOString().slice(0, 10);

///
function recordUiUpdater(income, expense) {
  let eachIncome = 0;
  let eachExpense = 0;
  let grossIncome = 0;
  let grossExpense = 0;
  let totalIncome = income.map((transaction) => {
    eachIncome = eachIncome + Number(transaction.amount);
    return eachIncome;
  });
  let totalExpense = expense.map((transaction) => {
    eachExpense = eachExpense + Number(transaction.amount);
    return eachExpense;
  });
  console.log(totalIncome, totalExpense);
  if (totalIncome.length > 0) {
    grossIncome = totalIncome[totalIncome.length - 1];
  }
  if (totalExpense.length > 0) {
    grossExpense = totalExpense[totalExpense.length - 1];
  }
  availableBudget.innerHTML = `$ ${grossExpense + grossIncome} .00`;
  document.querySelector(
    ".budget__income--value"
  ).innerHTML = `+${grossIncome}.00`;
  document.querySelector(
    ".budget__expenses--value"
  ).innerHTML = `${grossExpense}.00`;
}

btn.addEventListener("click", function (e) {
  if (description.value == "" || amount.value == "") return alert();
  else {
    transactionList.addNewTransaction(description.value, amount.value);
    recordUiUpdater(transactionList.incomeList, transactionList.expenseList);
    // console.log(transactionList.incomeList, transactionList.expenseList);
  }
});

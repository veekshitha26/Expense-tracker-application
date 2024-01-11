const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];



const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      category: category.value
      
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
    category.value = '';
  }
}
// Function to update analysis based on categories
function updateCategoryAnalysis() {
    const categories = {};
    transactions.forEach(transaction => {
      if (categories[transaction.category]) {
        categories[transaction.category] += Math.abs(transaction.amount);
      } else {
        categories[transaction.category] = Math.abs(transaction.amount);
      }
    });

    function removeTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
      
        updateLocalStorage();
      
        init();
      }
      
      // Update local storage transactions
      function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      }
      
      // Init app
      function init() {
        list.innerHTML = '';
      
        transactions.forEach(addTransactionDOM);
        updateValues();
        updateCategoryAnalysis(); // Update category analysis on initialization
      }
      
      init();
      
      form.addEventListener('submit', addTransaction);
  
    // Display the category analysis on the dashboard
    const categoryChart = document.getElementById('categoryChart');
    categoryChart.innerHTML = Object.entries(categories)
      .map(([category, amount]) => `<div>${category}: $${amount.toFixed(2)}</div>`)
      .join('');
  }
  

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
// Existing JavaScript code remains unchanged

// Function to add transaction to the DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
      ${transaction.text} (${transaction.category}) <span>${sign}${Math.abs(transaction.amount)}</span> 
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
  }
  
  // Function to calculate and display net income
  function calculateNetIncome() {
    const amounts = transactions.map(transaction => transaction.amount);
    const totalIncome = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const totalExpense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
    const netIncome = (totalIncome - totalExpense).toFixed(2);
  
    balance.innerText = `$${netIncome >= 0 ? netIncome : `(${Math.abs(netIncome)})`}`;
    money_plus.innerText = `$${totalIncome}`;
    money_minus.innerText = `$${totalExpense}`;
  }
  const billsList = document.getElementById('billsList');

// Function to add a new bill item
function addBill(name, dueDate, amount) {
  const billItem = document.createElement('div');
  billItem.classList.add('bill-item');

  billItem.innerHTML = `
    <h3>${name}</h3>
    <p>Due Date: ${dueDate}</p>
    <p>Amount: $${amount}</p>
  `;

  billsList.appendChild(billItem);
}


addBill('Electricity Bill', 'January 15, 2024', 150);
addBill('Internet Bill', 'January 20, 2024', 60);


  
'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),

    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],

    checkbox = document.querySelector('#deposit-check'),

    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title'),
    incomeItem = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesItem = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    div = document.querySelector('.data'), 

    input = document.querySelectorAll('input');

  const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

const AppData = function() {
  this.income = {}; 
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
};    

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  this.getDisable();
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.reset = function() {
  start.style.display = 'inline-block';
  cancel.style.display = 'none';
  input = document.querySelectorAll('input');
  input.forEach(function(item){
    if(item.type === 'text'){
      item.disabled = false;
      item.value = '';
    }
  });

  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;

  start.disabled = true;
};

AppData.prototype.showResult = function() {
  const _this = this;
  periodSelect.addEventListener('input', function(){
    let period = periodSelect.value;
    incomePeriodValue.value = _this.calcPeriod(period);
  });
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  do{
    let period = periodSelect.value;
    incomePeriodValue.value = _this.calcPeriod(period);
  }while(false);
};

AppData.prototype.getDisable = function(){
  let leftInputs = div.querySelectorAll('input');
  leftInputs.forEach(function(item){
    if(item.type === 'text'){
      item.disabled = true;
    }
  });
  start.style.display = 'none';
  cancel.style.display = 'inline-block';
};

AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItem[0].cloneNode(true);
  cloneIncomeItem.childNodes[3].value = '';
  cloneIncomeItem.childNodes[1].value = '';
  incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItem = document.querySelectorAll('.income-items');
  this.validateAll();
  if(incomeItem.length === 3) {
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItem.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value,
        chashIncome = item.querySelector('.income-amount').value;
    if(itemIncome.trim() !== '' && chashIncome.trim() !== '') _this.income[itemIncome] = chashIncome;
  });
};

AppData.prototype.getIncomeMonth = function() {
  for(let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItem[0].cloneNode(true);
  cloneExpensesItem.childNodes[3].value = '';
  cloneExpensesItem.childNodes[1].value = '';
  expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItem = document.querySelectorAll('.expenses-items');
  this.validateAll();
  if(expensesItem.length === 3) {
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItem.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value,
        cashExepenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses.trim() !== '' && cashExepenses.trim() !== '') _this.expenses[itemExpenses] = cashExepenses;   
  });
};

AppData.prototype.getAddExpenses = function() {
  const _this = this;
  let addExpenses =  additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if(item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {
  for(let key in this.expenses){
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
  
AppData.prototype.getTargetMonth = function() {
  return targetAmount.value / this.budgetMonth;
};
  
AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    return ('Высокий уровень дохода');
  } else if (600 < this.budgetDay && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (0 < this.budgetDay && this.budgetDay <= 600) {
    return ('К сожалению, у вас низкий уровень дохода');
  } else if (this.budgetDay <= 0) {
    return ('Что-то пошло не так');
  }
};
  
AppData.prototype.getInfoDeposit = function() {
  if(this.deposit){
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while(!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while(!isNumber(this.moneyDeposit));
  }
};
    
AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * this.period;
};

AppData.prototype.calcPeriod = function(period) {
  return this.budgetMonth * +period;
};

AppData.prototype.getRange = function() {
  periodAmount.textContent = periodSelect.value;
  return +periodSelect.value;
};
AppData.prototype.getValidateBudget = function() {
  if(salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
    salaryAmount.value =  salaryAmount.value.substring(0, salaryAmount.value.length - 1);
  } else {
    start.disabled = false;
    return;
  }
};
AppData.prototype.eventsListeners = function(){
  start.disabled = true;
  const _this = this;
  salaryAmount.addEventListener('input', _this.getValidateBudget);
  start.addEventListener('click', _this.start.bind(_this));
  cancel.addEventListener('click', _this.reset.bind(_this));
  incomePlus.addEventListener('click', _this.addIncomeBlock.bind(_this));
  expensesPlus.addEventListener('click', _this.addExpensesBlock.bind(_this));
  periodSelect.addEventListener('input', _this.getRange);
};

AppData.prototype.validateAll = function() {
  input = document.querySelectorAll('input');
  input.forEach(function(item){
    if(item.placeholder === 'Наименование') {
      item.addEventListener('input', function(){
        if(isNumber(parseInt(item.value.replace(/\D+/g,"")))) {
          item.value = item.value.substring(0, item.value.length - 1);
        } else if(item.value.trim() === '' || isNumber(item.value)) {
          item.value = '';
        } else {
          return;
        }
      });
    } else if(item.placeholder === 'Сумма') {
      item.addEventListener('input', function(){
        if(item.value.trim() === '' || !isNumber(item.value)) {
          item.value = item.value.substring(0, item.value.length - 1);
        } else {
          return;
        }
      });
    }
  });
};
let tmp = new AppData();
tmp.eventsListeners();
tmp.validateAll();
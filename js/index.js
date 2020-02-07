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

  let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,

    start: function() {
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
    },

    reset: function() {
      start.style.display = 'inline-block';
      cancel.style.display = 'none';
      input = document.querySelectorAll('input');
      input.forEach(function(item){
        if(item.type === 'text'){
          item.disabled = false;
          item.value = '';
        }
      });
    },

    showResult: function() {
      periodSelect.addEventListener('input', function(){
        let period = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod(period);
      });
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      do{
        let period = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod(period);
      }while(false);
    },

    getDisable: function(){
      let leftInputs = div.querySelectorAll('input');
      leftInputs.forEach(function(item){
        if(item.type === 'text'){
          item.disabled = true;
        }
      });
      start.style.display = 'none';
      cancel.style.display = 'inline-block';
    },

    getAddIncome: function() {
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },

    addIncomeBlock: function() {
      let cloneIncomeItem = incomeItem[0].cloneNode(true);
      cloneIncomeItem.childNodes[3].value = '';
      cloneIncomeItem.childNodes[1].value = '';
      incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItem = document.querySelectorAll('.income-items');
      validateAll();
      if(incomeItem.length === 3) {
        incomePlus.style.display = 'none';
      }
    },

    getIncome: function() {
      incomeItem.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value,
            chashIncome = item.querySelector('.income-amount').value;
        if(itemIncome.trim() !== '' && chashIncome.trim() !== '') appData.income[itemIncome] = chashIncome;
      });
    },

    getIncomeMonth: function() {
      for(let key in this.income){
        this.incomeMonth += +this.income[key];
      }
    },

    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItem[0].cloneNode(true);
      cloneExpensesItem.childNodes[3].value = '';
      cloneExpensesItem.childNodes[1].value = '';
      expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItem = document.querySelectorAll('.expenses-items');
      validateAll();
      if(expensesItem.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },

    getExpenses: function() {
      expensesItem.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExepenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses.trim() !== '' && cashExepenses.trim() !== '') appData.expenses[itemExpenses] = cashExepenses;   
      });
    },

    getAddExpenses: function() {
      let addExpenses =  additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },

    getExpensesMonth: function() {
      for(let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
      }
    },

    getBudget: function() {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
  
    getTargetMonth: function() {
      return targetAmount.value / this.budgetMonth;
    },
  
    getStatusIncome: function() {
      if (this.budgetDay >= 1200) {
        return ('Высокий уровень дохода');
      } else if (600 < this.budgetDay && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (0 < this.budgetDay && this.budgetDay <= 600) {
        return ('К сожалению, у вас низкий уровень дохода');
      } else if (this.budgetDay <= 0) {
        return ('Что-то пошло не так');
      }
    },
  
    getInfoDeposit: function() {
      if(this.deposit){
        do {
         this.percentDeposit = prompt('Какой годовой процент?', 10);
        } while(!isNumber(this.percentDeposit));
        do {
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while(!isNumber(this.moneyDeposit));
      }
    },
    
    calcSavedMoney: function() {
      return this.budgetMonth * this.period;
    },

    calcPeriod: function(period) {
      return this.budgetMonth * +period;
    },

    getRange: function() {
      periodAmount.textContent = periodSelect.value;
      return +periodSelect.value;
    },
    getValidateBudget: function() {
      if(salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
        salaryAmount.value =  salaryAmount.value.substring(0, salaryAmount.value.length - 1);
      } else {
        start.disabled = false;
        return;
      }
    }
  };
  start.disabled = true;
  salaryAmount.addEventListener('input', appData.getValidateBudget);
  start.addEventListener('click', appData.start.bind(appData));
  cancel.addEventListener('click', appData.reset.bind(appData));
  incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
  expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
  periodSelect.addEventListener('input', appData.getRange);

  function validateAll() {
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
  }
validateAll();
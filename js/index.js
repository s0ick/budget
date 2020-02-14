'use strict';

let start = document.getElementById('start'),

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

    input = document.querySelectorAll('input');

  const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  
  let arrayInput = [];
  input.forEach((item) =>{
    arrayInput.push(item);
  });

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
      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getIncomeMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();
    },

    showResult: function() {
      periodSelect.addEventListener('input', function(){
        let period = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod(period);
      });
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      do{
        let period = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod(period);
      }while(false);
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
      arrayInput.push(incomeItem[incomeItem.length-1]);
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
      for(let key in appData.income){
        appData.incomeMonth += +appData.income[key];
      }
    },

    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItem[0].cloneNode(true);
      cloneExpensesItem.childNodes[3].value = '';
      cloneExpensesItem.childNodes[1].value = '';
      expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItem = document.querySelectorAll('.expenses-items');
      arrayInput.push(expensesItem[expensesItem.length-1]);
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
      for(let key in appData.expenses){
        appData.expensesMonth += +appData.expenses[key];
      }
    },

    getBudget: function() {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
  
    getTargetMonth: function() {
      return targetAmount.value / appData.budgetMonth;
    },
  
    getStatusIncome: function() {
      if (appData.budgetDay >= 1200) {
        return ('Высокий уровень дохода');
      } else if (600 < appData.budgetDay && appData.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (0 < appData.budgetDay && appData.budgetDay <= 600) {
        return ('К сожалению, у вас низкий уровень дохода');
      } else if (appData.budgetDay <= 0) {
        return ('Что-то пошло не так');
      }
    },
  
    getInfoDeposit: function() {
      if(appData.deposit){
        do {
         appData.percentDeposit = prompt('Какой годовой процент?', 10);
        } while(!isNumber(appData.percentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while(!isNumber(appData.moneyDeposit));
      }
    },
    
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    },

    calcPeriod: function(period) {
      return appData.budgetMonth * +period;
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
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getRange);

function validateAll() {
  if(arrayInput.length > 20) {
    console.log('мы тут');
    validateAll();
  }
  arrayInput.forEach(function(item){
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
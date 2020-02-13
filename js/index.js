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

  const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

class AppData {
  constructor(){
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
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getDisable();
    this.getExpInc();
    this.getAddExpInc();
    this.getBudget();
    this.showResult();
  }

  reset() {
    start.style.display = 'inline-block';
    cancel.style.display = 'none';
    input = document.querySelectorAll('input');
    input.forEach((item) => {
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
  }

  showResult() {
    periodSelect.addEventListener('input', () => {
      const period = periodSelect.value;
      incomePeriodValue.value = this.calcPeriod(period);
    });
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    do {
      const period = periodSelect.value;
      incomePeriodValue.value = this.calcPeriod(period);
    } while(false);
  }

  getExpInc() {
    expensesItem = document.querySelectorAll('.expenses-items');
    incomeItem = document.querySelectorAll('.income-items');

    const count = item => {
      const startStr = item.className.split('-')[0],
            monthStr = startStr + 'Month',
            itemTitle = item.querySelector(`.${startStr}-title`).value,
            itamAmount = item.querySelector(`.${startStr}-amount`).value;   
      this[startStr][itemTitle] = itamAmount;
      this[monthStr] += +this[startStr][itemTitle];
    };
    incomeItem.forEach(count);
    expensesItem.forEach(count);
  }

  getAddExpInc() {
    const count = item => {
      const temp = item.className.substring(0, 3) + item.className.slice(11,12).toUpperCase() + 
                   item.className.substring(12, (item.className.length - 5));         
      if(item.value !== '') {
        item = item.value;
        this[temp].push(item);
      }
    };
    additionalIncomeItem.forEach(count);
    count(additionalExpensesItem);
  }

  getDisable() {
    const leftInputs = div.querySelectorAll('input');
    leftInputs.forEach((item) => {
      if(item.type === 'text'){
        item.disabled = true;
      }
    });
    start.style.display = 'none';
    cancel.style.display = 'inline-block';
  }

  addExpIncBlock(property) {
    let propStr = document.querySelectorAll(`.${property.substring(0, (property.length - 4))}-items`),
        butStr = document.querySelector(`.${property.substring(0, (property.length - 4))}_add`);
    const cloneItem = propStr[0].cloneNode(true);
    cloneItem.childNodes[1].value = '';
    cloneItem.childNodes[3].value = '';
    propStr[0].parentNode.insertBefore(cloneItem, butStr);
    propStr = document.querySelectorAll(`.${property.substring(0, (property.length - 4))}-items`);
    this.validateAll();
    if(propStr.length === 3) {
      butStr.style.display = 'none';
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('Высокий уровень дохода');
    } else if (600 < this.budgetDay && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (0 < this.budgetDay && this.budgetDay <= 600) {
      return ('К сожалению, у вас низкий уровень дохода');
    } else if (this.budgetDay <= 0) {
      return ('Что-то пошло не так');
    }
  }

  getInfoDeposit() {
    if(this.deposit){
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      } while(!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while(!isNumber(this.moneyDeposit));
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * this.period;
  }

  calcPeriod(period) {
    return this.budgetMonth * +period;
  }

  getRange() {
    periodAmount.textContent = periodSelect.value;
    return +periodSelect.value;
  }

  getValidateBudget() {
    if(salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
      salaryAmount.value =  salaryAmount.value.substring(0, salaryAmount.value.length - 1);
    } else {
      start.disabled = false;
      return;
    }
  }

  eventsListeners() {
    start.disabled = true;
    const _this = this;
    salaryAmount.addEventListener('input', _this.getValidateBudget);
    start.addEventListener('click', _this.start.bind(_this));
    cancel.addEventListener('click', _this.reset.bind(_this));
    incomePlus.addEventListener('click', _this.addExpIncBlock.bind(_this, 'incomeItem'));
    expensesPlus.addEventListener('click', _this.addExpIncBlock.bind(_this, 'expensesItem'));
    periodSelect.addEventListener('input', _this.getRange);
  }

  validateAll() {
    input = document.querySelectorAll('input');
    input.forEach((item) => {
      if(item.placeholder === 'Наименование') {
        item.addEventListener('input', () => {
          if(isNumber(parseInt(item.value.replace(/\D+/g,"")))) {
            item.value = item.value.substring(0, item.value.length - 1);
          } else if(item.value.trim() === '' || isNumber(item.value)) {
            item.value = '';
          } else {
            return;
          }
        });
      } else if(item.placeholder === 'Сумма') {
        item.addEventListener('input', () => {
          if(item.value.trim() === '' || !isNumber(item.value)) {
            item.value = item.value.substring(0, item.value.length - 1);
          } else {
            return;
          }
        });
      }
    });
  }
}   
const tmp = new AppData();
tmp.eventsListeners();
tmp.validateAll();

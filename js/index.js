'use strict';

let start = document.getElementById('start'),

    plus1 = document.getElementsByTagName('button')[0],
    plus2 = document.getElementsByTagName('button')[1],

    checkbox = document.querySelector('#deposit-check'),

    inputIncome = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.getElementsByClassName('budget_month-value'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');


      let money;

      const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }; 
      
      const start = function() {
        do {
          money = prompt('Ваш месячный доход?');
        } while(!isNumber(money));
      };
      start();
      
      let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 50000,
        period: 3,
        budget: +money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
      
        asking: function() {
          let itemIncome,
              cashIncome;
          if(confirm('Есть ли у вас дополнительный заработок?')){
            do {
              itemIncome = prompt('Какой у вас доп заработок?', 'Фриланс');
            } while(isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === '');
            do {
              cashIncome = prompt('Какой у вас доход от этого?', 10000);
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
          }
      
          let amount = '',
              addExpenses;
              do {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                'eда, проезд, комуналка');
              } while(isNumber(addExpenses) || addExpenses === null || addExpenses.trim() === '');
              appData.addExpenses = addExpenses.split(', ').map(function(item) {
                return (item[0].toUpperCase() + item.slice(1).split(','));
              });
      
              appData.deposit = confirm('Есть ли у вас депозит в банке?');
      
          for(let i = 0; i < 2; i++){
            do {
              amount = prompt('Введите обязательную статью расходов:');
            } while(isNumber(amount) || amount === null || amount.trim() === '');
            do {
              appData.expenses[amount] = prompt('Во сколько это обойдется?');
            } while(!isNumber(appData.expenses[amount]));
          }    
        },
      
        getExpensesMonth: function() {
          for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
          }
          console.log(`Расходы за месяц: ${appData.expensesMonth}`);
          return appData.expensesMonth;
        },
      
        getBudget: function() {
          appData.budgetMonth = +money - appData.getExpensesMonth();
          appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
      
        getTargetMonth: function() {
          appData.getBudget();
          if(Math.ceil(appData.mission / appData.budgetMonth) < 0) {
            return 'Цель не будет достигнута';
          } else {
            return `Цель будет достигнута за: ${Math.ceil(appData.mission / appData.budgetMonth)} месяца/ев`;
          }
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
        }
      };
      
      appData.asking();
      console.log(appData.getTargetMonth());
      console.log(appData.getStatusIncome());
      
      console.log('Наша программа включает в себя данные:');
      for(let key in appData) {
        console.log(`Свойство: ${key} - Значение: ${appData[key]}`);
      }
      
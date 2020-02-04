const start = document.getElementById('start'),

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
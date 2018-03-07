var budgetController = (function() {
  
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });
    data.totals[type] = sum
  };


  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc:0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;  
      } else {
        ID = 0;
      }

      if(type === 'exp'){
       newItem = new Expense(ID, des, val);
      } else if( type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    calculateBudget: function() {
      calculateTotal('exp');
      calculateTotal('inc');

      data.budget = data.totals.inc - data.totals.exp;

      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    }
  }
})(); 


var UIController = (function() {


    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expenseContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      budgetIncome: '.budget__income--value',
      budgetExpense: '.budget__expenses--value',
      budgetPercentage: '.budget__expenses--percentage'
    }

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)  
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      if(type === 'inc') {
        element = DOMstrings.incomeContainer;
         html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
      }else if(type === 'exp') {
        element = DOMstrings.expenseContainer;
         html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      };

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array){
        current.value = "";
      });
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.budgetIncome).textContent = obj.totalInc;
      document.querySelector(DOMstrings.budgetExpense).textContent = obj.totalExp;
      document.querySelector(DOMstrings.budgetPercentage).textContent = obj.percentage + "%";
    },


    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();

var controller = (function(budgetCtrl, UICtrl) {

  var setUpEventListeners = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      } 
    });
  }


  var updateBudget = function(){
    // 1 calc the budget
    budgetCtrl.calculateBudget();
    // 2 return budget
    var budget = budgetCtrl.getBudget();
    // 3 display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var ctrlAddItem = function() {
    var input, newItem;
    // 1 get the filled input data
    input = UICtrl.getinput();
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
      // 2 add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3 add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4 clear input fields
      UICtrl.clearFields();
      // 5 calculate and update budget
      updateBudget(); 
    }
  };

  return {
    init: function() {
      console.log("App has started");
      setUpEventListeners();
    }
  };
})(budgetController, UIController);


controller.init();
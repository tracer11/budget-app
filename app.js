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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc:0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem;

      if(type === "exp"){
       newItem = new Expense(ID, des, val);
      }
    } 
  }

})(); 


var UIController = (function() {


    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn'
    }

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,  
      };
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



  var ctrlAddItem = function() {
    // 1 get the filled input data
    var input = UICtrl.getinput();
    // 2 add the item to the budget controller
    // 3 add the item to the UI
    // 4 calc the budget
    // 5 display the budget on the UI

  };

  return {
    init: function() {
      console.log("App has started");
      setUpEventListeners();
    }
  };


  


})(budgetController, UIController);


controller.init();
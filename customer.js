require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var keys = require('./keys.js');

var userName = keys.user;
var password = keys.password;

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
});

var start = function() {
  inquirer
    .prompt({
      type: 'list',
      name: 'categories',
      message: 'Please select a category to shop.',
      choices: ['personal care', 'electronics', 'books', 'grocery']
    })
    .then(function(answer) {
      var query =
        'SELECT item_id, product_name, price FROM products WHERE department_name = ?';
      connection.query(query, answer.categories, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            '\n' +
              'Item # ' +
              res[i].item_id +
              ' || Product: ' +
              res[i].product_name +
              ' || Price $ ' +
              res[i].price +
              '\n'
          );
        }
        buyItem();
      });
    });
};

var buyItem = function() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'items',
        message: 'Please enter the ID# of product you would like to purchase.'
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Please enter the quantity of the items you would like.',
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      var query =
        'SELECT product_name, price, stock_quantity FROM products WHERE item_id= ?';
      connection.query(query, answer.items, function(err, res) {
        //console.log(answer.quantity);
        //console.log(res[0].stock_quantity);
        var order = answer.quantity;
        var stock = res[0].stock_quantity;
        if (order <= stock) {
          var amount = order * res[0].price;
          console.log('Your total is $' + amount + '\n');
        } else {
          console.log('Sorry that quantity not available.');
        }
        connection.query(
          "UPDATE products SET stock_quantity='" +
            (stock - order) +
            "' WHERE product_name='" +
            answer.items +
            "'",
          function(err, res) {
            console.log('Your order is processed and ready to ship.');
          }
        );
        start();
      });
    });
};
start();

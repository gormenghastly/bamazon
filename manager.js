require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var keys = require('./keys');

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

var mgrStart = function() {
  inquirer
    .prompt({
      type: 'list',
      name: 'viewAdd',
      message: 'Please select action from the following:',
      choices: [
        'View All Products',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]
    })
    .then(function(answer) {
      switch (answer.viewAdd) {
        case 'View All Products':
          viewAll();
          break;
        case 'View Low Inventory':
          viewLow();
          break;
        case 'Add to Inventory':
          addTo();
          break;
        case 'Add New Product':
          addNew();
          break;
      }
    });
};

var viewAll = function() {
  var query = 'SELECT * FROM products';
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        'Item # ' +
          res[i].item_id +
          ' || Product: ' +
          res[i].product_name +
          '|| Price $ ' +
          res[i].price +
          ' || Inventory: ' +
          res[i].stock_quantity +
          '\n'
      );
    }
  });
};

var viewLow = function() {
  var query = 'SELECT * FROM products WHERE stock_quantity < 10';

  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        'Item # ' +
          res[i].item_id +
          ' || Product: ' +
          res[i].product_name +
          '|| Price $ ' +
          res[i].price +
          ' || Inventory: ' +
          res[i].stock_quantity +
          '\n'
      );
    }

    inquirer
      .prompt({
        type: 'confirm',
        name: 'addInventory',
        message: 'Would you like to add inventory to any products?',
        default: false
      })
      .then(function(answer) {
        if (answer.addInventory === true) {
          addTo();
        } else {
          console.log('Product may become out of stock!');
        }
      });
  });
};

var addTo = function() {
  inquirer
    .prompt({
      type: 'input',
      name: 'addProduct',
      message: 'To add inventory, what is the ID# of the item?'
    })
    .then(function(answer) {
      var query = 'SELECT products WHERE item_id= ?';

      connection.query(query, answer.addProduct, function(err, res) {
        console.log('Product located.');
        inquirer
          .prompt({
            type: 'input',
            name: 'amount',
            message: 'How many would you like to add to the inventory?',
            validate: function(value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          })
          .then(function(answer) {
            var query = 'UPDATE products SET stock_quantity= ?';

            answer.addProduct;
            connection.query(query, function(err, res) {
              console.log('Quantity Added.');
            });
          });
      });
    });
};

var addNew = function() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newProduct',
        message: 'What product would you like to add?'
      },
      {
        type: 'input',
        name: 'department',
        message: 'In which department does this product belong?'
      },
      {
        type: 'input',
        name: 'price',
        message: 'What is the price of the product?'
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'What is the quantity being added?'
      }
    ])
    .then(function(answer) {
      var query = 'INSERT INTO products SET ?';
      var item = {
        product_name: answer.newProduct,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      };
      console.log(item);
      connection.query(query, item, function(err, res) {
        console.log('Item added.');
      });
    });
};

mgrStart();

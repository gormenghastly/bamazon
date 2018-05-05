# bamazon

This is a Amazon-like store CLI App where customers can browse products by selecting a category and then purchase a quantity of that item. There is also a manager view where product inventory can be viewed and increased as well as add new products. The database is created in MySQL.

## Customer View

Customers are given a selection of product departments and asked to choose one. From there they can select an item and the quantity of that item. If there is enough in stock, their total cost will be shown. If not enough, "Sorry that quantity is not available." The quantity purchased is updated on the database as well.

## Manager View

Managers are given four options:

#### 1.View Products

The app lists all the item id's, names, prices and quantities.

#### 2.View Low Inventory

The app lists all items with an inventory count lower than 10 and prompts to add inventory.

#### 3.Add to Inventory

The app will prompt for an item id and quantity to add to existing stock in the database.

#### 4.Add New Product

The app will prompt for name, department, price and quantity. Then add the new item to the database.

## Technologies Used

\*Node.js

\*Inquirer npm

\*MySQL

## Screenshots

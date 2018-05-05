DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Smoothing Shampoo', 'personal care', 7.19, 25
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Smoothing Condtioner', 'personal care', 7.19, 25
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Activated Charcoal Toothpaste', 'personal care', 9.99, 15
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Bose Wireless Headphones', 'electronics', 349.00, 15
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'LG 28-inch TV', 'electronics', 151.64, 5
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'HP Printer', 'electronics', 69.99, 15
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'The First Mess', 'books', 20.40, 10
);INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'War on Peace', 'books', 16.77, 5
);INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Circe', 'books', 16.20, 5
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Wonderful Pistachios', 'grocery', 13.36, 25
);INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            "Hershey's Kisses Bulk", 'grocery', 14.99, 25
);INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        (
            'Starbucks Breakfast Blend', 'grocery', 10.62, 25
);
const prompt = require('prompt-sync')();
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require("inquirer");
const alert = require("alert");

function showMessage(message) {
    console.log(message);
    console.log('========================================');
}

let books = [];

//add books
function addBook(_callback) {
    while(true) {
        showMessage(chalk.yellow("Please add a new book >>>"));
        let title, author, year, prices;

        do {
            title = prompt(`${chalk.green("Enter the title of the book")} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            if (title.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (title && typeof title === 'string') {
                break;
            } else if (!title) {
                alert("Please fill a title book!");
            } else {
                alert("Title must be a string!");
            }
        } while (true);

        do {
            author = prompt(`${chalk.green("Enter the author\'s name")} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            if (author.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (author && typeof author === 'string') {
                break;
            } else if (!author) {
                alert("Please fill a author\'s name!");
            } else {
                alert("Author\'s must be a string!");
            }
        } while (true);

        do {
            year = prompt(`${chalk.green("Enter the publication year")} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            let yeartoNumber = parseInt(year, 10);
            if (year.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (isNaN(yeartoNumber)) {
                alert("Year must be a number!");
            } else if (!year) {
                alert("Please fill the publication year!");
            } else {
                break;
            }
        } while (true);

        do {
            prices = prompt(`${chalk.green("Enter the book prices")} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            let pricestoNumber = parseInt(prices, 10);
            if (prices.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (isNaN(pricestoNumber)) {
                alert("Prices must be a number!");
            } else if (!prices) {
                alert("Please fill prices of book!");
            } else {
                break;
            }
        } while (true);

        let book = {
            title,
            author,
            year,
            prices
        };

        books.push(book);
        alert(`You have added ${title} successfully!`);
        let continueAdding = prompt(`Do you want to add another book? (${chalk.yellow("yes/no")}): `);
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage(chalk.yellow("Returning to the main menu..."));
            _callback();
            return;
        }
    }
}

//view books
function viewBooks(_callback) {
    while(true) {
        showMessage(chalk.yellow("List of Books >>>"));
        if (books.length === 0) {
            console.log(chalk.red("No books added yet."));
        } else {
            books.forEach((book, index) => {
                console.log(chalk.blue(`#${index + 1}:`));
                console.log(chalk.blue(`Title: ${book.title}`));
                console.log(chalk.blue(`Author: ${book.author}`));
                console.log(chalk.blue(`Year: ${book.year}`));
                console.log(chalk.blue(`Prices: ${book.prices}`));
                console.log('-------------------------');
            });
        }
        let continueAdding = prompt("Please put any key to return the main menu: ");
        if (continueAdding || !continueAdding) {
            showMessage(chalk.yellow("Returning to the main menu..."));
            _callback();
            return;
        }
    }
}

//edit books
function editBook(_callback) {
    while(true) {
        showMessage(chalk.yellow("Edit Book Details:"));
        let bookIndex;

        if (books.length === 0) {
            console.log(chalk.red("No books added yet."));
            let continueAdding = prompt("Please put any key to return the main menu: ");
            if (continueAdding || !continueAdding) {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            }
        }

        console.log(chalk.yellow("Select a book to edit: "));
        books.forEach((book, index) => {
            console.log(chalk.blue(`#${index + 1}: ${book.title}`));
        });

        do {
            bookIndex = parseInt(prompt(`${chalk.green("Enter the number of the book you want to edit:")} `), 10);
            if (isNaN(bookIndex) || bookIndex < 1 || bookIndex > books.length) {
                console.log(chalk.red("Invalid book selection, please check number parameter!"));
                let msg = prompt(`Press any key to enter number book again (or type "${chalk.yellow("q")}" to exit): `);
                if (msg.toLowerCase() === 'q') {
                    showMessage(chalk.yellow("Returning to the main menu..."));
                    _callback();
                    return;
                } 
            } else {
                break;
            }
        } while (true);

        let selectedBook = books[bookIndex - 1];

        showMessage(chalk.yellow("Edit Book Details:"));
        let title, author, year, prices;

        do {
            title = prompt(`${chalk.green(`Enter new title of book (current title: ${chalk.blue(`${selectedBook.title}`)})`)} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            if (title.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (title && typeof title === 'string') {
                break;
            } else if (!title) {
                alert("Please fill a title book!");
            } else {
                alert("Title must be a string!");
            }
        } while(true);

        do {
            author = prompt(`${chalk.green(`Enter new author name (current author: ${chalk.blue(`${selectedBook.author}`)})`)} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            if (author.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (author && typeof author === 'string') {
                break;
            } else if (!author) {
                alert("Please fill a author\'s name!");
            } else {
                alert("Author\'s must be a string!");
            }
        } while(true);

        do {
            year = prompt(`${chalk.green(`Enter new publication year (current year: ${chalk.blue(`${selectedBook.year}`)})`)} or type "${chalk.yellow("q")}" to exit)${chalk.green(":")}` );
            let yeartoNumber = parseInt(year, 10);
            if (year.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (isNaN(yeartoNumber)) {
                alert("Year must be a number!");
            } else if (!year) {
                alert("Please fill the publication year!");
            } else {
                break;
            }
        } while(true);
        
        do {
            prices = prompt(`${chalk.green(`Enter new prices of book (current prices: ${chalk.blue(`${selectedBook.prices}`)})`)} or type "${chalk.yellow("q")}" to exit${chalk.green(":")} `);
            let pricestoNumber = parseInt(prices, 10);
            if (prices.toLowerCase() === 'q') {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            } else if (isNaN(pricestoNumber)) {
                alert("Prices must be a number!");
            } else if (!prices) {
                alert("Please fill prices of book!");
            } else {
                break;
            }
        } while(true);

        selectedBook.title = title;
        selectedBook.author = author;
        selectedBook.year = year;
        selectedBook.prices = prices;
        
        alert(`Updated details book number ${bookIndex} successfully!`);
        let continueAdding = prompt(`Do you want to edit details another book? (${chalk.yellow("yes/no")}): `);
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage(chalk.yellow("Returning to the main menu..."));
            _callback();
            return;
        }
    }
}

//delete books
function deleteBook(_callback) {
    while(true) {
        showMessage(chalk.yellow("Delete a Book:"));
        let bookIndex;

        if (books.length === 0) {
            console.log(chalk.red("No books added yet."));
            let continueAdding = prompt("Please put any key to return the main menu: ");
            if (continueAdding || !continueAdding) {
                showMessage(chalk.yellow("Returning to the main menu..."));
                _callback();
                return;
            }
        }

        console.log(chalk.yellow("Select a book to delete:"));
        books.forEach((book, index) => {
            console.log(chalk.blue(`#${index + 1}: ${book.title}`));
        });

        do {
            bookIndex = parseInt(prompt(`${chalk.green("Enter the number of the book you want to delete:")} `), 10);
            if (isNaN(bookIndex) || bookIndex < 1 || bookIndex > books.length) {
                console.log(chalk.red("Invalid book selection, please check number parameter!"));
                let msg = prompt(`Press any key to enter number book again (or type "${chalk.yellow("q")}" to exit): `);
                if (msg.toLowerCase() === 'q') {
                    showMessage(chalk.yellow("Returning to the main menu..."));
                    _callback();
                    return;
                } 
            } else {
                break;
            }
        } while (true);
        
        let deletedBook = books.splice(bookIndex - 1, 1);
        alert(`Deleted book name '${deletedBook[0].title}' successfully!`);
        let continueAdding = prompt(`Do you want to delete another book? (${chalk.yellow("yes/no")}): `);
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage(chalk.yellow("Returning to the main menu..."));
            _callback();
            return;
        }
    }
}
function main() {
    inquirer.prompt([
    {
    name: "select",
    message: "Please select your choices: ",
    type: "list",
    choices: [
        "View books",
        "Add a new book",
        "Edit a book",
        "Delete a book",
        "Exit",
    ],
    }])
    .then((answers) => {
    if (answers["select"] == "View books") {
        viewBooks(function () {
            main();
        });
    } else if (answers["select"] == "Add a new book") {
        addBook(function () {
            main();
        });
    } else if (answers["select"] == "Edit a book") {
        editBook(function () {
            main();
        });
    } else if (answers["select"] == "Delete a book") {
        deleteBook(function () {
            main();
        });
    } else {
            showMessage(chalk.yellow("Good bye!"));
            process.exit();
        }
    });
}

//Command Line Inteface
figlet.text('kawaii book store', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magenta(data));
    main();
});





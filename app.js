const prompt = require('prompt-sync')();
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require("inquirer");
const alert = require("alert");

function showMessage(message) {
    console.log('========================================');
    console.log(message);
    console.log('========================================');
}

let books = [];

//add book
function addBook() {
    while(true) {
        showMessage('Please add a new book >>>');
        let title, author, year, prices;

        do {
            title = prompt('Enter the title of the book (or type "quit" to exit): ');
            if (title.toLowerCase() === 'quit') {
                showMessage('Returning to the main menu...');
                return;
            } else if (title && typeof title === 'string') {
                break;
            } else if (!title) {
                console.log('Please fill a title book.');
            } else {
                console.log('Title must be a string.');
            }
        } while (true);

        do {
            author = prompt('Enter the author\'s name (or type "quit" to exit): ');
            if (author.toLowerCase() === 'quit') {
                showMessage('Returning to the main menu...');
                return;
            } else if (author && typeof author === 'string') {
                break;
            } else if (!author) {
                console.log('Please fill a author\'s name.');
            } else {
                console.log('Author\'s must be a string.');
            }
        } while (true);

        do {
            year = prompt('Enter the publication year (or type "quit" to exit): ');
            if (year.toLowerCase() === 'quit') {
                showMessage('Returning to the main menu...');
                return;
            } else if (year && typeof year === 'string') {
                break;
            } else if (!year) {
                console.log('Please fill the publication year.');
            } else {
                console.log('Year must be a string.');
            }
        } while (true);

        do {
            prices = prompt('Enter the book prices (or type "quit" to exit): ');
            if (prices.toLowerCase() === 'quit') {
                showMessage('Returning to the main menu...');
                return;
            } else if (prices && typeof prices === 'string') {
                break;
            } else if (!prices) {
                console.log('Please fill prices of book.');
            } else {
                console.log('Prices must be a string.');
            }
        } while (true);

        let book = {
            title,
            author,
            year,
            prices
        };

        books.push(book);
        showMessage(`You have added ${title} successfully!`);
        let continueAdding = prompt('Do you want to add another book? (yes/no): ');
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage('Returning to the main menu...');
            return;
        }
    }
}

function viewBooks(_callback) {
    showMessage('List of Books >>>');
    if (books.length === 0) {
        console.log('No books added yet.');
    } else {
        books.forEach((book, index) => {
            console.log(`#${index + 1}:`);
            console.log(`Title: ${book.title}`);
            console.log(`Author: ${book.author}`);
            console.log(`Year: ${book.year}`);
            console.log(`Prices: ${book.prices}`);
            console.log('-------------------------');
        });
    }
    _callback();
}

function editBook() {
    while(true) {
        showMessage('Edit Book Details:');
        let bookIndex;

        if (books.length === 0) {
            console.log('No books added yet.');
            let continueAdding = prompt('Please put any key to return the main menu: ');
            if (continueAdding || !continueAdding) {
                showMessage('Returning to the main menu...');
                return;
            }
        }

        console.log('Select a book to edit:');
        books.forEach((book, index) => {
            console.log(`#${index + 1}: ${book.title}`);
        });

        do {
            bookIndex = parseInt(prompt('Enter the number of the book you want to edit: '), 10);
            if (isNaN(bookIndex) || bookIndex < 1 || bookIndex > books.length) {
                console.log('Invalid book selection, please check number parameter.');
            } else  {
                break;
            }
        } while (true);

        let selectedBook = books[bookIndex - 1];

        showMessage('Edit Book Details:');
        selectedBook.title = prompt(`Enter new title of book (current title: ${selectedBook.title}): `) || selectedBook.title;
        selectedBook.author = prompt(`Enter new author name (current author: ${selectedBook.author}): `) || selectedBook.author;
        selectedBook.year = prompt(`Enter new publication year (current year: ${selectedBook.year}): `) || selectedBook.year;
        selectedBook.prices = prompt(`Enter new prices of book (current prices: ${selectedBook.prices}): `) || selectedBook.prices;

        showMessage(`Updated details book number ${bookIndex} successfully!`);
        let continueAdding = prompt('Do you want to edit details another book? (yes/no): ');
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage('Returning to the main menu...');
            return;
        }
    }
}

function deleteBook() {
    while(true) {
        showMessage('Delete a Book:');
        let bookIndex;

        if (books.length === 0) {
            console.log('No books added yet.');
            let continueAdding = prompt('Please put any key to return the main menu: ');
            if (continueAdding || !continueAdding) {
                showMessage('Returning to the main menu...');
                return;
            }
        }

        console.log('Select a book to delete:');
        books.forEach((book, index) => {
            console.log(`#${index + 1}: ${book.title}`);
        });

        do {
            bookIndex = parseInt(prompt('Enter the number of the book you want to delete: '), 10);
            if (isNaN(bookIndex) || bookIndex < 1 || bookIndex > books.length) {
                console.log('Invalid book selection, please check number parameter.');
            } else  {
                break;
            }
        } while (true);
        
        let deletedBook = books.splice(bookIndex - 1, 1);
        showMessage(`Deleted book name '${deletedBook[0].title}' successfully!`);
        let continueAdding = prompt('Do you want to delete another book? (yes/no): ');
        if (continueAdding.toLowerCase() !== 'yes') {
            showMessage('Returning to the main menu...');
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
        "viewBooks",
        "addBook",
        "editBook",
        "deleteBook",
        "exit",
    ],
    }])
    .then((answers) => {
    if (answers["select"] == "viewBooks") {
        viewBooks(function () {
            let continueAdding = prompt('Do you want to exit to main menu ? (yes/no): ');
            if (continueAdding.toLowerCase() !== 'no') {
                showMessage('Returning to the main menu...');
                main();
            } 
        });
    } else if (answers["select"] == "addBook") {
        addBook(function () {
        alert(`Added book into system successfully`);
        main();
        });
    } else if (answers["select"] == "editBook") {
        editBook(function () {
        alert(`Updated book details successfully`);
        main();
        });
    } else if (answers["select"] == "deleteBook") {
        deleteBook(function () {
        alert(`Deleted book from system successfully `);
        main();
        });
    } else {
        exit();
    }
    });
}

const options = {
    font: 'Standard', 
    horizontalLayout: 'default',
    verticalLayout: 'default',
};

//CLI
figlet.text('kawaii book store', options, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.blue(data));
    main();
});





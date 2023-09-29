const prompt = require('prompt-sync')();

function showMessage(message) {
    console.log('========================================');
    console.log(message);
    console.log('========================================');
}

let books = [];

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

function viewBooks() {
    while(true) {
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
        let continueAdding = prompt('Do you want to exit to main menu ? (yes/no): ');
        if (continueAdding.toLowerCase() !== 'no') {
            showMessage('Returning to the main menu...');
            return;
        }
    }
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

while (true) {
    console.log('<<<Welcome to kawaii book shop>>>');
    console.log('1. Add a new book');
    console.log('2. View books');
    console.log('3. Edit a book');
    console.log('4. Delete a book');
    console.log('5. Quit');

    const choice = prompt('Enter your choice (1, 2, 3, 4, 5): ');

    switch (choice) {
        case '1':
        addBook();
        break;
        case '2':
        viewBooks();
        break;
        case '3':
        editBook();
        break;
        case '4':
        deleteBook();
        break;
        case '5':
        showMessage('Goodbye!');
        process.exit();
        default:
        console.log('Invalid choice. Please enter 1, 2, 3, 4 or 5.');
    }
}


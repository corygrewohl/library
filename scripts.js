
/**
 * 1. User presses an Add Book button
 * 2. A popup comes up that only submits if title, author, pages, and haveRead are all validated
 * 3. Once submitted, calls addBookToLibrary(), which adds to the book to myLibrary function and then calls createCard()
 * 4. createCard loops through myLibrary and adds cards to the DOM for the books in myLibrary, and adds CSS to the cards
 *      a. alternatively it could just run for the latest item in the myLibrary array (so after every time a new book is added)
 * 5. 
 */

//createCard function - loops through the myLibrary array and displays the books and info to the screen
    //run this function whenever a new book is submitted    

    //add a new 'card' div when a new book is added
    //add css styling required to that card when it is added

let myLibrary = [];
let bookCount = 0;

addBookToLibrary("hobbit", "jrr tolkien", 300, true);
addBookToLibrary("harry potter", "jk rowling", 783, false);


function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.info = function() {
        console.log(title + " " + author + " " + pages + " " + haveRead + "\n");
    }
}

function addBookBtn(){
    
}

function addBookToLibrary(title, author, pages, haveRead){
    let newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);

    createCards();
}

function createCards() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';
    bookCount = 0;

    for (let index = 0; index < myLibrary.length; index++) {
        if(myLibrary[index] != null){
           const book = myLibrary[index];
        console.log(book);
        addCard(book); 
        }        
    }
}

function addCard(book){
    const booksDiv = document.getElementById('books');
    
    const newCard = document.createElement('div');

    newCard.setAttribute("data-book", bookCount);
    bookCount++;

    const updateHaveRead = document.createElement('input');
    updateHaveRead.setAttribute("type", "checkbox");
    updateHaveRead.setAttribute("onchange", "updateHaveRead()");

    //display proper value for haveRead value
    let displayHaveRead = 'Have not read';
    if(book.haveRead){
        displayHaveRead = 'Have read';
        updateHaveRead.checked = true;
    } 
    
    newCard.classList.add('grid-card');
    newCard.textContent = "\"" + book.title + "\"" + '\n' + book.author + '\n' + book.pages + '\n' + displayHaveRead;

    newCard.appendChild(updateHaveRead);

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove');
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("onclick", "removeCard()");
    newCard.appendChild(removeButton);

    booksDiv.appendChild(newCard);
}

function removeCard(){
    const gridCard = event.target.closest('.grid-card');
    gridCard.remove();
    myLibrary[gridCard.dataset.book] = null;
}

/**
 * Code to Update Have Read
 */
function updateHaveRead(){
    console.log('have read updated')
}

/**
 * Code for Form Data
 */
function getData(){
    const form = document.querySelector('form');
    const title = form[0].value;
    const author = form[1].value;
    const pages = form[2].value;
    const haveRead = form[3].checked;
    addBookToLibrary(title, author, pages, haveRead);

    closeModal();
}

/**
 * Code for Modal
 */

const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

function openModal(){
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(){
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
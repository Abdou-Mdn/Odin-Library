const addBtn = document.getElementById("addBtn");
const hideBtn = document.getElementById("hideBtn");
const container = document.getElementById("container");
const newBookForm = document.getElementById("newBook");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages")
const statusInput = document.getElementById("status");
const bookShelf = document.getElementById("bookShelf");

let library = [];

function Book (title,author,pages,status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status; 
}

const saveBooks = () => {
    localStorage.setItem("library", JSON.stringify(library));
}

const displayBooks = () => {
    bookShelf.replaceChildren();
    if(!library.length) {
        const message = document.createElement("p");
        message.innerText = "Saved books will appear here !!";
        bookShelf.appendChild(message);
    }else {
        library.map( (book, index) => {
            /* * creaing the book */
            const bookDiv = document.createElement("div");
            bookDiv.className = "book"
            /* ** creating the books children */
            /* *** id span */
            const id = document.createElement("span");
            id.className = "id";
            const i = index + 1;
            id.innerText = i;
            bookDiv.appendChild(id);
            /* *** delete button */
            const icon = document.createElement("i");
            icon.classList.add("fa","fa-trash");
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            deleteBtn.appendChild(icon);
            deleteBtn.addEventListener("click", handleDelete);
            bookDiv.appendChild(deleteBtn);
            /* *** title */
            const titleHeader = document.createElement("h2");
            titleHeader.className = "title";
            titleHeader.innerText = book.title ;
            bookDiv.appendChild(titleHeader);
            /* *** author */
            const authorP = document.createElement("p")
            authorP.innerText = "by " + book.author;
            bookDiv.appendChild(authorP);
            /* *** number of pages */
            const pagesP = document.createElement("p");
            pagesP.innerText = book.pages + " pages";
            bookDiv.appendChild(pagesP);
            /* *** read status */
            const statusSpan = document.createElement("span");
            if (book.read) {
                statusSpan.className = "read";
                statusSpan.innerText = "Read";
            } else {
                statusSpan.className = "notRead";
                statusSpan.innerText = "Not Read";
            }
            const statusP = document.createElement("p");
            statusP.innerHTML = "Status: ";
            statusP.appendChild(statusSpan);
            bookDiv.appendChild(statusP);
            /* *** switch button */
            const switchBtn = document.createElement("button");
            if (book.read) {
            switchBtn.classList.add("switch","on");
            } else {
                switchBtn.classList.add("switch");
            }
            switchBtn.addEventListener("click", handleSwitch);
            bookDiv.appendChild(switchBtn);

            /* adding the book to the shelf */
            bookShelf.appendChild(bookDiv);
        });
    }
}

const addBookToLibrary = () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value ;
    const read = statusInput.checked ? true : false ; 
    const newBook = new Book(title,author,pages,read);
    library.push(newBook);
    saveBooks();
    displayBooks();
}

const handleSubmit = () => {
    event.preventDefault();
    addBookToLibrary();
    newBookForm.reset();
    titleInput.focus();
} 

const handleDelete = () => {
   let i = event.target.parentNode.previousSibling.innerText;
   i = Number(i) - 1;
   const newLib = library.filter( (book) => library.indexOf(book) !== i);
   library = newLib;
   saveBooks();
   displayBooks();
}

const handleSwitch = () => {
    const switchBtn = event.target;
    let index = switchBtn.parentNode.firstChild.innerText;
    index = Number(index) - 1;
    library[index].read = !library[index].read;
    saveBooks();
    displayBooks();
}


newBookForm.addEventListener("submit", handleSubmit);

addBtn.addEventListener("click", () => {
    container.classList.add("open");
    addBtn.classList.add("hidden");
})

hideBtn.addEventListener("click", () => {
    container.classList.remove("open");
    addBtn.classList.remove("hidden");
})


/* const mybook = new Book("MyTitle","MyAuthor",22,true);
library.push(mybook); */

const lib = JSON.parse(localStorage.getItem("library"));
if (lib !== null) { library = lib; }
displayBooks();
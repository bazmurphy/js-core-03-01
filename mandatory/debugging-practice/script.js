let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    let book3 = new Book("The Hobbit", "J. R. R. Tolkien", "310", false);
    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (!title.value || !author.value || !pages.value) {
    alert("Please fill in all the fields!");
  } else {
    let book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    render();
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  
  //insert updated row and cells
  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let readButton = document.createElement("button");
    readButton.id = `change-button-${i}`;
    readButton.className = "btn btn-success";
    let readStatus;
    if (myLibrary[i].read === true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    readButton.innerHTML = readStatus;
    readButton.addEventListener("click", function () {
      myLibrary[i].checked = !myLibrary[i].checked;
      render();
    });
    cell4.appendChild(readButton);

    //add delete button to every row and render again
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-button-${i}`;
    deleteButton.className = "btn btn-warning";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
    cell5.appendChild(deleteButton);
  }
}

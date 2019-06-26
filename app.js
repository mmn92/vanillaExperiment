class TodoItem {
  constructor(description) {
    this.description = description;
  }
}

class UI {
  static loadList() {
    const list = Store.getList();
    list.forEach(item => UI.addItemToDOM(item));
  }

  static addItemToDOM(item) {
    const list = document.querySelector("#itemList");

    const newItem = document.createElement("li");
    newItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    newItem.innerHTML = `
        ${item.description}
        <span type="button" class="badge badge-info delete">X</span>
    `;

    list.appendChild(newItem);
  }

  static deleteItem(event) {
    const listItem = event.target.parentNode;
    listItem.parentNode.removeChild(listItem);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#itemForm");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearForm() {
    document.querySelector("#item").value = "";
  }
}

class Store {
  static getList() {
    let myList;
    if (localStorage.getItem("list") === null) {
      myList = [];
    } else {
      myList = JSON.parse(localStorage.getItem("list"));
    }

    return myList;
  }

  static addItem(item) {
    const list = Store.getList();
    list.push(item);
    localStorage.setItem("list", JSON.stringify(list));
  }

  static removeItem(index) {
    const storeList = Store.getList();

    storeList.splice(index, 1);

    localStorage.setItem("list", JSON.stringify(storeList));
  }
}

document.addEventListener("DOMContentLoaded", UI.loadList());

document.querySelector("#itemForm").addEventListener("submit", event => {
  event.preventDefault();

  const item = document.querySelector("#item");

  if (isValid(item.value)) {
    const todoItem = new TodoItem(item.value);

    UI.addItemToDOM(todoItem);

    Store.addItem(todoItem);

    UI.showAlert("Item added successfully", "success");
  } else {
    UI.showAlert("Invalid input", "danger");
  }

  UI.clearForm();
});

document.querySelector("#itemList").addEventListener("click", event => {
  if (event.target.classList.contains("delete")) {
    const listItem = event.target.parentNode;

    const list = listItem.parentNode;
    const index = Array.prototype.indexOf.call(list.children, listItem);

    Store.removeItem(index);

    UI.showAlert("Item removed", "success");

    UI.deleteItem(event);
  }
});

function isValid(input) {
  return input ? true : false;
}

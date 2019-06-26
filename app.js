document.querySelector("#itemForm").addEventListener("submit", event => {
  event.preventDefault();
  const item = document.querySelector("#item");
  if (isValid(item.value)) {
    displayItem(item.value);
    persistStore(item.value);
  } else {
    invalidInput();
  }
  item.value = "";
});

function deleteItem(event) {
  if (event.target.classList.contains("delete")) {
    listItem = event.target.parentNode;
    list = listItem.parentNode;
    removeFromStorage(Array.prototype.indexOf.call(list.children, listItem));
    listItem.parentNode.removeChild(listItem);
  }
}

function displayItem(item) {
  const newItem = document.createElement("li");
  newItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  newItem.innerHTML = `
    ${item}
    <span type="button" class="badge badge-info delete">X</span>
  `;

  document.querySelector("#itemList").appendChild(newItem);
  newItem.onclick = deleteItem;
}

function persistStore(item) {
  if (!localStorage.getItem("list")) {
    localStorage.setItem("list", JSON.stringify([].concat(item)));
  } else {
    let myList = JSON.parse(localStorage.getItem("list"));
    console.log(myList);
    myList.push(item);
    localStorage.setItem("list", JSON.stringify(myList));
  }
}

function removeFromStorage(index) {
  let myList = JSON.parse(localStorage.getItem("list"));
  myList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(myList));
}

function isValid(input) {
  return input ? true : false;
}

function invalidInput() {
  const inputDiv = document.querySelector(".form-group");
  const input = document.querySelector("#item");

  inputDiv.classList.add("has-danger");
  input.classList.add("is-invalid");

  setTimeout(clearInput, 1500);
}

function clearInput() {
  const inputDiv = document.querySelector(".form-group");
  const input = document.querySelector("#item");

  inputDiv.classList.remove("has-danger");
  input.classList.remove("is-invalid");
}

(function loadList() {
  if (localStorage.getItem("list")) {
    let myList = JSON.parse(localStorage.getItem("list"));
    myList.forEach(ele => displayItem(ele));
  }
})();

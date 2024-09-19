const inputBox = document.getElementById("inputItem");
const addButton = document.getElementById("add");
const store = document.getElementById("itemStore");

let list = [];

//reload content
list = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
if(list.length>0){

  list.forEach(element => {
    const item = document.createElement("li");
    const itemName = document.createElement("p");
    itemName.innerHTML = element;
    item.appendChild(itemName);
    
    let editbtn = document.createElement("img");
    editbtn.src='./assets/edit.png'
    editbtn.width = 30;
    editbtn.height = 30;
    editbtn.innerHTML = "edit";
    item.appendChild(editbtn);
    editbtn.classList.add("btn","edit");
    
    let deletebtn = document.createElement("img");
    deletebtn.src='./assets/delete.png'
    deletebtn.width = 30;
    deletebtn.height = 30;
    deletebtn.alt = 'delete';
    item.appendChild(deletebtn);
    deletebtn.classList.add("btn","delete");
    
    store.appendChild(item);
  });

}

//add item on screen

addButton.addEventListener("click", () => {
  if (inputBox.value == "") {
    alert("Enter a to do item");
  } else if (addButton.innerHTML == "add") {
    //add in  local storage
    list = JSON.parse(localStorage.getItem("list"))
      ? JSON.parse(localStorage.getItem("list"))
      : [];
    list.push(inputBox.value);
    localStorage.setItem("list", JSON.stringify(list));

    //add item on screen
    const item = document.createElement("li");
    const itemName = document.createElement("p");
    itemName.innerHTML = inputBox.value;
    item.appendChild(itemName);

    let editbtn = document.createElement("img");
    editbtn.src='./assets/edit.png'
    editbtn.width = 30;
    editbtn.height = 30;
    item.appendChild(editbtn);
    editbtn.classList.add("btn","edit");

    let deletebtn = document.createElement("img");
    deletebtn.src='./assets/delete.png'
    deletebtn.width = 30;
    deletebtn.height = 30;
    deletebtn.alt = 'delete';
    item.appendChild(deletebtn);
    deletebtn.classList.add("btn","delete");

    store.appendChild(item);
    inputBox.value = "";
  }
});

let event = null;
store.addEventListener("click", (e) => {
  //edit
  if (e.target.classList.contains("edit")) {
    inputBox.value = e.target.parentElement.firstChild.innerHTML;
    inputBox.focus();
    addButton.innerHTML = "edit";
    event = e;
    addButton.addEventListener("click", () => {
      if (addButton.innerHTML == "edit") {
        //edit in local storage
        list = JSON.parse(localStorage.getItem("list"))
          ? JSON.parse(localStorage.getItem("list"))
          : [];

        let editItem = event.target.previousElementSibling.innerHTML;

        for (let i = 0; i < list.length; i++) {
          if (list[i] == editItem) {
            list[i] = inputBox.value;
            break;
          }
        }
        localStorage.setItem("list", JSON.stringify(list));

        //edit on screen list
        event.target.parentElement.firstChild.innerHTML = inputBox.value;
        //event.target.previousElementSibling.innerHTML

        addButton.innerHTML = "add";
        inputBox.value = "";
      }
    });
  }

  //remove item
  if (e.target.classList.contains("delete")) {
    //remove  from screen
    store.removeChild(e.target.parentElement);

    //remove from local storage
    list = JSON.parse(localStorage.getItem("list"))
      ? JSON.parse(localStorage.getItem("list"))
      : [];

    let delItem =
      e.target.previousElementSibling.previousElementSibling.innerHTML;

    for (let i = 0; i < list.length; i++) {
      if (list[i] == delItem) {
        list.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("list", JSON.stringify(list));
  }
});

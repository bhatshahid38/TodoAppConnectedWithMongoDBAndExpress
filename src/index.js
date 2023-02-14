// import "./styles.css";
// Select the element with ID "discription"
let discriptionBox = document.getElementById("discription");

// Select the element with ID "catagory"
let catagoryBox = document.getElementById("catagory");

// Select the element with ID "due-date"
let dueDate = document.getElementById("due-date");

// Select the first element with class "delete"
let deleteButton = document.getElementsByClassName("delete")[0];

// Select the first element with class "add"
let addTo = document.querySelector(".add");

// Select the element with ID "add-to-list"
let addTask = document.getElementById("add-to-list");

function notification2() {
  alert("enter the required field");
}
// Function to get the value of the selected category
function catagory(value) {
  // Create a new span element
  let span = document.createElement("span");

  // Set the inner HTML of the span to the selected category value
  span.innerHTML = value;

  // Return the created span
  return span;
}

function Duedate(value) {
  let date = dueDate.value;

  return date;
}

// Function to handle the description value
function discription(value) {
  // Check if the description box value is empty
  if (discriptionBox.value == " ") {
    // Call the notification2 function
    notification2();
  } else {
    // Log the description content to the console
    console.log(discriptionContent);

    // Create a new list item
    let list = document.createElement("li");

    // Create a new span element
    let span = document.createElement("span");

    // Create a new div element
    let div = document.createElement("div");

    // Create a new checkbox input element
    let checkbutton = document.createElement("input");
    checkbutton.type = "checkbox";

    // Set the inner HTML of the div to the result of the Duedate function
    div.innerHTML = Duedate(value);

    // Set the inner HTML of the span to the description content
    span.innerHTML = description;

    // Define a variable "cat" as the result of calling the function "category" with the argument "value"
    let cat = catagory(value);

    // Add the "checkbutton" element as a child to the "list" element
    list.appendChild(checkbutton);

    // Add the "span" element as a child to the "list" element
    list.appendChild(span);

    // Add the "cat" element as a child to the "list" element
    list.appendChild(cat);

    // Add the "div" element as a child to the "list" element
    list.appendChild(div);

    // Set the background color of the "list" element to light gray
    list.style.backgroundColor = "lightgray";

    // Set the padding of the "list" element to 10 pixels
    list.style.padding = "10px";

    // Set the position of the "cat" element to relative
    cat.style.position = "relative";

    // Set the left offset of the "cat" element to 300 pixels
    cat.style.left = "300px";

    // Set the font size of the "cat" element to 30 pixels
    cat.style.fontSize = "30px";

    // Set the font size of the "span" element to 30 pixels
    span.style.fontSize = "30px";
    // Add the "list" element as a child to the "addTask" element
   
    addTask.appendChild(list);
    localStorage.setItem("data","addTask")
   

    // Clear the value of the "discriptionBox" element
    discriptionBox.value = " ";
  }
}
function notification() {
  alert("enter the required field")
}
const addTodoToList = (description, date, catagoryVal, _id)=>{
  
    let list = document.createElement("li");
    list.id = _id;

    // Create a new span element
    let span = document.createElement("span");

    // Create a new div element
    let div = document.createElement("div");

    // Create a new checkbox input element
    let checkbutton = document.createElement("input");
    checkbutton.type = "checkbox";

    // Set the inner HTML of the div to the result of the Duedate function
    div.innerHTML = date;

    // Set the inner HTML of the span to the description content
    span.innerHTML = description;

    // Define a variable "cat" as the result of calling the function "category" with the argument "value"
    let cat = catagory(catagoryVal);

    // Add the "checkbutton" element as a child to the "list" element
    list.appendChild(checkbutton);

    // Add the "span" element as a child to the "list" element
    list.appendChild(span);

    // Add the "cat" element as a child to the "list" element
    list.appendChild(cat);

    // Add the "div" element as a child to the "list" element
    list.appendChild(div);

    // Set the background color of the "list" element to light gray
    list.style.backgroundColor = "lightgray";
    list.style.margin = "12px 0";


    // Set the padding of the "list" element to 10 pixels
    list.style.padding = "10px";

    // Set the position of the "cat" element to relative
    cat.style.position = "relative";

    // Set the left offset of the "cat" element to 300 pixels
    cat.style.left = "300px";

    // Set the font size of the "cat" element to 30 pixels
    cat.style.fontSize = "30px";

    // Set the font size of the "span" element to 30 pixels
    span.style.fontSize = "30px";
    // Add the "list" element as a child to the "addTask" element
    addTask.appendChild(list);
   

    // Clear the value of the "discriptionBox" element
    discriptionBox.value = " ";
   

}

const loadData = async ()=>{
  const response = await fetch("http://localhost:7600/api",{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log(data)

  // This is a for-of loop that iterates over each 'todo' item in the 'data' object
for (todoitems of data.todo) {
  // This line uses destructuring assignment to extract the properties of the 'todoitems' object
  const { _id, inputDiscription, catagory, duedate } = todoitems;
  // This line calls the 'addTodoToList' function with the extracted properties as arguments
  // This function adds a new todo item to the list of todos
  addTodoToList(inputDiscription, catagory, duedate, _id);
}

 }

loadData();
// Define a function "deletelist" that takes in an argument "e"
function deletelist(e) {
  // Get all the children of the "addTask" element and store it in a variable "nodeList"
  
  const nodeList = addTask.children;

  // If the length of "nodeList" is equal to 0, call the "deleteNotification" function
  if (nodeList.length === 0) {
    deleteNotication();
  }

  // Create an empty array "removeList"
  const removeList = [];

  // Loop over each node in "nodeList"
  for (const node of nodeList) {
    // If the "input" element within the "node" element is checked
    if (node.querySelector("input").checked) {
      // Add the "node" to the "removeList" array
      removeList.push(node);
    }
  }

  // Remove each item in "removeList" from the "addTask" element
  for (const item of removeList) {
    const id = item.id;
    let delteteDb = async()=>{
      const response = await fetch("http://localhost:7600/deleteApi",{
        headers:{'Accept' :  'application/json',
        'content-type': 'application/json'},
        method:'POST',
      body: JSON.stringify({ // The data to send in the request body
          id: id
        })
      })
    }
    delteteDb()
    addTask.removeChild(item)
  }
}

function deleteNotication() {
  alert("cant delete anything !! create a session");
}

// This code adds an item to a to-do list.

// Add a click event listener to the "addTo" element that executes an anonymous function when the element is clicked
addTo.addEventListener("click", function () {
//sending data to todo api which is located on server 7600
 let post = async () =>{
 const response =  await fetch("http://localhost:7600/todo",{
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({ // The data to send in the request body
        inputDiscription: discriptionBox.value,
        catagory: catagoryBox.value,
        duedate: dueDate.value,
       
      })
      
  })
  const data = await response.json()
  console.log(data);
  return data;
 } 
 post().then(({todoItem})=>{
    if(todoItem){
      const {catagory, inputDiscription, duedate, _id} = todoItem;
      // Get the value of the selected category
      const catagoryValue = catagory;
      // Get the value of the description box
      const discriptionContent = inputDiscription;
      const dueDateVal = duedate;
      console.log(catagoryValue, discriptionContent, dueDateVal);
      if (discriptionContent && catagoryValue && dueDateVal) {
        // Call the "discription" function
        addTodoToList(discriptionContent, dueDateVal, catagoryValue,_id);
      }
    }
    
 })
  
});
// Add a click event listener to a deleteButton
deleteButton.addEventListener("click", deletelist);

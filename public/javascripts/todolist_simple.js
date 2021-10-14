console.log("in script");

// class to represent todo items
class ToDoItem {
    constructor(todo, done){
        this.todo = todo;
        this.done = done;
    }
}

async function gettodos()
{
    // make asynchrnous call to API and return response as JSON once completed
    let response = await fetch("/todos")
    let content = await response.json();
    return content;
}

async function showlist(data)
{
    // get DOM element for list and clear its contents
    const todolist = document.getElementById("todolist");
    todolist.innerHTML="";

    // for each element in the data
    for (const item of data) {
        // create an object to represent the current item
        let value = new ToDoItem(item.todo, item.done);

         // create LI element
        const node = document.createElement("li");     
        
        // create text node and append to list item
        const textnode = document.createTextNode(value.todo);         
        node.appendChild(textnode);  

        // append node to list
        todolist.appendChild(node);
    }
}

async function addtodo(e) {
    // stop the regular form submission
    e.preventDefault();

    // get the data from input box in form and embed in object
    var newtodo = document.getElementById("todo");
    var data = new ToDoItem(newtodo.value, false);

    // clear input box
    newtodo.value="";

    // set up and make asynchronous POST to API endpoint
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    await fetch("/todos/add", settings);
};


// set event handlers
window.onload = function(){
    // get to do list items and display
    gettodos()
        .then(data => showlist(data))

    // on form submit, add new to do item, get updated list of to do items, and display
    document.getElementById("addtodo").addEventListener('submit', async(e) => {
        addtodo(e)
            .then(gettodos)
            .then(data => showlist(data))
    });
}
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
    const url = "/todos";
    let response = await fetch(url)
    let content
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        content = await response.json();
    }
    return content;
}

async function showlist(data)
{
    const todolist = document.getElementById("todolist");
    todolist.innerHTML="";

    for (i = 0; i < data.length; i++) {

        // create an object to represent the current item
        let value = new ToDoItem(data[i].todo, data[i].done);
        //let value = data[i];      // or could just use object from array rather than using 
                                    // class, which would be OK in this simple example

         // create LI element
        const node = document.createElement("li");     
        
        // create text node and append to list item
        const textnode = document.createTextNode(value.todo);         
        node.appendChild(textnode);  
        todolist.appendChild(node);
    }
}

async function addtodo(e) {
    // stop the regular form submission
    e.preventDefault();

    // get the data from input box in form and embed in object
    var newtodo = document.getElementById("todo");
    var data = new ToDoItem(newtodo.value, false);
    // var data = {todo: newtodo.value, done: false };   // again, could do this without using a class

    // clear input box
    newtodo.value="";

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
    gettodos()
        .then(data => showlist(data))
        .catch((e) => console.log(e));

    document.getElementById("addtodo").addEventListener('submit', async(e) => {
        addtodo(e)
            .then(gettodos)
            .then(data => showlist(data))
            .catch((e) => console.log(e));
    });
}
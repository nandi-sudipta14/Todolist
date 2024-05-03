let todoList;
if(localStorage.getItem('myTodoList')) {
  todoList = JSON.parse(localStorage.getItem('myTodoList'));
} else {
  todoList = [];
}


const addNewTask = (task) => {
  const obj = {
    task: task, 
    done: false
  };

  todoList.push(obj);
  let totalPendingTasks = countPendingTasks(todoList);

  localStorage.setItem('myTodoList', JSON.stringify(todoList));
  addTaskHtml(todoList);
  document.querySelector('.pendingTasks').innerHTML = totalPendingTasks; 

}


const countPendingTasks = (list) => {
  let count = 0;
  for (let i=0; i<list.length; i++) {
    if(list[i].done === false) {
      count++;
    }
  } 
  return count;
}


const addTaskHtml = (list) => {
    let listHtml = '';
    for (let i=0; i<list.length; i++) {
      listHtml += `<li><input type="checkbox" class="tickTodo" onchange="tickTask(this)" ${list[i].done ? 'checked': ''}>
                    <span class="text ${list[i].done ? 'cross': ''}">${list[i].task}</span>
                    <i class="fa fa-trash" style="font-size:24px;color:red" onclick="removeTask(this)"></i>
                   </li>`;
    }
    document.querySelector('.todoList').innerHTML = listHtml;
  }
  
  
  const tickTask = (tickTodo) => {
    let task;
    for (let i=0; i<todoList.length; i++) {
      if(tickTodo.nextElementSibling.textContent === todoList[i].task) {
        todoList[i].done = !todoList[i].done;
        task = todoList[i].task;
      }
    }
    localStorage.setItem('myTodoList', JSON.stringify(todoList));
    addTaskHtml(todoList);
    document.querySelector('.pendingTasks').innerHTML = countPendingTasks(todoList);
    tickTodo.classList.toggle('green');
  }
  
  


const removeTask = (removeIcon) => {
  let task;
  for (let i=0; i<todoList.length; i++) {
    if(removeIcon.previousElementSibling.textContent === todoList[i].task) {
      todoList.splice(i, 1);
    }
  }
  localStorage.setItem('myTodoList', JSON.stringify(todoList));
  addTaskHtml(todoList); 
  document.querySelector('.pendingTasks').innerHTML = countPendingTasks(todoList); 
}


const clearList = () => {
  todoList.length = 0;
  localStorage.setItem('myTodoList', JSON.stringify(todoList));
  document.querySelector('.todoList').innerHTML = "";
  document.querySelector('.pendingTasks').innerHTML = countPendingTasks(todoList); 
}


addTaskHtml(todoList);
document.querySelector('.pendingTasks').innerHTML = countPendingTasks(todoList); 


document.querySelector('input[type="text"]').addEventListener('keydown', function(e){
  if(e.keyCode === 13) {
    let task = e.target.value;
    if(task !== "") {
      addNewTask(task);
      e.target.value = ""; 
    }
  }
});

document.querySelector('button').addEventListener('click', function(e){
  let task = document.querySelector('input[type="text"]').value;
  if(task !== "") {
    addNewTask(task);
    e.target.value = ""; 
  }
});


document.querySelector('.message button').addEventListener('click', function(){
  clearList();
});
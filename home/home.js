//load user token
if(localStorage.getItem('apiToken') !== null){

    let apiToken = JSON.parse(localStorage.getItem('apiToken'))
    const username = document.getElementById('username')
    username.textContent = apiToken.username

}

// add usename to welcome message 
const apiToken = JSON.parse(localStorage.getItem('apiToken'))
const message = document.getElementById('greeting-msg')
message.textContent = `Welcome, ${apiToken.username}`

// function that create task item in the list
const CreateTaskElement = (title, taskTime, taskNote )=> {

    //get ul container parent element that contains items list
    let listContainer = document.querySelector('.tasks')

    // create item list element, add class name and append child list element to its ul parent container
    let taskItem = document.createElement('li')
    taskItem.classList.add('task-item')
    listContainer.appendChild(taskItem)

    // create child element that conatin title and checkbox elements, add tasktext value and add classes and attr , append child elements to list element
    let taskTitle = document.createElement('div')
    let titleInput = document.createElement('input')
    let taskText = document.createElement('span')
    taskText.textContent = title
    taskTitle.classList.add('task-title')
    titleInput.classList.add('task-check')
    titleInput.setAttribute('type','checkbox')
    taskItem.appendChild(taskTitle)
    taskTitle.appendChild(titleInput)
    taskTitle.appendChild(taskText)

    //create child element that conatin time, add time value and class name, append time element to list element 
    let time = document.createElement('span')
    time.textContent = taskTime
    time.classList.add('time')
    taskItem.appendChild(time)

    //create child element that contain note, add note value and class name
    let note = document.createElement('span')
    note.textContent = taskNote
    note.classList.add('note')
    taskItem.appendChild(note)

    
    // create delete btn child element, add delete value and class name
    let deleteBtn = document.createElement('span')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete')
    taskItem.appendChild(deleteBtn)

}

// load and display user stored tasks
if(localStorage.getItem('dailyTasks') !== null){
    const dailyTasks = JSON.parse(localStorage.getItem('dailyTasks'))
    Array.from(dailyTasks).forEach((task) => {
    CreateTaskElement(task.taskTitle, task.time, task.note)   
})
}


// add event listiner to display add task modal screen
const tasksModal = document.querySelector('.modal-container')
const addTaskBtn = document.querySelector('.add-tasks')
addTaskBtn.addEventListener('click', function(e){
    tasksModal.style.display = 'block'
})

// close modal event 
const modalCloseBtn = document.querySelector('.close')
modalCloseBtn.addEventListener('click', function(){
    tasksModal.style.display = 'none'
})


// add tasks
const submitTask = document.querySelector('.modal-form')
submitTask.addEventListener('submit', function(e){

    e.preventDefault()
    // get tasktext , time , and note user input
    const taskInput = document.getElementById('task').value
    const startTimeInput = document.getElementById('start-time').value
    const endTimeInput = document.getElementById('end-time').value
    const noteInput = document.getElementById('note').value
    const taskTime = `${startTimeInput} - ${endTimeInput}`

    // create task element
    CreateTaskElement(taskInput, taskTime, noteInput)

    // add task details to local storage
    if(localStorage.getItem('dailyTasks') === null){
            localStorage.setItem('dailyTasks',JSON.stringify([{taskTitle:taskInput,
                                                               time:taskTime,
                                                               note:noteInput}]))

    }else{
        let dailyTasks = JSON.parse(localStorage.getItem('dailyTasks'))
        const currentTask = {taskTitle:taskInput,
                            time:taskTime,
                            note:noteInput} 
        dailyTasks.push(currentTask)
        localStorage.setItem('dailyTasks',JSON.stringify(dailyTasks))
        }
})

// delete task event
let listContainer = document.querySelector('.tasks')
listContainer.addEventListener('click', function(e){
    if(e.target.className == 'delete'){
        let task = e.target.parentElement
        listContainer.removeChild(task)

        //remove deleted task from local storage
        const currentTaskTilte = task.firstElementChild.textContent.trim()
        let dailyTasks = JSON.parse(localStorage.getItem('dailyTasks'))
        dailyTasks = Array.from(dailyTasks).filter((task)=> task.taskTitle !== currentTaskTilte)
        localStorage.setItem('dailyTasks',JSON.stringify(dailyTasks))    
    }
})

// toggle task as completed if user checked it 
listContainer.addEventListener('change' ,function(e){
    if(e.target.className === 'task-check'){
        const task = e.target.nextElementSibling
        if (e.target.checked){
            task.style.textDecoration = 'line-through'
        }else {
            task.style.textDecoration = 'none'         
        }        
    }  
})



// digital clock
function updateClock(){
    const now = new Date()
    let hours = now.getHours()
    const meridiem = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    hours = hours.toString().padStart(2,0)
    const min = now.getMinutes().toString().padStart(2,0)
    const sec = now.getSeconds().toString().padStart(2,0)
    const day = now.getDate().toString().padStart(2,0)
    const month = (now.getMonth()+1).toString().padStart(2,0)
    const year = now.getFullYear()
    const timer = `${hours}:${min}:${sec} ${meridiem}`
    const date = `${day}-${month}-${year}`
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const dayName = weekday[now.getDay()]
    document.getElementById('clock').textContent = timer
    document.getElementById('date').textContent = date
    document.getElementById('day').textContent = dayName   
}
updateClock()
setInterval(updateClock , 1000)

// change color of active page link
const currentLink = window.location.href
const pagesLinks = document.querySelectorAll('.pages a')
for(link of pagesLinks) {
    if(link.href === currentLink){
        link.style.color = 'red'
    }
}

// // create a new tasks list 
// const newList = document.getElementById('newlist-btn') 
// newList.addEventListener('click', function(){

//     // create newtasks main container
//     const taskContainer = document.createElement('div')
//     taskContainer.classList.add('tasks-container')

//     // create task container headers 
//     const containerHeaders = document.createElement('div')
//     containerHeaders.classList.add('task-container-headers')
//     taskContainer.appendChild(containerHeaders)

//     // header name and add task button
//     const headerName = document.createElement('h3')
//     headerName.textContent = 'Daily Tasks 2'
//     containerHeaders.appendChild(headerName)

//     // create svg and its path elements
//     const addTasksBtn = document.createElementNS("http://www.w3.org/2000/svg",'svg')
//     const btnPath = document.createElementNS("http://www.w3.org/2000/svg",'path')
//     addTasksBtn.appendChild(btnPath)
//     containerHeaders.appendChild(addTasksBtn)
    
//     addTasksBtn.classList.add('add-tasks')
   
//     // adding attributes to svg and path elements
//     addTasksBtn.setAttribute( "viewBox", "0 0 24 24")
//     addTasksBtn.setAttribute( 'fill', 'currentColor')
//     btnPath.setAttribute('fill-rule', "evenodd")
//     btnPath.setAttribute('d', "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z")
//     btnPath.setAttribute('clip-rule', "evenodd")
    

//     // creating add task modal elements
//     const modalContainer = document.createElement('div')
//     const addTaskModal = document.createElement('div')
//     modalContainer.classList.add('modal-container')
//     addTaskModal.classList.add('addtask-modal')

//     modalContainer.appendChild(addTaskModal)

//       //add modal header
//     const modalHeader = document.createElement('div')
//     const modalTitle =  document.createElement('h2')
//     const modalCloseBtn = document.createElement('span')
//     modalHeader.classList.add('modal-header')
//     modalCloseBtn.classList.add('close')
//     modalTitle.textContent = 'Enter your task details'
//     modalCloseBtn.textContent = '&times;'

//     addTaskModal.appendChild(modalHeader)
//     modalHeader.appendChild(modalTitle)
//     modalHeader.appendChild(modalCloseBtn)

//     //



//     // add new list to that tasks container 
//     const dailyTasks = document.querySelector('.daily-tasks')
//     dailyTasks.appendChild(taskContainer)
    
// })


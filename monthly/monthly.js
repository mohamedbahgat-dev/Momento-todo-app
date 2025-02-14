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

// // create event to show hamburger menu in mobile design
const menuIcon = document.querySelector('.menu-icon')
const hamburgerMenu = document.querySelector('.hamburger-menu')
const pageMain  = document.querySelector('main')
menuIcon.addEventListener('click', function(e){
    hamburgerMenu.style.display = 'flex'
    menuIcon.style.rotate = '90deg'
        
})

pageMain.addEventListener('click', function(e){
    e.stopPropagation()
    hamburgerMenu.style.display = 'none'  
    menuIcon.style.rotate = '180deg'  
})

const menuClose = document.querySelector('.menu-close')
menuClose.addEventListener('click', function(){
    hamburgerMenu.style.display = 'none'
    menuIcon.style.rotate = '180deg'
   
})


// load and display user stored tasks
if(localStorage.getItem('monthlyTasks') !== null){
    const monthlyTasks = JSON.parse(localStorage.getItem('monthlyTasks'))
    Array.from(monthlyTasks).forEach((task) => {
    CreateTaskElement(task.taskTitle, task.time, task.note)   
})}

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


// function that create task item in the list
const submitTask = document.querySelector('.modal-form')
submitTask.addEventListener('submit', function(e){
    e.preventDefault()

    // get tasktext , weekday and date, note user input
    const taskInput = document.getElementById('task').value
    const month = document.getElementById('monthofyear').value
    const year = document.getElementById('year').value
    const noteInput = document.getElementById('note').value
    const taskTime = `${month} - ${year}`

    // create task element
    CreateTaskElement(taskInput, taskTime, noteInput)

    // add task details to local storage
    if(localStorage.getItem('monthlyTasks') === null){
            localStorage.setItem('monthlyTasks',JSON.stringify([{taskTitle:taskInput,
                                                               time:taskTime,
                                                               note:noteInput}]))

    }else{
        let monthlyTasks = JSON.parse(localStorage.getItem('monthlyTasks'))
        const currentTask = {taskTitle:taskInput,
                            time:taskTime,
                            note:noteInput} 
        monthlyTasks.push(currentTask)
        localStorage.setItem('monthlyTasks',JSON.stringify(monthlyTasks))
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
        let monthlyTasks = JSON.parse(localStorage.getItem('monthlyTasks'))
        monthlyTasks = Array.from(monthlyTasks).filter((task)=> task.taskTitle !== currentTaskTilte)
        localStorage.setItem('monthlyTasks',JSON.stringify(monthlyTasks))    
    }
})

// toggle task as completed if user checked it 
listContainer.addEventListener('change' ,function(e){
    if(e.target.className == 'task-check'){
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
// 


// change color of active page link
const currentLink = window.location.href
const pagesLinks = document.querySelectorAll('.navbar ul li a')
for(link of pagesLinks) {
    if(link.href === currentLink){
        link.style.color = 'red'
    }
}

var tasks = []
class Task {
    constructor(content) {
        this.div = document.createElement('div')
        this.div.classList.add("task-item")

        this.div.innerHTML = `<div id=${content}>
                                ${content}
                                <i class='fa-solid fa-trash delete-btn' id='${content}'></i>
                             </div>`
        this.div.classList.add("task-item")

        tasks.push(content)
        localStorage.setItem("tasks", tasks);

        this.div.addEventListener("click", () => this.removeById(content))
    }

    appendTo(target) {
        if(target) {
            target.append(this.div)
        }
    }

    removeById(id) {
        const allDeleteButtons = document.querySelectorAll(".delete-btn")
        const allTasks = document.querySelectorAll(".task-item") 

        allDeleteButtons.forEach((e, i) => {
            if(e.id === id) {
                allTasks[i].remove()
                tasks.splice(i)
            }
        })
    }
}

const taskContainer = document.querySelector(".tasks__container")
const addBtn = document.querySelector(".task-list__btn")
const taskContent = document.getElementById("task")

addBtn.addEventListener("click", () => {
    if (taskContent.value == "") {
        return alert("O campo não pode estar vazio.")
    }

    const task = new Task(taskContent.value)
    task.appendTo(taskContainer)
})

window.onload = loadTasks 

function loadTasks() {
    let tasks = localStorage.getItem("tasks").split(',');
    tasks.forEach(t => {
        const task = new Task(t)
        task.appendTo(taskContainer)
    })
}
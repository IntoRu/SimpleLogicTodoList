const modalWindow = document.querySelector('.modal_window')
const openBtn = document.querySelector('.open_btn')
const addTaskBtn = document.querySelector('.add_task_btn')
const inpTask = document.querySelector('input')
const taskWindow = document.querySelector('.task_window')
const ok = document.querySelector('.ok')
const ng = document.querySelector('.ng')

// ----------- function for open and close modal window -----------------
function modal() {
    return {
        open() {
            modalWindow.classList.add('open')
        },

        close() {
            modalWindow.classList.remove('open')
        }
    }
}

const myModal = modal()

//--------------- function for todo list --------------------
let todos = []

function todoList() {
    return {
        addTodo(text) {
            const todo = {
                text,
                done: false,
                id: `${Math.random()}`
            }
            todos.push(todo)
        },
        dellTodo(id) {
            todos.forEach(data => {
                if (data.id === id) {
                    data.done = true
                }
            })
        },
        renderTodo() {
            let html = ''
            todos.forEach(data => {
                if (data.done) {
                    return
                }
                html += `
                    <h3>${data.text}</h3>
                    <button class = 'complited_btn' data-id = "${data.id}" data-deal = "ok">Complited</button>
                    <button class = 'complited_btn' data-id = "${data.id}" data-deal = "ng">No complited</button>   
                `
            })
            taskWindow.innerHTML = html
        }
    }
}

const myTodo = todoList()

// -------- function coin -------------
let coinsPlus = 0
let coinsMinus = 0

function coin() {
    return {
        plus() {
            coinsPlus += 1
        },
        minus() {
            coinsMinus += 1
        },
        renderCoin() {
            ok.innerHTML = coinsPlus
            ng.innerHTML = coinsMinus
        }
    }
}
const myCoins = coin()

// -------------- call function -----------------

openBtn.addEventListener('click', () => {
    myModal.open()
})
addTaskBtn.addEventListener('click', () => {
    myTodo.addTodo(inpTask.value)
    myTodo.renderTodo()
    myModal.close()
    inpTask.value = ''
})

taskWindow.addEventListener('click', (event) => {
    if (event.target.tagName !== "BUTTON") {
        return
    }
    console.log(event.target.dataset.id)
    console.log(event.target.dataset.deal)
    myTodo.dellTodo(event.target.dataset.id)
    myTodo.renderTodo()
    if (event.target.dataset.deal === 'ok') {
        myCoins.plus()
    }
    else if (event.target.dataset.deal === 'ng') {
        myCoins.minus()
    }
    myCoins.renderCoin()
})
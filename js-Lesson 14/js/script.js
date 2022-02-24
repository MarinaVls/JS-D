const Todo = function() {

    this.data;

    this.init = () => {
        this.getTodo();
    };

    this.getTodo = async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        
        if(!localStorage.getItem('toDoList')) {
        try{ //тело запроса , длч обработки сценариев , елси чтото пойдет не так
            response = await fetch(url);
            this.data = await response.json()   ///????
            localStorage.setItem('toDoList', JSON.stringify(this.data));
            this.show(this.data);
        }catch(e){
            console.error(e)
        } finally{
            console.log('finally')
        }
    }else{
        this.data = JSON.parse(localStorage.getItem('toDoList'));
        this.show(this.data);
    }
    };

    this.show = () => {
        let  todo = document.querySelector('.todo');
        if (!todo) return;

        let ul = document.querySelector('.todo__list');
        if(!ul) {
            ul = document.createElement('ul');
            ul.classList.add('todo__list');
        }

        let list = '';

        this.data.forEach(({completed, id, title}) => {
            list += `<li class="todo__list__item">
                        <div>${id}<input class="check" type="checkbox" ${completed && 'checked'}> ${title} </div>
                        <button class="delete-btn" id="${id}">Delete</button>
                    </li>`
        });

        ul.innerHTML = list;
        todo.appendChild(ul);

        this.checked();
        this.onAddEventDel();
    }

    this.setStateFor = function (listToDo, flag) {
        let deleteBtn = listToDo.querySelector('.delete-btn');

        if(flag){
            listToDo.classList.remove("checkbox");
        }else{
            listToDo.classList.add("checkbox");
        }
        
        deleteBtn.disabled = flag;
    }

    this.setStateForToDoList = function (completed, index) {
        let listOfTodo = document.querySelectorAll('.todo__list__item');
        if (!listOfTodo) return;

        if (completed.checked) {
            this.setStateFor(listOfTodo[index], false);
        }else{
            this.setStateFor(listOfTodo[index], true);
        }
    }

    this.checked = function () {
        let check = document.querySelectorAll('.check');

        check.forEach((completed, index) => {
            this.setStateForToDoList(completed, index);
                
            completed.addEventListener('click', () => {
                this.setStateForToDoList(completed, index);
            })
        })
    }

    this.onAddEventDel = () => {
        const deleteBtn = document.querySelectorAll('.delete-btn');

        deleteBtn.forEach((delBtn) => {
            delBtn.addEventListener('click', (e) => {
                this.onDelete(e.target.id)
            })
        });

    }

    this.onDelete = function(id) {
        this.remove(id)
        this.show();
        localStorage.setItem('toDoList', JSON.stringify(this.data));
    }

    this.remove = function (idToDo){
        this.data = this.data.filter(el => el.id != idToDo);
    }
    
};

window.addEventListener('load', () => {
    const todoList = new Todo();
    todoList.init();
});



/* доделать 
1) положить данные в  локал сторидж
если данные есть, то мы не обращаемся к api а к локал сторидж

реализовать метод удаления дел по кнопке (незавершенное дело нельзя удалить (кнопка disabled))

если деловыполнено зачеркнуть ..

можно сделать cookie */
$(document).ready(function() {
    // Array para almacenar las tareas
    var tasks = [];

    // Función para Limpiar la lista 
    function renderTasks() {
        var taskList = $('#task-list');
        taskList.empty(); 
        
        tasks.forEach(function(task, index) {
            var taskItem = $('<div class="task-item d-flex align-items-center"></div>');
            var checkbox = $('<input type="checkbox" class="mr-2">').prop('checked', task.completed);
            var taskText = $('<span class="flex-grow-1 task-text"></span>').text(task.text);
            var editButton = $('<button class="btn btn-warning btn-sm ml-2">Editar</button>');
            var deleteButton = $('<button class="btn btn-danger btn-sm ml-2">Eliminar</button>');

            // Asignar una función para marcar una tarea como completada
            checkbox.change(function() {
                tasks[index].completed = $(this).prop('checked');
            });

            // Asignar una función para eliminar una tarea
            deleteButton.click(function() {
                tasks.splice(index, 1); // Eliminar la tarea del array
                renderTasks(); // Volver a renderizar la lista
            });

            // Función para editar una tarea al hacer clic en el botón de edición
            editButton.click(function() {
                var newText = prompt("Edita la tarea:", task.text);
                if (newText !== null) {
                    tasks[index].text = newText.trim();
                    renderTasks();
                }
            });

            taskItem.append(checkbox, taskText, editButton, deleteButton);
            taskList.append(taskItem);
        });
    }

    // Función para agregar una nueva tarea
    function addTask(text) {
        tasks.push({ text: text, completed: false });
        renderTasks();
    }

    // Asignar una función para el botón de agregar tarea
    $('#add-task-btn').click(function() {
        var taskInput = $('#task-input');
        var taskText = taskInput.val().trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.val(''); // Limpiar el campo de entrada
        }
    });

    // Renderizar las tareas al cargar la página
    renderTasks();
});


import React, { useState} from "react"; // Componentes
import { v4 as uuidv4 } from "uuid"; // Generar IDs únicos
import ToDoItem from './ToDoItem/ToDoItem'; // Componente de cada tarea
import tasksList from "../../../data.json"; // Datos archivo JSON
import "./ToDoList.css"; // Estilos

// Crea el estado "tasks", toma las tareas del JSON y si alguna no tiene ID, le asigna uno
const ToDoList = () => {
    const [tasks, setTasks] = useState(() => 
        tasksList.map(task => ({ ...task, id: task.id || uuidv4() }))
    );

    // Estado "values" para el formulario vacío
    const [values, setValues] = useState({
        title: "",
        description: "",
        deadline: "",
        isDone: false
    });

    // Mensaje de éxito
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // Mensaje de error
    const [showErrorMessage, setShowErrorMessage] = useState("");
    // Controlar el temporizador de 20 segundos
    const [inputTimeout, setInputTimeout] = useState(null);

    // Handler de cambios en el formulario al escribir =>
        // Reinicia el temporizador de 20 segundos
        // Si pasan 20 segundos sin enviar, limpia el formulario
        // Actualiza el campo que estás escribiendo
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (inputTimeout) clearTimeout(inputTimeout);
        const timeout = setTimeout(() => setValues({ title: "", description: "", deadline: "", isDone: false }), 20000);
        setInputTimeout(timeout);

        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Valida que el título de la tarea tenga al menos 6 caracteres
    const validateTask = () => {
        if (values.title.length < 6) {
            setShowErrorMessage("La tarea debe tener al menos 6 caracteres");
            setTimeout(() => setShowErrorMessage(""), 3000);
            return false;
        }
        return true;
    };

    // Al enviar el formulario =>
        // Para el temporizador
        // Valida la tarea
        // Añade la nueva tarea a la lista
        // Muestra mensaje de éxito por 5 segundos
        // Limpia el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputTimeout) {
            clearTimeout(inputTimeout);
            setInputTimeout(null);
        }

        if (!validateTask()) return;

        setTasks([...tasks, { ...values, id: uuidv4() }]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
        setValues({ title: "", description: "", deadline: "", isDone: false });
    };

    // Función para cambiar una tarea de estado ("pendiente"-"completada") =>
        // tasks.map(task => ...) = Recorre CADA tarea de la lista
        // "task.id === taskId ?" = Pregunta: "¿Esta tarea es la que hicimos clic?"
        // Si es la tarea en la que se hizo click:
            // { ...task, isDone: !task.isDone } = toma la tarea y cambia su estado
            // !task.isDone significa: "si estaba true → pon false, si estaba false → pon true"
        // Si no es la tarea, ": task" devuelve la tarea SIN cambios
    const toggleTaskStatus = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, isDone: !task.isDone } : task
        ));
    };

    // Actualiza una tarea con nueva información
    const editTask = (i, updatedTask) => {
        let data = [...tasks];
        data[i] = updatedTask;
        setTasks(data);
    };

    // Elimina una tarea de la lista
    const removeTask = (i) => {
        setTasks(tasks.filter((_, index) => index !== i));
    };

    // Vuelve a cargar las tareas originales
    const loadData = () => setTasks(tasksList.map(task => ({ ...task, id: task.id || uuidv4() })));
    // Limpia toda la lista
    const removeData = () => setTasks([]);

    // Renderizado = Crea un componente ToDoItem por cada tarea pasándole las funciones que necesita
    const paintData = () => tasks.map((task, index) => (
        <ToDoItem
            data={task}
            remove={() => removeTask(index)}
            toggleStatus={() => toggleTaskStatus(task.id)}
            edit={(updatedTask) => editTask(index, updatedTask)}
            key={task.id}
        />
    ));

    // Mostar el botón "ADD" si todos los campos están llenos
    const shouldShowAddButton = values.title && values.description && values.deadline;

    // Formulario para añadir una nueva tarea
    return (
        <div className="toDoListContainer">
            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={values.title}
                        onChange={handleChange} 
                        className="formInput"
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Descripción</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={values.description}
                        onChange={handleChange} 
                        className="formInput"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="deadline">Fecha límite</label>
                    <input 
                        type="date" 
                        name="deadline" 
                        value={values.deadline}
                        onChange={handleChange} 
                        className="formInput"
                    />
                </div>

                <div className="formGroup checkboxGroup">
                    <label className="checkboxLabel">
                        <input 
                            type="checkbox" 
                            name="isDone" 
                            checked={values.isDone}
                            onChange={handleChange} 
                            className="checkboxInput"
                        />
                        ¿Tarea completada?
                    </label>
                </div>

                {showSuccessMessage && <div className="successMessage">Tarea añadida</div>}
                {showErrorMessage && <div className="errorMessage">{showErrorMessage}</div>}

                <div className="formActions">
                    {shouldShowAddButton ? (
                        <button type="submit" className="submitBtn">ADD</button>
                    ) : (
                        <b className="warningText">Completa los campos</b>
                    )}
                </div>
            </form>

            <div className="actionButtons">
                <button className="actionBtn resetBtn" onClick={loadData}>Reset</button>
                <button className="actionBtn clearBtn" onClick={removeData}>Clear</button>
            </div>
            
            {/* Muestra todas las tareas */}
            <div className="tasksContainer"> 
                {paintData()}
            </div>
        </div>
    );
};

// Exportar el componente
export default ToDoList;
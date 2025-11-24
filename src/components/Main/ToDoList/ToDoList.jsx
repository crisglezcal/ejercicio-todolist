import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from './ToDoItem/ToDoItem';
import tasksList from "../../../data.json";
import "./ToDoList.css";

const ToDoList = () => {

    // Array de objetos (tasksList)
    const [tasks, setTasks] = useState(tasksList);

    // Estado inicial del formulario (llamada a la función useState) => formValues = valor del estado / setFormValues = editar el valor del estado
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        deadline: ""
    });

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Sustituye a "document.getElementById ("Formulario").addEventListener("submit")
    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, { ...formValues, id: uuidv4() }]);
        // Resetear formulario
        setFormValues({
            title: "",
            description: "",
            deadline: ""
        });
    };

    // Función para recorrer el array de products y pintarlos
    const paintData = () => tasks.map((task, index) => 
        <ToDoItem data={task} remove={() => removeTask(index)} key={task.id || uuidv4()} />
    );

    // Función para cargar datos
    const loadData = () => setTasks(tasksList);

    // Función para resetear
    const removeData = () => setTasks([]);

    // Función para borrar un elemento => 
    // 1. Utilizando .filter se recorre el array y devuelve los elementos con el índex diferente al que queremos borrar
    // 2. Carga el estado utilizando setItems con los ítems restantes
    // 3. Como el botón de borrar está en otro fichero, se actualiza la función paintData añadiendo removeItem
    const removeTask = (i) => {
        const filteredTasks = tasks.filter((task, index) => index !== i);
        setTasks(filteredTasks);
    }

    // Formulario y botones
    return (
        <div className="toDoListContainer">
            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formValues.title}
                        onChange={handleChange} 
                        className="formInput"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Descripción</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={formValues.description}
                        onChange={handleChange} 
                        className="formInput"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="deadline">Fecha límite</label>
                    <input 
                        type="date" 
                        name="deadline" 
                        value={formValues.deadline}
                        onChange={handleChange} 
                        className="formInput"
                    />
                </div>

                {/* Condicionales para mostrar el botón "Crear una nueva tarea" */}
                <div className="formActions">
                    {formValues.title && formValues.description && formValues.deadline ? (
                        <button type="submit" className="submitBtn">Crear una nueva tarea</button>
                    ) : (
                        <b className="warningText">Completa los campos</b>
                    )}
                </div>
            </form>

            <div className="actionButtons">
                <button className="actionBtn resetBtn" onClick={loadData}>Reset</button>
                <button className="actionBtn clearBtn" onClick={removeData}>Clear</button>
            </div>

            <div className="tasksContainer">
                {paintData()}
            </div>
        </div>
    );
}

export default ToDoList;
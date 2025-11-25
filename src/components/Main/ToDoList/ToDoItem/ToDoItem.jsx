import React, { useState } from "react"; // Componentes
import "./ToDoItem.css"; // Estilos

// Componente ToDoItem recibe =>
  // data (información de la tarea)
  // remove (función para borrar la tarea)
  // toggleStatus (función para marcar/completar la tarea)
  // edit (función para guardar los cambios al editar)
const ToDoItem = ({ data, remove, toggleStatus, edit }) => {
    // ESTA NO LA ENTIENDO
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState(data);

    // Al escribir en los campos de edición =>
      // Qué campo cambio (name), qué valor tiene ahora (value) y si es un checkbox
      // Actualiza ese campo sólo en editValues, manteniendo el resto igual
    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditValues({
            ...editValues,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Al guardar =>
      // Envia los valores editados al componente padre y cambia "isEditing" a "false" para dejar de editar
    const handleSave = () => {
        edit(editValues);
        setIsEditing(false);
    };

    // Al cancelar =>
      // Vuelve a los valores originales de la tarea y deja de editar
    const handleCancel = () => {
        setEditValues(data);
        setIsEditing(false);
    };

    // Si se está editando muestra el formulario de edición con los botones "Guardar" y "Cancelar"
    if (isEditing) {
        return (
            <article className="article editing">
                <input 
                    type="text" 
                    name="title" 
                    value={editValues.title}
                    onChange={handleEditChange}
                    className="editInput"
                />
                <input 
                    type="text" 
                    name="description" 
                    value={editValues.description}
                    onChange={handleEditChange}
                    className="editInput"
                />
                <input 
                    type="date" 
                    name="deadline" 
                    value={editValues.deadline}
                    onChange={handleEditChange}
                    className="editInput"
                />
                <label className="checkboxLabel">
                    <input 
                        type="checkbox" 
                        name="isDone" 
                        checked={editValues.isDone}
                        onChange={handleEditChange}
                    />
                    Completada
                </label>
                <div className="task-action-buttons">
                    <button className="saveBtn" onClick={handleSave}>Guardar</button>
                    <button className="cancelBtn" onClick={handleCancel}>Cancelar</button>
                </div>
            </article>
        );
    }

    // Si no se está editando (isEditing = false)
    return (
        <article className={`article ${data.isDone ? 'completed' : ''}`}>
            <h4 className="title">{data.title || "--"}</h4>
            <p className="description">{data.description || "--"}</p>
            <p className="deadline">{data.deadline || "--"}</p>
            <div className="taskActions">
                <label className="statusLabel">
                    <input 
                        type="checkbox" 
                        checked={data.isDone || false}
                        onChange={toggleStatus}
                    />
                    {data.isDone ? 'Completada' : 'Pendiente'}
                </label>
                <div className="task-action-buttons">
                    <button className="editBtn" onClick={() => setIsEditing(true)}>Editar</button>
                    <button className="deleteBtn" onClick={remove}>Borrar</button>
                </div>
            </div>
        </article>
    );
};

// Exporta el componente para usarlo en otros archivos
export default ToDoItem;
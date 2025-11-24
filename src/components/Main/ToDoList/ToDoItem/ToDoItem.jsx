import React from "react";
import "./ToDoItem.css";

const ToDoItem = ({data, remove}) => {
  console.log(data);

  const {title, description, deadline} = data;

  return <article className = "article">
    <h4 className = "title">{title || "--"}</h4>
    <p className="description">{description || "--"}</p>
    <p className="deadline">{deadline || "--"}</p>
    <button className="deleteBtn" onClick={remove}>Borrar</button>      
    </article>;
};

export default ToDoItem;

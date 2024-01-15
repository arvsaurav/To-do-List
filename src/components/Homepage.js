import TaskService from "../services/TaskService";
import "./Homepage.css";
import {useEffect, useState} from "react";

function Homepage() {

    // toggle to render component
    const [dataChangeTracker, setDataChangeTracker] = useState(true);

    const [taskData, setTaskData] = useState([{
        id: '',
        task: '',
        isCompleted: ''
    }]);

    const getAllTasks = async () => {
        const responseData = await TaskService.getAllTasks();
        setTaskData(responseData);
    }
    
    useEffect(() => {
        getAllTasks();
    }, [dataChangeTracker]);

    const handleCheckbox = async (index) => {
        const checkboxId = `checkbox${index}`;
        let checkboxElement = document.getElementById(checkboxId);
        if(!checkboxElement.checked) {
            await TaskService.updateIsCompletedStatusById(index+1, false);
        }
        else {
            await TaskService.updateIsCompletedStatusById(index+1, true);
        }
        setDataChangeTracker((prev) => !prev);
    }

    const editTask = async (index) => {
        const textboxId = `content-text${index}`;
        const editButtonId = `edit-button${index}`;
        let textboxElement = document.getElementById(textboxId);
        let editButton = document.getElementById(editButtonId);
        if(editButton.innerHTML === "Save") {
            const updatedTask = textboxElement.innerHTML;
            await TaskService.updateTaskById(index+1, updatedTask);
            editButton.innerHTML = "Edit";
            textboxElement.contentEditable = false;
            textboxElement.style.overflow = "hidden";
            setDataChangeTracker((prev) => !prev);
        }
        else {
            editButton.innerHTML = "Save";
            textboxElement.contentEditable = true;
            textboxElement.focus();
            textboxElement.style.overflow = "auto";
        }
    }

    // to style content-text on the basis of completion status
    useEffect(() => {
        taskData.forEach((data, index) => {
            const textboxId = `content-text${index}`;
            let textboxElement = document.getElementById(textboxId);
            if(data.isCompleted) {    
                textboxElement.style.textDecoration = "line-through";
                textboxElement.style.color = "green";
            }
            else {
                textboxElement.style.textDecoration = "none";
                textboxElement.style.color = "black";
            }
        })
    }, [taskData]);
    
    return (
        <div className="homepage-div">
            <div className="homepage-header"> TO-DO LIST </div>
            <div className="add-task-div">
                <button className="add-task-button"> Add Task </button>
            </div>
            <div className="parent-content-box">
                {
                    taskData.map((data, index) => {
                        return (
                            <div className="content-area" key={index}>
                                <div className="content-text" id={`content-text${index}`}> {data.task} </div>
                                <div className="content-buttons">
                                    <input className="mark-as-done-checkbox" id={`checkbox${index}`} type="checkbox" checked={data.isCompleted} onChange={() => handleCheckbox(index)}></input>
                                    <button className="edit-button" id={`edit-button${index}`} onClick={() => editTask(index)}> Edit </button>
                                    <button className="delete-button"> Delete </button> 
                                </div>
                            </div>
                        );
                    })
                } 
            </div>
        </div>
    )
}

export default Homepage;

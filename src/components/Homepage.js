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

    const handleCheckbox = async (id) => {
        const checkboxId = `checkbox${id}`;
        let checkboxElement = document.getElementById(checkboxId);
        if(!checkboxElement.checked) {
            await TaskService.updateIsCompletedStatusById(id, false);
        }
        else {
            await TaskService.updateIsCompletedStatusById(id, true);
        }
        setDataChangeTracker((prev) => !prev);
    }

    const editTask = async (id) => {
        const textboxId = `content-text${id}`;
        const editButtonId = `edit-button${id}`;
        let textboxElement = document.getElementById(textboxId);
        let editButton = document.getElementById(editButtonId);
        if(editButton.innerHTML === "Save") {
            const updatedTask = textboxElement.value;
            await TaskService.updateTaskById(id, updatedTask);
            editButton.innerHTML = "Edit";
            textboxElement.disabled = true;
            setDataChangeTracker((prev) => !prev);
        }
        else {
            editButton.innerHTML = "Save";
            textboxElement.disabled = false;
            textboxElement.focus();
        }
    }

    // to style content-text on the basis of completion status
    useEffect(() => {
        taskData.forEach((data) => {
            const textboxId = `content-text${data.id}`;
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

    const deleteTask = async (id) => {
        if(window.confirm("Are you sure?")) {
            await TaskService.deleteTaskById(id);
            setDataChangeTracker((prev) => !prev);
        }
    }

    const addNewTask = () => {
        document.getElementById("add-new-task-text").value = '';
        document.getElementById("add-new-task-parent-container").style.display = "flex";
        document.getElementById("add-new-task-text").disabled = false;
        document.getElementById("add-new-task-text").focus();
    }

    const handleCancel = () => {
        document.getElementById("add-new-task-parent-container").style.display = "none";
    }

    const saveNewAddedTask = async () => {
        const task = document.getElementById("add-new-task-text").value;
        await TaskService.addNewTask(task);
        document.getElementById("add-new-task-parent-container").style.display = "none";
        setDataChangeTracker((prev) => !prev);
    }
    
    return (
        <div className="homepage-div">
            <div className="homepage-header"> TO-DO LIST </div>
            <div className="add-task-div">
                <button className="add-task-button" onClick={() => addNewTask()}> Add Task </button>
            </div>
            <div className="parent-content-box">
                {/* below div will appear for Add Task */}
                <div className="content-area" id="add-new-task-parent-container" style={{display: "none"}}>
                    <textarea className="content-text" id="add-new-task-text" disabled/>
                    <div className="content-buttons">
                        <button className="save-button" style={{width: "45%"}} onClick={() => saveNewAddedTask()}>Save</button>
                        <button className="cancel-button" style={{width: "45%"}} onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </div>
                {
                    taskData.map((data, index) => {
                        return (
                            <div className="content-area" key={index}>
                                <textarea className="content-text" id={`content-text${data.id}`} disabled defaultValue={data.task} />
                                <div className="content-buttons">
                                    <input className="mark-as-done-checkbox" id={`checkbox${data.id}`} type="checkbox" checked={data.isCompleted} onChange={() => handleCheckbox(data.id)}></input>
                                    <button className="edit-button" id={`edit-button${data.id}`} onClick={() => editTask(data.id)}> Edit </button>
                                    <button className="delete-button" onClick={() => deleteTask(data.id)}> Delete </button> 
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

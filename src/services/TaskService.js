import axios from "axios";

// const baseUrl = "http://localhost:3030/tasks";

const baseUrl = "https://to-do-webservice.onrender.com/tasks";

const getAllTasks = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    }
    catch {
        alert("Something went wrong.");
    }
}

const updateIsCompletedStatusById = async (id, status) => {
    try {
        const data = {
            "isCompleted": status
        }
        const response = await axios.patch(baseUrl + `/${id}`, data);
        return response;
    }
    catch {
        alert("Something went wrong.");
    }
}

const updateTaskById = async (id, updatedTask) => {
    try {
        const data = {
            "task": updatedTask
        }
        const response = await axios.patch(baseUrl + `/${id}`, data);
        return response;
    }
    catch {
        alert("Something went wrong.");
    }
}

const deleteTaskById = async (id) => {
    try {
        const response = await axios.delete(baseUrl + `/${id}`);
        return response;
    }
    catch {
        alert("Something went wrong.");
    }
}

const addNewTask = async (task) => {
    try {
        const data = {
            "task": task,
            "isCompleted": false
        }
        const response = await axios.post(baseUrl, data);
        return response;
    }
    catch {
        alert("Something went wrong.");
    }
}

const TaskService = {
    getAllTasks,
    updateIsCompletedStatusById,
    updateTaskById,
    deleteTaskById,
    addNewTask
}

export default TaskService;
import axios from "axios";

const baseUrl = "http://localhost:3030/tasks";

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

const TaskService = {
    getAllTasks,
    updateIsCompletedStatusById,
    updateTaskById
}

export default TaskService;
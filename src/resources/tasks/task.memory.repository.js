const Task = require('./task.model');

const tasks = [];

const getAll = async () => tasks;
const getByIDAndBoardID = async (taskId, boardId) => tasks.find((task) => task.id === taskId && task.boardId === boardId);
const create = async (title, order, description, userId, boardId, columnId) => {
    const task = new Task({
        title, order, description, userId, boardId, columnId
    });
    tasks.push(task);
    return task;
}
const updateById = async (taskId, title, order, description, userId, boardId, columnId) => {
    const task = await getByIDAndBoardID(taskId, boardId);
    if (!task) {
        return null
    }
    task.order = order;
    task.boardId = boardId;
    task.columnId = columnId;
    if (title) {
        task.title = title;
    }
    if (userId) {
        task.userId = userId;
    }
    if (description) {
        task.description = description;
    }
    return task;
}
const deleteById = async (taskId, boardId) => {
    const task = await getByIDAndBoardID(taskId, boardId);
    if (!task) {
        return;
    }
    tasks.splice(tasks.indexOf(task), 1);
}
const deleteAllByBoardId =  (boardId) => {
    const tasksForDelete =  tasks.filter((task) => task.boardId === boardId);
    if (!tasksForDelete.length) {
        return;
    }
    tasksForDelete.forEach((task) => tasks.splice(tasks.indexOf(task), 1));
}

const setUserIdToNull =  (userId) => {
    tasks.forEach((task) => {
        if(task.userId === userId) {
            task.userId = null;
        }
    })
}

module.exports = { getAll, getByIDAndBoardID, create, updateById, deleteById, deleteAllByBoardId, setUserIdToNull };

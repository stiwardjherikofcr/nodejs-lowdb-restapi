import { v4 as uuidv4 } from 'uuid';
import { getConnection } from "../database.js";

export const getTasks = async (req, res) => {
    const tasks = await getConnection().data.tasks;
    res.json(tasks);
};

export const getTaskById = async (req, res) => {
    const task = await getConnection().data.tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};

export const getTaskCount = async (req, res) => {
    const taskCount = await getConnection().data.tasks.length;
    res.json({ taskCount });
};

export const createTask = async (req, res) => {
    const newTask = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description
    };

    try {
        const db = await getConnection();
        db.data.tasks.push(newTask);
        await db.write();
        res.json(newTask);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateTask = async (req, res) => {
    const db = await getConnection();
    const task = db.data.tasks.find(task => task.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title;
    task.description = req.body.description;

    try {
        db.data.tasks.map(t => t.id === req.params.id ? task : t);
        await db.write();
        res.json(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteTask = async (req, res) => {
    const db = await getConnection();
    const task = db.data.tasks.find(t => t.id === req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const index = db.data.tasks.filter(t => t.id !== req.params.id);
    db.data.tasks = index;
    await db.write();
    res.json(index);
};
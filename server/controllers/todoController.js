const { User, Todo } = require('../model');
const validator = require('validator');

const addTodo = async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) 
        return res.status(400).json({ 'message': 'User id and todo are required.'});
    if (!validator.isLength(text, {max: 255})) 
        return res.status(400).json({ 'message': 'Todo cannot be more than 255 characters.'});
    
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    
    try {
        const result = await Todo.create({
            UserId: userId,
            text: text,
            done: false
        })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}
const updateTodo = async (req, res) => {
    const { text, done } = req.body;
    const { id } = req.params;
    console.log(text, done, id)
    if (!id || !text) 
        return res.status(400).json({ 'message': 'Todo id, status and todo are required.'});
    if (!validator.isLength(text, {max: 255})) 
        return res.status(400).json({ 'message': 'Todo cannot be more than 255 characters.'});
    if (typeof done !== "boolean")
        return res.status(400).json({ 'message': 'Todo status invalid.'});

    try {
        const todoExists = await Todo.findByPk(id);
        if (!todoExists) return res.status(401).json({ 'message': 'Todo not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }

    try {
        const result = await Todo.update({text: text, done: done}, {
            where: {id: id}
        });
        if (result[0] === 1) {
            const todo = await Todo.findByPk(id);
            return res.status(200).json(todo);
        } else return res.status(400).json({'message': 'Todo could not be updated.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
}

const getTodosByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExists = await User.findByPk(id);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    try {
        const result = await Todo.findAll({where: {
            UserId: id, done: false}, order: [['updatedAt', 'ASC']]
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

const getPrevTodosByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExists = await User.findByPk(id);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    try {
        const result = await Todo.findAll({where: {
            UserId: id, done: true}, order: [['updatedAt', 'ASC']]
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

const deletePrevTodosByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExists = await User.findByPk(id);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    try {
        const result = await Todo.destroy({where: {
            UserId: id, done: true}
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

module.exports = { addTodo, getTodosByUser, updateTodo, getPrevTodosByUser, deletePrevTodosByUser }
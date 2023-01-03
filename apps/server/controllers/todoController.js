const { User, Todo } = require('../model');
const validator = require('validator');

const addTodo = async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) 
        return res.status(400).json({ 'message': 'User id and todo are required.'});
    if (!validator.isLength(text, {max: 255})) 
        return res.status(400).json({ 'message': 'Todo cannot be more than 255 characters.'});
    if ( userId !== req.id)
        return res.status(403).json({ 'message': 'User not logged in'})
    
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }

    // get order number
    let order = 0;
    const latest = await Todo.findOne({
        where: {UserId: userId},
        order: [[ 'updatedAt', 'DESC' ]]
    })
    if (latest) {
        order = latest.order + 1
    }
    
    try {
        const result = await Todo.create({
            UserId: userId,
            text: text,
            done: false,
            order: order
        })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}
const updateTodo = async (req, res) => {
    const { text, done, userId } = req.body;
    const { id } = req.params;
    // console.log(text, done, id, userId)
    if (!id || !text) 
        return res.status(400).json({ 'message': 'Todo id, status and todo are required.'});
    if (!validator.isLength(text, {max: 255})) 
        return res.status(400).json({ 'message': 'Todo cannot be more than 255 characters.'});
    if (typeof done !== "boolean")
        return res.status(400).json({ 'message': 'Todo status invalid.'});
    if ( userId !== req.id)
        return res.status(403).json({ 'message': 'User not logged in'})
    
    const todoExists = await Todo.findByPk(id);
    if (!todoExists) return res.status(401).json({ 'message': 'Todo not found.'});
    // check if toggling done, if yes, create new order number
    let order = todoExists.order;
    if (todoExists.done !== done) {
        
        const latest = await Todo.findOne({
            where: {UserId: userId},
            order: [[ 'updatedAt', 'DESC' ]]
        })
        if (latest) {
            order = latest.order + 1
        }
    }

    try {
        const result = await Todo.update({text: text, done: done, order: order}, {
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
    if ( id !== req.id)
        return res.status(403).json({ 'message': 'User not logged in'})
    try {
        const userExists = await User.findByPk(id);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    try {
        const result = await Todo.findAll({where: {
            UserId: id, done: false}, order: [['order', 'ASC']]
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

const getPrevTodosByUser = async (req, res) => {
    const { id } = req.params;
    if ( id !== req.id)
        return res.status(403).json({ 'message': 'User not logged in'})
    try {
        const userExists = await User.findByPk(id);
        if (!userExists) return res.status(401).json({ 'message': 'User not found.'});
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
    try {
        const result = await Todo.findAll({where: {
            UserId: id, done: true}, order: [['order', 'ASC']]
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

const deletePrevTodosByUser = async (req, res) => {
    const { id } = req.params;
    if ( id !== req.id)
        return res.status(403).json({ 'message': 'User not logged in'})
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
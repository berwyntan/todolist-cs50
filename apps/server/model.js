const { DataTypes } = require('sequelize');
const db = require('./config/database');

const User = db.define('User', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
});

User.sync({alter: true});

const Todo = db.define('Todo', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      // defaultValue: false,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      // defaultValue: false,
      // allowNull: false
    },
});

User.hasMany(Todo);
Todo.belongsTo(User);
Todo.sync({alter: true});

const Habit = db.define('Habit', {
  
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
  }
});

Todo.hasMany(Habit);
Habit.belongsTo(Todo);
Habit.sync({alter: true});

module.exports = { User, Todo, Habit }
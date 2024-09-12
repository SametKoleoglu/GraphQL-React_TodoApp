import Todo from "./models/Todo.js";

const resolvers = {
  Query: {
    todos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    todo: async (root, args) => {
      try {
        const todo = await Todo.findById(args.id);
        if (!todo) return "Todo not found !!!";
        if (todo) return todo;
      } catch (error) {
        return error.message;
      }
    },
  },
  Mutation: {
    addTodo: async (root, args) => {
      const newTodo = new Todo({
        title: args.title,
        description: args.description,
        completed: args.completed,
        date: new Date(),
      });
      await newTodo.save();
      return newTodo;
    },
    deleteTodo: async (root, args) => {
      try {
        const deletedTodo = await Todo.findByIdAndDelete(args.id);
        if (!deletedTodo) return "Todo not found !!!";
        return `${deletedTodo.title}'s todo was deleted !!!`;
      } catch (error) {
        return error.message;
      }
    },
    updateTodo: async (root, args) => {
      try {
        const { id, title, description, completed, date } = args;
        const updatedTodo = await Todo.findById(id);

        if (!updatedTodo) return "Todo not found !!!";

        if (title != undefined) {
          updatedTodo.title = title;
        }
        if (description != undefined) {
          updatedTodo.description = description;
        }
        if (completed != undefined) {
          updatedTodo.completed = completed;
        }
        if (date != undefined) {
          updatedTodo.date = date;
        }

        const todo = await Todo.findByIdAndUpdate(id, updatedTodo, {
          new: true,
        });
        return todo;
      } catch (error) {
        return error.message;
      }
    },
  },
};

export default resolvers;

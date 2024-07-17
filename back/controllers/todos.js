import  todosModel  from "../models/collections/todos.js";

export const getAllTodos = async (request, response) => {
  try {
    const todos = await todosModel.find({});
    response.status(200).send({ msg: "getAllTodos OK", data: todos });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getAllTodos", error: error.message });
  }
};

export const createTodo = async (request, response) => {
  try {
    const todo = request.body;
    const data = await todosModel.create(todo);
    response.status(200).send({ msg: "Todo created", data, todo });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error creating Todo", error: error.message });
  }
};
export const getOneTodo = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await todosModel.findById(id);
    data
      ? response.status(200).send({ msg: "getOneTodo OK", id, data })
      : response.status(404).send({ msg: "Error Todo Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getOneTodo", error: error.message });
  }
};

export const deleteOneTodo = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await todosModel.findByIdAndDelete(id);
    data
      ? response.status(200).send({ msg: "deleteOneTodo OK", id, data })
      : response.status(404).send({ msg: "Todo Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error deleting Todo", error: error.message, id });
  }
};

export const updateOneTodo = async (request, response) => {
  try {
    const { id } = request.params;
    let todo = request.body;
    const data = await todosModel.findByIdAndUpdate(id, todo);
    data
      ? response.status(200).send({ msg: "UpdateOneTodo OK", id, todo })
      : response.status(404).send({ msg: "Todo Not found", id, todo });
  } catch (error) {
    response.status(500).send({ msg: "Error updating Todo", error: error.message, id, todo });
  }
};

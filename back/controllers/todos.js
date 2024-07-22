import  todosModel  from "../models/collections/todos.js";
import jwt from "jsonwebtoken"

export const getAllTodos = async (request, response) => {
 
  try {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //const user = request.token
    if (token == null) return res.status(401).send({ msg: "No token" });

    await jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
      // VERIFICAMOS QUE EL TOKEN COINCIDA CON LA CONTRASENA
      if (err) return res.status(403).send({ msg: "Token invalid" });
      request.token = user;
      const todos = await todosModel.find({"user_id":user.user._id}).sort({updateAt:-1});
      response.status(200).send({ msg: "getAllTodos OK", data: todos });
    });


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
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //const user = request.token
    if (token == null) return res.status(401).send({ msg: "No token" });
    await jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
      // VERIFICAMOS QUE EL TOKEN COINCIDA CON LA CONTRASENA
      if (err) return res.status(403).send({ msg: "Token invalid" });
      request.token = user; 
      const { id } = request.params;
      const data = await todosModel.find({"user_id":user.user._id, "_id":id});
    data[0]
      ? response.status(200).send({ msg: "getOneTodo OK", id, data:data[0] })
      : response.status(404).send({ msg: "Error Todo Not found", id });
    })
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

export const updateStatusTodo = async (request, response) => {
  const { id } = request.params;
  let status = request.body;
  try {
    const data = await todosModel.findByIdAndUpdate(id, status);
    data
      ? response.status(200).send({ msg: "UpdateOneTodo OK", data, id, status })
      : response.status(404).send({ msg: "Todo Not found", id, status });
  } catch (error) {
    response.status(500).send({ msg: "Error updating Todo", error: error.message, id, status});
  }
};

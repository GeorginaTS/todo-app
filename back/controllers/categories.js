import  categoriesModel  from "../models/collections/categories.js";

export const getAllCategories = async (request, response) => {
  try {
    const categories = await categoriesModel.find({});
    response.status(200).send({ msg: "getAllCategories OK", data: categories });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getAllCategories", error: error.message });
  }
};

export const createCategory = async (request, response) => {
  try {
    const category = request.body;
    const data = await categoriesModel.create(category);
    response.status(200).send({ msg: "Category created", data, category });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error creating Category", error: error.message });
  }
};
export const getOneCategory = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await categoriesModel.findById(id);
    data
      ? response.status(200).send({ msg: "getOneCategory OK", id, data })
      : response.status(404).send({ msg: "Error Category Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getOneCategory", error: error.message });
  }
};

export const deleteOneCategory = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await categoriesModel.findByIdAndDelete(id);
    data
      ? response.status(200).send({ msg: "deleteOneCategory OK", id, data })
      : response.status(404).send({ msg: "Category Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error deleting Category", error: error.message, id });
  }
};

export const updateOneCategory = async (request, response) => {
  try {
    const { id } = request.params;
    let category = request.body;
    const data = await categoriesModel.findByIdAndUpdate(id, category);
    data
      ? response.status(200).send({ msg: "UpdateOneCategory OK", id, category })
      : response.status(404).send({ msg: "Category Not found", id, category });
  } catch (error) {
    response.status(500).send({ msg: "Error updating Category", error: error.message, id, category });
  }
};

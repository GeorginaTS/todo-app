import  statusModel  from "../models/collections/status.js";

export const getAllStatus = async (request, response) => {
  try {
    const status = await statusModel.find({});
    response.status(200).send({ msg: "getAllstatus OK", data: status });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getAllstatus", error: error.message });
  }
};

export const createStatus = async (request, response) => {
  try {
    const Status = request.body;
    const data = await statusModel.create(Status);
    response.status(200).send({ msg: "Status created", data, Status });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error creating Status", error: error.message });
  }
};
export const getOneStatus = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await statusModel.findById(id);
    data
      ? response.status(200).send({ msg: "getOneStatus OK", id, data })
      : response.status(404).send({ msg: "Error Status Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error getOneStatus", error: error.message });
  }
};

export const deleteOneStatus = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await statusModel.findByIdAndDelete(id);
    data
      ? response.status(200).send({ msg: "deleteOneStatus OK", id, data })
      : response.status(404).send({ msg: "Status Not found", id });
  } catch (error) {
    response
      .status(500)
      .send({ msg: "Error deleting Status", error: error.message, id });
  }
};

export const updateOneStatus = async (request, response) => {
  try {
    const { id } = request.params;
    let Status = request.body;
    const data = await statusModel.findByIdAndUpdate(id, Status);
    data
      ? response.status(200).send({ msg: "UpdateOneStatus OK", id, Status })
      : response.status(404).send({ msg: "Status Not found", id, Status });
  } catch (error) {
    response.status(500).send({ msg: "Error updating Status", error: error.message, id, Status });
  }
};

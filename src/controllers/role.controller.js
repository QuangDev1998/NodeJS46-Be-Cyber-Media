import { responseSuccess } from "../common/helpers/response.helper.js";
import { roleServices } from "../services/role.services.js";
export const roleController = {
  create: async function (req, res, next) {
    try {
      const result = await roleServices.create(req);
      const response = responseSuccess(result, `Create role successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await roleServices.findAll(req);
      const response = responseSuccess(result, `Get all roles successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await roleServices.findOne(req);
      const response = responseSuccess(
        result,
        `Get role #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await roleServices.update(req);
      const response = responseSuccess(
        result,
        `Update role #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await roleServices.remove(req);
      const response = responseSuccess(
        result,
        `Remove role #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  togglePermission: async function (req, res, next) {
    try {
      const result = await roleServices.togglePermission(req);
      const response = responseSuccess(
        result,
        `Toggle Permission successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

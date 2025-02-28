import { responseSuccess } from "../common/helpers/response.helper.js";
import authServices from "../services/auth.services.js";

const authController = {
  register: async (req, res, next) => {
    try {
      // req.query;
      const userNew = await authServices.register(req);

      const resData = responseSuccess(userNew, `Register Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      // req.query;
      const data = await authServices.login(req);

      const resData = responseSuccess(data, `Login Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  facebookLogin: async (req, res, next) => {
    try {
      // req.query;
      const data = await authServices.facebookLogin(req);

      const resData = responseSuccess(data, `Login Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      // req.query;
      const data = await authServices.refreshToken(req);

      const resData = responseSuccess(data, `Refresh Token Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getInfo: async (req, res, next) => {
    try {
      // req.query;
      const data = await authServices.getInfo(req);

      const resData = responseSuccess(data, `Get Info Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;

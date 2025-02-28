import {
  responseSuccess,
  responseError,
} from "../common/helpers/response.helper.js";
import carServices from "../services/car.services.js";
const carController = {
  carList: async (req, res, next) => {
    try {
      // req.query;
      const cars = await carServices.carList(req);

      const resData = responseSuccess(cars, `Get List Car Successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      // console.log(error);
      const resData = responseError(error.message, error.code, error.stack);
      res.status(resData.code).json(resData);
    }
  },
};
export default carController;

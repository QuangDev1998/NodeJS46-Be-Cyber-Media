import { responseSuccess } from "../common/helpers/response.helper.js";
import videoServices from "../services/video.services.js";
const videoController = {
  videoList: async (req, res, next) => {
    try {
      const videos = await videoServices.videoList(req);

      const resData = responseSuccess(
        videos,
        `Get List Video Successfully 123`,
        200
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  videoDetail: async (req, res, next) => {
    try {
      const videos = await videoServices.videoDetail(req);

      const resData = responseSuccess(
        videos,
        `Get Detial Video Successfully`,
        200
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default videoController;

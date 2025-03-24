import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";
import { v2 as cloudinary } from "cloudinary";
export const userService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all user`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} user`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} user`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} user`;
  },
  uploadLocal: async (req) => {
    console.log({ file: req.file });
    const file = req.file;
    if (!file) {
      throw new BadRequestException(
        `Vui lòng gửi hình ảnh lên thông qua file (from-data) `
      );
    }
    const userId = req.user.user_id;
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: file.filename,
      },
    });
    return {
      folder: `images/`,
      filename: file.filename,
      imgUrl: `images/${file.path}`,
    };
  },
  uploadCloud: async (req) => {
    console.log({ file: req.file });
    const file = req.file;
    if (!file) {
      throw new BadRequestException(
        `Vui lòng gửi hình ảnh lên thông qua file (from-data) `
      );
    }

    const userId = req.user.user_id;
    // Configuration
    cloudinary.config({
      cloud_name: "leminhquang",
      api_key: "895984712795561",
      api_secret: "teoCAmfCSjswWNTjpy1GYxO6OU4", // Click 'View API Keys' above to copy your API secret
    });
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({ folder: "images" }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });
    console.log({ uploadResult });
    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: uploadResult.secure_url,
      },
    });

    //  để cho FE show được hình cần đổi từ dòng 60 cloud_name: "https://res.cloudinary.com/< TÊN CUẢ BẠN>/image/upload/"
    // src/constant/app.constant.js
    // export const BASE_DOMAIN_CLOUDIMARY = "https://res.cloudinary.com/leminhquang/image/upload/";
    return {
      folder: uploadResult.asset_folder,
      filename: file.filename,
      imgUrl: uploadResult.secure_url,
    };
  },
};

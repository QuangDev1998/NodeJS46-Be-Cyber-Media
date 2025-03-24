import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

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
};

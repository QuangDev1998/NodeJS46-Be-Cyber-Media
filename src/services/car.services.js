import Cars from "../models/Cars.model.js";
import { BadRequestException } from "../common/helpers/error.helper.js";
const carServices = {
  carList: async (req) => {
    // lỗi kiểm soát được
    // 400,403,401
    const passNguoiDungGuiLen = 123;
    const passLayTrongDb = 1235;
    if (passNguoiDungGuiLen !== passLayTrongDb) {
      throw new BadRequestException(`Mật khẩu không chính xác`);
    }
    // if (true) {
    //    throw new BadRequestException(`Email không hợp lệ`);
    // }

    // Lỗi không kiểm soát được
    // mã code : 500
    // console.log(abc);

    // const cars = await sequelize.query(`SELECT * FROM cars`);
    const { page } = req.query;
    console.log(+page);
    const cars = await Cars.findAll({ raw: true });
    console.log({ cars });
    return cars;
  },
};

export default carServices;

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import authServices from "../../services/auth.services.js";
import prisma from "../../prisma/init.prisma.js";
import { REGEX_EMAIL } from "../constant/app.constant.js";

// describe: tiêu đề gom nhóm các case (trường hợp)
// it: cụ thể một case
// beforeEach: chạy trước mỗi lần hàm it chạy, thường dùng để khởi tạo dữ liệu đầu vào
// afterEach: chạy sau mỗi lần hàm it chạy, thường dùng để làm mới lại dữ liệu
describe("Auth Service", () => {
  beforeEach(() => {
    jest.spyOn(prisma.users, `create`);
    jest.spyOn(prisma.users, `findFirst`);
  });

  afterEach(() => {
    // console.log(`afterEach chạy`);
    jest.restoreAllMocks();
  });

  it("Case 1: Trường hợp đăng ký thành công với thông tin hợp lệ", async () => {
    // console.log(`Case 1`);

    // giả lập dữ liệu đầu ra với của 2 hàm findFirst và create VỚI TRƯỜNG HỢP THÔNG TIN HỢP LỆ
    await prisma.users.findFirst.mockResolvedValue(undefined);
    await prisma.users.create.mockResolvedValue({
      user_id: 23,
      email: "nguythitest@gmail.com",
      full_name: "nguythitest",
      avatar: null,
      goole_id: null,
      face_app_id: null,
      created_at: " 2025-02-26T19:47:29.0000",
      updated_at: "2025-02-26T19:47:29.000Z",
      role_id: 2,
    });
    const req = {
      body: {
        full_name: `nguythitest`,
        email: `nguythitest@gmail.com`,
        pass_word: `1234`,
      },
    };
    const userNew = await authServices.register(req);
    console.log(userNew);
    // kiểm tra kết quả
    expect(userNew).not.toHaveProperty("pass_word"); // không được có key password
    expect(typeof userNew.email).toBe("string"); //email phải là chuỗi
    expect(REGEX_EMAIL.test(userNew.email)).toBe(true);
  });

  it("Case 2: Trường hợp đăng ký, email đã tồn tại, cần phải báo lỗi, cần phải báo lỗi", () => {
    // console.log(`Case 2`);
  });
});

import multer from "multer";
import path from "path";
//  nơi lưu trữ ( lưu pixcel data hình ảnh) xử lý tên file và đuôi mở rộng
const storage = multer.diskStorage({
  // xử lý nơi lưu trữ file
  destination: function (req, file, cb) {
    //  có req và file để xử lý logic tạo ra folder muốn lưu trữ
    cb(null, "images/");
  },
  //  xử lý tên file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    // const fileNameString =
    //   `local-` + file.fieldname + "-" + uniqueSuffix + fileExtension;
    const fileNameString = `local-${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileNameString);
  },
});
const uploadLocal = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

export default uploadLocal;

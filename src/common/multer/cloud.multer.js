import multer from "multer";

//  multer.memoryStorage() lưu tạm buffer ( data hình ảnh ) vào trong RAM rồi mới buffer đó lên cloud
//  tự giải phóng RAM sau khi kết thúc API
const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

export default uploadCloud;

import multer from "multer";

const uploadLocal = multer({ dest: "images/" });

export default uploadLocal;

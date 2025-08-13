import multer from "multer";

// Use memory storage instead of disk
 export const upload = multer({storage: multer.diskStorage({})});
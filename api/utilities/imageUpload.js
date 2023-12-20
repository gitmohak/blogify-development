//Multer for handling Image Upload System
import multer from "multer";

const imageUpload = (app) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploaded-images");
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name);
        },
    });

    const upload = multer({ storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json({
            success: true,
            message: "File has been uploaded"
        });
    });
}

export default imageUpload;
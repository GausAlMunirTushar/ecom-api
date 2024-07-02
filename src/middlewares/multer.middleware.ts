import multer from 'multer';

// user pc -> fe -> rest api -> cloudinary

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage }).single('image');

export { upload, storage };
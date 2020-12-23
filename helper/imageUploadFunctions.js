const multer = require('multer');

/** Specifying path and name of the image*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profile-images/');
    },
    filename: function (req, file, cb) {
        console.log(req.params.id);
        const date = new Date().toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2-$1-$3');
        const rand = Math.round(Math.random() * 1E9);
        cb(null, req.params.id+'-'+file.originalname);
    }
});

/**  Specifying the accepted format of files i.e. images*/
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/** function that takes the above function and store the image */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


module.exports = {
    upload
}
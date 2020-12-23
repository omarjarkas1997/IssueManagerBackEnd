const router = require('express').Router();
const usersFunctions = require('../../controllers/usersController');
const profileImageFunctions = require('../../helper/imageUploadFunctions');


/** Get all Users */
router.get('/', usersFunctions.getAllUsers);

/** Get one user using body */
router.post('/user', usersFunctions.getOneUser);


/** POST: upload new profile image */
router.post('/user/profile-image/:id', profileImageFunctions.upload.single('profileImage'), usersFunctions.updateProfileImage);


/** Get one user using body */
router.get('/user/:id', usersFunctions.getOneUser);


module.exports = router;
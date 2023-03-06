const {getAllUsers,getUsersById,createUsers,updateUsers,deleteUsers} = require('../controller/user.controller')

const mdlwr = require('../middleware/user.middleware')

const router = require('express').Router();


router.get('/',getAllUsers);

router.get('/:userById',mdlwr.checkGetUsersById,getUsersById);

router.post('/',mdlwr.checkCreateUsers,createUsers)

router.put('/:userById',mdlwr.checkUpdateUsers,updateUsers)

router.delete('/:userById',mdlwr.checkDeleteUser,deleteUsers)

module.exports = router;
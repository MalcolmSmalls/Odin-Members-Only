const express = require('express')
const router = express.Router()

const commentController = require('../controllers/commentController')
const userController = require('../controllers/userController')



router.get('/', commentController.index)

///// COMMENT

// CREATE

router.get("/comment/create", commentController.comment_create_get);

router.post("/comment/create", commentController.comment_create_post);

// READ 


router.get("/comment/:id", commentController.comment_detail);

router.get("/comments", commentController.comment_list);


// UPDATE


router.get("/comment/:id/update", commentController.comment_update_get);

router.post("/comment/:id/update", commentController.comment_update_post);

// DELETECREATE


router.get("/comment/:id/update", commentController.comment_delete_get);

router.post("/comment/:id/update", commentController.comment_delete_post);




///// USER

// CREATE

router.get("/user/create", userController.user_create_get);

router.post("/user/create", userController.user_create_post);

// READ 


router.get("/user/:id", userController.user_detail);

router.get("/users", userController.user_list);


// UPDATE


router.get("/user/:id/update", userController.user_update_get);

router.post("/user/:id/update", userController.user_update_post);

// DELETE


router.get("/user/:id/update", userController.user_delete_get);

router.post("/user/:id/update", userController.user_delete_post);

module.exports = router;
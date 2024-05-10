const router = require("express").Router();
const authController = require("../controller/auth");
const userController = require("../controller/user");

//Auth routes
router
  .post("/api/v1/auth/register", authController.register)
  .post("/api/v1/auth/login", authController.login);

// User routes
router
  .route("/api/v1/users")
  .get(userController.findAllItems)
  .post(userController.create);

// Article routes
// router
//   .route("/api/v1/articles")
//   .get(articleController.findAllItems)
//   .post(authenticate, authorize(["admin", "user"]), articleController.create);

// router
//   .route('/api/v1/articles/:id')
//   .get(articleController.findSingleItem)
//   .put(authenticate, authorize(['user', 'admin']), articleController.updateItem)
//   .patch(
//     authenticate,
//     authorize(['user', 'admin']),
//     articleController.updateItemPatch
//   )
//   .delete(
//     authenticate,
//     authorize(['admin', 'user']),
//     ownership('Article'),
//     articleController.removeItem
//   );

// router
//   .route('/api/v2/articles/:id')
//   .patch(authenticate, articleControllerV2.updateItemPatch);

module.exports = router;

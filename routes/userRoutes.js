const { Router } = require("express");
const UserService = require("../services/userService");
const { createUserValid, updateUserValid } = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// TODO: Implement route controllers for user
router.get(
  "/",
  (req, res, next) => {
    const users = UserService.getAll();
    res.data = users;
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.getById(req.params.id);
      res.data = user;
    } catch (error) {
      res.is404 = true;
      res.message = error.message;
    }
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.update(req.params.id, req.body);
    } catch (error) {
      res.is400 = true;
      res.message = error.message;
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const user = UserService.create(req.body);
        res.data = user;
      }
    } catch (error) {
      res.is400 = true;
      res.message = error.message;
    }

    next();
  },
  responseMiddleware
);

module.exports = router;

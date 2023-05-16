import express from "express";
import itemsController from "../controllers/items.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", authController.hasRole("owner"), itemsController.findAll);
router.post(
  "/",
  authController.hasRole("owner"),
  (req, res, next) => {
    req.body.owner = req.user._id;
    next();
  },
  itemsController.create
);
router.get(
  "/:id",
  authController.hasRole("owner"),
  authController.isOwner,
  itemsController.findById
);
router.put(
  "/:id",
  authController.hasRole("owner"),
  authController.isOwner,
  itemsController.update
);
router.delete(
  "/:id",
  authController.hasRole("owner"),
  authController.isOwner,
  itemsController.delete
);

export default router;

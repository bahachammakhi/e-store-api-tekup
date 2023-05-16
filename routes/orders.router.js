import express from "express";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", authController.hasRole("client"), ordersController.findAll);
router.post("/", authController.hasRole("client"), ordersController.create);
router.get("/:id", authController.hasRole("client"), ordersController.findById);
router.put("/:id", authController.hasRole("client"), ordersController.update);
router.delete(
  "/:id",
  authController.hasRole("client"),
  ordersController.delete
);
router.patch("/:id", authController.hasRole("client"), ordersController.update);

export default router;

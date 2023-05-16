import orderModel from "../models/order.model.js";
import CommonController from "./common.controller.js";

class OrdersController extends CommonController {
  constructor() {
    super(orderModel);
  }

  async findAll(req, res) {
    const result = await orderModel.find().populate("items.item");
    res.status(200).json(result);
  }
}

export default new OrdersController();

import itemModel from "../models/item.model.js";
import CommonController from "./common.controller.js";

class ItemsController extends CommonController {
  constructor() {
    super(itemModel);
  }
}

export default new ItemsController(itemModel);

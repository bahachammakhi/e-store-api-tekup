class CommonController {
  constructor(model) {
    console.log("model", model);
    this.model = model;
    this.findAll = this.findAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.exists = this.exists.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
  }

  async findAll(req, res) {
    const result = await this.model.find();
    res.json(result);
  }

  async update(req, res) {
    await this.exists(req.params.id, res);
    const result = await this.model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(result);
  }

  async delete(req, res) {
    await this.exists(req.params.id, res);
    const result = await this.model.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  }

  async exists(id, res) {
    const result = await this.model.findById(id);
    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
    }
  }

  async findById(req, res) {
    const result = await this.model.findById(req.params.id);
    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  }
  async create(req, res) {
    const body = req.body;
    console.log(
      "🚀 ~ file: common.controller.js:53 ~ CommonController ~ create ~ body:",
      body
    );

    const result = await this.model.create(body);
    res.status(200).json(result);
  }
}

export default CommonController;

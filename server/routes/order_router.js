const express = require("express");
const orderController = require("../controllers/order_controller");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/",verifyToken ,orderController.createOrder);

router.get("/", verifyToken, orderController.getAllOrders);

router.get("/:id", orderController.getplaceOrders);

router.put("/", orderController.updateOrder);

router.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = router;

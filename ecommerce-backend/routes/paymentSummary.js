import express from "express";
import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
import { DeliveryOption } from "../models/DeliveryOption.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();
router.use(authenticate);

router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        userId: req.user.userId,
      },
    });
    let totalItems = 0;
    let productCostCents = 0;
    let shippingCostCents = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      const deliveryOption = await DeliveryOption.findByPk(
        item.deliveryOptionId,
      );

      if (!product) {
        return res.status(400).json({
          error: "Product in cart no longer exists",
        });
      }

      if (!deliveryOption) {
        return res.status(400).json({
          error: "Delivery option in cart is no longer available",
        });
      }

      totalItems += item.quantity;
      productCostCents += product.priceCents * item.quantity;
      shippingCostCents += deliveryOption.priceCents;
    }

    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    res.json({
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong while calculating payment summary",
    });
  }
});

export default router;

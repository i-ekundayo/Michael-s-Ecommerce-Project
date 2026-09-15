import express from "express";
import { Product } from "../models/Product.js";
import { DeliveryOption } from "../models/DeliveryOption.js";
import { defaultProducts } from "../defaultData/defaultProducts.js";
import { defaultDeliveryOptions } from "../defaultData/defaultDeliveryOptions.js";

const router = express.Router();



router.post("/", async (req, res) => {

  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        error: "Reset endpoint is disabled in production",
      });
    }
    
    await Product.destroy({ where: {} });
    await DeliveryOption.destroy({ where: {} });

    const timestamp = Date.now();

    const productsWithTimestamps = defaultProducts.map((product, index) => ({
      ...product,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index),
    }));

    const deliveryOptionsWithTimestamps = defaultDeliveryOptions.map(
      (option, index) => ({
        ...option,
        createdAt: new Date(timestamp + index),
        updatedAt: new Date(timestamp + index),
      }),
    );

    await Product.bulkCreate(productsWithTimestamps);
    await DeliveryOption.bulkCreate(deliveryOptionsWithTimestamps);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong while resetting the data",
    });
  }
});

export default router;
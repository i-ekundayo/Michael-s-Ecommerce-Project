import express from "express";
import { DeliveryOption } from "../models/DeliveryOption.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expand = req.query.expand;

    const deliveryOptions = await DeliveryOption.findAll();

    if (expand === "estimatedDeliveryTime") {
      const response = deliveryOptions.map((option) => {
        const deliveryTimeMs =
          Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000;

        return {
          ...option.toJSON(),
          estimatedDeliveryTimeMs: deliveryTimeMs,
        };
      });

      return res.json(response);
    }

    res.json(deliveryOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong while fetching delivery options",
    });
  }
});

export default router;
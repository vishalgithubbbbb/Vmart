import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true, // ✅ faster queries by user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // ✅ no zero/negative quantities
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
      min: 0, // ✅ prevent negative amounts
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
      index: true, // ✅ useful for filtering reports
    },

    // 🔥 Tracking system
    trackingHistory: [
      {
        status: {
          type: String,
          enum: [
            "Order Placed",
            "Processing",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
          ],
          required: true,
        },
        message: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    paymentType: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true, // ✅ soft delete / cancellation flag
    },
  },
  { timestamps: true }
);

// ✅ Virtual field: total items in order
orderSchema.virtual("totalItems").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// ✅ Pre-save hook: auto push tracking entry when status changes
orderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    this.trackingHistory.push({
      status: this.status,
      message: `Status changed to ${this.status}`,
    });
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

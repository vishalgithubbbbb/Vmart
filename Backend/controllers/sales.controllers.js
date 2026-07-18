import Order from "../models/order.model.js";

export const getSalesData = async (req, res) => {
  try {

    const orders = await Order.find().sort({ createdAt: 1 });

    // ==========================
    // Totals
    // ==========================

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.amount,
      0
    );

    // ==========================
    // Payment
    // ==========================

    const onlineOrders = orders.filter(
      (o) => o.paymentType === "Online"
    ).length;

    const offlineOrders = orders.filter(
      (o) => o.paymentType === "COD"
    ).length;

    const paidOrders = orders.filter(
      (o) => o.isPaid
    );

    const unpaidOrders = orders.filter(
      (o) => !o.isPaid
    );

    const totalPaidOrders = paidOrders.length;

    const totalUnpaidOrders = unpaidOrders.length;

    const totalPaidRevenue = paidOrders.reduce(
      (sum, o) => sum + o.amount,
      0
    );

    const totalUnpaidRevenue = unpaidOrders.reduce(
      (sum, o) => sum + o.amount,
      0
    );

    // ==========================
    // Status
    // ==========================

    const orderPlaced = orders.filter(
      (o) => o.status === "Order Placed"
    ).length;

    const pendingPayment = orders.filter(
      (o) => o.status === "Pending Payment"
    ).length;

    const shipped = orders.filter(
      (o) => o.status === "Shipped"
    ).length;

    const delivered = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    const cancelled = orders.filter(
      (o) => o.status === "Cancelled"
    ).length;

    // ==========================
    // Monthly Revenue
    // ==========================

    const monthlyRevenue = {};

    const monthlyOrders = {};

    // ==========================
    // Daily Revenue
    // ==========================

    const dailyRevenue = {};

    const dailyOrders = {};

    orders.forEach((order) => {

      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });

      monthlyRevenue[month] =
        (monthlyRevenue[month] || 0) + order.amount;

      monthlyOrders[month] =
        (monthlyOrders[month] || 0) + 1;

      const day = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      dailyRevenue[day] =
        (dailyRevenue[day] || 0) + order.amount;

      dailyOrders[day] =
        (dailyOrders[day] || 0) + 1;

    });

    // ==========================
    // Response
    // ==========================

    res.json({

      totalOrders,

      totalRevenue,

      onlineOrders,

      offlineOrders,

      totalPaidOrders,

      totalUnpaidOrders,

      totalPaidRevenue,

      totalUnpaidRevenue,

      orderPlaced,

      pendingPayment,

      shipped,

      delivered,

      cancelled,

      monthlyRevenue,

      monthlyOrders,

      dailyRevenue,

      dailyOrders,

      recentOrders: orders
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 10),

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};
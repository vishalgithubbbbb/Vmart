import Order from "../models/order.model.js";


//update user cartData: /api/sales/seller 
 export const getSalesData = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const monthlySales = {}; // Aggregate by month

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      monthlySales[month] = (monthlySales[month] || 0) + order.totalAmount;
    });

    res.json({
      totalOrders: orders.length,
      totalRevenue,
      monthlyRevenue: monthlySales
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};



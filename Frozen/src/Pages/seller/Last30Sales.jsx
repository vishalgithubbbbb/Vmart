import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

import CountUp from "react-countup";

import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import StatCard from "./Dashboard/StatCard";
import RevenueChart from "./Dashboard/RevenueChart";
import OrdersChart from "./Dashboard/OrdersChart";
import OrderStatusChart from "./Dashboard/OrderStatusChart";
import PaymentChart from "./Dashboard/PaymentChart";
import ExportCSV from "./Dashboard/ExportCSV";


const Last30Sales = () => {

  const { axios } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const { data } = await axios.get("/api/sales/seller");

      setDashboard(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h1 className="text-xl font-semibold">
          Loading Dashboard...
        </h1>

      </div>

    );

  }

  const {

    totalOrders = 0,

    totalRevenue = 0,

    onlineOrders = 0,

    offlineOrders = 0,

    totalPaidRevenue = 0,

    totalUnpaidRevenue = 0,

    orderPlaced = 0,

    pendingPayment = 0,

    shipped = 0,

    delivered = 0,

    cancelled = 0,

    dailyRevenue = {},

    dailyOrders = {},

    recentOrders = []

  } = dashboard;

  return (

    <div className="min-h-screen bg-white p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Seller Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            Sales Analytics & Performance Overview

          </p>

        </div>

        <div className="mt-4 md:mt-0">

          <ExportCSV

            recentOrders={recentOrders}

            totalOrders={totalOrders}

            totalRevenue={totalRevenue}

          />

        </div>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        
              <StatCard
          title="Total Orders"
          value={<CountUp end={totalOrders} duration={2} />}
          subtitle="All customer orders"
          icon={<FaShoppingCart className="text-white text-2xl" />}
          color="bg-blue-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          subtitle="Total sales generated"
          icon={<FaMoneyBillWave className="text-white text-2xl" />}
          color="bg-green-600"
        />

        <StatCard
          title="Online Orders"
          value={<CountUp end={onlineOrders} duration={2} />}
          subtitle={`Revenue ₹${totalPaidRevenue}`}
          icon={<FaCreditCard className="text-white text-2xl" />}
          color="bg-purple-600"
        />

        <StatCard
          title="COD Orders"
          value={<CountUp end={offlineOrders} duration={2} />}
          subtitle={`Pending ₹${totalUnpaidRevenue}`}
          icon={<FaMoneyBillWave className="text-white text-2xl" />}
          color="bg-orange-500"
        />

        <StatCard
          title="Delivered"
          value={<CountUp end={delivered} duration={2} />}
          subtitle="Successfully delivered"
          icon={<FaCheckCircle className="text-white text-2xl" />}
          color="bg-green-500"
        />

        <StatCard
          title="Shipped"
          value={<CountUp end={shipped} duration={2} />}
          subtitle="Orders in transit"
          icon={<FaTruck className="text-white text-2xl" />}
          color="bg-cyan-500"
        />

        <StatCard
          title="Pending"
          value={<CountUp end={pendingPayment} duration={2} />}
          subtitle="Awaiting processing"
          icon={<FaClock className="text-white text-2xl" />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Cancelled"
          value={<CountUp end={cancelled} duration={2} />}
          subtitle="Cancelled by customer"
          icon={<FaTimesCircle className="text-white text-2xl" />}
          color="bg-red-500"
        />

      </div>

      {/* Revenue Chart */}

      <div className="mt-8">

        <RevenueChart
          dailyRevenue={dailyRevenue}
        />

      </div>
            {/* Orders Chart */}

      <div className="mt-8">

        <OrdersChart
          dailyOrders={dailyOrders}
        />

      </div>

      {/* Status & Payment */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

        <OrderStatusChart
          orderPlaced={orderPlaced}
          pendingPayment={pendingPayment}
          shipped={shipped}
          delivered={delivered}
          cancelled={cancelled}
        />

        <PaymentChart
          onlineOrders={onlineOrders}
          offlineOrders={offlineOrders}
        />

      </div>

      {/* Dashboard Footer */}

      <div className="mt-10 border-t pt-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div>

            <h3 className="text-lg font-semibold text-orange-500">
              VMART Seller Analytics
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Monitor your revenue, orders and payment performance from one place.
            </p>

          </div>

          <div className="mt-4 md:mt-0 text-sm text-gray-500">

            Last Updated :
            {" "}
            {new Date().toLocaleString("en-IN")}

          </div>

        </div>

      </div>
          </div>

  );

};

export default Last30Sales; 
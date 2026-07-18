import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContext";

const TrackOrder = () => {

    const { orderId } = useParams();
    const { axios,navigate } = useContext(AppContext);

    const [tracking, setTracking] = useState([]);
    const [status, setStatus] = useState("");

    const stages = [
        {
            title: "Order Placed",
            icon: "🛒",
            color: "bg-indigo-600"
        },
        {
            title: "Processing",
            icon: "⚙️",
            color: "bg-blue-600"
        },
        {
            title: "Packed",
            icon: "📦",
            color: "bg-yellow-500"
        },
        {
            title: "Shipped",
            icon: "🚚",
            color: "bg-cyan-600"
        },
        {
            title: "Delivered",
            icon: "🏠",
            color: "bg-green-600"
        }
    ];

    const currentStage = stages.findIndex(
        item => item.title === status
    );

    const progress =
        currentStage >= 0
            ? (currentStage / (stages.length - 1)) * 100
            : 0;

    const fetchTracking = async () => {
        try {

            const { data } = await axios.get(
                `/api/order/track/${orderId}`
            );

            if (data.success) {
                setTracking(data.tracking);
                setStatus(data.status);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Unable to load tracking");
        }
    };

    useEffect(() => {
        fetchTracking();
    }, []);

    return (

        <div className="min-h-screen py-10">

            <div className="max-w-6xl mx-auto px-5">

                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-gray-800">

                        Track Your Order 🚚

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Order ID :
                        <span className="font-medium text-gray-700 ml-2">
                            {orderId}
                        </span>

                    </p>

                </div>

                {/* Premium Progress Tracker */}

                <div className="bg-white rounded-3xl shadow-xl border-[2px] border-black p-10 mb-10">

                    <h2 className="text-2xl font-bold mb-12">

                        Live Order Tracking

                    </h2>

                    <div className="relative">

                        {/* Background Line */}

                        <div className="absolute top-6 left-0 w-full h-2 bg-gray-200 rounded-full"></div>

                        {/* Blue Progress */}

                        <div
                            className="absolute top-6 left-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                            style={{
                                width: `${progress}%`
                            }}
                        />


                        {/* Stages */}

                        <div className="relative flex justify-between">

                            {
                                stages.map((stage, index) => {

                                    const completed =
                                        index < currentStage;

                                    const active =
                                        index === currentStage;

                                    return (

                                        <div
                                            key={index}
                                            className="flex flex-col items-center w-28"
                                        >

                                            <div
                                                className={`
                                                w-16
                                                h-16
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                text-3xl
                                                shadow-lg
                                                transition-all
                                                duration-500

                                                ${completed
                                                    ? "bg-green-500 text-white"
                                                    : active
                                                        ? "bg-blue-600 text-white animate-pulse scale-110"
                                                        : "bg-gray-200"}
                                            `}
                                            >

                                                {
                                                    completed
                                                        ? "✔️"
                                                        : stage.icon
                                                }

                                            </div>

                                            <h3 className="mt-4 font-semibold text-center">

                                                {stage.title}

                                            </h3>

                                        </div>

                                    );

                                })
                            }

                        </div>

                    </div>

                </div>
                {/* ================= STATUS CARD ================= */}

                <div className="grid lg:grid-cols-2 gap-6 mb-10">

                    {/* Current Status */}

                    <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl text-white p-8 shadow-xl border-[2px] border-black">

                        <p className="uppercase tracking-widest text-sm opacity-80">

                            Current Status

                        </p>

                        <h2 className="text-4xl font-bold mt-3">

                            {status}

                        </h2>

                        <p className="mt-3 text-blue-100">

                            Your order is moving smoothly through our
                            delivery network.

                        </p>

                        <div className="mt-8 flex items-center gap-4">

                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl animate-bounce">

                                🚚

                            </div>

                            <div>

                                <p className="text-sm opacity-80">

                                    Live Tracking Enabled

                                </p>

                                <p className="font-semibold">

                                    Updates in Real Time

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Delivery Card */}

                    <div className="bg-white rounded-3xl border-[2px] border-blackshadow-xl p-8">

                        <h3 className="text-2xl font-bold text-gray-800">
 
                            Delivery Information

                        </h3>

                        <div className="mt-6 space-y-5">

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Estimated Delivery

                                </span>

                                <span className="font-semibold">

                                    Tomorrow

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Delivery Partner

                                </span>

                                <span className="font-semibold">

                                    Vmart Express 🚚

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Payment

                                </span>

                                <span className="font-semibold text-green-600">

                                    Paid ✔

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-500">

                                    Order ID

                                </span>

                                <span className="font-semibold truncate max-w-[180px]">

                                    {orderId}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= LIVE MESSAGE ================= */}

                <div className="bg-blue-50 border-[2px] border-black rounded-2xl p-6 mb-10">

                    <div className="flex items-center gap-3">

                        <div className="text-4xl animate-pulse">

                            🚚

                        </div>

                        <div>

                            <h3 className="font-bold text-lg">

                                Your parcel is on the way!

                            </h3>

                            <p className="text-gray-600 mt-1">

                                Sit back and relax. We'll notify you whenever
                                your order reaches the next stage.

                            </p>

                        </div>

                    </div>

                </div>
                                {/* ================= ORDER JOURNEY ================= */}

                <div className="bg-white rounded-3xl border-[2px] border-black shadow-xl p-8 mb-10">

                    <div className="flex items-center justify-between mb-8">

                        <h2 className="text-2xl font-bold text-gray-800">

                            Order Journey

                        </h2>

                        <span className="text-sm text-gray-500">

                            Live Updates

                        </span>

                    </div>

                    <div className="space-y-8">

                        {tracking.map((item, index) => {

                            const isLast = index === tracking.length - 1;

                            return (

                                <div
                                    key={index}
                                    className="flex gap-6"
                                >

                                    {/* Timeline */}

                                    <div className="flex flex-col items-center">

                                        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg">

                                            {
                                                item.status === "Order Placed" ? "🛒" :
                                                item.status === "Processing" ? "⚙️" :
                                                item.status === "Packed" ? "📦" :
                                                item.status === "Shipped" ? "🚚" :
                                                item.status === "Delivered" ? "🏠" :
                                                "📍"
                                            }

                                        </div>

                                        {!isLast && (

                                            <div className="w-1 h-20 bg-blue-300 mt-2 rounded-full"></div>

                                        )}

                                    </div>

                                    {/* Details */}

                                    <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:shadow-lg transition">

                                        <div className="flex justify-between items-center flex-wrap gap-2">

                                            <h3 className="font-bold text-lg text-gray-800">

                                                {item.status}

                                            </h3>

                                            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                                                Completed

                                            </span>

                                        </div>

                                        <p className="text-gray-600 mt-2">

                                            {item.message}

                                        </p>

                                        <p className="text-sm text-gray-400 mt-3">

                                            {new Date(item.date).toLocaleString()}

                                        </p>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

                {/* ================= DELIVERY STATUS ================= */}

                <div className="grid md:grid-cols-3 gap-5 mb-10">

                    <div className="bg-white rounded-2xl p-6 border-[2px] border-black shadow-lg">

                        <div className="text-4xl mb-3">

                            📦

                        </div>

                        <h3 className="font-bold">

                            Secure Packing

                        </h3>

                        <p className="text-gray-500 text-sm mt-2">

                            Your product is packed safely for delivery.

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border-[2px] border-black p-6 shadow-lg">

                        <div className="text-4xl mb-3">

                            🚚

                        </div>

                        <h3 className="font-bold">

                            Fast Shipping

                        </h3>

                        <p className="text-gray-500 text-sm mt-2">

                            Our delivery partner is bringing your order quickly.

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border-[2px] border-black p-6 shadow-lg">

                        <div className="text-4xl mb-3">

                            🏠

                        </div>

                        <h3 className="font-bold">

                            Safe Delivery

                        </h3>

                        <p className="text-gray-500 text-sm mt-2">

                            Delivered directly to your doorstep.

                        </p>

                    </div>

                </div>

                                {/* ================= ORDER COMPLETED ================= */}

                {
                    status === "Delivered" && (

                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl text-white p-10 shadow-xl mb-8">

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                                <div>

                                    <h2 className="text-4xl font-bold">

                                        🎉 Order Delivered

                                    </h2>

                                    <p className="mt-3 text-green-100">

                                        Thank you for shopping with Vmart.
                                        We hope you enjoy your purchase.

                                    </p>

                                </div>

                                <div className="text-7xl animate-bounce">

                                    🏠

                                </div>

                            </div>

                            <div className="mt-8 flex gap-3 flex-wrap">

                                <button className="px-6 py-3 rounded-xl bg-white text-green-700 font-semibold hover:scale-105 transition">

                                    ⭐ Rate Order

                                </button>

                                <button onClick={() => {

                                navigate("/products");

                                scrollTo(0, 0);

                            }} className="px-6 py-3 rounded-xl bg-green-700 font-semibold hover:scale-105 transition">

                                    🛍 Continue Shopping

                                </button>

                            </div>

                        </div>

                    )
                }

                {/* ================= CANCELLED ================= */}

                {
                    status === "Cancelled" && (

                        <div className="bg-red-50 border border-red-300 rounded-3xl p-10 text-center mb-8">

                            <div className="text-7xl">

                                ❌

                            </div>

                            <h2 className="text-3xl font-bold text-red-600 mt-5">

                                Order Cancelled

                            </h2>

                            <p className="text-gray-600 mt-3">

                                This order has been cancelled.

                            </p>

                        </div>

                    )
                }

                {/* ================= REFRESH ================= */}

                <div className="flex justify-center pb-10">

                    <button
                        onClick={fetchTracking}
                        className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition duration-300 hover:scale-105"
                    >

                        🔄 Refresh Tracking

                    </button>

                </div>

            </div>

        </div>

    );

};

export default TrackOrder;
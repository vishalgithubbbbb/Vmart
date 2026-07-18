import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContext";


const TrackOrder = () => {


    const { orderId } = useParams();

    const { axios } = useContext(AppContext);


    const [tracking, setTracking] = useState([]);

    const [status, setStatus] = useState("");




    const fetchTracking = async () => {

        try {

            const { data } = await axios.get(
                `/api/order/track/${orderId}`
            );


            if (data.success) {

                setTracking(data.tracking);

                setStatus(data.status);

            }
            else {

                toast.error(data.message);

            }


        }
        catch (error) {

            console.log(error);

            toast.error("Unable to load tracking");

        }

    };




    useEffect(() => {

        fetchTracking();

    }, []);





    const getIcon = (status) => {

        switch (status) {

            case "Order Placed":
                return "📦";

            case "Paid":
                return "💳";

            case "Shipped":
                return "🚚";

            case "Out for Delivery":
                return "🏍️";

            case "Delivered":
                return "✅";

            case "Cancelled":
                return "❌";

            default:
                return "📍";

        }

    };





    const getStatusColor = (status) => {


        if (status === "Delivered")
            return "bg-green-500";


        if (status === "Cancelled")
            return "bg-red-500";


        if (status === "Shipped")
            return "bg-blue-500";


        return "bg-indigo-500";


    };





    return (

        <div className="mt-12 px-4 pb-20">


            <div className="max-w-4xl mx-auto">





                {/* Header */}

                <div className="mb-8">


                    <h1 className="text-3xl font-semibold">

                        Track Your Order 🚚

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Order ID:

                        <span className="ml-2 text-gray-800">

                            {orderId}

                        </span>

                    </p>


                </div>







                {/* Current Status Card */}


                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-lg">


                    <p className="text-sm opacity-80">

                        Current Order Status

                    </p>



                    <div className="flex items-center justify-between mt-3">


                        <h2 className="text-2xl font-semibold">

                            {status}

                        </h2>


                        <div className="text-4xl">

                            {getIcon(status)}

                        </div>


                    </div>



                </div>









                {/* Timeline */}



                <div className="bg-white border rounded-2xl p-6 shadow-sm">


                    <h2 className="text-xl font-semibold mb-8">

                        Order Journey

                    </h2>



                    <div className="space-y-8">



                        {
                            tracking.map((item, index) => (


                                <div

                                    key={index}

                                    className="flex gap-5"


                                >





                                    {/* Icon */}

                                    <div className="relative flex flex-col items-center">


                                        <div

                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white ${getStatusColor(item.status)}`}

                                        >

                                            {getIcon(item.status)}

                                        </div>





                                        {
                                            index !== tracking.length - 1 &&

                                            <div className="w-1 h-16 bg-gray-200 mt-2">

                                            </div>

                                        }



                                    </div>








                                    {/* Details */}


                                    <div className="pt-2">


                                        <h3 className="text-lg font-semibold">

                                            {item.status}

                                        </h3>



                                        <p className="text-gray-600">

                                            {item.message}

                                        </p>



                                        <p className="text-sm text-gray-400 mt-2">

                                            {new Date(item.date).toLocaleString()}

                                        </p>



                                    </div>





                                </div>



                            ))

                        }




                    </div>



                </div>








                {/* Delivery Info */}

                {
                    status !== "Cancelled" &&

                    <div className="mt-8 bg-gray-50 rounded-xl p-5">


                        <h3 className="font-semibold">

                            Expected Delivery 📅

                        </h3>


                        <p className="text-gray-600 mt-1">

                            Your order will be delivered soon.

                        </p>


                    </div>

                }




            </div>


        </div>


    );


};


export default TrackOrder;
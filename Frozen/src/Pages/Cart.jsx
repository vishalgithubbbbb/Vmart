import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import toast from "react-hot-toast";


const Cart = () => {

    const {
        products,
        cartCount,
        navigate,
        totalCartAmount,
        cartItems,
        removeFromCart,
        axios,
        setCartItems,
        user,
        updateCartItem
    } = useContext(AppContext);


    // Selected Address
    const [selectedAddress, setSelectedAddress] = useState();


    // Address popup
    const [showAddress, setShowAddress] = useState(false);


    // User Addresses
    const [address, setAddress] = useState([]);


    // Cart Products
    const [cartArray, setCartArray] = useState([]);


    // Payment Method
    const [paymentOption, setPaymentOption] = useState("COD");



    // Get User Address

    const getAddress = async () => {

        try {

            const { data } = await axios.get("/api/address/get");


            if (data.success) {

                setAddress(data.addresses);


                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }

            }
            else {

                toast.error(data.message);

            }


        } catch (error) {

            toast.error(error.message);

        }

    };



    useEffect(() => {

        if (user) {

            getAddress();

        }

    }, [user]);





    // Prepare Cart Products

    const getCart = () => {


        let tempArray = [];


        for (const key in cartItems) {


            const product = products.find(
                (product) => product._id === key
            );


            if (product) {

                product.quantity = cartItems[key];

                tempArray.push(product);

            }


        }


        setCartArray(tempArray);

    };





    useEffect(() => {


        if (products.length > 0 && cartItems) {

            getCart();

        }


    }, [products, cartItems]);







    // Place Order

    const placeOrder = async () => {


        try {


            if (!selectedAddress) {

                return toast.error(
                    "Please select an address"
                );

            }



            if (paymentOption === "COD") {


                const { data } = await axios.post(
                    "/api/order/cod",
                    {

                        items: cartArray.map((item) => ({

                            product: item._id,

                            quantity: item.quantity

                        })),

                        address: selectedAddress._id

                    }
                );



                if (data.success) {


                    toast.success(data.message);


                    setCartItems({});


                    navigate("/my-orders");


                }
                else {


                    toast.error(data.message);


                }



            }

            else {


                const { data } = await axios.post(
                    "/api/order/stripe",
                    {

                        userId: user._id,


                        items: cartArray.map((item) => ({

                            product: item._id,

                            quantity: item.quantity

                        })),


                        address: selectedAddress._id

                    }
                );



                if (data.success) {


                    window.location.replace(data.url);


                }
                else {


                    toast.error(data.message);


                }


            }



        }
        catch (error) {


            toast.error(error.message);


        }


    };
    return products.length > 0 ? (

        <div className="min-h-screen bg-gradient-to-br from-white-50 via-white to-white-50 py-12">

            <div className="max-w-7xl mx-auto px-4 lg:px-8">


                <div className="flex flex-col xl:flex-row gap-10">


                    {/* ================= CART ITEMS SECTION ================= */}


                    <div className="flex-1">


                        {/* Heading */}

                        <div className="mb-10">

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                                Shopping Cart
                            </h1>


                            <p className="text-gray-500 mt-3 text-lg">
                                {cartCount()} Items in your cart
                            </p>

                        </div>





                        {/* Table Header */}

                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] 
                        text-sm uppercase tracking-wide 
                        text-gray-500 font-semibold 
                        border-b pb-4">


                            <p>
                                Product Details
                            </p>


                            <p className="text-center">
                                Subtotal
                            </p>


                            <p className="text-center">
                                Action
                            </p>


                        </div>






                        {/* Product Cards */}

                        <div className="mt-6 space-y-6">


                            {
                                cartArray.map((product, index) => (

                                    <div
                                        key={index}
                                        className="
                                        bg-white
                                        rounded-3xl
                                        shadow-sm
                                        hover:shadow-xl
                                        transition-all
                                        duration-300
                                        p-5
                                        flex
                                        flex-col
                                        md:flex-row
                                        items-center
                                        gap-6
                                        "
                                    >




                                        {/* Product Image + Info */}


                                        <div className="flex items-center gap-5 flex-1">



                                            <div
                                                onClick={() => {

                                                    navigate(
                                                        `/product/${product.category.toLowerCase()}/${product._id}`
                                                    );

                                                    scrollTo(0, 0);

                                                }}

                                                className="
                                                w-32
                                                h-32
                                                md:w-36
                                                md:h-36
                                                rounded-2xl
                                                overflow-hidden
                                                bg-gray-100
                                                cursor-pointer
                                                "
                                            >


                                                <img

                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.image?.[0]}`}


                                                    alt={product.name}

                                                    className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                    hover:scale-110
                                                    transition
                                                    duration-500
                                                    "

                                                />


                                            </div>







                                            <div>


                                                <h2 className="
                                                text-xl
                                                md:text-2xl
                                                font-semibold
                                                text-gray-800
                                                ">

                                                    {product.name}

                                                </h2>




                                                <p className="
                                                text-gray-500
                                                mt-2
                                                ">

                                                    Weight :

                                                    <span className="ml-2 font-medium">

                                                        {product.weight || "N/A"}

                                                    </span>


                                                </p>

                                                <div className="flex items-center mt-4 gap-3">

                                                    <p className="text-gray-600 font-medium">
                                                        Qty:
                                                    </p>


                                                    <select

                                                        onChange={(e) =>
                                                            updateCartItem(
                                                                product._id,
                                                                Number(e.target.value)
                                                            )
                                                        }

                                                        value={cartItems[product._id]}

                                                        className="
                                                        border
                                                        border-gray-300
                                                        rounded-lg
                                                        px-3
                                                        py-1
                                                        bg-white
                                                        outline-none
                                                        focus:ring-2
                                                        focus:ring-indigo-500
                                                        "

                                                    >

                                                        {
                                                            Array.from(
                                                                {
                                                                    length:
                                                                        cartItems[product._id] > 9
                                                                            ? cartItems[product._id]
                                                                            : 9
                                                                },
                                                                (_, index) => (

                                                                    <option
                                                                        key={index}
                                                                        value={index + 1}
                                                                    >

                                                                        {index + 1}

                                                                    </option>

                                                                )
                                                            )
                                                        }

                                                    </select>


                                                </div>


                                            </div>


                                        </div>








                                        {/* Product Price */}


                                        <div className="
                                        text-center
                                        min-w-[120px]
                                        ">


                                            <p className="
                                            text-sm
                                            text-gray-400
                                            ">

                                                Subtotal

                                            </p>


                                            <p className="
                                            text-2xl
                                            font-bold
                                            text-indigo-600
                                            mt-1
                                            ">

                                                ₹{product.offerPrice * product.quantity}

                                            </p>


                                        </div>









                                        {/* Remove Button */}


                                        <button

                                            onClick={() =>
                                                removeFromCart(product._id)
                                            }


                                            className="
                                            bg-red-50
                                            hover:bg-red-500
                                            hover:text-white
                                            transition
                                            duration-300
                                            rounded-full
                                            p-3
                                            "

                                        >


                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >

                                                <path
                                                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                            </svg>


                                        </button>



                                    </div>


                                ))

                            }


                        </div>









                        {/* Continue Shopping */}


                        <button

                            onClick={() => {

                                navigate("/products");

                                scrollTo(0, 0);

                            }}


                            className="
                            mt-10
                            flex
                            items-center
                            gap-3
                            text-indigo-600
                            font-semibold
                            hover:gap-5
                            transition-all
                            "

                        >


                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 15 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >

                                <path
                                    d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                            </svg>


                            Continue Shopping


                        </button>

                    </div>




                    {/* ================= ORDER SUMMARY SECTION ================= */}



                    <div className="w-full xl:w-[380px]">


                        <div className="
                        sticky
                        top-24
                        bg-white
                        rounded-3xl
                        shadow-xl
                        border
                        border-gray-100
                        p-7
                        ">



                            <h2 className="
                            text-2xl
                            font-bold
                            text-gray-800
                            ">

                                Order Summary

                            </h2>




                            <div className="
                            border-b
                            border-gray-200
                            my-6
                            " />







                            {/* Delivery Address */}



                            <div>


                                <p className="
                                text-sm
                                font-semibold
                                uppercase
                                text-gray-500
                                tracking-wide
                                ">

                                    Delivery Address

                                </p>





                                <div className="
                                relative
                                mt-4
                                bg-gray-50
                                rounded-2xl
                                p-4
                                flex
                                justify-between
                                gap-3
                                ">



                                    <p className="
                                    text-gray-600
                                    text-sm
                                    leading-6
                                    ">


                                        {
                                            selectedAddress ?

                                                `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`

                                                :

                                                "No Address Found"
                                        }


                                    </p>





                                    <button

                                        onClick={() =>
                                            setShowAddress(!showAddress)
                                        }


                                        className="
                                        text-indigo-600
                                        text-sm
                                        font-semibold
                                        hover:underline
                                        whitespace-nowrap
                                        "

                                    >

                                        Change

                                    </button>








                                    {
                                        showAddress && (

                                            <div className="
                                            absolute
                                            top-16
                                            left-0
                                            w-full
                                            bg-white
                                            rounded-xl
                                            border
                                            shadow-lg
                                            z-20
                                            overflow-hidden
                                            ">



                                                {
                                                    address.map((address, index) => (


                                                        <p

                                                            key={index}

                                                            onClick={() => {

                                                                setSelectedAddress(address);

                                                                setShowAddress(false);

                                                            }}


                                                            className="
                                                        p-4
                                                        text-sm
                                                        text-gray-600
                                                        cursor-pointer
                                                        hover:bg-gray-100
                                                        "

                                                        >


                                                            {address.street},
                                                            {address.city},
                                                            {address.state},
                                                            {address.country}


                                                        </p>



                                                    ))
                                                }






                                                <p

                                                    onClick={() =>
                                                        navigate("/add-address")
                                                    }


                                                    className="
                                                p-4
                                                text-center
                                                text-indigo-600
                                                font-semibold
                                                cursor-pointer
                                                hover:bg-indigo-50
                                                "

                                                >

                                                    + Add New Address

                                                </p>




                                            </div>


                                        )
                                    }



                                </div>



                            </div>




                            {/* Payment Method */}



                            <div className="mt-7">


                                <p className="
                                text-sm
                                font-semibold
                                uppercase
                                text-gray-500
                                tracking-wide
                                ">

                                    Payment Method

                                </p>




                                <select

                                    onChange={(e) =>
                                        setPaymentOption(e.target.value)
                                    }


                                    className="
                                    w-full
                                    mt-4
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                    "

                                >


                                    <option value="COD">
                                        Cash On Delivery
                                    </option>


                                    <option value="Online">
                                        Online Payment
                                    </option>


                                </select>



                            </div>







                            <div className="
                            border-b
                            border-gray-200
                            my-7
                            " />








                            {/* Price Details */}



                            <div className="
                            space-y-4
                            text-gray-600
                            ">




                                <div className="
                                flex
                                justify-between
                                ">

                                    <span>
                                        Price
                                    </span>


                                    <span className="font-medium">

                                        ₹{totalCartAmount()}.00

                                    </span>


                                </div>







                                <div className="
                                flex
                                justify-between
                                ">


                                    <span>
                                        Shipping Fee
                                    </span>


                                    <span className="
                                    text-green-600
                                    font-medium
                                    ">

                                        Free

                                    </span>


                                </div>







                                <div className="
                                flex
                                justify-between
                                ">


                                    <span>
                                        Tax (2%)
                                    </span>


                                    <span>

                                        ₹{(totalCartAmount() * 2) / 100}

                                    </span>



                                </div>







                                <div className="
                                flex
                                justify-between
                                border-t
                                pt-5
                                text-xl
                                font-bold
                                text-gray-800
                                ">



                                    <span>
                                        Total Amount
                                    </span>



                                    <span className="
                                    text-indigo-600
                                    ">


                                        ₹
                                        {
                                            totalCartAmount()
                                            +
                                            (totalCartAmount() * 2) / 100
                                        }


                                    </span>



                                </div>






                            </div>









                            {/* Checkout Button */}




                            <button

                                onClick={placeOrder}


                                className="
                                w-full
                                mt-8
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-indigo-600
                                to-purple-600
                                text-white
                                font-semibold
                                text-lg
                                shadow-lg
                                hover:scale-105
                                transition-all
                                duration-300
                                "

                            >


                                {
                                    paymentOption === "COD"
                                        ?
                                        "Place Order"
                                        :
                                        "Pay Now"
                                }


                            </button>




                        </div>


                    </div>



                </div>


            </div>



        </div>

    ) : (


        <div className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-br
        from-gray-50
        to-indigo-50
        px-5
        ">



            <div className="
            bg-white
            rounded-3xl
            shadow-xl
            p-10
            text-center
            max-w-md
            ">



                <div className="
                w-32
                h-32
                mx-auto
                bg-indigo-50
                rounded-full
                flex
                items-center
                justify-center
                text-6xl
                ">

                    🛒

                </div>





                <h2 className="
                text-3xl
                font-bold
                text-gray-800
                mt-8
                ">

                    Your Cart is Empty

                </h2>






                <p className="
                text-gray-500
                mt-3
                ">

                    Looks like you haven't added
                    anything to your cart yet.

                </p>







                <button

                    onClick={() => {

                        navigate("/products");

                        scrollTo(0, 0);

                    }}


                    className="
                    mt-8
                    px-8
                    py-3
                    rounded-xl
                    bg-indigo-600
                    text-white
                    font-semibold
                    hover:bg-indigo-700
                    transition
                    "

                >

                    Start Shopping


                </button>




            </div>




        </div>


    )


}


export default Cart;
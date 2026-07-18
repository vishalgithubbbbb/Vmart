import React, { useEffect, useState } from "react";
import axios from "axios";

const MonthlyRevenueChart = () => {

 const [sales,setSales] = useState([]);

 useEffect(()=>{

  const fetchSales = async()=>{

   const {data} = await axios.get(
    "/api/order/monthly-sales"
   );

   if(data.success){
    setSales(data.sales);
   }

  }

  fetchSales();

 },[]);


 return (
  <div>

   <h2 className="text-xl font-bold">
     Monthly Sales
   </h2>

   {
    sales.map((item,index)=>(

     <div key={index}>

      Month:
      {item._id.month}

      <br/>

      Sales:
      ₹{item.totalSales}

      <br/>

      Orders:
      {item.totalOrders}

     </div>

    ))
   }

  </div>
 )
}

export default MonthlyRevenueChart;
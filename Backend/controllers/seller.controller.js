import jwt from "jsonwebtoken"

//seller login : /api/seller/login

export const sellerlogin = async(req,res)=>{
 try{
 const {email,password}=req.body;
 if(email===process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
   const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.cookie("sellerToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
   res.status(200).json({message:"Seller Login Successfully",success:true});
 }
 }
 catch(error){
  console.log("Error in sellerLogin:",error);
  return res.status(500).json({ message:"Internal server error"});
 }
}

//logout seller : /api/seller/logout

export const sellerlogout=async(req,res)=>{
  try{
    res.clearCookie("sellerToken",{
        httpOnly:true, 
        secure: process.env.NODE_ENV === "production",//use to secure cookies in production
        sameSite:process.env.NODE_ENV === "production" ? "none":"Strict", //Helps prevent CSRF attacks
    });
    res.status(200).json({message:"Seller Logout Successfully",success: true})
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message:"Interval server error"});
  }
}


//check auth seller : /api/seller/is-auth

export const isAuthSeller = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Seller is authenticated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
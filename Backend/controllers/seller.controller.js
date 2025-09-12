import jwt from "jsonwebtoken"

//seller login : /api/seller/login

export const sellerlogin = async(req,res)=>{
 try{
 const {email,password} = req.body;

 let isValidSeller = false;  
   // Check first seller
    if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
      isValidSeller = true;
    }
    // Check second seller
    if(email === process.env.SELLER_EMAIL2 && password === process.env.SELLER_PASSWORD2){
      isValidSeller = true;
    }
 
    if(isValidSeller){
      const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:"7d"});
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({message:"Seller Login Successfully", success:true});
    } else {
      res.status(401).json({message:"Invalid seller credentials", success:false});
    }
  }
  catch(error){
    console.log("Error in sellerLogin:",error);
    return res.status(500).json({ message:"Internal server error"});
  }
}

//logout seller : /api/seller/logout

export const sellerlogout = async(req,res)=>{
  try{
    res.clearCookie("sellerToken");
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


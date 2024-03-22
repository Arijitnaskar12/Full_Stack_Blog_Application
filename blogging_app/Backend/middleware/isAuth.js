const jwt=require('jsonwebtoken');

const isAuth=(req,res,next)=>{ 
    // console.log(req.headers);
    const token=req.headers['authorization'];
    let isVerified;
    try{

        isVerified=jwt.verify(token,process.env.JWT_SECRET_KEY);
    }catch(e){
        return res.status(400).send({
            state:400,
            message:"JWT is not Provided!Please Log in",
            data:e
        })
    }
    if(isVerified)
    {
        // console.log(isVerified);
        req.locals=isVerified;
        next();
    }else{
        res.status(400).send({
            status:400,
            message:"User is Unauthorized!Please log in"
        })
    }
}
module.exports={isAuth};
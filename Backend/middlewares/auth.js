import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next)=>{

    const {token} = req.headers ;
    if(!token) return res.json({success : false , message: "Not Authorized"});
    try {

        const tokenDecode = jwt.verify(token , process.env.JWT_S);
        req.body.userId = tokenDecode.id ;
        console.log("token:" , tokenDecode , "body : " , req.body.userId )
        next()
        
    } catch (error) {
        console.log(error)
        return res.json({success : false , message: error});
        
    }

}


export default authMiddleware;
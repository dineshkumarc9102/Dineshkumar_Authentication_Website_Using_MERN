import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode?.id) {
            return res.status(401).json({ success: false, message: "Invalid Token. Please Login Again" });
        }

        req.user = { id: tokenDecode.id }; // Store userId securely in `req.user`
        
        next(); // Continue to the next middleware/route handler

    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
}

export default userAuth;

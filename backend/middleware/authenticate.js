// This function will decode the JWT token and verify the user
const verifyToken = (token) => {

  console.log(token);

    const [header, payload, signature] = token.split('.');

    // Decode base64 URL encoding to regular base64
    const base64UrlToBase64 = (base64Url) => {
      return base64Url.replace(/-/g, '+').replace(/_/g, '/');
    };
  
    // Decode the Header and Payload from base64
    const decodedHeader = JSON.parse(Buffer.from(base64UrlToBase64(header), 'base64').toString());
    const decodedPayload = JSON.parse(Buffer.from(base64UrlToBase64(payload), 'base64').toString());

    console.log(decodedHeader);
    console.log(decodedPayload);
  
    return {
      header: decodedHeader,
      payload: decodedPayload,
    };
};


const authenticate = async (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  try {
      const decoded = verifyToken(token);
      req.user = decoded; // Attach user info to request object
      next();
  } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
  }
};




module.exports = {verifyToken, authenticate};


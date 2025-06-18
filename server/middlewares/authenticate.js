import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return res.status(400).json({ message: "No secret key provided" });
    }

    const decoded = jwt.verify(token, secretKey);

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ message: err.message});
  }
};

const admin = require("firebase-admin");

async function authenticateAccessToken(req, res, next) {
  const authorizationHeader =
    req.headers.authorization || req.headers.Authorization;
  // const bearerToken = authorizationHeader.split(" ")[1];
  // const idToken = bearerToken;
  try {
    const decodeToken = await admin.auth().verifyIdToken(authorizationHeader);
    req.user = decodeToken; // asign req.user with decodeToken to access user's information
    // now req.user have user data got from firebase
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
}

module.exports = { authenticateAccessToken };

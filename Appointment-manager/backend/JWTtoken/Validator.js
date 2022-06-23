const expressJwt = require('express-jwt');
const RSA_PUBLIC_KEY = require('./JWT').RSA_PUBLIC_KEY;
atob = require("atob");

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['sha1', 'RS256', 'HS256']
});

function getLoggedInUserIdFromLogin(headerToken) {
    userToken = headerToken.split(" ")[1]
    var base64Url = userToken.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64)).userID;
    
}

module.exports.checkIfAuthenticated = checkIfAuthenticated;
module.exports.getLoggedInUserIdFromLogin = getLoggedInUserIdFromLogin;
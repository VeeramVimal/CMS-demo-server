const express = require("express");
const customerRoute = require("./customer.route");
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/customer',
        route: customerRoute
    },
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/admin',
        route: adminRoute
    },
    {
        path: '/users',
        route: userRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router;

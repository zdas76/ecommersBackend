"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_route_1 = require("../modules/Auth/auth.route");
const category_router_1 = require("../modules/category/category.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        router: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        router: auth_route_1.AuthRouter,
    },
    {
        path: "/category",
        router: category_router_1.CategoryRouter,
    },
    {
        path: "/product",
        router: category_router_1.CategoryRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
exports.default = router;

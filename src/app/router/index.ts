import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRouter } from "../modules/Auth/auth.route";
import { CategoryRouter } from "../modules/category/category.router";
import { ProductRouter } from "../modules/product/Product.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/category",
    router: CategoryRouter,
  },
  {
    path: "/product",
    router: ProductRouter,
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router;

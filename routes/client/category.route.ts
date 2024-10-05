import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/categories.controller";

router.get("/", controller.index);

export const categoryRoute = router;
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("trang chu");
})

export const homeRoute = router;
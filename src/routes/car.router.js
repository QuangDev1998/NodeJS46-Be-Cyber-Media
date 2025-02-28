import express from "express";

import carController from "../controllers/car.controller.js";

const carRouter = express.Router();

carRouter.get(`/cars-list`, carController.carList);

export default carRouter;

// callback function

// tham chiếu
// array , object

// const arr1 = [1, 2, 3]
// const arr2 = arr1
// arr2 = [3, 4, 5, 6]

// const obj1 = [age: 18 ]
// const obj2 = obj1

// obj2.age = 20

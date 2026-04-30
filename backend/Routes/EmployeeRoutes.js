import express from "express";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../Controllers/EmployeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

import { Router } from "express";
import {
  getEmployeeById,
  getAllEmployees
} from "../controllers/employeeController";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:employeeId", getEmployeeById);

export default router;
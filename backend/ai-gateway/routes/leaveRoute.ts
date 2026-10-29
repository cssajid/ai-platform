import { Router } from "express";
import { getLeaveBalance } from "../controllers/leaveController";

const router = Router();

router.get("/:employeeId", getLeaveBalance);

export default router;
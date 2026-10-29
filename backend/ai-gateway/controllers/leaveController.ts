import { Request, Response } from "express";

const leaveData = [
  { employeeId: "EMP001", annualLeave: 12, sickLeave: 5 },
  { employeeId: "EMP002", annualLeave: 10, sickLeave: 3 }
];

export const getLeaveBalance = (req: Request, res: Response) => {
  const { employeeId } = req.params;

  const leave = leaveData.find(
    e => e.employeeId === employeeId
  );

  if (!leave) {
    return res.status(404).json({
      message: "Employee leave not found"
    });
  }

  res.json(leave);
};

// IMPORTANT: force module export
export {};
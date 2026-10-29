import { Request, Response } from "express";

/* -----------------------------
   Hardcoded Employee Data
----------------------------- */

const employees = [
  {
    employeeId: "EMP001",
    name: "Sajid Ahmad",
    department: "IT",
    designation: "Software Architect",
    email: "sajid@company.com"
  },
  {
    employeeId: "EMP002",
    name: "Ali Khan",
    department: "HR",
    designation: "HR Manager",
    email: "ali@company.com"
  },
  {
    employeeId: "EMP003",
    name: "Fatima Noor",
    department: "Finance",
    designation: "Accountant",
    email: "fatima@company.com"
  }
];


/* -----------------------------
   Get Employee By ID
----------------------------- */

export const getEmployeeById = (req: Request, res: Response) => {

  const { employeeId } = req.params;

  const employee = employees.find(
    e => e.employeeId === employeeId
  );

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found"
    });
  }

  res.json(employee);
};


/* -----------------------------
   Get All Employees
----------------------------- */

export const getAllEmployees = (req: Request, res: Response) => {

  res.json(employees);

};
import axios from "axios";

export async function getEmployeeInfo(args:any){

  const employeeId = args.employeeId;

  const res = await axios.get(
    `http://localhost:5000/api/employee/${employeeId}`
  );

  return res.data;
}
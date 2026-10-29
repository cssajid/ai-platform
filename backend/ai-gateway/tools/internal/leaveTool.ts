import axios from "axios";

export async function getLeaveBalance(args:any){

  const employeeId = args.employeeId;

  const res = await axios.get(
    //`http://localhost:7000/api/leave/${employeeId}`
    `http://localhost:5000/api/leave/${employeeId}`
  );

  return res.data;
}
import { getLeaveBalance } from "./internal/leaveTool";
import { getEmployeeInfo } from "./internal/employeeTool";

export type ToolFunction = (args: any) => Promise<any>;

export const tools: Record<string, ToolFunction> = {
  getLeaveBalance,
  getEmployeeInfo
};

export const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "getLeaveBalance",
      description: "Get remaining leave balance for employee",
      parameters: {
        type: "object",
        properties: {
          employeeId: {
            type: "string",
            description: "Employee id"
          }
        },
        required: ["employeeId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getEmployeeInfo",
      description: "Get employee information",
      parameters: {
        type: "object",
        properties: {
          employeeId: {
            type: "string"
          }
        },
        required: ["employeeId"]
      }
    }
  }
];
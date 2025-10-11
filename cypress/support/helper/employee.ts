class Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: number;

  constructor(firstName: string, middleName: string, lastName: string, employeeId: number) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.employeeId = employeeId;
  }
}

export default Employee;

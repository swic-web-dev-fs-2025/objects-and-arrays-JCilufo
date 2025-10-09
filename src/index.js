import DATA from "./data.js";
import {
  addAssignmentToCourse,
  getClassAverage,
  getStudentPercentage,
} from "./utils.js";

const CIS277 = DATA[0];

const maria = CIS277.students.find(({ name }) => name === "Maria");
const john = CIS277.students.find(({ name }) => name === "John");

console.info(`Maria's percentage: ${getStudentPercentage(CIS277, maria.id)}%`);

console.info(`John's percentage: ${getStudentPercentage(CIS277, john.id)}%`);

console.info(`Class average: ${getClassAverage(CIS277)}"%`);

const newAssignment = addAssignmentToCourse({
  course: CIS277,
  assignmentName: "Homework 1",
  maxPoints: 50,
});

console.info("Original assignments for Maria:", maria.assignments);
console.info("Original assignments for John:", john.assignments);

const newMaria = newAssignment.students.find(({ name }) => name === "Maria");
const newJohn = newAssignment.students.find(({ name }) => name === "John");

console.info("Updated assignments for Maria:", newMaria.assignments);
console.info("Updated assignments for John:", newJohn.assignments);

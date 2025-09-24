import COURSES from "./data.js";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignment,
} from "./utils.js";

const mariaPercentage = getStudentPercentage("CS277", 1);
console.info("Maria's percentage:", mariaPercentage, "%");

const johnPercentage = getStudentPercentage("CS277", 2);
console.info("John's percentage:", johnPercentage, "%");

const classAverage = getClassAverage("CS277");
console.info("Class average:", classAverage, "%");

const updatedCourses = addAssignment({
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Original courses:", JSON.stringify(COURSES, null, 2));
console.info("Updated courses:", JSON.stringify(updatedCourses, null, 2));

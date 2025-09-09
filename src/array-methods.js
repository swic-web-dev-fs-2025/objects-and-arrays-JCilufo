// Sample data for array method practice
const course = {
  students: [
    {
      id: "s001",
      name: "Maria Rodriguez",
      email: "mrodriguez@swic.edu",
      grades: [85, 92, 78, 88],
    },
    {
      id: "s002",
      name: "John Smith",
      email: "jsmith@swic.edu",
      grades: [90, 87, 95, 92],
    },
    {
      id: "s003",
      name: "Sarah Chen",
      email: "schen@swic.edu",
      grades: [78, 85, 82, 90],
    },
  ],
};

// Helper function from previous exercise
const getStudentAverage = (students, studentId) => {
  const student = students.find((stu) => stu.id === studentId);
  if (!student || student.grades.length === 0) return 0;
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return Math.round(total / student.grades.length);
};

console.info("=== Essential Array Methods for React ===");

// 1. MAP - Transform each element (like rendering a list in React)
const studentNames = course.students.map((student) => student.name);
console.info("All student names:", studentNames);
// ["Maria Rodriguez", "John Smith", "Sarah Chen"]

// 2. FILTER - Select elements based on a condition
// The function you pass is called a 'predicate function'
// Whether an element is included is PREDICATED on returning true/false

const topPerformers = course.students.filter((student) => {
  const avg = getStudentAverage(course.students, student.id);
  return avg >= 90; // This is the predicate - true/false determines inclusion
});
console.info(
  "Top performers:",
  topPerformers.map((stu) => stu.name)
);

// 3. FIND - Get the first element that matches a condition
const firstHighAchiever = course.students.find((student) => {
  const avg = getStudentAverage(course.students, student.id);
  return avg >= 85; // Predicate function again!
});
console.info("First high achiever:", firstHighAchiever.name);

// 4. REDUCE - Combine all elements into a single value
const totalGrades = course.students.reduce((total, student) => {
  return total + student.grades.length;
}, 0);
console.info("Total number of grades recorded:", totalGrades);

// Bonus: Check if something is an array (useful for defensive programming)
if (Array.isArray(course.students)) {
  console.info(`We have ${course.students.length} students`);
}

// Practice chaining methods (very common in React)
const highPerformerEmails = course.students
  .filter((student) => getStudentAverage(course.students, student.id) >= 85)
  .map((student) => student.email);

console.info("High performer emails:", highPerformerEmails);

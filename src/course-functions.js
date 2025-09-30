// Import or recreate the course data (for this exercise, we'll recreate)
const course = {
  id: "CS277",
  title: "Web Development Fundamentals",
  instructor: "Prof. Johnson",
  credits: 3,
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

// Separate functions that work with the data (like React!)
const getStudentAverage = (students, studentId) => {
  const student = students.find((stu) => stu.id === studentId);
  if (!student || student.grades.length === 0) return 0;

  // Calculate total using reduce() method
  // reduce() takes each grade and adds it to a running sum, starting at 0
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return Math.round(total / student.grades.length);
};

const getHighPerformers = (students, threshold = 85) => {
  return students.filter((student) => {
    const avg = getStudentAverage(students, student.id);
    return avg >= threshold;
  });
};

// 💡 Quick Review: Default Parameters
// Notice `threshold = 85` above? That's a default parameter!
// If no threshold is provided, it defaults to 85.
// This is common in React for optional props and function parameters.

// Examples:
console.info("=== Testing Course Functions ===");

// Get Maria's average grade
const mariaAverage = getStudentAverage(course.students, "s001");
console.info("Maria's average:", mariaAverage);

// Get all high performers (>= 85 average)
const topStudents = getHighPerformers(course.students, 85);
console.info(
  "High performers:",
  topStudents.map((stu) => stu.name)
);

// Test with different threshold
const excellentStudents = getHighPerformers(course.students, 90);
console.info(
  "Excellent students (90+):",
  excellentStudents.map((stu) => stu.name)
);

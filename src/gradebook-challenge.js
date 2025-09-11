const gradeBook = {
  courses: [
    {
      id: "CS277",
      name: "Web Development",
      students: [
        {
          id: 1,
          name: "Maria",
          assignments: [
            { name: "Project 1", points: 85, maxPoints: 100 },
            { name: "Quiz 1", points: 18, maxPoints: 20 },
          ],
        },
        {
          id: 2,
          name: "John",
          assignments: [
            { name: "Project 1", points: 92, maxPoints: 100 },
            { name: "Quiz 1", points: 19, maxPoints: 20 },
          ],
        },
      ],
    },
  ],

  // TODO: Calculate student's percentage in a course
  getStudentPercentage(courseId, studentId) {
    // Your implementation here
    // Should return percentage (0-100) based on assignments

    // Using the .find() method to locate the course using courseId.
    const course = this.courses.find(
      (courseItem) => courseItem.id === courseId
    );
    // Implementing defensive programming with 'if (!course)' to handle cases where course = null or undefined.
    if (!course) return null;
    // Using the .find() method to locate the student using studentId.
    const student = course.students.find((stu) => stu.id === studentId);
    // Defensive programming again to handle cases where student = null or undefined.
    if (!student) return null;
    // Using the .reduce() method to calculate total points earned.
    const totalPoints = student.assignments.reduce(
      (sum, earnedPoints) => sum + earnedPoints.points,
      0
    );
    // Using the .reduce() method to calculate total maximum points.
    const totalMaxPoints = student.assignments.reduce(
      (sum, maximumPoints) => sum + maximumPoints.maxPoints,
      0
    );
    // Defensive programming to handle cases where 'totalMaxPoints = 0' to avoid division by zero which would cause errors.
    if (totalMaxPoints === 0) return 0;
    return (totalPoints / totalMaxPoints) * 100;
  },

  // TODO: Get class average for a course
  getClassAverage(courseId) {
    // Your implementation here
    // Should return average percentage for all students
  },

  // TODO: Add new assignment to all students (immutably!)
  addAssignment(courseId, assignmentName, maxPoints) {
    // Your implementation here
    // Should return new gradebook object with assignment added
  },
};

// Test your implementations
console.info("=== Grade Book Testing ===");

// Test student percentage
const mariaPercentage = gradeBook.getStudentPercentage("CS277", 1);
const johnPercentage = gradeBook.getStudentPercentage("CS277", 2);
console.info("Maria's percentage:", mariaPercentage, "%");
console.info("John's percentage:", johnPercentage, "%");

// Test class average
const classAverage = gradeBook.getClassAverage("CS277");
console.info("Class average:", classAverage);

// Test adding assignment
const updatedGradeBook = gradeBook.addAssignment("CS277", "Homework 1", 50);
console.info("Updated gradebook:", updatedGradeBook);

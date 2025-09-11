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

    // Using the .find() method to locate the course using courseId.
    const course = this.courses.find(
      (courseItem) => courseItem.id === courseId
    );

    // Defensive programming to handle cases where course is not found.
    if (!course) return null;

    // Defensive programming to handle cases where there are no students.
    if (!course.students || course.students.length === 0) return 0;

    // Calculate each student's percentage and accumulate.
    const totalPercentages = course.students.reduce((sum, student) => {
      const studentPercentage = this.getStudentPercentage(courseId, student.id);
      // Only add actual numbers. If studentPercentage is null or NaN, add 0 instead.
      return (
        sum +
        (typeof studentPercentage === "number" && !isNaN(studentPercentage)
          ? studentPercentage
          : 0)
      );
    }, 0);

    // Return average percentage for the class.
    return totalPercentages / course.students.length;
  },

  // TODO: Add new assignment to all students (immutably!)
  addAssignment({ courseId, assignmentName, maxPoints }) {
    // Your implementation here
    // Should return new gradebook object with assignment added

    const newAssignment = {
      name: assignmentName,
      points: 45,
      maxPoints: maxPoints,
    };

    // Using .map() to create a new array of courses.
    const updatedCourses = this.courses.map((course) => {
      if (course.id === courseId) {
        // Update students with the new assignment.
        const updatedStudents = course.students.map((student) => ({
          ...student,
          assignments: [...student.assignments, newAssignment],
        }));
        // Return the updated course with new students array.
        return {
          ...course,
          students: updatedStudents,
        };
      }
      // If not the target course, return as is.
      return course;
    });

    // Return a new gradeBook object with updated courses.
    return {
      ...this,
      courses: updatedCourses,
    };
  },
};

// Test your implementations
const mariaPercentage = gradeBook.getStudentPercentage("CS277", 1);
console.info("Maria's percentage:", mariaPercentage, "%");

// Test class average
const classAverage = gradeBook.getClassAverage("CS277");
console.info("Class average:", classAverage, "%");

// Test adding assignment
const updatedGradeBook = gradeBook.addAssignment({
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Updated gradebook:", JSON.stringify(updatedGradeBook, null, 2));

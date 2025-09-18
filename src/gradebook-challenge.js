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
};

const getStudentPercentage = (courseId, studentId) => {
  const { totalPoints, totalMaxPoints } = gradeBook.courses
    .find(({ id }) => id === courseId)
    .students.find(({ id }) => id === studentId)
    ?.assignments.reduce(
      (totalPointsAccumulator, { points, maxPoints }) => ({
        totalPoints: totalPointsAccumulator.totalPoints + points,
        totalMaxPoints: totalPointsAccumulator.totalMaxPoints + maxPoints,
      }),
      { totalPoints: 0, totalMaxPoints: 0 }
    ) || { totalPoints: 0, totalMaxPoints: 0 };

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

const getClassAverage = (courseId) => {
  const foundCourse = gradeBook.courses.find(({ id }) => id === courseId);
  const totalStudents = foundCourse.students.length;

  return Math.round(
    foundCourse.students
      .map(({ id }) => getStudentPercentage(courseId, id))
      ?.reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

// TODO: Add new assignment to all students (immutably!)
const addAssignment = ({ courseId, assignmentName, maxPoints }) => {
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
};

// Test your implementations
const mariaPercentage = getStudentPercentage("CS277", 1);
console.info("Maria's percentage:", mariaPercentage, "%");

// Test class average
const classAverage = getClassAverage("CS277");
console.info("Class average:", classAverage, "%");

// Test adding assignment
const updatedGradeBook = addAssignment({
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Updated gradebook:", JSON.stringify(updatedGradeBook, null, 2));

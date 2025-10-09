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

const addAssignment = ({ courseId, assignmentName, maxPoints }) => {
  const updatedCourses = gradeBook.courses.map(({ id, students }) => ({
    id,
    students:
      id === courseId
        ? students.map((student) => ({
            ...student,
            assignments: [
              ...student.assignments,
              { name: assignmentName, points: 45, maxPoints },
            ],
          }))
        : students,
  }));

  return {
    ...gradeBook,
    courses: updatedCourses,
  };
};

const removeStudent = (courseId, studentId) => {
  const updatedRoster = gradeBook.courses.map(
    ({ id, students, ...course }) => ({
      ...course,
      id,
      students:
        id === courseId
          ? students.filter((student) => student.id !== studentId)
          : students,
    })
  );

  return {
    ...gradeBook,
    courses: updatedRoster,
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

// Test removing student
const updatedStudentList = removeStudent("CS277", 2);
console.info(
  "Updated student roster:",
  JSON.stringify(updatedStudentList, null, 2)
);

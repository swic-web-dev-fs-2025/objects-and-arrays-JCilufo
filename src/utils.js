import COURSES from "./data.js";
export { getStudentPercentage, getClassAverage, addAssignment };

const getStudentPercentage = (courseId, studentId) => {
  const { totalPoints, totalMaxPoints } = COURSES.find(
    ({ id }) => id === courseId
  )
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
  const foundCourse = COURSES.find(({ id }) => id === courseId);
  const totalStudents = foundCourse.students.length;

  return Math.round(
    foundCourse.students
      .map(({ id }) => getStudentPercentage(courseId, id))
      ?.reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

const addAssignment = ({ courseId, assignmentName, maxPoints }) => {
  const clonedCourses = structuredClone(COURSES);
  const foundCourse = clonedCourses.find(({ id }) => id === courseId);

  const newAssignment = { name: assignmentName, points: null, maxPoints };

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCourses;
};

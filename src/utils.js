export const addAssignmentToCourse = ({
  courses,
  courseId,
  assignmentName,
  maxPoints,
}) => {
  const clonedCourses = structuredClone(courses);
  const foundCourse = clonedCourses.find(({ id }) => id === courseId);

  const newAssignment = { name: assignmentName, points: null, maxPoints };

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCourses;
};

export const getClassAverage = (courses, courseId) => {
  const foundCourse = courses.find(({ id }) => id === courseId);
  const totalStudents = foundCourse.students.length;

  return Math.round(
    foundCourse.students
      .map(({ id }) => getStudentPercentage(courses, courseId, id))
      ?.reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

export const getStudentPercentage = ({ courses, courseId, studentId }) => {
  const { totalPoints, totalMaxPoints } = courses
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

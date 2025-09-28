export const addAssignmentToCourse = ({
  course,
  assignmentName,
  maxPoints,
}) => {
  const clonedCourse = structuredClone(course);

  const newAssignment = { name: assignmentName, points: null, maxPoints };

  clonedCourse.students = clonedCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCourse;
};

export const getClassAverage = (course) => {
  const totalStudents = course.students.length;

  return Math.round(
    course.students
      .map(({ id }) => getStudentPercentage(course, id))
      ?.reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

export const getStudentPercentage = (course, studentId) => {
  const { totalPoints, totalMaxPoints } = course.students
    .find(({ id }) => id === studentId)
    ?.assignments.reduce(
      (totalPointsAccumulator, { points, maxPoints }) => ({
        totalPoints: totalPointsAccumulator.totalPoints + points,
        totalMaxPoints: totalPointsAccumulator.totalMaxPoints + maxPoints,
      }),
      { totalPoints: 0, totalMaxPoints: 0 }
    ) || { totalPoints: 0, totalMaxPoints: 0 };

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

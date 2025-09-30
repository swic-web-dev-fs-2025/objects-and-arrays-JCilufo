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

export const calculateDiscount = (price, discountPercent) => {
  const discountedPrice = price - price * discountPercent;
  return discountedPrice;
};

export const formatGrade = (percentage) => {
  const grades = ["F", "F", "F", "F", "F", "F", "D", "C", "B", "A"];
  const index = Math.min(Math.floor(percentage / 10), 9);
  return grades[index];
};

export const isValidScore = (points, maxPoints) => {
  return points >= 0 && points <= maxPoints;
};

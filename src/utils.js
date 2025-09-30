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
  return `${percentage}%: ${grades[index]}`;
};

export const isValidScore = (points, maxPoints) => {
  return points >= 0 && points <= maxPoints;
};

export const generateStudentId = (firstName, lastName) => {
  const firstInitial = firstName.charAt(0).toLowerCase();
  const lastNameLower = lastName.toLowerCase();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${firstInitial}${lastNameLower}${randomNum}`;
};

export const calculateLetterGrade = (percentage) => {
  const grades = ["F", "F", "F", "F", "F", "F", "D", "C", "B", "A"];
  const index = Math.min(Math.floor(percentage / 10), 9);
  return grades[index];
};

export const findTopStudent = (course) => {
  const studentPercentages = course.students.map((student) => {
    const totalPoints = student.assignments.reduce(
      (sum, acc) => sum + acc.pointsEarned,
      0
    );
    const totalMaxPoints = student.assignments.reduce(
      (sum, acc) => sum + acc.maxPoints,
      0
    );
    const percentage =
      totalMaxPoints > 0 ? (totalPoints / totalMaxPoints) * 100 : 0;
    return { name: student.name, percentage };
  });

  const topStudent = studentPercentages.reduce(
    (top, current) => (current.percentage > top.percentage ? current : top),
    studentPercentages[0]
  );

  return topStudent;
};

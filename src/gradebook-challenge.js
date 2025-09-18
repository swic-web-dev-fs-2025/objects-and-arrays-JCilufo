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

// TODO: Calculate student's percentage in a course
const getStudentPercentage = (courseId, studentId) => {

  // 1. Find the course by courseId
  const foundCourse = gradeBook.courses.find(
    ({id}) => id === courseId);

  // 2. Find the student by studentID (in that course)
  // 3. Calculate the percentage: (total points earned / total max points) * 100
  // 4. Return the percentage
  // 5. Handle cases where course or student is not found

// TODO: Get class average for a course
const getClassAverage = (courseId) => {
// Your implementation here
// Should return average percentage for all students

// Using the .find() method to locate the course using courseId.
const course = this.courses.find((courseItem) => courseItem.id === courseId);

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

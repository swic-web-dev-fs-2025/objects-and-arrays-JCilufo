console.info("=== React State Management Patterns ===");

// Initial state (like React useState)
const initialCourse = {
  id: "CS277",
  title: "Web Development Fundamentals",
  students: [
    { id: 1, name: "Maria", gpa: 3.8 },
    { id: 2, name: "John", gpa: 3.2 },
  ],
};

console.info("Initial course:", initialCourse);

// IMMUTABLE UPDATES (React way)
console.info("\n--- Adding Students (Immutable) ---");

// ❌ Bad: Mutates original (breaks React!)
const badAddStudent = (course, newStudent) => {
  course.students.push(newStudent); // BAD: mutates original
  return course;
};

const badNewStudent = { id: 3, name: "Sarah", gpa: 3.9 };
const badUpdatedCourse = badAddStudent(initialCourse, badNewStudent);

console.info("\n--- Bad Way (mutates original) ---");

console.info("Original course students:", initialCourse.students.length);
console.info("Updated course students:", badUpdatedCourse.students.length);
console.info("Objects are different:", initialCourse !== badUpdatedCourse);

// ✅ Good: Creates new objects (React approved!)
const addStudent = (course, newStudent) => {
  return {
    ...course,
    students: [...course.students, newStudent],
  };
};

const newStudent = { id: 3, name: "Sarah", gpa: 3.9 };
const updatedCourse = addStudent(initialCourse, newStudent);

console.info("\n--- Good Way (immutable) ---");

console.info("Original course students:", initialCourse.students.length);
console.info("Updated course students:", updatedCourse.students.length);
console.info("Objects are different:", initialCourse !== updatedCourse);

// UPDATING STUDENT DATA
console.info("\n--- Updating Student GPA ---");

const updateStudentGPA = ({ course, studentId, newGPA }) => {
  return {
    ...course,
    students: course.students.map((student) =>
      student.id === studentId ? { ...student, gpa: newGPA } : student
    ),
  };
};

const courseWithUpdatedGPA = updateStudentGPA({
  course: updatedCourse,
  studentId: 2,
  newGPA: 3.7,
});

console.info(
  "John's updated GPA:",
  courseWithUpdatedGPA.students.find((student) => student.id === 2).gpa
);

// FILTERING STUDENTS
console.info("\n--- Filtering High Performers ---");

const getHighPerformers = (course, threshold = 3.5) => {
  return {
    ...course,
    students: course.students.filter((student) => student.gpa >= threshold),
    title: `${course.title} - High Performers`,
  };
};

const highPerformersCourse = getHighPerformers(courseWithUpdatedGPA, 3.5);
console.info("High performers course:", highPerformersCourse);

// OBJECT METHODS DEEP DIVE
console.info("\n--- Object Analysis Methods ---");

const sampleStudent = {
  firstName: "Maria",
  lastName: "Rodriguez",
  age: 19,
  major: "Computer Science",
};

// Get all keys
const keys = Object.keys(sampleStudent);
console.info("Student property keys:", keys);

// Get all values
const values = Object.values(sampleStudent);
console.info("Student property values:", values);

// Get key-value pairs
const entries = Object.entries(sampleStudent);
console.info("Student entries:", entries);

// Iterate over object properties
console.info("Student information:");
Object.entries(sampleStudent).forEach(([key, value]) => {
  console.info(`  ${key}: ${value}`);
});

// Course data structure - just plain objects and arrays
const course = {
  id: "CS277",
  title: "Web Development Fundamentals",
  instructor: "Prof. Johnson",
  credits: 3,
  students: [
    {
      id: "s001",
      name: "Maria Rodriguez",
      email: "mrodriguez@swic.edu",
      grades: [85, 92, 78, 88],
    },
    {
      id: "s002",
      name: "John Smith",
      email: "jsmith@swic.edu",
      grades: [90, 87, 95, 92],
    },
    {
      id: "s003",
      name: "Sarah Chen",
      email: "schen@swic.edu",
      grades: [78, 85, 82, 90],
    },
  ],
};

// Test basic object access
console.info("Course:", course.title);
console.info("Instructor:", course.instructor);
console.info("Number of students:", course.students.length);

// Access nested object data
console.info("First student:", course.students[0].name);
console.info("First student's grades:", course.students[0].grades);

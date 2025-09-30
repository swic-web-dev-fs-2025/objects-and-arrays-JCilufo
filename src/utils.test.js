import { expect, it, describe } from "vitest";
import {
  addAssignmentToCourse,
  getClassAverage,
  getStudentPercentage,
  calculateDiscount,
  formatGrade,
  isValidScore,
  generateStudentId,
  calculateLetterGrade,
  findTopStudent,
} from "./utils.js";
import DATA from "./data.js";

const CIS277 = DATA[0];

describe("getStudentPercentage function", () => {
  it("should calculate each student's percentage", () => {
    const maria = CIS277.students.find(({ name }) => name === "Maria");
    const percentage1 = getStudentPercentage(CIS277, maria.id);
    const john = CIS277.students.find(({ name }) => name === "John");
    const percentage2 = getStudentPercentage(CIS277, john.id);

    expect(percentage1).toBe(86);
    expect(percentage2).toBe(93);
    expect(percentage1).toBeGreaterThan(0);
    expect(percentage2).toBeGreaterThan(0);
    expect(percentage1).toBeLessThanOrEqual(100);
    expect(percentage2).toBeLessThanOrEqual(100);
  });
});

describe("getClassAverage function", () => {
  it("should calculate class average", () => {
    const classAverage = CIS277;
    const result = getClassAverage(classAverage);
    expect(result).toBe(90);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});

describe("addAssignmentToCourse function", () => {
  it("should preserve immutability", () => {
    const originalCourse = CIS277;
    const originalStudentCount = originalCourse.students.length;
    const originalFirstStudent = originalCourse.students[0];
    const originalAssignmentCount = originalFirstStudent.assignments.length;

    const newAssignment = addAssignmentToCourse({
      course: originalCourse,
      assignmentName: "Homework 1",
      maxPoints: 50,
    });

    expect(originalCourse.students.length).toBe(originalStudentCount);
    expect(originalCourse.students[0].assignments.length).toBe(
      originalAssignmentCount
    );

    expect(newAssignment.students[0].assignments.length).toBe(
      originalAssignmentCount + 1
    );

    expect(newAssignment.students[0].assignments).toContainEqual({
      name: "Homework 1",
      points: null,
      maxPoints: 50,
    });
  });
});

describe("calculateDiscount function", () => {
  it("should calculate the correct discount", () => {
    const price = 100;
    const discountPercent = 0.2;
    const result = calculateDiscount(price, discountPercent);
    expect(result).toBe(80);
  });
});

describe("formatGrade function", () => {
  it("should return the correct letter grade", () => {
    expect(formatGrade(90)).toBe("90%: A");
    expect(formatGrade(80)).toBe("80%: B");
    expect(formatGrade(70)).toBe("70%: C");
    expect(formatGrade(60)).toBe("60%: D");
    expect(formatGrade(50)).toBe("50%: F");
  });
});

describe("isValidScore function", () => {
  it("should validate the score correctly", () => {
    expect(isValidScore(0, 100)).toBe(true);
    expect(isValidScore(100, 100)).toBe(true);
    expect(isValidScore(-1, 100)).toBe(false);
    expect(isValidScore(101, 100)).toBe(false);
  });
});

describe("generateStudentId function", () => {
  it("should generate student ID correctly", () => {
    const id = generateStudentId("John", "Smith");
    expect(id).toMatch(/^jsmith\d{3}$/); // Pattern: jsmith + 3 digits
  });
});

describe("calculateLetterGrade function", () => {
  it("should calculate letter grades correctly", () => {
    expect(calculateLetterGrade(95)).toBe("A");
    expect(calculateLetterGrade(85)).toBe("B");
    expect(calculateLetterGrade(75)).toBe("C");
    expect(calculateLetterGrade(65)).toBe("D");
    expect(calculateLetterGrade(55)).toBe("F");
  });
});

describe("findTopStudent function", () => {
  it("should find student with highest percentage", () => {
    const testCourse = {
      students: [
        { name: "Alice", assignments: [{ maxPoints: 100, pointsEarned: 85 }] },
        { name: "Bob", assignments: [{ maxPoints: 100, pointsEarned: 95 }] },
        {
          name: "Charlie",
          assignments: [{ maxPoints: 100, pointsEarned: 75 }],
        },
      ],
    };
    const topStudent = findTopStudent(testCourse);
    expect(topStudent.name).toBe("Bob");
  });
});

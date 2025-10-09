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

describe("getStudentPercentage function", () => {
  it("should calculate Maria's percentage correctly", () => {
    const data = {
      students: [
        {
          id: 1,
          assignments: [
            { points: 85, maxPoints: 100 },
            { points: 18, maxPoints: 20 },
          ],
        },
      ],
    };

    const id = 1;

    const outputPercentage = getStudentPercentage(data, id);

    expect(outputPercentage).toBe(86);
    expect(outputPercentage).toBeGreaterThan(0);
    expect(outputPercentage).toBeLessThanOrEqual(100);
  });
});

describe("getClassAverage function", () => {
  it("should calculate class average correctly", () => {
    const data = {
      students: [
        {
          id: 1,
          assignments: [
            { points: 85, maxPoints: 100 },
            { points: 18, maxPoints: 20 },
          ],
        },
        {
          id: 2,
          assignments: [
            { points: 92, maxPoints: 100 },
            { points: 19, maxPoints: 20 },
          ],
        },
      ],
    };

    const result = getClassAverage(data);

    expect(result).toBe(90);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});

describe("addAssignmentToCourse function", () => {
  it("should preserve immutability", () => {
    const data = {
      students: [
        {
          assignments: [
            { name: "Project 1", points: 85, maxPoints: 100 },
            { name: "Quiz 1", points: 18, maxPoints: 20 },
          ],
        },
      ],
    };

    const originalAssignmentCount = data.students[0].assignments.length;

    const newAssignment = addAssignmentToCourse({
      course: data,
      assignmentName: "Homework 1",
      maxPoints: 50,
    });

    expect(data.students[0].assignments.length).toBe(originalAssignmentCount);
    expect(newAssignment.students[0].assignments.length).toBe(
      originalAssignmentCount + 1
    );
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

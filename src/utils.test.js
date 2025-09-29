import { expect, it, describe } from "vitest";
import {
  addAssignmentToCourse,
  getClassAverage,
  getStudentPercentage,
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

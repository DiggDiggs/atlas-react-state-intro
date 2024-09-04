import React, { useState } from 'react';

export const CourseContext = React.createInfo();

export const CourseInfoProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse.courseNumber === course.courseNumber);
    if (!isAlreadyEnrolled) {
      setEnrolledCourses([...enrolledCourses, course]);
    } else {
      console.log("already enrolled in course");
    }
  };
  

  const dropCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.courseNumber !== courseId));
  };

  return (
    <CourseContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
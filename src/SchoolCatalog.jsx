import { useEffect, useState } from "react";

function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("../api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="courseTimester">{course.trimester}</td>
              <td className="courseNumber">{course.courseNumber}</td>
              <td className="courseName">{course.courseName}</td>
              <td className="courseCredits">{course.semesterCredits}</td>
              <td className="courseHours">{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default SchoolCatalog;

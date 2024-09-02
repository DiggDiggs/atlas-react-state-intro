
import { useEffect, useState, useContext } from "react";

function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("trimester");
  const [sortDirection, setSortDirection] = useState("asc");


  useEffect(() => {
    fetch("../api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const courseNumberMatch = course.courseNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const courseNameMatch = course.courseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return courseNumberMatch || courseNameMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let comparison = 0;

    if (sortColumn === "trimester") {
      comparison = Number(a.trimester) - Number(b.trimester);
    }
    if (sortColumn === "courseNumber") {
      comparison = a.courseNumber.localeCompare(b.courseNumber);
    }
    if (sortColumn === "courseName") {
      comparison = a.courseName.localeCompare(b.courseName);
    }
    if (sortColumn === "semesterCredits") {
      comparison = Number(a.semesterCredits) - Number(b.semesterCredits);
    }
    if (sortColumn === "totalClockHours") {
      comparison = Number(a.totalClockHours) - Number(b.totalClockHours);
    }
    return sortDirection === 'asc' ? comparison : -comparison


  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search by Name or Course Number"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>

        <thead>
        <tr>
          <th
            className="header-trimester"
            onClick={() => handleSort("trimester")}
          >
            Trimester{" "}
            {sortColumn === "trimester" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="header-number"
            onClick={() => handleSort("courseNumber")}
          >
            Course Number{" "}
            {sortColumn === "courseNumber" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="header-name"
            onClick={() => handleSort("courseName")}
          >
            Course Name{" "}
            {sortColumn === "courseName" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="header-credits"
            onClick={() => handleSort("semesterCredits")}
          >
            Semester Credits{" "}
            {sortColumn === "semesterCredits" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="header-hours"
            onClick={() => handleSort("totalClockHours")}
          >
            Total Clock Hours{" "}
            {sortColumn === "totalClockHours" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th className="header">Enroll</th>
        </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              {sortedCourses.map((course) => (
                <tr key={course.courseNumber}>
                  <td className="course-trimester">{course.trimester}</td>
                  <td className="course-number">{course.courseNumber}</td>
                  <td className="course-name">{course.courseName}</td>
                  <td className="course-credits">{course.semesterCredits}</td>
                  <td className="course-hours">{course.totalClockHours}</td>
                  <button>Enroll</button>
                </tr>
              ))}

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

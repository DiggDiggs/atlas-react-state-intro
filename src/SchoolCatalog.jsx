// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './App';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('trimester');
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Access Enrolled Courses from Context
  const { enrolledCourses, setEnrolledCourses } = useContext(AppContext);

  // Fetch Courses on Component Mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses.json');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Filter Courses Based on Search Input
  const filteredCourses = courses.filter(({ courseName, courseNumber }) =>
    courseName.toLowerCase().includes(filter.toLowerCase()) ||
    courseNumber.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort Courses Based on Selected Field
  const handleSort = (field) => {
    const newDirection = (sort === field && direction === 'asc') ? 'desc' : 'asc';
    setSort(field);
    setDirection(newDirection);
  };

  const getSortedCourses = () => {
    return filteredCourses.slice().sort((a, b) => {
      const sortOrder = direction === 'asc' ? 1 : -1;

      switch (sort) {
        case 'trimester':
          return (a.trimester - b.trimester) * sortOrder;
        case 'course number':
          return a.courseNumber.localeCompare(b.courseNumber) * sortOrder;
        case 'course name':
          return a.courseName.localeCompare(b.courseName) * sortOrder;
        case 'semester credits':
          return (a.semesterCredits - b.semesterCredits) * sortOrder;
        case 'total clock hours':
          return (a.totalClockHours - b.totalClockHours) * sortOrder;
        default:
          return 0;
      }
    });
  };

  // Handle Pagination
  const paginatedCourses = getSortedCourses().slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = getSortedCourses().length > page * PAGE_SIZE;
  const hasLess = page > 1;

  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {['trimester', 'course number', 'course name', 'semester credits', 'total clock hours'].map((field) => (
              <th key={field} onClick={() => handleSort(field)}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {sort === field && (direction === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enrollCourse(course)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

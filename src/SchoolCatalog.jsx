import { useEffect, useState } from "react";
const courses = "../public/api/courses.json";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((courses) => (
            <tr>
              <td key={courses.trimester}>{courses.trimester}</td>
              <td key={courses.courseNumber}>{courses.courseNumber}</td>
              <td key={courses.courseName}>{courses.courseName}</td>
              <td key={courses.semesterCredits}>{courses.semesterCredits}</td>
              <td key={courses.totalClockHours}>{courses.totalClockHours}</td>
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

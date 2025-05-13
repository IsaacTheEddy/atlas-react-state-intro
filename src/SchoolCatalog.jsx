import { useEffect, useState } from "react";

function useGetCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return courses;
}

export default function SchoolCatalog() {
  let courses = useGetCourses();

  const [filter, setFilter] = useState("");

  const filteredData = courses.filter((item) => {
    const lowerFilter = filter.toLowerCase();
    return (
      (item.courseName &&
        item.courseName.toLowerCase().startsWith(lowerFilter)) ||
      (item.courseNumber &&
        String(item.courseNumber).toLowerCase().startsWith(lowerFilter))
    );
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
      />
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
          {filteredData.map((courses) => (
            <tr key={courses.courseName}>
              <td>{courses.trimester}</td>
              <td>{courses.courseNumber}</td>
              <td>{courses.courseName}</td>
              <td>{courses.semesterCredits}</td>
              <td>{courses.totalClockHours}</td>
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

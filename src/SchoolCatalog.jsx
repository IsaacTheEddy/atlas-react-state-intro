import { useEffect, useState, useContext } from "react";
import { AppContext } from "./App";

const PAGE_SIZE = 5;

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
  const { enrollCourse } = useContext(AppContext);

  let courses = useGetCourses();

  const [sort, setSort] = useState("trimester");
  const [direction, setDirection] = useState("asc");

  const [filter, setFilter] = useState("");

  const [page, setPage] = useState(1);

  const filteredData = courses.filter((item) => {
    const lowerFilter = filter.toLowerCase();
    return (
      (item.courseName &&
        item.courseName.toLowerCase().startsWith(lowerFilter)) ||
      (item.courseNumber &&
        String(item.courseNumber).toLowerCase().startsWith(lowerFilter))
    );
  });

  const handleSortingChange = (field) => {
    const sortOrder = sort === field && direction === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };

  const sortedData = filteredData.sort((a, b) => {
    if (sort === "trimester") {
      return (a.trimester - b.trimester) * (direction === "desc" ? -1 : 1);
    } else if (sort === "courseNumber") {
      return (
        a[sort].localeCompare(b.courseNumber) * (direction === "desc" ? -1 : 1)
      );
    } else if (sort === "courseName") {
      return (
        a[sort].localeCompare(b.courseName) * (direction === "desc" ? -1 : 1)
      );
    } else if (sort === "semesterCredits") {
      return (
        (a.semesterCredits - b.semesterCredits) *
        (direction === "desc" ? -1 : 1)
      );
    } else if (sort === "totalClockHours") {
      return (
        (a.totalClockHours - b.totalClockHours) *
        (direction === "desc" ? -1 : 1)
      );
    }
  });

  const currentPage = sortedData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const hasMore = sortedData.length > page * PAGE_SIZE;
  const hasLess = page > 1;

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
            <th onClick={() => handleSortingChange("trimester")}>Trimester</th>
            <th onClick={() => handleSortingChange("courseNumber")}>
              Course Number
            </th>
            <th onClick={() => handleSortingChange("courseName")}>
              Courses Name
            </th>
            <th onClick={() => handleSortingChange("semesterCredits")}>
              Semester Credits
            </th>
            <th onClick={() => handleSortingChange("totalClockHours")}>
              Total Clock Hours
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
            <tr key={course.courseName || course.courseNumber}>
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
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

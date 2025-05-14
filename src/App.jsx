import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import React, { useState } from "react";

export const AppContext = React.createContext();

export default function App() {
  const [enrolled, setEnrolled] = useState([]);

  const enrollCourse = (courseToAdd) => {
    if (
      !enrolled.some(
        (course) => course.courseNumber === courseToAdd.courseNumber
      )
    ) {
      setEnrolled((prevEnrolled) => [...prevEnrolled, courseToAdd]);
      console.log(`Added ${courseToAdd.courseName}`);
    } else {
      console.log(`Already enrolled in ${courseToAdd.courseName}`);
    }
  };

  const dropCourse = (courseToDrop) => {
    setEnrolled((prevEnrolled) =>
      prevEnrolled.filter((course) => course.courseNumber !== courseToDrop)
    );
    console.log(`Dropped course with number ${courseToDrop}`);
  };

  const contextValue = {
    enrolled: enrolled,
    enrollCourse: enrollCourse,
    dropCourse: dropCourse,
  };

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </AppContext.Provider>
    </div>
  );
}

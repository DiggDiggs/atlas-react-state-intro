import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  return (
    <AppContext.Provider value={{enrolledCourses, setEnrolledCourses}}>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </AppContext.Provider>
  );
}
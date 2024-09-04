import logo from "./assets/logo.png";
import { useContext } from "react";
import { AppContext } from "./App";

export default function Header() {
  const { enrolledCourses } = useContext(AppContext);
  const numCourses = enrolledCourses.length;

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {numCourses}</div>
    </div>
  );
}
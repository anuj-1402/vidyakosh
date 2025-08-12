import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: <img src={assets.home_icon} alt="Dashboard" /> },
    { name: "Add Course", path: "/educator/add-course", icon: <img src={assets.add_icon} alt="Add Course" /> },
    { name: "My Courses", path: "/educator/my-courses", icon: <img src={assets.my_course_icon} alt="My Courses" /> },
    { name: "Students Enrolled", path: "/educator/student-enrolled", icon: <img src={assets.person_tick_icon} alt="Students Enrolled" /> },
  ];
  const { isEducator } = useContext(AppContext);
  return  isEducator &&<div  className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
    

  </div>;
};

export default Sidebar;

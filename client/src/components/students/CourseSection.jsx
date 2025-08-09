import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard"; 

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  return <div className="py-16 md:px-40 px-8">
<h2 className='text-3xl font-medium text-gray-800'> Learn From The Best </h2>
<p className='text -sm md:text-base text-gray-500 mt-3'> Discover Our top-notch courses and elevate your skills to new heights. From Coding Bootcamps to Data Science programs, we have something for everyone. </p>

<div className="grid gap-4 px-4 md:px-0 md:my-16 my-10 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"> {allCourses.slice(0, 4).map((course,index) => (
  <CourseCard key={index} course={course} />
))} </div>
<Link to={"/course-list"} onClick={() => scrollTo(0, 0)} className="text-gray-500 border border-gray-500/30 py-3 rounded mt-8 block w-60 mx-auto text-center">Browse All Courses</Link>
  </div>;
};

export default CourseSection;

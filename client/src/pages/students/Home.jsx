import React from "react";
import Hero from "../../components/students/Hero";
import Companies from "../../components/students/Companies";
import CourseSection from "../../components/students/CourseSection";
import TestimonalsSection from "../../components/students/TestimonalsSection";
const Home = () => {
  return <div className='flex flex-col items-center space-y-7 text-center'><Hero />
  <Companies />
  <CourseSection />
  <TestimonalsSection />
  </div>;
};

export default Home;

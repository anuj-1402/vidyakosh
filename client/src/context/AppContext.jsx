import { createContext } from "react";
import { dummyCourses, dummyDashboardData } from "../assets/assets";
import { useState,useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const currency=import.meta.env.VITE_CURRENCY
  const navigate=useNavigate()
  const [allCourses,setAllCourses]=useState([])
  const [isEducator,setIsEducator]=useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  
  //FETCH ALL COURSES 
  const fetchAllCourses= async () => {
    setAllCourses(dummyCourses)
  }
  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };
  // function to calculate average rating of course
  const calculateRating = (course) => {
   if(course.courseRatings.length===0) return 0;
   let totalRating = 0;
   course.courseRatings.forEach((rating) => {
     totalRating += rating.rating;
   });
   return totalRating / course.courseRatings.length;
  };
  //clculate course chapter time 
  const calculateChapterTime=(chapter)=>{
    let time=0;
    chapter.chapterContent.map((lecture)=>{
      time+=lecture.lectureDuration
    })
    return humanizeDuration(time*60*1000,{units:["h","m"]})
  }
  //calculate course duration 
  const calculateCourseDuration=(course)=>{
    let time=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
    return humanizeDuration(time*60*1000,{units:["h","m"]})
  }
  const calculateNoofLectures=(course)=>{
    let totalLectures=0;
    course.courseContent.forEach(chapter=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLectures+=chapter.chapterContent.length;
      }
    })
    return totalLectures;
  }
  useEffect(() => {
    fetchAllCourses()
    fetchDashboardData();
  }, [])
  const value ={
    currency,
    allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateNoofLectures,
    dashboardData,enrolledCourses:allCourses
  }
  return(<AppContext.Provider value={value}>{props.children}</AppContext.Provider>)
};

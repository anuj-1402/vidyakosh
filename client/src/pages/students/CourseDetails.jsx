import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
const CourseDetails = () => {
  const {id} = useParams();
  const[courseData,setCourseData] = useState(null);
  const {allCourses,calculateRating} = useContext(AppContext);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  };
  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);

   return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left min-h-[500px] bg-transparent">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70 to-transparent"></div>
        {/*left column*/}
        <div className="max-w-xl z-10 text-gray-500" >
          <h1 className="text-[26px] leading-[36px] md:text-[36px] md:leading-[44px] font-semibold text-gray-800">{courseData.courseTitle}</h1>
          <p className="pt-4 md:text-base text-sm" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) + '...' }}></p>
      {/*review and  ratings */}
      <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p><div className="flex">
              {[...Array(5)].map((_,i)=>(<img className="w-3.5 h-3.5" key={i} src={i<Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star"  />))}
            </div>
            <p className="text-blue-600">{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'Ratings' : 'Rating'}</p>
            <p>{courseData.enrolledStudents.length} Enrolled</p>
            </div>
          <p className="text-sm"> course by <span className="text-blue-600 underline "> Manual User</span></p>

      </div>
      {/*right column*/}
      <div >
      </div>
    </div>
    </>
  ) : <Loading />;
};

export default CourseDetails;

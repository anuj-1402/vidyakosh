import React from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { useRef ,useState,useEffect} from "react";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails,setLectureDetails]=useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title=prompt("Enter Chapter Name");
      if(title) {
       const newChapter = {
         chapterId: uniqid(),
         chapterTitle: title,
         chapterContent: [],
         collapsed: false,
         chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1
       };
       setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    }
    else if (action === 'toggle') {
     setChapters(chapters.map((chapter) =>
       chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
     ));
    }
  };

  const handleLecture=(action,chapterId,lectureIndex)=>{
    if(action==='add'){
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }
    else if (action === 'remove') {
      setChapters(chapters.map((chapter) => {
        if(chapter.chapterId===chapterId){
          chapter.chapterContent.splice(lectureIndex,1);
        }
        return chapter;
      }));
    }
  }
  const addLecture = () => {
    setChapters(chapters.map((chapter) => {
      if (chapter.chapterId === currentChapterId) {
        const newLecture = {
          ...lectureDetails,
          lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
          lectureId: uniqid()
        };
        chapter.chapterContent.push(newLecture);
      }
      return chapter;
    }));
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    //initiate Quill editor only once 
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 pb-4 pt-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <p>Course Title </p>
          <input onChange={e=>setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 " required></input>
        </div>
        <div className="mb-4">
          <p> Course Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-8 mb-4">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input onChange={e=>setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder="Type here" className="outline-none py-2 px-3 rounded border border-gray-500 w-28" required></input>
          </div>
          <div className="flex items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
              <img src={assets.file_upload_icon} alt="Upload Thumbnail" className="p-3 bg-blue-500 rounded"/>
              <input type="file" id="thumbnailImage" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
              {image && <img className="max-h-10" src={URL.createObjectURL(image)} alt="Course Thumbnail" />}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4 mb-6">
          <p>Discount %</p>
          <input onChange={e=>setDiscount(e.target.value)} value={discount} type="number" placeholder="0" className="outline-none py-2 px-3 rounded border border-gray-500 w-28" required></input>
        </div>
        {/*Adding chapters and lectures*/ }
        <div>
          {chapters.map((chapter,chapterIndex)=>(
            <div key={chapterIndex} className="bg-white border rounded-lg mb-4">
          
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <img className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "rotate-90"}`} src={assets.dropdown_icon} width={14} onClick={() => handleChapter('toggle', chapter.chapterId)} alt=""/>
                <span className="font-semibold">{chapterIndex + 1} {chapter.chapterTitle}</span>
              </div>
              <span className="text-gray-500">{chapter.chapterContent.length} Lectures</span>
              <img className="cursor-pointer" src={assets.cross_icon} onClick={() => handleChapter('remove', chapter.chapterId)} alt="Delete Chapter"/>
            </div>
            {!chapter.collapsed && (
              <div className="p-4">
                {chapter.chapterContent.map((lecture,lectureIndex)=>( 
                  <div key={lectureIndex} className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1">{lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target="_blank" className="text-blue-500">Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>
                    <img src={assets.cross_icon} alt="Delete Lecture" className="cursor-pointer w-4 h-4 ml-2" onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} />
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                  onClick={() => handleLecture('add', chapter.chapterId)}
                >
                  + New Video
                </button>
                
                {/* Inline form when popup is true for this chapter */}
                {showPopup && currentChapterId === chapter.chapterId && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-2">
                    <h3 className="font-semibold mb-3">Add New Lecture</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm mb-1">Lecture Title</p>
                        <input 
                          type="text" 
                          className="w-full border rounded py-1 px-2 text-sm" 
                          value={lectureDetails.lectureTitle} 
                          onChange={(e)=>setLectureDetails({...lectureDetails,lectureTitle:e.target.value})} 
                        />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Duration (mins)</p>
                        <input 
                          type="text" 
                          className="w-full border rounded py-1 px-2 text-sm" 
                          value={lectureDetails.lectureDuration} 
                          onChange={(e)=>setLectureDetails({...lectureDetails,lectureDuration:e.target.value})} 
                        />
                      </div>
                      <div>
                        <p className="text-sm mb-1">Lecture URL</p>
                        <input 
                          type="text" 
                          className="w-full border rounded py-1 px-2 text-sm" 
                          value={lectureDetails.lectureUrl} 
                          onChange={(e)=>setLectureDetails({...lectureDetails,lectureUrl:e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox" 
                            checked={lectureDetails.isPreviewFree} 
                            onChange={(e)=>setLectureDetails({...lectureDetails,isPreviewFree:e.target.checked})} 
                          />
                          <span>Is Preview Free?</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={addLecture}>Add</button>
                        <button type="button" className="border px-3 py-1 rounded text-sm" onClick={() => setShowPopup(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
          ))}
          <div className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer" onClick={()=>handleChapter('add')}>
            + Add Chapter
          </div>
        </div>
        <button type="submit" className="bg-black text-white w-max py-2.5 px-8 rounded my-4"> ADD</button>
      </form>
    </div>
  );
}

export default AddCourse;

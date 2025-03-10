import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaListUl,
  FaListOl,
  FaImage,
  FaPlayCircle,
  FaEdit,
  FaTrash,
  FaGripLines,
} from "react-icons/fa";

import instructor1 from "../assets/instructor1.jpg";
import instructor2 from "../assets/instructor2.jpg";
import { Sidebar } from "./Sidebar";
import { TopNavigation } from "./TopNavigation";

interface Instructor {
  id: string;
  name: string;
  role: string;
  img: string;
}

interface Lecture {
  name: string;
}

const Header: React.FC = () => {
  return (
    <div className="m-5">
      <TopNavigation heading="Create New Course" />
    </div>
  );
};

export const CreateCourse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSectionName, setNewSectionName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailName, setThumbnailName] = useState<string>("");
  const [lecture, setLecture] = useState<File | null>(null);
  const [lectureName, setLectureName] = useState<string>("");
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [lecturePreview, setLecturePreview] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Basic information
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [subtitleLanguage, setSubtitleLanguage] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [congratsMessage, setCongratsMessage] = useState<string>("");

  const [allInstructors, setAllInstructors] = useState<Instructor[]>([
    {
      id: "instructor1",
      name: "John Doe",
      role: "UI/UX Designer",
      img: instructor1,
    },
    {
      id: "instructor2",
      name: "Jane Smith",
      role: "Frontend Developer",
      img: instructor2,
    },
  ]);

  const [selectedInstructors, setSelectedInstructors] = useState<Instructor[]>([]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddInstructor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const instructorId = event.target.value;
    if (!instructorId) return;

    const instructor = allInstructors.find((inst) => inst.id === instructorId);
    if (
      instructor &&
      !selectedInstructors.some((inst) => inst.id === instructorId)
    ) {
      setSelectedInstructors([...selectedInstructors, instructor]);
    }
  };

  const handleRemoveInstructor = (id: string) => {
    setSelectedInstructors(
      selectedInstructors.filter((inst) => inst.id !== id)
    );
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailName(file.name);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleLectureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLecture(file);
      setLectureName(file.name);
      setLecturePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
    setThumbnailName("");
    setThumbnailPreview("");
  };

  const handleDeleteLecture = () => {
    setLecture(null);
    setLectureName("");
    setLecturePreview("");
  };

  const handleSaveAndNext = () => {
    if (!thumbnail) {
      setErrorMessage("Please upload course thumbnail.");
      setUploadMessage("");
      return;
    }

    setUploadMessage("Files uploaded successfully!");
    setErrorMessage("");
    handleTabClick("curriculum");
  };

  const submitCourse = async () => {
    try {
      if (!title || !subtitle || !category || !subCategory || !topic || 
          !language || !level || !description || 
          !welcomeMessage || !congratsMessage) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }
  
      if (!thumbnail || !(thumbnail instanceof File)) {
        console.error("Thumbnail is not a valid file:", thumbnail);
        setErrorMessage("Invalid thumbnail file.");
        return;
      }
  
      if (!lecture || !(lecture instanceof File)) {
        console.error("Lecture is not a valid file:", lecture);
        setErrorMessage("Invalid lecture file.");
        return;
      }
  
      if (selectedInstructors.length === 0 || !selectedInstructors[0]?.id) {
        setErrorMessage("Please select at least one instructor.");
        return;
      }
  
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("lecture", lecture);
  
      const courseData = {
        title,
        subtitle,
        category,
        subCategory,
        topic,
        language,
        subtitleLanguage: subtitleLanguage || "",
        level,
        description,
        welcomeMessage,
        congratulationsMessage: congratsMessage,
        instructor: selectedInstructors[0].id,
        createdAt: new Date().toISOString(),
      };
  
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      // Debugging: Log FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      setUploadMessage("Submitting course...");
      setErrorMessage("");
  
      // Corrected Axios request
      const response = await axios.post(
        "http://localhost:3000/api/courses",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("Course submitted successfully:", response.data);
      setUploadMessage("Course submitted successfully!");
  
      setTimeout(() => {
        navigate("/ins-dashboard/my-courses");
      }, 2000);
    } catch (error) {
      console.error("Error submitting course:", error);
      setErrorMessage("Failed to submit course. Please try again.");
      setUploadMessage("");
    }
  };
  
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#f4f4f9]">
        <Header />
        <div className="p-4 md:p-5">
          <div className="flex flex-wrap mb-5">
            {["basic", "advance", "curriculum", "publish"].map((tab) => (
              <div
                key={tab}
                className={`p-2 px-5 rounded-md mr-2 mb-1 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#ffbf00] text-black font-bold"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace(/([A-Z])/g, " $1")}
              </div>
            ))}
          </div>
          <div className="bg-white p-5 rounded-md">
            {activeTab === "basic" && (
              <div>
                <h2 className="text-xl font-bold mb-5">Basic Information</h2>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-base font-semibold">Basic Information</h2>
                </div>
                <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-gray-700">Title</label>
                    <input
                      type="text"
                      placeholder="Course title"
                      className="w-full border p-1 rounded text-gray-700"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700">Subtitle</label>
                    <input
                      type="text"
                      placeholder="Course subtitle"
                      className="w-full border p-1 rounded text-gray-700"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Category
                    </label>
                    <select 
                      className="w-full border p-1 rounded text-gray-700"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="development">Development</option>
                      <option value="business">Business</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Sub-category
                    </label>
                    <select 
                      className="w-full border p-1 rounded text-gray-700"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="data">Data Science</option>
                      <option value="cloud">Cloud Computing</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700">Course Topic</label>
                    <input
                      type="text"
                      placeholder="Main course topic"
                      className="w-full border p-1 rounded text-gray-700"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Language
                    </label>
                    <select 
                      className="w-full border p-1 rounded text-gray-700"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Subtitle Language (Optional)
                    </label>
                    <select 
                      className="w-full border p-1 rounded text-gray-700"
                      value={subtitleLanguage}
                      onChange={(e) => setSubtitleLanguage(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Course Level</label>
                    <select 
                      className="w-full border p-1 rounded text-gray-700"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="all">All Levels</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-between mt-2">
                    <button
                      type="button"
                      className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-gray-300 text-black border-none md:w-[120px]"
                      onClick={() => navigate("/content-dashboard")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-[#ffbf00] text-black border-none md:w-[120px]"
                      onClick={() => handleTabClick("advance")}
                    >
                      Save & Next
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "advance" && (
              <div>
                <h2 className="text-xl font-bold mb-5">Advance Information</h2>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-base font-semibold">
                    Advance Information
                  </h2>
                </div>
                <div className="flex flex-col mb-5 md:flex-row md:justify-between">
                  <div className="w-full flex flex-col mb-3 md:w-[48%]">
                    <h3 className="text-sm font-bold mb-2 text-center">
                      Course Thumbnail
                    </h3>
                    <div className="flex flex-col items-center text-center border-2 border-dashed border-gray-400 p-5 rounded-md bg-gray-50 flex-grow w-full md:flex-row md:items-center md:text-left">
                      <div className="flex-0 flex justify-center items-center">
                        <FaImage className="text-5xl text-gray-400" />
                      </div>
                      <div className="flex-1 pl-5">
                        <p className="text-xs text-gray-600 mb-2">
                          Upload your course thumbnail here. Important
                          guidelines: 1200x800 pixels or 12:8 Ratio. Supported
                          formats: .jpg, .jpeg, .png
                        </p>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="bg-[#ffe0b2] text-gray-800 border-none p-2 px-4 rounded-md cursor-pointer"
                        >
                          {thumbnailName ? "Change Image" : "Upload Image"}
                        </label>
                        {thumbnailName && (
                          <p className="mt-2 text-gray-700">
                            Uploaded: {thumbnailName}
                          </p>
                        )}
                        {thumbnailPreview && (
                          <div className="mt-2">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail Preview"
                              className="w-32 h-20 object-cover cursor-pointer"
                              onClick={() => {
                                document.getElementById("thumbnail-upload")?.click();
                              }}
                            />
                            <button
                              onClick={handleDeleteThumbnail}
                              className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col mb-3 md:w-[48%]">
                    <h3 className="text-sm font-bold mb-2 text-center">
                      Course Lecture
                    </h3>
                    <div className="flex flex-col items-center text-center border-2 border-dashed border-gray-400 p-5 rounded-md bg-gray-50 flex-grow w-full md:flex-row md:items-center md:text-left">
                      <div className="flex-0 flex justify-center items-center">
                        <FaPlayCircle className="text-5xl text-gray-400" />
                      </div>
                      <div className="flex-1 pl-5">
                        <p className="text-xs text-gray-600 mb-2">
                          Upload your main course lecture. This is required for course submission.
                        </p>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleLectureUpload}
                          className="hidden"
                          id="lecture-upload"
                        />
                        <label
                          htmlFor="lecture-upload"
                          className="bg-[#ffe0b2] text-gray-800 border-none p-2 px-4 rounded-md cursor-pointer"
                        >
                          {lectureName ? "Change Video" : "Upload Video"}
                        </label>
                        {lectureName && (
                          <p className="mt-2 text-gray-700">
                            Uploaded: {lectureName}
                          </p>
                        )}
                        {lecturePreview && (
                          <div className="mt-2">
                            <video
                              controls
                              className="w-full h-20 cursor-pointer"
                              onClick={() => {
                                document.getElementById("lecture-upload")?.click();
                              }}
                            >
                              <source src={lecturePreview} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              onClick={handleDeleteLecture}
                              className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-2">
                    Course Descriptions
                  </h3>
                  <textarea
                    placeholder="Enter your course descriptions"
                    className="w-full p-2 border border-gray-400 rounded-md min-h-[120px] mb-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="flex items-center flex-wrap">
                    <FaBold className="mr-2 text-base cursor-pointer mb-1" />
                    <FaItalic className="mr-2 text-base cursor-pointer mb-1" />
                    <FaUnderline className="mr-2 text-base cursor-pointer mb-1" />
                    <FaLink className="mr-2 text-base cursor-pointer mb-1" />
                    <FaListUl className="mr-2 text-base cursor-pointer mb-1" />
                    <FaListOl className="mr-2 text-base cursor-pointer mb-1" />
                  </div>
                </div>
                <div className="flex flex-col items-center mt-5 md:flex-row md:justify-between">
                  <button
                    className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-gray-300 text-black border-none md:w-[120px]"
                    onClick={() => handleTabClick("basic")}
                  >
                    Previous
                  </button>
                  <button
                    className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-[#ffbf00] text-black border-none md:w-[120px]"
                    onClick={handleSaveAndNext}
                  >
                    Save & Next
                  </button>
                </div>
                {uploadMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                    {uploadMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="mt-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded">
                    {errorMessage}
                  </div>
                )}
              </div>
            )}
            {activeTab === "curriculum" && (
              <div>
                <div className="flex justify-between items-center p-2 mb-4">
                  <h2 className="text-xl font-bold">Course Curriculum</h2>
                </div>

                {/* Display Thumbnail and Lecture in Curriculum Tab */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Course Thumbnail</h3>
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-32 h-20 object-cover"
                    />
                  ) : (
                    <p>No thumbnail uploaded.</p>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Course Lecture</h3>
                  {lecturePreview ? (
                    <video controls className="w-full h-20">
                      <source src={lecturePreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>No lecture uploaded.</p>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-gray-300 text-black border-none md:w-[120px]"
                    onClick={() => handleTabClick("advance")}
                  >
                    Previous
                  </button>
                  <button
                    className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-[#ffbf00] text-black border-none md:w-[120px]"
                    onClick={() => handleTabClick("publish")}
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            )}
            {activeTab === "publish" && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Publish Course</h2>
                </div>
                {/* Message Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium">Message</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Welcome Message
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter course starting message here..."
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Congratulations Message
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your course completed message here..."
                        value={congratsMessage}
                        onChange={(e) => setCongratsMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Instructors Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Add Instructor</h3>
                  {/* Instructor Dropdown */}
                  <select
                    className="w-full p-2 border rounded-md mb-4"
                    onChange={handleAddInstructor}
                    value=""
                  >
                    <option value="">Select Instructor</option>
                    {allInstructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} - {inst.role}
                      </option>
                    ))}
                  </select>

                  {/* Instructor List */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {selectedInstructors.map((inst) => (
                      <div
                        key={inst.id}
                        className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-64"
                      >
                        <img
                          src={inst.img}
                          alt={inst.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-2">
                          <p className="font-medium">{inst.name}</p>
                          <p className="text-sm text-gray-500">{inst.role}</p>
                        </div>
                        <button
                          className="ml-auto text-gray-500 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                          onClick={() => handleRemoveInstructor(inst.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-md w-full md:w-auto"
                    onClick={() => handleTabClick("curriculum")}
                  >
                    Prev Step
                  </button>
                  <button 
                    onClick={submitCourse}
                    className="px-4 py-2 bg-yellow-400 rounded-md w-full md:w-auto">
                    Submit For Review
                  </button>
                </div>
                {errorMessage && (
                  <div className="mt-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded">
                    {errorMessage}
                  </div>
                )}
                {uploadMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                    {uploadMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
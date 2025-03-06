import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaListUl,
  FaListOl,
  FaImage,
  FaPlayCircle,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaGripLines,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";

import profilePic from "../assets/image.png";
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

interface FileContent {
  name: string;
  type: string;
  url: string;
}

interface Section {
  name: string;
  lectures: Lecture[];
  files: FileContent[];
}

interface CurrentLecture {
  section: number;
  lecture: number;
}

const Header: React.FC = () => {
  return (
    <div className="m-5">
      <TopNavigation heading="Create New Course" />
    </div>
  );
};

<Sidebar/>

export const CreateCourse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [sections, setSections] = useState<Section[]>([
    { name: "", lectures: [], files: [] },
  ]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [currentLecture, setCurrentLecture] = useState<CurrentLecture>({
    section: 0,
    lecture: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSectionName, setNewSectionName] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [thumbnailName, setThumbnailName] = useState<string>("");
  const [trailerName, setTrailerName] = useState<string>("");
  const [trailer, setTrailer] = useState<File | string>("");
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [trailerPreview, setTrailerPreview] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEditingThumbnail, setIsEditingThumbnail] = useState<boolean>(false);
  const [isEditingTrailer, setIsEditingTrailer] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [congratsMessage, setCongratsMessage] = useState<string>("");
  const [editingLecture, setEditingLecture] = useState<CurrentLecture | null>(null);
  const navigate = useNavigate();

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

  const addLecture = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures.push({ name: "" });
    setSections(newSections);
    setCurrentLecture({
      section: sectionIndex,
      lecture: newSections[sectionIndex].lectures.length - 1,
    });
  };

  const updateLecture = (sectionIndex: number, lectureIndex: number, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures[lectureIndex].name = value;
    setSections(newSections);
  };

  const handleContentsClick = (e: React.MouseEvent, sectionIndex: number, lectureIndex: number) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setCurrentLecture({ section: sectionIndex, lecture: lectureIndex });
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const addContentOption = (option: string, sectionIndex?: number) => {
    if (option === "Video" || option === "Attach File") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = option === "Video" ? "video/*" : ".pdf";
      input.onchange = (e) => {
        if (sectionIndex !== undefined) {
          handleFileUpload(e as unknown as React.ChangeEvent<HTMLInputElement>, sectionIndex, option);
        }
        handleMenuClose();
      };
      input.click();
    }
    handleMenuClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, sectionIndex: number, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSections = [...sections];
      newSections[sectionIndex].files.push({
        name: file.name,
        type: type,
        url: URL.createObjectURL(file),
      });
      setSections(newSections);
    }
  };

  const addSection = () => {
    setSections([...sections, { name: "", lectures: [], files: [] }]);
  };

  const handleSaveEdit = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].name = newSectionName;
    setSections(newSections);
    setEditingIndex(null);
  };

  const handleEdit = (sectionIndex: number) => {
    setEditingIndex(sectionIndex);
    setNewSectionName(sections[sectionIndex].name);
  };

  const handleDelete = (sectionIndex: number) => {
    const newSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(newSections);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailName(file.name);
      setThumbnailPreview(URL.createObjectURL(file));
      setIsEditingThumbnail(false);
    }
  };

  const handleTrailerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTrailer(file);
      setTrailerName(file.name);
      setTrailerPreview(URL.createObjectURL(file));
      setIsEditingTrailer(false);
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail("");
    setThumbnailName("");
    setThumbnailPreview("");
  };

  const handleDeleteTrailer = () => {
    setTrailer("");
    setTrailerName("");
    setTrailerPreview("");
  };

  const handleSaveAndNext = () => {
    if (!thumbnail || !trailer) {
      setErrorMessage("Please upload both the course thumbnail and trailer.");
      setUploadMessage("");
      return;
    }

    setUploadMessage("Files uploaded successfully!");
    setErrorMessage("");
    handleTabClick("curriculum");
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
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      Save
                    </button>
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      Save & Preview
                    </button>
                  </div>
                </div>
                <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-gray-700">Title</label>
                    <input
                      type="text"
                      placeholder="Course title"
                      className="w-full border p-1 rounded text-gray-700"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700">Subtitle</label>
                    <input
                      type="text"
                      placeholder="Course subtitle"
                      className="w-full border p-1 rounded text-gray-700"
                      />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Category
                    </label>
                    <select className="w-full border p-1 rounded text-gray-700">
                      <option>Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Sub-category
                    </label>
                    <select className="w-full border p-1 rounded text-gray-700">
                      <option>Select...</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700">Course Topic</label>
                    <input
                      type="text"
                      placeholder="Main course topic"
                      className="w-full border p-1 rounded text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Course Language
                    </label>
                    <select className="w-full border p-1 rounded text-gray-700">
                      <option>Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Subtitle Language (Optional)
                    </label>
                    <select className="w-full border p-1 rounded text-gray-700">
                      <option>Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Course Level</label>
                    <select className="w-full border p-1 rounded text-gray-700">
                      <option>Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Duration</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Duration"
                        className="w-2/3 border p-1 rounded text-gray-700"
                      />
                      <select className="w-1/3 border p-1 rounded text-gray-700">
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-between mt-2">
                    <button
                      className="w-full p-2 text-sm rounded-md cursor-pointer mb-2 bg-gray-300 text-black border-none md:w-[120px]"
                      onClick={() => navigate("/content-dashboard")}
                    >
                      Cancel
                    </button>
                    <button
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
                  <div className="flex gap-3">
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      Save
                    </button>
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      Save & Preview
                    </button>
                  </div>
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
                                setIsEditingThumbnail(true);
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
                      Course Trailer
                    </h3>
                    <div className="flex flex-col items-center text-center border-2 border-dashed border-gray-400 p-5 rounded-md bg-gray-50 flex-grow w-full md:flex-row md:items-center md:text-left">
                      <div className="flex-0 flex justify-center items-center">
                        <FaPlayCircle className="text-5xl text-gray-400" />
                      </div>
                      <div className="flex-1 pl-5">
                        <p className="text-xs text-gray-600 mb-2">
                          Students who watch a well-made promo video are 5x more
                          likely to enroll in your course. We've seen that
                          statistic go up to 10X for exceptionally awesome
                          videos.
                        </p>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleTrailerUpload}
                          className="hidden"
                          id="trailer-upload"
                        />
                        <label
                          htmlFor="trailer-upload"
                          className="bg-[#ffe0b2] text-gray-800 border-none p-2 px-4 rounded-md cursor-pointer"
                        >
                          {trailerName ? "Change Video" : "Upload Video"}
                        </label>
                        {trailerName && (
                          <p className="mt-2 text-gray-700">
                            Uploaded: {trailerName}
                          </p>
                        )}
                        {trailerPreview && (
                          <div className="mt-2">
                            <video
                              controls
                              className="w-full h-20 cursor-pointer"
                              onClick={() => {
                                setIsEditingTrailer(true);
                                document.getElementById("trailer-upload")?.click();
                              }}
                            >
                              <source src={trailerPreview} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              onClick={handleDeleteTrailer}
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
                    onClick={() => handleTabClick("curriculum")}
                  >
                    Save & Next
                  </button>
                </div>
                {uploadMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                    {"Successfully uploaded"}
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
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      {" "}
                      Save
                    </button>
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      {" "}
                      Save & Preview
                    </button>
                  </div>
                </div>

                {/* Display Thumbnail and Trailer in Curriculum Tab */}
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
                  <h3 className="text-lg font-bold">Course Trailer</h3>
                  {trailerPreview ? (
                    <video controls className="w-full h-20">
                      <source src={trailerPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>No trailer uploaded.</p>
                  )}
                </div>

                {sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="mb-4 border border-gray-200 rounded-md"
                  >
                    <div className="p-3">
                      <div className="flex justify-between items-center border border-blue-300 p-3 rounded mb-2">
                        <div className="flex items-center">
                          <FaGripLines className="text-xs mr-1 cursor-grab text-gray-500" />
                          {editingIndex === sectionIndex ? (
                            <input
                              type="text"
                              value={newSectionName}
                              onChange={(e) =>
                                setNewSectionName(e.target.value)
                              }
                              className="text-sm font-medium border-b border-gray-300 focus:outline-none"
                            />
                          ) : (
                            <h3 className="text-sm font-medium">
                              {`Section ${sectionIndex + 1}: ${
                                section.name || "Section Name"
                              }`}
                            </h3>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => setDropdownOpen(sectionIndex)}
                            className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-2  hover:bg-red-200"
                          >
                            +
                          </button>
                          {dropdownOpen === sectionIndex && (
                            <div
                              className="absolute bg-white border border-gray-200 rounded shadow-md p-2 mt-2"
                              ref={dropdownRef}
                            >
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() =>
                                  addContentOption("Video", sectionIndex)
                                }
                              >
                                Upload Video
                              </div>
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() =>
                                  addContentOption("Attach File", sectionIndex)
                                }
                              >
                                Attach File
                              </div>
                            </div>
                          )}
                          {editingIndex === sectionIndex ? (
                            <button
                              className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-2  hover:bg-red-200"
                              onClick={() => handleSaveEdit(sectionIndex)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-1  hover:bg-red-200"
                              onClick={() => handleEdit(sectionIndex)}
                            >
                              <FaEdit className="text-xs" />
                            </button>
                          )}
                          <button
                            className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-1  hover:bg-red-200"
                            onClick={() => handleDelete(sectionIndex)}
                          >
                            <FaTrash className="text-xs" />
                          </button>
                          <button className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-1  hover:bg-red-200">
                            <FaEllipsisV className="text-xs" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => addLecture(sectionIndex)}
                        className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm  hover:bg-red-200"
                      >
                        Add Lecture
                      </button>
                      <div className="mt-2">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div
                            key={lectureIndex}
                            className="flex items-center justify-between border-b border-gray-200 py-2"
                          >
                            <div className="flex items-center w-full">
                              <FaGripLines className="text-xs mr-2 cursor-grab text-gray-500" />
                              <input
                                type="text"
                                value={lecture.name}
                                onChange={(e) =>
                                  updateLecture(
                                    sectionIndex,
                                    lectureIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="Lecture Name"
                                className="w-full p-1 text-sm border-none focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center">
                              <button
                                className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-1  hover:bg-red-200"
                                onClick={() => {
                                  setEditingLecture({
                                    section: sectionIndex,
                                    lecture: lectureIndex,
                                  });
                                }}
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                className="px-3 py-1 mt-2 bg-red-100 text-red-600 rounded text-sm mr-1  hover:bg-red-200"
                                onClick={() => {
                                  const newSections = [...sections];
                                  newSections[sectionIndex].lectures.splice(
                                    lectureIndex,
                                    1
                                  );
                                  setSections(newSections);
                                }}
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {section.files.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="flex items-center justify-between border-b border-gray-200 py-2"
                          >
                            <span className="text-sm">{file.name}</span>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 text-xs"
                            >
                              View
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addSection}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded text-sm  hover:bg-red-200"
                >
                  Add Section
                </button>

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

                {menuOpen && (
                  <div
                    className="absolute bg-white border border-gray-200 rounded shadow-md p-1 z-10"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                  >
                    {[
                      "Video",
                      "Attach File",
                      "Captions",
                      "Description",
                      "Lecture Notes",
                    ].map((option, idx) => (
                      <div
                        key={idx}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => addContentOption(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "publish" && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Publish Course</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      {" "}
                      Save
                    </button>
                    <button className="px-4 py-1 bg-red-100 text-red-600 rounded-md shadow-sm hover:bg-red-200">
                      Save & Preview
                    </button>
                  </div>
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
                  <button className="px-4 py-2 bg-yellow-400 rounded-md w-full md:w-auto">
                    Submit For Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

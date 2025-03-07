import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import userImage from "../assets/user1.png";
import { ArrowLeft } from "lucide-react"; 

interface YouTubeMessage {
  event: string;
  info: {
    duration: number;
    currentTime: number;
  };
}

export default function CoursePage() {
  const videoUrl = "https://www.youtube.com/embed/8sXRyHI3bLw?enablejsapi=1";
  const iframeRef = useRef<HTMLIFrameElement | null>(null); 
  const [progress, setProgress] = useState<number>(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      getVideoProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getVideoProgress = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: 1 }),
        "*"
      );
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        try {
          const data: YouTubeMessage = JSON.parse(event.data); 
          if (data.info && data.info.duration && data.info.currentTime) {
            const percentage =
              (data.info.currentTime / data.info.duration) * 100;
            setProgress(Math.round(percentage));
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="w-full md:w-56 bg-[#e7e7e9] p-6 space-y-5 h-full overflow-y-auto relative">
        <div>
          <h2 className="text-[#5338FE] font-semibold text-sm">Statistics</h2>
          <div className="flex items-center mt-1">
            <div className="relative w-full bg-gray-300 h-2 rounded-full">
              <div
                className="bg-[#4E4E80] h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-black ml-2">{progress}%</span>
          </div>
        </div>

        <nav className="text-xs space-y-4">
          <div>
            <h2 className="text-[#5338FE] font-semibold">Intro</h2>
            <p className="flex items-center gap-2 text-black mt-1">
              <Play className="w-4 h-4 text-[#2AC5B3]" /> Web Development
            </p>
          </div>

          <div>
            <h2 className="text-[#5338FE] font-semibold">Modules</h2>
            {[
              "Introduction",
              "Front-End Development",
              "Back-End Development",
              "Overview",
            ].map((module, index) => (
              <p key={index} className="flex items-center gap-2 text-black mt-1">
                <span className="font-semibold text-[#2AC5B3]">{index + 1}.</span>{" "}
                {module}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-[#5338FE] font-semibold">Assignment</h2>
            <p className="text-black mt-1 ml-6">
              <a
                href="https://www.testdome.com/tests/web-developer-online-test/16" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Assignment 1
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[#5338FE] font-semibold">Assignment</h2>
            <p className="text-black mt-1 ml-6">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeX2qt71Ijn_KnC0Zh-hWoSTXFUFVhIbhtEbWxaheCwjHEPEw/viewform?usp=send_form" // Replace with actual document URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Quiz 1
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-[#5338FE] font-semibold">Certification</h2>
          </div>
        </nav>

        <button
          onClick={goToDashboard}
          className="text-white bg-blue-500 p-2 rounded-full shadow-lg absolute bottom-4 left-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-white" /> Dashboard
        </button>
      </aside>

      <div className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-gray-500 text-lg">Course</h2>
            <h1 className="text-2xl font-bold">Web Development</h1>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <img
              src={userImage}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-xs font-semibold">Hi, Dimas</p>
              <p className="text-[12px] text-gray-500">Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="w-full max-w-4xl mx-auto">
            <iframe
              ref={iframeRef}
              src={videoUrl}
              title="Course Video"
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
              className="w-full aspect-video rounded-lg border border-blue-300"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
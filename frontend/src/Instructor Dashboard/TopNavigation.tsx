import { useState, useEffect } from "react";
import ProfileImage from "../assets/user1.png";

export const TopNavigation = ({ heading }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      document.querySelectorAll(".highlight").forEach(el => {
        (el as HTMLElement).outerHTML = (el as HTMLElement).textContent || "";
      });
      return;
    }

    const walkDOM = (node: Node) => {
      if (node.nodeType === 3) { // Text node
        const regex = new RegExp(`(${searchTerm})`, "gi");
        if (node.textContent && regex.test(node.textContent)) {
          const span = document.createElement("span");
          span.innerHTML = node.textContent.replace(
            regex,
            '<mark class="highlight bg-yellow-300">$1</mark>'
          );
          node.parentNode?.replaceChild(span, node);
        }
      } else {
        node.childNodes.forEach(walkDOM);
      }
    };

    document.querySelectorAll(".highlight").forEach(el => {
      (el as HTMLElement).outerHTML = (el as HTMLElement).textContent || "";
    });
    walkDOM(document.body);
  }, [searchTerm]);

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold mr-8">{heading}</h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <img
          src={ProfileImage}
          alt="User Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
};
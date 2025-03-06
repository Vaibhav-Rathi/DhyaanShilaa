import ProfileImage from "../assets/user1.png"

export const TopNavigation = ({heading}:any) => {
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
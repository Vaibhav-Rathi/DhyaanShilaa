import React from "react";

type Course = {
  id: number;
  title: string;
  progress: number;
  status: string;
};

type MyCourseProps = {
  courses: Course[];
};

const MyCourse: React.FC<MyCourseProps> = ({ courses }) => {
  return (
    <div>
      <h1>My Courses</h1>
      <ul>
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> - {course.status} ({course.progress}% completed)
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
};

export default MyCourse;

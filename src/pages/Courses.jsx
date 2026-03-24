import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { getAllCourses } from "../services/courseService";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const data = await getAllCourses();
            setCourses(data);
        }
        fetchCourses();
    }, []);

    return (
        <div className="courses-container">
            <h2 style={{ color: '#3A2119', textAlign: 'center' ,padding: '20px', margin: '20px'
            }}>Liste des cours</h2>
            <div className="course-list">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
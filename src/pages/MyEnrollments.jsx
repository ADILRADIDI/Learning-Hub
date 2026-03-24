import React, { useEffect, useState } from "react";
import EnrollmentList from "../components/EnrollmentList";
import { getMyEnrollments } from "../services/enrollmentService";
import { getAllCourses } from "../services/courseService";
import { getCurrentUser } from "../services/authService";

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState("");
    const user = getCurrentUser();

    useEffect(() => {
        async function fetchEnrollments() {
            if (!user) {
                setError("Veuillez vous connecter pour voir vos inscriptions.");
                return;
            }

            try {
                const [enrollmentData, courseData] = await Promise.all([
                    getMyEnrollments(),
                    getAllCourses(),
                ]);

                const coursesById = new Map((courseData?.courses || []).map((c) => [c._id, c]));

                const mapped = (enrollmentData?.enrollments || []).map((item) => ({
                    ...item,
                    courseTitle: coursesById.get(item.course)?.title || item.course,
                }));

                setEnrollments(mapped);
            } catch (err) {
                setError(err?.response?.data?.error || "Erreur de chargement des inscriptions.");
            }
        }
        fetchEnrollments();
    }, [user]);

    if (error) {
        return <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>;
    }

    return <EnrollmentList enrollments={enrollments} />;
};

export default MyEnrollments;
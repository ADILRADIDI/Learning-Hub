import React, { useEffect, useState } from "react";
import EnrollmentList from "../components/EnrollmentList";
import { getMyEnrollments } from "../services/enrollmentService";

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        async function fetchEnrollments() {
            const data = await getMyEnrollments();
            setEnrollments(data);
        }
        fetchEnrollments();
    }, []);

    return <EnrollmentList enrollments={enrollments} />;
};

export default MyEnrollments;
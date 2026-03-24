import React from "react";

const EnrollmentList = ({ enrollments }) => {
    return (
        <div>
            <h2  style={{ color: '#3A2119', textAlign: 'center' ,padding: '20px', margin: '20px'}}>Mes Inscriptions</h2>
            <ul>
                {enrollments.map((enroll) => (
                    <li key={enroll._id}>
                        {enroll.courseTitle} - {enroll.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnrollmentList;
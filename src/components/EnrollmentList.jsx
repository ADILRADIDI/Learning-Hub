import React from "react";

const EnrollmentList = ({ enrollments }) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">Mes inscriptions</h2>

            {!enrollments.length && (
                <p className="text-sm text-slate-500">Aucune inscription pour le moment.</p>
            )}

            <ul className="space-y-3">
                {enrollments.map((enroll) => (
                    <li key={enroll._id} className="rounded-xl border border-slate-200 p-4">
                        <p className="font-semibold text-slate-800">{enroll.courseTitle}</p>
                        <p className="text-sm text-slate-600">Statut: {enroll.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnrollmentList;
import React from "react";

const CourseCard = ({ course, onEnroll, canEnroll }) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Niveau: {course.level || "beginner"}</span>
                <span>Durée: {course.duration || 0}h</span>
            </div>

            <button
                className="mt-4 w-full rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                onClick={onEnroll}
                disabled={!canEnroll}
            >
                {canEnroll ? "S'inscrire" : "Connectez-vous pour vous inscrire"}
            </button>
        </div>
    );
};

export default CourseCard;
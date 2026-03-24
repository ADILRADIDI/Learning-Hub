import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { createCourse, getAllCourses } from "../services/courseService";
import { enrollInCourse } from "../services/enrollmentService";
import { getCurrentUser } from "../services/authService";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        level: "beginner",
        category: "",
        duration: 0,
    });

    const user = getCurrentUser();
    const canCreateCourse = user && ["instructor", "admin"].includes(user.role);

    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            setCourses(data?.courses || []);
        } catch (err) {
            setError(err?.response?.data?.error || "Erreur lors du chargement des cours.");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        setError("");
        setMessage("");
        try {
            await enrollInCourse(courseId);
            setMessage("Inscription réussie.");
        } catch (err) {
            setError(err?.response?.data?.error || "Échec de l'inscription.");
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await createCourse({
                title: form.title,
                description: form.description,
                level: form.level,
                category: form.category,
                duration: Number(form.duration || 0),
                status: "published",
            });
            setMessage("Cours créé avec succès.");
            setForm({ title: "", description: "", level: "beginner", category: "", duration: 0 });
            await fetchCourses();
        } catch (err) {
            setError(err?.response?.data?.error || "Échec de création du cours.");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Liste des cours</h2>

            {canCreateCourse && (
                <form onSubmit={handleCreateCourse} className="grid gap-3 rounded-2xl bg-white p-5 shadow md:grid-cols-2">
                    <input
                        className="rounded-lg border border-slate-300 px-3 py-2"
                        placeholder="Titre"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <input
                        className="rounded-lg border border-slate-300 px-3 py-2"
                        placeholder="Catégorie"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <textarea
                        className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <select
                        className="rounded-lg border border-slate-300 px-3 py-2"
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <input
                        className="rounded-lg border border-slate-300 px-3 py-2"
                        type="number"
                        min="0"
                        placeholder="Durée (heures)"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 md:col-span-2" type="submit">
                        Créer le cours
                    </button>
                </form>
            )}

            {message && <p className="text-sm text-emerald-600">{message}</p>}
            {error && <p className="text-sm text-rose-600">{error}</p>}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        onEnroll={() => handleEnroll(course._id)}
                        canEnroll={Boolean(user)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Courses;
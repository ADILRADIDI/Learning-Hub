import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-cyan-500">
            {/* Hero Section */}
            <div className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Main Title */}
                    <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg sm:text-6xl">
                        Bienvenue sur Learning Hub
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-indigo-100">
                        Plateforme de gestion de cours avec API Gateway, JWT, MongoDB et microservices.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            to="/courses"
                            className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50 shadow-lg hover:shadow-xl"
                        >
                            Consulter les cours
                        </Link>
                        <Link
                            to="/login"
                            className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white/10"
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white/95 backdrop-blur-sm px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                        Fonctionnalités Principales
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Feature 1 */}
                        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 shadow-md transition-all duration-200 hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                                <span className="text-xl text-white">📚</span>
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">Consulter les cours</h3>
                            <p className="text-sm text-gray-600">Explorez notre catalogue de cours en ligne et trouvez celui qui vous intéresse.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-md transition-all duration-200 hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                                <span className="text-xl text-white">✏️</span>
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">Créer un cours</h3>
                            <p className="text-sm text-gray-600">Créez et partagez vos propres cours avec la communauté.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 shadow-md transition-all duration-200 hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600">
                                <span className="text-xl text-white">✅</span>
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">S'inscrire à un cours</h3>
                            <p className="text-sm text-gray-600">Inscrivez-vous aux cours qui vous intéressent et commencez à apprendre.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-md transition-all duration-200 hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                                <span className="text-xl text-white">📊</span>
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">Voir ses inscriptions</h3>
                            <p className="text-sm text-gray-600">Consultez vos inscriptions et suivez votre progression.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 text-center md:grid-cols-3">
                        <div>
                            <div className="text-4xl font-bold text-white">500+</div>
                            <div className="mt-2 text-indigo-100">Cours disponibles</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white">10K+</div>
                            <div className="mt-2 text-indigo-100">Étudiants inscrits</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white">95%</div>
                            <div className="mt-2 text-indigo-100">Taux de satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/95 backdrop-blur-sm px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        Prêt à commencer ?
                    </h2>
                    <p className="mb-8 text-gray-600">
                        Rejoignez Learning Hub aujourd'hui et explorez des milliers de cours.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg shadow-md"
                    >
                        Se connecter maintenant
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
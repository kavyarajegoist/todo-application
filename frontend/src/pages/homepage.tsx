import { motion } from 'framer-motion';
import { CheckCircle, Settings, Monitor, LogOut } from 'lucide-react';
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
  
    return (
        <>
            <div className="min-h-screen">
                {/* Add logout button */}
                {accessToken && (
                    <button 
                        onClick={handleLogout}
                        className="absolute top-4 right-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all bg-black"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                )}

                <section className="relative overflow-hidden bg-gradient-to-tr from-purple-600 via-pink-500 to-pink-600 flex items-center justify-center h-[500px]">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                        <motion.h1
                            className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            TaskMaster
                        </motion.h1>
                        <motion.p
                            className="text-white text-lg md:text-xl lg:text-2xl font-medium mb-10 max-w-2xl"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            A beautiful and simple todo list application to organize your tasks with delightful animations.
                        </motion.p>
                        <div className="flex gap-4 justify-center">
                            {accessToken ? (
                                <button 
                                    onClick={() => navigate('/create-todo')}
                                    className="bg-white text-purple-600 font-semibold px-10 py-4 rounded-lg shadow-lg text-xl hover:bg-purple-100 transition-all"
                                >
                                    Create Todo
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => navigate('/signin')}
                                        className="bg-white text-purple-600 font-semibold px-10 py-4 rounded-lg shadow-lg text-xl hover:bg-purple-100 transition-all"
                                    >
                                        Sign In
                                    </button>
                                    <button 
                                        onClick={() => navigate('/signup')}
                                        className="bg-transparent border border-slate-200 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-xl hover:bg-white hover:text-purple-600 transition-all"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>
                {/* Why Choose TaskMaster Section */}
                <section className="bg-gray-50 py-10 md:py-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-10 md:mb-16">Why Choose TaskMaster?</h2>
                    <div className="flex flex-col gap-8 md:gap-6 md:flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto w-full px-2 md:px-8">
                        {/* Card 1 */}
                        <motion.div
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 w-full max-w-xs min-h-[220px] flex flex-col justify-between hover:shadow-lg transition-all"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div className="flex items-center mb-6">
                                <span className="bg-purple-100 rounded-full w-full h-16 flex items-center">
                                    <CheckCircle className="text-purple-500 w-8 h-8 ml-6" />
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Simple & Intuitive</h3>
                            <p className="text-gray-500 text-lg">Easy to use interface that helps you focus on what matters - your tasks.</p>
                        </motion.div>
                        {/* Card 2 */}
                        <motion.div
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 w-full max-w-xs min-h-[220px] flex flex-col justify-between hover:shadow-lg transition-all"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <div className="flex items-center mb-6">
                                <span className="bg-pink-100 rounded-full w-full h-16 flex items-center">
                                    <Settings className="text-pink-500 w-8 h-8 ml-6" />
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Beautiful Animations</h3>
                            <p className="text-gray-500 text-lg">Delightful animations make managing your tasks a pleasant experience.</p>
                        </motion.div>
                        {/* Card 3 */}
                        <motion.div
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 w-full max-w-xs min-h-[220px] flex flex-col justify-between hover:shadow-lg transition-all"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            <div className="flex items-center mb-6">
                                <span className="bg-purple-100 rounded-full w-full h-16 flex items-center">
                                    <Monitor className="text-purple-500 w-8 h-8 ml-6" />
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Secure & Private</h3>
                            <p className="text-gray-500 text-lg">Your tasks are private and secure with our user authentication system.</p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;
import React, { useContext, useEffect, useState } from 'react';
import { fetchCourses } from '../../assets/api';
import { AuthProvider } from '../../Provider/AuthContext';
import Loader from '../Loader/Loader';
import arrow from "../../assets/animation-js/arrow.json"
import Lottie from 'lottie-react';
import { motion } from "motion/react"
import { Link } from 'react-router-dom';

const Booklist = () => {

    const [course, setCourse] = useState([])
    const { loader, setLoader } = useContext(AuthProvider);


    useEffect(() => {
        setLoader(true)
        fetchCourses()
            .then(res => {
                setCourse(res.data)
                setLoader(false)
            })
    }, [])

    const dept = course?.map(dep => dep.departments)
    const depts = dept?.map(dt => dt)

    console.log(depts)


    return (
        <div className='my-20'>
            <h1 className='text-center text-4xl font-semibold'>All Curriculum Booklist</h1>
            <div className='flex justify-center'>
                <Loader loader={loader}></Loader>
            </div>
            <div className='w-11/12 mx-auto my-10 space-y-8 rounded-lg p-4'>
                {
                    course?.map((data, sIdx) => (
                        <div className='border border-sky-300 bg-white rounded-lg p-4 shadow-2xl shadow-sky-500'>
                            <h1 className='text-2xl font-semibold my-4 p-2 text-center bg-red-400'>
                                {data.course_name} - 2022
                            </h1>
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {
                                    depts[sIdx]?.map(dept => (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.9 }}
                                            onHoverStart={() => console.log('hover started!')}
                                        >
                                            <Link to={`/book-list/${dept.name}`}>
                                                <div className='p-4 bg-white border border-gray-300 border-l-5 border-l-sky-500 rounded-xl flex justify-between'>
                                                    <div className='text-left'>
                                                        <h1 className='font-semibold'>{dept.name}</h1>
                                                        <h2 className=''>Code: {dept.code}</h2>
                                                    </div>
                                                    <div>
                                                        <Lottie
                                                            animationData={arrow}
                                                            style={{ height: 50, width: 50 }}
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.button>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Booklist;
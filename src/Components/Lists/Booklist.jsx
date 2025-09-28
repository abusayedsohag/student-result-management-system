import React, { useContext, useEffect, useState } from 'react';
import { fetchCourses } from '../../assets/api';
import { AuthProvider } from '../../Provider/AuthContext';
import Loader from '../Loader/Loader';

const Booklist = () => {

    const [course, setCourse] = useState([])
    const { loader } = useContext(AuthProvider);


    useEffect(() => {
        fetchCourses()
            .then(res => {
                setCourse(res.data)
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
                            <div className='grid grid-cols-2 gap-4'>
                                {
                                    depts[sIdx]?.map(dt => (
                                        <div className='p-4 bg-white border border-gray-300 border-l-5 border-l-sky-500 rounded-xl'>
                                            <h1>{dt.name}</h1>
                                            <h2>dept-code</h2>
                                        </div>
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
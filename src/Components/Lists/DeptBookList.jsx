import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDept } from '../../assets/api';

const DeptBookList = () => {

    const { deptname } = useParams();
    const [depts, setDepts] = useState()


    useEffect(() => {
        fetchDept(deptname)
            .then(res => setDepts(res.data))
    }, [deptname])

    return (
        <div className='w-11/12 mx-auto my-10'>
            <div>
                {
                    depts?.map((dt, sIDx) => (
                        <div key={sIDx} className=''>
                            <div>
                                <h1 className='text-2xl font-semibold text-center'>{dt.code} - {dt.name}</h1>
                                {
                                    dt?.regulation.map(dt => (
                                        <div>
                                            <h1 className='font-semibold text-center'>Probidhan: {dt.year}</h1>
                                            <div className='space-y-10' >
                                                {
                                                    dt?.semesters.map(dt => (
                                                        <div className='drop-shadow-2xl'>
                                                            <h1 className='p-2 bg-sky-300 rounded-t-lg font-semibold'>Semester - {dt.semester_name}</h1>
                                                            <div className=''>
                                                                <div className='grid grid-cols-12 gap-4 bg-green-300'>
                                                                    <h1 className='p-2'>Code</h1>
                                                                    <h1 className='p-2 col-span-11'>Subject</h1>
                                                                </div>
                                                                {
                                                                    dt.subjects.map((dt, IDx) => (
                                                                        <div className={`grid grid-cols-12  gap-4 p-2 ${IDx % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                                            }`}>
                                                                            <h1 className=''>{dt.subject_code}</h1>
                                                                            <h1 className='col-span-11'>{dt.subject_name}</h1>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
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

export default DeptBookList;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStudent } from "../../assets/api"

const Result = () => {

    const [semister, setSemister] = useState("1st");
    const [studentInfo, setStudentInfo] = useState([])
    const { roll } = useParams()

    useEffect(() => {
        fetchStudent(roll)
            .then(res => setStudentInfo(res.data))
    }, [])

    const semester = studentInfo.semesters

    const findSemi = studentInfo?.semesters?.find(data => data.semester_name === semister)
    const subjectInfo = findSemi?.subjects


    const getLetterGrade = (gp) => {
        if (gp === "F" || gp < 2) return "F";
        if (gp >= 4) return "A+";
        if (gp >= 3.75) return "A";
        if (gp >= 3.5) return "A-";
        if (gp >= 3.25) return "B+";
        if (gp >= 3) return "B";
        if (gp >= 2.75) return "B-";
        if (gp >= 2.5) return "C+";
        if (gp >= 2.25) return "C";
        if (gp >= 2) return "D";
        return "F";
    };


    const handleSubject = (semester) => {
        setSemister(semester)
    }

    const generatePDF = async () => {
        const htmlContent = document.getElementById('pdf-content').outerHTML;

        const res = await fetch('http://localhost:5000/api/pdf/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ htmlContent, fileName: `student-${roll}-${semister}` }),
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student-${roll}-${semister}`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className='my-10'>

            <div className='text-center flex flex-col gap-5'>
                <div>
                    <h1 className='text-4xl font-bold'>Individual Results</h1>
                    <p>Check your result by roll number</p>
                </div>
                <div className="flex justify-center gap-3">
                    <Link to={"/"} className='border border-sky-500 py-1 px-8 rounded-lg'>Search Again</Link>
                    <button onClick={generatePDF} className='bg-sky-500 text-white py-1 px-8 rounded-lg'>Print Result</button>
                </div>
            </div>

            <div className="my-4 max-w-3xl mx-auto">
                {
                    studentInfo ?
                        <>
                            <div id='pdf-content' className='mx-auto'>
                                <div className="grid grid-cols-4 my-5">
                                    <div className='col-span-4 p-2 rounded-t-lg text-center bg-sky-300 font-semibold'>Student's Information Summary</div>
                                    <div className='w-full p-2 pl-4 bg-gray-200'>Roll </div>
                                    <div className='w-full p-2 bg-gray-200'>{studentInfo.roll}</div>
                                    <div className='w-full p-2 bg-gray-200'>Registration</div>
                                    <div className='w-full p-2 bg-gray-200'>{studentInfo.registration}</div>
                                    <div className='w-full p-2 pl-4 bg-white'>Student Name</div>
                                    <div className='w-full p-2 bg-white capitalize'>{studentInfo.student_name}</div>
                                    <div className='w-full p-2 bg-white'>Date of Birth</div>
                                    <div className='w-full p-2 bg-white'>{studentInfo.date_of_birth}</div>
                                    <div className='w-full p-2 pl-4 bg-gray-200'>Father's Name</div>
                                    <div className='w-full p-2 bg-gray-200 capitalize'>{studentInfo.father_name}</div>
                                    <div className='w-full p-2 bg-gray-200'>Mother's Name</div>
                                    <div className='w-full p-2 bg-gray-200 capitalize'>{studentInfo.mother_name}</div>
                                    <div className='w-full p-2 pl-4  bg-white'>Institute Name</div>
                                    <div className='w-full p-2  bg-white col-span-2'>{studentInfo.name_of_industry}</div>
                                    <div className='w-full p-2 bg-white'>Gender: {studentInfo.gender}</div>
                                    <div className='w-full p-2 pl-4 bg-gray-200'>Curriculum Name</div>
                                    <div className='w-full p-2 bg-gray-200 col-span-2'>{studentInfo.course_name}</div>
                                    <div className='w-full p-2 bg-gray-200'>Regulation: {studentInfo.regulation}</div>
                                    <div className='w-full p-2 pl-4 bg-white'>Department</div>
                                    <div className='w-full p-2 bg-white col-span-2'>{studentInfo.department}</div>
                                    <div className='w-full p-2 bg-white'>Session: {studentInfo.session}</div>
                                    <div className='w-full p-2 pl-4 bg-gray-200'>Semesters <br /> Grade Points</div>
                                    <div className='w-full col-span-3 grid grid-cols-8 bg-gray-200'>
                                        {
                                            studentInfo?.semesters?.map((data, idx) => (
                                                <div key={idx} className='px-2 items-center my-2 space-y-1'>
                                                    <h1 className='text-center bg-sky-300 rounded-2xl'>
                                                        {data.semester_name}
                                                    </h1>
                                                    <h1 className='text-center font-semibold bg-green-300  rounded-2xl'>
                                                        {data.result}
                                                    </h1>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <h1 className='text-2xl font-semibold text-center p-4'>Subject-wise Grade & Total CGPA</h1>

                                <div className="tabs tabs-lift ">
                                    <h1 className="flex items-center px-4">Semester:</h1>
                                    {semester?.map((data, index) => (

                                        <React.Fragment key={index}>
                                            <input
                                                type="radio"
                                                name="my_tabs_dynamic"
                                                className="tab checked:!bg-sky-300"
                                                aria-label={data.semester_name}
                                                defaultChecked={index === 0}
                                                onClick={() => handleSubject(data.semester_name)}
                                            />
                                            <div className="tab-content break-inside-avoid">

                                                <div className="flex justify-between items-center bg-sky-300 rounded-t-lg p-2">
                                                    <h1 className=''>Semester</h1>
                                                    <h1>{data.semester_name}</h1>
                                                    <h1>Total CGPA</h1>
                                                    <h1>{data.result}</h1>
                                                </div>
                                                <div className='grid grid-cols-7 bg-green-300'>
                                                    <h1 className=' p-2'>Code</h1>
                                                    <h1 className=' p-2 col-span-3'>Subjects Name</h1>
                                                    <h1 className=' p-2 text-center'>Theory</h1>
                                                    <h1 className=' p-2 text-center'>Practical</h1>
                                                    <h1 className=' p-2 text-center'>Grade</h1>
                                                </div>
                                                {
                                                    subjectInfo?.map((sub, subIdx) => (
                                                        <div key={subIdx} className={`grid p-2 grid-cols-7 itemsend ${subIdx % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                            }`}>

                                                            <h1>{sub.subject_code}</h1>
                                                            <h1 className="col-span-3">{sub.subject_name}</h1>
                                                            <h1 className="text-center">{sub.theory_marks}</h1>
                                                            <h1 className="text-center">{sub.practical_marks}</h1>
                                                            <h1 className="text-center">{getLetterGrade(sub.grade_point)}</h1>
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="w-1/2 h-60 mx-auto flex justify-center items-center">
                                <h1 className="text-4xl font-black text-center">Result Not Found</h1>
                            </div>
                        </>
                }
            </div>


        </div>
    );
};

export default Result;
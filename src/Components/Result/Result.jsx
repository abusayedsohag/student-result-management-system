import { useEffect, useState } from "react";
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

    const handleDownload = () => {

    };

    return (
        <div className=''>

            <div className='text-center'>
                <h1 className='text-4xl font-bold'>BTEB Individual Results</h1>
                <p>Check your diploma and polytechnic results instantly by roll number</p>
                <div>
                    <Link to={"/"} className='btn'>Search Again</Link>
                    <button onClick={handleDownload} className='btn'>Print</button>

                </div>
            </div>

            <div className="my-4 max-w-3xl mx-auto border p-2">
                {
                    studentInfo ?
                        <>
                            <div id='pdf-content' className='space-y-8  mx-auto bg-[#1D232A]'>
                                <table className='table table-zebra'>
                                    <thead>
                                        <tr className='bg-[#00C950]'>
                                            <th colSpan={4}>
                                                Student Information Summary
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Roll No</td>
                                            <td>{studentInfo.roll}</td>
                                            <td>Registration No</td>
                                            <td>{studentInfo.registration}</td>
                                        </tr>
                                        <tr>
                                            <td>Student Name</td>
                                            <td className="capitalize">{studentInfo.student_name}</td>
                                            <td>Date of Birth</td>
                                            <td>{studentInfo.date_of_birth}</td>
                                        </tr>
                                        <tr>
                                            <td>Father's Name</td>
                                            <td className="capitalize">{studentInfo.father_name}</td>
                                            <td>Mother's Name</td>
                                            <td className="capitalize">{studentInfo.mother_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Department</td>
                                            <td>{studentInfo.department}</td>
                                            <td>Session: {studentInfo.session}</td>
                                            <td>Gender: {studentInfo.gender}</td>
                                        </tr>
                                        <tr className=''>
                                            <td>Result</td>
                                            <td colSpan={3} className='p-0'>
                                                <table className='w-full'>
                                                    <tbody className='grid grid-cols-8 p-2'>
                                                        {
                                                            studentInfo?.semesters?.map((data, idx) => (
                                                                <tr key={idx} className=''>
                                                                    <td className="p-0 text-center">
                                                                        {data.semester_name}_{data.result}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Institute Name</td>
                                            <td colSpan={3}>{studentInfo.name_of_industry}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h1 className='text-4xl font-semibold text-center'>Subject Information</h1>

                                <div className='grid grid-cols-8'>
                                    {
                                        semester?.map((data, index) => (
                                            <button key={index} onClick={() => handleSubject(data.semester_name)} className="btn">{data.semester_name}</button>
                                        )
                                        )
                                    }
                                </div>

                                <table className='table table-zebra'>
                                    <thead className=''>
                                        <tr className='bg-[#00C950]'>
                                            <th className='w-1/12'>Code</th>
                                            <th className='w-5/12' colSpan={2}>Subject</th>
                                            <th className='p-0 w-full'>
                                                <table className='w-full'>
                                                    <tbody>
                                                        <tr className="grid grid-cols-3 text-center">
                                                            <td>Theory</td>
                                                            <td>Practical</td>
                                                            <td>Grade</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subjectInfo?.map((data) => (
                                                <tr key={data.subject_code}>
                                                    <td>{data.subject_code}</td>
                                                    <td colSpan={2}>{data.subject_name}</td>
                                                    <td className="p-0">
                                                        <table className='w-full'>
                                                            <tbody>
                                                                <tr className="text-center grid grid-cols-3">
                                                                    <td>{data.theory_marks}</td>
                                                                    <td>{data.practical_marks}</td>
                                                                    {/* <td>{data.grade_point}</td> */}
                                                                    <td>{getLetterGrade(data.grade_point)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table>
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
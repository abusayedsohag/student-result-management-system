import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../../Provider/Context";

const Result = () => {

    const { result, searchinfo } = useContext(MainContext);
    const [semister, setSemister] = useState("1st");
    const location = useLocation()


    const semesterInfo = result?.semesters.map(data => data.semester_name)
    const semesterResult = result?.semesters.map(data => data.result)
    const findSemi = result?.semesters.find(data => data.semester_name === semister)
    const subjectInfo = findSemi?.subjects

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const course = params.get("course");
        const regulation = params.get("regulation");
        const roll = params.get("roll");

        if (!result && course && regulation && roll) {
            searchinfo(course, regulation, roll); // ✅ refetch on refresh
        }
    }, [location.search, result, searchinfo]);

    // const student_Info = result?.personal_data;
    // const [semister, setSemister] = useState("1st")

    // // need department data from json
    // const departInfo = subjectdata.departments.map(data => data.name);

    // // Match Department from student data
    // const findDept = subjectdata.departments.find(dept => dept.name === student_Info?.department)

    // // Need semester data from json
    // const semesterInfo = findDept?.semesters.map(sem => sem.semester_name);

    // // Match Semister data from data
    // const findSemis = findDept?.semesters.find(semis => semis?.semester_name === semister)

    // // Need Subject data from json
    // const subjectInfo = findSemis?.subjects.map(data => data)

    // // console.log(subjectInfo);


    // // console.log(departInfo)
    // // console.log(semesterInfo)
    // // console.log(semisterInfo);

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

            {/* result content */}
            {/* {
                student_Info ?
                    <>
                        <div id='pdf-content' className='space-y-8 max-w-2xl mx-auto bg-[#1D232A]'>
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
                                        <td>{student_Info.roll}</td>
                                        <td>Registration No</td>
                                        <td>{student_Info.registration}</td>
                                    </tr>
                                    <tr>
                                        <td>Name of Student</td>
                                        <td>{student_Info.student_name}</td>
                                        <td>Date of Birth</td>
                                        <td>{student_Info.date_of_birth}</td>
                                    </tr>
                                    <tr>
                                        <td>Father's Name</td>
                                        <td>{student_Info.father_name}</td>
                                        <td>Mother's Name</td>
                                        <td>{student_Info.mother_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>{student_Info.department}</td>
                                        <td>Session: {student_Info.session}</td>
                                        <td>Gender: {student_Info.gender}</td>
                                    </tr>
                                    <tr className=''>
                                        <td>Result</td>
                                        <td colSpan={3} className='p-0'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        <td>3.51</td>
                                                        <td>3.52</td>
                                                        <td>3.53</td>
                                                        <td>3.54</td>
                                                        <td>3.55</td>
                                                        <td>3.56</td>
                                                        <td>3.57</td>
                                                        <td>3.58</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Name of Institute</td>
                                        <td colSpan={3}>{student_Info.name_of_industry}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h1 className='text-4xl font-semibold text-center'>Subject Information</h1>

                            <div className='grid grid-cols-8'>
                                {
                                    semesterInfo?.map(data => <>
                                        <button onClick={() => handleSubject(data)} className="btn">{data}</button>
                                    </>)
                                }
                            </div>

                            <table className='table table-zebra'>
                                <thead className=''>
                                    <tr className='bg-[#00C950]'>
                                        <th className='w-1/12'>Code</th>
                                        <th className='w-4/12' colSpan={2}>Subject</th>
                                        <th className='p-0 w-full'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        <td>Theory</td>
                                                        <td>Practical</td>
                                                        <td>Total</td>
                                                        <td>Grade</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subjectInfo?.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.subject_code}</td>
                                                <td colSpan={2}>{data.subject_name}</td>
                                                <td>
                                                    <table className='w-full'>
                                                        <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
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
            } */}


            {
                result ?
                    <>
                        <div id='pdf-content' className='space-y-8 max-w-2xl mx-auto bg-[#1D232A]'>
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
                                        <td>{result.roll}</td>
                                        <td>Registration No</td>
                                        <td>{result.registration}</td>
                                    </tr>
                                    <tr>
                                        <td>Name of Student</td>
                                        <td>{result.student_name}</td>
                                        <td>Date of Birth</td>
                                        <td>{result.date_of_birth}</td>
                                    </tr>
                                    <tr>
                                        <td>Father's Name</td>
                                        <td>{result.father_name}</td>
                                        <td>Mother's Name</td>
                                        <td>{result.mother_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>{result.department}</td>
                                        <td>Session: {result.session}</td>
                                        <td>Gender: {result.gender}</td>
                                    </tr>
                                    <tr className=''>
                                        <td>Result</td>
                                        <td colSpan={3} className='p-0'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        {
                                                            semesterResult.map((data, index) => <>
                                                                <td key={index}>{data}</td>
                                                            </>)
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Name of Institute</td>
                                        <td colSpan={3}>{result.name_of_industry}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h1 className='text-4xl font-semibold text-center'>Subject Information</h1>

                            <div className='grid grid-cols-8'>
                                {
                                    semesterInfo?.map((data, index) => <>
                                        <button key={index} onClick={() => handleSubject(data)} className="btn">{data}</button>
                                    </>)
                                }
                            </div>

                            <table className='table table-zebra'>
                                <thead className=''>
                                    <tr className='bg-[#00C950]'>
                                        <th className='w-1/12'>Code</th>
                                        <th className='w-4/12' colSpan={2}>Subject</th>
                                        <th className='p-0 w-full'>
                                            <table className='w-full'>
                                                <tbody>
                                                    <tr>
                                                        <td>Theory</td>
                                                        <td>Practical</td>
                                                        <td>Total</td>
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
                                                <td>
                                                    <table className='w-full'>
                                                        <tbody>
                                                            <tr>
                                                                <td>{data.theory_marks}</td>
                                                                <td>{data.practical_marks}</td>
                                                                <td>{data.total_marks}</td>
                                                                <td>{data.total_grade}</td>
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
    );
};

export default Result;
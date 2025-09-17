import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchStudent, fetchStudents, updateStudent } from './api';

const UploadResult1 = () => {

    const [roll, setRoll] = useState("");
    const [student, setStudent] = useState(null);
    const [students, setStudents] = useState(null);
    const [courses, setCourses] = useState([]);

    const [sems, setSems] = useState("");

    useEffect(() => {
        fetchStudents()
            .then(res => setStudents(res.data));
    }, [])

    useEffect(() => {
        fetchCourses()
            .then(res => setCourses(res.data));
    }, [])

    const handleFind = () => {
        const findRoll = students.find(rl => rl.roll === roll)
        const findCors = findRoll.course_name;
        const findDept = findRoll.department;
        const findCor = courses.find(data => data.course_name === findCors);
        const dept = findCor.departments.find(data => data.name === findDept);
        const sems = dept.semesters

        setSems(sems)
        setStudent(findRoll)
    }


    // marks change handler
    const handleSubjectChange = (semIdx, subIdx, e) => {
        const { name, value } = e.target;
        setStudent((prev) => {
            const semesters = [...prev.semesters];
            const subjects = [...semesters[semIdx].subjects];
            subjects[subIdx] = {
                ...subjects[subIdx],
                [name]: Number(value),
            };
            semesters[semIdx].subjects = subjects;
            return { ...prev, semesters };
        });
    };

    const handleSemesterChange = (idx, e) => {
        const { name, value } = e.target;

        setStudent(prev => {
            let semesters = [...prev.semesters];

            if (name === "semester_name") {
                const exists = semesters.some(sem => sem.semester_name === value);

                if (!exists) {
                    const findSem = sems.find(sem => sem.semester_name === value);
                    const subjects = findSem ? findSem.subjects : [];

                    const newSemester = {
                        semester_name: value,
                        result: "",
                        subjects: subjects.map(sub => ({
                            ...sub,
                            theory_marks: 0,
                            practical_marks: 0,
                        })),
                    };

                    semesters = [...semesters, newSemester];
                }
            } else {
                semesters[idx] = {
                    ...semesters[idx],
                    [name]: value,
                };
            }

            return { ...prev, semesters };
        });
    };

    const removeSemester = (i) => setStudent(prev => ({
        ...prev, semesters:
            prev.semesters.filter((_, idx) => idx !== i)
    }));


    const handleUpdate = async () => {
        try {
            await updateStudent(roll, student);
            alert("✅ Result Updated Successfully!");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to update result");
        }
    };



    return (
        <div className='w-11/12 mx-auto'>
            <h2 className="text-xl font-bold mb-4">Upload Student Result</h2>

            {/* Roll Search */}
            <div className="mb-4">
                <input
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    placeholder="Enter Roll"
                    className="border p-2"
                />
                <button onClick={handleFind} className="bg-green-600 text-white p-2 ml-2">
                    Find Student
                </button>
            </div>

            {/* Subject Marks */}
            {student && (
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className='input w-full'>Roll: {student.roll}</div>
                        <div className='input w-full'>Student Name: {student.student_name}</div>
                        <div className='input w-full'>Father's Name: {student.father_name}</div>
                        <div className='input w-full'>Mother's Name{student.mother_name}</div>
                        <div className='input w-full'>Date of Birth: {student.date_of_birth}</div>
                        <div className='input w-full'>Gender: {student.gender}</div>
                        <div className='input w-full'>Registration: {student.registration}</div>
                        <div className='input w-full'>Institute: {student.name_of_industry}</div>
                        <div className='input w-full'>Department: {student.department}</div>
                        <div className='input w-full'>Regulation: {student.regulation}</div>
                        <div className='input w-full'>Session: {student.session}</div>
                    </div>

                    {student.semesters.map((sem, sIdx) => (
                        <div key={sIdx} className="border p-3 rounded">
                            <div className="flex justify-between items-center mb-2">
                                <strong>{sem.semester_name || `Semester & Subject`}</strong>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => addSubject(sIdx)}
                                        className="px-2 py-1 border rounded">+Sub</button>
                                    {student.semesters.length > 1 && <button type="button"
                                        onClick={() => removeSemester(sIdx)} className="px-2 py-1 border rounded">Remove Sem</button>}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2">

                                <select
                                    name="semester_name"
                                    value={sem.semester_name}
                                    onChange={(e) => {
                                        handleSemesterChange(sIdx, e);
                                    }}
                                    className="border p-2 bg-gray-900"
                                >
                                    <option value="" disabled>Select Semester</option>
                                    {
                                        sems?.map(sem => <>
                                            <option value={sem.semester_name}>{sem.semester_name}</option>
                                        </>)
                                    }
                                </select>

                                <select
                                    name="result"
                                    value={sem.result}
                                    onChange={(e) => handleSemesterChange(sIdx, e)}
                                    className="border p-2 bg-gray-900"
                                >
                                    <option value="" disabled>Grade Point</option>
                                    {Array.from({ length: 401 }, (_, i) => {
                                        const value = (i * 0.01).toFixed(2);
                                        return (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                {sem.subjects.map((sub, subIdx) => (
                                    <div key={subIdx} className="grid grid-cols-6 gap-2 mb-2 itemsend">
                                        <input
                                            name="subject_code"
                                            value={sub.subject_code}
                                            readOnly
                                            onChange={(e) => handleSubjectChange(sIdx, subIdx, e)}
                                            placeholder="Code"
                                            className="border p-2"
                                        />

                                        <input name="subject_name" value={sub.subject_name}
                                            onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Name"
                                            className="border p-2 col-span-2" />
                                        <input name="theory_marks" value={sub.theory_marks}
                                            onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Theory"
                                            type="number" className="border p-2" />
                                        <input name="practical_marks" value={sub.practical_marks}
                                            onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Practical"
                                            type="number" className="border p-2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 mt-3 rounded">
                        Update Result
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadResult1;
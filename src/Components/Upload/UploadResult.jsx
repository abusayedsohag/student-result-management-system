import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchStudents, updateStudent } from './api';
import Swal from 'sweetalert2';

const UploadResult = () => {

    const [roll, setRoll] = useState("");
    const [student, setStudent] = useState(null);
    const [students, setStudents] = useState(null);
    const [courses, setCourses] = useState([]);

    const [semes, setSemesters] = useState("");

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


        if (findRoll) {
            const findCors = findRoll.course_name;
            const findDept = findRoll.department;
            const findCor = courses.find(data => data.course_name === findCors);
            const dept = findCor.departments.find(data => data.name === findDept);
            const semesters = dept.semesters;


            const studentWithFlags = {
                ...findRoll,
                semesters: findRoll.semesters.map(sem => ({
                    ...sem,
                    subjects: sem.subjects.map(sub => ({
                        ...sub,
                        isSaved: sub.theory_marks > 0 && sub.practical_marks > 0
                    }))
                }))
            };

            setSemesters(semesters)
            setStudent(studentWithFlags)

        } else {
            Swal.fire({
                icon: "error",
                title: "Result Not Found",
                text: "Please Enter Currect Roll",
            });
        }
    }

    const handleAddSemester = () => {
        if (!student) return;

        setStudent(prev => {
            const semesters = [...(prev.semesters || [])];
            const nextIndex = semesters.length;

            const nextSemesterData = semes[nextIndex];
            if (!nextSemesterData) return prev;

            const newSemester = {
                semester_name: nextSemesterData.semester_name,
                result: "",
                subjects: nextSemesterData.subjects.map(sub => ({
                    ...sub,
                    theory_marks: 0,
                    practical_marks: 0
                }))
            };

            semesters.push(newSemester);
            return { ...prev, semesters };
        });
    };



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

            semesters[semIdx] = {
                ...semesters[semIdx],
                subjects,
                result: null
            };
            return { ...prev, semesters };
        });
    };


    const removeSemester = (i) => setStudent(prev => ({
        ...prev, semesters:
            prev.semesters.filter((_, idx) => idx !== i)
    }));

    const calculateTGP = (theory) => {
        const tp = Number(theory) / 100 * 100
        const percentage = tp

        if (percentage >= 80) return 4.0;
        if (percentage >= 75) return 3.75;
        if (percentage >= 70) return 3.5;
        if (percentage >= 65) return 3.25;
        if (percentage >= 60) return 3.0;
        if (percentage >= 55) return 2.75;
        if (percentage >= 50) return 2.5;
        if (percentage >= 45) return 2.25;
        if (percentage >= 40) return 2.0;
        return 0.0; // fail
    };
    const calculatePGP = (practical) => {
        const tp = Number(practical) / 50 * 100
        const percentage = tp

        if (percentage >= 80) return 4.0;
        if (percentage >= 75) return 3.75;
        if (percentage >= 70) return 3.5;
        if (percentage >= 65) return 3.25;
        if (percentage >= 60) return 3.0;
        if (percentage >= 55) return 2.75;
        if (percentage >= 50) return 2.5;
        if (percentage >= 45) return 2.25;
        if (percentage >= 40) return 2.0;
        return 0.0; // fail
    };

    const calculateGP = (theory, practical) => {
        const total = ((calculateTGP(theory) + calculatePGP(practical)) / 2)
        return Number(total.toFixed(2))
    }

    const calculateSemesterGPA = (subjects) => {
        if (!subjects.length) return "F";

        // Check if any subject's theory_marks is empty or 0
        const incomplete = subjects.some(sub => !sub.theory_marks);
        if (incomplete) return "F";

        const totalGP = subjects.reduce((sum, sub) => {
            return sum + calculateGP(sub.theory_marks, sub.practical_marks);
        }, 0);

        return (totalGP / subjects.length).toFixed(2);
    };


    const handleCalculateSemester = (semesterIndex) => {
        setStudent(prev => {
            const semesters = [...prev.semesters];
            const subjects = semesters[semesterIndex].subjects;

            const gpa = calculateSemesterGPA(subjects);

            semesters[semesterIndex] = {
                ...semesters[semesterIndex],
                result: gpa
            };

            return { ...prev, semesters };
        });
    };



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
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                            setRoll(value);
                        }
                    }}
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
                    <div className="grid grid-cols-4">
                        <div className='w-full p-2 border'>Roll </div>
                        <div className='w-full p-2 border'>{student.roll}</div>
                        <div className='w-full p-2 border'>Registration</div>
                        <div className='w-full p-2 border'>{student.registration}</div>
                        <div className='w-full p-2 border'>Student Name</div>
                        <div className='w-full p-2 border'>{student.student_name}</div>
                        <div className='w-full p-2 border'>Date of Birth</div>
                        <div className='w-full p-2 border'>{student.date_of_birth}</div>
                        <div className='w-full p-2 border'>Father's Name</div>
                        <div className='w-full p-2 border'>{student.father_name}</div>
                        <div className='w-full p-2 border'>Mother's Name</div>
                        <div className='w-full p-2 border'>{student.mother_name}</div>
                        <div className='w-full p-2 border'>Institute Name</div>
                        <div className='w-full p-2 border col-span-2'>{student.name_of_industry}</div>
                        <div className='w-full p-2 border'>Gender: {student.gender}</div>
                        <div className='w-full p-2 border'>Course Name</div>
                        <div className='w-full p-2 border col-span-2'>{student.course_name}</div>
                        <div className='w-full p-2 border'>Regulation: {student.regulation}</div>
                        <div className='w-full p-2 border'>Department</div>
                        <div className='w-full p-2 border col-span-2'>{student.department}</div>
                        <div className='w-full p-2 border'>Session: {student.session}</div>
                        <div className='w-full p-2 border'>Grade Points</div>
                        <div className='w-full border col-span-3 grid grid-cols-8'>
                            {
                                student.semesters.map(data => (
                                    <div className='border-r grid grid-cols-2'>
                                        <div className='border-r py-2 text-center'>
                                            {data.semester_name}
                                        </div>
                                        <div className='py-2 text-center'>
                                            {data.result}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {student.semesters.map((sem, sIdx) => {
                        const isPast = sem.isPast;


                        return (
                            <div key={sIdx} className="border p-3 rounded mb-3">
                                <div className="flex justify-between items-center mb-2">
                                    <strong>Semester: {sem.semester_name}</strong>

                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    <input
                                        type="text"
                                        name="semester_name"
                                        readOnly
                                        value={sem.semester_name}
                                        className="border p-2 "
                                    />

                                    {sem.result ? (
                                        <p className="font-bold border p-2">GPA: {sem.result}</p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleCalculateSemester(sIdx)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Calculate GPA
                                        </button>
                                    )}

                                </div>

                                <div>
                                    {sem.subjects.map((sub, subIdx) => (
                                        <div key={subIdx} className="grid grid-cols-6 gap-2 mb-2 itemsend">
                                            <input
                                                name="subject_code"
                                                value={sub.subject_code}
                                                readOnly
                                                className="border p-2 outline-0"
                                                required
                                            />
                                            <input
                                                name="subject_name"
                                                value={sub.subject_name}
                                                readOnly
                                                className="border p-2 col-span-2 outline-0"
                                                required
                                            />
                                            <input
                                                name="theory_marks"
                                                value={sub.theory_marks}
                                                onChange={(e) => {
                                                    let value = Number(e.target.value);

                                                    if (value < 0) return value = 0;
                                                    if (value > 100) return value = 100;

                                                    handleSubjectChange(sIdx, subIdx, e)
                                                }}
                                                required
                                                type="number"
                                                className="border p-2"
                                                disabled={sub.theory_marks !== 0 && sub.isSaved}
                                            />
                                            <input
                                                name="practical_marks"
                                                value={sub.practical_marks}
                                                onChange={(e) => {
                                                    let value = Number(e.target.value);

                                                    if (value < 0) return value = 0;
                                                    if (value > 50) return value = 50;

                                                    handleSubjectChange(sIdx, subIdx, e)
                                                }}
                                                required
                                                type="number"
                                                className="border p-2"
                                                disabled={sub.theory_marks !== 0 && sub.isSaved}
                                            />

                                            <div className='border p-2'>
                                                <strong>{calculateGP(sub.theory_marks, sub.practical_marks)}</strong>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        );
                    })}


                    <button
                        onClick={handleAddSemester}
                        className="bg-green-500 text-white px-3 p-2 mr-2 rounded"
                    >
                        + Add Semester
                    </button>

                    <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 mt-3 rounded">
                        Update Result
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadResult;
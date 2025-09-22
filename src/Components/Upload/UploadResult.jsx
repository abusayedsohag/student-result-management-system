import React, { useEffect, useState } from 'react';
import { fetchCourses, fetchStudents, updateStudent } from '../../assets/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UploadResult = () => {

    const navigate = useNavigate();

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
                    theory_marks: "",
                    practical_marks: "",
                    grade_point: ""
                }))
            };

            semesters.push(newSemester);
            return { ...prev, semesters };
        });
    };

    const handleSubjectChange = (semIdx, subIdx, e) => {
        const { name, value } = e.target;

        setStudent((prev) => {
            const semesters = [...prev.semesters];
            const subjects = [...semesters[semIdx].subjects];

            let updatedSubject = {
                ...subjects[subIdx],
                [name]: Number(value),
            };

            if (name === "theory_marks" || name === "practical_marks") {
                updatedSubject = {
                    ...updatedSubject,
                    grade_point: null,
                };
            }

            subjects[subIdx] = updatedSubject;

            semesters[semIdx] = {
                ...semesters[semIdx],
                subjects,
                result: null,
            };

            return { ...prev, semesters };
        });
    };


    const calculateTGP = (theory) => {
        const tp = Number(theory) / 100 * 100
        const percentage = tp

        if (percentage >= 80) return 4.0;
        if (percentage >= 40) return (tp * 0.05);
        return 0.0;
    };

    const calculatePGP = (practical) => {
        const tp = Number(practical) / 50 * 100
        const percentage = tp

        if (percentage >= 80) return 4.0;
        if (percentage >= 40) return (tp * 0.05);
        return 0.0;
    };

    const calculateGP = (theory, practical) => {
        if (theory === "" || theory == null || practical === "" || practical == null) {
            return "F";
        }
        const total = (calculateTGP(Number(theory)) + calculatePGP(Number(practical))) / 2;
        if (isNaN(total)) return "F";
        return Number(total.toFixed(2));
    };



    const handleSubGradePoint = (sIdx, subIdx) => {
        const newSemesters = [...student.semesters];
        const subject = newSemesters[sIdx].subjects[subIdx];
        subject.grade_point = calculateGP(subject.theory_marks, subject.practical_marks);
        setStudent({
            ...student,
            semesters: newSemesters,
        });
    };

    const calculateSemesterGPA = (subjects) => {
        if (!subjects.length) return "F";

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
            Swal.fire({
                title: "✅ Result Updated Successfully!",
                icon: "success",
                draggable: true,
            }).then(() => {
                navigate(0); // page refresh
            });
        } catch (err) {
            console.error(err);
            alert("❌ Failed to update result");
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Canceled!",
                    text: "Your info has been canceled.",
                    icon: "success"
                }).then(() => {
                    navigate(0); // page refresh
                });
            }
        });
    }

    return (
        <div className='w-11/12 lg:w-[800px] mx-auto'>
            <h2 className="text-xl font-bold mb-4 text-center">Upload Student Result</h2>

            {/* Roll Search */}
            <div className="mb-4 text-center">
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
                    <div className="grid grid-cols-4 border my-5">
                        <div className='w-full p-2 border-r border-b'>Roll </div>
                        <div className='w-full p-2 border-r border-b'>{student.roll}</div>
                        <div className='w-full p-2 border-r border-b'>Registration</div>
                        <div className='w-full p-2  border-b'>{student.registration}</div>
                        <div className='w-full p-2 border-r border-b'>Student Name</div>
                        <div className='w-full p-2 border-r border-b capitalize'>{student.student_name}</div>
                        <div className='w-full p-2 border-r border-b'>Date of Birth</div>
                        <div className='w-full p-2  border-b'>{student.date_of_birth}</div>
                        <div className='w-full p-2 border-r border-b'>Father's Name</div>
                        <div className='w-full p-2 border-r border-b capitalize'>{student.father_name}</div>
                        <div className='w-full p-2 border-r border-b'>Mother's Name</div>
                        <div className='w-full p-2 border-b capitalize'>{student.mother_name}</div>
                        <div className='w-full p-2 border-r border-b'>Institute Name</div>
                        <div className='w-full p-2 border-r border-b col-span-2'>{student.name_of_industry}</div>
                        <div className='w-full p-2  border-b'>Gender: {student.gender}</div>
                        <div className='w-full p-2 border-r border-b'>Course Name</div>
                        <div className='w-full p-2 border-r border-b col-span-2'>{student.course_name}</div>
                        <div className='w-full p-2  border-b'>Regulation: {student.regulation}</div>
                        <div className='w-full p-2 border-r border-b'>Department</div>
                        <div className='w-full p-2 border-r border-b col-span-2'>{student.department}</div>
                        <div className='w-full p-2 border-b'>Session: {student.session}</div>
                        <div className='w-full p-2 border-r'>Grade Points</div>
                        <div className='w-full col-span-3 grid grid-cols-8'>
                            {
                                student.semesters.map((data, idx) => (
                                    <div key={idx} className='border-r grid grid-cols-2'>
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
                                <div className="mb-2">
                                    <h1 className='text-xl font-semibold'>Semester: {sem.semester_name}</h1>
                                </div>

                                <div className="grid grid-cols-4 mb-2">
                                    <div className='border p-2'>
                                        <h1>Semester</h1>
                                    </div>
                                    <input
                                        type="text"
                                        name="semester_name"
                                        readOnly
                                        value={sem.semester_name}
                                        className="border p-2 "
                                    />

                                    <div className='border p-2'>
                                        <h1>Total CGPA</h1>
                                    </div>

                                    {sem.result ? (
                                        <p className="font-bold border p-2">{sem.result}</p>
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

                                <div className='border-l border-t'>
                                    <div className='grid grid-cols-6'>
                                        <h1 className='border-r border-b p-2'>Code</h1>
                                        <h1 className='border-r border-b p-2 col-span-2'>Subjects Name</h1>
                                        <h1 className='border-r border-b p-2'>Theory</h1>
                                        <h1 className='border-r border-b p-2'>Practical</h1>
                                        <h1 className='border-r border-b p-2'>Grade</h1>
                                    </div>
                                    {sem.subjects.map((sub, subIdx) => (
                                        <div key={subIdx} className="grid grid-cols-6 itemsend">
                                            <input
                                                name="subject_code"
                                                value={sub.subject_code}
                                                readOnly
                                                className="border-r border-b p-2 outline-0"
                                                required
                                            />
                                            <input
                                                name="subject_name"
                                                value={sub.subject_name}
                                                readOnly
                                                className="border-r border-b p-2 col-span-2 outline-0"
                                                required
                                            />
                                            <input
                                                name="theory_marks"
                                                value={sub.theory_marks}
                                                placeholder='0-100'
                                                onChange={(e) => {
                                                    let value = Number(e.target.value);

                                                    if (value < 0) return value = 0;
                                                    if (value > 100) return value = 100;

                                                    handleSubjectChange(sIdx, subIdx, e)
                                                }}
                                                required
                                                type="number"
                                                className="border-r border-b p-2"
                                                disabled={sub.theory_marks !== 0 && sub.isSaved}
                                            />
                                            <input
                                                name="practical_marks"
                                                value={sub.practical_marks}
                                                placeholder='0-50'
                                                onChange={(e) => {
                                                    let value = Number(e.target.value);

                                                    if (value < 0) return value = 0;
                                                    if (value > 50) return value = 50;

                                                    handleSubjectChange(sIdx, subIdx, e)
                                                }}
                                                required
                                                type="number"
                                                className="border-r border-b p-2"
                                                disabled={sub.theory_marks !== 0 && sub.isSaved}
                                            />

                                            {sub.grade_point ? (
                                                <p
                                                    className="border-r border-b p-2 font-bold"
                                                >
                                                    {sub.grade_point}
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSubGradePoint(sIdx, subIdx)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    Calculate GP
                                                </button>
                                            )}
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

                    <button onClick={handleUpdate} className="mr-2 bg-blue-600 text-white p-2 mt-3 rounded">
                        Update Result
                    </button>

                    <button onClick={handleCancel} className="bg-red-600 text-white p-2 mt-3 rounded">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadResult;
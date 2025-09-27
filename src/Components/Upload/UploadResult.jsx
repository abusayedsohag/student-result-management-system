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
            const findregus = findRoll.regulation;
            const findCor = courses.find(data => data.course_name === findCors);
            const dept = findCor.departments.find(data => data.name === findDept);
            const regu = dept.regulation.find(dt => dt.year === findregus)
            const semesters = regu.semesters;

            console.log(semesters)

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
        <div className='lg:max-w-3xl md:max-w-xl mx-auto mt-10'>
            {/* Roll Search */}
            <div className=" max-w-xl rounded-xl text-center px-10 mx-auto space-y-3 min-h-96 items-center flex justify-center flex-col">
                <h2 className="text-3xl font-bold text-center">Upload Student’s Result</h2>
                <p className='pb-3'>“Turning Hard Work into Digital Success.”</p>
                <div className='bg-white w-8/12 mx-auto rounded-lg flex justify-between'>
                    <input
                        value={roll}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,6}$/.test(value)) {
                                setRoll(value);
                            }
                        }}
                        placeholder="Enter Student Roll"
                        className="p-2 rounded-2xl outline-0 w-7/12"
                    />
                    <button onClick={handleFind} className="bg-green-600 w-5/12 text-white p-2 ml-2 rounded-lg">
                        Find Student
                    </button>
                </div>
            </div>

            {/* Subject Marks */}
            {student && (
                <div className='max-w-3xl mb-10'>
                    <div className="grid grid-cols-4 my-5">
                        <div className='col-span-4 p-2 rounded-t-lg text-center bg-sky-300 font-semibold'>Student's Information Summary</div>
                        <div className='w-full p-2 pl-4 bg-gray-200'>Roll </div>
                        <div className='w-full p-2 bg-gray-200'>{student.roll}</div>
                        <div className='w-full p-2 bg-gray-200'>Registration</div>
                        <div className='w-full p-2 bg-gray-200'>{student.registration}</div>
                        <div className='w-full p-2 pl-4 bg-white'>Student Name</div>
                        <div className='w-full p-2 bg-white capitalize'>{student.student_name}</div>
                        <div className='w-full p-2 bg-white'>Date of Birth</div>
                        <div className='w-full p-2 bg-white'>{student.date_of_birth}</div>
                        <div className='w-full p-2 pl-4 bg-gray-200'>Father's Name</div>
                        <div className='w-full p-2 bg-gray-200 capitalize'>{student.father_name}</div>
                        <div className='w-full p-2 bg-gray-200'>Mother's Name</div>
                        <div className='w-full p-2 bg-gray-200 capitalize'>{student.mother_name}</div>
                        <div className='w-full p-2 pl-4  bg-white'>Institute Name</div>
                        <div className='w-full p-2  bg-white col-span-2'>{student.name_of_industry}</div>
                        <div className='w-full p-2 bg-white'>Gender: {student.gender}</div>
                        <div className='w-full p-2 pl-4 bg-gray-200'>Curriculum Name</div>
                        <div className='w-full p-2 bg-gray-200 col-span-2'>{student.course_name}</div>
                        <div className='w-full p-2 bg-gray-200'>Regulation: {student.regulation}</div>
                        <div className='w-full p-2 pl-4 bg-white'>Department</div>
                        <div className='w-full p-2 bg-white col-span-2'>{student.department}</div>
                        <div className='w-full p-2 bg-white'>Session: {student.session}</div>
                        <div className='w-full p-2 pl-4 bg-gray-200'>Semesters <br /> Grade Points</div>
                        <div className='w-full col-span-3 grid grid-cols-8 bg-gray-200'>
                            {
                                student.semesters.map((data, idx) => (
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

                    {student.semesters.map((sem, sIdx) => {
                        const isPast = sem.isPast;


                        return (

                            <div>

                                <div>
                                    <h1 className='text-2xl font-medium text-center pb-6'>Subject-wise Grade & Total CGPA</h1>
                                </div>

                                <div key={sIdx} className="rounded mb-3">
                                    <div className='bg-sky-300 p-2 rounded-t-lg text-center'>
                                        <h1>{sem.semester_name} Semester</h1>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-2">
                                        <h1 className=''>Semester</h1>
                                        <input
                                            type="text"
                                            name="semester_name"
                                            readOnly
                                            value={sem.semester_name}
                                            className=""
                                        />

                                        <h1>Total CGPA</h1>
                                        {sem.result ? (
                                            <p className="font-bold">{sem.result}</p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleCalculateSemester(sIdx)}
                                                className="bg-sky-500 px-1 text-sm text-white rounded"
                                            >
                                                Calc CGPA
                                            </button>
                                        )}
                                    </div>

                                    <div className=''>
                                        <div className='grid grid-cols-7 bg-green-400'>
                                            <h1 className=' p-2'>Code</h1>
                                            <h1 className=' p-2 col-span-3'>Subjects Name</h1>
                                            <h1 className=' p-2 text-center'>Theory</h1>
                                            <h1 className=' p-2 text-center'>Practical</h1>
                                            <h1 className=' p-2 text-center'>Grade</h1>
                                        </div>
                                        {sem.subjects.map((sub, subIdx) => (
                                            <div key={subIdx} className={`grid grid-cols-7 itemsend ${subIdx % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                }`}>
                                                <input
                                                    name="subject_code"
                                                    value={sub.subject_code}
                                                    readOnly
                                                    className=" p-2 outline-0"
                                                    required
                                                />
                                                <input
                                                    name="subject_name"
                                                    value={sub.subject_name}
                                                    readOnly
                                                    className=" p-2 col-span-3 outline-0"
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
                                                    className="p-2 text-center"
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
                                                    className="text-center p-2"
                                                    disabled={sub.theory_marks !== 0 && sub.isSaved}
                                                />

                                                {sub.grade_point ? (
                                                    <p
                                                        className="text-center p-2 font-bold"
                                                    >
                                                        {sub.grade_point}
                                                    </p>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSubGradePoint(sIdx, subIdx)}
                                                        className="bg-sky-500 text-sm text-white p-0 rounded"
                                                    >
                                                        Calc GP
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                    <div className='flex justify-between items-center'>
                        <button
                            onClick={handleAddSemester}
                            className="bg-white py-1 px-2 rounded-lg border border-sky-300"
                        >
                            + Add Semester
                        </button>

                        <div className='flex gap-2'>
                            <button onClick={handleCancel} className="bg-red-600 text-white py-1 px-2  rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="bg-sky-500 text-white py-1 px-2  rounded-lg">
                                Result Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadResult;
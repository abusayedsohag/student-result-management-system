import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { createStudent, updateStudent, fetchCourses, fetchInstitutes } from './api';
import DatePicker from 'react-datepicker';
import sessionData from "../../assets/info/session.json"

const emptySubject = () => ({
    subject_code: '', subject_name: '', theory_marks:
        0, practical_marks: 0, total_marks: 0, total_grade: 0
});

const emptySemester = () => ({
    semester_name: '', result: 0, subjects:
        [emptySubject()]
});

const Upload = () => {

    const [student, setStudent] = useState({
        roll: '', student_name: '', father_name: '', mother_name: '',
        date_of_birth: '', gender: '', registration: '', course_name: '',
        name_of_industry: '', department: '', regulation: '', session: '', semesters:
            [emptySemester()]
    });

    useEffect(() => {
        fetchCourses()
            .then(res => setCourses(res.data));
    }, [])

    useEffect(() => {
        fetchInstitutes()
            .then(res => setInstitutes(res.data));
    }, [])


    useEffect(() => {
        const session = sessionData.map(data => data)
        setRegulations(session)
    }, [])

    const [jsonInput, setJsonInput] = useState('');
    const [rollToUpdate, setRollToUpdate] = useState('');
    const [message, setMessage] = useState('');

    const [courses, setCourses] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [regulations, setRegulations] = useState([]);

    const [selectCourse, setSelectCourse] = useState([])
    const [selectRegulation, setSelectRegulation] = useState([])

    const handleTopChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    }

    const handleSelectCourse = (e) => {
        const courseValue = e.target.value
        const findCourse = courses.find(dept => dept.course_name === courseValue)

        const dept = findCourse?.departments
        setSelectCourse(dept)
    }

    const handleSelectRegulation = (e) => {
        const value = e.target.value
        const findRegulation = regulations.find(res => res.regulation === value)

        const sessionList = findRegulation.sessions
        
        setSelectRegulation(sessionList)
    }

    const handleSemesterChange = (idx, e) => {
        const { name, value } = e.target;
        setStudent(prev => {
            const semesters = [...prev.semesters];
            semesters[idx] = {
                ...semesters[idx], [name]: name === 'result' ?
                    Number(value) : value
            };
            return { ...prev, semesters };
        });
    }

    const handleSubjectChange = (sidx, subidx, e) => {
        const { name, value } = e.target;
        setStudent(prev => {
            const semesters = [...prev.semesters];
            const subjects = [...semesters[sidx].subjects];
            subjects[subidx] = {
                ...subjects[subidx], [name]:
                    ['theory_marks', 'practical_marks', 'total_marks', 'total_grade'].includes(name) ?
                        Number(value) : value
            };
            semesters[sidx].subjects = subjects;
            return { ...prev, semesters };
        });
    }

    const addSemester = () => setStudent(prev => ({
        ...prev, semesters:
            [...prev.semesters, emptySemester()]
    }));

    const removeSemester = (i) => setStudent(prev => ({
        ...prev, semesters:
            prev.semesters.filter((_, idx) => idx !== i)
    }));

    const addSubject = (sidx) => setStudent(prev => {
        const semesters = [...prev.semesters];
        semesters[sidx].subjects = [...semesters[sidx].subjects, emptySubject()];
        return { ...prev, semesters };
    });

    const removeSubject = (sidx, subidx) => setStudent(prev => {
        const semesters = [...prev.semesters];
        semesters[sidx].subjects = semesters[sidx].subjects.filter((_, idx) => idx !== subidx);
        return { ...prev, semesters };
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await createStudent(student);
            setMessage('Created: ' + res.data.roll);
            setStudent({
                roll: '', student_name: '', father_name: '', mother_name:
                    '', date_of_birth: '', gender: '', registration: '', course_name: '',
                name_of_industry: '', department: '', regulation: '', session: '', semesters:
                    [emptySemester()]
            });
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || 'Error creating');
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!rollToUpdate) { setMessage('Enter roll to update'); return; }
        console.log(rollToUpdate);

        try {
            const res = await updateStudent(rollToUpdate, student);
            setMessage('Updated: ' + res.data.roll);
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || 'Error updating');
        }
    };

    const handleUploadJson = async () => {
        try {
            const parsed = JSON.parse(jsonInput);
            // if it's array, create multiple; simple approach: handle single object
            if (Array.isArray(parsed)) {
                for (let obj of parsed) await createStudent(obj);
                setMessage('Uploaded array of ' + parsed.length);
            } else {
                const res = await createStudent(parsed);
                setMessage('Uploaded: ' + res.data.roll);
            }
        } catch (err) {
            console.error(err);
            setMessage('Invalid JSON or upload error');
        }
    };


    return (

        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Add / Update Student</h2>
            <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <input name="roll" type='number' value={student.roll}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,6}$/.test(value)) {
                                handleTopChange(e);
                            }
                        }}
                        placeholder="Roll" className="border p-2" required />
                    <input name="student_name" value={student.student_name}
                        onChange={handleTopChange} placeholder="Student name" className="border p-2 capitalize" required />
                    <input name="father_name" value={student.father_name}
                        onChange={handleTopChange} placeholder="Father name" className="border p-2 capitalize" required />
                    <input name="mother_name" value={student.mother_name}
                        onChange={handleTopChange} placeholder="Mother name" className="border p-2 capitalize" required />
                    {/* <input name="date_of_birth" value={student.date_of_birth}
                        onChange={handleTopChange} placeholder="YYYY-MM-DD" className="border p-2" /> */}


                    <div className='w-full border'>
                        <DatePicker
                            selected={student.date_of_birth ? new Date(student.date_of_birth) : null}
                            className="p-2 w-full outline-none"
                            showMonthDropdown  // month dropdown
                            showYearDropdown   // year dropdown
                            dropdownMode="select" // select type dropdown
                            onChange={(date) => {
                                if (date) {
                                    const formatted = date.toISOString().split('T')[0];
                                    setStudent((prev) => ({ ...prev, date_of_birth: formatted }));
                                }
                            }}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            required
                        />
                    </div>

                    {/* <input name="gender" value={student.gender}
                        onChange={handleTopChange} placeholder="Gender" className="border p-2" /> */}

                    <select
                        name="gender"
                        value={student.gender}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input
                        name="registration"
                        type='number'
                        value={student.registration}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,12}$/.test(value)) {
                                handleTopChange(e);
                            }
                        }}
                        placeholder="Registration"
                        className="border p-2"
                    />

                    {/* <input name="course_name" value={student.course_name}
                        onChange={handleTopChange} placeholder="Course" className="border p-2" /> */}

                    <select
                        name="course_name"
                        value={student.course_name}
                        onChange={(e) => {
                            handleTopChange(e);
                            handleSelectCourse(e);
                        }}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" selected disabled>Select Course</option>
                        {
                            courses?.map(course =>
                                <option value={course.course_name}>
                                    {course.course_name}
                                </option>
                            )
                        }

                    </select>

                    {/* <input name="name_of_industry" value={student.name_of_industry}
                        onChange={handleTopChange} placeholder="Institute" className="border p-2" /> */}

                    <select
                        name="name_of_industry"
                        value={student.name_of_industry}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" selected disabled>Select Institute</option>
                        {
                            institutes?.map(course =>
                                <option>
                                    {course.name}
                                </option>
                            )
                        }

                    </select>

                    {/* <input name="department" value={student.department}
                        onChange={handleTopChange} placeholder="Department" className="border p-2" /> */}


                    <select
                        name="department"
                        value={student.department}
                        onChange={handleTopChange}
                        disabled={!selectCourse}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" selected disabled>Select Department</option>
                        {
                            selectCourse?.map(dept =>
                                <option value={dept.name}>
                                    {dept.name}
                                </option>
                            )
                        }

                    </select>




                    {/* <input name="regulation" value={student.regulation}
                        onChange={handleTopChange} placeholder="Regulation" className="border p-2" /> */}

                    <select
                        name="regulation"
                        value={student.regulation}
                        onChange={(e) => {
                            handleTopChange(e);
                            handleSelectRegulation(e);
                        }}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" disabled>Select Regulation</option>
                        {
                            regulations?.map(reg => <>
                                <option value={reg.regulation}>{reg.regulation}</option>
                            </>)
                        }
                    </select>

                    {/* <input name="session" value={student.session}
                        onChange={handleTopChange} placeholder="Session" className="border p-2" /> */}



                    <select
                        name="session"
                        value={student.session}
                        onChange={handleTopChange}
                        className="border p-2 bg-gray-900"
                    >
                        <option value="" disabled>Select Session</option>
                        {
                            selectRegulation?.map(ses => <>
                            
                                <option value={ses}>{ses}</option>
                            </>)
                        }
                    </select>
                </div>


                {student.semesters.map((sem, sIdx) => (
                    <div key={sIdx} className="border p-3 rounded">
                        <div className="flex justify-between items-center mb-2">
                            <strong>{sem.semester_name || `Semester ${sIdx + 1}`}</strong>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => addSubject(sIdx)}
                                    className="px-2 py-1 border rounded">+Sub</button>
                                {student.semesters.length > 1 && <button type="button"
                                    onClick={() => removeSemester(sIdx)} className="px-2 py-1 border rounded">Remove Sem</button>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {/* <input name="semester_name" value={sem.semester_name}
                                onChange={(e) => handleSemesterChange(sIdx, e)} placeholder="Semester name"
                                className="border p-2" /> */}

                            <select
                                name="semester_name"
                                value={sem.semester_name}
                                onChange={(e) => handleSemesterChange(sIdx, e)}
                                className="border p-2 bg-gray-900"
                            >
                                <option value="" selected disabled>Select Semester</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                            </select>

                            {/* <input
                                name="result"
                                value={sem.result}
                                onChange={(e) => {
                                    let value = parseFloat(e.target.value);

                                    // Limit to 2 decimal places
                                    value = Math.floor(value * 100) / 100;
                                    handleSemesterChange(sIdx, e)
                                }}
                                placeholder="GPA"
                                type="number"
                                step="0.01"
                                min={0}
                                max={4}
                                className="border p-2 number" /> */}

                            <select
                                name="result"
                                value={sem.result}
                                onChange={(e) => handleSemesterChange(sIdx, e)}
                                className="border p-2 bg-gray-900"
                            >
                                <option value=""></option>
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
                                    <input name="subject_code" value={sub.subject_code}
                                        onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Code"
                                        className="border p-2" />
                                    <input name="subject_name" value={sub.subject_name}
                                        onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Name"
                                        className="border p-2 col-span-2" />
                                    <input name="theory_marks" value={sub.theory_marks}
                                        onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Theory"
                                        type="number" className="border p-2" />
                                    <input name="practical_marks" value={sub.practical_marks}
                                        onChange={(e) => handleSubjectChange(sIdx, subIdx, e)} placeholder="Practical"
                                        type="number" className="border p-2" />
                                    <button type="button" onClick={() => removeSubject(sIdx,
                                        subIdx)} className="px-2 py-1 border rounded">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


                <div className="flex gap-2">
                    <button type="button" onClick={() => setStudent(prev => ({
                        ...prev,
                        semesters: [...prev.semesters, emptySemester()]
                    }))}
                        className="px-3 py-2 border rounded">Add Sem</button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Create</button>
                    <input type="text" placeholder="Roll to update" value={rollToUpdate}
                        onChange={(e) => setRollToUpdate(e.target.value)} className="border px-2 py-1" /
                    >
                    <button type="button" onClick={handleUpdate} className="px-4 py-2 bgyellow-600 text-white rounded">Update by Roll</button>
                </div>
            </form>
            <hr className="my-4" />
            <h3 className="font-semibold mb-2">Or paste full JSON</h3>
            <textarea value={jsonInput} onChange={(e) =>
                setJsonInput(e.target.value)} className="w-full h-48 border p-2"
                placeholder="Paste full student JSON (object or array)" />
            <div className="flex gap-2 mt-2">
                <button onClick={handleUploadJson} className="px-4 py-2 bg-blue-600 text-white rounded">Upload JSON</button>
            </div>
            {message && <div className="mt-4 p-2 border rounded">{message}</div>}
        </div>
    );
}

export default Upload

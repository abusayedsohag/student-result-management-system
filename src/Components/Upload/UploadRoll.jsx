import { useState } from "react";




const UploadRoll = () => {

    const [roll, setRoll] = useState("")

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
                    isPast: sem.subjects?.some(
                        sub => sub.theory_marks > 0 || sub.practical_marks > 0
                    )
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


    return (
        <div>
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
        </div>
    )


}

export default UploadRoll
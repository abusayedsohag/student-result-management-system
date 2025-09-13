import { createContext, useState } from "react";
import dataInfo from "../../src/assets/info/studentFull.json"

export const MainContext = createContext(null)

const Context = ({ children }) => {

    // const student = data.students
    const student = dataInfo

    const [result, setResult] = useState(null);    

    const searchinfo = (course, regulation, roll) => {
        // const result = student.find(st => st.personal_data.roll === roll)

        const results = student.find(st =>
            String(st.course_name) === String(course) &&
            String(st.regulation) === String(regulation) &&
            String(st.roll) === String(roll)
        );
        setResult(results)
        return results
    }

    const info = {
        searchinfo,
        result,
        student
    }


    return (
        <MainContext.Provider value={info}>
            {children}
        </MainContext.Provider>
    );
};

export default Context;
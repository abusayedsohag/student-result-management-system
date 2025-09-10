import { createContext, useState } from "react";
import data from "../../src/assets/info/stinfo.json"
import subjects from "../../src/assets/info/type.json"

export const MainContext = createContext(null)

const Context = ({children}) => {

    const student = data.students

    const [result, setResult] = useState(null);

    const searchinfo = (roll) => {
        const result = student.find(st => st.personal_data.roll === roll)
        if (result) {
            setResult(result)
        } else {
            setResult(401)
        }
    }

    const info = {
        searchinfo,
        result
    }


    return (
        <MainContext.Provider value={info}>
            {children}
        </MainContext.Provider>
    );
};

export default Context;
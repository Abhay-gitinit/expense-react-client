import { useState } from "react"

function Student4 () {
    const [visible, setVisible] = useState(true);
    const [buttonText,setButtonText] =  useState(true);
    const studentList = [
        {name: "Tommy", RollNumber:1},
        {name: "Sommy", RollNumber:2},
        {name: "Mommy", RollNumber:3},
    ];

    const handleClick = () => {
        setVisible(() => {
            setButtonText(!visible ? "Hide Students " : "Show Students " );
            return !visible;
        })
    };

    return (
    <div>
        <button onClick={handleClick}>{buttonText}</button>
        
        {visible && (
            <>
                {studentList.map ((s)  => (
                    <p>
                        Roll Number:{s.RollNumber}
                        <br/>
                        Name: {s.name}
                    </p>
                ))}
            </>
        )}
    </div>
  );
}

export default Student4
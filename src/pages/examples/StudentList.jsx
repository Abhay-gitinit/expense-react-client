import Student3 from "./Student3";

function StudentList({students}) {

    return (
        <>
            <h2>Student List</h2>
            <p>
                {students.map((student, index) => {
                    <Student3 
                        key={index}
                        name= {student.name}
                        rollNumber={student.rollNumber}
                        percentage={student.percentage}
                    />
                })}
            </p>
        </>
    );
}

export default StudentList;
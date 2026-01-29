function ProductList({students}) {
    const filteredStudents = students.filter(student => {
        return student.percentage > 33.0;
    });
    return (
        <>
            <h2>Passed Student List</h2>
            <p>
                {filteredStudents.map((student, index) => {
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

export default ProductList;
function Login() {
    const {formData,setFormData} =useState({
        email: '',
        password: ''
    });

    const handleChange =(e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate =() =>{
        let newwErrors = {};
        let isValid = true;

        if(formDataData.email.length === 0) {
            newwErrors.mail ="Email is required";
            isValid= false;
        }

        return isValid;
    }
    
    const handleFormSubmit =(e) =>{
        e.preventDefault();
    }
    
    return (
        <div className="container text-center">
            <h3>Login to continue</h3>

            <form>
                <div>
                    <label>Email:</label>
                    <input className="form-control" type='text' name="email" onChange={handleChange} />
                </div>

                <div>
                    <label>Password:</label>
                    <input className="form-control" type ='password' name="password" onChange={handleChange} />
                </div>

                <div>
                    <button className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>
    );
}

export default Login;
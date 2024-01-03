import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";

function EmpForm() {
    const navigate = useNavigate();
    const [country, setcountry] = useState([]);
    const [countryinfo, setcountryinfo] = useState('India');
    const [formErrors, setFormErrors] = useState({});
    // const [values,setvalues]=useState({username:'',password:'',fullname:'',gender:'',email:'',contactNo:'',address:'',country:''});


    const userValidate = yup.object().shape({
        name: yup.string().required('Username is required'),
        password: yup.string().min(3).max(7).required('Password is required'),
        fullname: yup.string().required('Fullname is required'),
        email: yup.string().email().required('Email is required'),
        gender: yup.string().required('Gender is required').oneOf(['male', 'female'], 'Invalid gender value'),
        contact: yup.string().required('Contact Number is required'),
        address: yup.string().required('Address is required'),
        country: yup.string().required('Country is required')
    });
    const formSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        let formData = {
            name: e.target.elements.name.value,
            password: e.target.elements.password.value,
            fullname: e.target.elements.fullname.value,
            email: e.target.elements.email.value,
            contact: e.target.elements.contact.value,
            country: e.target.elements.country.value,
            address: e.target.elements.address.value,
            gender: e.target.elements.gender.value

        };
        try {
            // console.log(formData);
            await userValidate.validate(formData, { abortEarly: false });


            const data = {
                userName: document.getElementById('name').value,
                password: document.getElementById('password').value,
                fullName: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                contactNo: document.getElementById('contact').value,
                country: document.getElementById('country').value,
                address: document.getElementById('address').value,
                gender: document.getElementById('male').checked ? "male" : document.getElementById('female').checked ? "female" : ''
            };

            registerdata(data);
        }
        catch (error) {
            const errors = {};
            // console.log(error);

            error.inner.forEach(err => {
                errors[err.path] = err.message;
            });
            setFormErrors(errors);
            // console.error(errors); 

            console.log("Error: All input fields are mandatory");
        }




    }


    const registerdata = (values) => {

        axios.post('https://gcrudapi.azurewebsites.net/api/User', values).then((response) => {
            //    console.log(response);
            navigate('/')
        })

    }


    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=name,flags`).then((response) => {
            setcountry(response.data);
            

        })

    }, [])

    function handleCountryChange(e) {
        setcountryinfo(e.target.value);
    }




    return (
        <div className="offset-lg-3 col-lg-6 mt-5">
            <form className="container" onSubmit={(event) => formSubmit(event)}>
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center">User Registration</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>username <span className="errmsg">*</span></label>
                                    <input type="text" id="name" className="form-control"></input>
                                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}

                                </div>
                            </div>



                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input type="password" id="password" className="form-control"></input>
                                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}

                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Fullname<span className="errmsg">*</span></label>
                                    <input type="text" id="fullname" className="form-control"></input>
                                    {formErrors.fullname && <span className="error-message">{formErrors.fullname}</span>}

                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input type="email" id="email" className="form-control"></input>
                                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}

                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Contact Number<span className="errmsg">*</span></label>
                                    <input className="form-control" id="contact"></input>
                                    {formErrors.contact && <span className="error-message">{formErrors.contact}</span>}

                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Country<span className="errmsg">*</span></label>
                                    <select className="form-control" id="country" value={countryinfo} onChange={(e) => handleCountryChange(e)}>
                                        {country.map((info) => (
                                            <option key={info.name.common}>
                                                {info.name.common}
                                            </option>


                                        ))
                                        }
                                    </select>


                                </div>
                                {formErrors.country && <span className="error-message">{formErrors.country}</span>}

                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Address<span className="errmsg">*</span></label>
                                    <textarea id="address" className="form-control textarea"></textarea>
                                    {formErrors.address && <span className="error-message">{formErrors.address}</span>}

                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <br></br>
                                    <input type="radio" id="male" name="gender" value="male" className="app-check"></input>
                                    <label className="radio-font">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" className="app-check"></input>
                                    <label className="radio-font">Female</label>
                                </div>
                                {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}

                            </div>

                        </div>
                    </div>

                    <div className="card-footer text-center">
                        <button type="submit" className="btn btn-primary me-4">Register</button>
                        <Link to="/" className="btn btn-danger">Back</Link>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default EmpForm;
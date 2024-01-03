import axios from "axios";
import * as yup from 'yup';
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function EmpEdit() {
    const navigate = useNavigate();
    const [details,setdetails] = useState(null);
    const [gender,setgender] = useState('');
    const [country,setcountry] = useState([]);
    const [countryinfo,setcountryinfo] = useState('');
    const [errors,setformerrors] = useState({});

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


    const { userName } = useParams();
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=name,flags`).then((response) => {
            setcountry(response.data);
            

        })



    }, [])


    useEffect(() => {
        axios.get(`https://gcrudapi.azurewebsites.net/api/User/${userName}`).then((response) => {
            console.log(response.data.gender);
            setdetails(response.data);
        
            setgender(response.data.gender);
            console.log(gender);
            
            setcountryinfo(response.data.country);
            
            
        })
       

    },[userName])

    // function Changetext (e){
    //   setdetails(e.target.value);
    // }


    function changeValue(e) {
        setdetails(e.target.value);

    }


    function changecountry(e) {
        setcountryinfo(e.target.value);
        // console.log(e.target.value);
    }

    function changegender(e) {
        setgender(e.target.value);

    }


    const submitData = async (e) => {
        e.preventDefault();


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

            editData(data);
        }

        catch (err) {
            const errors = {};
            err.inner.forEach(err => {
                errors[err.path] = err.message;
            })

            setformerrors(errors);
        }
    }


    function editData(values) {
        axios.put(`https://gcrudapi.azurewebsites.net/api/User`, values).then((response) => {
            console.log(response.data);
            navigate('/');
        })
    }





    return (
        <div className="offset-lg-3 col-lg-6 mt-5">
            <form className="container" onSubmit={(event) => submitData(event)}>
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center">User Registration</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>username <span className="errmsg">*</span></label>
                                    <input type="text" id="name" value={details?.userName} className="form-control"></input>
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>
                            </div>



                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input type="password" id="password" value={details?.password} onChange={changeValue} className="form-control"></input>
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Fullname<span className="errmsg">*</span></label>
                                    <input type="text" id="fullname" value={details?.fullName} onChange={changeValue} className="form-control"></input>
                                    {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input type="email" id="email" value={details?.email} onChange={changeValue} className="form-control"></input>
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Contact Number<span className="errmsg">*</span></label>
                                    <input className="form-control" value={details?.contactNo} onChange={changeValue} id="contact"></input>
                                    {errors.contact && <span className="error-message">{errors.contact}</span>}
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Country<span className="errmsg">*</span></label>
                                    <select className="form-control" value={details?.country} onChange={changecountry} id="country">

                                        {country.map((info) => (
                                            <option key={info.name.common} value={info.name.common}>
                                                {info.name.common}
                                            </option>


                                        ))
                                        }


                                    </select>
                                    {errors.country && <span className="error-message">{errors.country}</span>}

                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Address<span className="errmsg">*</span></label>
                                    <textarea id="address" value={details?.address} onChange={changeValue} className="form-control textarea"></textarea>
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <br></br>
                                    <input type="radio" id="male" name="gender" value="male" checked={gender === "Male"} onChange={changegender} className="app-check"></input>
                                    <label className="radio-font">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={changegender} className="app-check"></input>
                                    <label className="radio-font">Female</label>
                                </div>
                                {errors.gender && <span className="error-message">{errors.gender}</span>}
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

export default EmpEdit;
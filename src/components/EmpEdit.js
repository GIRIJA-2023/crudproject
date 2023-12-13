import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Empedit(){
    const navigate = useNavigate();
     const [details,setdetails]=useState(null);
    const [gender,setgender]=useState('');
    const [country,setcountry]=useState('');
     
     
    const {userName}=useParams();

    useEffect(()=>{
        axios.get(`https://gcrudapi.azurewebsites.net/api/User/${userName}`).then((response)=>{
            setdetails(response.data);
        
        })
    
    },[])

// function Changetext (e){
//   setdetails(e.target.value);
// }


function changeValue(e) {
  setdetails(e.target.value);

}


function changecountry(e){
    setcountry(e.target.value);
}

function changegender(e){
    setgender(e.target.value);
}
  

function submitData(e){
e.preventDefault();
    const data= {
        userName: document.getElementById('name').value,
        password:document.getElementById('password').value,
        fullName:document.getElementById('fullname').value,
        email:document.getElementById('email').value,
        contactNo:document.getElementById('contact').value,
        country: document.getElementById('country').value,
        address: document.getElementById('address').value,
        gender:document.getElementById('male').checked? "Male":document.getElementById('female').checked?"female":''
        
     }

     editData(data);
}


function editData(values){
       axios.put(`https://gcrudapi.azurewebsites.net/api/User`,values).then((response)=>{
             console.log(response.data);
             navigate('/');
       })
}



 

    return (
        <div className="offset-lg-3 col-lg-6 mt-5">
            <form className="container" onSubmit={(event)=>submitData(event)}>
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center">User Registration</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>username <span className="errmsg">*</span></label>
                                    <input type="text" id="name"  value={details?.userName}  className="form-control"></input>
                                </div>
                            </div>



                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input type="password" id="password" value={details?.password}  onChange={changeValue} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Fullname<span className="errmsg">*</span></label>
                                    <input type="text" id="fullname" value={details?.fullName} onChange={changeValue}  className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input type="email" id="email" value={details?.email} onChange={changeValue} className="form-control"></input>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Contact Number<span className="errmsg">*</span></label>
                                    <input className="form-control" value={details?.contactNo} onChange={changeValue}   id="contact"></input>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Country<span className="errmsg">*</span></label>
                                    <select className="form-control" value={details?.country}  onChange={changecountry}  id="country">
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                    </select>

                                </div>
                            </div>

                            <div className="col-lg-6 mb-2">
                                <div className="form-group">
                                    <label>Address<span className="errmsg">*</span></label>
                                    <textarea id="address" value={details?.address} onChange={changeValue} className="form-control textarea"></textarea>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <br></br>
                                    <input type="radio" id="male" name="gender" value="male" checked={gender=="male"}  onChange={changegender}   className="app-check"></input>
                                    <label className="radio-font">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" checked={gender=="female"}  onChange={changegender}    className="app-check"></input>
                                    <label className="radio-font">Female</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card-footer text-center">
                        <button type="submit" className="btn btn-primary me-4">Register</button>
                        <a class="btn btn-danger">Back</a>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default Empedit;
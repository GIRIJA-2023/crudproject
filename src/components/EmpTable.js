import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function EmpTable() {
    const [employee, empdata] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get('https://gcrudapi.azurewebsites.net/api/User').then((response) => {
            empdata(response.data);

        })
        // console.log(employee);
    }, [])


    const removedata = (removeitem) => {
        axios.delete(`https://gcrudapi.azurewebsites.net/api/User/${removeitem}`).then((response) => {
            console.log(response);
            window.location.reload();
        })


    }

    const editdata = (edititem) => {
        navigate(`/EmpEdit/${edititem}`);
    }





    return (
        <div className="container-fluid mt-3">


            {/* <div className="container-fluid mt-3 text-center"> */}
            <h2 className="text-center">Employee Listing</h2>
            {/* </div> */}



            <Link to="/EmpForm" className="btn btn-success">Add New(+)</Link>
            <table className="table table-bordered mt-2">

                <thead className="table-dark text-light">
                    <tr className="text-center">
                        <td>Username</td>
                        <td>Password</td>
                        <td>Fullname</td>
                        <td>Gender</td>
                        <td>Email</td>
                        <td>Contact</td>
                        <td>Address</td>
                        <td>Country</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>

                    {
                        employee && employee.map((value, i) => (
                            <tr className="text-center" key={i}>
                                <td>{value.userName}</td>
                                <td>{value.password}</td>
                                <td>{value.fullName}</td>
                                <td>{value.gender}</td>
                                <td>{value.email}</td>
                                <td>{value.contactNo}</td>
                                <td>{value.address}</td>
                                <td>{value.country}</td>
                                <td className="text-center">
                                    <a className="btn btn-success me-3 mb-2" onClick={() => editdata(value.userName)}>Edit</a>
                                    <a className="btn btn-danger me-3" onClick={() => removedata(value.userName)}>Remove</a>
                                </td>
                            </tr>
                        ))

                    }

                </tbody>
            </table>


        </div>
    )
}

export default EmpTable;
import React, {useRef, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import "./CreateUserPopup.scss";
import closePopup from "../../assets/img/close_popup.svg"
import {createUser} from "../../actions/user";

const CreateUserPopup = ({closeUserPopup}) => {

    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        desc: ""
    }); //It's not advisable, instead should use useReducer

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(() => {
       inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(createUser(newUser));

            closeUserPopup();
        } catch (error) {
            console.error(error.message);
        }
    }

    console.log("New User", newUser);

    return (
       <div className="form-container">
           <form className="form" onSubmit={handleSubmit}>
               <div className="form-header">
                   <span>Create User</span>
                   <img onClick={closeUserPopup} className="close-popup" src={closePopup} alt="close popup"/>
               </div>
               <div className="form-group">
                   <input ref={inputRef} type="text" name="name" value={newUser.name} onChange={handleChange} />
                   <label htmlFor="name">Name</label>
               </div>
               <div className="form-group">
                   <input id="surname" type="text" name="surname" value={newUser.surname} onChange={handleChange} />
                   <label htmlFor="surname">Surname</label>
               </div>
               <div className="form-group">
                   <textarea id="description" name="desc" value={newUser.desc} onChange={handleChange} />
                   <label htmlFor="description">Description</label>
               </div>
               <button className="btn-submit" type="submit">Submit</button>
           </form>
       </div>
    )
};

export default CreateUserPopup;
import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import md5 from "md5";
import "./User.scss";
import edit from "../../assets/img/edit.svg";
import deleteUser from "../../assets/img/removeUser.svg";
import closeIcon from "../../assets/img/close_icon.svg";
import spinner from "../../assets/img/spinner.gif";
import {editUserRedux, getUsers, removeUserRedux} from "../../actions/user";

const User = ({user: {id, name, surname, desc}}) => {

    const [editUser, setEditUser] = useState(false);

    const [filteredUser, setFilteredUser] = useState("");

    const users = useSelector(state => state.user.users);

    const loading = useSelector(state => state.user.loading);

    const dispatch = useDispatch();

    const toggleEdit = (userId) => {
        setEditUser(true)

        const user = users.find(user => user.id === userId);

        inputRef.current.focus();

        return setFilteredUser(user)
    }

    const inputRef = useRef();

    const handleChange = (e) => {
        setFilteredUser({...filteredUser, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editUserRedux(filteredUser));

            await dispatch(getUsers());
            setEditUser(false)
        } catch (error) {
            console.error(error.message)
        }
        
    }

    const removeUser = async (id) => {
        try {
            await dispatch(removeUserRedux(id));
        } catch (error) {
            console.log(error.message)
        }
    }

    console.log("User from state", filteredUser);

    return (
        <div className={editUser ? "user-container edit" : "user-container"}>
            <div className="user-inner">
            <div className="user-front-side">
            <img className="avatar" src={`http://gravatar.com/avatar/${md5(name + surname)}?d=identicon`} alt=""/>
            <div className="user-name">
               <h1>Name: <span>{name}</span></h1>
            </div>
           <div className="user-surname">
               <h1>Surname: <span>{surname}</span></h1>
           </div>
            <div className="user-description">
                <h3>Description: <span>{desc}</span></h3>
            </div>
            <div className="user-properties">
                <span onClick={() => toggleEdit(id)} className="user-edit">
                    <img src={edit} alt="edit"/>
                </span>
                <span onClick={() => removeUser(id)} className="user-delete">
                    <img src={deleteUser} alt="delete"/>
                </span>
            </div>
            </div>
            <div className="user-back-side">
                    <span onClick={() => setEditUser(false)} className="close-icon">
                        <img src={closeIcon} alt="close icon"/>
                    </span>
                    {loading ? (<img src={spinner} alt="spinner" />) : (
                        <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" ref={inputRef} type="text" name="name" value={filteredUser.name || ""} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input id="surname" type="text" name="surname" value={filteredUser.surname || ""} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                             <label htmlFor="description">Description</label>
                            <input id="description" type="text" name="desc" value={filteredUser.desc || ""} onChange={handleChange} />
                        </div>
                        
                        <button className="edit-button" type="submit">Edit</button>
                    </form>
                    )}
            </div>
          </div>
        </div>
    )
}

export default User;
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './App.scss';
import {getUsers} from "./actions/user";
import addUser from "./assets/img/add_user.png";

//Components
import UserList from "./components/UsersList";
import Pagination from "./components/Pagination";
import CreateUserPopup from "./components/CreateUserPopup";

function App() {
  const users = useSelector(state => state.user.users);

  const [triggerUserPopup, setTriggerUserPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUsers());
      // eslint-disable-next-line
  }, []);

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const createUser = () => {
      setTriggerUserPopup(true);
  }

  console.log("User popup", triggerUserPopup);


  return (
    <div className="App">
      <UserList 
         users={currentUsers}
       />
      <Pagination
         paginate = {paginate}
         totalUsers = {users.length}
         usersPerPage = {usersPerPage}
       />
       <div onClick={createUser} className="add-button">
           <img src={addUser} alt="add user"/>
       </div>

       {triggerUserPopup && <CreateUserPopup closeUserPopup={() => setTriggerUserPopup(false)} />}
    </div>
  );
}

export default App;

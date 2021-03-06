import React from "react";
import "./UsersList.scss";

import User from "../User";

const UsersList = ({users}) => {
    return (
      users.map(user => (
          <User key={user.id} user={user} />
      ))
    )
}

export default UsersList;
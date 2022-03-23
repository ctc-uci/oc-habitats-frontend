import React, { useState } from 'react';
import {
  FormControl,
  Image,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Flex,
  Link,
  Center,
} from '@chakra-ui/react';
import { sendInviteLink } from '../utils/auth_utils';

const AdminInvite = () => {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [role, setRole] = useState();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await sendInviteLink(email, role);
      setConfirmationMessage(`A reset password email has been sent to ${email}`);
      setErrorMessage('');
      setEmail('');
      setRole('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Invite New User</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <FormControl>
          <FormLabel htmlFor="role">Role</FormLabel>
          <select id="role" onChange={e => setRole(e.target.value)} value={role} maxW="700px">
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="volunteer" selected>
              Volunteer
            </option>
          </select>
        </FormControl>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Send Email
        </button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default AdminInvite;

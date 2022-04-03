import React, { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { initiateInviteProcess } from '../../utils/auth_utils';

const AdminInvite = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [role, setRole] = useState('volunteer');

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await initiateInviteProcess(firstName, lastName, email, role);
      setConfirmationMessage(`An invite email has been sent to ${email}`);
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
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
          placeholder="First Name"
        />
        <br />
        <input
          type="text"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
          placeholder="Last Name"
        />
        <br />
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <FormControl>
          <FormLabel htmlFor="role">Role</FormLabel>
          <select
            id="role"
            onChange={e => setRole(e.target.value)}
            value={role}
            maxW="700px"
            defaultValue="volunteer"
          >
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="volunteer">Volunteer</option>
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

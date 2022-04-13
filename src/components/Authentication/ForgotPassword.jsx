import React, { useState } from 'react';
import { sendPasswordReset } from '../../common/auth_utils';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const handleForgotPassword = async e => {
    try {
      e.preventDefault();
      await sendPasswordReset(email);
      setConfirmationMessage(
        'If the email entered is associated with an account, you should receive an email to reset your password shortly.',
      );
      setErrorMessage('');
      setEmail('');
    } catch (err) {
      setErrorMessage(`Sorry! We couldn't find an account associated with the email ${email}.`);
    }
  };
  return (
    <div>
      <h2>Send Reset Email</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <button type="submit">Send Email</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
      <a href="/">Back to Login</a>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ForgotPassword;

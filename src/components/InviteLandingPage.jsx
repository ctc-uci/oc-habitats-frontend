import React, { useState } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { PropTypes, instanceOf } from 'prop-types';
import Register from './register/register';
import { NPOBackend } from '../utils/auth_utils';
import { Cookies, withCookies } from '../utils/cookie_utils';

const InviteLandingPage = () => {
  const [invite, setInvite] = useState();
  const [validInvite, setValidInvite] = useState(true);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState();
  const { search } = useLocation();
  const { inviteID } = useParams();

  const retrieveInvite = async id => {
    console.log('retrieveInvite() called in InviteLandingPage');
    const foundInvite = await NPOBackend.get(`/adminInvite/${id}`);
    console.log('foundInvite looks like:');
    console.log(foundInvite);
    if (!inviteID || !foundInvite || !foundInvite.data) {
      setValidInvite(false);
    } else if (JSON.stringify(foundInvite.expireDate) < JSON.stringify(Date())) {
      setValidInvite(false);
    } else {
      console.log('setting fname, lname, email, and role in state');
      setFirstName(foundInvite.data.firstName);
      setLastName(foundInvite.data.lastName);
      setEmail(foundInvite.data.email);
      setRole(foundInvite.data.role);
    }
  };

  const useEffect = async () => {
    setIsLoading(true);
    retrieveInvite(inviteID);
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>LOADING...</p>;
  }

  if (validInvite) {
    return (
      <div>
        <p>
          {firstName} . {lastName} . {email} . {role}
        </p>
        <Register
          inviteFirstName={firstName}
          inviteLastName={lastName}
          inviteEmail={email}
          inviteRole={role}
        />
      </div>
    );
  }

  return <p>Invalid invite code</p>;
};

export default InviteLandingPage;

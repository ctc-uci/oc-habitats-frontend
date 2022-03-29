import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import { PropTypes, instanceOf } from 'prop-types';
import Register from './register/register';
import { NPOBackend } from '../utils/auth_utils';
import { Cookies, withCookies } from '../utils/cookie_utils';

const InviteLandingPage = () => {
  const [invite, setInvite] = useState();
  const [error, setError] = useState();
  const [validInvite, setValidInvite] = useState(true);
  // const [lastName, setLastName] = useState();
  // const [email, setEmail] = useState();
  // const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const { inviteID } = useParams();

  const checkInviteValidity = async id => {
    const foundInvite = await NPOBackend.get(`/adminInvite/${id}`);
    setInvite(foundInvite.data);
    console.log(`foundInvite: ${JSON.stringify(foundInvite, null, 2)}`);
    if (!inviteID || !foundInvite || !foundInvite.data) {
      setError('nonexistent invite');
      setValidInvite(false);
    } else if (JSON.stringify(foundInvite.expireDate) < JSON.stringify(Date())) {
      setError('expired invite');
      setValidInvite(false);
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    checkInviteValidity(inviteID);
  }, []);

  if (isLoading) {
    return <p>LOADING...</p>;
  }

  if (validInvite) {
    return (
      <div>
        {isLoading ? (
          <p>LOADING...</p>
        ) : (
          <Register
            inviteFirstName={invite.firstName}
            inviteLastName={invite.lastName}
            inviteEmail={invite.email}
            inviteRole={invite.role}
          />
        )}
      </div>
    );
  }

  return <p>Invalid invite code: {error}</p>;
};

export default InviteLandingPage;

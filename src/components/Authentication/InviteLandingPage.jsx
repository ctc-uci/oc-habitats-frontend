import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Register from './Register';
import { OCHBackend } from '../../common/utils';

const InviteLandingPage = () => {
  const [invite, setInvite] = useState();
  const [error, setError] = useState();
  const [validInvite, setValidInvite] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { inviteID } = useParams();

  const checkInviteValidity = async id => {
    const foundInvite = await OCHBackend.get(`/adminInvite/${id}`);
    setInvite(foundInvite.data);
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

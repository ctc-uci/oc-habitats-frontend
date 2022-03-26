import React from 'react';
import PropTypes from 'prop-types';
import { Email, Item, A } from 'react-html-email';

const AdminInviteEmail = ({ name, url }) => {
  return (
    <Email>
      <Item>
        Hi {name}, follow this link to finish setting up your new account: <A>{url}</A>
      </Item>
    </Email>
  );
};

AdminInviteEmail.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AdminInviteEmail;

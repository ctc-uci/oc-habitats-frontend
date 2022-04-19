/* eslint-disable global-require */
/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types';
import React from 'react';
import { Email, Image, Item } from 'react-html-email';
import OCHLogo from '../../../common/OCHLogo';

const AdminInviteEmail = ({ role, url }) => {
  return (
    <Email title="">
      <Image src={OCHLogo} w="346px" h="105px" alt="OC Habitats Logo" />
      <Item>
        <h1>{`Hello OC Habitats ${role === 'volunteer' ? 'Monitor' : 'Administrator'}!`}</h1>
      </Item>
      <Item>
        <p>
          An OC Habitats administrator has requested to grant you access to the OC Habitats Digital
          Monitor Log system. To complete your registration, you will need to enter your first and
          last name, and create a password.
        </p>
      </Item>
      <Item>
        <strong>
          Please click the link below to finish the account creation process on the OCH Habitats
          Digital Monitor Log website.
        </strong>
      </Item>
      <Item>
        <a href={`http://${url}`}>OC Habitats Digital Monitor Log site</a>
        {/* <Button bgColor="ochBlue" w="410px" h="45px">
              Finish Account Creation
            </Button> */}
      </Item>
    </Email>
  );
};

AdminInviteEmail.propTypes = {
  role: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AdminInviteEmail;

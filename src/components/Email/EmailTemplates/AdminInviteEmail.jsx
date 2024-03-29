/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React from 'react';
import { Email, Item } from 'react-html-email';

const AdminInviteEmail = ({ role, url }) => {
  return (
    <div>
      <Email title="">
        <img
          src={require('../../../assets/OCH_Logo_SVG.svg').default}
          w="346px"
          h="105px"
          alt="OC Habitats Logo"
        />
        <Item>
          <h1>{`Hello OC Habitats ${role === 'volunteer' ? 'Monitor' : 'Administrator'}!`}</h1>
        </Item>
        <Item>
          <p>
            An OC Habitats administrator has requested to grant you access to the OC Habitats
            Digital Monitor Log system. To complete your registration, you will need to enter your
            first and last name, and create a password.
          </p>
        </Item>
        <Item>
          <strong>
            Please click the link below to finish the account creation process on the OCH Habitats
            Digital Monitor Log website.
          </strong>
        </Item>
        <Item>
          <a href={`${url}`}>OC Habitats Digital Monitor Log site</a>
          {/* <Button bgColor="ochBlue" w="410px" h="45px">
              Finish Account Creation
            </Button> */}
        </Item>
      </Email>
    </div>
  );
};

AdminInviteEmail.propTypes = {
  role: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AdminInviteEmail;

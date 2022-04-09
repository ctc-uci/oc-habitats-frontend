/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { Email, Item, Image } from 'react-html-email';
import { Button, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import OCHLogo from '../../../assets/OCHlogo.png';

const AdminInviteEmail = ({ role, url }) => {
  return (
    <div>
      <Email title="">
        <img src={OCHLogo} alt="OC Habitats logo" width="346" height="105" />
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
          <a href={url} target="_blank">
            {url}
          </a>
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

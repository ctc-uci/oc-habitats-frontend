import React from 'react';
import PropTypes from 'prop-types';
import { Email, Item, Image, A } from 'react-html-email';
import { Button } from '@chakra-ui/react';

import OCHLogo from '../../../assets/OCHlogo.png';

const AdminInviteEmail = ({ role, url }) => {
  return (
    <div>
      <Email>
        <Image src={OCHLogo} />
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
          <A href={url}>
            <Button bgColor="ochBlue">Finish Account Creation</Button>
          </A>
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

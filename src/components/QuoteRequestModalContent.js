import React, { useState } from 'react';
import { Box, Typography, Switch } from '@material-ui/core';
import Input from './Input';
import HomeIcon from '../assets/Icons/Settings/Home';

const QuoteRequestModal = ({}) => {
  const [isFirstReq, setIsFirstReq] = useState(false); //TO DO: Should be removed when backend will be connected

  const [organizationName, setOrganizationName] = useState('');
  const [organizationAddress, setOrganizationAddress] = useState('');

  return (
    <Box>
      {
        //TO DO: Should be removed when backend will be connected. It uses for displaying 2 state variants of content
        <Switch
          value={isFirstReq}
          onChange={() => {
            setIsFirstReq(!isFirstReq);
          }}
        />
      }
      {isFirstReq ? (
        <>
          <Typography variant="body2">
            Are you sure you want to send request for quote to selected
            suppliers?
          </Typography>
        </>
      ) : (
        <>
          <Box mb={4}>
            <Typography variant="body2">
              Looks like your Organization Settings are incomplete. For a higher
              RFQ response rate, please update your Organization name/Address.
            </Typography>
          </Box>
          <Input
            type="text"
            Icon={null}
            width="large"
            labelText="Organization Name"
            placeholder="Enter your organization name"
            value={organizationName}
            handleChange={(e) => {
              setOrganizationName(e.target.value);
            }}
          />
          <Input
            type="text"
            Icon={HomeIcon}
            width="large"
            labelText="Organization Address"
            placeholder="Enter your organization address"
            value={organizationAddress}
            handleChange={(e) => {
              setOrganizationAddress(e.target.value);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default QuoteRequestModal;

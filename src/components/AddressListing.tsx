'use client';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { map, filter } from 'lodash';
import { ProgressBarLink } from './ProgressBar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteAddressBtn from '@/components/DeleteAddressBtn';
import { Address } from '@/interfaces';

interface AddressListingProps {
  addresses: Address[];
  token: string;
  vipId: number;
}

const AddressListing: React.FC<AddressListingProps> = ({ addresses, token, vipId }) => {
  const [filteredAddress, setFilteredAddress] = useState<Address[]>(addresses);
  const handleAddressList = (addressId: number) => {
    setFilteredAddress((prevAddresses) => filter(prevAddresses, (_, index) => index + 1 !== addressId));
  };
  return (
    <Box>
      {filteredAddress.length > 0 ? (
        map(filteredAddress, (add, index) => (
          <Box className="address__list" key={index}>
            <Box className="address__list-info">
              <Typography gutterBottom variant="h3" component="h2">
                {add.first_name} {add.last_name}
              </Typography>
              <Typography variant="body2">{`${add?.address_line_1}, ${add?.address_line_2}, ${add?.city}, ${add?.state},`}</Typography>
              <Typography variant="body2">{`${add?.country}, ${add?.postcode},`}</Typography>
              <Typography variant="body2">{`${add?.company}, (${add?.phone})`}</Typography>
            </Box>
            <Box className="address__list-action">
              <ProgressBarLink href={`/my-addresses/edit/${index + 1}`}>
                <EditOutlinedIcon />
              </ProgressBarLink>
              <DeleteAddressBtn
                token={token}
                vipId={vipId}
                addressId={index + 1}
                handleAddressList={handleAddressList}
              />
            </Box>
          </Box>
        ))
      ) : (
        <Typography textAlign="center">No Address found</Typography>
      )}
    </Box>
  );
};

export default AddressListing;

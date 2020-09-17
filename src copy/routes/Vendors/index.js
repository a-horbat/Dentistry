import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  useBooleanControls,
  VendorListDocument,
  UpdateVendorDocument,
} from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import 'firebase/auth';
import React, { useState, useMemo } from 'react';
import MainMenu from '../../components/Menu';
import { usePersistentMenuStyles } from '../../components/Menu/usePersistentMenuStyles';
import Nav from '../../components/Nav';
import NavSearch from '../../components/NavSearch';
import { VendorListDisplay } from './List';
import { VendorFilterDrawer, useSelectManyCategoriesControls } from './Filter';
import { SelectOneDrawer } from '../../components/SelectOneDrawer';
import VendorsIcon from '../../components/MenuIcons/Vendors';
import get from 'lodash/get';
import Fuse from 'fuse.js';
import { useHistory } from 'react-router-dom';

const makeVendorIndex = vendors => {
  return new Fuse(vendors, { keys: ['name', 'category'], threshold: 0 });
};

export default ({ menu = <MainMenu /> }) => {
  const history = useHistory();
  const classes = usePersistentMenuStyles();
  const { selected, setSelected, IN } = useSelectManyCategoriesControls();
  const [vendor, selectVendor] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterOpen, filterControls] = useBooleanControls(false);
  const [changeCategoryOpen, changeCategoryControls] = useBooleanControls(
    false,
  );
  const variables = useMemo(
    () =>
      IN.length
        ? {
            filter: {
              category: { IN },
            },
          }
        : {},
    [IN],
  );
  const { data, loading, error } = useQuery(VendorListDocument, {
    variables,
  });
  const [handleUpdateVendor, updateVendor] = useMutation(UpdateVendorDocument);
  const vendors = (data && data.vendorList && data.vendorList.data) || [];
  const categories =
    (data && data.vendorList && data.vendorList.categories) || [];
  const vendorIndex = useMemo(() => makeVendorIndex(vendors), [vendors]);
  const filteredVendors = searchText ? vendorIndex.search(searchText) : vendors;

  const handleChangeCategory = vendor => {
    selectVendor(vendor);
    changeCategoryControls.setTrue();
  };

  const onChangeStatus = async (vendor, status) => {
    console.log('Change vendor status', vendor, status);
    if (vendor && vendor._id && status) {
      await handleUpdateVendor({
        variables: {
          vendorId: vendor._id,
          vendor: {
            status,
          },
        },
      });
    }
  };

  const onChangeCategory = async category => {
    console.log('Change vendor category', vendor, category);
    if (vendor && vendor._id && category) {
      await handleUpdateVendor({
        variables: {
          vendorId: vendor._id,
          vendor: {
            category,
          },
        },
      });
    }
  };

  const onViewInvoices = vendor => history.push(`/?vendorIds=${vendor._id}`);
  const onViewAlerts = vendor =>
    history.push(`/alerts?vendorIds=${vendor._id}`);

  return (
    <Box className={classes.mainContainer}>
      <Nav title="Vendors">
        <NavSearch
          searchText={searchText}
          setSearchText={setSearchText}
          filterOpen={filterOpen}
          filterControls={filterControls}
        />
      </Nav>
      {loading ? (
        <LinearProgress />
      ) : filteredVendors.length ? (
        <VendorListDisplay
          rows={filteredVendors}
          onChangeCategory={handleChangeCategory}
          onChangeStatus={onChangeStatus}
          onViewInvoices={onViewInvoices}
          onViewAlerts={onViewAlerts}
        />
      ) : (
        <Box flexGrow={1} textAlign="center" pt={4}>
          <Typography style={{ color: '#bdbdbd' }}>
            <VendorsIcon style={{ height: 120, width: 120 }} />
          </Typography>
          <Typography>There is nothing here.</Typography>
        </Box>
      )}
      <Hidden mdUp>
        <div style={{ paddingBottom: 120 }} />
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          {menu}
        </div>
      </Hidden>
      <VendorFilterDrawer
        options={categories}
        loading={loading}
        selected={selected}
        setSelected={setSelected}
        open={filterOpen}
        controls={filterControls}
      />
      <SelectOneDrawer
        name="Select New Category"
        options={categories}
        selected={get(vendor, 'category')}
        setSelected={onChangeCategory}
        loading={loading}
        open={changeCategoryOpen}
        controls={changeCategoryControls}
      />
    </Box>
  );
};

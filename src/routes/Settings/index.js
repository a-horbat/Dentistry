import React, { useMemo, useState } from 'react';
import {
  useBooleanControls,
  //FindSuppliersDocument,
  InsertSupplierDocument,
  UpdateSupplierDocument,
  RemoveManySuppliersDocument,
  useOrganizationListQuery,
  OrganizationListDocument,
  UpdateOrganizationDocument,
  UpdatePermissionsDocument,
  InviteUserDocument,
  //FindOrganizationListDocument,
} from '@base86inc/apollo-client';
import {
  PaginationProvider,
  SortProvider,
  SearchProvider,
  SelectedProvider,
  CrudProvider,
  usePagination,
  useSort,
  useSearch,
  //useFindContext,
} from '@elevatejs/material-crud-ui';
import { useMutation } from '@apollo/react-hooks';
import { Box, Grid, Typography, IconButton, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MainTable from '../../components/MainTable/MainTable';
import MainLayoutStyles from '../../layouts/MainLayout/MainLayoutStyles';
import { MainLayoutHeader } from '../../layouts/MainLayout/MainLayout';
import EmptyScreen from '../../components/EmptyScreen';
import Edit from '../../assets/Icons/Settings/Edit';
import Home from '../../assets/Icons/Settings/Home';
import Deactivate from '../../assets/Icons/Settings/DeactivateUser';
import Send from '../../assets/Icons/Settings/Send';
import Base86Modal from '../../components/Modal';
import InviteUsers from './InviteUsers';
import EditOrganization from './EditOrganization';
import EditUser from './EditUser';
import DeactivateUser from './DeactivateUser';
import Fuse from 'fuse.js';

const defaultPermissions = {
  readUser: true,
  writeUser: true,
  readInvoice: true,
  writeInvoice: true,
  readVendor: true,
  writeVendor: true,
  readProduct: true,
  writeProduct: true,
  readBilling: true,
  writeBilling: true,
};

const settingsColumns = [
  { id: 'userName', label: 'User Name' },
  { id: 'email', label: 'Email' },
  {
    id: 'status',
    label: 'Status',
  },
];

const useStyles = makeStyles({
  subHeaderContainer: {
    width: '100%',
    // minHeight: '87px',
    padding: '24px',
    backgroundColor: '#FFFFFF',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertRoot: {
    width: '689px',
    height: '94px',
    background: '#21C5C4',
    borderRadius: '4px',
  },
  alertText: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    color: '#FFFFFF',
  },
});

const Settings = React.memo(() => {
  const [{ searchText }] = useSearch();
  const classes = MainLayoutStyles();
  const settingsClasses = useStyles();

  const [isPageEmpty, setIsPageEmpty] = useState(false);

  const [addUserModal, userModalControl] = useBooleanControls(false);
  const [editOrgModal, editOrgModalControl] = useBooleanControls(false);
  const [editUserModal, editUserModalControl] = useBooleanControls(false);
  const [deactivateUserModal, deactivateUserModalControl] = useBooleanControls(
    false,
  );
  const [toastUser, toastUserControl] = useBooleanControls(false);

  const [handledRow, setHandledRow] = useState(null);

  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState('');

  const [changeOrganization] = useMutation(UpdateOrganizationDocument);
  const [changeUser] = useMutation(UpdatePermissionsDocument);
  const [inviteUser] = useMutation(InviteUserDocument);

  const organizationListQuery = useOrganizationListQuery();
  const organizationList =
    organizationListQuery.data?.organizationList?.data?.[0]?.accessControls;

  const organizationId =
    organizationListQuery.data?.organizationList?.data?.[0]?._id;

  const { address1, postalCode } =
    organizationListQuery.data?.organizationList?.data?.[0]?.shippingAddress ||
    {};
  const address = address1 ? address1 : '';
  const zip = postalCode ? postalCode : '';

  const companyName =
    organizationListQuery.data?.organizationList?.data?.[0]?.name;

  const overflowMenuContent = [
    {
      code: 'editUser',
      text: 'Edit user',
      icon: Edit,
      callback: (id) => {
        setHandledRow(id);
        editUserModalControl.setTrue();
      },
    },
    {
      code: 'deactivate',
      text: 'Deactivate',
      icon: Deactivate,
      callback: (rowId) => {
        setHandledRow(rowId);
        deactivateUserModalControl.setTrue();
      },
    },
    {
      code: 'resendInvite',
      text: 'Resend Invite',
      icon: Send,
      callback: (rowId) => {
        setHandledRow(rowId);
        toastUserControl.setTrue();
      },
    },
  ];

  if (isPageEmpty) {
    return <EmptyScreen />;
  }

  const addUser = () => {
    userModalControl.setTrue();
  };

  const submitEmails = async (emails) => {
    for (const email of emails) {
      await inviteUser({
        variables: { email, permissions: defaultPermissions },
        refetchQueries: [{ query: OrganizationListDocument }],
        //update: inviteControls.setFalse,
      });
    }
  };

  const closeEditUserModal = () => {
    editUserModalControl.setFalse();
    setHandledRow(null);
  };

  const closeDeactivateUserModal = () => {
    deactivateUserModalControl.setFalse();
    setHandledRow(null);
  };

  const closeAlert = () => {
    setHandledRow(null);
    toastUserControl.setFalse();
  };

  const editOrganizationSubmit = async (orgName, orgAddress) => {
    await changeOrganization({
      variables: {
        organizationId: organizationId,
        organization: {
          name: orgName,
          shippingAddress: {
            address1: orgAddress,
          },
        },
      },
      refetchQueries: [{ query: OrganizationListDocument }],
    });
  };

  const editUser = async (id, firstName, lastName, email) => {
    console.log(id, firstName, lastName, email);
    await changeUser({
      variables: {
        permissionsId: id,
        permissions: {
          email,
        },
      },
      refetchQueries: [{ query: UpdatePermissionsDocument }],
    });
  };

  const makeUserIndex = (user) => {
    return new Fuse(user, {
      keys: ['email', 'name'],
      threshold: 0,
    });
  };
  const userIndex = useMemo(
    () => makeUserIndex(organizationList ? organizationList : []),
    [organizationList],
  );
  const filteredUsers = searchText
    ? userIndex.search(searchText)
    : organizationList;

  return (
    <Grid
      container
      justifyContent="center"
      className={classes.bodyGrid__container}
    >
      <Grid xs item className={classes.bodyGrid__item}>
        <Box className={classes.bodyGrid__itemTitle}>
          <MainLayoutHeader
            title="Settings"
            filter={false}
            placeholder="Search user..."
            add={addUser}
            addButtonText="Add user"
          />
        </Box>
        <Box className={settingsClasses.subHeaderContainer}>
          <Box display="flex" alignItems="center">
            <img src={require('../../assets/Icons/Settings/logo.png')} />
            <Typography
              style={{
                fontFamily: 'Comfortaa',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '22px',
                marginLeft: '10px',
              }}
            >
              {companyName ? companyName : '...'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Home />
            <Typography
              style={{
                fontSize: '18px',
                marginLeft: '10px',
              }}
            >
              {address ? `${address} ${zip}` : '...'}
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={editOrgModalControl.setTrue}
              disabled={!Boolean(companyName)}
            >
              <Edit />
            </IconButton>
          </Box>
        </Box>
        <MainTable
          /*onItemClick={id => {
            setSelectedSupplierDetail(id);
            setIsSuppliersListOpen(true);
            setIsSupplierDetailOpen(true);
          }}*/
          selected={selectedSupplierDetail}
          headCells={settingsColumns}
          rows={filteredUsers ? filteredUsers : []} //? organizationList : []}
          //isShort={isSupplierDetailOpen}
          overflowMenuContent={overflowMenuContent}
        />
      </Grid>
      {addUserModal && (
        <InviteUsers
          close={userModalControl.setFalse}
          //onCheck={emailSubmitCeck}
          submitEmails={submitEmails}
          open={addUserModal}
        />
      )}

      {editOrgModal && (
        <EditOrganization
          orgAddress={`${address} ${zip}`}
          orgName={companyName}
          open={editOrgModal}
          onClose={editOrgModalControl.setFalse}
          editOrganizationSubmit={editOrganizationSubmit}
        />
      )}
      {editUserModal && (
        <EditUser
          id={
            organizationList && handledRow !== null
              ? organizationList.find((el) => el._id === handledRow).userId
              : ''
          }
          email={
            organizationList && handledRow !== null
              ? organizationList.find((el) => el._id === handledRow).email
              : ''
          }
          editUser={editUser}
          open={editUserModal}
          onClose={closeEditUserModal}
        />
      )}
      <Base86Modal
        title="Deactivate user"
        open={deactivateUserModal}
        onClose={closeDeactivateUserModal}
        submitText="Deactivate"
        redButton
        size="s"
      >
        <DeactivateUser
          email={
            organizationList && handledRow !== null
              ? organizationList.find((el) => el._id === handledRow).email
              : ''
          }
        />
      </Base86Modal>
      <Snackbar
        open={toastUser}
        onClose={closeAlert}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Alert
          icon={false}
          onClose={closeAlert}
          classes={{
            root: settingsClasses.alertRoot,
          }}
          elevation={6}
          variant="filled"
        >
          <Typography className={settingsClasses.alertText}>
            Invite was sent to
          </Typography>
          <Typography className={settingsClasses.alertText}>
            {organizationList && handledRow !== null
              ? organizationList.find((el) => el._id === handledRow).email
              : ''}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
  );
});

// const selectFindData = (type, data) => data?.findSuppliers?.data ?? [];
const selectFindTotal = (typeName, data) =>
  data?.organizationList?.data?.[0]?.accessControls?.length ?? 0;

const SettingsProvider = React.memo(({ children }) => {
  const [sort] = useSort();
  const [pagination] = usePagination();
  const variables = useMemo(
    () => ({
      pagination,
      sort,
    }),
    [pagination, sort],
  );

  return (
    <CrudProvider
      idField="id"
      typeName="Settings"
      findDocument={OrganizationListDocument}
      insertDocument={InsertSupplierDocument}
      updateDocument={UpdateSupplierDocument}
      removeManyDocument={RemoveManySuppliersDocument}
      variables={variables}
      selectFindTotal={selectFindTotal}
    >
      {children}
    </CrudProvider>
  );
});

export default React.memo(() => {
  return (
    <PaginationProvider initialPerPage={5}>
      <SortProvider>
        <SearchProvider>
          <SelectedProvider>
            <SettingsProvider>
              <Settings />
            </SettingsProvider>
          </SelectedProvider>
        </SearchProvider>
      </SortProvider>
    </PaginationProvider>
  );
});

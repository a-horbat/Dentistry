import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import {
  useBooleanControls,
  UpdateProductDocument,
  AlertListDocument,
  AlertFragmentDoc,
} from '@base86inc/apollo-client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainMenu from '../../components/Menu';
import { usePersistentMenuStyles } from '../../components/Menu/usePersistentMenuStyles';
import Nav from '../../components/Nav';
import NavSearch from '../../components/NavSearch';
import AlertsIcon from '../../components/MenuIcons/Alerts';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { AlertListDisplay } from './List';
import { AlertDetailsDrawer, IgnoreAlertDrawer } from './Details';
import { ChangeProductThreshold } from '../Products/Details';
import get from 'lodash/get';
import gql from 'graphql-tag';

export default ({ menu = <MainMenu /> }) => {
  const { push } = useHistory();
  const [alert, setAlert] = useState(null);
  const [product, setProduct] = useState(null);
  const [alertOpen, alertControls] = useBooleanControls(false);
  const [ignoreAlertOpen, ignoreAlertControls] = useBooleanControls(false);
  const [thresholdOpen, thresholdControls] = useBooleanControls(false);
  const classes = usePersistentMenuStyles();
  const [searchText, setSearchText] = useState('');
  const [filterOpen, filterControls] = useBooleanControls(false);
  const { data, loading } = useQuery(AlertListDocument, {
    variables: {},
  });
  const [updateProduct, update] = useMutation(UpdateProductDocument, {});
  const alerts = get(data, 'alertList.data') || [];
  const selectAlert = alert => {
    setAlert(alert);
    alert ? alertControls.setTrue() : alertControls.setFalse();
  };
  const onIgnoreAlert = alert => {
    setAlert(alert);
    alert ? ignoreAlertControls.setTrue() : ignoreAlertControls.setFalse();
  };
  const onViewInvoices = product => {
    push(`/?productIds=${get(product, '_id')}`);
  };
  const onChangeThreshold = product => {
    setProduct(product);
    thresholdControls.setTrue();
  };
  const onChangeStatus = (product, status) => {
    updateProduct({
      variables: {
        productId: product._id,
        product: {
          status,
        },
      },
      update: () => ignoreAlertControls.setFalse(),
    });
  };
  return (
    <Box className={classes.mainContainer}>
      <Nav title="Alerts">
        <NavSearch
          searchText={searchText}
          setSearchText={setSearchText}
          filterOpen={filterOpen}
          filterControls={filterControls}
        />
      </Nav>
      {loading ? (
        <LinearProgress />
      ) : alerts.length ? (
        <AlertListDisplay
          rows={alerts}
          onClick={selectAlert}
          onIgnoreAlert={onIgnoreAlert}
          onViewInvoices={onViewInvoices}
          onChangeThreshold={onChangeThreshold}
          onChangeStatus={onChangeStatus}
        />
      ) : (
        <Box flexGrow={1} textAlign="center" pt={4}>
          <Typography style={{ color: '#bdbdbd' }}>
            <AlertsIcon style={{ height: 120, width: 120 }} />
          </Typography>
          <Typography>There is nothing here.</Typography>
        </Box>
      )}
      <AlertDetailsDrawer
        alert={alert}
        alertOpen={alertOpen}
        alertControls={alertControls}
        onViewInvoices={onViewInvoices}
        onIgnoreAlert={onIgnoreAlert}
      />
      <IgnoreAlertDrawer
        alert={alert}
        ignoreAlertOpen={ignoreAlertOpen}
        ignoreAlertControls={ignoreAlertControls}
        onIgnoreAlert={() => onChangeStatus(alert.product, 'ignored')}
        loading={update.loading}
      />
      <ChangeProductThreshold
        product={product}
        thresholdOpen={thresholdOpen}
        thresholdControls={thresholdControls}
      />
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
    </Box>
  );
};

const UPDATE_ALERT = gql`
  mutation UpdateAlert($alertId: ObjectId!, $alert: AlertInput) {
    updateAlert(alertId: $alertId, alert: $alert) {
      ...Alert
    }
  }

  ${AlertFragmentDoc}
`;

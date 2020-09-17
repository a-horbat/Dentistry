import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  AcceptInviteDocument,
  DeclineInviteDocument,
  PermissionsListDocument,
} from '@base86inc/apollo-client';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import find from 'lodash/fp/find';
import get from 'lodash/fp/get';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import logo from '../../../logo.png';

const getPermissionsListData = get('permissionsList.data');
const getOrganizationName = get('organization.name');

export default ({ match, history }) => {
  const inviteId = match.params.id;
  const classes = usePersistentMenuStyles();
  const [acceptInvite, acceptState] = useMutation(AcceptInviteDocument, {
    variables: { inviteId },
    update: () => history.push('/'),
  });
  const [declineInvite] = useMutation(DeclineInviteDocument, {
    variables: { inviteId },
  });
  const { data, loading, error } = useQuery(PermissionsListDocument);
  const invite = find({ _id: inviteId }, getPermissionsListData(data));

  useEffect(() => {
    if (invite) {
      acceptInvite();
    }
  }, [invite, acceptInvite]);

  return (
    <>
      <Box className={classes.mainContainer}>
        <Nav
          title={invite ? `Invitation to ${getOrganizationName(invite)}` : ''}
        />
        {(loading || acceptState.loading) && <LinearProgress />}
        <div style={{ paddingBottom: 120 }} />

        <Container maxWidth="sm">
          <Paper>
            <Box p={4}>
              <img
                src={logo}
                alt="Base86 Logo"
                style={{
                  padding: '4px 0',
                  height: 48,
                  alignSelf: 'center',
                  objectFit: 'cover',
                }}
              />
              <Typography>Hi, there!</Typography>
              {loading ? null : invite ? (
                <Typography gutterBottom>
                  You have been invited to join {getOrganizationName(invite)}.
                  Start tracking and optimizing food cost in a radically simple
                  way.
                </Typography>
              ) : (
                <>
                  <Typography gutterBottom>
                    The invitation you are searching for does not exist.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/"
                  >
                    Go Home
                  </Button>
                </>
              )}
              {/* <Box display="flex" alignItems="center" flexDirection="row" justifyContent="space-around" mt={2}>
              <Button variant='contained' color='secondary' onClick={() => acceptInvite()}>Decline Invite</Button>
              <Button variant='contained' color='primary' onClick={() => acceptInvite()}>Accept Invite</Button>
            </Box> */}
            </Box>
          </Paper>
        </Container>

        <div style={{ paddingBottom: 120 }} />
        <Hidden mdUp>
          <div
            style={{
              position: 'fixed',
              padding: 24,
              bottom: 0,
              left: 0,
              zIndex: 11,
            }}
          >
            <MainMenu />
          </div>
        </Hidden>
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            right: 0,
            zIndex: 11,
          }}
        >
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </div>
      </Box>
    </>
  );
};

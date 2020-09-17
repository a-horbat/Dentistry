import LinearProgress from '@material-ui/core/LinearProgress';
import { auth } from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Auth from './components/Auth';
import { PersistentPreviewBanner } from './components/Menu/PersistentPreviewBanner';
import Products from './routes/Products';
import Suppliers from './routes/Suppliers';
import Orders from './routes/Orders';
import Settings from './routes/Settings';
import Help from './routes/Help';
import Quotes from './routes/Quotes';
import QuoteEdit from './routes/Quotes/QuoteEdit/index';
import { parseQuery } from './utils/query';
import { Base86PreviewProvider, Role } from './client';
import Default from './layouts/Default';
import AuthRouter from './routes/Auth/AuthRouter';
import MainLayout from './layouts/MainLayout/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import { RoleProvider } from './utils/roleContext';

function onAuthStateWithEmailLinkChanged(onAuthStateChanged) {
  let unsubscribe = () => {};

  if (auth().isSignInWithEmailLink(window.location.href)) {
    const { email, continueUrl } = parseQuery(window.location.search);
    auth()
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        // console.log('Signed in with email link', continueUrl);
        unsubscribe = auth().onAuthStateChanged((user) => {
          onAuthStateChanged(user);
          if (continueUrl) {
            window.location.href = continueUrl;
          }
        });
      })
      .catch((err) => {
        console.log('Signed in with email link err', err);
        unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
      });
  } else {
    unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
  }

  return () => unsubscribe();
}

const App = () => {
  const history = useHistory();
  const [initialized, setInitialized] = useState(false);
  const [authScreen, setAuthScreen] = useState('');
  const onRegister = () => setAuthScreen('register');
  const onSignIn = () => setAuthScreen('sign_in');
  const [user, setUser] = useState(null);
  const onPreviewSignIn = () => {
    history.push('/');
    if (!user) onSignIn();
  };

  const onAuthStateChanged = (u) => {
    setTimeout(() => {
      setUser(u);
      setInitialized(true);
    }, 250); // Temporary fix
  };
  useEffect(() => onAuthStateWithEmailLinkChanged(onAuthStateChanged), []);

  const [role, setRole] = useState(user?.role || Role.Customer);

  const SetRole = (event) => {
    setRole(event.target.value);
  };

  if (!initialized) return <LinearProgress variant="indeterminate" />;
  if (!user && authScreen) return <Auth initialScreen={authScreen} />;
  if (!user)
    return (
      <Base86PreviewProvider>
        <Default>
          <Switch>
            {/* <Route path="/auth/action" exact>
              <AuthActions openRegisterScreen={onRegister} />
            </Route> */}
            <Route exact path="/preview">
              <PersistentPreviewBanner onClick={onPreviewSignIn} />
            </Route>
            <Route path="/" component={AuthRouter} />
          </Switch>
        </Default>
      </Base86PreviewProvider>
    );

  return (
    <RoleProvider value={{ role, setRole: SetRole }}>
      <MainLayout>
        <Switch>
          {/* <Route exact path='' component={() => <Products />} /> */}
          <Route
            exact
            path="/quotes/edit/:quoteId?/:detailsId?/:alternativeId?/:relatedQuoteId?"
            component={QuoteEdit}
          />
          <Route
            exact
            path="/quotes/:quoteId?/:detailsId?"
            component={Quotes}
          />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/help" component={Help} />
          <Route
            path="/products/:productId?/:supplierId?"
            component={Products}
          />

          <PrivateRoute
            exact
            path="/suppliers/:supplierId?/:productId?"
            component={Suppliers}
          />
        </Switch>
      </MainLayout>
    </RoleProvider>
  );
};

export default App;

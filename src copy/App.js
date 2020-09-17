import Hidden from '@material-ui/core/Hidden'
import LinearProgress from '@material-ui/core/LinearProgress'
import { auth } from 'firebase/app'
import 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import { PreviewMenu } from './components/Menu/PreviewMenu'
import { PersistentMenu } from './components/Menu/PersistentMenu'
import { PersistentPreviewBanner } from './components/Menu/PersistentPreviewBanner'
import { PersistentPreviewMenu } from './components/Menu/PersistentPreviewMenu'
import Home from './routes/Home'
import { InvoiceFilterProvider } from './routes/Home/Filter'
import Products from './routes/Products'
import Vendors from './routes/Vendors'
import Alerts from './routes/Alerts'
import FoodCost from './routes/Reports/FoodCost'
import Revenue from './routes/Reports/Revenue'
import COGS from './routes/Reports/COGS'
import UserManagement from './routes/Settings/UserManagement'
import AccountingSystem from './routes/Settings/Integrations/Accounting'
import POSSystem from './routes/Settings/Integrations/POS'
import PaymentMethods from './routes/Settings/PaymentMethods'
import Notifications from './routes/Settings/Notifications'
import Invitation from './routes/Settings/Invitation'
import FAQ from './routes/Help/FAQ'
import Chat from './routes/Help/Chat'
import Contact from './routes/Help/Contact'
import Tour from './routes/Tour'
import NotFound from './routes/NotFound'
import { parseQuery } from './utils/query'
import { Base86PreviewProvider } from './client'
import AuthActions from './routes/AuthActions'

function onAuthStateWithEmailLinkChanged (onAuthStateChanged) {
  let unsubscribe = () => {}

  if (auth().isSignInWithEmailLink(window.location.href)) {
    const { email, continueUrl } = parseQuery(window.location.search)
    auth()
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        //console.log('Signed in with email link', continueUrl)
        unsubscribe = auth().onAuthStateChanged(user => {
          onAuthStateChanged(user)
          if (continueUrl) {
            window.location.href = continueUrl
          }
        })
      })
      .catch(err => {
        //console.log('Signed in with email link err', err)
        unsubscribe = auth().onAuthStateChanged(onAuthStateChanged)
      })
  } else {
    unsubscribe = auth().onAuthStateChanged(onAuthStateChanged)
  }

  return () => unsubscribe()
}

function App () {
  const history = useHistory()
  const [initialized, setInitialized] = useState(false)
  const [authScreen, setAuthScreen] = useState('')
  const onRegister = () => setAuthScreen('register')
  const onSignIn = () => setAuthScreen('sign_in')
  const onPreviewSignIn = () => {
    history.push('/')
    if (!user) onSignIn()
  }
  const [user, setUser] = useState(null)
  const onAuthStateChanged = u => {
    setUser(u)
    setInitialized(true)
  }
  useEffect(() => onAuthStateWithEmailLinkChanged(onAuthStateChanged), [])

  if (!initialized) return <LinearProgress variant='indeterminate' />
  if (!user && authScreen) return <Auth initialScreen={authScreen} />
  if (!user)
    return (
      <Base86PreviewProvider>
        <InvoiceFilterProvider>
          <Switch>
            <Route path='/auth/action' exact>
              <></>
            </Route>
            <Route path='/preview'>
              <PersistentPreviewBanner onClick={onPreviewSignIn} />
              <Hidden smDown>
                <PersistentPreviewMenu />
              </Hidden>
            </Route>
            <Route path='/'>
              <Hidden smDown>
                <PersistentPreviewMenu />
              </Hidden>
            </Route>
          </Switch>
          <Switch>
            <Route path='/' exact>
              <Tour onRegister={onRegister} onSignIn={onSignIn} />
            </Route>
            <Route path='/auth/action' exact>
              <AuthActions openRegisterScreen={onRegister} />
            </Route>

            <Route path='/preview' exact>
              <Home menu={<PreviewMenu />} />
            </Route>

            <Route path='/preview/reports/revenue' exact>
              <Revenue menu={<PreviewMenu />} />
            </Route>
            <Route path='/preview/reports/cogs' exact>
              <COGS menu={<PreviewMenu />} />
            </Route>
            <Route path='/'>
              <Tour onRegister={onRegister} onSignIn={onSignIn} />
            </Route>
          </Switch>
        </InvoiceFilterProvider>
      </Base86PreviewProvider>
    )

  return (
    <InvoiceFilterProvider>
      <Switch>
        <Route path='/auth/action' exact>
          <></>
        </Route>
        <Route path='/preview'>
          <PersistentPreviewBanner onClick={onPreviewSignIn} />
          <Hidden smDown>
            <PersistentPreviewMenu />
          </Hidden>
        </Route>
        <Route path='/'>
          <Hidden smDown>
            <PersistentMenu />
          </Hidden>
        </Route>
      </Switch>
      <Switch>
        <Route path='/auth/action' exact>
          <AuthActions openRegisterScreen={onRegister} />
        </Route>
        <Route path='/' component={Home} exact />
        <Route path='/vendors' component={Vendors} exact />
        <Route path='/products' component={Products} exact />
        <Route path='/alerts' component={Alerts} exact />
        <Route path='/reports/food-cost' component={FoodCost} exact />
        <Route path='/reports/revenue' component={Revenue} exact />
        <Route path='/reports/cogs' component={COGS} exact />
        <Route path='/settings/users' component={UserManagement} exact />
        <Route
          path='/settings/payment-methods'
          component={PaymentMethods}
          exact
        />
        <Route
          path='/settings/integrations/accounting'
          component={AccountingSystem}
          exact
        />
        <Route path='/settings/integrations/pos' component={POSSystem} exact />
        <Route path='/settings/notifications' component={Notifications} exact />
        <Route path='/settings/invitation/:id' component={Invitation} exact />
        <Route path='/help/faq' component={FAQ} exact />
        <Route path='/help/chat' component={Chat} exact />
        <Route path='/help/contact' component={Contact} exact />
        <Route path='/help/about' exact>
          {({ history }) => <Tour onClose={() => history.push('/')} />}
        </Route>
        <Route path='/'>
          <Base86PreviewProvider>
            <Switch>
              <Route path='/preview' component={Home} exact />
              <Route path='/preview/vendors' component={Vendors} exact />
              <Route path='/preview/products' component={Products} exact />
              <Route path='/preview/alerts' component={Alerts} exact />
              <Route
                path='/preview/reports/food-cost'
                component={FoodCost}
                exact
              />
              <Route
                path='/preview/reports/revenue'
                component={Revenue}
                exact
              />
              <Route path='/preview/reports/cogs' component={COGS} exact />
              <Route path='/' component={NotFound} />
            </Switch>
          </Base86PreviewProvider>
        </Route>
      </Switch>
    </InvoiceFilterProvider>
  )
}

export default App

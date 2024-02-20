import {Switch, Route, Redirect} from 'react-router-dom'

import Condition from './components/Condition'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import {SearchProvider} from './context/SearchContext'

const App = () => (
  <>
    <SearchProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Condition} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route path="/bad-path" component={NotFound} />
        <Redirect to="bad-path" />
      </Switch>
    </SearchProvider>
  </>
)

export default App

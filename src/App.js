import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
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
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </SearchProvider>
  </>
)

export default App

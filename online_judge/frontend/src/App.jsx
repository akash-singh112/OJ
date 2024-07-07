import './App.css'
import { Route,Routes } from 'react-router-dom'
import { Login } from './assets/loginwork/loginp.jsx'
import { Register } from './assets/registerwork/registerp.jsx'
import { NotFound } from './assets/notfound.jsx'
import { Home } from './assets/hello.jsx'
import { HomeScreen } from './assets/hs/main-home-page/home_s.jsx'
import { PrivateRoute } from './private.jsx'
import { AddProb } from './assets/hs/add-problems/addprob.jsx'
import { RecentContests } from './assets/hs/recent-contests/recent-contests.jsx'
import { Profile } from './assets/hs/profile/profile.jsx'
import { Problemset } from './assets/hs/problemset/problemset.jsx'
import { UpdateRecord } from '../crud_ops/update/updateprob.jsx'
import { DisplayProb } from './assets/hs/display-prob/dp.jsx'
import { ChangePassword } from './assets/changepass/changepass.jsx'
import { EditUser } from './assets/edituser/edituser.jsx'

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='welcome' element={
          <PrivateRoute>
            <HomeScreen/>
          </PrivateRoute>
        } />
        <Route path='addprob' element={
          <PrivateRoute>
            <AddProb/>
          </PrivateRoute>
        } />
        <Route path='rec-con' element={
          <PrivateRoute>
            <RecentContests/>
          </PrivateRoute>
        } />
        <Route path='profile' element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        } />
        <Route path='ps' element={
          <PrivateRoute>
            <Problemset/>
          </PrivateRoute>
        } />
        <Route path='updaterecord' element={
          <PrivateRoute>
            <UpdateRecord/>
          </PrivateRoute>
        } />
        <Route path='displayprob/:id' element={
          <PrivateRoute>
            <DisplayProb/>
          </PrivateRoute>
        } />
        <Route path='edituser' element={
          <PrivateRoute>
            <EditUser/>
          </PrivateRoute>
        } />
        <Route path='changepass' element={
          <PrivateRoute>
            <ChangePassword/>
          </PrivateRoute>
        } />


      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

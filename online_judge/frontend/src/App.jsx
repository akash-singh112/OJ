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
import { SolvedProb } from './assets/hs/solved-problems/solved-probs.jsx'
import { Profile } from './assets/hs/profile/profile.jsx'
import { Problemset } from './assets/hs/problemset/problemset.jsx'

function App() {
  return (
    <Routes>
      <Route path='/home'>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='welcome' element={
          <PrivateRoute>
            <HomeScreen/>
            <AddProb/>
            <RecentContests/>
            <Profile/>
            <SolvedProb/>
            <Problemset/>
          </PrivateRoute>
        } />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

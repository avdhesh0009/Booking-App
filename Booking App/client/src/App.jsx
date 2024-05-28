import './App.css'
import {Route,Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import PlacesForm from './pages/PlacesForm.jsx';

axios.defaults.baseURL='http://localhost:3000';
axios.defaults.withCredentials=true;
// withCredentials:true to set cookie in cookies

function App() {
  return (
   <UserContextProvider>
   <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/account/' element={<ProfilePage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesForm/>}/>
        <Route path='/account/places/:id' element={<PlacesForm/>}/>
      </Route>
   </Routes>
  </UserContextProvider>
  )
}

export default App

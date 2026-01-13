import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SeatLayout from './pages/SeatLayout'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import LoginPage from './components/LoginPage'
import SignUp from './pages/SignUp'
import SignUpPage from './components/SignUpPage'
import BannerSlider from './components/BannerSlider'
import { Toaster } from 'react-hot-toast'
import MovieCard from './components/MovieCard'
import FeaturedSection from './components/FeaturedSection'




const App = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';


  return (
    <>
       <Toaster />
       {!isAdminRoute && !isAuthRoute && <Navbar/>}
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
       </Routes>
       {!isAdminRoute && !isAuthRoute && <Footer/>}

    </>
  )
}

export default App
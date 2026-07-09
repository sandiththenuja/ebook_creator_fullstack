import React from 'react'
import { ArrowRight, Sparkles, BookOpen, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import {Link} from 'react-router-dom'


const Hero = () => {
    const {isAuthenticated} = useAuth()

  return (
    <div className=''>
        <div className="">
            <Link to={isAuthenticated ? "/dashboard" : "login"} >
            <span>Start creating for free</span>
            </Link>
        </div>
    </div>
  )
}

export default Hero
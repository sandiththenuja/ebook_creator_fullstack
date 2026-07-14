import React from 'react'
import { ArrowRight, Sparkles, BookOpen, Zap, CheckCircle, Rocket } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#D1F8EF] via-white to-[#A1E3F9]/20 pt-20 pb-32">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A1E3F9] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3674B5] rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#D1F8EF] rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center">
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="group inline-flex items-center gap-2 px-4 py-2 bg-[#D1F8EF] border border-[#A1E3F9] rounded-full text-sm font-medium text-[#3674B5] hover:bg-[#A1E3F9] hover:border-[#578FCA] transition-all duration-300 hover:scale-105 shadow-sm">
            <span>Start creating for free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold bg-linear-to-r from-[#3674B5] via-[#578FCA] to-[#3674B5] bg-clip-text text-transparent leading-tight max-w-4xl">
            Create AI-Powered eBooks in Minutes
          </h1>

          <p className="mt-6 text-xl text-[#3674B5]/70 max-w-2xl">
            Transform your ideas into professional eBooks with our AI-powered platform. Generate outlines, write content, and publish in minutes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="group px-8 py-4 bg-linear-to-r from-[#3674B5] to-[#578FCA] hover:from-[#578FCA] hover:to-[#3674B5] text-white font-semibold rounded-xl shadow-lg shadow-[#3674B5]/30 hover:shadow-[#3674B5]/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Start Creating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="px-8 py-4 bg-white border-2 border-[#A1E3F9] hover:border-[#578FCA] text-[#3674B5] font-semibold rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 hover:bg-[#D1F8EF]/30">
              Learn More
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { icon: <Zap className="w-5 h-5 text-[#3674B5]" />, text: "AI-Powered Writing" },
              { icon: <BookOpen className="w-5 h-5 text-[#3674B5]" />, text: "Edit Templates" },
              { icon: <CheckCircle className="w-5 h-5 text-[#3674B5]" />, text: "Instant Export" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-[#3674B5] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-[#A1E3F9]/50 hover:border-[#578FCA] hover:shadow-md transition-all duration-200">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
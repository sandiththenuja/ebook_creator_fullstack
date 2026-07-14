import React from 'react'
import { BookOpen, GitBranch, XIcon, Link, Mail, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-br from-[#3674B5] to-[#578FCA] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">
                AI eBook Creator
              </span>
            </div>
            <p className="mt-4 text-white/70 max-w-sm">
              Transform your ideas into professional eBooks with AI-powered assistance.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform">
                <GitBranch className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform">
                <Link className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} ST All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
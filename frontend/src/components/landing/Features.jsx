import React from 'react'
import { Sparkles, BookOpen, Palette, Zap, FileText, Share2, Brain, PenTool } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#3674B5]" />,
      title: "AI Outline Generator",
      desc: "Let our AI create a structured outline based on your topic in seconds."
    },
    {
      icon: <Brain className="w-6 h-6 text-[#3674B5]" />,
      title: "Smart Chapter Writer",
      desc: "AI-assisted writing that helps you craft compelling chapters."
    },
    {
      icon: <Palette className="w-6 h-6 text-[#3674B5]" />,
      title: "Beautiful Templates",
      desc: "Professionally designed templates for your eBooks."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#3674B5]" />,
      title: "Fast & Easy",
      desc: "Create and publish eBooks in minutes, not weeks."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#3674B5]" />,
      title: "Multiple Formats",
      desc: "Export to PDF, DOCX, and other formats."
    },
    {
      icon: <Share2 className="w-6 h-6 text-[#3674B5]" />,
      title: "Easy Sharing",
      desc: "Share your eBooks directly from the platform."
    }
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1F8EF] rounded-full text-sm font-medium text-[#3674B5] mb-4">
            <Sparkles className="w-4 h-4" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3674B5]">
            Everything You Need to Create
          </h2>
          <p className="mt-4 text-lg text-[#3674B5]/60 max-w-2xl mx-auto">
            Powerful AI tools to transform your ideas into professional eBooks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 bg-white rounded-2xl border border-[#A1E3F9]/30 hover:border-[#578FCA]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] group-hover:from-[#A1E3F9] group-hover:to-[#578FCA] flex items-center justify-center transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#3674B5]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[#3674B5]/60 leading-relaxed">
                {feature.desc}
              </p>
              <div className="mt-4 w-12 h-0.5 bg-[#A1E3F9] group-hover:bg-[#3674B5] transition-all duration-300 group-hover:w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
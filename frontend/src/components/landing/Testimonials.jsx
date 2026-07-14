import React from 'react'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bestselling Author",
      text: "This platform revolutionized my writing process. I published my first eBook in just 3 days!",
      rating: 4,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      text: "The AI outline generator saved me hours of planning. Absolutely love this tool!",
      rating: 3,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Business Coach",
      text: "My clients love the professional quality of the eBooks I create with this platform.",
      rating: 5,
      avatar: "ER"
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-linear-to-b from-white to-[#D1F8EF]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D1F8EF] rounded-full text-sm font-medium text-[#3674B5] mb-4">
            <Quote className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3674B5]">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-[#3674B5]/60 max-w-2xl mx-auto">
            Join thousands of satisfied creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-[#A1E3F9]/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-[#3674B5]" />
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[#578FCA] text-[#578FCA]" />
                ))}
              </div>
              <p className="text-[#3674B5]/70 leading-relaxed">"{testimonial.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#3674B5] to-[#578FCA] flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#3674B5]">{testimonial.name}</p>
                  <p className="text-sm text-[#3674B5]/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
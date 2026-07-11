import React, { useEffect, useState } from 'react'
import { BookOpen, ChevronLeft, X } from 'lucide-react'

const ViewChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose
}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#3674B5]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:relative left-0 h-full w-80 bg-white border-r border-[#A1E3F9]/30 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isDesktop ? 'top-16' : 'top-0'}`}
        style={{ height: isDesktop ? 'calc(100vh - 64px)' : '100vh' }}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-[#A1E3F9]/30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-[#3674B5] to-[#578FCA] rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#3674B5] text-sm">Chapters</span>
              <span className="text-xs text-[#3674B5]/40 ml-1">
                {book.chapters.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-[#3674B5]/50 hover:text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
              aria-label="Close chapters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)] p-2 space-y-0.5">
          {book.chapters.map((chapter, index) => {
            const isSelected = selectedChapterIndex === index
            return (
              <button
                key={index}
                onClick={() => {
                  onSelectChapter(index)
                  onClose()
                }}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                  isSelected
                    ? 'bg-linear-to-r from-[#D1F8EF] to-[#A1E3F9]/50 border border-[#A1E3F9]/30 shadow-sm'
                    : 'hover:bg-[#D1F8EF]/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#3674B5] text-white'
                        : 'bg-[#D1F8EF] text-[#3674B5]/40 group-hover:bg-[#A1E3F9] group-hover:text-[#3674B5]'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm truncate ${
                        isSelected
                          ? 'font-semibold text-[#3674B5]'
                          : 'text-[#3674B5]/70 group-hover:text-[#3674B5]'
                      }`}
                    >
                      {chapter.title || `Chapter ${index + 1}`}
                    </div>
                    {isSelected && (
                      <div className="w-8 h-0.5 bg-linear-to-r from-[#3674B5] to-[#578FCA] mt-1 rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export default ViewChapterSidebar
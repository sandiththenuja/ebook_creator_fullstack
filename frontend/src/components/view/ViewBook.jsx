import React, { useState, useEffect } from 'react'
import ViewChapterSidebar from './ViewChapterSidebar'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [fontSize, setFontSize] = useState(18)

  const selectedChapter = book.chapters[selectedChapterIndex]

  const formatContent = (content) => {
    if (!content) return '<p class="text-[#3674B5]/40 italic">No content available</p>'

    return content
      .split('\n\n')
      .filter(paragraph => paragraph.trim())
      .map(paragraph => paragraph.trim())
      .map(paragraph => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#3674B5]">$1</strong>')
        paragraph = paragraph.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        return `<p class="mb-6 text-justify leading-relaxed">${paragraph}</p>`
      })
      .join('')
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-white">
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[#A1E3F9]/30 px-4 md:px-8 py-4">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
                aria-label="Open chapters"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold text-[#3674B5] truncate max-w-50 md:max-w-xs">
                  {book.title}
                </h1>
                <p className="text-xs text-[#3674B5]/50">by {book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#D1F8EF]/50 rounded-lg p-1 border border-[#A1E3F9]/30">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="px-2.5 py-1 text-sm font-medium text-[#3674B5] hover:bg-white rounded-md transition-colors"
                  aria-label="Decrease font size"
                >
                  A-
                </button>
                <span className="text-xs text-[#3674B5]/50 px-1">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="px-2.5 py-1 text-sm font-medium text-[#3674B5] hover:bg-white rounded-md transition-colors"
                  aria-label="Increase font size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3674B5] mb-2">
              {selectedChapter.title || `Chapter ${selectedChapterIndex + 1}`}
            </h1>
            <div className="w-12 h-0.5 bg-linear-to-r from-[#3674B5] to-[#578FCA] mb-6"></div>

            <div
              className="reading-content"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.8,
                fontFamily: 'Charter, Georgia, "Times New Roman", serif',
                color: '#1a2a3a'
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(selectedChapter.content)
              }}
            />

            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#A1E3F9]/30">
              <button
                onClick={() => setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))}
                disabled={selectedChapterIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedChapterIndex === 0
                    ? 'text-[#3674B5]/30 cursor-not-allowed'
                    : 'text-[#3674B5] hover:bg-[#D1F8EF] hover:scale-105'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <span className="text-sm text-[#3674B5]/40">
                {selectedChapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() => setSelectedChapterIndex(Math.min(book.chapters.length - 1, selectedChapterIndex + 1))}
                disabled={selectedChapterIndex === book.chapters.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedChapterIndex === book.chapters.length - 1
                    ? 'text-[#3674B5]/30 cursor-not-allowed'
                    : 'text-[#3674B5] hover:bg-[#D1F8EF] hover:scale-105'
                }`}
              >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ViewBook
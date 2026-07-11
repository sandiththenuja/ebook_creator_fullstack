import React, { useMemo, useState } from 'react'
import { Eye, Maximize2, Sparkles, Type } from 'lucide-react'
import SimpleMDEditor from './SimpleMDEditor'
import Button from '../ui/Button'
import InputField from '../ui/InputField'

const ChapterEditorTab = ({
  book = {
    title: "Untitled",
    chapters: [{ title: "Chapter 1", content: "" }]
  },
  selectedChapterIndex = 0,
  onChapterChange = () => { },
  onGenerateChapterContent = () => { },
  isGenerating
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const formatMarkdown = (content) => {
    if (!content) return '<p class="text-gray-400 italic">No content yet. Start writing.</p>'

    return content
      // headers
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-4 mt-6">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-4 mt-6">$1</h2>')
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')

        // bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*\*(.*?)\*/g, '<em class="italic">$1</em>')

        // blockquotes
        .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-violet-500 pl-4 italic text-gray-700 my-4">$1</blockquote>')

        // unordered list
        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">. $1</li>')
        .replace(/(<li.*<\/li>)/gs, '<ul class="my-4">. $1</ul>')

        // ordered list
        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        .replace(/(<li class="ml-4 mb-1 list-decimal">.*<\/li>)/gs, '<ol class="my-4 ml-4">$1</ol>')

        // paragraphs
        .split('\n\n')
        .map(paragraph => {
            paragraph = paragraph.trim()
            if(!paragraph) return ''
            // skip if already wrap in HTML tags
            if(paragraph.startsWith('<')) return paragraph
            return `<p class="mb-4 text-justify">${paragraph}</p>`
        })
        .join('')
  }

  const mdOptions = useMemo(() => ({
    autofocus: true,
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen"]
  }), [])

  if (selectedChapterIndex === null || !book.chapters[selectedChapterIndex]) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-linear-to-br from-[#D1F8EF] to-[#A1E3F9] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-[#3674B5]" />
          </div>
          <p className="text-lg font-semibold text-[#3674B5]">Select a chapter</p>
          <p className="text-sm text-[#3674B5]/50">Choose a chapter from the sidebar to start editing</p>
        </div>
      </div>
    )
  }

  const currentChapter = book.chapters[selectedChapterIndex]

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white' : 'flex-1'} flex flex-col bg-white`}>
      <div className="border-b border-[#A1E3F9]/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#3674B5]">Chapter Editor</h1>
            <p className="text-sm text-[#3674B5]/50">
              Editing: {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border border-[#A1E3F9]/30">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-3 py-1.5 text-sm transition-colors ${!isPreviewMode ? 'bg-[#D1F8EF] text-[#3674B5] font-medium' : 'text-[#3674B5]/50 hover:bg-[#D1F8EF]/50'}`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-3 py-1.5 text-sm transition-colors ${isPreviewMode ? 'bg-[#D1F8EF] text-[#3674B5] font-medium' : 'text-[#3674B5]/50 hover:bg-[#D1F8EF]/50'}`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 rounded-lg text-[#3674B5]/50 hover:text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
              title="Toggle fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <Button
              onClick={() => onGenerateChapterContent(selectedChapterIndex)}
              isLoading={isGenerating === selectedChapterIndex}
              icon={Sparkles}
              size="sm"
              variant="primary"
            >
              Generate with AI
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          <InputField
            label="Chapter Title"
            name="title"
            value={currentChapter.title || ''}
            onChange={(e) => onChapterChange({ target: { name: 'title', value: e.target.value } })}
            placeholder="Enter chapter title"
            className="mb-4"
          />

          <div className="min-h-100">
            {isPreviewMode ? (
              <div className="bg-[#D1F8EF]/20 rounded-xl p-6 border border-[#A1E3F9]/30 min-h-100">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#A1E3F9]/30">
                  <Eye className="w-4 h-4 text-[#3674B5]" />
                  <span className="text-sm font-medium text-[#3674B5]">Preview Mode</span>
                </div>
                <div className="prose max-w-none">
                  <h1 className="text-2xl font-bold text-[#3674B5] mb-4">
                    {currentChapter.title || "Untitled Chapter"}
                  </h1>
                  <div
                    className="text-[#3674B5]/80 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: currentChapter.content ? formatMarkdown(currentChapter.content) : '<p class="text-gray-400 italic">No content yet. Start writing.</p>'
                    }}
                  />
                </div>
              </div>
            ) : (
              <SimpleMDEditor
                value={currentChapter.content || ""}
                onChange={(value) => onChapterChange({ target: { name: "content", value } })}
                options={mdOptions}
                height={500}
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#A1E3F9]/30 text-xs text-[#3674B5]/50">
            <div className="flex gap-4">
              <span>Words: {currentChapter.content ? currentChapter.content.split(/\s+/).filter(word => word.length > 0).length : 0}</span>
              <span>Characters: {currentChapter.content ? currentChapter.content.length : 0}</span>
            </div>
            <span>Auto saved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterEditorTab
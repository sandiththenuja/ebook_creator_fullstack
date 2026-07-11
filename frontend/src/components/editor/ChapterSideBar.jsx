import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { Sparkles, Trash2, GripVertical, ArrowLeft, Plus, BookOpen } from 'lucide-react'

const SortableItem = ({ chapter, index, selectedChapterIndex, onSelectChapter, onDeleteChapter, onGenerateChapterContent, isGenerating, onDragStart, onDragOver, onDragEnd, isDragging }) => {
  const isSelected = selectedChapterIndex === index

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-200 group ${
        isSelected
          ? 'bg-gradient-to-r from-[#D1F8EF] to-[#A1E3F9]/50 text-[#3674B5] shadow-sm'
          : 'hover:bg-[#D1F8EF]/50 text-[#3674B5]/70'
      } ${isDragging ? 'opacity-50 shadow-lg ring-2 ring-[#3674B5]/30' : ''}`}
    >
      <div className="p-1 cursor-grab active:cursor-grabbing text-[#3674B5]/30 hover:text-[#3674B5] transition-colors touch-none">
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      <button
        className={`flex-1 text-left text-sm truncate px-2 py-1.5 rounded-md transition-colors ${
          isSelected
            ? 'font-semibold text-[#3674B5]'
            : 'text-[#3674B5]/70 hover:text-[#3674B5]'
        }`}
        onClick={() => onSelectChapter(index)}
      >
        {chapter?.title || `Chapter ${index + 1}`}
      </button>

      <button
        onClick={() => onGenerateChapterContent(index)}
        disabled={isGenerating === index}
        className={`p-1.5 rounded-md transition-colors ${
          isGenerating === index
            ? 'text-[#3674B5]/30 cursor-not-allowed'
            : 'text-[#578FCA] hover:text-[#3674B5] hover:bg-[#D1F8EF]'
        }`}
        title="Generate content with AI"
      >
        {isGenerating === index ? (
          <div className="w-4 h-4 border-2 border-[#3674B5] border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={() => onDeleteChapter(index)}
        className={`p-1.5 rounded-md transition-colors ${
          isSelected
            ? 'text-red-400 hover:text-red-500 hover:bg-red-50'
            : 'text-[#3674B5]/30 hover:text-red-400 hover:bg-red-50'
        }`}
        title="Delete chapter"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

const ChapterSideBar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
  onReorderChapters
}) => {
  const navigate = useNavigate()
  const [draggingIndex, setDraggingIndex] = useState(null)

  const chapters = book?.chapters || []

  const handleDragStart = (e, index) => {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (draggingIndex === null || draggingIndex === index) return

    const newChapters = [...chapters]
    const draggedItem = newChapters[draggingIndex]
    newChapters.splice(draggingIndex, 1)
    newChapters.splice(index, 0, draggedItem)

    onReorderChapters(draggingIndex, index)
    setDraggingIndex(index)
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
  }

  return (
    <aside className="w-72 bg-white border-r border-[#A1E3F9]/30 flex flex-col h-full shadow-sm">
      <div className="p-4 border-b border-[#A1E3F9]/30 bg-gradient-to-r from-[#D1F8EF]/20 to-transparent">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="mb-3 w-full justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Dashboard
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3674B5] to-[#578FCA] rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-[#3674B5] truncate" title={book?.title}>
              {book?.title || 'Untitled'}
            </h2>
            <p className="text-xs text-[#3674B5]/50">
              {chapters.length} {chapters.length === 1 ? 'chapter' : 'chapters'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chapters.length === 0 ? (
          <div className="text-center py-8 text-[#3674B5]/40">
            <p className="text-sm">No chapters yet</p>
            <p className="text-xs mt-1">Click "New Chapter" to add one</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-2 py-1 mb-2">
              <span className="text-xs font-medium text-[#3674B5]/40 uppercase tracking-wider">Chapters</span>
              <span className="text-xs text-[#3674B5]/30">{chapters.length}</span>
            </div>
            {chapters.map((chapter, index) => (
              <SortableItem
                key={chapter?._id || `new-${index}`}
                chapter={chapter}
                index={index}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={onSelectChapter}
                onDeleteChapter={onDeleteChapter}
                onGenerateChapterContent={onGenerateChapterContent}
                isGenerating={isGenerating}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                isDragging={draggingIndex === index}
              />
            ))}
          </>
        )}
      </div>

      <div className="p-3 border-t border-[#A1E3F9]/30 bg-[#D1F8EF]/10">
        <Button
          variant="primary"
          size="sm"
          onClick={onAddChapter}
          className="w-full justify-center"
          icon={Plus}
        >
          New Chapter
        </Button>
      </div>
    </aside>
  )
}

export default ChapterSideBar
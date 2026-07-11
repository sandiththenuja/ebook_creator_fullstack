import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import ChapterSideBar from '../components/editor/ChapterSideBar'
import { ChevronDown, Edit, FileDown, FileText, Menu, Save, X, Sparkles } from 'lucide-react'
import Dropdown, { DropdownItem } from '../components/ui/Dropdown'
import Button from '../components/ui/Button'
import ChapterEditorTab from '../components/editor/ChapterEditorTab'
import BookDetailsTab from '../components/editor/BookDetailsTab'
import { arrayMove } from '@dnd-kit/sortable'

const EditorPage = () => {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("editor")
  const fileInputRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false)
  const [aiTopic, setAiTopic] = useState("")
  const [aiStyle, setAiStyle] = useState("Informative")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`)
        setBook(response.data)
      } catch (error) {
        toast.error("Error loading book details")
        navigate('/dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [bookId, navigate])

  const handleBookChange = (e) => {
    const { name, value } = e.target
    setBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleChapterChange = (e) => {
    const { name, value } = e.target
    const updatedChapters = [...book.chapters]
    updatedChapters[selectedChapterIndex][name] = value
    setBook((prev) => ({ ...prev, chapters: updatedChapters }))
  }

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      content: ""
    }
    const updatedChapters = [...book.chapters, newChapter]
    setBook((prev) => ({ ...prev, chapters: updatedChapters }))
    setSelectedChapterIndex(updatedChapters.length - 1)
  }

  const handleDeleteChapter = (index) => {
    if (book.chapters.length <= 1) {
      toast.error("A book must have at least one chapter")
      return
    }
    const updatedChapters = book.chapters.filter((_, i) => i !== index)
    setBook((prev) => ({ ...prev, chapters: updatedChapters }))
    setSelectedChapterIndex((prevIndex) => prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex)
  }

  const handleReorderChapters = (oldIndex, newIndex) => {
    setBook((prev) => ({
      ...prev,
      chapters: arrayMove(prev.chapters, oldIndex, newIndex)
    }))
    setSelectedChapterIndex(newIndex)
  }

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {
    setIsSaving(true)
    try {
      await axiosInstance.put(`${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`, bookToSave)
      if (showToast) {
        toast.success("Changes saved successfully")
      }
    } catch (error) {
      console.log("ERROR", error)
      toast.error("Error saving changes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("coverImage", file)
    setIsUploading(true)

    try {
      const response = await axiosInstance.put(`${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setBook(response.data)
      toast.success("Cover image updated. Reloading...")

      setTimeout(() => {
        window.location.reload()
      }, 500)

    } catch (error) {
      toast.error("Error uploading cover image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleGenerateChapterContent = async (index) => {
    const chapter = book.chapters[index]
    if (!chapter || !chapter.title) {
      toast.error("Chapter title is required")
      return
    }
    setIsGenerating(index)

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_CHAPTER_CONTENT, {
        chapterTitle: chapter.title,
        chapterDescription: chapter.description || "",
        style: aiStyle
      })
      const updatedChapters = [...book.chapters]
      updatedChapters[index].content = response.data.content

      const updatedBook = { ...book, chapters: updatedChapters }
      setBook(updatedBook)
      toast.success(`Content for "${chapter.title}" generated`)

      await handleSaveChanges(updatedBook, false)
    } catch (error) {
      toast.error("Error generating chapter content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportPDF = async () => {
    toast.loading("Generating PDF...")
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPORT.PDF}/${bookId}/pdf`, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${book.title}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.dismiss()
      toast.success("PDF export started")
    } catch (error) {
      toast.dismiss()
      toast.error("Error exporting PDF")
    }
  }

  const handleExportDOC = async () => {
    toast.loading("Generating DOC...")
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPORT.DOC}/${bookId}/doc`, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${book.title}.docx`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.dismiss()
      toast.success("DOC export started")
    } catch (error) {
      toast.dismiss()
      toast.error("Error exporting DOC")
    }
  }

  if (isLoading || !book) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#D1F8EF]/20">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3674B5] mx-auto"></div>
          <p className="mt-4 text-[#3674B5] font-medium">Loading Editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-[#3674B5]/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-end p-4 border-b border-[#A1E3F9]/30">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ChapterSideBar
              book={book}
              selectedChapterIndex={selectedChapterIndex}
              onSelectChapter={(index) => {
                setSelectedChapterIndex(index)
                setIsSidebarOpen(false)
              }}
              onAddChapter={handleAddChapter}
              onDeleteChapter={handleDeleteChapter}
              onGenerateChapterContent={handleGenerateChapterContent}
              isGenerating={isGenerating}
              onReorderChapters={handleReorderChapters}
            />
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <ChapterSideBar
          book={book}
          selectedChapterIndex={selectedChapterIndex}
          onSelectChapter={setSelectedChapterIndex}
          onAddChapter={handleAddChapter}
          onDeleteChapter={handleDeleteChapter}
          onGenerateChapterContent={handleGenerateChapterContent}
          isGenerating={isGenerating}
          onReorderChapters={handleReorderChapters}
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-[#A1E3F9]/30 px-4 md:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#3674B5] hover:bg-[#D1F8EF] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex bg-[#D1F8EF]/50 rounded-lg p-1 border border-[#A1E3F9]/30">
              <button
                onClick={() => setActiveTab("editor")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "editor"
                    ? 'bg-white text-[#3674B5] shadow-sm'
                    : 'text-[#3674B5]/60 hover:text-[#3674B5]'
                }`}
              >
                <Edit className="w-4 h-4" />
                Editor
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "details"
                    ? 'bg-white text-[#3674B5] shadow-sm'
                    : 'text-[#3674B5]/60 hover:text-[#3674B5]'
                }`}
              >
                <FileText className="w-4 h-4" />
                Details
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dropdown
              trigger={
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <FileDown className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-4 h-4" />
                </Button>
              }
            >
              <DropdownItem onClick={handleExportPDF}>
                <FileText className="w-4 h-4" /> Export as PDF
              </DropdownItem>
              <DropdownItem onClick={handleExportDOC}>
                <FileText className="w-4 h-4" /> Export as DOC
              </DropdownItem>
            </Dropdown>

            <Button
              onClick={() => handleSaveChanges()}
              isLoading={isSaving}
              icon={Save}
              size="sm"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-[#D1F8EF]/10">
          {activeTab === "editor" ? (
            <ChapterEditorTab
              book={book}
              selectedChapterIndex={selectedChapterIndex}
              onChapterChange={handleChapterChange}
              onGenerateChapterContent={handleGenerateChapterContent}
              isGenerating={isGenerating}
            />
          ) : (
            <BookDetailsTab
              book={book}
              onBookChange={handleBookChange}
              onCoverUpload={handleCoverImageUpload}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default EditorPage
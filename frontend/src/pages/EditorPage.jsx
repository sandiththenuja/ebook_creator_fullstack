import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import ChapterSideBar from '../components/editor/ChapterSideBar'
import { ChevronDown, Edit, FileDown, FileText, Menu, Save } from 'lucide-react'
import Dropdown, { DropdownItem } from '../components/ui/Dropdown'
import Button from '../components/ui/Button'
import ChapterEditorTab from '../components/editor/ChapterEditorTab'
import BookDetailsTab from '../components/editor/BookDetailsTab'

const EditorPage = () => {
  const {bookId} = useParams()
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
    const fetchBook = async() => {
      try {
        const response = await axiosInstance.get(`${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`)
        setBook(response.data)
      } catch (error) {
        toast.error("Error loading book details")
        navigate('/dashboard')
      }finally{
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [bookId, navigate])

  const handleBookChange = (e) => {
    const {name, value} = e.target
    setBook((prev) => ({...prev, [name]: value}))
  }

  const handleChapterChange = (e) => {

  }

  const handleAddChapter = () => {

  }

  const handleDeleteChapter = (index) => {

  }

  const handleReorderChapters = (oldIndex, newIndex) => {

  }

  const handleSaveChanges = async(bookToSave = book, showToast = true) => {

  }

  const handleCoverImageUpload = async(e) => {

  }

  const handleGenerateOutline = async() => {
    
  }

  const handleGenerateChapterContent = async(index) => {

  }

  const handleExportPDF = async() => {
    
  }

  const handleExportDOC = async() => {

  }

  if(isLoading || !book){
    return (
      <div className="">
        <p>Loading Editor...</p>
      </div>
    )
  }

  return (
    <>
      <div className="">
        {/* mobile sidebar */}
        {isSidebarOpen && (
        <div
        role='dialog'
        aria-modal='true'>
          <div
          aria-hidden='true'
          onClick={() => setIsSidebarOpen(false)}></div>

          <div className="">
            <div className="">
              <button type='button' onClick={() => setIsSidebarOpen(false)}>x</button>
            </div>
            <ChapterSideBar 
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index);
              setIsSidebarOpen(false)
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onReorderChapters={handleReorderChapters} />
          </div>
          <div className="" aria-hidden='true'></div>
        </div>
        )}

        {/* desktop sidebar */}
        <div className="">
          <ChapterSideBar
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index)
              setIsSidebarOpen(false)
            }}
            onAddChapter={(handleAddChapter)}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onReorderChapters={handleReorderChapters}
          />
        </div>

        <main className="">
          <header className="">
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu className='' />
            </button>
            <div className="">
                <button onClick={() => setActiveTab("editor")} className={`${activeTab === "editor" ? "bg-white text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>
                  <Edit /> Editor
                </button>

                <button onClick={() => setActiveTab("details")} className={`${activeTab === "details" ? "bg-white text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>
                  <Edit /> Details
                </button>
            </div>

            <div className="">
              <Dropdown
                trigger={
                <Button variant='secondary' icon={FileDown}>
                  Export
                  <ChevronDown />
                </Button>}
              >
                <DropdownItem onClick={handleExportDOC}>
                  <FileText /> Export as DOC
                </DropdownItem>
              </Dropdown>

              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
              >
                Save changes
              </Button>
            </div>
          </header>

          <div className="">
            {activeTab === "editor" ? (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onChapterChange={handleChapterChange}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating} />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverUpload={handleCoverImageUpload}
                isUploading={isUploading}
                fileInputRef={fileInputRef} />
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default EditorPage
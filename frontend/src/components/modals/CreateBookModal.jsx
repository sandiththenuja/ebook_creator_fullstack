import React, { useEffect, useRef, useState } from 'react'
import Modal from '../ui/Modal'
import { useAuth } from '../../context/AuthContext'
import InputField from '../ui/InputField'
import { ArrowLeft, BookOpen, Hash, Palette, Plus, Sparkles } from 'lucide-react'
import SelectField from '../ui/SelectField'
import Button from '../ui/Button'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'

const CreateBookModal = ({isOpen, onClose, onBookCreated}) => {
  const {user} = useAuth()

  const [step, setStep] = useState(1)  
  const [bookTitle, setBookTitle] = useState("")  
  const [numChapters, setNumChapters] = useState(5)  
  const [aiTopic, setAiTopic] = useState("")  
  const [aiStyle, setAiStyle] = useState("")  
  const [chapters, setChapters] = useState([])  
  const [isGeneratingOutline, setIsGenerataingOutline] = useState(false)  
  const [isFinalizingBook, setIsFinalizingBook] = useState(false) 
  const chaptersContainerRef = useRef(null) 

  const resetModal = () => {
    setStep(1)
    setBookTitle("")
    setNumChapters(5)
    setAiTopic("")
    setAiStyle("Informative")
    setChapters([])
    setIsGenerataingOutline(false)
    setIsFinalizingBook(false)
  }

  const handleGenerateOutline = async() => {
    if(!bookTitle || !numChapters){
      toast.error("Enter a title and chapter number")
      return
    }
    setIsGenerataingOutline(true)
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_OUTLINE, {
        topic: bookTitle,
        description: aiTopic || "",
        style: aiStyle,
        numChapters: numChapters
      })
      setChapters(response.data.outline)
      setStep(2)
      toast.success("Outline generated")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error generating outline")
    }finally{
      setIsGenerataingOutline(false)
    }
  }

  const handleChapterChange = (index, field, value) => {
    const updateChapters = [...chapters]
    updateChapters[index][field] = value
    setChapters(updateChapters)
  }

  const handleDeleteChapter = (index) => {
    if(chapters.length <= 1) return
    setChapters(chapters.filter((_, i) => i !== index))
  }

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      {title: `Chapter ${chapters.length + 1}`, description: ""}
    ])
  }

  const handleFinalizeBook = async() => {
    if(!bookTitle || chapters.length === 0){
      toast.error("Enter title and chapters")
      return
    }
    setIsFinalizingBook(true)
    try {
      const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE_BOOK, {
        title: bookTitle,
        author: user.name || "Author 1",
        chapters: chapters
      })
      toast.success("Book created")
      onBookCreated(response.data._id)
      onClose()
      resetModal()
    } catch (error) {
      console.log("TESR__", bookTitle, chapters);
      toast.error(error.response?.data?.message || "Error creating book")
    }finally{
      setIsFinalizingBook(false)
    }
  }

  useEffect(() => {
    if(step === 2 && chaptersContainerRef.current){
      const scrollableDiv = chaptersContainerRef.current
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [chapters.length, step])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal()
      }}
      title="Create eBook"
    >
      {step === 1 && (
        <div className="">
          <div className="">1</div>
          <div className="">2</div>

          <InputField
          icon={BookOpen}
          label="Book Title"
          placeholder="Enter title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)} 
          />

          <InputField
          icon={Hash}
          label="Number of chapters"
          type='number'
          placeholder="5"
          value={numChapters}
          onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)} 
          min = "1"
          max = "20"
          />

           <InputField
          icon={BookOpen}
          label="Topic (optional)"
          placeholder="apecific for AI generation"
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)} 
          />

          <SelectField
          icon={Palette}
          label="Style"
          value={aiStyle}
          onChange={(e) => setAiStyle(e.target.value)}
          options={[
            "Informative",
            "Storytelling",
            "Casual",
            "Professional",
            // add styles
          ]}
          />
          <Button
          onClick={handleGenerateOutline}
          isLoading={isGeneratingOutline}
          icon={Sparkles}>Generate Outline</Button>

        </div>
      )}

      {step === 2 && (
        <div className="">
          {/* progress indicator */}
          <div className="">2</div>

          <h3>Review chapters</h3>
          {chapters.length} chapters

          <div ref={chaptersContainerRef}>
            {chapters.length === 0 ? (
              <div>
                <BookOpen />
                <p>No chapters</p>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <div key={index}>
                  <div className="">{index + 1}</div>

                  <input 
                  type="text"
                  value={chapter.title}
                  onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                  placeholder='Title' />

                  <button onClick={() => handleDeleteChapter(index)}>Delete Chapter</button>

                  <div>
                    <textarea value={chapter.description} onChange={(e) => handleChapterChange(index, "description", e.target.value)}
                    placeholder='Description'
                    rows={2}></textarea>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="">
        <Button variant="" onClick={() => setStep(1)} icon={ArrowLeft}>Back</Button>

        <Button variant="" onClick={handleAddChapter} icon={Plus}>Add</Button>

        <Button variant="" onClick={handleFinalizeBook} isLoading={isFinalizingBook}>Create Book</Button>

      </div>
    </Modal>
  )
}

export default CreateBookModal
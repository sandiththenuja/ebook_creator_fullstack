import { Eye, Maximize2, Sparkles, Type } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import SimpleMDEditor from './SimpleMDEditor'
import Button from '../ui/Button'
import InputField from '../ui/InputField'

const ChapterEditorTab = ({
    book = {
        title: "Untitled",
        chapters: [
            {
                title: "Chapter 1",
                content: "_"
            }
        ]
    },
    selectedChapterIndex = 0,
    onChapterChange = () => {},
    onGenerateChapterContent = () => {},
    isGenerating
}) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)

    // simple markdown parser
    const formatMarkdown = (content) => {
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

    const mdOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            toolbar: [
                "bold", "italic", "heading", "|",
                "quote", "unordered-list", "ordered-list", "|",
                "link", "image", "|",
                "preview", "side-by-side", "fullscreen"
            ]
        }
    }, [])

    if(selectedChapterIndex === null || !book.chapters[selectedChapterIndex]){
        return (
            <div className="">
                <div className="">
                    <div className="">
                        <Type />
                    </div>
                    <p>Select chapter to start editing</p>
                    <p>Choose from the sidebar to begin writing</p>
                </div>
            </div>
        )
    }

    const currentChapter = book.chapters[selectedChapterIndex]

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white' : 'flex-1'} flex flex-col`}>
        {/* header */}
        <div className="">
            <div className="">
                <div className="">
                    <div>
                        <h1>Chapter editor</h1>
                        <p>Editing: {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`} </p>
                    </div>

                    <div className="">
                        {/* editor controls */}
                        <div className="">
                            <button onClick={() => setIsPreviewMode(false)} className={`${!isPreviewMode ? 'bg-violet-50 border-r border-violet-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                                Edit
                            </button>

                            <button onClick={() => setIsPreviewMode(true)} className={`${isPreviewMode ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                                Preview
                            </button>

                            <button onClick={() => setIsFullScreen(!isFullScreen)} title='Toggle fullscreen'>
                                <Maximize2 />
                            </button>

                            <Button onClick={() => onGenerateChapterContent(selectedChapterIndex)} isLoading={isGenerating === selectedChapterIndex} icon={Sparkles} size='sm'>
                                Generate with AI
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* content area */}
            <div className="">
                <div className="">
                    <div className="">
                        <div className="">
                            {/* chapter title */}
                            <InputField 
                                label="Chapter title"
                                name="title"
                                value={currentChapter.title || ''}
                                onChange={onChapterChange}
                                placeholder="Enter chapter title"
                                className=''
                            />
                        </div>

                        {/* editor preview area */}
                        <div className="">
                            {isPreviewMode ? (
                                <div className="">
                                    <div className="">
                                        <div className="">
                                            <Eye />
                                            <span>Preview Mode</span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <h1 className="">
                                            {currentChapter.title || "Untitled chapter"}
                                        </h1>
                                        <div className=""
                                        style={{fontFamily: 'Charter Georgia "Times New Roman" serif', lineHeight: 1.7}}
                                        dangerouslySetInnerHTML={{
                                            __html: currentChapter.content ? formatMarkdown(currentChapter.content) : '<p class="text-gray-400 italic">No content yet. Startwritng.</p>'
                                        }} />
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <SimpleMDEditor
                                        value={currentChapter.content || ""}
                                        onChange={(value) => onChapterChange({target : {name: "content", value}})}
                                        options={mdOptions} />
                                </div>
                            )}
                        </div>

                        {/* status bar */}
                        <div className="">
                            <div className="">
                                <span>
                                    Words: {currentChapter.content ? currentChapter.content.split(/\s+/).filter(word => word.length > 0).length : 0}
                                </span>
                                <span>
                                    Characters: {currentChapter.content ? currentChapter.content.length : 0}
                                </span>
                            </div>
                            <div className="">
                                Auto saved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChapterEditorTab
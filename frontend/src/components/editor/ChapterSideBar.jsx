import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import {Sparkles, Trash2} from 'lucide-react'

const SortableItem = ({chapter, index, selectedChapterIndex, onSelectChapter, onDeleteChapter, onGenerateChapterContent, isGenerating}) => {
    const {attributes, listeners, setnodeRef, transform, transition} = useSortable({id: chapter._id || `new-${index}`})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setnodeRef} style={style} className=''>
            <button className={`flex flex-center text-sm ${selectedChapterIndex === index
                ? "bg-violet-50/50 text-violet-800 font-semibold"
                : "text-slate-600 hover:bg-slate-100"
            }`} onClick={() => onSelectChapter(index)}>
                {chapter.title}
            </button>
            <Button size='small' onClick={() => onGenerateChapterContent(index)} isLoading={isGenerating === index} title="Generate content with AI">
                {isGenerating !== index && <Sparkles />}
            </Button>

            <Button size='small' onClick={() => onDeleteChapter(index)} title="Delete">
                <Trash2 />
            </Button>
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

    const chapterIds = book.chapters.map((chapter, index) => {
        chapter._id || `new-${index}`
    })

    const handleDragEnd = (event) => {
        const {active, over} = event
        if(active.id !== over.id){
            const oldIndex = chapterIds.indexOf(active.id)
            const newIndex = chapterIds.indexOf(over.id)
            onReorderChapters(oldIndex, newIndex)
        }
    }

  return (
    <aside>
        <Button size='sm' onClick={() => navigate('/dashboard')}>
            Dashboard
        </Button>

        <h2 title={book.title}>{book.title}</h2>
        <DragContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={chapterIds} strategy={verticalListSortingStrategy} >
            {book.chapters.map((chapter, index) => (
                <SortableItem 
                key={chapter._id || `new-${index}`}
                chapter={chapter}
                index={index}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={onSelectChapter}
                onDeleteChapter={onDeleteChapter}
                onGenerateChapterContent={onGenerateChapterContent}
                isGenerating={isGenerating} />
            ))}
            </SortableContext>
        </DragContext>

        <Button onClick={onAddChapter}>New chapter</Button>
    </aside>
  )
}

export default ChapterSideBar
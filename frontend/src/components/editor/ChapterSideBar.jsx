import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const SortableItem = ({chapter, index, selectedChapterIndex, onSelectChapter, onDeleteChapter, onGenerateChapterContent, isGenerating}) => {
    const {attributes, listeners, setnodeRef, transform, transition} = useSortable({id: chapter._id || `new-${index}`})

    return (
        <div></div>
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
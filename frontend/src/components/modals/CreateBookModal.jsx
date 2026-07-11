import React, { useEffect, useRef, useState } from 'react';
import Modal from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import {
    ArrowLeft,
    BookOpen,
    Hash,
    Palette,
    Plus,
    Sparkles,
    Trash2,
    ChevronRight,
    Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const [bookTitle, setBookTitle] = useState('');
    const [numChapters, setNumChapters] = useState(5);
    const [aiTopic, setAiTopic] = useState('');
    const [aiStyle, setAiStyle] = useState('Informative');
    const [chapters, setChapters] = useState([]);
    const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
    const [isFinalizingBook, setIsFinalizingBook] = useState(false);
    const [error, setError] = useState('');
    const chaptersContainerRef = useRef(null);

    // ✅ Reset modal when it closes - using useEffect
    const resetModal = () => {
        setStep(1);
        setBookTitle('');
        setNumChapters(5);
        setAiTopic('');
        setAiStyle('Informative');
        setChapters([]);
        setIsGeneratingOutline(false);
        setIsFinalizingBook(false);
        setError('');
    };

    // ✅ Reset when modal is closed
    useEffect(() => {
        if (!isOpen) {
            resetModal();
        }
    }, [isOpen]);

    // ✅ Scroll to bottom when chapters change
    useEffect(() => {
        if (step === 2 && chaptersContainerRef.current) {
            const scrollableDiv = chaptersContainerRef.current;
            setTimeout(() => {
                scrollableDiv.scrollTo({
                    top: scrollableDiv.scrollHeight,
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [chapters.length, step]);

    // ✅ Handle close safely
    const handleClose = () => {
        if (isGeneratingOutline || isFinalizingBook) return;
        onClose();
    };

    const handleGenerateOutline = async () => {
        if (!bookTitle || !numChapters) {
            toast.error('Enter a title and chapter number');
            return;
        }
        setError('');
        setIsGeneratingOutline(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_OUTLINE, {
                topic: bookTitle,
                description: aiTopic || '',
                style: aiStyle,
                numChapters: numChapters,
            });

            // ✅ Handle different response formats
            const outline = response.data.outline || response.data.chapters || response.data;
            if (Array.isArray(outline)) {
                setChapters(outline);
            } else {
                setChapters([
                    { title: `Chapter 1: Introduction to ${bookTitle}`, description: 'Overview of the main concepts' },
                    { title: `Chapter 2: Deep Dive`, description: 'Exploring core principles' },
                    { title: `Chapter 3: Advanced Topics`, description: 'Taking it further' },
                ]);
            }
            setStep(2);
            toast.success('Outline generated successfully!');
        } catch (error) {
            console.error('Error generating outline:', error);
            setError(error.response?.data?.message || 'Error generating outline');
            toast.error(error.response?.data?.message || 'Error generating outline');
        } finally {
            setIsGeneratingOutline(false);
        }
    };

    const handleChapterChange = (index, field, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][field] = value;
        setChapters(updatedChapters);
    };

    const handleDeleteChapter = (index) => {
        if (chapters.length <= 1) return;
        setChapters(chapters.filter((_, i) => i !== index));
    };

    const handleAddChapter = () => {
        setChapters([
            ...chapters,
            { title: `Chapter ${chapters.length + 1}`, description: '' },
        ]);
    };

    const handleFinalizeBook = async () => {
        if (!bookTitle || chapters.length === 0) {
            toast.error('Enter title and at least one chapter');
            return;
        }

        // ✅ Validate chapters
        const invalidChapters = chapters.some(
            (ch) => !ch.title?.trim() || !ch.description?.trim()
        );
        if (invalidChapters) {
            toast.error('Please fill in all chapter titles and descriptions');
            return;
        }

        setError('');
        setIsFinalizingBook(true);

        try {
            const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE_BOOK, {
                title: bookTitle,
                author: user?.name || 'Author 1',
                chapters: chapters.map((ch) => ({
                    title: ch.title,
                    description: ch.description,
                    content: '',
                })),
                status: 'draft',
            });

            toast.success('Book created successfully!');

            const bookId = response.data._id || response.data.book?._id;
            if (onBookCreated && bookId) {
                onBookCreated(bookId);
            }
            onClose();
        } catch (error) {
            console.error('Error creating book:', error);
            setError(error.response?.data?.message || 'Error creating book');
            toast.error(error.response?.data?.message || 'Error creating book');
        } finally {
            setIsFinalizingBook(false);
        }
    };

    // ✅ If modal is not open, don't render
    if (!isOpen) return null;

    const styleOptions = ['Informative', 'Storytelling', 'Casual', 'Professional', 'Academic', 'Technical'];

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Create eBook"
            maxWidth="max-w-2xl"
        >
            {/* ============================================ */}
            {/* STEP 1: Book Details & AI Configuration */}
            {/* ============================================ */}
            {step === 1 && (
                <div className="space-y-4">
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
                            1
                        </span>
                        <span>Book Details</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-300">2</span>
                        <span className="text-gray-300">Review Chapters</span>
                    </div>

                    <p className="text-sm text-gray-500">
                        Enter your book details and let AI generate a structured outline.
                    </p>

                    <InputField
                        icon={BookOpen}
                        label="Book Title"
                        placeholder="Enter your book title"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />

                    <InputField
                        icon={Hash}
                        label="Number of Chapters"
                        type="number"
                        placeholder="5"
                        value={numChapters}
                        onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
                        min="1"
                        max="20"
                    />

                    <InputField
                        icon={BookOpen}
                        label="Topic (Optional)"
                        placeholder="Specific focus for AI generation"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                    />

                    <SelectField
                        icon={Palette}
                        label="Style"
                        value={aiStyle}
                        onChange={(e) => setAiStyle(e.target.value)}
                        options={styleOptions}
                    />

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleGenerateOutline}
                            isLoading={isGeneratingOutline}
                            icon={isGeneratingOutline ? undefined : Sparkles}
                        >
                            {isGeneratingOutline ? 'Generating...' : 'Generate Outline'}
                        </Button>
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* STEP 2: Review & Edit Chapters */}
            {/* ============================================ */}
            {step === 2 && (
                <div className="space-y-4">
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <span className="text-gray-400">1</span>
                        <span className="text-gray-400">Book Details</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
                            2
                        </span>
                        <span className="text-blue-600 font-medium">Review Chapters</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">{bookTitle}</h3>
                            <p className="text-sm text-gray-500">
                                {chapters.length} chapters • {aiStyle} style
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleAddChapter}
                            icon={Plus}
                            disabled={isFinalizingBook}
                        >
                            Add Chapter
                        </Button>
                    </div>

                    {/* Chapters List */}
                    <div
                        ref={chaptersContainerRef}
                        className="max-h-80 overflow-y-auto space-y-3 p-2 border border-gray-200 rounded-lg bg-gray-50"
                    >
                        {chapters.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                                <p>No chapters generated yet.</p>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleAddChapter}
                                    className="mt-2"
                                >
                                    Add Chapter Manually
                                </Button>
                            </div>
                        ) : (
                            chapters.map((chapter, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded min-w-6 text-center">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                placeholder={`Chapter ${index + 1} title`}
                                                value={chapter.title || ''}
                                                onChange={(e) =>
                                                    handleChapterChange(index, 'title', e.target.value)
                                                }
                                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                disabled={isFinalizingBook}
                                            />
                                            <textarea
                                                placeholder="Chapter description"
                                                value={chapter.description || ''}
                                                onChange={(e) =>
                                                    handleChapterChange(index, 'description', e.target.value)
                                                }
                                                rows="2"
                                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                disabled={isFinalizingBook}
                                            />
                                        </div>
                                        {chapters.length > 1 && (
                                            <button
                                                onClick={() => handleDeleteChapter(index)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                disabled={isFinalizingBook}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-200">
                        <Button
                            variant="secondary"
                            onClick={() => setStep(1)}
                            icon={ArrowLeft}
                            disabled={isFinalizingBook}
                        >
                            Back
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleAddChapter}
                                icon={Plus}
                                disabled={isFinalizingBook}
                            >
                                Add
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleFinalizeBook}
                                isLoading={isFinalizingBook}
                                disabled={chapters.length === 0}
                            >
                                {isFinalizingBook ? 'Creating...' : 'Create Book'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CreateBookModal;
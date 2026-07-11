import React from 'react'
import { BASE_URL } from '../../utils/apiPaths'
import InputField from '../ui/InputField'
import Button from '../ui/Button'
import { UploadCloud, Image as ImageIcon } from 'lucide-react'

const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    }

    if (imagePath.startsWith('/uploads/')) {
        return `${BASE_URL}/backend${imagePath || ''}`.replace(/\\/g, '/')
    }
    
    return `${BASE_URL}/backend${imagePath || ''}`.replace(/\\/g, '/')
}


const BookDetailsTab = ({
    book,
    onBookChange,
    onCoverUpload,
    isUploading,
    fileInputRef
}) => {
    const coverImageUrl = getImageUrl(book?.coverImage)

    return (
        <div className="space-y-6 p-6">
            <h3 className="text-lg font-semibold text-[#3674B5] border-b border-[#A1E3F9]/30 pb-3">Book Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Title"
                    name="title"
                    value={book?.title || ''}
                    onChange={onBookChange}
                    placeholder="Enter book title"
                    className="md:col-span-2"
                />
                <InputField
                    label="Author"
                    name="author"
                    value={book?.author || ''}
                    onChange={onBookChange}
                    placeholder="Enter author name"
                />
                <InputField
                    label="Subtitle"
                    name="subtitle"
                    value={book?.subtitle || ''}
                    onChange={onBookChange}
                    placeholder="Enter subtitle (optional)"
                />
            </div>

            <div className="pt-4 border-t border-[#A1E3F9]/30">
                <h3 className="text-md font-semibold text-[#3674B5] mb-3">Cover Image</h3>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="w-32 h-40 rounded-xl overflow-hidden border-2 border-[#A1E3F9]/30 bg-[#D1F8EF]/20 flex items-center justify-center flex-shrink-0">
                        {coverImageUrl ? (
                            <img
                                src={coverImageUrl}
                                alt="Book cover"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.log('Image load error:', coverImageUrl)
                                    e.target.src = ''
                                }}
                            />
                        ) : (
                            <ImageIcon className="w-12 h-12 text-[#A1E3F9]" />
                        )}
                    </div>
                    <div className="flex-1 space-y-3">
                        <p className="text-sm text-[#3674B5]/60">Upload a new cover image (recommended: 600x800px)</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onCoverUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => fileInputRef.current?.click()}
                            isLoading={isUploading}
                            icon={UploadCloud}
                            size="sm"
                        >
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailsTab
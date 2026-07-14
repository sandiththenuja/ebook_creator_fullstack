export const BASE_URL = "https://ebook-creator-fullstack-production.up.railway.app"
// export const BASE_URL = "http://localhost:8000"

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
        UPDATE_PROFILE: "/api/auth/profile",
    },
    BOOKS: {
        CREATE_BOOK: "/api/book",
        GET_BOOKS: "/api/book",
        GET_BOOK_BY_ID: "/api/book",
        UPDATE_BOOK: "/api/book",
        DELETE_BOOK: "/api/book",
        UPDATE_COVER: "/api/book/cover",
    },
    AI: {
        GENERATE_OUTLINE: "/api/ai/generate-outline",
        GENERATE_CHAPTER_CONTENT: "/api/ai/generate-chapter-content"
    },
    EXPORT: {
        PDF: "/api/export",
        DOC: "/api/export"
    }
}
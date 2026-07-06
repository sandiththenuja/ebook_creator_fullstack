const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

const generateOutline = async(req, res) => {
    try {
        const {topic, style, numChapters, description} = req.body

        if(!topic){
            return res.status(400).json({message: "Enter a topic"})
        }

        const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements:
        Topic: "${topic}"
        ${description ? `Descriptoin: ${description}` : ""}
        Writing style: ${style}
        Number of chapters: ${numChapters || 5}

        Requirements:
        1) Generate exactly ${numChapters || 5} chapters
        2) Each chapter title should be clear, engaging and follow a logical progression
        3) Each chapter description sould be 2-3 sentences explaining what chapter covers
        4) Ensure chapters build on each other coherently
        5) Create according to ${style} writing style in your titles and descriptions

        Output format:
        Return ONLY a valid JSON array with no additional text, markdown or formatting. Each object must have exactly two keys: "title" and "description"

        example structure:
        [
            {
              "title" : "Chapter 1: Introduction to topic",
              "description": "A comprehensive overview introducing the main concepts. Sets the foundation for understanding the subject matter."
            },
            {
              "title" : "Chapter 2: Core Principles",
              "description": "Explores the fundamental principles and theories and provides detailed examples and real world applications."
            }
        ]
        
        Generate the outline now`

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt
        })

        const text = response.text

        // find and extract the json array from the response text
        const startIndex = text.indexOf("[")
        const endIndex = text.indexOf("]")

        if(startIndex === -1 || endIndex === -1){
            console.error("Can't find json array in AI response: ", text);
            return res.status(500).json({message: "AI response parse not success, no json array found"})
        }

        const jsonString = text.substring(startIndex, endIndex + 1)

        // validate if the response is valid json
        try {
            const outline = JSON.parse(jsonString)
            res.status(200).json({outline})
        } catch (e) {
            console.error("Failed to parse Ai response: ", jsonString);
            res.status(500).json({message: "Failed to generate valid outline. The AI response was not valid json"})
        }

    } catch (error) {
        console.error("Error generating outline", error);
        res.status(500).json({message: "Server error during AI outline generation", error: error.message})
    }
}

const generateChapterContent = async(req, res) => {
    try {
        const {chapterTitle, chapterDescription, style} = req.body

        if(!chapterTitle){
            return res.status(400).json({message: "Enter a chapter title"})
        }

        const prompt = ''

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt
        })

        res.status(200).json({content: response.text})
        
    } catch (error) {
        console.error("Error generating outline", error);
        res.status(500).json({message: "Server error during AI chapter generation", error: error.message})
    }
}

module.exports = {generateOutline, generateChapterContent}
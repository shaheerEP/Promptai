import { connectToDB } from '@utils/dbConnect'
import Prompt from '@models/Prompt'

// ... keep GET and PATCH handlers as they are ...

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    // Find the prompt by ID and remove it
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id)

    if (!deletedPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/prompt/[id]:', error)
    return new Response(`Failed to delete prompt: ${error.message}`, {
      status: 500,
    })
  }
}

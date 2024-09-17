import { connectToDB } from '@utils/database'
import Prompt from '@models/Prompt'

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Error deleting prompt', { status: 500 })
  }
}

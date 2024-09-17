import Prompt from '@models/Prompt'
import { connectToDB } from '@utils/dbConnect'

export async function POST(req) {
  const { userId, prompt, tag } = await req.json()

  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.error('Error creating prompt:', error)
    return new Response(
      `Failed to create a new prompt. Error: ${error.message}`,
      { status: 500 }
    )
  }
}

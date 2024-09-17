'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'
const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '' })
  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        const errorData = await response.text()
        throw new Error(errorData)
      }
    } catch (error) {
      console.error('Error creating prompt:', error)
      // You might want to show an error message to the user here
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}
export default CreatePrompt

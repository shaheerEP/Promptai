import mongoose from 'mongoose'

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables')
    throw new Error('MONGODB_URI is not defined')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Promptai',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

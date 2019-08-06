import { db, storage } from '@/setup/firebase'
import { omit } from 'lodash'
const debug = require('debug')('APP:Lib:Data')

const VIDEO_COLLECTION = 'videos'
const EVENT_COLLECTION = 'event'

const eventsRef = () => {
  return db.collection(EVENT_COLLECTION)
}
const eventRef = eventKey => {
  return eventsRef().doc(eventKey)
}

const videosRef = () => {
  return db.collection(VIDEO_COLLECTION)
}
const videoRef = videoKey => {
  return videosRef().doc(videoKey)
}

// ----- EVENT -----

const getEvents = async () => {
  const querySnapshot = await eventsRef()
    .orderBy('createdAt', 'desc')
    .get()
  const documents = querySnapshot.docs.map(doc => ({ ...{ _key: doc.id }, ...doc.data() }))
  debug('getEvents', { documents })
  return documents
}
const getEvent = async eventKey => {
  const doc = await eventRef(eventKey).get()
  const document = { ...{ _key: doc.id }, ...doc.data() }
  document.videos = await getVideos(eventKey)
  debug('getEvent', { document })
  return document
}

const addEvent = async data => {
  const newEvent = { ...{ createdAt: new Date() }, ...data }
  const result = await eventsRef().add(newEvent)
  const event = { ...{ _key: result.id }, ...data }
  debug('addEvent', { event })
  return event
}

const updateEvent = async data => {
  debug('updateEvent')
  const updateData = { ...omit(data, ['_key']), ...{ updatedAt: new Date() } }
  debug('updateEvent', 'updateData', updateData)
  const eventKey = data._key
  await eventRef(eventKey).set(updateData)

  debug('updateEvent', { event: data })
  return data
}

const deleteEvent = async eventKey => {
  debug('deleteEvent')
  await deleteEventVideos(eventKey)
  await eventRef(eventKey).delete()
  debug('deleteEvent', 'sucess')
  return null
}

// ----- VIDEO -----

const getVideos = async eventKey => {
  const querySnapshot = await videosRef()
    .where('event', '==', eventKey)
    .orderBy('createdAt', 'desc')
    .get()
  const documents = querySnapshot.docs.map(doc => ({ ...{ _key: doc.id }, ...doc.data() }))
  debug('getVideos', { documents })
  return documents
}
const getVideo = async (eventKey, videoKey) => {
  const doc = await videoRef(eventKey, videoKey).get()
  const document = { ...{ _key: doc.id }, ...doc.data() }
  debug('getVideo', { document })
  return document
}

const addVideo = async (eventKey, data) => {
  const newVideo = { ...{ createdAt: new Date(), event: eventKey }, ...data }
  const result = await videosRef().add(newVideo)
  const video = { ...{ _key: result.id }, ...data }
  debug('addVideo', { video })
  return video
}

const updateVideo = async data => {
  debug('updateVideo')
  const updateData = { ...omit(data, ['_key']), ...{ updatedAt: new Date() } }
  debug('updateVideo', 'updateData', updateData)
  const videoKey = data._key
  await videoRef(videoKey).set(updateData)

  debug('updateVideo', { video: data })
  return data
}

const deleteEventVideos = async eventKey => {
  debug('deleteEventVideos')
  const videos = await getVideos(eventKey)
  debug('videos', videos)
  for (let index = 0; index < videos.length; index++) {
    debug('video', videos[index])
    await deleteVideo(videos[index]._key)
  }
  return null
}

const deleteVideo = async videoKey => {
  debug('deleteVideo')
  await videoRef(videoKey).delete()

  debug('deleteVideo', 'sucess')
  return null
}

const uploadVideo = async file => {
  debug('uploadVideo', 'file', file)
  const fileName = Date.now().toString(32)
  const data = await storage.child(`videos/${fileName}`).put(file)
  debug('uploadVideo', data)
  return data.ref.getDownloadURL()
}

export {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getVideos,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  uploadVideo,
}

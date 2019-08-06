import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import {  firebaseConfig} from '../../parameters'
const debug = require('debug')('APP:Setup:Firebase')
debug('Setup Firebase')

const app = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
export const storage = app.storage().ref()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })

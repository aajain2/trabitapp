import { storage, firestore } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getBlobFromURI } from '../util/getBlobFromURI';
import { collection, doc, documentId, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const updateAvatar = async (uri, uid) => {
  try {
    const avatarRef = doc(firestore, "users", uid)

    await updateDoc(avatarRef, {
      avatar: uri
    })
  } catch (e) {
    throw new Error(e)
  }
}

export const uploadAvatar = async (
  uri, 
  uid, 
  { onStart, onFinish, onFail }
) => {
  if (!uid) {
    throw new Error("Error with user ID")
  }

  const metadata = {
    contentType: 'image/jpg'
  }

  const blob = await getBlobFromURI(uri)

  const storageRef = ref(storage, 'avatars/' + uid + '.jpg');
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  onStart()

  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      onFail(error)
    }, 
    async () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        try {
          await updateAvatar(downloadURL, uid)
          await onFinish()
        } catch (e) {
          throw new Error(e)
        }
        
        console.log('File available at', downloadURL);
      });
    }
  )
}

// uidArray should always be less than 3
export const getAvatars = async (uidArray) => {
  if (uidArray.length > 3) {
    throw new Error("Too many UIDs")
  }

  if (uidArray.length > 0) {
    try {
      const avatars = []
  
      const userRef = collection(firestore, "users")

      const q = query(userRef, where(documentId(), "in", uidArray))
      const querySnapshot = await getDocs(q)
  
      querySnapshot.forEach((doc) => {
        avatars.push(doc.data().avatar)
      })

      return avatars
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

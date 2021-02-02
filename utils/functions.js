export const extractUserDetails = (user) => {
  const fields = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    phoneNumber: user.phoneNumber
  }

  return fields
}

export const mapDocs = (snapshot, idKey = 'id') => {
  const data = snapshot.docs.map(doc => {
    return {
      [idKey]: doc.id,
      ...doc.data()
    }
  })

  return data;
}

export const capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const filterChat = (userId, chats = {}) => {
  const chatId = Object.keys(chats)?.find(id => (chats[id]?.memberIds[userId]))

  return chatId;
}

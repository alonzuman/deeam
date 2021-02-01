export const extractUserDetails = (user) => {
  // console.log(user);
  const fields = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  }

  console.log('fields', fields)
}

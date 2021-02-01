import * as yup from 'yup'

const schemas = {
  signUp: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(6).max(32).required(),
    displayName: yup.string().min(2).max(64).required()
  }),
  signIn: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(6).max(32).required(),
  }),
  updateProfile: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    displayName: yup.string().min(2).max(64).required(),
    phoneNumber: yup.string().min(8).max(16).required()
  }),
  profileSections: {
    textHero: yup.object().shape({
      type: yup.string().required().oneOf(['textHero', 'imageHero']),
      title: yup.string().required(),
      body: yup.string().required()
    }),
    // imageHero: yup.object().shape({
    //   type: yup.string().required().oneOf(['textHero', 'image']),
    //   title: yup.string().required(),
    //   body: yup.string().required()
    // })
  }
}

export default schemas;

import * as yup from 'yup'

export const PROFILE_FIELDS = {
  personal: {
    displayName: {
      title: 'Name',
      key: 'displayName'
    },
    phoneNumber: {
      title: 'Phone Number',
      key: 'phoneNumber'
    },
    bio: {
      title: 'Bio',
      key: 'bio',
      config: {
        multiline: true,
        numberOfLines: 4,
        maxLength: 180,
        editable: true,
      }
    },
    gender: {
      title: 'Gender',
      key: 'gender',
      options: ['Male', 'Female', 'Non-Binary', 'Cross-Dresser', 'Other']
    },
    marijuana: {
      title: 'Marijuana',
      key: 'personal.marijuana',
      options: ['No', 'Sometimes', 'Yes']
    },
    drugs: {
      title: 'Drugs',
      key: 'drugs',
      options: ['No', 'Sometimes', 'Yes']
    },
    drink: {
      title: 'Drink',
      key: 'drink',
      options: ['No', 'Sometimes', 'Yes']
    },
  },
  answers: {
    title: 'Answers',
    key: 'answers',
  }
}

const schemas = {
  signUp: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(6).max(32).required(),
    confirmPassword: yup.mixed().test(
      'match',
      'Passwords do not match',
      function () {
        return this.parent.password === this.parent.confirmPassword
      }
    ),
  }),
  signIn: yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(6).max(32).required(),
  }),
  onBoarding: yup.object().shape({
    displayName: yup.string().min(2).max(64).required(),
    phoneNumber: yup.string().min(8).max(16).required()
  }),
  displayName: yup.object().shape({
    displayName: yup.string().min(2).max(64).required()
  }),
  bio: yup.object().shape({
    bio: yup.string().min(0).max(180)
  }),
  phoneNumber: yup.object().shape({
    phoneNumber: yup.string().min(2).max(64).required()
  }),
  gender: yup.object().shape({
    gender: yup.string().min(2).max(64)
  }),
  drink: yup.object().shape({
    drink: yup.string().min(2).max(64)
  }),
  marijuana: yup.object().shape({
    marijuana: yup.string().min(2).max(64)
  }),
  drugs: yup.object().shape({
    drugs: yup.string().min(2).max(64)
  }),
  chatMessage: yup.object().shape({
    content: yup.string().required()
  }),
  profileSections: {
    textHero: yup.object().shape({
      type: yup.string().required().oneOf(['textHero', 'imageHero']),
      title: yup.string().required(),
      body: yup.string().required()
    }),
  }
}

export default schemas;

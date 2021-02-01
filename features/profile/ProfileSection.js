import React from 'react'
import { View, Text } from 'react-native'
import ProfileImageHeroSection from './ProfileImageHeroSection';
import ProfileTextHeroSection from './ProfileTextHeroSection'

export default function ProfileSection({ type, data }) {
  console.log({type, data})

  switch (type) {
    case 'textHero': return <ProfileTextHeroSection title={data?.title} body={data?.body} />;
    case 'imageHero': return <ProfileImageHeroSection title={data?.title} uri={data?.uri} />
    default: return null;
  }
}

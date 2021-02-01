import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Container from '../components/Container';
import Header from '../components/Header';
import SecondaryButton from '../components/SecondaryButton';
import ProfileSection from '../features/profile/ProfileSection';
import { db } from '../firebase';

export default function Profile({ route, navigation }) {
  const { uid } = route?.params;
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfileAndSections = () => {
      const promises = [
        db.collection('profiles').doc(uid).get()
          .then(snapshot => {
            return {
              uid: snapshot.id,
              ...snapshot.data()
            }
          })
          .catch(err => {
            console.log(err.message)
          }),
        db.collection('profiles').doc(uid).collection('profileSections').get()
          .then(snapshot => {
            return [...snapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })]
          })
          .catch(err => {
            console.log(err.message)
          })
      ]

      Promise.all(promises)
        .then(values => setProfile({ ...values[0], sections: [...values[1]] }))
        .catch(err => console.log(err.message))
    }

    if (uid) {
      fetchProfileAndSections()
    }
  }, [uid])

  return (
    <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
      <Header title={profile?.displayName} />
      <SecondaryButton onPress={() => navigation.navigate('Add Profile Section')} title='Add Section' />
      {profile?.sections?.map(({ type, data }) => (
        <ProfileSection
          key={data.id}
          type={type}
          data={data}
        />
      ))}
      <View style={{ height: 155 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

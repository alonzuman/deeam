import React from 'react'
import { View, Text } from 'react-native'
import Card from '../../components/Card';
import ProfilePersonalInfoItem from './ProfilePersonalInfoItem';

export default function PersonalInfo({ profile }) {
  const { drugs, marijuana, gender, music, drink } = profile;
  const topRow = { drink, drugs, marijuana, gender, music }
  const noData = Object.keys(topRow)?.map(key => topRow[key])?.filter(v => v)?.length === 0

  if (noData) return null;

  return (
    <Card>
      {Object.keys(topRow)?.map(key => {
        if (topRow[key]) return (
          <ProfilePersonalInfoItem
            key={key}
            field={key}
            value={topRow[key]}
          />
        )
      })}
    </Card>
  )
}

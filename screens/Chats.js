import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import ChatListItem from '../features/matches/ChatListItem'
import { setMatchesAsync } from '../features/matches/matchesSlice'

export default function Chats() {
  const { profile } = useSelector(state => state.profile)
  const { matches } = useSelector(state => state.matches)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMatchesAsync(profile.uid))
  }, [])

  return (
    <>
      <ScrollView>
        <Header style={{ paddingHorizontal: 16 }} notSafe title='Chats' />
        {matches?.map(match => {
          const { displayName, photoURL } = match?.membersData?.find(v => v?.uid !== profile.uid);
          const {lastMessage, id} = match;
          return (
            <ChatListItem
              displayName={displayName}
              photoURL={photoURL}
              lastMessage={lastMessage}
              key={id}
              id={id}
            />
          )
        })}
      </ScrollView>
    </>
  )
}


const data = [
  { id: 1, displayName: 'Shir Lennon', photoURL: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', lastMessage: 'Laboris amet do pariatur cupidatat nisi qui magna veniam elit adipisicing sit in sint.' },
  { id: 2, displayName: 'Jenna Perets', photoURL: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', lastMessage: 'Duis veniam amet in pariatur exercitation aute velit.' },
  { id: 3, displayName: 'Tamar Cohen', photoURL: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', lastMessage: 'Voluptate commodo sint quis irure non occaecat irure aliqua nostrud.' },
  { id: 4, displayName: 'Lina Masha', photoURL: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', lastMessage: 'Aliquip reprehenderit duis dolor sunt consectetur irure tempor adipisicing nostrud laborum tempor aute.' },
  { id: 5, displayName: 'John Lennon', photoURL: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', lastMessage: 'Minim mollit irure ad labore est do minim proident veniam veniam esse.' },
]

import { View, Text, Dimensions, FlatList } from 'react-native'
import React from 'react'
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight'
import getMessageHeightOffset from '../helpers/getMessageHeightOffset';
import MessageBubble from './MessageBubble';
import EmptyComponent from './EmptyComponent';

const windowHeight = Dimensions.get('window').height;

const Chat = ({
    isTyping,
    messages,
    heightOfMessageBox
}) => {

    const keyBoardOffsetHeight = useKeyboardOffsetHeight();

    const renderMessageBubble = ({item}) => {
        return <MessageBubble message={item}/>
    }

  return (
    <View style={{
        height: windowHeight * 0.76 - keyBoardOffsetHeight * 0.95 -getMessageHeightOffset(heightOfMessageBox, windowHeight),
    }}>
      {messages?.length == 0 ? (
      <EmptyComponent isTyping={isTyping}/>
      ) : (
      <FlatList 
        indicatorStyle='black'
        data={[...messages].reverse()}
        inverted
        estimatedItemSize={40}
        renderItem={renderMessageBubble}
        />
    )}
    </View>
  )
}

export default Chat
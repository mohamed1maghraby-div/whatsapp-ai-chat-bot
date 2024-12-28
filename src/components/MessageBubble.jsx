import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import dayjs from 'dayjs'
// import TickIcon from '../assets/tick.svg'
import MarkdownDisplay from 'react-native-markdown-display'
import LoadingDots from './LoadingDots'

const MessageBubble = ({message}) => {

    const isMyMessage = message.role == 'user'
    const isMessageRead = message?.isMessageRead;

  return (
    <View style={{
        ...styles.messageContainer,
        maxWidth: isMyMessage ? '80%' : '92%',
        alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isMyMessage ? '#154d37' : '#232626',
        borderTopLeftRadius: isMyMessage ? 5 : 0,
        borderTopRightRadius: isMyMessage ? 0 : 5,
        }}>

        {!isMyMessage && (
            <View style={{
              ...styles.leftMessageArrow,
                display: isMyMessage ? 'none' : 'flex',
            }}/>
        )}

        {message?.isLoading ? (
          <LoadingDots />
        ) : message?.imageUri ? (
          <Image 
            source={{uri: message?.imageUri}}
            style={styles.img}
          />
        ) :
        (
          <MarkdownDisplay
            style={{
              body: {
                ...styles.messageText,
                left: isMyMessage ? 10 : 0,
                marginVertical: 0,
                paddingVertical: 0,
              },
              link: 
              {
                color: 'lightblue',
              },
              blockquote: {
                color: 'white',
                backgroundColor: '#1d211e',
                borderRadius: 4,
                borderLeftWidth: 0,
              },
              table: {
                borderColor: 'white',
              },
              code_inline: {
                backgroundColor: '#1d211e',
                color: 'white',
                borderRadius: 5,
                fence: {
                  backgroundColor: '#1d211e',
                  color: 'white',
                  borderRadius: 5,
                  borderWidth:0
                },
                tr: {
                  borderColor: 'white',
                }
              }
            }}
          > 
            {message.content}
          </MarkdownDisplay>
          )}

      {isMyMessage && (
          <View style={{
            ...styles.rightMessageArrow,
            display:isMyMessage ? 'flex' : 'none'
          }}
          />
      )}

      <View style={{ ...styles.timeAndReadContainer,right:0}}>
        <Text style={styles.timeText}>
          {dayjs(message.time).format('HH:mm A')}
        </Text>
        {/* {isMyMessage && (
          <View>
            <Image source={TickIcon}
              tintColor={isMessageRead ? '#53a6fd' : '#8aa69b'}
              style={{width: 15, height: 15}}
            />
          </View>
        )} */}
        {isMyMessage && (
            <Text style={{
              ...styles.timeText,
              color: isMessageRead ? '#53a6fd' : '#8aa69b',
            }}>
              ✔✔
              {/* {isMessageRead ? '✔✔' : '✔'} */}
            </Text>
        )}
      </View>
    </View>
  )
}

export default MessageBubble

const styles = StyleSheet.create({
    messageContainer: {
        minWidth: '24%',
        marginVertical: 8,
        marginHorizontal: 10,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 10,
        borderRadius: 10
    },
    messageText: {
        fontSize: RFValue(11.4),
        color: 'white',
        marginBottom: 15,
        marginRight: 15
    },
    img: {
      height: RFPercentage(20),
      width: RFPercentage(35),
      resizeMode: 'cover',
      left: -5,
      aspectRatio: 4 / 4,
      borderRadius: 20,
    },
    leftMessageArrow: {
      height: 0,
      width: 0,
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderTopColor: '#232626',
      borderTopWidth: 10,
      alignSelf: 'flex-start',
      borderRightColor: 'black',
      right: 10,
      bottom: 0
    },
    rightMessageArrow: {
      height: 0,
      position: 'absolute',
      width: 0,
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderTopColor: '#154d37',
      borderTopWidth: 10,
      alignSelf: 'flex-start',
      right: -8,
      top: 0
    },
    timeAndReadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      bottom: 4,
      position: 'absolute',
      paddingHorizontal: 10,
      gap: 2
    },
    timeText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#8aa69b',
    }
})
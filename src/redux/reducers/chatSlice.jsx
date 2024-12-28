import {createSlice} from '@reduxjs/toolkit'

const initialState={
    chats: [],
    currentChatId:''
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const {chatId, message} = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
            if(chatIndex !== -1){
                state.chats[chatIndex].messages.push(message);
            }
        },
        clearAllChats: state => {
            state.chats = []
        },
        changeCurrentChatId: (state, action) => {
            state.currentChatId = action.payload.chatId
        },
        createNewChat: (state, action) => {
            const {chatId, messages, summary} = action.payload;
            state.chats.push({id: chatId, messages, summary})
        },
        clearChat: (state, action) => {
            const chatIndex = state.chats.findIndex(chat => chat.id === action.payload.chatId);
            if(chatIndex !== -1){
                state.chats[chatIndex].messages = [];
            }
        }
    }
})

export const { clearAllChats, clearChat, addMessage, createNewChat, changeCurrentChatId } = chatSlice.actions;

export const selectChats = state => state.chat.chats;
export const selectCurrentChatId = state => state.chat.currentChatId;

export default chatSlice.reducer;
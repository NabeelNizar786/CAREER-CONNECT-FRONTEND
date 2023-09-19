import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chats',
    initialState: [],
    reducers: {
      addChat: (state, action) => {
        // Add a new chat to the state
        state.push(action.payload); // Assuming action.payload contains the chat object
      },
      markChatAsUnread: (state, action) => {
        // Update the hasUnreadMessages property for a specific chat
        const chatId = action.payload;
        const chat = state.find((chat) => chat.id === chatId);
        if (chat) {
          chat.hasUnreadMessages = true;
        }
      },
    },
  });
  
  export const { addChat, markChatAsUnread } = chatSlice.actions;
  export default chatSlice.reducer;
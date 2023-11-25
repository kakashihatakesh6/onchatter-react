

const mountJoinChatEvent = (socket) => {
    
    socket.on('user-details', (chatId) => {
      console.log(`User joined the chat 🤝. chatId: `, chatId);
      
    });
  };

module.exports = mountJoinChatEvent;
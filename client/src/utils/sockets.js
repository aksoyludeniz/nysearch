import io from "socket.io-client";
const socket = io();

const subscribeToArticleNotifications = cb => {
  socket.on('article_saved', article => cb(article));
};

export { socket, subscribeToArticleNotifications };
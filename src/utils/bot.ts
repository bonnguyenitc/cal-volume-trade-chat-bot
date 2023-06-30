const sendMessage = (chatId: string, message: string) => {
  return fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { sendMessage };

const CHAT_BOT_TOKEN = "6431963038:AAGolRw4BiTCbqT3NEXaKHmaoJuRhsoLH4k";
const CHAT_ID = "-4534243898";

export const sendMessageToTelegram = async (message: string) => {
  const url = `https://api.telegram.org/bot${CHAT_BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

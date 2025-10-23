// utils/chatId.js
export const getChatId = (uid1, uid2) => {
  return [uid1, uid2].sort().join("_"); // consistent ID for same pair
};

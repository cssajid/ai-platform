export function optimizeTokens(messages: any[]) {
  const maxMessages = 10;

  if (messages.length > maxMessages) {
    return messages.slice(-maxMessages);
  }

  return messages;
}

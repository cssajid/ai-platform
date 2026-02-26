export interface LLMAdapter {
  chat(messages: any[], stream: boolean, res: any): Promise<void>;
}

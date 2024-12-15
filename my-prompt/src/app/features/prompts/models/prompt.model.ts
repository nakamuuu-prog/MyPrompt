export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptRequest {
  title: string;
  content: string;
  category: string;
}

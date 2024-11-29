export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'GPTプログラミングアシスタント',
    content: 'あなたは熟練のプログラマーです...',
    category: '開発',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: '英語添削プロンプト',
    content: 'あなたは英語教師です...',
    category: '語学',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

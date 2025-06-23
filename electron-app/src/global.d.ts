export {};
type ClipType = "text" | "image" | "link";
export interface ClipRow {
  id: number;
  type: ClipType;
  content: string;
  timestamp: number;
  favorite: 0 | 1;
}

declare global {
  interface Window {
    api: {
      getHistory(): Promise<ClipRow[]>;
      searchHistory(q: string): Promise<ClipRow[]>;
      toggleFav(id: number): Promise<void>;
      copy(row: ClipRow): Promise<void>;
      ai(
        action: "summarize" | "rewrite" | "translate" | "extract",
        text: string,
        apiKey: string,
      ): Promise<string>;
      onHistory(cb: () => void): () => void;
    };
  }
}

export interface TodoDTO {
  id: string;
  content: {
    raw: string;
    html: string;
  };
  isCompleted: boolean;
}

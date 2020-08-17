import { User } from './user';
import { CommentLevel1 } from './comment-level1';
export interface CommentLevel2 {
  id: number;
  content: string;
  commentLevel1: CommentLevel1;
  user: User;
}

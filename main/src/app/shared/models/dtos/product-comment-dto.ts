import { CommentLevel2} from "../comment-level2";
export interface  ProductCommentDto {
  id: number,
  content: string,
  user: {
    id: number,
    fullname: string
  },
  commentLevel2List?: ProductCommentDto[]
}

export interface postDiaryRequest {
  title: string;
  content: string;
  imageUrl: string;
  isPublic: boolean;
}

export interface postDiaryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    public: boolean;
  };
}

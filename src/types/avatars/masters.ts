export interface AvatarType {
  id: number;
  defaultImageUrl: string;
  description: string;
}

// 아바타 선택하기 조회 API 응답 타입
export interface SelectAvatarResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AvatarType[];
}

// 아바타 생성하기 응답 타입
export interface CreateAvatarResponse {
  imageUrl: string;
}

// 아바타 최종 선택하기 API 요청 및 응답 타입
export interface FinalChoiceAvatarRequest {
  nickname: string;
  imageUrl: string;
  masterId: number;
}

export interface FinalChoiceAvatarResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

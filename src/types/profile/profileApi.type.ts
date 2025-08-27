export type AvatarInfo = {
  avatarId: number;
  avatarName: string;
  avatarImageUrl: string;
};

export type GardenInfo = {
  gardenId: number;
  avatarInfo: AvatarInfo;
  isWateringAbleByMe: boolean;
};

export enum FollowStatus {
  /** 팔로우하지 않는 상태 (친구 추가 버튼) */
  NOT_FOLLOWING = "NOT_FOLLOWING",
  /** 내가 상대방을 팔로우하는 상태 */
  FOLLOWING = "FOLLOWING",
  /** 상대방이 나를 팔로우하는 상태 (맞팔로우 버튼) */
  FOLLOW_BACK_POSSIBLE = "FOLLOW_BACK_POSSIBLE",
}

export type GetUserProfileResponse = {
  id: number;
  userNickname: string;
  profileImageUrl: string | null;
  followStatus: FollowStatus;
  leftWaterCountForOthers: number;
  userGardens: GardenInfo[];
};

export type FriendWaterResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};

export type FollowUserResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};

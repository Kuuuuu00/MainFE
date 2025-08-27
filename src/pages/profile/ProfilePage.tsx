import { useNavigate, useParams } from "react-router-dom";

import { Left } from "@/assets/icons/common";
import ProfileDetail from "@/components/profile/ProfileDetail";
import { useUserProfile } from "@/hooks/profile/useProfileApi";
import { FollowStatus } from "@/types/profile/profileApi.type";

import { postFollowUser } from "@/apis/follow/followApi";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useUserProfile(userId);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleWaterSuccess = () => {
    // 물주기 성공 시 프로필 데이터 다시 받아오기
    refetch();
  };

  const handleFollowClick = async () => {
    if (!userId) return;

    try {
      const res = await postFollowUser(userId);
      console.log("팔로우 성공:", res);

      // 성공 시 프로필 데이터 다시 받아오기
      refetch();
    } catch (error) {
      console.error("팔로우 실패:", error);
    }
  };

  const renderFollowButton = (followStatus: FollowStatus) => {
    switch (followStatus) {
      case FollowStatus.NOT_FOLLOWING:
        return (
          <button
            className="text-primary text-body-sb"
            onClick={handleFollowClick}
          >
            친구 추가
          </button>
        );
      case FollowStatus.FOLLOWING:
        return <span className="text-gray-400 text-body-sb">팔로잉</span>;
      case FollowStatus.FOLLOW_BACK_POSSIBLE:
        return (
          <button
            className="text-primary text-body-sb"
            onClick={handleFollowClick}
          >
            맞팔로우
          </button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-body2 text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-body2 text-gray-600">
          프로필을 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full w-full">
      {/* 헤더 */}
      <header className="flex items-center justify-between p-4 bg-white z-30">
        <button onClick={handleBackClick} className="p-2">
          <Left className="w-6 h-6" />
        </button>
        <h1 className="text-heading2">프로필</h1>
        <div className="w-10" /> {/* 오른쪽 여백 */}
      </header>

      {/* 사용자 정보 */}
      <div className="flex h-16 items-center justify-between py-4 px-5 bg-white z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            {data.profileImageUrl ? (
              <img
                src={data.profileImageUrl}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-400 rounded-full" />
            )}
          </div>
          <span className="text-body1 text-gray-900">{data.userNickname}</span>
        </div>
        {renderFollowButton(data.followStatus)}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 relative z-10">
        {data.userGardens.length > 0 ? (
          <ProfileDetail
            garden={data.userGardens[0]}
            leftWaterCountForOthers={data.leftWaterCountForOthers}
            onWaterSuccess={handleWaterSuccess}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-body2 text-gray-600">정원이 없습니다.</div>
          </div>
        )}
      </div>

      {/* 방명록 작성 버튼 */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <button className="w-full py-3 px-4 bg-white border border-primary rounded-lg text-heading2 text-primary">
          방명록 작성
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

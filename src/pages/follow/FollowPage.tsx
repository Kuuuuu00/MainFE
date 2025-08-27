import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Left } from "@/assets/icons/common";
import UserCard from "@/components/follow/UserCard";
import type { FollowResponse } from "@/types/follow";

import {
  createMockAddedResponse,
  createMockFollowedResponse,
} from "@/mocks/follow/follow";

type Tab = "added" | "followed"; // 내가 추가한 / 나를 추가한

const FollowPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("added");
  const [addedData, setAddedData] = useState<FollowResponse>({ result: [] });
  const [followedData, setFollowedData] = useState<FollowResponse>({
    result: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate("/feed");
  };

  // Mock 데이터 로드 (백엔드 완성 후 제거)
  useEffect(() => {
    const loadMockData = () => {
      setIsLoading(true);
      try {
        const addedMock = createMockAddedResponse();
        const followedMock = createMockFollowedResponse();
        setAddedData(addedMock);
        setFollowedData(followedMock);
      } catch {
        setError("데이터 로드 실패");
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  const handleRemoveUser = (userId: number) => {
    // 친구 삭제 로직 (백엔드 완성 후 구현)
    console.log("친구 삭제:", userId);
  };

  const currentData = activeTab === "added" ? addedData : followedData;

  return (
    <section className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={handleBackClick}>
          <Left className="w-6 h-6 cursor-pointer" />
        </button>
        <h1 className="text-heading2">내 친구</h1>
        <div className="w-6"></div>
      </div>

      {/* 토글: 내가 추가한 / 나를 추가한 */}
      <div className="mb-6 flex w-full justify-center">
        <div className="flex w-full">
          <button
            className={`flex-1 py-3 text-center text-body1 ${
              activeTab === "added"
                ? "text-black border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("added")}
          >
            내가 추가한
          </button>

          <button
            className={`flex-1 py-3 text-center text-body1 ${
              activeTab === "followed"
                ? "text-black border-b-2 border-primary"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("followed")}
          >
            나를 추가한
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">에러: {error}</div>
        </div>
      ) : (
        <div className="w-full">
          {currentData.result.map(user => (
            <UserCard
              key={user.userId}
              user={user}
              onRemove={handleRemoveUser}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FollowPage;

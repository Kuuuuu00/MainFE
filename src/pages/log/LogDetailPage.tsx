import { useNavigate, useParams } from "react-router-dom";

import { Left, Send } from "@/assets/icons/common";
import MyDiaryDetail from "@/components/log/MyDiaryDetail";

import { createMockDiaryDetailResponse } from "@/mocks/log/diary";

const LogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // id가 존재하는지 확인
  if (!id) {
    return <section className="w-full">일기를 찾을 수 없습니다.</section>;
  }

  const diaryId = parseInt(id, 10);

  // 유효한 숫자인지 확인
  if (isNaN(diaryId)) {
    return <section className="w-full">잘못된 일기 ID입니다.</section>;
  }

  // 목데이터로 일기 상세 정보 가져오기
  const diaryDetail = createMockDiaryDetailResponse(diaryId);

  const handleBackClick = () => {
    navigate("/log?tab=diary");
  };

  return (
    <div className="w-full h-full flex flex-col md:h-[852px]">
      {/* 상단 헤더 */}
      <header className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-3 py-3 flex-shrink-0">
        <button onClick={handleBackClick}>
          <Left className="w-6 h-6 cursor-pointer" />
        </button>
        <h1 className="text-heading2 text-black">나의 일기</h1>
        <div className="w-6 h-6"></div> {/* 오른쪽 여백*/}
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto">
        <MyDiaryDetail diaryDetail={diaryDetail} />
      </main>

      {/* 하단 댓글 입력창 */}
      <div className="w-full h-18 border-t border-gray-200 bg-white px-5 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            className="flex-1 px-4 py-2 bg-gray-200 rounded-full focus:bg-gray-400 focus:outline-none transition-colors"
          />
          <Send className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default LogDetailPage;

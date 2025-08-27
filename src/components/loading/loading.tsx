const LoadingDots = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-primary-varient md:max-w-[430px] md:h-[852px] mx-auto">
      {/* 텍스트 영역 */}
      <div className="text-center flex flex-col items-center gap-2">
        🌱
        <p className="text-lg md:text-xl font-semibold text-gray-600">
          식물의 정보를
          <br />
          불러오고 있어요
        </p>
      </div>

      {/* 점 애니메이션 영역 */}
      <div className="flex items-center justify-center gap-3">
        <div
          className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};

export default LoadingDots;

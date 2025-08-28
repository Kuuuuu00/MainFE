import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Plant from "@/assets/icons/bottom-sheet/plant.svg?react";
import { Check, UnCheck } from "@/assets/icons/common";
import Right from "@/assets/icons/common/right.svg?react";
import { usePanelApi } from "@/hooks/home/usePanelApi";

const BottomSheet: React.FC<{ setIsModalOpen: (isOpen: boolean) => void }> = ({
  setIsModalOpen,
}) => {
  const navigate = useNavigate();
  const { data } = usePanelApi();
  console.log(data);
  // ===== 표시용 상태 =====
  const [isChecked, setIsChecked] = useState(data?.isCheckingCompleted);
  const [isChecked2, setIsChecked2] = useState(data?.isDairyCompleted);
  const [isChecked3, setIsChecked3] = useState(data?.isQuizCompleted);
  const [percent, setPercent] = useState(data?.wishTree.progressPercent);
  const randomNum = (Math.floor(Math.random() * 3) + 1) % 2;
  const path =
    randomNum === 1
      ? "/dailyMission/quiz/multipleChoice"
      : "/dailyMission/quiz/ox";

  // ===== 스냅/드래그 파라미터 =====

  // 스냅 완료 상태를 보관(초기엔 닫힘 위치로 시작)
  useEffect(() => {
    setIsChecked(data?.isCheckingCompleted);
    setIsChecked2(data?.isDairyCompleted);
    setIsChecked3(data?.isQuizCompleted);
    setPercent(data?.wishTree.progressPercent);
  }, [data]);

  // ===== DOM/드래그 제어용 ref =====
  const rafId = useRef<number | null>(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startTranslate = useRef(0);
  const lastMoveT = useRef(0);
  const lastMoveY = useRef(0);
  const velocity = useRef(0);

  // 드래그 끝단 저항감(러버밴드)
  const OVERDRAG = 40;
  const RESISTANCE = 0.35;

  const snapPoints = [100, 560]; // [초기 90, 풀오픈 560]
  const maxSnap = Math.max(...snapPoints);

  // 2) 초기 높이를 '90px'로 고정
  const INITIAL_HEIGHT = 90;
  const INITIAL_TY = maxSnap - INITIAL_HEIGHT; // translateY = 560 - 90 = 470

  // 3) 상태/레퍼런스 초기값을 초기 위치로 세팅
  const [y, setY] = useState<number>(INITIAL_TY);
  const sheetRef = useRef<HTMLDivElement>(null);
  const liveTranslate = useRef<number>(INITIAL_TY);

  const minTranslate = maxSnap - snapPoints[0]; // peek 위치의 translateY

  const MAX_OPEN_HEIGHT = snapPoints[1]; // ← 원하는 최대 열림 높이
  const TOP_TRANSLATE = Math.max(0, maxSnap - MAX_OPEN_HEIGHT);

  // 4) 첫 페인트 전에 바로 위치 고정(애니메이션 없이)
  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.transform = `translateY(${INITIAL_TY}px) translateZ(0)`;
  }, [INITIAL_TY]);

  // ===== 유틸 =====
  const applyStyle = (ty: number, animate = false) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.willChange = "transform";
    el.style.transition = animate
      ? "transform 280ms cubic-bezier(.2,.8,.2,1)"
      : "none";
    el.style.transform = `translateY(${ty}px) translateZ(0)`; // GPU 힌트
  };

  const clampWithRubber = (raw: number) => {
    if (raw < 0) return 0 + (raw - 0) * RESISTANCE; // 위로 과도하게 끌면 저항
    if (raw > minTranslate) {
      const over = raw - minTranslate;
      return minTranslate + Math.min(over, OVERDRAG) * RESISTANCE; // 아래도 약간만
    }
    return raw;
  };

  const [snapIdx, setSnapIdx] = useState(0); // 0=peek(90), 1=full(560)

  // snapTo 수정
  const snapTo = (idx: number) => {
    setSnapIdx(idx); // ← 현재 스냅 기록
    const h = snapPoints[idx];
    let ty = maxSnap - h;
    ty = Math.max(ty, TOP_TRANSLATE); // ⬅️ 한계 보정
    applyStyle(ty, true);
    setTimeout(() => setY(ty), 300);
    liveTranslate.current = ty;
  };

  // ===== 초기 진입: peek(200)까지 슥 올라오기 =====
  useEffect(() => {
    const initialIdx = 0; // peek
    const target = maxSnap - snapPoints[initialIdx];
    requestAnimationFrame(() => {
      applyStyle(target, true);
      setY(target);
      liveTranslate.current = target;
    });
  }, [maxSnap]);

  // ===== 드래그 핸들러 (핸들 바에만 바인딩 권장) =====
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);

    startY.current = e.clientY;
    startTranslate.current = liveTranslate.current || y;

    lastMoveT.current = performance.now();
    lastMoveY.current = e.clientY;

    // 드래그 시작 시 트랜지션 끄기
    const el = sheetRef.current;
    if (el) el.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const now = performance.now();
    const dy = e.clientY - startY.current;
    const rawNext = startTranslate.current + dy;
    const next = clampWithRubber(rawNext);

    const capped = Math.max(next, TOP_TRANSLATE);

    // 속도(px/ms)
    const dt = Math.max(1, now - lastMoveT.current);
    velocity.current = (e.clientY - lastMoveY.current) / dt;
    lastMoveT.current = now;
    lastMoveY.current = e.clientY;

    liveTranslate.current = capped;

    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(() => {
        applyStyle(liveTranslate.current, false);
        cancelAnimationFrame(rafId.current!);
        rafId.current = null;
      });
    }

    e.preventDefault(); // 배경 스크롤/텍스트 선택 방지
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    // 열린 "높이" 기준으로 관성 투사(160ms 정도)
    const openedHeight = maxSnap - liveTranslate.current;
    const projected = openedHeight + velocity.current * -160;

    // 가까운 스냅 찾기
    let bestIdx = 0;
    let bestDiff = Infinity;
    snapPoints.forEach((h, i) => {
      const diff = Math.abs(h - projected);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
      }
    });

    snapTo(bestIdx);
  };
  return (
    <div
      className="absolute inset-0 z-50 overflow-hidden w-full pointer-events-none"
      style={{ touchAction: "none" }}
    >
      {/* ✅ 풀 오픈일 때만 백드롭 렌더 */}
      {snapIdx > 0 && (
        <button
          className="absolute inset-0 pointer-events-auto"
          onClick={() => snapTo(0)}
        />
      )}

      {/* 패널 */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center z-10 ">
        <div
          ref={sheetRef}
          className="pointer-events-auto w-full rounded-t-2xl border-t border-gray-200 bg-white p-2"
          // 스냅 완료 상태 동기화 전용(드래그 중엔 applyStyle이 직접 반영)
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* drag handle (여기에만 포인터 바인딩하면 콘텐츠 스크롤과 충돌 줄어듦) */}
          <div className="mx-auto mb-2 h-1 w-10 rounded-2xl bg-gray-400 select-none cursor-grab active:cursor-grabbing" />

          {/* ======= 콘텐츠 ======= */}
          <div className="rounded-t-2xl bg-white p-4 pt-2">
            <div className="text-heading2 flex justify-between">
              오늘의 미션
              <div className="flex gap-2">
                {isChecked ? (
                  <Check className="h-8 w-8" />
                ) : (
                  <UnCheck className="h-8 w-8" />
                )}
                {isChecked2 ? (
                  <Check className="h-8 w-8" />
                ) : (
                  <UnCheck className="h-8 w-8" />
                )}
                {isChecked3 ? (
                  <Check className="h-8 w-8" />
                ) : (
                  <UnCheck className="h-8 w-8" />
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {[
                {
                  label: "마음 건강 체크",
                  on: isChecked,
                  action: () => {
                    setIsModalOpen(true);
                  },
                },
                {
                  label: "일기 쓰기",
                  on: isChecked2,
                  action: () => navigate("/dailyMission/writeDiary"),
                },
                {
                  label: "퀴즈 풀기",
                  on: isChecked3,
                  action: () => navigate(path),
                },
              ].map(({ label, on, action }, i) => (
                <div
                  key={i}
                  className={`flex w-full justify-between rounded-lg border p-4 transition-colors items-center
                    ${
                      on
                        ? "border-transparent bg-primary-varient text-primary-font text-body1"
                        : "border-gray-200 bg-white text-gray-600 text-body2"
                    }`}
                  onClick={action}
                >
                  {label}
                  {on ? (
                    <Check className="h-8 w-8" />
                  ) : (
                    <Right className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="my-10 w-full border-t border-gray-200" />

            <div className="flex flex-col gap-1 text-body-sb text-black">
              <div className="text-heading2 flex items-center gap-1 ">
                <Plant className="h-8 w-8" />
                소망 나무
              </div>
              <p>
                {percent && percent >= 100 ? (
                  <span>
                    지금 바로{" "}
                    <span className="text-primary-font">새로운 텃밭</span>을 열
                    수 있어요!
                  </span>
                ) : (
                  <span>
                    소망 나무 다음 성장까지{" "}
                    <span className="text-primary-font">
                      {" "}
                      {100 - (percent || 0)}%
                    </span>
                    가 남았어요!
                  </span>
                )}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-body-sb text-primary-font">
                {data?.wishTree.currentStage}
              </div>
              <div className="text-body-sb text-black">
                {data?.wishTree.nextStage}
              </div>
            </div>
            <div className="flex flex-col mt-4 h-2 w-full rounded-lg gap-1 text-body-sb bg-gray-200 text-black relative">
              <div
                className="absolute top-0 left-0 h-full bg-primary-font rounded-lg"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          {/* ==================== */}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;

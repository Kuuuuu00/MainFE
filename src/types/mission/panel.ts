export interface dailyMissions {
  userDailyMissionId: number;
  missionType: string;
  title: string;
  completed: boolean;
}

export interface wishTress {
  currentStage: string;
  currentPoints: number;
  requiredPointsForNextStage: number;
}

export interface MissionPanelReseponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    dailyMissions: dailyMissions[];
    wishTree: {
      currentStage: string;
      currentPoints: number;
      requiredPointsForNextStage: number;
    };
  };
}

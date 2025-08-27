// import useHomeApi from "./useHomeApi";
// import { useHomeSummaryStore } from "@/stores/useGardenStore";
// import { useEffect } from "react";

// export const useHome = () => {
//   const { data } = useHomeApi();
//   const { updateGarden, updateMissions, setUser } = useHomeSummaryStore();

//   useEffect(() => {
//     if (data) {
//       setUser(data.userInfo);
//       data.gardenSummaries.forEach(g => updateGarden(g.gardenId, g));
//       updateMissions(data.todayMissions);
//     }
//   }, [data]);
// };

// export default useHome;

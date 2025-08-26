import { useState } from "react";

import MapImage from "@/assets/images/map.png";
import MapModal from "@/components/map/Modal";

const Map = ({ isNumber }: { isNumber: number }) => {
  const [openMap, setOpenMap] = useState(false);

  return (
    <>
      <img
        src={MapImage}
        onClick={() => setOpenMap(true)}
        alt="map"
        className="w-12 h-auto cursor-pointer z-20"
      />
      {openMap && <MapModal isNumber={isNumber} setIsOpen={setOpenMap} />}
    </>
  );
};

export default Map;

import React from "react";
import { Sky as ThreeSky } from "@react-three/drei";

/**
 * Sky Component: A professional sky component using @react-three/drei's Sky.
 * Adjust the properties below to customize the sky's appearance.
 *
 * @param {number} distance - The distance of the sky.
 * @param {number} inclination - The angle at which the sun is inclined from the zenith.
 * @param {number} azimuth - The azimuth angle of the sun.
 * @returns {JSX.Element} - The rendered Sky component.
 */
const Sky = ({ distance = 45000, inclination = -0.25, azimuth = -0.5 }) => {
  return (
    <ThreeSky
      distance={distance}
      inclination={inclination}
      azimuth={azimuth}
    />
  );
};

export default Sky;



export interface HyperspeedEffectOptions {
  onSpeedUp?: (ev: Event) => void;
  onSlowDown?: (ev: Event) => void;
  distortion: string;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingCloserSpeed: [number, number];
  rotatingSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: {
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number[];
    rightCars: number[];
    sticks: number;
  };
}

export const hyperspeedPresets: Record<string, HyperspeedEffectOptions> = {
  one: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingCloserSpeed: [-250, -230],
    rotatingSpeed: [0.13, 0.15],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xa855f7, 0x7c3aed, 0xc084fc],
      rightCars: [0x06b6d4, 0x0891b2, 0x22d3ee],
      sticks: 0x06b6d4,
    },
  },
  two: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'LongRaceDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingCloserSpeed: [-250, -230],
    rotatingSpeed: [0.13, 0.15],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd00000, 0xcc0000, 0xbb0000],
      rightCars: [0xfafafa, 0xeeeeee, 0xdddddd],
      sticks: 0xfafafa,
    },
  },
};

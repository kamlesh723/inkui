'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';
import { BloomEffect } from 'postprocessing';
import { EffectPass } from 'postprocessing';
import { RenderPass } from 'postprocessing';
import type { HyperspeedEffectOptions } from './HyperspeedPresets';

// ─── Distortion functions ─────────────────────────────────────────────────────

const turbulentDistortion = {
  uniforms: {
    uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
    uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
  },
  getDistortion: `
    uniform vec2 uDistortionX;
    uniform vec2 uDistortionY;
    float nsin(float val){ return sin(val) * 0.5 + 0.5; }
    #define PI 3.14159265358979
    float getDistortionX(float progress){
      return (
        cos(PI * progress * uDistortionX.y + uTime) * (uDistortionX.x / (uDistortionX.y * PI * 2.0))
        -
        cos(PI * uDistortionX.y + uTime) * (uDistortionX.x / (uDistortionX.y * PI * 2.0))
      );
    }
    float getDistortionY(float progress){
      return (
        -nsin(PI * progress * uDistortionY.y + uTime) * (uDistortionY.x / (uDistortionY.y * PI * 2.0))
        +
        nsin(PI * uDistortionY.y + uTime) * (uDistortionY.x / (uDistortionY.y * PI * 2.0))
      );
    }
    vec3 getDistortion(float progress){
      return vec3(getDistortionX(progress), getDistortionY(progress), 0.0);
    }
  `,
  getJS: (progress: number, time: number) => {
    const uDistortionX = new THREE.Vector2(80, 3);
    const uDistortionY = new THREE.Vector2(-40, 2.5);
    const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;
    const PI = Math.PI;
    const x =
      Math.cos(PI * progress * uDistortionX.y + time) *
        (uDistortionX.x / (uDistortionX.y * PI * 2)) -
      Math.cos(PI * uDistortionX.y + time) *
        (uDistortionX.x / (uDistortionX.y * PI * 2));
    const y =
      -nsin(PI * progress * uDistortionY.y + time) *
        (uDistortionY.x / (uDistortionY.y * PI * 2)) +
      nsin(PI * uDistortionY.y + time) *
        (uDistortionY.x / (uDistortionY.y * PI * 2));
    return new THREE.Vector3(x, y, 0);
  },
};

const LongRaceDistortion = {
  uniforms: {
    uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 2)),
    uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 3)),
  },
  getDistortion: `
    uniform vec2 uDistortionX;
    uniform vec2 uDistortionY;
    #define PI 3.14159265358979
    float getDistortionX(float progress){
      return cos(PI * progress * uDistortionX.y + uTime) * (uDistortionX.x / (uDistortionX.y * PI * 2.0));
    }
    float getDistortionY(float progress){
      return sin(PI * progress * uDistortionY.y + PI / 2.0 + uTime) * (uDistortionY.x / (uDistortionY.y * PI / 2.0));
    }
    vec3 getDistortion(float progress){
      return vec3(getDistortionX(progress), getDistortionY(progress), 0.0);
    }
  `,
  getJS: (progress: number, time: number) => {
    const uDistortionX = new THREE.Vector2(80, 2);
    const uDistortionY = new THREE.Vector2(-40, 3);
    const PI = Math.PI;
    const x =
      Math.cos(PI * progress * uDistortionX.y + time) *
      (uDistortionX.x / (uDistortionX.y * PI * 2));
    const y =
      Math.sin(PI * progress * uDistortionY.y + PI / 2 + time) *
      (uDistortionY.x / (uDistortionY.y * PI / 2));
    return new THREE.Vector3(x, y, 0);
  },
};

const distortions: Record<string, typeof turbulentDistortion> = {
  turbulentDistortion,
  LongRaceDistortion,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function random(base: number | [number, number]): number {
  if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
  return Math.random() * base;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function lerp(current: number, target: number, speed = 0.1, limit = 0.001): number {
  let change = (target - current) * speed;
  if (Math.abs(change) < limit) change = target - current;
  return current + change;
}

// ─── Road geometry ────────────────────────────────────────────────────────────

function createRoadPlane(width: number, height: number): THREE.PlaneGeometry {
  return new THREE.PlaneGeometry(width, height, 40, 40);
}

// ─── App class ───────────────────────────────────────────────────────────────

class App {
  private options: HyperspeedEffectOptions;
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private clock!: THREE.Clock;
  private fovTarget: number;
  private speedUpTarget = 0;
  private speedUp = 0;
  private timeOffset = 0;
  private distortion!: typeof turbulentDistortion;
  private carLights: CarLights[] = [];
  private road!: Road;
  private leftRoad!: Road;
  private rightRoad!: Road;
  private islandLeft!: Road;
  private islandRight!: Road;
  private disposed = false;

  constructor(container: HTMLElement, options: HyperspeedEffectOptions) {
    this.container = container;
    this.options = options;
    this.fovTarget = options.fov;
    this.distortion = distortions[options.distortion] ?? turbulentDistortion;
  }

  async init() {
    const { container, options } = this;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.setClearColor(options.colors.background, 1);
    container.appendChild(this.renderer.domElement);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000,
    );
    this.camera.position.z = -5;
    this.camera.position.y = 8;
    this.camera.rotation.x = -0.06;

    // Scene
    this.scene = new THREE.Scene();

    // Composer
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(
      new EffectPass(
        this.camera,
        new BloomEffect({ intensity: 1.5, luminanceThreshold: 0.15 }),
      ),
    );

    // Clock
    this.clock = new THREE.Clock();

    // Build scene objects
    this.buildRoad();
    this.buildCarLights();

    // Resize handler
    const onResize = () => this.onResize();
    window.addEventListener('resize', onResize);

    // Store cleanup
    (this as any)._cleanup = () => {
      window.removeEventListener('resize', onResize);
    };

    // Start loop
    this.loop();
  }

  private buildRoad() {
    const { options, distortion, scene } = this;
    this.road = new Road(options, distortion, 0);
    this.leftRoad = new Road(options, distortion, -1);
    this.rightRoad = new Road(options, distortion, 1);
    this.islandLeft = new Road(options, distortion, -1);
    this.islandRight = new Road(options, distortion, 1);

    scene.add(this.road.mesh);
    scene.add(this.leftRoad.mesh);
    scene.add(this.rightRoad.mesh);
    scene.add(this.islandLeft.mesh);
    scene.add(this.islandRight.mesh);
  }

  private buildCarLights() {
    const { options, distortion, scene } = this;
    // Left (oncoming) cars — go in opposite direction
    const left = new CarLights(options, distortion, options.colors.leftCars, -1);
    // Right (same direction) cars
    const right = new CarLights(options, distortion, options.colors.rightCars, 1);
    this.carLights = [left, right];
    scene.add(left.mesh);
    scene.add(right.mesh);
  }

  private loop() {
    if (this.disposed) return;
    requestAnimationFrame(() => this.loop());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    this.speedUp = lerp(this.speedUp, this.speedUpTarget, 0.1, 0.00001);
    this.timeOffset += this.speedUp * delta;
    const time = elapsed + this.timeOffset;

    this.camera.fov = lerp(this.camera.fov, this.fovTarget, 0.1, 0.001);
    this.camera.updateProjectionMatrix();

    // Update road meshes
    for (const r of [this.road, this.leftRoad, this.rightRoad, this.islandLeft, this.islandRight]) {
      r.update(time);
    }
    for (const cl of this.carLights) {
      cl.update(time);
    }

    this.composer.render(delta);
  }

  private onResize() {
    const { container, camera, renderer, composer } = this;
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    composer.setSize(container.offsetWidth, container.offsetHeight);
  }

  dispose() {
    this.disposed = true;
    (this as any)._cleanup?.();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}

// ─── Road ─────────────────────────────────────────────────────────────────────

class Road {
  mesh: THREE.Mesh;
  private uniforms: Record<string, THREE.IUniform>;

  constructor(
    options: HyperspeedEffectOptions,
    distortion: typeof turbulentDistortion,
    side: -1 | 0 | 1,
  ) {
    const totalRoadWidth =
      options.lanesPerRoad * options.roadWidth + options.islandWidth;
    const isIsland = side !== 0;

    const width = isIsland ? options.islandWidth : options.roadWidth * options.lanesPerRoad;
    const color = isIsland ? options.colors.islandColor : options.colors.roadColor;
    const xOffset = isIsland
      ? side * (options.lanesPerRoad * options.roadWidth * 0.5 + options.islandWidth * 0.5)
      : 0;

    const geometry = createRoadPlane(width, options.length);
    const uniforms = {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color(color)),
      uLanes: new THREE.Uniform(options.lanesPerRoad),
      uBrokenLinesColor: new THREE.Uniform(new THREE.Color(options.colors.brokenLines)),
      uShoulderLinesColor: new THREE.Uniform(new THREE.Color(options.colors.shoulderLines)),
      uShoulderLinesWidth: new THREE.Uniform(options.shoulderLinesWidthPercentage),
      uBrokenLinesWidth: new THREE.Uniform(options.brokenLinesWidthPercentage),
      uBrokenLinesLength: new THREE.Uniform(options.brokenLinesLengthPercentage),
      ...distortion.uniforms,
    };
    this.uniforms = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        #define PI 3.14159265358979
        varying vec2 vUv;
        ${distortion.getDistortion}
        void main(){
          vec3 transformed = position.xyz;
          float progress = (transformed.y + ${options.length / 2}.0) / ${options.length}.0;
          vec3 distort = getDistortion(progress);
          transformed.x += distort.x;
          transformed.y += distort.y;
          transformed.z += distort.z;
          vec4 mvPos = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPos;
          vUv = uv;
        }
      `,
      fragmentShader: isIsland
        ? `
          uniform vec3 uColor;
          void main(){ gl_FragColor = vec4(uColor, 1.0); }
        `
        : `
          uniform vec3 uColor;
          uniform float uLanes;
          uniform vec3 uBrokenLinesColor;
          uniform vec3 uShoulderLinesColor;
          uniform float uShoulderLinesWidth;
          uniform float uBrokenLinesWidth;
          uniform float uBrokenLinesLength;
          uniform float uTime;
          varying vec2 vUv;
          void main(){
            vec3 color = uColor;
            float laneWidth = 1.0 / uLanes;
            // Shoulder lines
            float shoulderLeft  = step(vUv.x, uShoulderLinesWidth);
            float shoulderRight = step(1.0 - uShoulderLinesWidth, vUv.x);
            if(shoulderLeft > 0.0 || shoulderRight > 0.0){
              color = uShoulderLinesColor;
            }
            // Broken lines
            for(float i = 1.0; i < uLanes; i++){
              float lineX = i * laneWidth;
              float lineLeft  = lineX - uBrokenLinesWidth * 0.5;
              float lineRight = lineX + uBrokenLinesWidth * 0.5;
              if(vUv.x > lineLeft && vUv.x < lineRight){
                float segmentProgress = fract(vUv.y * 10.0 + uTime * 0.5);
                if(segmentProgress < uBrokenLinesLength){
                  color = uBrokenLinesColor;
                }
              }
            }
            gl_FragColor = vec4(color, 1.0);
          }
        `,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.x = xOffset;
    this.mesh.position.y = -2;
    totalRoadWidth; // suppress unused warning
  }

  update(time: number) {
    this.uniforms.uTime.value = time;
  }
}

// ─── Car Lights ───────────────────────────────────────────────────────────────

class CarLights {
  mesh: THREE.Points;
  private uniforms: Record<string, THREE.IUniform>;
  private options: HyperspeedEffectOptions;

  constructor(
    options: HyperspeedEffectOptions,
    distortion: typeof turbulentDistortion,
    colors: number[],
    side: -1 | 1,
  ) {
    this.options = options;
    const count = options.lightPairsPerRoadWay;
    const roadHalfWidth = (options.lanesPerRoad * options.roadWidth) / 2;

    const positions: number[] = [];
    const startTimes: number[] = [];
    const speeds: number[] = [];
    const colorsArr: number[] = [];
    const sizes: number[] = [];

    const threeColors = colors.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const laneIndex = Math.floor(Math.random() * options.lanesPerRoad);
      const laneX =
        -roadHalfWidth +
        options.roadWidth * (laneIndex + 0.5) +
        (side === 1
          ? options.lanesPerRoad * options.roadWidth + options.islandWidth
          : 0);

      const carShift = random(options.carShiftX);
      const x = laneX + carShift;
      const y = random(options.carFloorSeparation) - 1.7;
      const z = -random(options.length);

      positions.push(x, y, z, x + random(options.carWidthPercentage) * options.roadWidth * 0.3, y, z);
      startTimes.push(Math.random(), Math.random());
      const spd = random(options.movingCloserSpeed);
      speeds.push(spd, spd);
      const col = pickRandom(threeColors);
      colorsArr.push(col.r, col.g, col.b, col.r, col.g, col.b);
      const sz = random(options.carLightsRadius);
      sizes.push(sz * 10, sz * 10);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('aStartTime', new THREE.Float32BufferAttribute(startTimes, 1));
    geometry.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speeds, 1));
    geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colorsArr, 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));

    const uniforms = {
      uTime: new THREE.Uniform(0),
      uFade: new THREE.Uniform(options.carLightsFade),
      uLength: new THREE.Uniform(options.length),
      ...distortion.uniforms,
    };
    this.uniforms = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uLength;
        attribute float aStartTime;
        attribute float aSpeed;
        attribute vec3 aColor;
        attribute float aSize;
        varying vec3 vColor;
        varying float vProgress;
        #define PI 3.14159265358979
        ${distortion.getDistortion}
        void main(){
          vColor = aColor;
          float loopTime = uLength / abs(aSpeed);
          float progress = fract((uTime - aStartTime) / loopTime);
          vProgress = progress;
          vec3 pos = position;
          pos.z = mod(pos.z + progress * uLength * sign(aSpeed), uLength) - uLength * 0.5;
          float pn = (pos.z + uLength * 0.5) / uLength;
          vec3 distort = getDistortion(pn);
          pos.x += distort.x;
          pos.y += distort.y;
          pos.z += distort.z;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (400.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uFade;
        varying vec3 vColor;
        varying float vProgress;
        void main(){
          float distToCenter = length(gl_PointCoord - 0.5);
          if(distToCenter > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, uFade, vProgress);
          alpha *= 1.0 - smoothstep(0.8, 1.0, vProgress);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(geometry, material);
  }

  update(time: number) {
    this.uniforms.uTime.value = time;
  }
}

// ─── React Component ──────────────────────────────────────────────────────────

interface HyperspeedProps {
  effectOptions?: HyperspeedEffectOptions;
  style?: React.CSSProperties;
}

export function Hyperspeed({ effectOptions, style }: HyperspeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !effectOptions) return;
    const app = new App(containerRef.current, effectOptions);
    app.init();
    return () => app.dispose();
  }, [effectOptions]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  );
}

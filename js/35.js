import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { ParametricGeometry } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/geometries/ParametricGeometry";
import ky from "https://cdn.skypack.dev/kyouka@1.2.5";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/FBXLoader";
import Stats from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/libs/stats.module";
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7";
const calcAspect = (el) => el.clientWidth / el.clientHeight;
const getNormalizedMousePos = (e) => {
    return {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
    };
};
// https://arxiv.org/pdf/1604.02174.pdf
const sphube = (u1, v1, target) => {
    const s = 0.6;
    const r = 1;
    const theta = 2 * u1 * Math.PI;
    const phi = v1 * 2 * Math.PI;
    const u = Math.cos(theta) * Math.cos(phi);
    const v = Math.cos(theta) * Math.sin(phi);
    const w = Math.sin(theta);
    const z = (r * u) / Math.sqrt(1 - s * v ** 2 - s * w ** 2);
    const x = (r * v) / Math.sqrt(1 - s * u ** 2 - s * w ** 2);
    const y = (r * w) / Math.sqrt(1 - s * Math.cos(theta) ** 2);
    target.set(x, y, z);
};
const twistedShapeVertexShader = `
#define GLSLIFY 1
mat2 rotation2d(float angle) {
	float s = sin(angle);
	float c = cos(angle);

	return mat2(
		c, -s,
		s, c
	);
}

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
		oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
		0.0,                                0.0,                                0.0,                                1.0
	);
}

vec2 rotate(vec2 v, float angle) {
	return rotation2d(angle) * v;
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	return (rotation3d(axis, angle) * vec4(v, 1.0)).xyz;
}

float invert(float n){
    return 1.-n;
}

vec3 invert(vec3 n){
    return 1.-n;
}

// https://github.com/glslify/glsl-easings
float qinticInOutAbs(float t){
    return t<.5
    ?+16.*pow(t,5.)
    :-.5*abs(pow(2.*t-2.,5.))+1.;
}

const float PI = 3.14159265359;

// https://tympanus.net/codrops/2019/10/29/real-time-multiside-refraction-in-three-steps/
vec3 getEyeVector(mat4 modelMat,vec3 pos,vec3 camPos){
    vec4 worldPosition=modelMat*vec4(pos,1.);
    vec3 eyeVector=normalize(worldPosition.xyz-camPos);
    return eyeVector;
}

uniform vec3 uAxis;
uniform float uTime;
uniform float uVelocity;
uniform float uDistortion;

varying vec3 vNormal;
varying vec3 vEyeVector;

void main(){
    vec3 newPos=position;
    float offset=2.*dot(uAxis,position);
    float sDistortion=.01*uDistortion;
    float oDistortion=sDistortion*offset;
    float displacement=uVelocity*uTime;
    float progress=clamp((fract(displacement)-oDistortion)/invert(sDistortion),0.,1.);
    progress=qinticInOutAbs(progress)*PI;
    newPos=rotate(newPos,uAxis,progress);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.);
    
    vec3 rotatedNormal=rotate(normal,uAxis,progress);
    vNormal=rotatedNormal;
    vec3 rotatedPos=rotate(position,uAxis,progress);
    vEyeVector=getEyeVector(modelMatrix,rotatedPos,cameraPosition);
}
`;
const twistedShapeFragmentShader = `
#define GLSLIFY 1
// https://www.shadertoy.com/view/4scSW4
float fresnel(float bias,float scale,float power,vec3 I,vec3 N)
{
    return bias+scale*pow(1.+dot(I,N),power);
}

uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vEyeVector;

void main(){
    float F=fresnel(0.,.6,2.,vEyeVector,vNormal);
    vec3 color=uColor+F;
    gl_FragColor=vec4(color,1.);
}
`;
class Base {
    constructor(sel, debug = false) {
        this.debug = debug;
        this.container = document.querySelector(sel);
        this.perspectiveCameraParams = {
            fov: 75,
            near: 0.1,
            far: 100
        };
        this.orthographicCameraParams = {
            zoom: 2,
            near: -100,
            far: 1000
        };
        this.cameraPosition = new THREE.Vector3(0, 3, 10);
        this.lookAtPosition = new THREE.Vector3(0, 0, 0);
        this.rendererParams = {
            outputEncoding: THREE.LinearEncoding,
            config: {
                alpha: true,
                antialias: true
            }
        };
        this.mousePos = new THREE.Vector2(0, 0);
        this.mouseSpeed = 0;
    }
    // 初始化
    init() {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createMesh({});
        this.createLight();
        this.createOrbitControls();
        this.addListeners();
        this.setLoop();
    }
    // 创建场景
    createScene() {
        const scene = new THREE.Scene();
        if (this.debug) {
            scene.add(new THREE.AxesHelper());
            const stats = Stats();
            this.container.appendChild(stats.dom);
            this.stats = stats;
        }
        this.scene = scene;
    }
    // 创建透视相机
    createPerspectiveCamera() {
        const { perspectiveCameraParams, cameraPosition, lookAtPosition } = this;
        const { fov, near, far } = perspectiveCameraParams;
        const aspect = calcAspect(this.container);
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
        this.camera = camera;
    }
    // 创建正交相机
    createOrthographicCamera() {
        const { orthographicCameraParams, cameraPosition, lookAtPosition } = this;
        const { left, right, top, bottom, near, far } = orthographicCameraParams;
        const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
        this.camera = camera;
    }
    // 更新正交相机参数
    updateOrthographicCameraParams() {
        const { container } = this;
        const { zoom, near, far } = this.orthographicCameraParams;
        const aspect = calcAspect(container);
        this.orthographicCameraParams = {
            left: -zoom * aspect,
            right: zoom * aspect,
            top: zoom,
            bottom: -zoom,
            near,
            far,
            zoom
        };
    }
    // 创建渲染
    createRenderer(useWebGL1 = false) {
        var _a;
        const { rendererParams } = this;
        const { outputEncoding, config } = rendererParams;
        const renderer = !useWebGL1
            ? new THREE.WebGLRenderer(config)
            : new THREE.WebGL1Renderer(config);
        renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        renderer.outputEncoding = outputEncoding;
        this.resizeRendererToDisplaySize();
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(renderer.domElement);
        this.renderer = renderer;
        this.renderer.setClearColor(0x000000, 0);
    }
    // 允许投影
    enableShadow() {
        this.renderer.shadowMap.enabled = true;
    }
    // 调整渲染器尺寸
    resizeRendererToDisplaySize() {
        const { renderer } = this;
        if (!renderer) {
            return;
        }
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const { clientWidth, clientHeight } = canvas;
        const width = (clientWidth * pixelRatio) | 0;
        const height = (clientHeight * pixelRatio) | 0;
        const isResizeNeeded = canvas.width !== width || canvas.height !== height;
        if (isResizeNeeded) {
            renderer.setSize(width, height, false);
        }
        return isResizeNeeded;
    }
    // 创建网格
    createMesh(meshObject, container = this.scene) {
        const { geometry = new THREE.BoxGeometry(1, 1, 1), material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#d9dfc8")
        }), position = new THREE.Vector3(0, 0, 0) } = meshObject;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        container.add(mesh);
        return mesh;
    }
    // 创建光源
    createLight() {
        const dirLight = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 0.5);
        dirLight.position.set(0, 50, 0);
        this.scene.add(dirLight);
        const ambiLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 0.4);
        this.scene.add(ambiLight);
    }
    // 创建轨道控制
    createOrbitControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        const { lookAtPosition } = this;
        controls.target.copy(lookAtPosition);
        controls.update();
        this.controls = controls;
    }
    // 监听事件
    addListeners() {
        this.onResize();
    }
    // 监听画面缩放
    onResize() {
        window.addEventListener("resize", (e) => {
            if (this.shaderMaterial) {
                this.shaderMaterial.uniforms.uResolution.value.x = window.innerWidth;
                this.shaderMaterial.uniforms.uResolution.value.y = window.innerHeight;
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
            else {
                if (this.camera instanceof THREE.PerspectiveCamera) {
                    const aspect = calcAspect(this.container);
                    const camera = this.camera;
                    camera.aspect = aspect;
                    camera.updateProjectionMatrix();
                }
                else if (this.camera instanceof THREE.OrthographicCamera) {
                    this.updateOrthographicCameraParams();
                    const camera = this.camera;
                    const { left, right, top, bottom, near, far } = this.orthographicCameraParams;
                    camera.left = left;
                    camera.right = right;
                    camera.top = top;
                    camera.bottom = bottom;
                    camera.near = near;
                    camera.far = far;
                    camera.updateProjectionMatrix();
                }
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            }
        });
    }
    // 动画
    update() {
        console.log("animation");
    }
    // 渲染
    setLoop() {
        this.renderer.setAnimationLoop(() => {
            this.resizeRendererToDisplaySize();
            this.update();
            if (this.controls) {
                this.controls.update();
            }
            if (this.stats) {
                this.stats.update();
            }
            if (this.composer) {
                this.composer.render();
            }
            else {
                this.renderer.render(this.scene, this.camera);
            }
        });
    }
    // 创建文本
    createText(text = "", config, material = new THREE.MeshStandardMaterial({
        color: "#ffffff"
    })) {
        const geo = new THREE.TextGeometry(text, config);
        const mesh = new THREE.Mesh(geo, material);
        return mesh;
    }
    // 创建音效源
    createAudioSource() {
        const listener = new THREE.AudioListener();
        this.camera.add(listener);
        const sound = new THREE.Audio(listener);
        this.sound = sound;
    }
    // 加载音效
    loadAudio(url) {
        const loader = new THREE.AudioLoader();
        return new Promise((resolve) => {
            loader.load(url, (buffer) => {
                this.sound.setBuffer(buffer);
                resolve(buffer);
            });
        });
    }
    // 加载模型
    loadModel(url) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (gltf) => {
                const model = gltf.scene;
                console.log(model);
                resolve(model);
            }, undefined, (err) => {
                console.log(err);
                reject();
            });
        });
    }
    // 加载FBX模型
    loadFBXModel(url) {
        const loader = new FBXLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (obj) => {
                resolve(obj);
            }, undefined, (err) => {
                console.log(err);
                reject();
            });
        });
    }
    // 加载字体
    loadFont(url) {
        const loader = new THREE.FontLoader();
        return new Promise((resolve) => {
            loader.load(url, (font) => {
                resolve(font);
            });
        });
    }
    // 创建点选模型
    createRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.trackMousePos();
    }
    // 追踪鼠标位置
    trackMousePos() {
        window.addEventListener("mousemove", (e) => {
            this.setMousePos(e);
        });
        window.addEventListener("touchstart", (e) => {
            this.setMousePos(e.touches[0]);
        }, { passive: false });
        window.addEventListener("touchmove", (e) => {
            this.setMousePos(e.touches[0]);
        });
    }
    // 设置鼠标位置
    setMousePos(e) {
        const { x, y } = getNormalizedMousePos(e);
        this.mousePos.x = x;
        this.mousePos.y = y;
    }
    // 获取点击物
    getInterSects() {
        this.raycaster.setFromCamera(this.mousePos, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        return intersects;
    }
    // 选中点击物时
    onChooseIntersect(target) {
        const intersects = this.getInterSects();
        const intersect = intersects[0];
        if (!intersect || !intersect.face) {
            return null;
        }
        const { object } = intersect;
        return target === object ? intersect : null;
    }
    // 获取跟屏幕同像素的fov角度
    getScreenFov() {
        return ky.rad2deg(2 * Math.atan(window.innerHeight / 2 / this.cameraPosition.z));
    }
    // 获取重心坐标系
    getBaryCoord(bufferGeometry) {
        // https://gist.github.com/mattdesl/e399418558b2b52b58f5edeafea3c16c
        const length = bufferGeometry.attributes.position.array.length;
        const count = length / 3;
        const bary = [];
        for (let i = 0; i < count; i++) {
            bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
        }
        const aCenter = new Float32Array(bary);
        bufferGeometry.setAttribute("aCenter", new THREE.BufferAttribute(aCenter, 3));
    }
    // 追踪鼠标速度
    trackMouseSpeed() {
        // https://stackoverflow.com/questions/6417036/track-mouse-speed-with-js
        let lastMouseX = -1;
        let lastMouseY = -1;
        let mouseSpeed = 0;
        window.addEventListener("mousemove", (e) => {
            const mousex = e.pageX;
            const mousey = e.pageY;
            if (lastMouseX > -1) {
                mouseSpeed = Math.max(Math.abs(mousex - lastMouseX), Math.abs(mousey - lastMouseY));
                this.mouseSpeed = mouseSpeed / 100;
            }
            lastMouseX = mousex;
            lastMouseY = mousey;
        });
        document.addEventListener("mouseleave", () => {
            this.mouseSpeed = 0;
        });
    }
    // 使用PCFSoft阴影
    usePCFSoftShadowMap() {
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    // 使用VSM阴影
    useVSMShadowMap() {
        this.renderer.shadowMap.type = THREE.VSMShadowMap;
    }
    // 将相机的方向设为z轴
    setCameraUpZ() {
        this.camera.up.set(0, 0, 1);
    }
}
class TwistedShape extends Base {
    constructor(sel, debug) {
        super(sel, debug);
        this.clock = new THREE.Clock();
        this.cameraPosition = new THREE.Vector3(0, 0, 3);
        this.currentAxis = "x";
        this.colorParams = {
            color: "#12112a"
        };
    }
    // 初始化
    init() {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createTwistedMaterial();
        this.createTwistedShape();
        this.createLight();
        this.createOrbitControls();
        // this.createDebugPanel();
        this.addListeners();
        this.setLoop();
        this.toggleRotateAxis();
    }
    // 创建扭曲材质
    createTwistedMaterial() {
        const material = new THREE.ShaderMaterial({
            vertexShader: twistedShapeVertexShader,
            fragmentShader: twistedShapeFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uVelocity: { value: 0.3 },
                uAxis: { value: new THREE.Vector3(1, 0, 0) },
                uDistortion: { value: 3 },
                uColor: {
                    value: new THREE.Color(this.colorParams.color)
                }
            }
        });
        this.material = material;
    }
    // 创建扭曲图形
    createTwistedShape() {
        const geometry = new ParametricGeometry(sphube, 400, 400);
        const material = this.material;
        this.createMesh({ geometry, material });
    }
    // 切换图形旋转轴
    toggleRotateAxis() {
        setInterval(() => {
            const material = this.material;
            if (this.currentAxis === "x") {
                material.uniforms.uAxis.value = new THREE.Vector3(0, 1, 0);
                this.currentAxis = "y";
            }
            else {
                material.uniforms.uAxis.value = new THREE.Vector3(1, 0, 0);
                this.currentAxis = "x";
            }
        }, 3345);
    }
    // 动画
    update() {
        const elapsedTime = this.clock.getElapsedTime();
        if (this.material) {
            this.material.uniforms.uTime.value = elapsedTime;
        }
    }
    // 创建调试面板
    createDebugPanel() {
        const { material } = this;
        const gui = new dat.GUI();
        gui
            .add(material.uniforms.uVelocity, "value")
            .min(0)
            .max(2)
            .step(0.01)
            .name("velocity");
        gui.add(material.uniforms.uAxis.value, "x").min(0).max(1).step(1).name("X");
        gui.add(material.uniforms.uAxis.value, "y").min(0).max(1).step(1).name("Y");
        gui
            .add(material.uniforms.uDistortion, "value")
            .min(0)
            .max(5)
            .step(0.01)
            .name("distortion");
    }
}
const start = () => {
    const twistedShape = new TwistedShape(".twisted-shape", false);
    twistedShape.init();
};
start();
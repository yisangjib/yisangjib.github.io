var mContainer;
var mCamera, mRenderer;
var mControls;

var mScene;

var mAntiAlias = true;// <-- set to false if your fps is having troubles

var mGridSize = 32;
var mCubeCount = mGridSize * mGridSize * mGridSize;
var mCubeSystem;

var mTime = 0.0;
var mDuration;

window.onload = function () {
  init();
};

function init() {
  initTHREE();
  initControls();
  initParticleSystem();

  TweenMax.to(window, mDuration, {
    mTime:mDuration,
    ease:Power0.easeIn,
    repeat:-1,
    repeatDelay:0.25,
    yoyo:true
  });

  requestAnimationFrame(tick);
  window.addEventListener('resize', resize, false);
}

function initTHREE() {
  mRenderer = new THREE.WebGLRenderer({antialias: mAntiAlias});
  mRenderer.setSize(window.innerWidth, window.innerHeight);

  mContainer = document.getElementById('three-container');
  mContainer.appendChild(mRenderer.domElement);

  mCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
  mCamera.position.set(0, 0, 128);

  mScene = new THREE.Scene();

  var light;

  light = new THREE.PointLight(0xffffff, 1, 64, 2);
  light.position.set(0, 24, 0);
  mScene.add(light);

  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, -0.75, -0.5);
  mScene.add(light);

  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(0.75, 0.5, 1);
  mScene.add(light);
}

function initControls() {
  mControls = new THREE.OrbitControls(mCamera, mRenderer.domElement);
}

function initParticleSystem() {
  var prefabGeometry = new THREE.BoxGeometry(1,1,1);
  var bufferGeometry = new THREE.BAS.PrefabBufferGeometry(prefabGeometry, mCubeCount);

  bufferGeometry.computeVertexNormals();

  // generate additional geometry data
  var aDelayDuration = bufferGeometry.createAttribute('aDelayDuration', 2);
  var aStartPosition = bufferGeometry.createAttribute('aStartPosition', 3);
  var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
  var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);
  //var aColor = bufferGeometry.createAttribute('color', 3);

  var i, j, offset;

  // buffer time offset
  var delay;
  var duration;
  var prefabDelay = 0.00025;
  var vertexDelay = 0.0025;
  var minDuration = 1.0;
  var maxDuration = 1.3;

  mDuration = maxDuration + prefabDelay * mCubeCount + vertexDelay * prefabGeometry.vertices.length;

  for (i = 0, offset = 0; i < mCubeCount; i++) {
    delay = (mCubeCount - i) * prefabDelay;
    duration = THREE.Math.randFloat(minDuration, maxDuration);

    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aDelayDuration.array[offset++] = delay + j * vertexDelay;
      aDelayDuration.array[offset++] = duration;
    }
  }

  // buffer positions
  var x, y, z;
  var halfGridSize = mGridSize * 0.5;

  for (x = -halfGridSize, offset = 0; x < halfGridSize; x++) {
    for (y = -halfGridSize; y < halfGridSize; y++) {
      for(z = -halfGridSize; z < halfGridSize; z++) {
        for (j = 0; j < prefabGeometry.vertices.length; j++, offset += 3) {
          aStartPosition.array[offset  ] = x - 64;
          aStartPosition.array[offset+1] = y;
          aStartPosition.array[offset+2] = z;

          aEndPosition.array[offset  ] = x + 64;
          aEndPosition.array[offset+1] = y;
          aEndPosition.array[offset+2] = z;
        }
      }
    }
  }

  var material = new THREE.BAS.PhongAnimationMaterial(
    // custom parameters & THREE.MeshPhongMaterial parameters
    {
      shading: THREE.FlatShading,
      uniforms: {
        uTime: {type: 'f', value: 0}
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk['quaternion_rotation'],
        THREE.BAS.ShaderChunk['cubic_bezier'],
        THREE.BAS.ShaderChunk['ease_in_out_cubic']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'attribute vec2 aDelayDuration;',
        'attribute vec3 aStartPosition;',
        'attribute vec3 aEndPosition;'
      ],
      shaderVertexInit: [
        'float tDelay = aDelayDuration.x;',
        'float tDuration = aDelayDuration.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
      ],
      shaderTransformPosition: [
        'transformed += mix(aStartPosition, aEndPosition, tProgress);'
      ]
    },
    // THREE.MeshPhongMaterial uniforms
    {
      diffuse:0x999999,
      shininess: 4
    }
  );

  mCubeSystem = new THREE.Mesh(bufferGeometry, material);
  // because the bounding box of the particle system does not reflect its on-screen size
  // set this to false to prevent the whole thing from disappearing on certain angles
  mCubeSystem.frustumCulled = false;

  mScene.add(mCubeSystem);
}

function tick() {
  update();
  render();

  requestAnimationFrame(tick);
}

function update() {
  mControls.update();

  mCubeSystem.material.uniforms['uTime'].value = mTime;
}

function render() {
  mRenderer.render(mScene, mCamera);
}

function resize() {
  mCamera.aspect = window.innerWidth / window.innerHeight;
  mCamera.updateProjectionMatrix();

  mRenderer.setSize(window.innerWidth, window.innerHeight);
}

////////////////////////////////
// three.bas
////////////////////////////////

THREE.BAS = {};

THREE.BAS.ShaderChunk = {};

THREE.BAS.ShaderChunk["animation_time"] = "float tDelay = aAnimation.x;\nfloat tDuration = aAnimation.y;\nfloat tTime = clamp(uTime - tDelay, 0.0, tDuration);\nfloat tProgress = ease(tTime, 0.0, 1.0, tDuration);\n";

THREE.BAS.ShaderChunk["cubic_bezier"] = "vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t)\n{\n    vec3 tp;\n    float tn = 1.0 - t;\n\n    tp.xyz = tn * tn * tn * p0.xyz + 3.0 * tn * tn * t * c0.xyz + 3.0 * tn * t * t * c1.xyz + t * t * t * p1.xyz;\n\n    return tp;\n}\n";

THREE.BAS.ShaderChunk["ease_in_cubic"] = "float ease(float t, float b, float c, float d) {\n  return c*(t/=d)*t*t + b;\n}\n";

THREE.BAS.ShaderChunk["ease_in_out_cubic"] = "float ease(float t, float b, float c, float d) {\n  if ((t/=d/2.0) < 1.0) return c/2.0*t*t*t + b;\n  return c/2.0*((t-=2.0)*t*t + 2.0) + b;\n}\n";

THREE.BAS.ShaderChunk["ease_in_quad"] = "float ease(float t, float b, float c, float d) {\n  return c*(t/=d)*t + b;\n}\n";

THREE.BAS.ShaderChunk["ease_out_cubic"] = "float ease(float t, float b, float c, float d) {\n  return c*((t=t/d - 1.0)*t*t + 1.0) + b;\n}\n";

THREE.BAS.ShaderChunk["quaternion_rotation"] = "vec3 rotateVector(vec4 q, vec3 v)\n{\n    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nvec4 quatFromAxisAngle(vec3 axis, float angle)\n{\n    float halfAngle = angle * 0.5;\n    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));\n}\n";


THREE.BAS.PrefabBufferGeometry = function (prefab, count) {
  THREE.BufferGeometry.call(this);

  this.prefabGeometry = prefab;
  this.prefabCount = count;
  this.prefabVertexCount = prefab.vertices.length;

  this.bufferDefaults();
};
THREE.BAS.PrefabBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.BAS.PrefabBufferGeometry.prototype.constructor = THREE.BAS.PrefabBufferGeometry;

THREE.BAS.PrefabBufferGeometry.prototype.bufferDefaults = function () {
  var prefabFaceCount = this.prefabGeometry.faces.length;
  var prefabIndexCount = this.prefabGeometry.faces.length * 3;
  var prefabVertexCount = this.prefabVertexCount = this.prefabGeometry.vertices.length;
  var prefabIndices = [];

  //console.log('prefabCount', this.prefabCount);
  //console.log('prefabFaceCount', prefabFaceCount);
  //console.log('prefabIndexCount', prefabIndexCount);
  //console.log('prefabVertexCount', prefabVertexCount);
  //console.log('triangles', prefabFaceCount * this.prefabCount);

  for (var h = 0; h < prefabFaceCount; h++) {
    var face = this.prefabGeometry.faces[h];
    prefabIndices.push(face.a, face.b, face.c);
  }

  var indexBuffer = new Uint32Array(this.prefabCount * prefabIndexCount);
  var positionBuffer = new Float32Array(this.prefabCount * prefabVertexCount * 3);

  this.setIndex(new THREE.BufferAttribute(indexBuffer, 1));
  this.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));

  for (var i = 0, offset = 0; i < this.prefabCount; i++) {
    for (var j = 0; j < prefabVertexCount; j++, offset += 3) {
      var prefabVertex = this.prefabGeometry.vertices[j];

      positionBuffer[offset    ] = prefabVertex.x;
      positionBuffer[offset + 1] = prefabVertex.y;
      positionBuffer[offset + 2] = prefabVertex.z;
    }

    for (var k = 0; k < prefabIndexCount; k++) {
      indexBuffer[i * prefabIndexCount + k] = prefabIndices[k] + i * prefabVertexCount;
    }
  }
};

// todo test
THREE.BAS.PrefabBufferGeometry.prototype.bufferUvs = function() {
  var prefabFaceCount = this.prefabGeometry.faces.length;
  var prefabVertexCount = this.prefabVertexCount = this.prefabGeometry.vertices.length;
  var prefabUvs = [];

  for (var h = 0; h < prefabFaceCount; h++) {
    var face = this.prefabGeometry.faces[h];
    var uv = this.prefabGeometry.faceVertexUvs[0][h];

    prefabUvs[face.a] = uv[0];
    prefabUvs[face.b] = uv[1];
    prefabUvs[face.c] = uv[2];
  }

  var uvBuffer = this.createAttribute('uv', 2);

  for (var i = 0, offset = 0; i < this.prefabCount; i++) {
    for (var j = 0; j < prefabVertexCount; j++, offset += 2) {
      var prefabUv = prefabUvs[j];

      uvBuffer.array[offset] = prefabUv.x;
      uvBuffer.array[offset + 1] = prefabUv.y;
    }
  }
};

/**
 * based on BufferGeometry.computeVertexNormals
 * calculate vertex normals for a prefab, and repeat the data in the normal buffer
 */
THREE.BAS.PrefabBufferGeometry.prototype.computeVertexNormals = function () {
  var index = this.index;
  var attributes = this.attributes;
  var positions = attributes.position.array;

  if (attributes.normal === undefined) {
    this.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(positions.length), 3));
  }

  var normals = attributes.normal.array;

  var vA, vB, vC,

  pA = new THREE.Vector3(),
  pB = new THREE.Vector3(),
  pC = new THREE.Vector3(),

  cb = new THREE.Vector3(),
  ab = new THREE.Vector3();

  var indices = index.array;
  var prefabIndexCount = this.prefabGeometry.faces.length * 3;

  for (var i = 0; i < prefabIndexCount; i += 3) {
    vA = indices[i + 0] * 3;
    vB = indices[i + 1] * 3;
    vC = indices[i + 2] * 3;

    pA.fromArray(positions, vA);
    pB.fromArray(positions, vB);
    pC.fromArray(positions, vC);

    cb.subVectors(pC, pB);
    ab.subVectors(pA, pB);
    cb.cross(ab);

    normals[vA] += cb.x;
    normals[vA + 1] += cb.y;
    normals[vA + 2] += cb.z;

    normals[vB] += cb.x;
    normals[vB + 1] += cb.y;
    normals[vB + 2] += cb.z;

    normals[vC] += cb.x;
    normals[vC + 1] += cb.y;
    normals[vC + 2] += cb.z;
  }

  for (var j = 1; j < this.prefabCount; j++) {
    for (var k = 0; k < prefabIndexCount; k++) {
      normals[j * prefabIndexCount + k] = normals[k];
    }
  }

  this.normalizeNormals();

  attributes.normal.needsUpdate = true;
};

THREE.BAS.PrefabBufferGeometry.prototype.createAttribute = function (name, itemSize) {
  var buffer = new Float32Array(this.prefabCount * this.prefabVertexCount * itemSize);
  var attribute = new THREE.BufferAttribute(buffer, itemSize);

  this.addAttribute(name, attribute);

  return attribute;
};

THREE.BAS.PrefabBufferGeometry.prototype.setAttribute4 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < data.length; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
      array[offset++] = v.z;
      array[offset++] = v.w;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};
THREE.BAS.PrefabBufferGeometry.prototype.setAttribute3 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < data.length; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
      array[offset++] = v.z;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};
THREE.BAS.PrefabBufferGeometry.prototype.setAttribute2 = function (name, data) {
  var offset = 0;
  var array = this.geometry.attributes[name].array;
  var i, j;

  for (i = 0; i < this.prefabCount; i++) {
    var v = data[i];

    for (j = 0; j < this.prefabVertexCount; j++) {
      array[offset++] = v.x;
      array[offset++] = v.y;
    }
  }

  this.geometry.attributes[name].needsUpdate = true;
};

THREE.BAS.BaseAnimationMaterial = function(parameters) {
    THREE.ShaderMaterial.call(this);

    this.shaderFunctions = [];
    this.shaderParameters = [];
    this.shaderVertexInit = [];
    this.shaderTransformNormal = [];
    this.shaderTransformPosition = [];

    this.setValues(parameters);
};
THREE.BAS.BaseAnimationMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.BAS.BaseAnimationMaterial.prototype.constructor = THREE.BAS.BaseAnimationMaterial;

// abstract
THREE.BAS.BaseAnimationMaterial.prototype._concatVertexShader = function() {
    return '';
};

THREE.BAS.BaseAnimationMaterial.prototype._concatFunctions = function() {
    return this.shaderFunctions.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatParameters = function() {
    return this.shaderParameters.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatVertexInit = function() {
    return this.shaderVertexInit.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformNormal = function() {
    return this.shaderTransformNormal.join('\n');
};
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformPosition = function() {
    return this.shaderTransformPosition.join('\n');
};


THREE.BAS.BaseAnimationMaterial.prototype.setUniformValues = function(values) {
    for (var key in values) {
        if (key in this.uniforms) {
            var uniform = this.uniforms[key];
            var value = values[key];

            // todo add matrix uniform types
            switch (uniform.type) {
                case 'c': // color
                    uniform.value.set(value);
                    break;
                case 'v2': // vectors
                case 'v3':
                case 'v4':
                    uniform.value.copy(value);
                    break;
                case 'f': // float
                case 't': // texture
                    uniform.value = value;
            }
        }
    }
};

THREE.BAS.PhongAnimationMaterial = function(parameters, uniformValues) {
    THREE.BAS.BaseAnimationMaterial.call(this, parameters);

    var phongShader = THREE.ShaderLib['phong'];

    this.uniforms = THREE.UniformsUtils.merge([phongShader.uniforms, this.uniforms]);
    this.lights = true;
    this.vertexShader = this._concatVertexShader();
    this.fragmentShader = phongShader.fragmentShader;

    // todo add missing default defines
    uniformValues.map && (this.defines['USE_MAP'] = '');
    uniformValues.normalMap && (this.defines['USE_NORMALMAP'] = '');

    this.setUniformValues(uniformValues);
};
THREE.BAS.PhongAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype);
THREE.BAS.PhongAnimationMaterial.prototype.constructor = THREE.BAS.PhongAnimationMaterial;

THREE.BAS.PhongAnimationMaterial.prototype._concatVertexShader = function() {
    // based on THREE.ShaderLib.phong
    return [
        "#define PHONG",

        "varying vec3 vViewPosition;",

        "#ifndef FLAT_SHADED",

        "	varying vec3 vNormal;",

        "#endif",

        THREE.ShaderChunk[ "common" ],
        THREE.ShaderChunk[ "uv_pars_vertex" ],
        THREE.ShaderChunk[ "uv2_pars_vertex" ],
        THREE.ShaderChunk[ "displacementmap_pars_vertex" ],
        THREE.ShaderChunk[ "envmap_pars_vertex" ],
        THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
        THREE.ShaderChunk[ "color_pars_vertex" ],
        THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
        THREE.ShaderChunk[ "skinning_pars_vertex" ],
        THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
        THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

        this._concatFunctions(),

        this._concatParameters(),

        "void main() {",

        this._concatVertexInit(),

        THREE.ShaderChunk[ "uv_vertex" ],
        THREE.ShaderChunk[ "uv2_vertex" ],
        THREE.ShaderChunk[ "color_vertex" ],
        THREE.ShaderChunk[ "beginnormal_vertex" ],

        this._concatTransformNormal(),

        THREE.ShaderChunk[ "morphnormal_vertex" ],
        THREE.ShaderChunk[ "skinbase_vertex" ],
        THREE.ShaderChunk[ "skinnormal_vertex" ],
        THREE.ShaderChunk[ "defaultnormal_vertex" ],

        "#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

        "	vNormal = normalize( transformedNormal );",

        "#endif",

        THREE.ShaderChunk[ "begin_vertex" ],

        this._concatTransformPosition(),

        THREE.ShaderChunk[ "displacementmap_vertex" ],
        THREE.ShaderChunk[ "morphtarget_vertex" ],
        THREE.ShaderChunk[ "skinning_vertex" ],
        THREE.ShaderChunk[ "project_vertex" ],
        THREE.ShaderChunk[ "logdepthbuf_vertex" ],

        "	vViewPosition = - mvPosition.xyz;",

        THREE.ShaderChunk[ "worldpos_vertex" ],
        THREE.ShaderChunk[ "envmap_vertex" ],
        THREE.ShaderChunk[ "lights_phong_vertex" ],
        THREE.ShaderChunk[ "shadowmap_vertex" ],

        "}"

    ].join( "\n" );
};

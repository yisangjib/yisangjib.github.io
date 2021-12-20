(function($) {

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // Config
  var PETALS_NUM = 15;
  
  // Scene size
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  // Camera attributes
  var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;
	
  // Get the DOM element to attach to
  var $container = $('#container');
	
  // Set the global objects
  var renderer, camera, scene, lotus, petals = [], light,
      rotObjectMatrix, rotWorldMatrix;
  
  var xAxis = new THREE.Vector3(1,0,0),
      yAxis = new THREE.Vector3(0,1,0),
      zAxis = new THREE.Vector3(0,0,1);
  
  // Prepare and start the loop
  init();
  animate();
  
  // create a WebGL renderer, camera
  // and a scene
  function init() {
    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.physicallyBasedShading = true;
    renderer.setClearColor(0xcccccc, 1);
    renderer.setSize(WIDTH, HEIGHT);

    camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, NEAR, FAR);

    scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 300;

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    //----------------------------------------------------------

    // Objects 

    // set up the sphere vars
    /*var radius = 50,
        segments = 16,
        rings = 16;*/

    // create the sphere's material
    /*var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xCC0000
    });*/

    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    /*var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, rings),
      sphereMaterial
    );*/

    // add the sphere to the scene
    /*scene.add(sphere);*/

/*    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    });*/
		
    // Group
    lotus = new THREE.Object3D();
    scene.add(lotus);
    
    // Geometry
    var radius = 40;
    var segments = 32;
    var geometry = new THREE.CircleGeometry(radius, segments);
    
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(20, 0, 0));
        
		// Material texture
		var texture = new THREE.Texture(generateTexture());
		texture.needsUpdate = true;

		// Material
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
      fog: true
    });
    
    var material2 = new THREE.SpriteMaterial({
      map: texture,
      color: 0xffffff,
      fog: true,
/*      transparent: true,
      side: THREE.DoubleSide*/
    });
    
    for (var i=0; i<PETALS_NUM; i++) {
           
      // Create the mesh object
      var petal = new THREE.Mesh(geometry, material);
			
      petal.rotation.y = i * (360 / PETALS_NUM);
      /*petal.rotation.z = i * (360 / PETALS_NUM);*/
      
      // Add the object to the global array
      petals.push(petal);
      
      // Add the object to the group
      lotus.add(petal);
    }
    
    // Add the group object to the scene
    /*scene.add(lotus);*/
    

    //----------------------------------------------------------

    
    // Lights

    /*scene.add(new THREE.AmbientLight(0x404040));*/
/*
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 0);*/
    /*scene.add(light);*/

    /*// create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
    */
    
    /*TweenMax.to(group.position, 10, { x:"-=360", yoyo: true, repeat: -1 });*/
    
    window.addEventListener('resize', onWindowResize, false);
  }
 
	
  //----------------------------------------------------------

  // Interaction and Rendering

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
    
  
  // Track mouse movement
  var mouse = { x: 0, y: 0 };
  
  document.addEventListener('mousemove', $.throttle(50, function(e) {
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY;
    
    for (var i=0; i<PETALS_NUM; i++) {
	    TweenLite.to(petals[i].rotation, 2, { x: (mouse.x / 100), z: (mouse.y / 100), ease: Expo.easeOut });
    }
  }), false);


  function animate() {
    requestAnimFrame(animate);
    render();
  }

  function render() {
		// Rotate the lotus
		rotateAroundWorldAxis(lotus, yAxis, (Math.PI / 180) / 2);
    
    // Render, last step!
    renderer.render(scene, camera);
  }
  
  function generateTexture() {

    var size = 150;

    // create canvas
    canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    // get context
    var context = canvas.getContext('2d');

    
    // draw gradient
    /*context.rect(0, 0, size, size);
    var gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.8, 'transparent');
    context.fillStyle = gradient;
    context.fill();*/
      
      // Create gradient
      var gradient = context.createRadialGradient(size/2, size, 0.000, size/2, size/2, size/2);
    	/*var gradient = context.createRadialGradient(150.000, 150.000, 0.000, 150.000, 0.000, 150.000);*/

      // Add colors
      gradient.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
      // gradient.addColorStop(0.700, 'transparent');
	    gradient.addColorStop(0.700, 'rgba(0, 0, 0, 0)');
      
      // Fill with gradient
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);

    return canvas;
  }
  
  // Rotate an object around an arbitrary axis in object space
  function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js r50-r58:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // new code for Three.js r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
  }

  
  // Rotate an object around an arbitrary axis in world space       
  function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  }

})(jQuery);
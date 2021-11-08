import './style.css';

import * as THREE from 'three';


import { WireframeGeometry } from 'three';
//basis
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene,  camera);
//adding shape
const geometry = new THREE.TorusGeometry( 10.75, 3, 30, 100);
const material = new THREE.MeshBasicMaterial( { color:0xa95634}) 
const torus = new THREE.Mesh( geometry, material );



scene.add(torus)
//lighting
const pointlight =  new THREE.PointLight(0xffffff)
const ambientlight = new THREE.AmbientLight(0xffffff) 
pointlight.position.set(20, 20, 20)

scene.add(pointlight, ambientlight)



//animation
function animate() {

  requestAnimationFrame( animate );
  renderer.render( scene, camera);


}
//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
// space background
const spacetexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spacetexture;

Array(500).fill().forEach(addStar);

animate()

//waffle

const waffleTexture = new THREE.TextureLoader().load('skin.png');

const Cptwaffles = new THREE.Mesh(
  new THREE.CylinderGeometry(4,4,1),
  new THREE.MeshBasicMaterial( { map:waffleTexture})
)

scene.add(Cptwaffles);

Cptwaffles.position.z = 30;
Cptwaffles.position.setX(-10)



Cptwaffles.position.z = -5;
Cptwaffles.position.x = 2;


//scroll animation

function movecamera(){

  const t = document.body.getBoundingClientRect().top;

  Cptwaffles.rotation.y += 0.01;
  Cptwaffles.rotation.z += 0.01;

  torus.rotation.x += 0.02;
  torus.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = movecamera


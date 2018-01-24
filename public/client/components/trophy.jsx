const THREE = require('three');

// module.exports.getTrophy = (img, className) => {
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//  const container = <div></div>
//  document.body.appendChild(container)
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//  container.appendChild(renderer.domElement);
// // // Creating the Cube, we can change the parameters passed to modify the size of cube :)


//   const textureLoader = new THREE.TextureLoader();
//   const texture0 = textureLoader.load(img);
//   const texture1 = textureLoader.load(img);
//   const texture2 = textureLoader.load(img);
//   const texture3 = textureLoader.load(img);
//   const texture4 = textureLoader.load(img);
//   const texture5 = textureLoader.load(img);
//   const cubeMaterials = [
//     new THREE.MeshBasicMaterial({
//       map: texture0,
//     }),
//     new THREE.MeshBasicMaterial({
//       map: texture1,
//     }),
//     new THREE.MeshBasicMaterial({
//       map: texture2,
//     }),
//     new THREE.MeshBasicMaterial({
//       map: texture3,
//     }),
//     new THREE.MeshBasicMaterial({
//       map: texture4,
//     }),
//     new THREE.MeshBasicMaterial({
//       map: texture5,
//     })
//   ];
//   const cubegeometry = new THREE.CubeGeometry(3, 2, 3);
//   let cube = new THREE.Mesh(cubegeometry, cubeMaterials);

//   scene.add(cube);

//   camera.position.z = 5;
//   // camera.rotation.x = 7;

//   const render = function () {
//     //Adding rotation to the cube
//     requestAnimationFrame(render);
//     cube.rotation.x += 0.02;
//     cube.rotation.y += 0.02;
//     renderer.render(scene, camera);
//   };
//   render();
//   // cube.rotation.x = 0.5;
//   // cube.rotation.y = 0.5;

// };


// //  const list = ['spider.jpg', 'download.jpg']

// //  list.forEach(item => {
// //    hey(item)
// //  });
import React from 'react';

export default class Scene extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00FFFFFF);
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
      const textureLoader = new THREE.TextureLoader();
    const texture0 = textureLoader.load(this.props.image);
    const texture1 = textureLoader.load(this.props.image);
    const texture2 = textureLoader.load(this.props.image);
    const texture3 = textureLoader.load(this.props.image);
    const texture4 = textureLoader.load(this.props.image);
    const texture5 = textureLoader.load(this.props.image);
  const cubeMaterials = [
    new THREE.MeshBasicMaterial({
      map: texture0,
    }),
    new THREE.MeshBasicMaterial({
      map: texture1,
    }),
    new THREE.MeshBasicMaterial({
      map: texture2,
    }),
    new THREE.MeshBasicMaterial({
      map: texture3,
    }),
    new THREE.MeshBasicMaterial({
      map: texture4,
    }),
    new THREE.MeshBasicMaterial({
      map: texture5,
    })
  ];
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xff00ff
    // })
    const cube = new THREE.Mesh(geometry, cubeMaterials)

    camera.position.z = 1.5
    scene.add(cube)
    // renderer.setClearColor(0xffffff, 1);
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = cubeMaterials
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return ( <
      div style = {
        {
          width: '150px',
          height: '150px',
          opacity: 1
        }
      }
      ref = {
        (mount) => {
          this.mount = mount
        }
      }
      />
    )
  }
}

// ReactDOM.render( < Scene / > , document.getElementById('root'))

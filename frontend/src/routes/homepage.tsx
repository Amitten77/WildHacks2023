import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Model } from "../Model";
import { Float } from "@react-three/drei"
import LineChart from "../components/navbar/LineChart.jsx";
import Table from "../components/navbar/Table.jsx";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');
</style>

//interface homeProps {}

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  //return <orbitControls args={[camera, domElement]} />
}

function ThreeScene() {
  return(
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} /> 
      <Float speed={0.6} rotationIntensity={1} floatIntensity={0}>
        <Model />
      </Float>
    </Canvas>
  );
}

// export const Home: React.FC<homeProps> = ({}) => {
//   return (<ThreeScene />);
// };
export class Home extends React.Component<{}, {}> {
  render() {
    const css = `
    .bg {
      margin-top: -15px;
      margin-left: -1300px;
      height: 1300px;
      width: 3000px;
      z-index = -10000;
      position:absolute;
      background-color:#d1fc42;
    }
    .text {
      z-index = 10;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 200px;
      margin-left: 600px;
      width: 800px;
      height: 500px;
      border-radius: 50px;
      box-shadow: 0 4px 8px 0 #171616, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      position: relative;
    }
    h1 {
      margin-left: 50px;
      font-size: 90px;
      font-family: 'Gloock', serif;
      color: #171616;
    }
    p {
      color: #171616;
      font-family: 'Gloock', serif;
      margin-right: 40px;
      margin-left: 100px;
      margin-top: -30px;
    }
    .home {
      margin-top: 60px;
    }
    .graph {
      height: 450px;
      backdrop-filter: blur(30px);
      box-shadow: 0 4px 8px 0 #171616, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 50px;
      width: 850px;
      position:absolute;
      margin-top: 800px;
      margin-left: 40px;
      float: left;
    }
    .graph-img {
      margin-top: 50px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .table {
      float: right;
      z-index: 100000;
      margin-top: 790px;
      position: absolute;
      margin-left: 950px;
      backdrop-filter: blur(30px);
      box-shadow: 0 4px 8px 0 #171616, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 50px;
    }
    .row {
      background-color: green;
      z-index: 10000000;
    }
    `
    return (
      <div className="home">
        <div className = "bg">
          <style>
            {css}
          </style>
          <ThreeScene />
        </div>
        <div className="text">
            <h1>Welcome.</h1>
            <p>Hi. This is the metaverse. I am about to fail CS173. Anyways, make sure to change this text to describe what
              this code does.
            </p>
        </div>
        <div className="row">
          <div className="graph">
            <div className="graph-img">
              <LineChart />
            </div>
          </div>
          <div className="table">
            <Table />
          </div>
        </div>
      </div>
    )
  }
}
export default Home;
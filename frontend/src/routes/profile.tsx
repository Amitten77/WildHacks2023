import React, { useState } from "react";
import { ChangeEvent } from "react";
import ImageUpload from "../components/ImageUpload.jsx"

interface profileProps {}

<style>
  @import url('https://fonts.googleapis.com/css?family=Dancing+Script');
</style>
interface profileProps {}

// function InstagramComponent() {
//   return <img src={imageToAdd} alt="Image" />
// }


//export class Profile extends React.Component<{}, {}> {
export function Profile() {
    const css = `
    .bg {
      margin-top: 50px;
      margin-left: -1000px;
      height: 100vh;
      width: 3000px;
      z-index = -1000;
      position:absolute;
      background-color:#171616;
    }
    .header {
      z-index = 10;
      position: absolute;
      top: 60px;
      right: 1050px;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 100px;
      margin-left: 600px;
      width: 400px;
      height: 250px;
      border-radius: 50px;
      box-shadow: 0 4px 8px 0 #d1fc42, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .instagram {
      z-index = 10;
      position: absolute;
      top: 60px;
      right: 950px;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 100px;
      margin-left: 600px;
      width: 70px;
      height: 70px;
      border-radius: 20px;
      box-shadow: 0 4px 8px 0 #d1fc42, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .instaimage {
      margin-top: 6px;
      margin-left: 10px;
      height: 50px;
      width: 50px;
    }
    .twitter {
      z-index = 10;
      position: absolute;
      top: 150px;
      right: 950px;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 100px;
      margin-left: 600px;
      width: 70px;
      height: 70px;
      border-radius: 20px;
      box-shadow: 0 4px 8px 0 #d1fc42, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .twitterimage {
      margin-top: 6px;
      margin-left: 10px;
      height: 50px;
      width: 50px;
    }
    .devianart {
      z-index = 10;
      position: absolute;
      top: 240px;
      right: 950px;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 100px;
      margin-left: 600px;
      width: 70px;
      height: 70px;
      border-radius: 20px;
      box-shadow: 0 4px 8px 0 #d1fc42, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .devianartimage {
      margin-top: 6px;
      margin-left: 10px;
      height: 50px;
      width: 50px;
    }
    .collage {
      z-index = 10;
      position: absolute;
      top: 60px;
      right: 80px;
      backdrop-filter: blur(10px);
      float:right;
      margin-top: 100px;
      margin-left: 600px;
      width: 800px;
      height: 400px;
      border-radius: 50px;
      box-shadow: 0 4px 8px 0 #d1fc42, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    h1 {
      margin-left: 50px;
      font-size: 70px;
      font-family: 'Gloock', serif;
      color: #d1fc42;
    }
    h2 {
      margin-left: 20px;
      font-size: 30px;
      margin-top: 5px;
      font-family: 'Gloock', serif;
      color: #d1fc42;
    }
    p {
      color: #d1fc42;
      font-family: 'Gloock', serif;
      margin-right: 20px;
      margin-left: 30px;
    }
    .bar {
      border: 1px dotted white;
      border-radius: 50px;
      margin-top: -30px;
      margin-left: 30px;
      margin-right: 30px;
    }
    .uploadImage {
      margin-top: 500px;
    }
    .art {
      height: 500px;
      width: 900px;
      background-color: blue;
      margin-left: 600px;
    }

    `

    return (
      <div className="Profile">
        <style>
            {css}
          </style>
        <div className="header">
            <h1>Sir Squirt, Alina Jr</h1>
        </div>
        <div className="instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className = "instaimage"/>
        </div>
        <div className="twitter">
          <img src="https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png" className = "twitterimage"/>
        </div>
        <div className="devianart">
          <img src="https://freepngimg.com/save/12703-deviantart-logo-transparent/1280x1000" className = "twitterimage"/>  
        </div>
        <div className="art">
          <ImageUpload />
        </div>

      </div>
    )
}
export default Profile;
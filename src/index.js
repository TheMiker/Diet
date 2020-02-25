import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import donutOBJ from "./donut.obj";
import donutMTL from "./donut.mtl";

import watermelonOBJ from "./watermelon.obj";
import watermelonMTL from "./watermelon.mtl";

import bananaOBJ from "./banana.obj";
import bananaMTL from "./banana.mtl";

// import dogOBJ from "./dog.obj";
// import dogMTL from "./dog.mtl";

class App extends React.Component {
  
  constructor(props) {
    super(props);
      this.state = {
        position: {x: 0, y: 0, z: 1}, 
        color: 'red', 
        textX: -1, 
        seconds: parseInt(props.startTimeInMiliseconds, 10) || 0,
        dos : this.foodMake(),
        level: 1,
        textTime: 0,
        textPosition: null,
        bananaCount: 0,
        donutCount: 0,

      }
    };

    levelIndicator(){
      if(this.state.level === 1){
        return (<Entity text={{value: "Welcome! You're Objective Is To Eat Well! Eat Five Bananas Without Eating Three Donuts!", align: 'center'}} position={{x: -.1*this.state.textX - .8, y: 1.5, z: 0}}/>);
      } 
      if(this.state.level === 2){
        if(this.state.textTime === 0){
          var elem = document.getElementById('self');
          var position = elem.getAttribute('position');
          this.setState(state => ({textTime: this.state.seconds,textPosition: position}));
        }
        if(this.state.textTime > this.state.seconds - 300){
          return (<Entity text={{value: "LEVEL 2!", align: 'center'}} position={this.state.textPosition}/>);
        } else {
          this.setState(state => ({textTime: 0}));
        }
      }
      if(this.state.level === 3){
        if(this.state.textTime === 0){
          var elem = document.getElementById('self');
          var position = elem.getAttribute('position');
          this.setState(state => ({textTime: this.state.seconds,textPosition: position}));
        }
        if(this.state.textTime > this.state.seconds - 300){
          return (<Entity text={{value: "LEVEL 3!", align: 'center'}} position={this.state.textPosition}/>);
        } 
      }
    }


     roundTo(num, fixed) {
      var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
      return num.toString().match(re)[0];
  }

    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1,
        textX: (state.seconds / 10) - 3,
      }));
      // console.log(this.state.bananaCount);
      // console.log(this.state.donutCount);
        if(this.state.position != null){
          this.setState(state => ({position: null}));
        }
        var bc=0;
        var dc = 0
        if(this.state.seconds > 50 && this.state.seconds < 600){
          var banana = new Set();
          var donut = new Set();
          for(let i = 0; i < 100; i++){
            var elem = document.getElementById(i.toString());
            var position = elem.getAttribute('position');
            elem.setAttribute("position", {"x": position.x, "y": position.y, "z": position.z + this.state.seconds/1000 * this.state.level})
            var x = parseFloat(this.roundTo(position.x,2));
            var z = parseFloat(this.roundTo(position.z,2)); 
            
            var j = x - .1; 
            var k = z - .1; 
            // while(j < x + .1){
            //   while(k < z + .1){
            //     if(position.y == 1.31){
            //       if(k.toString().length > 5){
            //         k = parseFloat(this.roundTo(position.z,2));
            //       }
            //       banana.add({"x":j,"z":k})
            //     }else{
            //       if(k.toString().length > 5){
            //         k = parseFloat(this.roundTo(position.z,2));
            //       }
            //       donut.add({"x":j,"z":k})
            //     }
            //     k += .01;
            //   }
            //   j += .01;
            // }
          }
          // var elem = document.getElementById("self");
          // var position = elem.getAttribute('position');
          // if(position != undefined){
          //   var x = parseFloat(this.roundTo(position.x,2));
          //   var z = parseFloat(this.roundTo(position.z,2)); 
          //   var newPos = {"x":x,"z":z};
          //   if(banana.has(newPos)){
          //     bc++;
          //   }
          //   if(donut.has(newPos)){
          //     dc++;
          //   }
          // }
        }
        console.log(this.state.bc);

        if(this.state.seconds === 650) {
          for(let i = 0; i < 100; i++){
            var elem = document.getElementById(i.toString());
            elem.remove();
        } 
        this.setState(state => ({dos: this.foodMake()}));
      }
        if(this.state.seconds > 750 && this.state.seconds < 1200){
          var banana = new Set();
          var donut = new Set();
          for(let i = 0; i < 100; i++){
            var elem = document.getElementById(i.toString());
            var position = elem.getAttribute('position');
            var new_z = position.z + (this.state.seconds/2000) - 1;
            elem.setAttribute("position", {"x": position.x, "y": position.y, "z": new_z});
            var x = this.roundTo(position.x,3);
            var z = this.roundTo(position.z,3);   
           
            for(let j = x - .3; j < x + .3; j += .01){
              for(let k = z - .3; k < z+.3; k+=.01){
                if(position.y == 1.31){
                  banana.add({"x":j,"z":k})
                }else{
                  donut.add({"x":j,"z":k})
                }
              }
            }
          }
          var elem = document.getElementById("self");
          var position = elem.getAttribute('position');
          var x = this.roundTo(position.x,3);
          var z = this.roundTo(position.z,3); 
          var newPos = {"x":x,"z":z};
          if(banana.has(newPos)){
            this.setState(state => ({bananaCount: this.state.bananaCount + 1}));
          }
          if(donut.has(newPos)){
            this.setState(state => ({donutCount: this.state.donutCount  + 1}));
          }
         
        }
    }

    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 20);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    
    foodMake(){
      let dos = [];
      for(let i = 0; i < 100; i ++){
        let position = (i * 1.3) - 130 - Math.round(Math.random() * 10);
        let choice = Math.round(Math.random() * 2);
        let lane =  Math.round(Math.random() * 2);
        if(lane === 0){lane = -4}
        if(lane === 1){lane = 0}
        if(lane === 2){lane = 4}
        if(choice == 1){
          dos.push(<a-entity sphere-collider='' id={i.toString()} obj-model="obj: #bananaOBJ; mtl: #bananaMTL" position={(lane + .5).toString() + " 1.31 " + position.toString()} rotation="0 0 0" scale="2 2 2"></a-entity>);
        }else {
          dos.push(<a-entity sphere-collider='' id={i.toString()} obj-model="obj: #donutOBJ; mtl: #donutMTL" position={lane.toString() + " 1.3 " + position.toString()} rotation="0 0 0" scale="2 2 2"></a-entity>);
 
        } 
    }
    return dos;
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>


          <a-asset-item id="donutOBJ" src={donutOBJ}></a-asset-item>
          <a-asset-item id="donutMTL" src={donutMTL}></a-asset-item>

          <a-asset-item id="bananaOBJ" src={bananaOBJ}></a-asset-item>
          <a-asset-item id="bananaMTL" src={bananaMTL}></a-asset-item>

          
        </a-assets>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {this.levelIndicator()}
        {this.state.dos}
        <Entity id="self" primitive="a-camera" position={this.state.position}>
        <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));

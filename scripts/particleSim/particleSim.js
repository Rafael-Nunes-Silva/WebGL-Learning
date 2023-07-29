"use strict";

import { Shader } from '../utils/shader.js';
import { Particle } from './particle.js';

import { Vec2, Vec3, AddVec3 } from '../utils/vectors.js';
import { Mat4, Orthographic } from '../utils/matrices.js';

const vertSource = `
attribute vec3 vertPos;
attribute vec3 vertColor;

varying highp vec3 color;

uniform highp mat4 projMat, transMat;

void main(){
    gl_Position = projMat * transMat * vec4(vertPos, 1);
    color = vertColor;
}`;

const fragSource = `
varying highp vec3 color;

void main(){
    gl_FragColor = vec4(color, 1);
}`;

var webglContext = null;

var resolution = new Vec2(128, 72);
var projMat =  Orthographic(
    0.5 * resolution.vec[0],
    -0.5 * resolution.vec[0],
    0.5 * resolution.vec[1],
    -0.5 * resolution.vec[1],
    0, 1
);
var viewMat = new Mat4();
var shader = null;

const WATER = {
    "color": new Vec3(0, 0, 1),
    "behaviour": new Vec3(0, -1, 0),
    "stability": -1,
    "density": 0
};
const SAND = {
    "color": new Vec3(1, 1, 0),
    "behaviour": new Vec3(0, -1, 0),
    "stability": 0,
    "density": 1
};
var currentParticleType = WATER;
var brushSize = 0;

window.addEventListener(
    "load",
    function setup(){
        const canvas = document.getElementById("webglCanvas");
        const canvasWidth = 1280;
        const canvasHeight = 720;
        canvas.setAttribute("width", canvasWidth);
        canvas.setAttribute("height", canvasHeight);

        canvas.addEventListener(
            "mousedown",
            function(event) {
                if(event.button != 0)
                    return;
                
                let clickPos = new Vec3(
                    Math.round(event.offsetX * (resolution.vec[0] / canvasWidth)) - 0.5 * resolution.vec[0],
                    0.5 * resolution.vec[1] - Math.round(event.offsetY * (resolution.vec[1] / canvasHeight)),
                    0
                );

                AddToGrid(
                    new Particle(
                        webglContext,
                        shader,
                        clickPos,
                        currentParticleType
                    ),
                    clickPos
                );

                for(let x = -brushSize; x < brushSize; x++){
                    for(let y = -brushSize; y < brushSize; y++){
                        let brushPos = ClampPosition(AddVec3(clickPos, new Vec3(x, y, 0)));
                        AddToGrid(
                            new Particle(
                                webglContext,
                                shader,
                                brushPos,
                                currentParticleType
                            ),
                            brushPos
                        );
                    }   
                }
            }
        );

        this.document.getElementById("Brush").addEventListener(
            "change",
            function(e){
                brushSize = e.target.value;
            }
        )

        this.document.getElementById("WATER").addEventListener(
            "click",
            function(){
                currentParticleType = WATER;
            }
        );
        this.document.getElementById("SAND").addEventListener(
            "click",
            function(){
                currentParticleType = SAND;
            }
        );

        webglContext = canvas.getContext("webgl2");
        if(webglContext === null){
            alert("WebGL2 not available.");
            return;
        }

        shader = new Shader(webglContext, vertSource, fragSource);
        shader.Use();
        shader.SetProjectionMatrix(projMat);
        shader.SetViewMatrix(viewMat);

        Update();
    }
);

var lastTime = 0, deltaTime = 0;
function Update(){
    let currentTime = new Date().getTime() * 0.001;
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    webglContext.clearColor(0.1, 0.1, 0.15, 1.0);
    webglContext.clear(webglContext.COLOR_BUFFER_BIT);

    GetParticlesPos().forEach(function(pos){
        let particle = GetFromGrid(pos, false);
        particle.Draw();

        MoveFromTo(particle.position, AddVec3(particle.position, particle.properties.behaviour))

        if(particle.properties.behaviour.vec[1] > 0){
            if(ParticlesBelow(particle.position) > particle.properties.stability){
                let dir = Math.round(Math.random() * 2 - 1);
                MoveFromTo(particle.position, AddVec3(particle.position, new Vec3(dir, 0, 0)))
            }
        }
        else if(particle.properties.behaviour.vec[1] < 0){
            if(ParticlesAbove(particle.position) > particle.properties.stability){
                let dir = Math.round(Math.random() * 2 - 1);
                MoveFromTo(particle.position, AddVec3(particle.position, new Vec3(dir, 0, 0)))
            }
        }
    });

    requestAnimationFrame(Update);
}

function ClampPosition(position){
    if(position.vec[0] < -0.5 * resolution.vec[0]){
        position.vec[0] = -0.5 * resolution.vec[0];
    }
    else if(position.vec[0] >= 0.5 * resolution.vec[0]){
        position.vec[0] = 0.5 * resolution.vec[0] - 1;
    }
    if(position.vec[1] < -0.5 * resolution.vec[1]){
        position.vec[1] = -0.5 * resolution.vec[1];
    }
    else if(position.vec[1] >= 0.5 * resolution.vec[1]){
        position.vec[1] = 0.5 * resolution.vec[1] - 1;
    }
    return position;
}

/* PARTICLE SIM FUNCTIONS */

var particlesGrid = [];
for(let x = 0; x < resolution.vec[0]; x++){
    particlesGrid.push([]);
    for(let y = 0; y < resolution.vec[1]; y++){
        particlesGrid[x].push(false);
    }
}

function SetParticle(particleType){
    currentParticleType = particleType;
}

function GetParticlesPos(){
    let particles = [];
    for(let x = 0; x < resolution.vec[0]; x++){
        for(let y = 0; y < resolution.vec[1]; y++){
            let particle = GetFromGrid(new Vec2(x, y), false);
            if(particle){
                particles.push(new Vec2(x, y));
            }
        }
    }
    return particles;
}

function TranslatePosToGrid(pos){
    pos = ClampPosition(new Vec3(pos.vec[0], pos.vec[1], 0));
    return new Vec3(
        pos.vec[0] + 0.5 * resolution.vec[0],
        pos.vec[1] + 0.5 * resolution.vec[1],
        0
    );
}
function TranslateGridToPos(pos){
    return ClampPosition(AddVec3(pos, new Vec3(-0.5 * resolution.vec[0], -0.5 * resolution.vec[1], 0)));
}

function AddToGrid(particle, pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    if(particlesGrid[posInGrid.vec[0]][posInGrid.vec[1]])
        return false;
    
    particlesGrid[posInGrid.vec[0]][posInGrid.vec[1]] = particle;
    return true;
}
function GetFromGrid(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;
    
    return particlesGrid[posInGrid.vec[0]][posInGrid.vec[1]];
}
function MoveFromTo(fromPos, toPos, translatePos = true){
    let fromInGrid = translatePos ? TranslatePosToGrid(fromPos) : fromPos;
    let toInGrid = translatePos ? TranslatePosToGrid(toPos) : toPos;

    let tempParticle = particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]];
    
    if(tempParticle)
        return false;

    particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]] = particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]];
    particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]] = tempParticle;

    particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]].position = TranslateGridToPos(toInGrid);

    return true;
}

function ParticlesAbove(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let onTop = 0;
    for(let i = 1; i < (resolution.vec[1] - posInGrid.vec[1]); i++){
        if(!particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] + i])
            break;
        onTop++;
    }

    return onTop;
}
function ParticlesBelow(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let onTop = 0;
    for(let i = -1; i < (resolution.vec[1] - posInGrid.vec[1]); i--){
        if(!particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] + i])
            break;
        onTop++;
    }

    return onTop;
}

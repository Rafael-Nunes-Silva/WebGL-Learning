"use strict";

import { Shader } from "../utils/shader.js";
import {
    Particle,

    PLASMA,
    FIRE,

    VAPOUR,
    GAS,
    SMOKE,

    WATER,
    LAVA,
    OIL,

    ROCK,
    WOOD,
    STONE,
    SAND,
    SOIL,
    ICE
} from "./particle.js";

import { Vec2, Vec3, AddVec3 } from "../utils/vectors.js";
import { Mat4, Orthographic } from "../utils/matrices.js";

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

var currentParticleType = WATER;
var brushSize = 0;
var paused = false;

/* TODO
Transform properties into a class
make it so particles can become another upon death
   TODO */

window.addEventListener(
    "load",
    function setup(){
        const canvas = document.getElementById("webglCanvas");
        const canvasWidth = 1280;
        const canvasHeight = 720;
        canvas.setAttribute("width", canvasWidth);
        canvas.setAttribute("height", canvasHeight);

        webglContext = canvas.getContext("webgl2");
        if(webglContext === null){
            alert("WebGL2 not available.");
            return;
        }
        
        SetupControls();
        canvas.addEventListener(
            "mousedown",
            function(event) {
                if(event.button != 0)
                    return;
                
                let clickPos = new Vec3(
                    Math.round(event.offsetX * (resolution.vec[0] / canvasWidth) - 0.5) - 0.5 * resolution.vec[0],
                    0.5 * resolution.vec[1] - Math.round(event.offsetY * (resolution.vec[1] / canvasHeight) + 0.5),
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

        shader = new Shader(webglContext, vertSource, fragSource);
        shader.Use();
        shader.SetProjectionMatrix(projMat);
        shader.SetViewMatrix(viewMat);

        Update();
    }
);

function SetupControls(){
    /* Controls */
    document.getElementById("Brush").addEventListener(
        "change",
        function(e){
            brushSize = e.target.value;
        }
    );
    // document.getElementById("Temperature").addEventListener(
    //     "change",
    //     function(e){
    //         temperature = e.target.value;
    //     }
    // );
    document.getElementById("Pause").addEventListener(
        "click",
        function(e){
            paused = true;
        }
    );
    document.getElementById("Play").addEventListener(
        "click",
        function(e){
            paused = false;
        }
    );
    document.getElementById("Reset").addEventListener(
        "click",
        function(e){
            for(let x = 0; x < resolution.vec[0]; x++){
                for(let y = 0; y < resolution.vec[1]; y++){
                    RemoveFromGrid(new Vec3(x, y, 0), false);
                }
            }
        }
    );

    document.getElementById("PLASMA").addEventListener(
        "click",
        function(){
            currentParticleType = PLASMA;
        }
    );
    document.getElementById("FIRE").addEventListener(
        "click",
        function(){
            currentParticleType = FIRE;
        }
    );

    /* Gases */
    document.getElementById("VAPOUR").addEventListener(
        "click",
        function(){
            currentParticleType = VAPOUR;
        }
    );
    document.getElementById("GAS").addEventListener(
        "click",
        function(){
            currentParticleType = GAS;
        }
    );
    document.getElementById("SMOKE").addEventListener(
        "click",
        function(){
            currentParticleType = SMOKE;
        }
    );

    /* Liquid */
    document.getElementById("WATER").addEventListener(
        "click",
        function(){
            currentParticleType = WATER;
        }
    );
    document.getElementById("LAVA").addEventListener(
        "click",
        function(){
            currentParticleType = LAVA;
        }
    );
    document.getElementById("OIL").addEventListener(
        "click",
        function(){
            currentParticleType = OIL;
        }
    );

    /* Solids */
    document.getElementById("ROCK").addEventListener(
        "click",
        function(){
            currentParticleType = ROCK;
        }
    );
    document.getElementById("WOOD").addEventListener(
        "click",
        function(){
            currentParticleType = WOOD;
        }
    );
    document.getElementById("STONE").addEventListener(
        "click",
        function(){
            currentParticleType = STONE;
        }
    );
    document.getElementById("SAND").addEventListener(
        "click",
        function(){
            currentParticleType = SAND;
        }
    );
    document.getElementById("SOIL").addEventListener(
        "click",
        function(){
            currentParticleType = SOIL;
        }
    );
    document.getElementById("ICE").addEventListener(
        "click",
        function(){
            currentParticleType = ICE;
        }
    );
}

function Update(){
    webglContext.clearColor(0.0, 0.0, 0.0, 1.0);
    webglContext.clear(webglContext.COLOR_BUFFER_BIT);

    if(paused){
        GetParticlesPos().forEach(function(particle){particle.Draw();});
    }
    else{
        GetParticlesPos().forEach(function(particle){
            particle.Draw();
            if(!particle.Update())
                RemoveFromGrid(particle.position);
            
            MoveFromTo(particle.position, AddVec3(particle.position, particle.behaviour));
            CalculateTemperature(particle);

            if(particle.behaviour.vec[1] > 0){
                if(ParticlesBelow(particle.position) > particle.stability){
                    let dir = Math.round(Math.random() * 2 - 1);

                    MoveFromTo(particle.position, AddVec3(particle.position, new Vec3(dir, 0, 0)))
                }
            }
            else if(particle.behaviour.vec[1] < 0){
                if(ParticlesAbove(particle.position) > particle.stability){
                    let dir = Math.round(Math.random() * 2 - 1);

                    MoveFromTo(particle.position, AddVec3(particle.position, new Vec3(dir, 0, 0)))
                }
            }
        });
    }

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

function GetParticlesPos(){
    let particles = [];
    for(let x = 0; x < resolution.vec[0]; x++){
        for(let y = 0; y < resolution.vec[1]; y++){
            let particle = GetFromGrid(new Vec2(x, y), false);
            if(particle){
                particles.push(particle);
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
function RemoveFromGrid(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    particlesGrid[posInGrid.vec[0]][posInGrid.vec[1]] = false;
}
function MoveFromTo(fromPos, toPos, translatePos = true){
    let fromInGrid = translatePos ? TranslatePosToGrid(fromPos) : fromPos;
    let toInGrid = translatePos ? TranslatePosToGrid(toPos) : toPos;

    if(!particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]])
        return false;
    
    let tempParticle = particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]];

    if(!tempParticle){
        particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]] = particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]];
        particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]] = tempParticle;

        particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]].position = TranslateGridToPos(toInGrid);
        return true;
    }
    
    if(tempParticle.density < particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]].density){
        particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]] = particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]];
        particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]] = tempParticle;

        particlesGrid[fromInGrid.vec[0]][fromInGrid.vec[1]].position = TranslateGridToPos(fromInGrid);
        particlesGrid[toInGrid.vec[0]][toInGrid.vec[1]].position = TranslateGridToPos(toInGrid);
        return true;
    }

    return false;
}

function ParticlesAbove(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let thisDensity = GetFromGrid(posInGrid, false).density;

    let onTop = 0;
    for(let i = 1; i < (resolution.vec[1] - posInGrid.vec[1]); i++){
        if(!particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] + i])
            break;
        if(particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] + i].density < thisDensity)
            break;
        onTop++;
    }

    return onTop;
}
function ParticlesBelow(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let thisDensity = GetFromGrid(posInGrid, false).density;

    let onTop = 0;
    for(let i = 1; i < posInGrid.vec[1]; i++){
        if(!particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] - i])
            break;
        if(particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] - i].density < thisDensity)
            break;
        onTop++;
    }

    return onTop;
}

function SpaceAbove(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let space = 0;
    for(let i = 1; i < (resolution.vec[1] - posInGrid.vec[1]); i++){
        if(particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] + i])
            break;
        space++;
    }

    return space;
}
function SpaceBelow(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let space = 0;
    for(let i = 1; i < posInGrid.vec[1]; i++){
        if(particlesGrid[posInGrid.vec[0]][posInGrid.vec[1] - i])
            break;
        space++;
    }

    return space;
}
function SpaceToRight(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let space = 0;
    for(let i = 1; i < (resolution.vec[0] - posInGrid.vec[0]); i++){
        if(particlesGrid[posInGrid.vec[0] + i][posInGrid.vec[1]])
            break;
        space++;
    }

    return space;
}
function SpaceToLeft(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let space = 0;
    for(let i = 1; i < posInGrid.vec[0]; i++){
        if(particlesGrid[posInGrid.vec[0] - i][posInGrid.vec[1]])
            break;
        space++;
    }

    return space;
}
function HasSpaceAbove(pos, translatePos = true){
    return !GetFromGrid(AddVec3(pos, new Vec3(0, 1, 0)), translatePos);
}
function HasSpaceBelow(pos, translatePos = true){
    return !GetFromGrid(AddVec3(pos, new Vec3(0, -1, 0)), translatePos);
}
function HasSpaceToRight(pos, translatePos = true){
    return !GetFromGrid(AddVec3(pos, new Vec3(1, 0, 0)), translatePos);
}
function HasSpaceToLeft(pos, translatePos = true){
    return !GetFromGrid(AddVec3(pos, new Vec3(-1, 0, 0)), translatePos);
}

function CompareParticles(particleA, particleB){
    return particleA == particleB;
}

function HasEmptyAround(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    let emptyPos = AddVec3(posInGrid, new Vec3(0, 1, 0));
    if(!GetFromGrid(emptyPos, false))
        return TranslateGridToPos(emptyPos);
    
    emptyPos = AddVec3(posInGrid, new Vec3(0, -1, 0));
    if(!GetFromGrid(emptyPos, false))
        return TranslateGridToPos(emptyPos);
    
    emptyPos = AddVec3(posInGrid, new Vec3(1, 0, 0));
    if(!GetFromGrid(emptyPos, false))
        return TranslateGridToPos(emptyPos);
    
    emptyPos = AddVec3(posInGrid, new Vec3(-1, 0, 0));
    if(!GetFromGrid(emptyPos, false))
        return TranslateGridToPos(emptyPos);
    
    return false;
}
function EmptyUnder(pos, translatePos = true){
    let posInGrid = translatePos ? TranslatePosToGrid(pos) : pos;

    return !GetFromGrid(AddVec3(posInGrid, new Vec3(0, -1, 0)), false);
}

function CalculateTemperature(particle){
    let above = GetFromGrid(AddVec3(particle.position, new Vec3(0, 1, 0)));
    let below = GetFromGrid(AddVec3(particle.position, new Vec3(0, -1, 0)));
    let right = GetFromGrid(AddVec3(particle.position, new Vec3(1, 0, 0)));
    let left = GetFromGrid(AddVec3(particle.position, new Vec3(-1, 0, 0)));

    let dirX = Math.round(Math.random());
    if(dirX > 0){
        if(above){
            let temp = (above.temperature + particle.temperature) * 0.5;
            above.temperature = temp;
            particle.temperature = temp;
        }
        if(below){
            let temp = (below.temperature + particle.temperature) * 0.5;
            below.temperature = temp;
            particle.temperature = temp;
        }
    }
    else{
        if(below){
            let temp = (below.temperature + particle.temperature) * 0.5;
            below.temperature = temp;
            particle.temperature = temp;
        }
        if(above){
            let temp = (above.temperature + particle.temperature) * 0.5;
            above.temperature = temp;
            particle.temperature = temp;
        }
    }

    let dirY = Math.round(Math.random());
    if(dirY > 0){
        if(right){
            let temp = (right.temperature + particle.temperature) * 0.5;
            right.temperature = temp;
            particle.temperature = temp;
        }
        if(left){
            let temp = (left.temperature + particle.temperature) * 0.5;
            left.temperature = temp;
            particle.temperature = temp;
        }
    }
    else{
        if(left){
            let temp = (left.temperature + particle.temperature) * 0.5;
            left.temperature = temp;
            particle.temperature = temp;
        }
        if(right){
            let temp = (right.temperature + particle.temperature) * 0.5;
            right.temperature = temp;
            particle.temperature = temp;
        }
    }

    // if(above){
    //     let temp = (above.temperature + particle.temperature) * 0.5;
    //     above.temperature = temp;
    //     particle.temperature = temp;
    // }
    // if(below){
    //     let temp = (below.temperature + particle.temperature) * 0.5;
    //     below.temperature = temp;
    //     particle.temperature = temp;
    // }
    // if(right){
    //     let temp = (right.temperature + particle.temperature) * 0.5;
    //     right.temperature = temp;
    //     particle.temperature = temp;
    // }
    // if(left){
    //     let temp = (left.temperature + particle.temperature) * 0.5;
    //     left.temperature = temp;
    //     particle.temperature = temp;
    // }
}

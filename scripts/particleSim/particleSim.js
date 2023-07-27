"use strict";

import { Shader } from '../utils/shader.js';
import { Renderable } from '../utils/renderable.js';
import { Particle, ParticleType } from './particle.js';

import { Vec2, Vec3 } from '../utils/vectors.js';
import { Mat4, Orthographic, TransformMat4 } from '../utils/matrices.js';

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

const vertices = [
    -0.5, -0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, 0.5, 0.0,
    0.5, -0.5, 0.0
];
const colors = [
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
];

/*
var webglContext = null;
var shaderProgram = null;
var programInfo = null;
var buffers = null;
*/

// var lastTime = 0, deltaTime = 0;

var resolution = new Vec2(10, 10); //new Vec2(1280, 720);
var projMat =  Orthographic(
    0.8 * resolution.vec[0],
    -0.8 * resolution.vec[0],
    0.5 * resolution.vec[1],
    -0.5 * resolution.vec[1],
    0, 1
);
var viewMat = new Mat4();
var shader = null;

window.addEventListener(
    "load",
    function setup(){
        const canvas = document.getElementById("webglCanvas");
        // canvas.setAttribute("width", resolution.vec[0]);
        // canvas.setAttribute("height", resolution.vec[1]);
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);

        const webglContext = canvas.getContext("webgl2");
        if(webglContext === null){
            alert("WebGL2 not available.");
            return;
        }

        shader = new Shader(webglContext, vertSource, fragSource);
        shader.Use();
        shader.SetProjectionMatrix(projMat);
        shader.SetViewMatrix(viewMat);

        let testParticle = new Renderable(webglContext, shader, vertices, colors);

        webglContext.clearColor(0.25, 0.25, 0.25, 1.0);
        webglContext.clear(webglContext.COLOR_BUFFER_BIT);
        testParticle.Draw();

        new ParticleType()

        // Draw();
    }
);

function Draw(){
    let currentTime = new Date().getTime() * 0.001;
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    webglContext.clearColor(0.25, 0.25, 0.25, 1.0);
    webglContext.clear(webglContext.COLOR_BUFFER_BIT);

    webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffers.vertice);
    webglContext.vertexAttribPointer(
        programInfo.attributes.vertPos,
        3,
        webglContext.FLOAT,
        false,
        0,
        0
    );
    webglContext.enableVertexAttribArray(programInfo.attributes.vertPos);

    webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffers.color);
    webglContext.vertexAttribPointer(
        programInfo.attributes.vertColor,
        3,
        webglContext.FLOAT,
        false,
        0,
        0
    );
    webglContext.enableVertexAttribArray(programInfo.attributes.vertColor);

    webglContext.useProgram(programInfo.program);

    webglContext.enable(webglContext.DEPTH_TEST);
    webglContext.uniformMatrix4fv(
        programInfo.uniforms.projMat,
        webglContext.FALSE,
        Orphographic(
            8, //0.5 * window.innerWidth,
            -8, //-0.5 * window.innerWidth,
            4.5, //0.5 * window.innerHeight,
            -4.5, //-0.5 * window.innerHeight,
            0,
            1
        ).mat
    );
    webglContext.uniformMatrix4fv(
        programInfo.uniforms.transMat,
        webglContext.FALSE,
        TransformMat4(
            new Vec3(0, 0, -1),
            new Vec3(0, 0, 0),
            new Vec3(1, 1, 1)
        ).mat
    );

    webglContext.drawArrays(webglContext.TRIANGLE_STRIP, 0, 36);

    requestAnimationFrame(Draw);
}

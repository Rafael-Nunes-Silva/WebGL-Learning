"use strict";

import { InitShaderProgram } from './webglfuncs.js';
import { Vec3 } from './vectors.js';
import { Mat4, Perspective } from './matrices.js';

const vertSource = `
attribute vec3 vertPos;
attribute vec3 vertColor;

varying highp vec3 color;

uniform highp mat4 projMat, viewMat, transMat;

void main(){
    gl_Position = projMat * viewMat * transMat * vec4(vertPos, 1);
    color = vertColor;
}`;

const fragSource = `
varying highp vec3 color;

void main(){
    gl_FragColor = vec4(color, 1);
}`;

var webglContext = null;
var shaderProgram = null;
var programInfo = null;
var buffers = null;

var lastTime = 0, deltaTime = 0;

function setup(){
    const canvas = document.getElementById("webglCanvas");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    webglContext = canvas.getContext("webgl");

    if(webglContext === null){
        alert("WebGL not available.");
        return;
    }

    shaderProgram = InitShaderProgram(webglContext, vertSource, fragSource);

    webglContext.useProgram(shaderProgram);
    programInfo = {
        program: shaderProgram,
        attributes: {
            vertPos: webglContext.getAttribLocation(shaderProgram, "vertPos"),
            vertColor: webglContext.getAttribLocation(shaderProgram, "vertColor")
        },
        uniforms: {
            projMat: webglContext.getUniformLocation(shaderProgram, "projMat"),
            viewMat: webglContext.getUniformLocation(shaderProgram, "viewMat"),
            transMat: webglContext.getUniformLocation(shaderProgram, "transMat")
        }
    };

    buffers = InitBuffers(webglContext);

    Draw();
}
window.setup = setup;

function InitBuffers(context){
    const verticeBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, verticeBuffer);
    const vertices = [
        // front-face
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,

        // right-face
        0.5, -0.5, -0.5,
        0.5,  0.5, -0.5,
        0.5, -0.5,  0.5,
        0.5,  0.5, -0.5,
        0.5,  0.5,  0.5,
        0.5, -0.5,  0.5,

        // back-face
         0.5, -0.5, 0.5,
         0.5,  0.5, 0.5,
        -0.5, -0.5, 0.5,
         0.5,  0.5, 0.5,
        -0.5,  0.5, 0.5,
        -0.5, -0.5, 0.5,

        // left-face
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5, -0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5, -0.5,

        // top-face
        -0.5, 0.5, -0.5,
        -0.5, 0.5,  0.5,
         0.5, 0.5, -0.5,
        -0.5, 0.5,  0.5,
         0.5, 0.5,  0.5,
         0.5, 0.5, -0.5,

        // bottom-face
        -0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

    const colorBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer);
    const colors = [
        // front-face
        0, 0, 0,
        0, 1, 0,
        1, 0, 0,
        0, 1, 0,
        1, 1, 0,
        1, 0, 0,

        // right-face
        1, 0, 0,
        1, 1, 0,
        1, 0, 1,
        1, 1, 0,
        1, 1, 1,
        1, 0, 1,

        // back-face
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,
        1, 1, 1,
        0, 1, 1,
        0, 0, 1,

        // left-face
        0, 0, 1,
        0, 1, 1,
        0, 0, 0,
        0, 1, 1,
        0, 1, 0,
        0, 0, 0,

        // top-face
        0, 1, 0,
        0, 1, 1,
        1, 1, 0,
        0, 1, 1,
        1, 1, 1,
        1, 1, 0,

        // bottom-face
        0, 0, 1,
        0, 0, 0,
        1, 0, 1,
        0, 0, 0,
        1, 0, 0,
        1, 0, 1
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW);
    
    return {
        vertice: verticeBuffer,
        color: colorBuffer
    };
}

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

    webglContext.uniform1fv(programInfo.uniforms.projMat, Perspective(window.innerWidth, window.innerHeight, 0.1, 100, 90));
    webglContext.uniform1fv(programInfo.uniforms.viewMat, new Mat4());
    webglContext.uniform1fv(programInfo.uniforms.transMat, new Mat4());

    webglContext.drawArrays(webglContext.TRIANGLE_STRIP, 0, 36);

    requestAnimationFrame(Draw);
}
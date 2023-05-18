"use strict";

import { InitShaderProgram } from './webglfuncs.js';
import { LookAt, Mat4, Orphographic, Rotate2D, RotateMat4, TranslateMat4 } from './matrices.js'

const vertSource = `
attribute vec3 vertPos;
attribute vec3 vertColor;

uniform float vertColorMulti;
uniform mat4 projMat;
uniform mat4 viewMat;
uniform mat4 transMat;

varying highp vec3 color;
varying highp float colorMulti;

void main(){
    gl_Position = projMat * viewMat * transMat * vec4(vertPos, 1);
    color = vertColor;
    colorMulti = vertColorMulti;
}`;

const fragSource = `
varying highp vec3 color;
varying highp float colorMulti;

void main(){
    gl_FragColor = vec4(color * colorMulti, 1);
}`;

var webglContext = null;
var shaderProgram = null;
var programInfo = null;
var buffers = null;

var colorMulti = 0, rotAngle = 0;
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
            vertColorMulti: webglContext.getUniformLocation(shaderProgram, "vertColorMulti"),
            projMat: webglContext.getUniformLocation(shaderProgram, "projMat"),
            viewMat: webglContext.getUniformLocation(shaderProgram, "viewMat"),
            transMat: webglContext.getUniformLocation(shaderProgram, "transMat")
        }
    };

    webglContext.useProgram(programInfo.program);

    webglContext.uniformMatrix4fv(programInfo.uniforms.projMat, webglContext.FALSE, new Mat4(1).mat, 0);
    webglContext.uniformMatrix4fv(programInfo.uniforms.viewMat, webglContext.FALSE, TranslateMat4(new Mat4(), 0, 0, 0).mat, 0);
    // webglContext.uniformMatrix4fv(programInfo.uniforms.projMat, webglContext.FALSE, Orphographic(-(window.innerWidth/2), window.innerWidth/2, -(window.innerHeight/2), window.innerHeight/2, 0.1, 100).mat, 0);
    // webglContext.uniformMatrix4fv(programInfo.uniforms.viewMat, webglContext.FALSE, LookAt([1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, -10]).mat, 0);
    
    buffers = InitBuffers(webglContext);

    Draw();
}
window.setup = setup;

function InitBuffers(context){
    const positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5,
        -0.5, -0.5,
        0.5, 0.5,
        0.5, -0.5
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

    const colorBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer);
    const colors = [
        1, 1, 0,
        0, 1, 1,
        0, 0, 1,
        1, 1, 0,
        0, 0, 1,
        1, 0, 1
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW);
    
    return {
        position: positionBuffer,
        color: colorBuffer
    };
}

function Draw(){
    let currentTime = new Date().getTime() * 0.001;
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    colorMulti += deltaTime;
    rotAngle += deltaTime * 5;
    if(rotAngle >= 360)
        rotAngle = 0;
    console.log(rotAngle)
    
    webglContext.clearColor(0.25, 0.25, 0.25, 1.0);
    webglContext.clear(webglContext.COLOR_BUFFER_BIT);

    webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffers.position);
    webglContext.vertexAttribPointer(
        programInfo.attributes.vertPos,
        2,
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

    webglContext.uniform1f(programInfo.uniforms.vertColorMulti, Math.abs(colorMulti%2-1));

    console.log(Rotate2D(new Mat4(), rotAngle));
    webglContext.uniformMatrix4fv(programInfo.uniforms.transMat, webglContext.FALSE, Rotate2D(new Mat4(), rotAngle).mat, 0);
    // webglContext.uniformMatrix4fv(programInfo.uniforms.transMat, webglContext.FALSE, RotateMat4(new Mat4(), 0, 0, 0).mat, 0);

    webglContext.drawArrays(webglContext.TRIANGLE_STRIP, 0, 6);

    requestAnimationFrame(Draw);
}
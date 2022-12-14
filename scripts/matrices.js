"use strict";
import * as Vec from "./vectors.js"

const degToRad = Math.PI/180;
const radToDeg = 180/Math.PI;
export { degToRad, radToDeg }

class Mat2{
    mat = [
        1, 0,
        0, 1    
    ]

    Transpose(){
        return[
            mat[0], mat[2],
            mat[1], mat[3]
        ]
    }
}
class Mat3{
    mat = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    Transpose(){
        return[
            mat[0], mat[1], mat[2],
            mat[3], mat[4], mat[5],
            mat[6], mat[7], mat[8],
        ]
    }
}
class Mat4{
    mat = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    Transpose(){
        return[
            mat[0], mat[1], mat[2], mat[3],
            mat[4], mat[5], mat[6], mat[7],
            mat[8], mat[9], mat[10], mat[11],
            mat[12], mat[13], mat[14], mat[15]
        ]
    }
}
export { Mat2, Mat3, Mat4 }

function AddMat2x2(m1, m2){
    return [
        m1.mat[0] + m2.mat[0], m1.mat[1] * m2.mat[1],
        m1.mat[2] + m2.mat[2], m1.mat[3] * m2.mat[3]
    ];
}
function AddMat3x3(m1, m2){
    return [
        m1.mat[0] + m2.mat[0], m1.mat[1] + m2.mat[1], m1.mat[2] + m2.mat[2],
        m1.mat[3] + m2.mat[3], m1.mat[4] + m2.mat[4], m1.mat[5] + m2.mat[5],
        m1.mat[6] + m2.mat[6], m1.mat[7] + m2.mat[7], m1.mat[8] + m2.mat[8],
    ];
}
function AddMat4x4(m1, m2){
    return [
        m1.mat[0] + m2.mat[0], m1.mat[1] + m2.mat[1], m1.mat[2] + m2.mat[2], m1.mat[3] + m2.mat[3],
        m1.mat[4] + m2.mat[4], m1.mat[5] + m2.mat[5], m1.mat[6] + m2.mat[6], m1.mat[7] + m2.mat[7],
        m1.mat[8] + m2.mat[8], m1.mat[9] + m2.mat[9], m1.mat[10] + m2.mat[10], m1.mat[11] + m2.mat[11],
        m1.mat[12] + m2.mat[12], m1.mat[13] + m2.mat[13], m1.mat[14] + m2.mat[14], m1.mat[15] + m2.mat[15]
    ];
}
export { AddMat2x2, AddMat3x3, AddMat4x4 }

function SubMat2x2(m1, m2){
    return [
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1],
        m1.mat[2] - m2.mat[2], m1.mat[3] - m2.mat[3]
    ];
}
function SubMat3x3(m1, m2){
    return [
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1], m1.mat[2] - m2.mat[2],
        m1.mat[3] - m2.mat[3], m1.mat[4] - m2.mat[4], m1.mat[5] - m2.mat[5],
        m1.mat[6] - m2.mat[6], m1.mat[7] - m2.mat[7], m1.mat[8] - m2.mat[8],
    ];
}
function SubMat4x4(m1, m2){
    return [
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1], m1.mat[2] - m2.mat[2], m1.mat[3] - m2.mat[3],
        m1.mat[4] - m2.mat[4], m1.mat[5] - m2.mat[5], m1.mat[6] - m2.mat[6], m1.mat[7] - m2.mat[7],
        m1.mat[8] - m2.mat[8], m1.mat[9] - m2.mat[9], m1.mat[10] - m2.mat[10], m1.mat[11] - m2.mat[11],
        m1.mat[12] - m2.mat[12], m1.mat[13] - m2.mat[13], m1.mat[14] - m2.mat[14], m1.mat[15] - m2.mat[15]
    ];
}
export { SubMat2x2, SubMat3x3, SubMat4x4 }

function MultMat2x2(m1, m2){
    return [
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[2],
        m1.mat[2] * m2.mat[1], m1.mat[3] * m2.mat[3]
    ];
}
function MultMat3x3(m1, m2){
    return [
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[3], m1.mat[2] * m2.mat[6],
        m1.mat[3] * m2.mat[1], m1.mat[4] * m2.mat[4], m1.mat[5] * m2.mat[7],
        m1.mat[6] * m2.mat[2], m1.mat[7] * m2.mat[5], m1.mat[8] * m2.mat[8],
    ];
}
function MultMat4x4(m1, m2){
    return [
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[4], m1.mat[2] * m2.mat[8], m1.mat[3] * m2.mat[12],
        m1.mat[4] * m2.mat[1], m1.mat[5] * m2.mat[5], m1.mat[6] * m2.mat[9], m1.mat[7] * m2.mat[13],
        m1.mat[8] * m2.mat[2], m1.mat[9] * m2.mat[6], m1.mat[10] * m2.mat[10], m1.mat[11] * m2.mat[14],
        m1.mat[12] * m2.mat[3], m1.mat[13] * m2.mat[7], m1.mat[14] * m2.mat[11], m1.mat[15] * m2.mat[15]
    ];
}
export { MultMat2x2, MultMat3x3, MultMat4x4 }

function DeterminantMat2(m){
    return (m.mat[0] * m.mat[3]) - (m.mat[1] * m.mat[2]);
}
function DeterminantMat3(m){
    return (
                m.mat[0] * m.mat[4] * m.mat[8] +
                m.mat[1] * m.mat[5] * m.mat[6] +
                m.mat[2] * m.mat[3] * m.mat[7]
            ) -
            (
                m.mat[2] * m.mat[4] * m.mat[6] +
                m.mat[0] * m.mat[5] * m.mat[7] +
                m.mat[1] * m.mat[3] * m.mat[8]
            );
}
function DeterminantMat4(m){
    return (
                m.mat[0] * m.mat[5] * m.mat[10] * m.mat[15] +
                m.mat[1] * m.mat[6] * m.mat[11] * m.mat[12] +
                m.mat[2] * m.mat[7] * m.mat[8] * m.mat[13]
            ) -
            (
                m.mat[3] * m.mat[6] * m.mat[9] * m.mat[12] +
                m.mat[2] * m.mat[5] * m.mat[8] * m.mat[15] +
                m.mat[1] * m.mat[4] * m.mat[11] * m.mat[14]
            );
}
export { DeterminantMat2, DeterminantMat3, DeterminantMat4 }

function Rotate2D(mat4, angle){
    angle *= degToRad;
    mat4.mat[0] = Math.cos(angle);
    mat4.mat[1] = -Math.sin(angle);
    mat4.mat[3] = Math.sin(angle);
    mat4.mat[4] = Math.cos(angle);

    return mat4;
}
function Rotate3D(mat4, vec3){
    mat4.mat[0] = Math.cos(vec3[1]) * Math.cos(vec3[2]);
    mat4.mat[1] = -Math.sin(vec3[2]);
    mat4.mat[2] = Math.sin(vec3[1]);
    mat4.mat[4] = Math.sin(vec3[2]);
    mat4.mat[5] = Math.cos(vec3[0]) * Math.cos(vec3[2]);
    mat4.mat[6] = -Math.sin(vec3[0]);
    mat4.mat[8] = -Math.sin(vec3[1]);
    mat4.mat[9] = Math.sin(vec3[0]);
    mat4.mat[10] = Math.cos(vec3[0]) * Math.cos(vec3[1]);

    return mat4;
}
export { Rotate2D, Rotate3D }

function ScaleMat3(mat, x, y){
    let scaleMat = new Mat3();
    scaleMat.mat[0] = x;
    scaleMat.mat[5] = y;

    return MultMat3x3(mat, scaleMat);
}
function ScaleMat4(mat, x, y, z){
    let scaleMat = new Mat4();
    scaleMat.mat[0] = x;
    scaleMat.mat[5] = y;
    scaleMat.mat[10] = z;

    return MultMat4x4(mat, scaleMat);
}
export { ScaleMat3, ScaleMat4 }

function RotateMat3(mat, x, y){
    let xMat = new Mat3();
    xMat.mat[5] = xMat.mat[10] = Math.Math.cos(x);
    xMat.mat[6] = -Math.Math.sin(x);
    xMat.mat[9] = Math.Math.sin(x);

    let yMat = new Mat3();
    yMat.mat[0] = yMat.mat[10] = Math.Math.cos(y);
    yMat.mat[8] = -Math.Math.sin(y);
    yMat.mat[2] = Math.Math.sin(y);

    let rotMat = MultMat3x3(xMat, yMat);
    return MultMat3x3(mat, rotMat);
}
function RotateMat4(mat, x, y, z){
    let xMat = new Mat4();
    xMat.mat[5] = xMat.mat[10] = Math.Math.cos(x);
    xMat.mat[6] = -Math.Math.sin(x);
    xMat.mat[9] = Math.Math.sin(x);

    let yMat = new Mat4();
    yMat.mat[0] = yMat.mat[10] = Math.Math.cos(y);
    yMat.mat[8] = -Math.Math.sin(y);
    yMat.mat[2] = Math.Math.sin(y);

    let zMat = new Mat4();
    zMat.mat[0] = zMat.mat[5] = Math.Math.cos(z);
    zMat.mat[1] = -Math.Math.sin(z);
    zMat.mat[4] = Math.Math.sin(z);

    let rotMat = MultMat4x4(MultMat4x4(xMat, yMat), zMat);
    return MultMat4x4(mat, rotMat);
}
export { RotateMat3, RotateMat4 }

function TranslateMat3(mat, x, y){
    let transMat = new Mat3();
    transMat.mat[0] = transMat.mat[5] = transMat.mat[10] = transMat.mat[15] = 0;

    transMat.mat[3] = x;
    transMat.mat[7] = y;
    transMat.mat[11] = z;

    return AddMat4x4(mat, transMat);
}
function TranslateMat4(mat, x, y, z){
    let transMat = new Mat4();
    transMat.mat[0] = transMat.mat[5] = transMat.mat[10] = transMat.mat[15] = 0;

    transMat.mat[3] = x;
    transMat.mat[7] = y;
    transMat.mat[11] = z;

    return AddMat4x4(mat, transMat);
}
export { TranslateMat3, TranslateMat4 }

function Perspective(width, height, near, far, fov){
    fov *= degToRad;
    let mat4 = new Mat4();
    mat4.mat = [
        1/((width/height)*Math.tan(fov/2)), 0, 0, 0,
        0, 1/Math.tan(fov/2), 0, 0,
        0, 0, -((far+near)/(far-near)), -((2*far*near)/(far-near)),
        0, 0, -1, 0
    ];
    return mat4;
}
function Orphographic(right, left, top, bottom, near, far){
    let mat4 = new Mat4();
    mat4.mat = [
        2/(right-left), 0, 0, -((right+left)/(right-left)),
        0, 2/(top-bottom), 0, -((top+bottom)/(top-bottom)),
        0, 0, -2/(far-near), -((far+near)/(far-near)),
        0, 0, 0, 1
    ];
    return mat4;
}
export { Perspective, Orphographic }

function LookAt(right, up, front, position){
    let mat4 = new Mat4();
    mat4.mat = [
        -right[0], -right[1], -right[2], 0,
        -up[0], -up[1], -up[2], 0,
        -front[0], -front[1], -front[2], 0,
        position[0], position[1], position[2], 1
    ];
    return mat4;
}
export { LookAt }
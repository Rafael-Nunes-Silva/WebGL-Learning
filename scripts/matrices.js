"use strict";
import { Vec2, Vec3 } from "./vectors.js"

const degToRad = Math.PI/180;
const radToDeg = 180/Math.PI;
export { degToRad, radToDeg }

class Mat2{
    mat = [
        1, 0,
        0, 1
    ];

    constructor(mat = [
        1, 0,
        0, 1
    ]){ this.mat = mat; }

    Transpose(){
        return[
            mat[0], mat[2],
            mat[1], mat[3]
        ];
    }
}
class Mat3{
    mat = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    constructor(mat = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]){ this.mat = mat; }

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

    constructor(mat = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]){ this.mat = mat; }

    Transpose(){
        return[
            mat[0], mat[1], mat[2], mat[3],
            mat[4], mat[5], mat[6], mat[7],
            mat[8], mat[9], mat[10], mat[11],
            mat[12], mat[13], mat[14], mat[15]
        ];
    }
}
export { Mat2, Mat3, Mat4 }

function AddMat2x2(m1, m2){
    return new Mat2([
        m1.mat[0] + m2.mat[0], m1.mat[1] * m2.mat[1],
        m1.mat[2] + m2.mat[2], m1.mat[3] * m2.mat[3]
    ]);
}
function AddMat3x3(m1, m2){
    return new Mat3([
        m1.mat[0] + m2.mat[0], m1.mat[1] + m2.mat[1], m1.mat[2] + m2.mat[2],
        m1.mat[3] + m2.mat[3], m1.mat[4] + m2.mat[4], m1.mat[5] + m2.mat[5],
        m1.mat[6] + m2.mat[6], m1.mat[7] + m2.mat[7], m1.mat[8] + m2.mat[8],
    ]);
}
function AddMat4x4(m1, m2){
    return new Mat4([
        m1.mat[0] + m2.mat[0], m1.mat[1] + m2.mat[1], m1.mat[2] + m2.mat[2], m1.mat[3] + m2.mat[3],
        m1.mat[4] + m2.mat[4], m1.mat[5] + m2.mat[5], m1.mat[6] + m2.mat[6], m1.mat[7] + m2.mat[7],
        m1.mat[8] + m2.mat[8], m1.mat[9] + m2.mat[9], m1.mat[10] + m2.mat[10], m1.mat[11] + m2.mat[11],
        m1.mat[12] + m2.mat[12], m1.mat[13] + m2.mat[13], m1.mat[14] + m2.mat[14], m1.mat[15] + m2.mat[15]
    ]);
}
export { AddMat2x2, AddMat3x3, AddMat4x4 }

function SubMat2x2(m1, m2){
    return new Mat2([
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1],
        m1.mat[2] - m2.mat[2], m1.mat[3] - m2.mat[3]
    ]);
}
function SubMat3x3(m1, m2){
    return new Mat2([
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1], m1.mat[2] - m2.mat[2],
        m1.mat[3] - m2.mat[3], m1.mat[4] - m2.mat[4], m1.mat[5] - m2.mat[5],
        m1.mat[6] - m2.mat[6], m1.mat[7] - m2.mat[7], m1.mat[8] - m2.mat[8],
    ]);
}
function SubMat4x4(m1, m2){
    return new Mat2([
        m1.mat[0] - m2.mat[0], m1.mat[1] - m2.mat[1], m1.mat[2] - m2.mat[2], m1.mat[3] - m2.mat[3],
        m1.mat[4] - m2.mat[4], m1.mat[5] - m2.mat[5], m1.mat[6] - m2.mat[6], m1.mat[7] - m2.mat[7],
        m1.mat[8] - m2.mat[8], m1.mat[9] - m2.mat[9], m1.mat[10] - m2.mat[10], m1.mat[11] - m2.mat[11],
        m1.mat[12] - m2.mat[12], m1.mat[13] - m2.mat[13], m1.mat[14] - m2.mat[14], m1.mat[15] - m2.mat[15]
    ]);
}
export { SubMat2x2, SubMat3x3, SubMat4x4 }

function MulMat2x2(m1, m2){
    return new Mat2([
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[2],
        m1.mat[2] * m2.mat[1], m1.mat[3] * m2.mat[3]
    ]);
}
function MulMat3x3(m1, m2){
    return new Mat3([
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[3], m1.mat[2] * m2.mat[6],
        m1.mat[3] * m2.mat[1], m1.mat[4] * m2.mat[4], m1.mat[5] * m2.mat[7],
        m1.mat[6] * m2.mat[2], m1.mat[7] * m2.mat[5], m1.mat[8] * m2.mat[8],
    ]);
}
function MulMat4x4(m1, m2){
    return new Mat4([
        m1.mat[0] * m2.mat[0], m1.mat[1] * m2.mat[4], m1.mat[2] * m2.mat[8], m1.mat[3] * m2.mat[12],
        m1.mat[4] * m2.mat[1], m1.mat[5] * m2.mat[5], m1.mat[6] * m2.mat[9], m1.mat[7] * m2.mat[13],
        m1.mat[8] * m2.mat[2], m1.mat[9] * m2.mat[6], m1.mat[10] * m2.mat[10], m1.mat[11] * m2.mat[14],
        m1.mat[12] * m2.mat[3], m1.mat[13] * m2.mat[7], m1.mat[14] * m2.mat[11], m1.mat[15] * m2.mat[15]
    ]);
}
export { MulMat2x2, MulMat3x3, MulMat4x4 }

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
    let rotMat = new Mat4([
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
    return MulMat4x4(mat4, rotMat);
}
function Rotate3D(mat4, vec3){
    let rotMatX = new Mat4([
        1, 0, 0, 0,
        0, Math.cos(vec3.x), -Math.sin(vec3.x), 0,
        0, Math.sin(vec3.x), Math.cos(vec3.x), 0,
        0, 0, 0, 1
    ]);
    let rotMatY = new Mat4([
        Math.cos(vec3.y), 0, Math.sin(vec3.y), 0,
        0, 1, 0, 0,
        -Math.sin(vec3.y), 0, Math.cos(vec3.y), 0,
        0, 0, 0, 1
    ]);
    let rotMatZ = new Mat4([
        Math.cos(vec3.x), -Math.sin(vec3.x), 0, 0,
        Math.sin(vec3.x), Math.cos(vec3.x), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    return MulMat4x4(rotMatZ, MulMat4x4(rotMatY, rotMatX));

    MulMat4x4(rotMatX, MulMat4x4(rotMatY, rotMatZ))

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

function ScaleMat3(mat, vec2){
    let scaleMat = new Mat3();
    scaleMat.mat[0] = vec2.x;
    scaleMat.mat[4] = vec2.y;

    return MulMat3x3(mat, scaleMat);
}
function ScaleMat4(mat, vec3){
    let scaleMat = new Mat4();
    scaleMat.mat[0] = vec3.x;
    scaleMat.mat[5] = vec3.y;
    scaleMat.mat[10] = vec3.z;

    mat.mat[0] = vec3.x;
    mat.mat[5] = vec3.y;
    mat.mat[10] = vec3.z;
    return mat;

    return MulMat4x4(mat, scaleMat);
}
export { ScaleMat3, ScaleMat4 }

function RotateMat3(mat, vec2){
    let xMat = new Mat3();
    xMat.mat[5] = xMat.mat[10] = Math.cos(vec2.x);
    xMat.mat[6] = -Math.sin(vec2.x);
    xMat.mat[9] = Math.sin(vec2.x);

    let yMat = new Mat3();
    yMat.mat[0] = yMat.mat[10] = Math.cos(vec2.y);
    yMat.mat[8] = -Math.sin(vec2.y);
    yMat.mat[2] = Math.sin(vec2.y);

    let rotMat = MulMat3x3(xMat, yMat);
    return MulMat3x3(mat, rotMat);
}
function RotateMat4(mat, vec3){
    vec3.x *= degToRad;
    vec3.y *= degToRad;
    vec3.z *= degToRad;

    let rotMat = new Mat4();
    rotMat.mat[0] = Math.cos(vec3.y) + Math.cos(vec3.z);
    rotMat.mat[1] = -Math.sin(vec3.z);
    rotMat.mat[2] = Math.sin(vec3.y);
    rotMat.mat[4] = Math.sin(vec3.z);
    rotMat.mat[5] = Math.cos(vec3.x) + Math.cos(vec3.z);
    rotMat.mat[6] = -Math.sin(vec3.x);
    rotMat.mat[8] = -Math.sin(vec3.y);
    rotMat.mat[9] = Math.sin(vec3.x);
    rotMat.mat[10] = Math.cos(vec3.x) + Math.cos(vec3.y);
    /*
    let xMat = new Mat4(0);
    xMat.mat[5] = Math.cos(x);
    xMat.mat[6] = -Math.sin(x);
    xMat.mat[9] = Math.sin(x);
    xMat.mat[10] = Math.cos(x);

    let yMat = new Mat4(0);
    yMat.mat[0] = Math.cos(y);
    yMat.mat[8] = -Math.sin(y);
    yMat.mat[2] = Math.sin(y);
    yMat.mat[10] = Math.cos(y);

    let zMat = new Mat4(0);
    zMat.mat[0] = Math.cos(z);
    zMat.mat[1] = -Math.sin(z);
    zMat.mat[4] = Math.sin(z);
    zMat.mat[5] = Math.cos(z);

    let rotMat = AddMat4x4(xMat, AddMat4x4(yMat, zMat));
    return MulMat4x4(mat, rotMat);
    */
   return rotMat;
}
export { RotateMat3, RotateMat4 }

function TranslateMat3(mat, vec2){
    mat.mat[6] = vec2.x;
    mat.mat[7] = vec2.y;
    return mat;
}
function TranslateMat4(mat, vec3){
    /*
    mat.mat[3] = vec3.x;
    mat.mat[7] = vec3.y;
    mat.mat[11] = vec3.z;
    */
    mat.mat[12] = vec3.x;
    mat.mat[13] = vec3.y;
    mat.mat[14] = vec3.z;
    return mat;
}
export { TranslateMat3, TranslateMat4 }

function TransformMat3(pos, rot, scale){
    let mat = ScaleMat3(new Mat3(), scale);
    mat = RotateMat3(mat, rot);
    return TranslateMat3(mat, pos);
}
function TransformMat4(pos, rot, scale){
    let mat = ScaleMat3(new Mat4(), scale);
    mat = RotateMat3(mat, rot);
    return TranslateMat3(mat, pos);
}
export { TransformMat3, TransformMat4 }

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
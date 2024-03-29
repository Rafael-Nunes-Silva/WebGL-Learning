"use strict";

class Vec2{ 
    vec = [0, 0];

    constructor(x = 0, y = 0){
        this.vec[0] = x;
        this.vec[1] = y;
    }

    Normalized(){
        let m = Math.max(x, y);
        return new Vec2(x/m, y/m, z/m);
    }
}
class Vec3{
    vec = [0, 0, 0];

    constructor(x = 0, y = 0, z = 0){
        this.vec[0] = x;
        this.vec[1] = y;
        this.vec[2] = z;
    }

    Normalized(){
        let m = Math.max(Math.max(x, y), z);
        return new Vec3(x/m, y/m, z/m);
    }
}
class Vec4{
    vec = [0, 0, 0, 0];

    constructor(x = 0, y = 0, z = 0, w = 0){
        this.vec[0] = x;
        this.vec[1] = y;
        this.vec[2] = z;
        this.vec[3] = w;
    }

    Normalized(){
        let m = Math.max(Math.max(x, y), Math.max(z, w));
        return new Vec4(x/m, y/m, z/m, w/m);
    }
}
export {Vec2, Vec3, Vec4}

function AddVec2(v1, v2){
    return new Vec2(v1.vec[0] + v2.vec[0], v1.vec[1] + v2.vec[1]);
}
function AddVec3(v1, v2){
    return new Vec3(v1.vec[0] + v2.vec[0], v1.vec[1] + v2.vec[1], v1.vec[2] + v2.vec[2]);
}
function AddVec4(v1, v2){
    return new Vec4(v1.vec[0] + v2.vec[0], v1.vec[1] + v2.vec[1], v1.vec[2] + v2.vec[2], v1.vec[3] + v2.vec[3]);
}
export {AddVec2, AddVec3, AddVec4}

function SubVec2(v1, v2){
    return new Vec2(v1.vec[0] - v2.vec[0], v1.vec[1] - v2.vec[1]);
}
function SubVec3(v1, v2){
    return new Vec3(v1.vec[0] - v2.vec[0], v1.vec[1] - v2.vec[1], v1.vec[2] - v2.vec[2]);
}
function SubVec4(v1, v2){
    return new Vec4(v1.vec[0] - v2.vec[0], v1.vec[1] - v2.vec[1], v1.vec[2] - v2.vec[2], v1.vec[3] - v2.vec[3]);
}
export {SubVec2, SubVec3, SubVec4}

function MultVec2(v1, v2){
    return new Vec2(v1.vec[0] * v2.vec[0], v1.vec[1] * v2.vec[1]);
}
function MultVec3(v1, v2){
    return new Vec3(v1.vec[0] * v2.vec[0], v1.vec[1] * v2.vec[1], v1.vec[2] * v2.vec[2]);
}
function MultVec4(v1, v2){
    return new Vec4(v1.vec[0] * v2.vec[0], v1.vec[1] * v2.vec[1], v1.vec[2] * v2.vec[2], v1.vec[3] * v2.vec[3]);
}
export {MultVec2, MultVec3, MultVec4}

function DivVec2(v1, v2){
    return new Vec2(v1.vec[0] / v2.vec[0], v1.vec[1] / v2.vec[1]);
}
function DivVec3(v1, v2){
    return new Vec3(v1.vec[0] / v2.vec[0], v1.vec[1] / v2.vec[1], v1.vec[2] / v2.vec[2]);
}
function DivVec4(v1, v2){
    return new Vec4(v1.vec[0] / v2.vec[0], v1.vec[1] / v2.vec[1], v1.vec[2] / v2.vec[2], v1.vec[3] / v2.vec[3]);
}
export {DivVec2, DivVec3, DivVec4}

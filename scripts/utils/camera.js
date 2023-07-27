"use strict";

import { LookAt } from "./matrices.js"
import { Vec3 } from "./vectors.js"

class Camera{
    position = new Vec3(0, 0, 0);
    yaw = 0;
    pitch = 0;

    constructor(position, rotation){
        this.position = position;
        this.rotation = rotation;
    }

    ViewMat(){
        return LookAt(
            new Vec3(1, 0, 0),
            new Vec3(0, 1, 0),
            new Vec3(Math.cos(yaw) * Math.cos(pitch), Math.sin(pitch), Math.sin(yaw) * Math.cos(pitch)).Normalized(),
            position
        );
    }
};
export { Camera }

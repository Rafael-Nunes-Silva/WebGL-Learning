"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec3 } from "../utils/vectors.js"

class ParticleType{
    constructor(
        name,
        properties = {
            "color": color,
            "density": density,
            "meltingPoint": meltingPoint,
            "boilingPoint": boilingPoint
        }
    ){
        this.name = name;
        this.properties = properties;
    }
}
export { ParticleType }

class Particle extends Renderable{
    velocity = new Vec3(0, 0, 0);
    constructor(context, shader, position, color){
        super(
            context,
            shader,
            [
                -0.5, -0.5, 0.0,
                -0.5, 0.5, 0.0,
                0.5, 0.5, 0.0,
                0.5, -0.5, 0.0,
            ],
            [
                ...color.vec,
                ...color.vec,
                ...color.vec,
                ...color.vec
            ]
        );
        this.position = position;
    }

    InvertVelX(){
        this.velocity.vel[0] *= -1;
    }
    InvertVelY(){
        this.velocity.vel[1] *= -1;
    }
}
export { Particle }

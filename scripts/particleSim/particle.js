"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec3 } from "../utils/vectors.js"

class Particle extends Renderable{
    constructor(
        context,
        shader,
        position,
        properties = {
            "color": new Vec3(),
            "behaviour": new Vec3(),
            "stability": 0,
            "density": 0
        }
    ){
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
                ...properties.color.vec,
                ...properties.color.vec,
                ...properties.color.vec,
                ...properties.color.vec
            ]
        );
        this.position = position;

        this.properties = properties;
    }
}
export { Particle }

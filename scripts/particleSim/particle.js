"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec2 } from "../utils/vectors.js"

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
    position = Vec2(0, 0);

    constructor(position, type){
        this.position = position;
    }

    
}
export { Particle }

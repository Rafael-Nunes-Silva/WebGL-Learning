"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec3 } from "../utils/vectors.js"

/* Gases */
const VAPOUR = {
    "color": new Vec3(0, 0, 0.5),
    "behaviour": new Vec3(0, 1, 0),
    "stability": -1,
    "density": -1
};
const GAS = {
    "color": new Vec3(0.7, 0.7, 0.15),
    "behaviour": new Vec3(0, 1, 0),
    "stability": -1,
    "density": -1
};
const SMOKE = {
    "color": new Vec3(0.15, 0.15, 0.15),
    "behaviour": new Vec3(0, 1, 0),
    "stability": -1,
    "density": -1
};

/* Liquids */
const WATER = {
    "color": new Vec3(0, 0, 1),
    "behaviour": new Vec3(0, -1, 0),
    "stability": -1,
    "density": 0
};
const LAVA = {
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, -1, 0),
    "stability": -1,
    "density": 0
};
const OIL = {
    "color": new Vec3(0.1, 0.1, 0.1),
    "behaviour": new Vec3(0, -1, 0),
    "stability": -1,
    "density": 0
};

/* Solids */
const ROCK = {
    "color": new Vec3(0.25, 0.25, 0.25),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 1
};
const SAND = {
    "color": new Vec3(1, 1, 0),
    "behaviour": new Vec3(0, -1, 0),
    "stability": 0,
    "density": 1
};
const SOIL = {
    "color": new Vec3(0.45, 0.2, 0),
    "behaviour": new Vec3(0, -1, 0),
    "stability": 0,
    "density": 1
};
export {
    VAPOUR,
    GAS,
    SMOKE,

    WATER,
    LAVA,
    OIL,

    ROCK,
    SAND,
    SOIL
}

class Particle extends Renderable{
    constructor(
        context,
        shader,
        position,
        properties = {
            "color": new Vec3(),
            "behaviour": new Vec3(),
            "stability": 0,
            "density": 0,
            "uponBurn": null,
            "uponFreeze": null
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

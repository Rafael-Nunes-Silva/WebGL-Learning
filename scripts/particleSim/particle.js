"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec3 } from "../utils/vectors.js"

const PLASMA = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};

const FIRE = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};

/* Gases */
const VAPOUR = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const GAS = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const SMOKE = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};

/* Liquids */
const WATER = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const LAVA = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const OIL = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const BURNINGOIL = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};

/* Solids */
const ROCK = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const WOOD = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const BURNINGWOOD = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const STONE = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const SAND = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const SOIL = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};
const ICE = {
    "life": 0,
    "color": new Vec3(),
    "behaviour": new Vec3(),
    "stability": 0,
    "density": 0,
    "startTemp": 0,
    "tempUp": 1000,
    "tempDown": -1000,
    "uponTempUp": null,
    "uponTempDown": null,
    "heatUponUP": 0,
    "product": null
};

export {
    PLASMA,
    FIRE,

    VAPOUR,
    GAS,
    SMOKE,

    WATER,
    LAVA,
    OIL,

    ROCK,
    WOOD,
    STONE,
    SAND,
    SOIL,
    ICE
}

/* PLASMA */
PLASMA.life = 5;
PLASMA.color = new Vec3(1, 0, 0);
PLASMA.behaviour = new Vec3(0, 0, -1);
PLASMA.stability = -1;
PLASMA.density = -100;
PLASMA.startTemp = 100000;
PLASMA.tempUp = 1000000;
PLASMA.tempDown = 11000;
PLASMA.uponTempDown = FIRE;

/* FIRE */
FIRE.life = 10;
FIRE.color = new Vec3(1, 0.1, 0);
FIRE.behaviour = new Vec3(0, 1, 0);
FIRE.stability = -1;
FIRE.density = -10;
FIRE.startTemp = 1000;
FIRE.tempUp = 11000;
FIRE.tempDown = 200;
FIRE.uponTempUp = PLASMA;
FIRE.heatUponUP = 1000;

/* VAPOUR */
VAPOUR.life = -1;
VAPOUR.color = new Vec3(0, 0, 0.4);
VAPOUR.behaviour = new Vec3(0, 1, 0);
VAPOUR.stability = -1;
VAPOUR.density = 1;
VAPOUR.startTemp = 100;
VAPOUR.tempUp = 1000;
VAPOUR.tempDown = 100;
VAPOUR.uponTempDown = WATER;

/* GAS */
GAS.life = -1;
GAS.color = new Vec3(0.7, 0.7, 0.15);
GAS.behaviour = new Vec3(0, 1, 0);
GAS.stability = -1;
GAS.density = -3;
GAS.startTemp = 30;
GAS.tempUp = 300;
GAS.uponTempUp = FIRE;
GAS.product = SMOKE;
GAS.heatUponUP = 100;

/* SMOKE */
SMOKE.life = -1;
SMOKE.color = new Vec3(0.15, 0.15, 0.15);
SMOKE.behaviour = new Vec3(0, 1, 0);
SMOKE.stability = -1;
SMOKE.density = -2;
SMOKE.startTemp = 30;

/* WATER */
WATER.life = -1;
WATER.color = new Vec3(0, 0, 1);
WATER.behaviour = new Vec3(0, -1, 0);
WATER.stability = -1;
WATER.density = 0;
WATER.startTemp = 30;
WATER.tempUp = 100;
WATER.tempDown = 0;
WATER.uponTempUp = VAPOUR;
WATER.uponTempDown = ICE;

/* LAVA */
LAVA.life = -1;
LAVA.color = new Vec3(1, 0.5, 0);
LAVA.behaviour = new Vec3(0, -1, 0);
LAVA.stability = -1;
LAVA.density = 5;
LAVA.startTemp = 1000;
LAVA.tempUp = 1200;
LAVA.tempDown = 600;
LAVA.uponTempDown = STONE;

/* OIL */
OIL.life = -1;
OIL.color = new Vec3(0.1, 0.1, 0.1);
OIL.behaviour = new Vec3(0, -1, 0);
OIL.stability = -1;
OIL.density = -1;
OIL.startTemp = 30;
OIL.tempUp = 200;
OIL.tempDown = -50;
OIL.uponTempUp = BURNINGOIL;
OIL.heatUponUP = 800;

/* BURNING OIL */
BURNINGOIL.life = 50;
BURNINGOIL.color = new Vec3(1, 0.1, 0.1);
BURNINGOIL.behaviour = new Vec3(0, -1, 0);
BURNINGOIL.stability = -1;
BURNINGOIL.density = -1;
BURNINGOIL.tempUp = 400;
BURNINGOIL.uponTempUp = FIRE;
// BURNINGOIL.heatUponUP = 800;

/* ROCK */
ROCK.life = -1;
ROCK.color = new Vec3(0.25, 0.25, 0.25);
ROCK.behaviour = new Vec3(0, 0, 0);
ROCK.stability = 0;
ROCK.density = 5;
ROCK.startTemp = 30;

/* WOOD */
WOOD.life = -1;
WOOD.color = new Vec3(0.5, 0.25, 0);
WOOD.behaviour = new Vec3(0, 0, 0);
WOOD.stability = 0;
WOOD.density = 5;
WOOD.startTemp = 30;
WOOD.tempUp = 200;
WOOD.uponTempUp = BURNINGWOOD;
WOOD.heatUponUP = 400;

/* BURNING WOOD */
BURNINGWOOD.life = 200;
BURNINGWOOD.color = new Vec3(1, 0.25, 0);
BURNINGWOOD.behaviour = new Vec3(0, 0, 0);
BURNINGWOOD.stability = 0;
BURNINGWOOD.density = 5;
BURNINGWOOD.tempUp = 800;
BURNINGWOOD.uponTempUp = FIRE;
// BURNINGWOOD.heatUponUP = 200;

/* STONE */
STONE.life = -1;
STONE.color = new Vec3(0.3, 0.3, 0.3);
STONE.behaviour = new Vec3(0, -1, 0);
STONE.stability = 0;
STONE.density = 5;
STONE.startTemp = 30;
STONE.tempUp = 600;
STONE.uponTempUp = LAVA;

/* SAND */
SAND.life = -1;
SAND.color = new Vec3(1, 1, 0);
SAND.behaviour = new Vec3(0, -1, 0);
SAND.stability = 0;
SAND.density = 5;
SAND.startTemp = 30;
SAND.tempUp = 1700;

/* SOIL */
SOIL.life = -1;
SOIL.color = new Vec3(0.45, 0.2, 0);
SOIL.behaviour = new Vec3(0, -1, 0);
SOIL.stability = 0;
SOIL.density = 5;
SOIL.startTemp = 30;
SOIL.tempUp = 60;
SOIL.uponTempUp = SAND;

/* ICE */
ICE.life = -1;
ICE.color = new Vec3(0.8, 0.8, 1);
ICE.behaviour = new Vec3(0, -1, 0);
ICE.stability = 0;
ICE.density = 1;
ICE.startTemp = -50;
ICE.tempUp = 0;
ICE.uponTempUp = WATER;

class Particle extends Renderable{
    constructor(
        context,
        shader,
        position,
        properties = {
            "life": -1,
            "color": new Vec3(),
            "behaviour": new Vec3(),
            "stability": 0,
            "density": 0,
            "tempUp": 0,
            "tempDown": 0,
            "uponTempUp": null,
            "uponTempDown": null
        }
    ){
        super(
            context,
            shader,
            [
                0.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 0.0, 0.0,
            ],
            [
                ...properties.color.vec,
                ...properties.color.vec,
                ...properties.color.vec,
                ...properties.color.vec
            ]
        );
        this.position = position;

        this.SetProperties(properties);
        let tempChange = Math.round(Math.random() * 4 - 2);
        this.tempUp += tempChange;
        this.tempDown += tempChange;
        this.temperature = properties.startTemp;
    }

    SetProperties(properties){
        this.life = properties.life;
        this.color = properties.color;
        this.behaviour = properties.behaviour;
        this.stability = properties.stability;
        this.density = properties.density;
        // this.temperature = properties.startTemp;
        this.tempUp = properties.tempUp;
        this.tempDown = properties.tempDown;
        this.uponTempUp = properties.uponTempUp;
        this.uponTempDown = properties.uponTempDown;
        this.heatUponUP = properties.heatUponUP;
        this.product = properties.product;
    }

    Update(){
        if(this.life > 0)
            this.life--;
        else if(this.life == 0)
            return false;

        if(this.uponTempUp && this.temperature > this.tempUp){
            this.temperature += this.heatUponUP
            this.SetProperties(this.uponTempUp);
            this.UpdateBuffers(
                [
                    0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0,
                    1.0, 1.0, 0.0,
                    1.0, 0.0, 0.0,
                ],
                [
                    ...this.color.vec,
                    ...this.color.vec,
                    ...this.color.vec,
                    ...this.color.vec
                ]
            );
        }
        else if(this.uponTempDown && this.temperature <= this.tempDown){
            this.SetProperties(this.uponTempDown);
            this.UpdateBuffers(
                [
                    0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0,
                    1.0, 1.0, 0.0,
                    1.0, 0.0, 0.0,
                ],
                [
                    ...this.color.vec,
                    ...this.color.vec,
                    ...this.color.vec,
                    ...this.color.vec
                ]
            );

        }

        return true;
    }
}
export { Particle }

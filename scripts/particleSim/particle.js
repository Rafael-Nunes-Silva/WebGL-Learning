"use strict";

import { Renderable } from "../utils/renderable.js";
import { Vec3 } from "../utils/vectors.js"

const StartTemp = 26;

const PLASMA = {
    "life": 1,
    "color": new Vec3(1, 0.05, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};

const FIRE = {
    "life": 3,
    "color": new Vec3(1, 0.05, 0),
    "behaviour": new Vec3(0, 1, 0),
    "stability": -1,
    "density": -10,
    "tempUp": 11000,
    "tempDown": 0,
    "uponTempUp": PLASMA,
    "uponTempDown": null
};

/* Gases */
const VAPOUR = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const GAS = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const SMOKE = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};

/* Liquids */
const WATER = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const LAVA = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const OIL = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};

/* Solids */
const ROCK = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const STONE = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const SAND = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const SOIL = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
};
const ICE = {
    "life": 1,
    "color": new Vec3(1, 0.25, 0),
    "behaviour": new Vec3(0, 0, 0),
    "stability": 0,
    "density": 0,
    "tempUp": 0,
    "tempDown": 0,
    "uponTempUp": null,
    "uponTempDown": null
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
    STONE,
    SAND,
    SOIL,
    ICE
}


/* VAPOUR */
VAPOUR.life = -1;
VAPOUR.color = new Vec3(0, 0, 0.4);
VAPOUR.behaviour = new Vec3(0, 1, 0);
VAPOUR.stability = -1;
VAPOUR.density = 1;
VAPOUR.tempUp = 1000;
VAPOUR.tempDown = 100;
VAPOUR.uponTempUp = null;
VAPOUR.uponTempDown = WATER;

/* GAS */
GAS.life = -1;
GAS.color = new Vec3(0.7, 0.7, 0.15);
GAS.behaviour = new Vec3(0, 1, 0);
GAS.stability = -1;
GAS.density = -3;
GAS.tempUp = 500;
GAS.tempDown = 200;
GAS.uponTempUp = PLASMA;
GAS.uponTempDown = OIL;

/* SMOKE */
SMOKE.life = -1;
SMOKE.color = new Vec3(0.15, 0.15, 0.15);
SMOKE.behaviour = new Vec3(0, 1, 0);
SMOKE.stability = -1;
SMOKE.density = -2;
SMOKE.tempUp = 0;
SMOKE.tempDown = 0;
SMOKE.uponTempUp = null;
SMOKE.uponTempDown = null;

/* WATER */
WATER.life = -1;
WATER.color = new Vec3(0, 0, 1);
WATER.behaviour = new Vec3(0, -1, 0);
WATER.stability = -1;
WATER.density = 0;
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
LAVA.tempUp = 1200;
LAVA.tempDown = 600;
LAVA.uponTempUp = null;
LAVA.uponTempDown = STONE;

/* OIL */
OIL.life = -1;
OIL.color = new Vec3(0.1, 0.1, 0.1);
OIL.behaviour = new Vec3(0, -1, 0);
OIL.stability = -1;
OIL.density = -1;
OIL.tempUp = 200;
OIL.tempDown = -50;
OIL.uponTempUp = GAS;
OIL.uponTempDown = null;

/* ROCK */
ROCK.life = -1;
ROCK.color = new Vec3(0.25, 0.25, 0.25);
ROCK.behaviour = new Vec3(0, 0, 0);
ROCK.stability = 0;
ROCK.density = 5;
ROCK.tempUp = 0;
ROCK.tempDown = 0;
ROCK.uponTempUp = null;
ROCK.uponTempDown = null;

/* STONE */
STONE.life = -1;
STONE.color = new Vec3(0.3, 0.3, 0.3);
STONE.behaviour = new Vec3(0, -1, 0);
STONE.stability = 0;
STONE.density = 5;
STONE.tempUp = 600;
STONE.tempDown = 0;
STONE.uponTempUp = LAVA;
STONE.uponTempDown = null;

/* SAND */
SAND.life = -1;
SAND.color = new Vec3(1, 1, 0);
SAND.behaviour = new Vec3(0, -1, 0);
SAND.stability = 0;
SAND.density = 5;
SAND.tempUp = 1700;
SAND.tempDown = 0;
SAND.uponTempUp = null;
SAND.uponTempDown = null;

/* SOIL */
SOIL.life = -1;
SOIL.color = new Vec3(0.45, 0.2, 0);
SOIL.behaviour = new Vec3(0, -1, 0);
SOIL.stability = 0;
SOIL.density = 5;
SOIL.tempUp = 60;
SOIL.tempDown = 0;
SOIL.uponTempUp = SAND;
SOIL.uponTempDown = null;

/* ICE */
ICE.life = -1;
ICE.color = new Vec3(0.8, 0.8, 1);
ICE.behaviour = new Vec3(0, -1, 0);
ICE.stability = 0;
ICE.density = 1;
ICE.tempUp = 0;
ICE.tempDown = 0;
ICE.uponTempUp = WATER;
ICE.uponTempDown = null;

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
        console.log(properties);
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
        console.log(this.tempUp);
        console.log(this.tempDown);
        this.temperature = StartTemp;
    }

    SetProperties(properties){
        this.life = properties.life;
        this.color = properties.color;
        this.behaviour = properties.behaviour;
        this.stability = properties.stability;
        this.density = properties.density;
        this.tempUp = properties.tempUp;
        this.tempDown = properties.tempDown;
        this.uponTempUp = properties.uponTempUp;
        this.uponTempDown = properties.uponTempDown;
    }

    Update(targetTemperature){
        if(this.temperature > targetTemperature)
            this.temperature--;
        else if(this.temperature < targetTemperature)
            this.temperature++;

        if(this.uponTempUp && this.temperature > this.tempUp){
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
    }
}
export { Particle }

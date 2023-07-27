"use strict";

import { Mat4 } from "./matrices.js";

class Renderable{
    context = null;
    shader = null;
    VAO = null;
    indicesCount = 0;

    constructor(context, shader, vertices, colors){
        this.context = context;
        this.shader = shader;

        this.VAO = this.context.createVertexArray();
        this.context.bindVertexArray(this.VAO);
        
        const verticeBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, verticeBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
        this.context.vertexAttribPointer(
            this.shader.programInfo.attributes.vertPos,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(this.shader.programInfo.attributes.vertPos);

        const colorBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(colors), this.context.STATIC_DRAW);
        this.context.vertexAttribPointer(
            this.shader.programInfo.attributes.vertColor,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(this.shader.programInfo.attributes.vertColor);

        let indices = [];
        for(let i = 0; i < vertices.length; i+=4){
            indices.push(i);
            indices.push(i + 1);
            indices.push(i + 2);
            indices.push(i + 2);
            indices.push(i + 3);
            indices.push(i);
        }
        this.indicesCount = indices.length;

        const indexBuffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.context.bufferData(
            this.context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices),
            this.context.STATIC_DRAW
        );
    }

    Draw(){
        this.context.bindVertexArray(this.VAO);

        this.shader.SetTransformMatrix(new Mat4());

        this.context.drawElements(this.context.TRIANGLES, this.indicesCount, this.context.UNSIGNED_SHORT, null);
    }
}
export { Renderable }

"use strict";

class Shader{
    context = null;
    programInfo = null;

    constructor(context, vertShaderSource, fragShaderSource){
        this.context = context;

        const shaderProgram = this.InitShaderProgram(vertShaderSource, fragShaderSource);
        this.programInfo = {
            program: shaderProgram,
            attributes: {
                vertPos: this.context.getAttribLocation(shaderProgram, "vertPos"),
                vertColor: this.context.getAttribLocation(shaderProgram, "vertColor")
            },
            uniforms: {
                projMat: this.context.getUniformLocation(shaderProgram, "projMat"),
                viewMat: this.context.getUniformLocation(shaderProgram, "viewMat"),
                transMat: this.context.getUniformLocation(shaderProgram, "transMat")
            }
        };
    }

    Use(){
        this.context.useProgram(this.programInfo.program);
    }

    LoadShader(type, source){
        const shader = this.context.createShader(type);
      
        this.context.shaderSource(shader, source);  
        this.context.compileShader(shader);
      
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)){
            alert("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(shader));
            this.context.deleteShader(shader);
            return null;
        }
      
        return shader;
    }

    InitShaderProgram(vertSource, fragSource){
        const vertShader = this.LoadShader(this.context.VERTEX_SHADER, vertSource);
        const fragShader = this.LoadShader(this.context.FRAGMENT_SHADER, fragSource);
    
        const shaderProgram = this.context.createProgram();
        this.context.attachShader(shaderProgram, vertShader);
        this.context.attachShader(shaderProgram, fragShader);
        this.context.linkProgram(shaderProgram);
    
        if (!this.context.getProgramParameter(shaderProgram, this.context.LINK_STATUS)){
            alert("Unable to initialize the shader program: " + this.context.getProgramInfoLog(shaderProgram));
            return null;
        }
    
        return shaderProgram;
    }

    SetProjectionMatrix(projMat){
        this.context.uniformMatrix4fv(
            this.programInfo.uniforms.projMat,
            this.context.FALSE,
            projMat.mat
        );
    }
    SetViewMatrix(viewMat){
        this.context.uniformMatrix4fv(
            this.programInfo.uniforms.viewMat,
            this.context.FALSE,
            viewMat.mat
        );
    }
    SetTransformMatrix(transMat){
        this.context.uniformMatrix4fv(
            this.programInfo.uniforms.transMat,
            this.context.FALSE,
            transMat.mat
        );
    }
}
export { Shader }
"use strict";

function InitShaderProgram(context, vertSource, fragSource){
    const vertShader = LoadShader(context, context.VERTEX_SHADER, vertSource);
    const fragShader = LoadShader(context, context.FRAGMENT_SHADER, fragSource);

    const shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertShader);
    context.attachShader(shaderProgram, fragShader);
    context.linkProgram(shaderProgram);

    if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)){
        alert("Unable to initialize the shader program: "+context.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

function LoadShader(context, type, source){
    const shader = context.createShader(type);
  
    context.shaderSource(shader, source);  
    context.compileShader(shader);
  
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)){
        alert("An error occurred compiling the shaders: "+context.getShaderInfoLog(shader));
        context.deleteShader(shader);
        return null;
    }
  
    return shader;
}

export { InitShaderProgram, LoadShader };

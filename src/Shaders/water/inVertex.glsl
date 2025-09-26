uniform float uTime;

float waveElevation(vec3 position) {
    float A = 0.08;
    float f = 2.0;
    float omega = 2.0 * PI * f;
    float lambda = 0.8;
    float k = 2.0 * PI / lambda;
    float Ydisplacement = A * sin(k * position.z - omega * uTime);

    return Ydisplacement;
}

vec3 recalcNormals(vec3 position) {
    float shift = 0.01;
    vec3 modelPositionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 modelPositionB = position.xyz + vec3(0.0, 0.0, - shift);

    // Elevation
    float elevation = waveElevation(position.xyz);
    float elevationA = waveElevation(modelPositionA);
    float elevationB = waveElevation(modelPositionB);
    
    position.y += elevation;
    modelPositionA.y += elevationA;
    modelPositionB.y += elevationB;

    // Compute normal
    vec3 toA = normalize(modelPositionA - position.xyz);
    vec3 toB = normalize(modelPositionB - position.xyz);
    return cross(toA, toB);
}

void main()
{
    csm_Position.y += waveElevation(csm_Position);
    csm_Normal = recalcNormals(csm_Position);
}
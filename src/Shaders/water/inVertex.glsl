uniform float uTime;

varying float displacement;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    #define PI 3.14159265358979323846

    float A = 0.08;
    float f = 2.0;
    float omega = 2.0 * PI * f;
    float lambda = 0.8;
    float k = 2.0 * PI / lambda;
    float Ydisplacement = A * sin(k * modelPosition.z - omega * uTime);

    modelPosition.y += Ydisplacement;

    // varying
    displacement = Ydisplacement;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}
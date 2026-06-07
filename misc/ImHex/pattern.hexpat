// default scheme: 0: stock, 1: street 1, 2: sport 2, 3: race

struct Axle {
    float tyrePressure;
    float camber;
    float toe;
    float caster;
    float springs;
    float antiRollBar;
    float rideHeight;
    float bumpStiffness;
    float reboundStiffness;
    float differentialAcceleration;
    float differentialDeceleration;
};

struct Tuning {
    float aeroFront;
    float aeroRear;
    float finalDrive;
    float brakePressure;
    float brakeBalance;
    $ += 0x4;
    float differentialBalance;
    $ += 0x14;
    Axle front;
    Axle rear;
    $ += 0x8;
    float gears[10];
};

// default scheme (4: rally, 5: drift for springs)
struct Platform {
    s32 brakes;
    s32 springAndDampers; 
    s32 frontAntiRollBars;
    s32 rearAntiRollBars;
    s32 weightReduction @ 0xAE;
    s32 chassisReinforcement @ 0xB2;
};

struct Conversions {
    s32 engineSwap;
    s32 drivetrainSwap;
    s32 bodyKit; // 0: stock, 100: rocket bunny
};

// Ambigous; can split into stock and non-stock (if tuning values have been altered, definitely race)
struct Appearance {
    s32 rearWing @ 0x32;
    s32 frontBumper;
    s32 rearBumper;
    s32 hood;
    s32 skirts;
};

struct Drivetrain {
    s32 clutch; // default
    s32 transmission; // default (then 4-7 remaining race options, count from tuning, 8: drift)
    s32 driveline; // default
    s32 differential; // FWD: default, 5: rally, 7: offroad, RWD: default, 4: rally, 5: drift, 6: offroad, AWD: default, 5: drift, 6: offroad
};

struct TyresAndRims {
    s32 frontTyreWidth; // the index of the width to chose
    s32 rearTyreWidth; // dito
    s32 frontRimStyle @ 0xBA;
    s32 rearRimStyle @ 0xD2;
};

// default scheme (if not stated otherwise)
struct Engine {
    s32 camshaft;
    s32 valves;
    s32 displacment;
    s32 pistons;
    s32 fuelSystem; // also Carburetor
    s32 ignition;
    s32 exhaust;
    s32 intake;
    s32 flywheel;
    s32 intakeManifold; // if not -1, means naturally aspirated
    s32 restrictorPlate; // 1: no restrictor plate, 2: remove restrictors
    s32 oilCooling;
    s32 singleTurbo; // default, 4: race anti-lag (Conflict: Some newer cars, when only having race antilag, then this is 1. Mabye use presence of restricor plates as signal?)
    s32 twinTurbo; // dito
    $ += 0x4;
    s32 centrifugalSupercharger;
    s32 superCharger;
    s32 intercooler;
};

struct MotorAndBattery {
    s32 motorAndBatteryParts;
};

s32 ordinal @ 0x02;
Conversions conversions @ 0x0E;
Platform platform @ 0x1E;
Tuning tuning @ 0x19E;
Engine engine @ 0x3E;
Drivetrain drivetrain @ 0x86;
Appearance appearance @ 0x96;
MotorAndBattery motorAndBattery @ 0xB6;
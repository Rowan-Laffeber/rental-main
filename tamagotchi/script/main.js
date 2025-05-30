// Health level start
const HealthLevelWidth = 130;
const HealthLevelHeight = 130;
const HealthLevelBorderWidth = 0;
const HealthLevelSpacingWidth = 0;

function HealthLevelPositionToImage(HealthLevelRow, HealthLevelCol) {
    return {
        x: (
            HealthLevelBorderWidth +
            HealthLevelCol * (HealthLevelSpacingWidth + HealthLevelWidth)
        ),
        y: (
            HealthLevelBorderWidth +
            HealthLevelRow * (HealthLevelSpacingWidth + HealthLevelHeight)
        )
    }
}

let HealthLevelCanvas = document.getElementById('HealthLevel');
let HealthLevelContext = HealthLevelCanvas.getContext('2d');

let HealthLevelImage = new Image();
HealthLevelImage.src = "assets/img/levels/levels.png";
HealthLevelImage.crossOrigin = "true";
HealthLevelCanvas.width = HealthLevelWidth;
HealthLevelCanvas.height = HealthLevelHeight;

let HealthLevelRow = 0;
let HealthLevelCol = 0;

function AnimateHealthLevel() {
    if (HealthLevelCol === 3) {
        HealthLevelCol = 0;
        HealthLevelRow += 1;
    }
    if (HealthLevelRow === 2) {
        if (HealthLevelCol === 2) {
            HealthLevelRow = 0;
            HealthLevelCol = 0;
        }
    }


    let position = HealthLevelPositionToImage(HealthLevelRow, HealthLevelCol);
    HealthLevelContext.clearRect(
        0,
        0,
        HealthLevelCanvas.width,
        HealthLevelCanvas.height
    );
    HealthLevelContext.drawImage(
        HealthLevelImage,
        position.x,
        position.y,
        HealthLevelWidth,
        HealthLevelHeight,
        0,
        0,
        HealthLevelWidth,
        HealthLevelHeight
    );
    HealthLevelCol += 1;
}

HealthLevelImage.onload = function () {
    AnimateHealthLevel();
};

// Health level end

// Health core start
const HealthCoreStagePositions = [
    { HealthCoreRow: 0, HealthCoreCol: 0 }, // Stage 0
    { HealthCoreRow: 0, HealthCoreCol: 1 }, // Stage 1
    { HealthCoreRow: 0, HealthCoreCol: 2 }, // Stage 2
    { HealthCoreRow: 1, HealthCoreCol: 0 }, // Stage 3
    { HealthCoreRow: 1, HealthCoreCol: 1 }, // Stage 4
    { HealthCoreRow: 1, HealthCoreCol: 2 }, // Stage 5
    { HealthCoreRow: 2, HealthCoreCol: 0 }, // Stage 6
];
function HealthCoreGetStageRowCol(HealthCoreStageIndex) {
    if (HealthCoreStageIndex >= 0 && HealthCoreStageIndex <= 6) {
        const { HealthCoreRow, HealthCoreCol } = HealthCoreStagePositions[HealthCoreStageIndex];
        return { HealthCoreRow, HealthCoreCol };
    } else {
        return { HealthCoreRow: 0, HealthCoreCol: 0 };
    }
}
const HealthCoreWidth = 70;
const HealthCoreHeight = 70;
const HealthCoreBorderWidth = 0;
const HealthCoreSpacingWidth = 0;

function HealthCorePositionToImage(HealthCoreRow, HealthCoreCol) {
    return {
        x: (
            HealthCoreBorderWidth +
            HealthCoreCol * (HealthCoreSpacingWidth + HealthCoreWidth)
        ),
        y: (
            HealthCoreBorderWidth +
            HealthCoreRow * (HealthCoreSpacingWidth + HealthCoreHeight)
        )
    }
}

let HealthCoreCanvas = document.getElementById('HealthCore');
let HealthCoreContext = HealthCoreCanvas.getContext('2d');

let HealthCoreImage = new Image();
HealthCoreImage.src = "assets/img/stats-middle-icon/Heart-core.png";
HealthCoreImage.crossOrigin = "true";
HealthCoreCanvas.width = HealthCoreWidth;
HealthCoreCanvas.height = HealthCoreHeight;

let HealthCorePercent = 100;
let HealthCoreStageIndex = 5;

function AnimateHealthCore() {
    if (HealthCorePercent < 1) {
        HealthCoreStageIndex = 0;
    } else if (HealthCorePercent <= 16) {
        HealthCoreStageIndex = 1;
    } else if (HealthCorePercent <= 33) {
        HealthCoreStageIndex = 2;
    } else if (HealthCorePercent <= 50) {
        HealthCoreStageIndex = 3;
    } else if (HealthCorePercent <= 66) {
        HealthCoreStageIndex = 4;
    } else if (HealthCorePercent <= 83) {
        HealthCoreStageIndex = 5;
    } else if (HealthCorePercent <= 100) {
        HealthCoreStageIndex = 6;
    }
    if (HealthCorePercent > 100) {
        HealthCorePercent = 100;
    } else if (HealthCorePercent < 0) {
        HealthCorePercent = 0;
    }
    const { HealthCoreRow, HealthCoreCol } = HealthCoreGetStageRowCol(HealthCoreStageIndex);
    const position = HealthCorePositionToImage(HealthCoreRow, HealthCoreCol);
    HealthCoreContext.clearRect(
        0,
        0,
        HealthCoreCanvas.width,
        HealthCoreCanvas.height
    );
    HealthCoreContext.drawImage(
        HealthCoreImage,
        position.x,
        position.y,
        HealthCoreWidth,
        HealthCoreHeight,
        0,
        0,
        HealthCoreWidth,
        HealthCoreHeight
    );
}

HealthCoreImage.onload = function () {
    // animateHealthCore();
    setInterval(AnimateHealthCore, 500);
};
let EatCounter = 0;
let HealthLevel = 1;
function Eat() {
    HealthCorePercent += 10;
    EatCounter = EatCounter + 1;
    console.log(EatCounter);
    if (EatCounter >= 5) {
        HealthLevel = HealthLevel + 1;
        EatCounter = 0;
        if (HealthLevel > 8) {
            HealthLevel = 8;
        } else {
            AnimateHealthLevel();
            console.log('next Health level');
        }
        console.log('Health level = ' + HealthLevel);
    }
    AnimateHealthCore();
}
// Health core end

// start of Health regen
const HealthStagePositions = [
    { HealthRegenRow: 0, HealthRegenCol: 0 }, // Stage 0
    { HealthRegenRow: 0, HealthRegenCol: 1 }, // Stage 1
    { HealthRegenRow: 0, HealthRegenCol: 2 }, // Stage 2
    { HealthRegenRow: 0, HealthRegenCol: 3 }, // Stage 3
    { HealthRegenRow: 0, HealthRegenCol: 4 }, // Stage 4
    { HealthRegenRow: 0, HealthRegenCol: 5 }, // Stage 5
    { HealthRegenRow: 1, HealthRegenCol: 0 }, // Stage 6
    { HealthRegenRow: 1, HealthRegenCol: 1 }, // Stage 7
    { HealthRegenRow: 1, HealthRegenCol: 2 }, // Stage 8
    { HealthRegenRow: 1, HealthRegenCol: 3 }, // Stage 9
    { HealthRegenRow: 1, HealthRegenCol: 4 }, // Stage 10
    { HealthRegenRow: 1, HealthRegenCol: 5 }, // Stage 11
    { HealthRegenRow: 2, HealthRegenCol: 0 }, // Stage 12
    { HealthRegenRow: 2, HealthRegenCol: 1 }, // Stage 13
    { HealthRegenRow: 2, HealthRegenCol: 2 }, // Stage 14
    { HealthRegenRow: 2, HealthRegenCol: 3 }, // Stage 15
    { HealthRegenRow: 2, HealthRegenCol: 4 }, // Stage 16
    { HealthRegenRow: 2, HealthRegenCol: 5 }, // Stage 17
    { HealthRegenRow: 3, HealthRegenCol: 0 }, // Stage 18
    { HealthRegenRow: 3, HealthRegenCol: 1 }, // Stage 19
    { HealthRegenRow: 3, HealthRegenCol: 2 }, // Stage 20
    { HealthRegenRow: 3, HealthRegenCol: 3 }, // Stage 21
    { HealthRegenRow: 3, HealthRegenCol: 4 }, // Stage 22
    { HealthRegenRow: 3, HealthRegenCol: 5 }, // Stage 23
    { HealthRegenRow: 4, HealthRegenCol: 0 }, // Stage 24
    { HealthRegenRow: 4, HealthRegenCol: 1 }, // Stage 25
    { HealthRegenRow: 4, HealthRegenCol: 2 }, // Stage 26
    { HealthRegenRow: 4, HealthRegenCol: 3 }, // Stage 27
    { HealthRegenRow: 4, HealthRegenCol: 4 }, // Stage 28
    { HealthRegenRow: 4, HealthRegenCol: 5 }, // Stage 29
    { HealthRegenRow: 5, HealthRegenCol: 0 }, // Stage 30
    { HealthRegenRow: 5, HealthRegenCol: 1 }, // Stage 31
    { HealthRegenRow: 5, HealthRegenCol: 2 }, // Stage 32
];
function HealthRegenGetStageRowCol(HealthRegenStageIndex) {
    if (HealthRegenStageIndex >= 0 && HealthRegenStageIndex <= 32) {
        const { HealthRegenRow, HealthRegenCol } = HealthStagePositions[HealthRegenStageIndex];
        return { HealthRegenRow, HealthRegenCol };
    } else {
        return { HealthRegenRow: 0, HealthRegenCol: 0 };
    }
}
let HealthRegenStageIndex = 0;

const HealthRegenWidth = 130;
const HealthRegenHeight = 130;
const HealthRegenBorderWidth = 0;
const HealthRegenSpacingWidth = 0;

function HealthRegenPositionToImage(HealthRegenRow, HealthRegenCol) {
    return {
        x: (
            HealthRegenBorderWidth +
            HealthRegenCol * (HealthRegenSpacingWidth + HealthRegenWidth)
        ),
        y: (
            HealthRegenBorderWidth +
            HealthRegenRow * (HealthRegenSpacingWidth + HealthRegenHeight)
        )
    }
}

let HealthRegenCanvas = document.getElementById('HealthRegen');
let HealthRegenContext = HealthRegenCanvas.getContext('2d');

let HealthRegenImage = new Image();
HealthRegenImage.src = "assets/img/regen-levels/regen-level0-32.png";
HealthRegenImage.crossOrigin = "true";
HealthRegenCanvas.width = HealthRegenWidth;
HealthRegenCanvas.height = HealthRegenHeight;

function AnimateHealthRegen() {
    let HealthMaxRegenStageIndex = HealthLevel * 4;

    if (HealthRegenStageIndex === HealthMaxRegenStageIndex) {
        HealthRegenStageIndex = HealthMaxRegenStageIndex;
    } else if (HealthCorePercent >= 1) {
        HealthRegenStageIndex++;
        if (HealthCorePercent <= 0) {
            HealthCorePercent = 0;
        } else {
            HealthCorePercent--;
        }
    }

    console.log("HealthCore% " + HealthCorePercent);
    console.log("HealthCoreStageIndex " + HealthCoreStageIndex);
    console.log("HealthRegenStageIndex " + HealthRegenStageIndex);
    AnimateHealthCore();

    const { HealthRegenRow, HealthRegenCol } = HealthRegenGetStageRowCol(HealthRegenStageIndex);
    const position = HealthRegenPositionToImage(HealthRegenRow, HealthRegenCol);
    HealthRegenContext.clearRect(
        0,
        0,
        HealthRegenCanvas.width,
        HealthRegenCanvas.height
    );
    HealthRegenContext.drawImage(
        HealthRegenImage,
        position.x,
        position.y,
        HealthRegenWidth,
        HealthRegenHeight,
        0,
        0,
        HealthRegenWidth,
        HealthRegenHeight
    );
}
HealthTimer()
function HealthTimer() {
    setInterval(function () {
        if (HealthRegenStageIndex <= 0) {
            HealthRegenStageIndex = 0;
            if (HealthCorePercent <= 0) {
                document.getElementById("HealthInfo").innerText = "You are dead";
            }
        } else {
            HealthRegenStageIndex--
            document.getElementById("HealthInfo").innerText = "-";
        }
    }, 1000);
}
function HealthDamage() {
    if (HealthRegenStageIndex > 0) {
        HealthRegenStageIndex -= 3;
    } else {
        HealthRegenStageIndex = 0
    }
}

HealthRegenImage.onload = function () {
    // animateHealthRegen();
    setInterval(AnimateHealthRegen, 500);
};
// end of Health regen
// Energy level start
const EnergyLevelWidth = 130;
const EnergyLevelHeight = 130;
const EnergyLevelBorderWidth = 0;
const EnergyLevelSpacingWidth = 0;

function EnergyLevelPositionToImage(EnergyLevelRow, EnergyLevelCol) {
    return {
        x: (
            EnergyLevelBorderWidth +
            EnergyLevelCol * (EnergyLevelSpacingWidth + EnergyLevelWidth)
        ),
        y: (
            EnergyLevelBorderWidth +
            EnergyLevelRow * (EnergyLevelSpacingWidth + EnergyLevelHeight)
        )
    }
}

let EnergyLevelCanvas = document.getElementById('EnergyLevel');
let EnergyLevelContext = EnergyLevelCanvas.getContext('2d');

let EnergyLevelImage = new Image();
EnergyLevelImage.src = "assets/img/levels/levels.png";
EnergyLevelImage.crossOrigin = "true";
EnergyLevelCanvas.width = EnergyLevelWidth;
EnergyLevelCanvas.height = EnergyLevelHeight;

let EnergyLevelRow = 0;
let EnergyLevelCol = 0;

function AnimateEnergyLevel() {
    if (EnergyLevelCol === 3) {
        EnergyLevelCol = 0;
        EnergyLevelRow += 1;
    }
    if (EnergyLevelRow === 2) {
        if (EnergyLevelCol === 2) {
            EnergyLevelRow = 0;
            EnergyLevelCol = 0;
        }
    }


    let position = EnergyLevelPositionToImage(EnergyLevelRow, EnergyLevelCol);
    EnergyLevelContext.clearRect(
        0,
        0,
        EnergyLevelCanvas.width,
        EnergyLevelCanvas.height
    );
    EnergyLevelContext.drawImage(
        EnergyLevelImage,
        position.x,
        position.y,
        EnergyLevelWidth,
        EnergyLevelHeight,
        0,
        0,
        EnergyLevelWidth,
        EnergyLevelHeight
    );
    EnergyLevelCol += 1;
}

EnergyLevelImage.onload = function () {
    AnimateEnergyLevel();
};

// Energy level end

// Energy core start
const EnergyCoreStagePositions = [
    { EnergyCoreRow: 0, EnergyCoreCol: 0 }, // Stage 0
    { EnergyCoreRow: 0, EnergyCoreCol: 1 }, // Stage 1
    { EnergyCoreRow: 0, EnergyCoreCol: 2 }, // Stage 2
    { EnergyCoreRow: 1, EnergyCoreCol: 0 }, // Stage 3
    { EnergyCoreRow: 1, EnergyCoreCol: 1 }, // Stage 4
    { EnergyCoreRow: 1, EnergyCoreCol: 2 }, // Stage 5
    { EnergyCoreRow: 2, EnergyCoreCol: 0 }, // Stage 6
    { EnergyCoreRow: 2, EnergyCoreCol: 1 }, // Stage 7
];
function EnergyCoreGetStageRowCol(EnergyCoreStageIndex) {
    if (EnergyCoreStageIndex >= 0 && EnergyCoreStageIndex <= 7) {
        const { EnergyCoreRow, EnergyCoreCol } = EnergyCoreStagePositions[EnergyCoreStageIndex];
        return { EnergyCoreRow, EnergyCoreCol };
    } else {
        return { EnergyCoreRow: 0, EnergyCoreCol: 0 };
    }
}

const EnergyCoreWidth = 70;
const EnergyCoreHeight = 70;
const EnergyCoreBorderWidth = 0;
const EnergyCoreSpacingWidth = 0;

function EnergyCorePositionToImage(EnergyCoreRow, EnergyCoreCol) {
    return {
        x: (
            EnergyCoreBorderWidth +
            EnergyCoreCol * (EnergyCoreSpacingWidth + EnergyCoreWidth)
        ),
        y: (
            EnergyCoreBorderWidth +
            EnergyCoreRow * (EnergyCoreSpacingWidth + EnergyCoreHeight)
        )
    }
}

let EnergyCoreCanvas = document.getElementById('EnergyCore');
let EnergyCoreContext = EnergyCoreCanvas.getContext('2d');

let EnergyCoreImage = new Image();
EnergyCoreImage.src = "assets/img/stats-middle-icon/Energy-core.png";
EnergyCoreImage.crossOrigin = "true";
EnergyCoreCanvas.width = EnergyCoreWidth;
EnergyCoreCanvas.height = EnergyCoreHeight;

let EnergyCorePercent = 100;
let EnergyCoreStageIndex = 5;

function AnimateEnergyCore() {
    if (EnergyCorePercent < 1) {
        EnergyCoreStageIndex = 0;
    } else if (EnergyCorePercent <= 14) {
        EnergyCoreStageIndex = 1;
    } else if (EnergyCorePercent <= 29) {
        EnergyCoreStageIndex = 2;
    } else if (EnergyCorePercent <= 43) {
        EnergyCoreStageIndex = 3;
    } else if (EnergyCorePercent <= 57) {
        EnergyCoreStageIndex = 4;
    } else if (EnergyCorePercent <= 72) {
        EnergyCoreStageIndex = 5;
    } else if (EnergyCorePercent <= 86) {
        EnergyCoreStageIndex = 6;
    } else if (EnergyCorePercent <= 100) {
        EnergyCoreStageIndex = 7;
    }
    if (EnergyCorePercent > 100) {
        EnergyCorePercent = 100;
    } else if (EnergyCorePercent < 0) {
        EnergyCorePercent = 0;
    }
    const { EnergyCoreRow, EnergyCoreCol } = EnergyCoreGetStageRowCol(EnergyCoreStageIndex);
    const position = EnergyCorePositionToImage(EnergyCoreRow, EnergyCoreCol);
    EnergyCoreContext.clearRect(
        0,
        0,
        EnergyCoreCanvas.width,
        EnergyCoreCanvas.height
    );
    EnergyCoreContext.drawImage(
        EnergyCoreImage,
        position.x,
        position.y,
        EnergyCoreWidth,
        EnergyCoreHeight,
        0,
        0,
        EnergyCoreWidth,
        EnergyCoreHeight
    );
}

EnergyCoreImage.onload = function () {
    // animateEnergyCore();
    setInterval(AnimateEnergyCore, 500);
};
let SleepCounter = 0;
let EnergyLevel = 1;
function Sleep() {
    EnergyCorePercent += 10;
    SleepCounter = SleepCounter + 1;
    console.log(SleepCounter);
    if (SleepCounter >= 5) {
        EnergyLevel = EnergyLevel + 1;
        SleepCounter = 0;
        if (EnergyLevel > 8) {
            EnergyLevel = 8;
        } else {
            AnimateEnergyLevel();
            console.log('next Energy level');
        }
        console.log('Energy level = ' + EnergyLevel);
    }
    AnimateEnergyCore();
}
// Energy core end

// start of Energy regen
const EnergyStagePositions = [
    { EnergyRegenRow: 0, EnergyRegenCol: 0 }, // Stage 0
    { EnergyRegenRow: 0, EnergyRegenCol: 1 }, // Stage 1
    { EnergyRegenRow: 0, EnergyRegenCol: 2 }, // Stage 2
    { EnergyRegenRow: 0, EnergyRegenCol: 3 }, // Stage 3
    { EnergyRegenRow: 0, EnergyRegenCol: 4 }, // Stage 4
    { EnergyRegenRow: 0, EnergyRegenCol: 5 }, // Stage 5
    { EnergyRegenRow: 1, EnergyRegenCol: 0 }, // Stage 6
    { EnergyRegenRow: 1, EnergyRegenCol: 1 }, // Stage 7
    { EnergyRegenRow: 1, EnergyRegenCol: 2 }, // Stage 8
    { EnergyRegenRow: 1, EnergyRegenCol: 3 }, // Stage 9
    { EnergyRegenRow: 1, EnergyRegenCol: 4 }, // Stage 10
    { EnergyRegenRow: 1, EnergyRegenCol: 5 }, // Stage 11
    { EnergyRegenRow: 2, EnergyRegenCol: 0 }, // Stage 12
    { EnergyRegenRow: 2, EnergyRegenCol: 1 }, // Stage 13
    { EnergyRegenRow: 2, EnergyRegenCol: 2 }, // Stage 14
    { EnergyRegenRow: 2, EnergyRegenCol: 3 }, // Stage 15
    { EnergyRegenRow: 2, EnergyRegenCol: 4 }, // Stage 16
    { EnergyRegenRow: 2, EnergyRegenCol: 5 }, // Stage 17
    { EnergyRegenRow: 3, EnergyRegenCol: 0 }, // Stage 18
    { EnergyRegenRow: 3, EnergyRegenCol: 1 }, // Stage 19
    { EnergyRegenRow: 3, EnergyRegenCol: 2 }, // Stage 20
    { EnergyRegenRow: 3, EnergyRegenCol: 3 }, // Stage 21
    { EnergyRegenRow: 3, EnergyRegenCol: 4 }, // Stage 22
    { EnergyRegenRow: 3, EnergyRegenCol: 5 }, // Stage 23
    { EnergyRegenRow: 4, EnergyRegenCol: 0 }, // Stage 24
    { EnergyRegenRow: 4, EnergyRegenCol: 1 }, // Stage 25
    { EnergyRegenRow: 4, EnergyRegenCol: 2 }, // Stage 26
    { EnergyRegenRow: 4, EnergyRegenCol: 3 }, // Stage 27
    { EnergyRegenRow: 4, EnergyRegenCol: 4 }, // Stage 28
    { EnergyRegenRow: 4, EnergyRegenCol: 5 }, // Stage 29
    { EnergyRegenRow: 5, EnergyRegenCol: 0 }, // Stage 30
    { EnergyRegenRow: 5, EnergyRegenCol: 1 }, // Stage 31
    { EnergyRegenRow: 5, EnergyRegenCol: 2 }, // Stage 32
];
function EnergyRegenGetStageRowCol(EnergyRegenStageIndex) {
    if (EnergyRegenStageIndex >= 0 && EnergyRegenStageIndex <= 32) {
        const { EnergyRegenRow, EnergyRegenCol } = EnergyStagePositions[EnergyRegenStageIndex];
        return { EnergyRegenRow, EnergyRegenCol };
    } else {
        return { EnergyRegenRow: 0, EnergyRegenCol: 0 };
    }
}
let EnergyRegenStageIndex = 0;

const EnergyRegenWidth = 130;
const EnergyRegenHeight = 130;
const EnergyRegenBorderWidth = 0;
const EnergyRegenSpacingWidth = 0;

function EnergyRegenPositionToImage(EnergyRegenRow, EnergyRegenCol) {
    return {
        x: (
            EnergyRegenBorderWidth +
            EnergyRegenCol * (EnergyRegenSpacingWidth + EnergyRegenWidth)
        ),
        y: (
            EnergyRegenBorderWidth +
            EnergyRegenRow * (EnergyRegenSpacingWidth + EnergyRegenHeight)
        )
    }
}

let EnergyRegenCanvas = document.getElementById('EnergyRegen');
let EnergyRegenContext = EnergyRegenCanvas.getContext('2d');

let EnergyRegenImage = new Image();
EnergyRegenImage.src = "assets/img/regen-levels/regen-level0-32.png";
EnergyRegenImage.crossOrigin = "true";
EnergyRegenCanvas.width = EnergyRegenWidth;
EnergyRegenCanvas.height = EnergyRegenHeight;

function AnimateEnergyRegen() {
    let EnergyMaxRegenStageIndex = EnergyLevel * 4;

    if (EnergyRegenStageIndex === EnergyMaxRegenStageIndex) {
        EnergyRegenStageIndex = EnergyMaxRegenStageIndex;
    } else if (EnergyCorePercent >= 1) {
        EnergyRegenStageIndex++;
        if (EnergyCorePercent <= 0) {
            EnergyCorePercent = 0;
        } else {
            EnergyCorePercent--;
        }
    }

    console.log("EnergyCore% " + EnergyCorePercent);
    console.log("EnergyCoreStageIndex " + EnergyCoreStageIndex);
    console.log("EnergyRegenStageIndex " + EnergyRegenStageIndex);
    AnimateEnergyCore();

    const { EnergyRegenRow, EnergyRegenCol } = EnergyRegenGetStageRowCol(EnergyRegenStageIndex);
    const position = EnergyRegenPositionToImage(EnergyRegenRow, EnergyRegenCol);
    EnergyRegenContext.clearRect(
        0,
        0,
        EnergyRegenCanvas.width,
        EnergyRegenCanvas.height
    );
    EnergyRegenContext.drawImage(
        EnergyRegenImage,
        position.x,
        position.y,
        EnergyRegenWidth,
        EnergyRegenHeight,
        0,
        0,
        EnergyRegenWidth,
        EnergyRegenHeight
    );
}
EnergyTimer()
function EnergyTimer() {
    setInterval(function () {
        if (EnergyRegenStageIndex <= 0) {
            EnergyRegenStageIndex = 0;
            if (EnergyCorePercent <= 0) {
                document.getElementById("EnergyInfo").innerText = "you have fainted";
            }
        } else {
            EnergyRegenStageIndex--
            document.getElementById("EnergyInfo").innerText = "-";

        }
    }, 1000);
}
function EnergyDamage() {
    if (EnergyRegenStageIndex > 0) {
        EnergyRegenStageIndex -= 3;
    } else {
        EnergyRegenStageIndex = 0
    }
}

EnergyRegenImage.onload = function () {
    // animateEnergyRegen();
    setInterval(AnimateEnergyRegen, 500);
};
// end of Energy regen
// Deadeye level start
const DeadeyeLevelWidth = 130;
const DeadeyeLevelHeight = 130;
const DeadeyeLevelBorderWidth = 0;
const DeadeyeLevelSpacingWidth = 0;

function DeadeyeLevelPositionToImage(DeadeyeLevelRow, DeadeyeLevelCol) {
    return {
        x: (
            DeadeyeLevelBorderWidth +
            DeadeyeLevelCol * (DeadeyeLevelSpacingWidth + DeadeyeLevelWidth)
        ),
        y: (
            DeadeyeLevelBorderWidth +
            DeadeyeLevelRow * (DeadeyeLevelSpacingWidth + DeadeyeLevelHeight)
        )
    }
}

let DeadeyeLevelCanvas = document.getElementById('DeadeyeLevel');
let DeadeyeLevelContext = DeadeyeLevelCanvas.getContext('2d');

let DeadeyeLevelImage = new Image();
DeadeyeLevelImage.src = "assets/img/levels/levels.png";
DeadeyeLevelImage.crossOrigin = "true";
DeadeyeLevelCanvas.width = DeadeyeLevelWidth;
DeadeyeLevelCanvas.height = DeadeyeLevelHeight;

let DeadeyeLevelRow = 0;
let DeadeyeLevelCol = 0;

function AnimateDeadeyeLevel() {
    if (DeadeyeLevelCol === 3) {
        DeadeyeLevelCol = 0;
        DeadeyeLevelRow += 1;
    }
    if (DeadeyeLevelRow === 2) {
        if (DeadeyeLevelCol === 2) {
            DeadeyeLevelRow = 0;
            DeadeyeLevelCol = 0;
        }
    }


    let position = DeadeyeLevelPositionToImage(DeadeyeLevelRow, DeadeyeLevelCol);
    DeadeyeLevelContext.clearRect(
        0,
        0,
        DeadeyeLevelCanvas.width,
        DeadeyeLevelCanvas.height
    );
    DeadeyeLevelContext.drawImage(
        DeadeyeLevelImage,
        position.x,
        position.y,
        DeadeyeLevelWidth,
        DeadeyeLevelHeight,
        0,
        0,
        DeadeyeLevelWidth,
        DeadeyeLevelHeight
    );
    DeadeyeLevelCol += 1;
}

DeadeyeLevelImage.onload = function () {
    AnimateDeadeyeLevel();
};

// Deadeye level end

// Deadeye core start
const DeadeyeCoreStagePositions = [
    { DeadeyeCoreRow: 0, DeadeyeCoreCol: 0 }, // Stage 0
    { DeadeyeCoreRow: 0, DeadeyeCoreCol: 1 }, // Stage 1
    { DeadeyeCoreRow: 0, DeadeyeCoreCol: 2 }, // Stage 2
    { DeadeyeCoreRow: 1, DeadeyeCoreCol: 0 }, // Stage 3
    { DeadeyeCoreRow: 1, DeadeyeCoreCol: 1 }, // Stage 4
    { DeadeyeCoreRow: 1, DeadeyeCoreCol: 2 }, // Stage 5
];
function DeadeyeCoreGetStageRowCol(DeadeyeCoreStageIndex) {
    if (DeadeyeCoreStageIndex >= 0 && DeadeyeCoreStageIndex <= 5) {
        const { DeadeyeCoreRow, DeadeyeCoreCol } = DeadeyeCoreStagePositions[DeadeyeCoreStageIndex];
        return { DeadeyeCoreRow, DeadeyeCoreCol };
    } else {
        return { DeadeyeCoreRow: 0, DeadeyeCoreCol: 0 };
    }
}




const DeadeyeCoreWidth = 70;
const DeadeyeCoreHeight = 70;
const DeadeyeCoreBorderWidth = 0;
const DeadeyeCoreSpacingWidth = 0;

function DeadeyeCorePositionToImage(DeadeyeCoreRow, DeadeyeCoreCol) {
    return {
        x: (
            DeadeyeCoreBorderWidth +
            DeadeyeCoreCol * (DeadeyeCoreSpacingWidth + DeadeyeCoreWidth)
        ),
        y: (
            DeadeyeCoreBorderWidth +
            DeadeyeCoreRow * (DeadeyeCoreSpacingWidth + DeadeyeCoreHeight)
        )
    }
}

let DeadeyeCoreCanvas = document.getElementById('DeadeyeCore');
let DeadeyeCoreContext = DeadeyeCoreCanvas.getContext('2d');

let DeadeyeCoreImage = new Image();
DeadeyeCoreImage.src = "assets/img/stats-middle-icon/Deadeye-core.png";
DeadeyeCoreImage.crossOrigin = "true";
DeadeyeCoreCanvas.width = DeadeyeCoreWidth;
DeadeyeCoreCanvas.height = DeadeyeCoreHeight;

let DeadeyeCorePercent = 100;
let DeadeyeCoreStageIndex = 5;

function AnimateDeadeyeCore() {
    if (DeadeyeCorePercent < 1) {
        DeadeyeCoreStageIndex = 0;
    } else if (DeadeyeCorePercent <= 20) {
        DeadeyeCoreStageIndex = 1;
    } else if (DeadeyeCorePercent <= 40) {
        DeadeyeCoreStageIndex = 2;
    } else if (DeadeyeCorePercent <= 60) {
        DeadeyeCoreStageIndex = 3;
    } else if (DeadeyeCorePercent <= 80) {
        DeadeyeCoreStageIndex = 4;
    } else if (DeadeyeCorePercent <= 100) {
        DeadeyeCoreStageIndex = 5;
    }
    if (DeadeyeCorePercent > 100) {
        DeadeyeCorePercent = 100;
    } else if (DeadeyeCorePercent < 0) {
        DeadeyeCorePercent = 0;
    }
    const { DeadeyeCoreRow, DeadeyeCoreCol } = DeadeyeCoreGetStageRowCol(DeadeyeCoreStageIndex);
    const position = DeadeyeCorePositionToImage(DeadeyeCoreRow, DeadeyeCoreCol);
    DeadeyeCoreContext.clearRect(
        0,
        0,
        DeadeyeCoreCanvas.width,
        DeadeyeCoreCanvas.height
    );
    DeadeyeCoreContext.drawImage(
        DeadeyeCoreImage,
        position.x,
        position.y,
        DeadeyeCoreWidth,
        DeadeyeCoreHeight,
        0,
        0,
        DeadeyeCoreWidth,
        DeadeyeCoreHeight
    );
}

DeadeyeCoreImage.onload = function () {
    // animateDeadeyeCore();
    setInterval(AnimateDeadeyeCore, 500);
};
let SmokeCounter = 0;
let DeadeyeLevel = 1;
function Smoke() {
    DeadeyeCorePercent += 10;
    SmokeCounter = SmokeCounter + 1;
    console.log(SmokeCounter);
    if (SmokeCounter >= 5) {
        DeadeyeLevel = DeadeyeLevel + 1;
        SmokeCounter = 0;
        if (DeadeyeLevel > 8) {
            DeadeyeLevel = 8;
        } else {
            AnimateDeadeyeLevel();
            console.log('next Deadeye level');
        }
        console.log('Deadeye level = ' + DeadeyeLevel);
    }
    AnimateDeadeyeCore();
}
// Deadeye core end

// start of Deadeye regen
const DeadeyeStagePositions = [
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 0 }, // Stage 0
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 1 }, // Stage 1
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 2 }, // Stage 2
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 3 }, // Stage 3
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 4 }, // Stage 4
    { DeadeyeRegenRow: 0, DeadeyeRegenCol: 5 }, // Stage 5
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 0 }, // Stage 6
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 1 }, // Stage 7
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 2 }, // Stage 8
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 3 }, // Stage 9
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 4 }, // Stage 10
    { DeadeyeRegenRow: 1, DeadeyeRegenCol: 5 }, // Stage 11
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 0 }, // Stage 12
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 1 }, // Stage 13
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 2 }, // Stage 14
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 3 }, // Stage 15
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 4 }, // Stage 16
    { DeadeyeRegenRow: 2, DeadeyeRegenCol: 5 }, // Stage 17
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 0 }, // Stage 18
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 1 }, // Stage 19
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 2 }, // Stage 20
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 3 }, // Stage 21
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 4 }, // Stage 22
    { DeadeyeRegenRow: 3, DeadeyeRegenCol: 5 }, // Stage 23
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 0 }, // Stage 24
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 1 }, // Stage 25
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 2 }, // Stage 26
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 3 }, // Stage 27
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 4 }, // Stage 28
    { DeadeyeRegenRow: 4, DeadeyeRegenCol: 5 }, // Stage 29
    { DeadeyeRegenRow: 5, DeadeyeRegenCol: 0 }, // Stage 30
    { DeadeyeRegenRow: 5, DeadeyeRegenCol: 1 }, // Stage 31
    { DeadeyeRegenRow: 5, DeadeyeRegenCol: 2 }, // Stage 32
];
function DeadeyeRegenGetStageRowCol(DeadeyeRegenStageIndex) {
    if (DeadeyeRegenStageIndex >= 0 && DeadeyeRegenStageIndex <= 32) {
        const { DeadeyeRegenRow, DeadeyeRegenCol } = DeadeyeStagePositions[DeadeyeRegenStageIndex];
        return { DeadeyeRegenRow, DeadeyeRegenCol };
    } else {
        return { DeadeyeRegenRow: 0, DeadeyeRegenCol: 0 };
    }
}
let DeadeyeRegenStageIndex = 0;

const DeadeyeRegenWidth = 130;
const DeadeyeRegenHeight = 130;
const DeadeyeRegenBorderWidth = 0;
const DeadeyeRegenSpacingWidth = 0;

function DeadeyeRegenPositionToImage(DeadeyeRegenRow, DeadeyeRegenCol) {
    return {
        x: (
            DeadeyeRegenBorderWidth +
            DeadeyeRegenCol * (DeadeyeRegenSpacingWidth + DeadeyeRegenWidth)
        ),
        y: (
            DeadeyeRegenBorderWidth +
            DeadeyeRegenRow * (DeadeyeRegenSpacingWidth + DeadeyeRegenHeight)
        )
    }
}

let DeadeyeRegenCanvas = document.getElementById('DeadeyeRegen');
let DeadeyeRegenContext = DeadeyeRegenCanvas.getContext('2d');

let DeadeyeRegenImage = new Image();
DeadeyeRegenImage.src = "assets/img/regen-levels/regen-level0-32.png";
DeadeyeRegenImage.crossOrigin = "true";
DeadeyeRegenCanvas.width = DeadeyeRegenWidth;
DeadeyeRegenCanvas.height = DeadeyeRegenHeight;

function AnimateDeadeyeRegen() {
    let DeadeyeMaxRegenStageIndex = DeadeyeLevel * 4;

    if (DeadeyeRegenStageIndex === DeadeyeMaxRegenStageIndex) {
        DeadeyeRegenStageIndex = DeadeyeMaxRegenStageIndex;
    } else if (DeadeyeCorePercent >= 1) {
        DeadeyeRegenStageIndex++;
        if (DeadeyeCorePercent <= 0) {
            DeadeyeCorePercent = 0;
        } else {
            DeadeyeCorePercent--;
        }
    }

    console.log("DeadeyeCore% " + DeadeyeCorePercent);
    console.log("DeadeyeCoreStageIndex " + DeadeyeCoreStageIndex);
    console.log("DeadeyeRegenStageIndex " + DeadeyeRegenStageIndex);
    AnimateDeadeyeCore();

    const { DeadeyeRegenRow, DeadeyeRegenCol } = DeadeyeRegenGetStageRowCol(DeadeyeRegenStageIndex);
    const position = DeadeyeRegenPositionToImage(DeadeyeRegenRow, DeadeyeRegenCol);
    DeadeyeRegenContext.clearRect(
        0,
        0,
        DeadeyeRegenCanvas.width,
        DeadeyeRegenCanvas.height
    );
    DeadeyeRegenContext.drawImage(
        DeadeyeRegenImage,
        position.x,
        position.y,
        DeadeyeRegenWidth,
        DeadeyeRegenHeight,
        0,
        0,
        DeadeyeRegenWidth,
        DeadeyeRegenHeight
    );
}
DeadeyeTimer()
function DeadeyeTimer() {
    setInterval(function () {
        if (DeadeyeRegenStageIndex <= 0) {
            DeadeyeRegenStageIndex = 0;
            if (DeadeyeCorePercent <= 0) {
                document.getElementById("DeadeyeInfo").innerText = "Deadeye is drained";
            }
        } else {
            DeadeyeRegenStageIndex--
            document.getElementById("DeadeyeInfo").innerText = "-";

        }
    }, 1000);
}
function DeadeyeDamage() {
    if (DeadeyeRegenStageIndex > 0) {
        DeadeyeRegenStageIndex -= 3;
    } else {
        DeadeyeRegenStageIndex = 0
    }
}

DeadeyeRegenImage.onload = function () {
    // animateDeadeyeRegen();
    setInterval(AnimateDeadeyeRegen, 500);
};
//localStorage voor Health, Energie en Deadeye start hier
function saveStats() {
    let stats = {
        HealthRegenStageIndex,
        EnergyRegenStageIndex,
        DeadeyeRegenStageIndex,
        HealthCorePercent,
        EnergyCorePercent,
        DeadeyeCorePercent,
        HealthLevel,
        EnergyLevel,
        DeadeyeLevel
    };
    localStorage.setItem("playerStats", JSON.stringify(stats));
}
function loadStats() {
    let savedStats = JSON.parse(localStorage.getItem("playerStats"));
    if (savedStats) {
        HealthRegenStageIndex = savedStats.HealthRegenStageIndex;
        EnergyRegenStageIndex = savedStats.EnergyRegenStageIndex;
        DeadeyeRegenStageIndex = savedStats.DeadeyeRegenStageIndex;
        HealthCorePercent = savedStats.HealthCorePercent;
        EnergyCorePercent = savedStats.EnergyCorePercent;
        DeadeyeCorePercent = savedStats.DeadeyeCorePercent;
        HealthLevel = savedStats.HealthLevel;
        EnergyLevel = savedStats.EnergyLevel;
        DeadeyeLevel = savedStats.DeadeyeLevel;

        // document.getElementById("CountDown1").innerText = 'Health ' + Health;
        // document.getElementById("CountDown2").innerText = 'Energy ' + Energy;
        // document.getElementById("CountDown3").innerText = 'Deadeye ' + Deadeye;
    }
}
// end of Deadeye regen
loadStats()

function EmotionCheck() {
    let emotions = ["I'm hungry", "I'm tired", "I need a smoke"];
    console.log("EmotionCheck")
    if (HealthCorePercent < 50) {
        console.log(emotions[0]);
    }
    if (EnergyCorePercent < 50) {
        console.log(emotions[1]);
    }
    if (DeadeyeCorePercent < 50) {
        console.log(emotions[2]);
    }
}
setInterval(EmotionCheck, 1000);
// start daynight
function loadCloudsAndDayNight() {
    let savedData = JSON.parse(localStorage.getItem("cloudsDayNight"));
    if (savedData) {
        Clouds = savedData.cloudPositions;
        Sun = savedData.dayNightState.Sun;
        Moon = savedData.dayNightState.Moon;

        Clouds.forEach(cloud => {
            document.getElementById(cloud.id).style.left = cloud.left + 'em';
        });
    }
}

let Sun = -3.125;
let Moon = -3.125;
Day()
function Day() {
    let TellerFunctionSun = setInterval(function () {
        Sun = Sun + 0.625;
        document.getElementById("Sun").style.bottom = Sun + 'em';
        Moon = Moon - 0.625;
        document.getElementById("Moon").style.bottom = Moon + 'em';
        if (Sun > 37.5) {
            document.getElementById("Body").style.backgroundColor = "skyblue";
            clearInterval(TellerFunctionSun);
            let TellerFunctionDay = setInterval(function () {

                if (TellerFunctionDay > 3) {
                    clearInterval(TellerFunctionDay)
                    Night()
                }

            }, 3000);
        } else if (Moon > 3.125) {
            document.getElementById("Body").style.backgroundColor = "#10103c";
        } else if (Sun < 3.125) {
            document.getElementById("Body").style.backgroundColor = "#ea9087";
        } else if (Sun > 3.125) {
            document.getElementById("Body").style.backgroundColor = "skyblue";
        } else if (Sun < 0) {
            document.getElementById("Body").style.backgroundColor = "#10103c";

        }

    }, 150);
}
function Night() {
    const TellerFunctionMoon = setInterval(function () {
        Sun = Sun - 0.625;
        document.getElementById("Sun").style.bottom = Sun + 'em';
        Moon = Moon + 0.625;
        document.getElementById("Moon").style.bottom = Moon + 'em';
        if (Moon > 37.5) {
            document.getElementById("Body").style.backgroundColor = "#10103c";

            clearInterval(TellerFunctionMoon);
            let TellerFunctionNight = setInterval(function () {

                if (TellerFunctionNight > 3) {
                    clearInterval(TellerFunctionNight)
                    Day()
                }

            }, 3000);
        } else if (Sun > 3.125) {
            document.getElementById("Body").style.backgroundColor = "skyblue";
        } else if (Moon < 3.125) {
            document.getElementById("Body").style.backgroundColor = "orange";
        } else if (Moon > 3.125) {
            document.getElementById("Body").style.backgroundColor = "#10103c";
        } else if (Moon < 0) {
            document.getElementById("Body").style.backgroundColor = "skyblue";
        }

    }, 150);
}
// end daynight
// start clouds
let Clouds = [
    { id: "Cloud1", left: 12.5 },
    { id: "Cloud2", left: 62.5 },
    { id: "Cloud3", left: 46.875 },
    { id: "Cloud4", left: 6.25 },
    { id: "Cloud5", left: 50 },
    { id: "Cloud6", left: 87.5 }
];

function updateCloud(CloudEach) {
    CloudEach.left += 0.625;
    if (CloudEach.left < 96.25) {
        document.getElementById(CloudEach.id).style.left = CloudEach.left + 'em';
    } else {
        CloudEach.left = -15.625;
        document.getElementById(CloudEach.id).style.left = CloudEach.left + 'em';
    }
}

let CloudCounter = setInterval(function () {
    Clouds.forEach(updateCloud);
}, 250);
// localStorage voor clouds, day/night start hier
function saveCloudsAndDayNight() {
    let cloudPositions = Clouds.map(cloud => ({ id: cloud.id, left: cloud.left }));
    let dayNightState = { Sun, Moon };

    localStorage.setItem("cloudsDayNight", JSON.stringify({ cloudPositions, dayNightState }));
}
// end clouds
// start music
const StartButton = document.getElementById('StartBtn');
const Box = document.getElementById('Box');
const BackgroundMusic = document.getElementById('BackgroundMusic');
const Body = document.body;

StartButton.addEventListener('click', () => {
    BackgroundMusic.play();
    Box.style.display = ('none');
    Body.style.filter = ('none');
});
// end music
loadCloudsAndDayNight()
// Sprite Arthur

const ArthurWidth = 320;
const ArthurHeight = 320;
const ArthurBorderWidth = 0;
const ArthurSpacingWidth = 0;

function arthurPositionToImage(ArthurRow, ArthurCol) {
    return {
        x: (
            ArthurBorderWidth +
            ArthurCol * (ArthurSpacingWidth + ArthurWidth)
        ),
        y: (
            ArthurSpacingWidth +
            ArthurRow * (ArthurSpacingWidth + ArthurHeight)
        )
    }
}

let ArthurCanvas = document.getElementById('ArthurCanvas');
let ArthurContext = ArthurCanvas.getContext('2d');

let ArthurImage = new Image();
ArthurImage.src = "assets/img/Arthur-Morgan/Arthur-Morgan-sprite1.png";
ArthurCanvas.width = ArthurWidth;
ArthurCanvas.height = ArthurHeight;

let ArthurRow = 0;
let ArthurCol = 0;

function AnimateArthur() {
    if (ArthurCol === 3) {
        ArthurCol = 0;
        ArthurRow += 1;
    }
    if (ArthurRow === 2) {
        ArthurRow = 0;
    }


    let position = arthurPositionToImage(ArthurRow, ArthurCol);
    ArthurContext.clearRect(
        0,
        0,
        ArthurCanvas.width,
        ArthurCanvas.height
    );
    ArthurContext.drawImage(
        ArthurImage,
        position.x,
        position.y,
        ArthurWidth,
        ArthurHeight,
        0,
        0,
        ArthurWidth,
        ArthurHeight
    );
    ArthurCol += 1;
}

ArthurImage.onload = function () {
    setInterval(AnimateArthur, 500);
};
setInterval(() => {
    saveCloudsAndDayNight();
    saveStats();
}, 100);
// end arthur
// 
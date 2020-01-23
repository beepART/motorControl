const Gpio = require('pigpio').Gpio;

const enA = new Gpio(12, {mode:Gpio.OUTPUT});
const ln1 = new Gpio(17, {mode:Gpio.OUTPUT});
const ln2 = new Gpio(27, {mode:Gpio.OUTPUT});

const enB = new Gpio(13, {mode:Gpio.OUTPUT});
const ln3 = new Gpio(18, {mode:Gpio.OUTPUT});
const ln4 = new Gpio(23, {mode:Gpio.OUTPUT});

const FREQ = 100;
enA.pwmFrequency(FREQ);
enB.pwmFrequency(FREQ);

exports.BoatControl = function() {
    function setPowerLeft (speed){
        if(speed > 0 ) {
            console.log("running left forward");
            ln3.digitalWrite(0);
            ln4.digitalWrite(1);
            enB.pwmWrite(speed * 256);

        }
        if (speed === 0) {
            ln3.digitalWrite(0);
            ln4.digitalWrite(1);
            enB.pwmWrite(0);
        }if (speed < 0 ) {
            console.log("running left backward");
            ln3.digitalWrite(1);
            ln4.digitalWrite(0);
            enB.pwmWrite(Math.abs(speed) * 256);
        }else {
            return false;
        }
    };

    function setPowerRight(speed){
        if(speed > 0 ) {
            console.log("running right forward");
            ln1.digitalWrite(0);
            ln2.digitalWrite(1);
            enA.pwmWrite(speed * 256);
        }
        if (speed === 0) {
            ln1.digitalWrite(0);
            ln2.digitalWrite(1);
            enA.pwmWrite(0);
        }if (speed < 0 ) {
            console.log("running right backward");
            ln1.digitalWrite(1);
            ln2.digitalWrite(0);
            enA.pwmWrite(Math.abs(speed) * 256);
        }else {
            return false;
        }
    };
};
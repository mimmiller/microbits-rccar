let speedB = 0
let pressedB = false
let pressedA = false
let speedA = 0
radio.onDataPacketReceived(({ receivedString }) => {
    led.toggle(2, 2)
    if (receivedString == "AB") {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P11, 0)
        led.unplot(1, 0)
        led.plot(2, 0)
        led.unplot(3, 0)
    } else if (receivedString == "A") {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P11, 1)
        led.plot(1, 0)
        led.unplot(2, 0)
        led.unplot(3, 0)
    } else if (receivedString == "B") {
        led.unplot(1, 0)
        led.unplot(2, 0)
        led.plot(3, 0)
        pins.digitalWritePin(DigitalPin.P5, 1)
        pins.digitalWritePin(DigitalPin.P11, 0)
    } else {
        led.unplot(2, 2)
        led.unplot(1, 0)
        led.unplot(2, 0)
        led.unplot(3, 0)
        pins.digitalWritePin(DigitalPin.P5, 1)
        pins.digitalWritePin(DigitalPin.P11, 1)
    }
})
speedA = 0
speedB = 0
pins.servoSetPulse(AnalogPin.P0, 0)
pins.servoSetPulse(AnalogPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 1)
radio.setGroup(1)
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        pressedA = true
        speedA += 2000
        if (speedA > 36000) {
            speedA = 36000
        }
    } else if (pressedA) {
        pressedA = false
        speedA = 0
    }
    pins.servoSetPulse(AnalogPin.P0, speedA)
    led.plotBrightness(0, 0, speedA / 100)
    basic.pause(100)
})
basic.forever(() => {
    if (input.buttonIsPressed(Button.B)) {
        pressedB = true
        speedB += 2000
        if (speedB > 36000) {
            speedB = 36000
        }
    } else if (pressedB) {
        pressedB = false
        speedB = 0
    }
    pins.servoSetPulse(AnalogPin.P1, speedB)
    led.plotBrightness(4, 0, speedB / 100)
    basic.pause(100)
})

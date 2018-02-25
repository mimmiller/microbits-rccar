let pressed = false
let speedA = 1
let speedB = 1
speedA = 1
speedB = 1
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(() => {
    if (input.buttonIsPressed(Button.AB)) {
        pressed = true
        speedA = speedA * 2
        if (speedA > 254) {
            speedA = 254
        }
        speedB = speedB * 2
        if (speedB > 254) {
            speedB = 254
        }
    } else if (input.buttonIsPressed(Button.A)) {
        pressed = true
        speedA = speedA * 2
        if (speedA > 254) {
            speedA = 254
        }
        speedB = speedB / 2
        if (speedB < 1) {
            speedB = 1
        }
    } else if (input.buttonIsPressed(Button.B)) {
        pressed = true
        speedA = speedA / 2
        if (speedA < 1) {
            speedA = 1
        }
        speedB = speedB * 2
        if (speedB > 254) {
            speedB = 254
        }
    } else if (pressed) {
        radio.sendString("0:0")
        pressed = false
        speedA = 1
        speedB = 1
        led.unplot(0, 0)
        led.unplot(4, 0)
    }
    if (pressed) {
        radio.sendString((speedA - 1) + ":" + (speedB - 1))
        led.plotBrightness(0, 0, speedA - 1)
        led.plotBrightness(4, 0, speedB - 1)
    }
    basic.pause(100)
})

let bb = ""
let aa = ""
let b = 0
let speedB = 0
let a = 0
let speed = 0
let speedA = 0
let pressed = false
pressed = false
speedA = 1
speedB = 1
speedA = 1
speedB = 1
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(() => {
    if (input.buttonIsPressed(Button.AB)) {
        pressed = true
        speed = Math.max(speedA, speedB)
        speed = speed * 2 - speed / 2
        if (speed > 254) {
            speed = 254
        }
        speedA = speed
        speedB = speed
    } else if (input.buttonIsPressed(Button.A)) {
        pressed = true
        speedA = speedA * 2 - speedA / 2
        if (speedA > 254) {
            speedA = 254
        }
        speedB = speedA / 60
        if (speedB < 1) {
            speedB = 1
        }
    } else if (input.buttonIsPressed(Button.B)) {
        pressed = true
        speedA = speedB / 60
        if (speedA < 1) {
            speedA = 1
        }
        speedB = speedB * 2 - speedB / 2
        if (speedB > 254) {
            speedB = 254
        }
    } else if (pressed) {
        radio.sendString("000:000")
        pressed = false
        speedA = 1
        speedB = 1
        led.unplot(0, 0)
        led.unplot(4, 0)
    }
    if (pressed) {
        a = speedA - 1
        b = speedB - 1
        if (a < 10) {
            aa = "00" + a
        } else if (a < 100) {
            aa = "0" + a
        } else {
            aa = "" + a
        }
        if (b < 10) {
            bb = "00" + b
        } else if (b < 100) {
            bb = "0" + b
        } else {
            bb = "" + b
        }
        radio.sendString("" + aa + ":" + bb)
        led.plotBrightness(0, 0, a)
        led.plotBrightness(4, 0, b)
    }
    basic.pause(100)
})

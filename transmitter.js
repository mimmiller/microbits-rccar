let bab = false
let bb2 = false
let ba = false
let bb = ""
let aa = ""
let b = 0
let y = 0
let a = 0
let remoteTypes = 0
let remoteType = 0
let speedB = 0
let x = 0
let speed = 0
let config = false
let speedA = 0
let pressed = false
input.onButtonPressed(Button.AB, () => {
    if (config) {
        radio.setGroup(1)
        radio.setTransmitPower(7)
        remoteType = x
        config = false
        led.unplot(x, 0)
    }
})
input.onButtonPressed(Button.A, () => {
    if (config) {
        led.unplot(x, 0)
        x += 1
        if (x >= remoteTypes) {
            x = 0
        }
    }
})
function remoteTypeC() {
    ax2 = input.acceleration(Dimension.X)
    ay2 = input.acceleration(Dimension.Y)
    az2 = input.acceleration(Dimension.Z)
    ax2 = (ax2 + 1024) / 8
    ay2 = (ay2 + 1024) / 8
    az2 = (az2 + 1024) / 8
    plotBar(1, ax2, 255)
    plotBar(2, ay2, 255)
    plotBar(3, az2, 255)
    let axx2 = quantize(ax2, 255)
    let ayy2 = quantize(ay2, 255)
    let azz2 = quantize(az2, 255)
    ba = input.buttonIsPressed(Button.A)
    bb2 = input.buttonIsPressed(Button.B)
    bab = input.buttonIsPressed(Button.AB)
    if (ayy2 < 3 && !(ba) && !(bb2) && !(bab)) {
        forward()
    } else if (!(bb2) && !(bab) && (ayy2 < 3 || ba)) {
        left()
    } else if (!(ba) && !(bab) && (ayy2 < 3 || bb2)) {
        right()
    } else if (pressed && (ayy2 > 3 || bab)) {
        stop()
    }
}
function forward() {
    pressed = true
    speed = Math.max(speedA, speedB)
    speed = speed * 2 - speed / 2
    if (speed > 254) {
        speed = 254
    }
    speedA = speed
    speedB = speed
}
function left() {
    pressed = true
    speedA = speedA * 2 - speedA / 2
    if (speedA > 254) {
        speedA = 254
    }
    speedB = speedA / 60
    if (speedB < 1) {
        speedB = 1
    }
}
function right() {
    pressed = true
    speedA = speedB / 60
    if (speedA < 1) {
        speedA = 1
    }
    speedB = speedB * 2 - speedB / 2
    if (speedB > 254) {
        speedB = 254
    }
}
function stop() {
    pressed = false
    speedA = 1
    speedB = 1
    led.unplot(0, 0)
    led.unplot(4, 0)
    radio.sendString("000:000")
    basic.pause(10)
    radio.sendString("000:000")
    basic.pause(10)
    radio.sendString("000:000")
}
function remoteTypeB() {
    ax = input.acceleration(Dimension.X)
    ay = input.acceleration(Dimension.Y)
    az = input.acceleration(Dimension.Z)
    ax = (ax + 1024) / 8
    ay = (ay + 1024) / 8
    az = (az + 1024) / 8
    plotBar(1, ax, 255)
    plotBar(2, ay, 255)
    plotBar(3, az, 255)
    let axx = quantize(ax, 255)
    let ayy = quantize(ay, 255)
    let azz = quantize(az, 255)
    if (axx > 1 && axx < 5 && ayy < 3 && azz < 3) {
        forward()
    } else if (axx < 1 && ayy < 1 && azz < 3 || axx == 0 && ayy > 2 && ayy < 4 && azz < 3) {
        left()
    } else if (axx > 4 && ayy < 1 && azz < 3 || axx == 5 && ayy > 2 && ayy < 4 && azz < 3) {
        right()
    } else if (pressed && ayy > 2 && axx < 3 && azz < 2) {
        stop()
    }
}
function remoteTypeA() {
    if (input.buttonIsPressed(Button.AB)) {
        forward()
    } else if (input.buttonIsPressed(Button.A)) {
        left()
    } else if (input.buttonIsPressed(Button.B)) {
        right()
    } else if (pressed) {
        stop()
    }
}
let ax = 0
let ax2 = 0
let ay = 0
let ay2 = 0
let az = 0
let az2 = 0
y = 0
config = true
remoteTypes = 3
remoteType = 0
config = true
pressed = false
speedA = 1
speedB = 1
speedA = 1
speedB = 1
function quantize(value: number, high: number) {
    let seg = high / 6
    if (value > seg * 5) {
        return 5
    } else if (value > seg * 4) {
        return 4
    } else if (value > seg * 3) {
        return 3
    } else if (value > seg * 2) {
        return 2
    } else if (value > seg * 2) {
        return 1
    } else {
        return 0
    }
}
function plotBar(xB: number, value: number, high: number) {
    let seg2 = high / 6
    if (value > seg2 * 5) {
        led.plot(xB, 0)
        led.plot(xB, 1)
        led.plot(xB, 2)
        led.plot(xB, 3)
        led.plot(xB, 4)
    } else if (value > seg2 * 4) {
        led.unplot(xB, 0)
        led.plot(xB, 1)
        led.plot(xB, 2)
        led.plot(xB, 3)
        led.plot(xB, 4)
    } else if (value > seg2 * 3) {
        led.unplot(xB, 0)
        led.unplot(xB, 1)
        led.plot(xB, 2)
        led.plot(xB, 3)
        led.plot(xB, 4)
    } else if (value > seg2 * 2) {
        led.unplot(xB, 0)
        led.unplot(xB, 1)
        led.unplot(xB, 2)
        led.plot(xB, 3)
        led.plot(xB, 4)
    } else if (value > seg2 * 2) {
        led.unplot(xB, 0)
        led.unplot(xB, 1)
        led.unplot(xB, 2)
        led.unplot(xB, 3)
        led.plot(xB, 4)
    } else {
        led.unplot(xB, 0)
        led.unplot(xB, 1)
        led.unplot(xB, 2)
        led.unplot(xB, 3)
        led.unplot(xB, 4)
    }
}
basic.forever(() => {
    if (config) {
        led.toggle(x, 0)
        basic.pause(300)
    }
    if (!(config)) {
        if (remoteType == 0) {
            remoteTypeA()
        }
        if (remoteType == 1) {
            remoteTypeB()
        }
        if (remoteType == 2) {
            remoteTypeC()
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
    }
})

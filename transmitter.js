let pressed = false
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(() => {
    if (input.buttonIsPressed(Button.AB)) {
        pressed = true
        radio.sendString("AB")
        led.unplot(1, 0)
        led.plot(2, 0)
        led.unplot(3, 0)
    } else if (input.buttonIsPressed(Button.A)) {
        pressed = true
        radio.sendString("A")
        led.plot(1, 0)
        led.unplot(2, 0)
        led.unplot(3, 0)
    } else if (input.buttonIsPressed(Button.B)) {
        pressed = true
        radio.sendString("B")
        led.unplot(1, 0)
        led.unplot(2, 0)
        led.plot(3, 0)
    } else if (pressed) {
        pressed = false
        radio.sendString("--")
        led.unplot(1, 0)
        led.unplot(2, 0)
        led.unplot(3, 0)
    }
    basic.pause(100)
})

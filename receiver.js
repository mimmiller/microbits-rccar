let b = 0
let a = 0
radio.onDataPacketReceived(({ receivedString }) => {
    led.toggle(2, 2)
    let aa = receivedString.substr(0, 3)
    let bb = receivedString.substr(4, 7)
    console.log("aa'" + aa + "' bb '" + bb + "'")
    a = parseInt(aa)
    b = parseInt(bb)
    pins.servoSetPulse(AnalogPin.P0, a * 3000)
    pins.servoSetPulse(AnalogPin.P1, b * 3000)
    led.plotBrightness(0, 0, a)
    led.plotBrightness(4, 0, b)
    if (a == 0 && b == 0) {
        led.unplot(2, 2)
    }
})
pins.servoSetPulse(AnalogPin.P0, 0)
pins.servoSetPulse(AnalogPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 1)
radio.setGroup(1)

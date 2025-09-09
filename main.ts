input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P16, 0)
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P16, 90)
})
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.ShowString("Pozdravljen", 2, 0)
I2C_LCD1602.ShowString("Luka", 5, 1)
I2C_LCD1602.BacklightOn()
basic.pause(5000)
pins.servoWritePin(AnalogPin.P16, 0)
pins.digitalWritePin(DigitalPin.P5, 0)
let motion = 0
basic.forever(function () {
    serial.writeValue("x", pins.digitalReadPin(DigitalPin.P15))
    if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        pins.digitalWritePin(DigitalPin.P5, 1)
    }
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        pins.digitalWritePin(DigitalPin.P5, 0)
    }
})
basic.forever(function () {
    basic.pause(5000)
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P2,
    true,
    true,
    true
    )
    if (dht11_dht22.readDataSuccessful()) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Temp: " + dht11_dht22.readData(dataType.temperature) + " C", 0, 0)
        I2C_LCD1602.ShowString("Hum:  " + dht11_dht22.readData(dataType.humidity) + " %", 0, 1)
    }
})

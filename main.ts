function SucheIdKommen (Id: number) {
    for (let Index = 0; Index <= id_list.length; Index++) {
        if (id_list[Index] == Id) {
            return Index
        }
    }
    id_list.push(Id)
    return id_list.length
}
radio.onReceivedNumber(function (receivedNumber) {
    Uhrzeit = PCF85063TP.getTime()
    datum = PCF85063TP.getDate()
    pos = SucheId(receivedNumber)
    listKommenZeit[pos] = Uhrzeit
    listDatum[pos] = datum
})
function loading () {
    OLED12864_I2C.circle(
    64,
    32,
    32,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    24,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    16,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    8,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    4,
    1
    )
    OLED12864_I2C.circle(
    64,
    32,
    2,
    1
    )
    OLED12864_I2C.clear()
}
function SucheId (Id: number) {
    for (let Index2 = 0; Index2 <= id_list.length; Index2++) {
        if (id_list[Index2] == Id) {
            return Index2
        }
    }
    id_list.push(Id)
    listGehenZeit.push("0")
    listKommenZeit.push("0")
    return id_list.length - 1
}
input.onButtonPressed(Button.A, function () {
    if (AnzeigeNr == 0) {
        AnzeigeNr = id_list.length - 1
    } else {
        AnzeigeNr += -1
    }
})
input.onButtonPressed(Button.AB, function () {
    if (1 == Menu) {
        Menu = 0
    } else {
        Menu = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (AnzeigeNr == id_list.length - 1) {
        AnzeigeNr = 0
    } else {
        AnzeigeNr += 1
    }
})
function OLED () {
    OLED12864_I2C.showString(
    3,
    1,
    "Id:" + id_list[AnzeigeNr],
    1
    )
    OLED12864_I2C.showString(
    3,
    2,
    "Kommen:" + listKommenZeit,
    1
    )
    OLED12864_I2C.showString(
    3,
    3,
    "Gehen: " + listGehenZeit[AnzeigeNr] + " ",
    1
    )
    OLED12864_I2C.showString(
    3,
    4,
    "Datum: " + listDatum[AnzeigeNr],
    1
    )
    OLED12864_I2C.showString(
    3,
    5,
    "Gelesene Nummern: " + id_list.length,
    1
    )
    OLED12864_I2C.showString(
    3,
    6,
    "Anzeige Nummer: " + convertToText(AnzeigeNr),
    1
    )
}
function OLED2 () {
    OLED12864_I2C.showString(
    3,
    1,
    "Id:" + Id,
    1
    )
    OLED12864_I2C.showString(
    3,
    2,
    "Kommen:" + listKommenZeit,
    1
    )
    OLED12864_I2C.showString(
    3,
    3,
    "Gehen: " + Uhrzeit + " ",
    1
    )
    OLED12864_I2C.showString(
    3,
    4,
    "Datum: " + datum,
    1
    )
    OLED12864_I2C.showString(
    3,
    5,
    "Gelesene Nummern: " + id_list.length,
    1
    )
    OLED12864_I2C.showString(
    3,
    6,
    "                  ",
    1
    )
}
let Id = 0
let Menu = 0
let AnzeigeNr = 0
let listKommenZeit: string[] = []
let pos = 0
let datum = ""
let Uhrzeit = ""
let listDatum: string[] = []
let id_list: number[] = []
let listGehenZeit: string[] = []
radio.setGroup(1)
serial.redirectToUSB()
listGehenZeit = []
OLED12864_I2C.init(60)
OLED12864_I2C.zoom(false)
OLED12864_I2C.invert(true)
MFRC522.Init(
DigitalPin.C9,
DigitalPin.C8,
DigitalPin.C7,
DigitalPin.P0
)
id_list = []
listDatum = []
loading()
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
led.plot(1, 1)
basic.forever(function () {
    Id = MFRC522.testID()
    serial.writeValue("x", Id)
    if (Id != 0) {
        Uhrzeit = PCF85063TP.getTime()
        datum = PCF85063TP.getDate()
        pos = SucheId(Id)
        listGehenZeit[pos] = Uhrzeit
    }
    if (Menu == 1) {
        OLED()
    } else {
        OLED2()
    }
})

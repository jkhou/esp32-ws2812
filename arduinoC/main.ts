
enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LINE {
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}

enum BTN {
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="A+B"
    AB
}

enum IO {
    //% block="D2"
    D2,
    //% block="D3"
    D3,
    //% block="D4"
    D4,
    //% block="D7"
    D7,
    //% block="D8"
    D8,
    //% block="D9"
    D9
}


//% color="#AA278D" iconWidth=50 iconHeight=40
namespace oled12864 {


    //% block="设置颜色2 [COLOR]" blockType="command"
    //% COLOR.shadow="colorPalette"     
    export function setColor2(parameter: any, block: any) {
        // let color = parameter.COLOR.code;    
        Generator.addObject(`myoled`, `uint32_t`, `color=${parameter.COLOR.code};`);
        Generator.addObject(`myoled6`, `uint32_t`, `color_black = 0x000000;`);
    }


    
    //% block="show [STR] on the [IO] line" blockType="command"
    //% IO.shadow="dropdownRound" IO.options="IO" IO.defl="IO.D2"
    //% STR.shadow="range" STR.params.min=0 STR.params.max=64 STR.defl=64
    export function initRGB(parameter: any, block: any) {
        let str = parameter.STR.code
        let io = parameter.IO.code
        Generator.addInclude('oled12864', '#include <DFRobot_NeoPixel.h>');
        Generator.addObject(`myoled2`, `DFRobot_NeoPixel`, `neoPixel;`);
        Generator.addObject(`myoled3`, `int`, `num=${str};`);
        Generator.addObject(`myoled4`, `char`, `matrix[64]`);

        Generator.addSetup(`myoled.begin`, `neoPixel.begin(${io}, ${str});`);
        // Generator.addCode(`myoled.setCursorLine(${io});\n\tmyoled.printLine(${str});`);
    }


    export function getBuiltinFunc_() {
        return [
            {matrix: "0101011111111110111000100"},
            {matrix: "0000001010011100010000000"},
            {matrix: "0010001110101010010000100"},
            {matrix: "0010000100101010111000100"},
            {matrix: "0010001000111110100000100"}
        ]
    }

    //% block="初次设置点阵 [MT]" blockType="command"
    //% MT.shadow="matrix" MT.params.row=8 MT.params.column=8 MT.defl="0101011111111110111000100"
    //% MT.params.builtinFunc="getBuiltinFunc_" 
    export function setMatrix(parameter: any, block: any) {
        let matrix = parameter.MT.code;
        Generator.addCode(`char matrix[] = "${matrix}";`);
        Generator.addCode(`for (int i=0; i<num; i++) {\n\tif (matrix[i] == '1') {\n\t\tneoPixel.setRangeColor(i, i, color);\n\t}
            else {
                neoPixel.setRangeColor(i, i, color_black);
            }}`)    
    }

    //% block="再次设置点阵 [MT]" blockType="command"
    //% MT.shadow="matrix" MT.params.row=8 MT.params.column=8 MT.defl="0101011111111110111000100"
    //% MT.params.builtinFunc="getBuiltinFunc_" 
    export function setMatrix2(parameter: any, block: any) {
        let matrix = parameter.MT.code;
        Generator.addCode(`matrix = "${matrix}";`);
        Generator.addCode(`for (int i=0; i<num; i++) {\n\tif (matrix[i] == '1') {\n\t\tneoPixel.setRangeColor(i, i, color);\n\t}\n}`)    
    }

    //% block="设置亮度 [STR]" blockType="command"
    //% STR.shadow="range" STR.params.min=0 STR.params.max=255 STR.defl=255
    export function setLight(parameter: any, block: any) {
        let str = parameter.STR.code
        Generator.addCode(`neoPixel.setBrightness(${str});`);
    }



}

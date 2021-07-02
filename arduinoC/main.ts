
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


//% color="#1EBF1B" iconWidth=50 iconHeight=40
namespace otaUpdate {
    //% block="start OTA Connection with ESP32 [STR]" blockType="hat"
    //% STR.shadow="string" STR.defl=myCoCube
    export function otaConfig(parameter: any, block: any) {
        let str = parameter.STR.code;
        Generator.addInclude('addMDNSHeader', `#include <ESPmDNS.h>`);
        Generator.addInclude('addWifiUdpHeader', `#include  <WiFiUdp.h>`);
        Generator.addInclude('addOTAHeader', `#include <ArduinoOTA.h>`);

        Generator.addSetupMainTop("OTA config", 
        `Serial.begin(115200);\n\tSerial.println("正在启动...");\n\tWiFi.mode(WIFI_STA);\n\tWiFi.begin(ssid, password);\n\twhile (WiFi.waitForConnectResult() != WL_CONNECTED) {\n\t\tSerial.println("启动失败! 正在重启...");\n\t\tdelay(5000);\n\t\tESP.restart();\n\t}\n\n\t//设置esp名称\n\tArduinoOTA.setHostname(${str});\n\tArduinoOTA.onStart([]() {\n\t\tString type;\n\t\tif (ArduinoOTA.getCommand() == U_FLASH)\n\t\t\ttype = "sketch";\n\t\telse // U_SPIFFS\n\t\t\ttype = "filesystem";\n\t\t// NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()\n\t\tSerial.println("开始更新 " + type);\n\t});\n\tArduinoOTA.onEnd([]() {\n\t\tSerial.println("End");\n\t});\n\tArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {\n\t\tSerial.printf("Progress: %u%%", (progress / (total / 100)));});\n\tArduinoOTA.onError([](ota_error_t error) {\n\t\tSerial.printf("Error[%u]: ", error);\n\t\tif (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");\n\t\telse if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");\n\t\telse if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");\n\t\telse if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");\n\t\telse if (error == OTA_END_ERROR) Serial.println("End Failed");\n\t});\n\tArduinoOTA.begin();\n\n\tSerial.print("我的IP地址为: ");\n\tSerial.println(WiFi.localIP());`);
        
    }

    //% block="config wifi with [STR1] and [STR2]" blockType="command"
    //% STR1.shadow="string" STR1.defl=IDesignLab
    //% STR2.shadow="string" STR2.defl=yongshan.xxfd!
    export function wifiConfig(parameter: any, block: any) {
        let str1 = parameter.STR1.code;
        let str2 = parameter.STR2.code;
        Generator.addInclude('addWifiHeader', `#include <WiFi.h>`);
        Generator.addObject(`setUser`, `const char* ssid`, `= ${str1};`);
        Generator.addObject(`setPassword`, `const char* password`, `= ${str2};`);
    }

    //% block="start OTA connection" blockType="command"
    export function otaBegin(parameter: any, block: any) {
        Generator.addCode(`ArduinoOTA.handle();`);
    }
}

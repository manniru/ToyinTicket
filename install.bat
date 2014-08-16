cd C:\Users\Mannir\git\ToyinTicket\target\phonegap-build
@ECHO OFF
SET /p ip=Enter Client IP Address:
CALL adb disconnect %ip%
CALL adb connect %ip%
CALL adb shell am force-stop com.toyin.ticket
CALL adb shell pm uninstall -k com.toyin.ticket
adb install ToyinTicket.apk
ECHO Finished Install
TIMEOUT /t 5
CALL adb shell am start -a android.intent.action.MAIN -n com.toyin.ticket/.Main
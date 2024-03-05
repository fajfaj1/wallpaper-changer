' color = InputBox("Valid values are: black_and_white, black, white, yellow, orange, red, purple, magenta, green, teal, and blue.", "What color would you like your wallpaper to be?")
' If color = "" Then
'     WScript.Quit
' End If

query = InputBox("Wallpaper query", "What would you like to search for?")

Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\Ignacy Pêka³a\Projects\Tools\daily-wallpaper"
shell.Run "node . " + query
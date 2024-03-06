Set objFSO = CreateObject("Scripting.FileSystemObject")

query = InputBox("What would you like to have on your wallpaper?", "Wallpaper query", "landscape", vbQuestion + vbOKCancel)
if(query = "") then
    MsgBox "No query provided, exiting", vbOKOnly + vbExclamation
    WScript.Quit
end if

Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = objFSO.GetParentFolderName(WScript.ScriptFullName)
shell.Run "node . " + query
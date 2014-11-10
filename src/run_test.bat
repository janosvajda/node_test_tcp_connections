@echo off
for /L %%a in (1,1,100) do (
   start "" /w /b "node" "tcpclient.js" "id" %%a
)
pause
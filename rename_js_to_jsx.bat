@echo off
for /r "src" %%f in (*.js) do (
    ren "%%f" "%%~nf.jsx"
) 
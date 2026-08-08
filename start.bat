@echo off
title SitesLink - Servidor Local

echo.
echo  ============================================
echo   SitesLink - Servidor Local
echo  ============================================
echo.

:: Verifica se a porta 3000 ja esta em uso e mata o processo
for /f "tokens=5" %%p in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo  Porta 3000 em uso pelo processo %%p. Encerrando...
    taskkill /PID %%p /F >nul 2>&1
    echo  Processo %%p encerrado.
    echo.
)

:: Detecta o IP da rede Wi-Fi / Ethernet ativa
set "IP="
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "169.254"') do (
    if not defined IP (
        for /f "tokens=*" %%b in ("%%a") do set "IP=%%b"
    )
)

if not defined IP (
    echo  [ERRO] Nenhum IP de rede encontrado.
    echo  Verifique sua conexao Wi-Fi ou Ethernet.
    pause
    exit /b 1
)

echo  Seu IP na rede: %IP%
echo.
echo  --------------------------------------------
echo   Acesse no celular (mesma rede Wi-Fi):
echo.
echo   http://%IP%:3000
echo.
echo   Paginas:
echo   /cris-doces/
echo   /ulisses-informatica/
echo   /sitio-mendes/
echo   /william-automecanica/
echo   /erick-estillo/
echo  --------------------------------------------
echo.
echo  Pressione Ctrl+C para parar o servidor.
echo.

npx http-server . -a 0.0.0.0 -p 3000 -c-1

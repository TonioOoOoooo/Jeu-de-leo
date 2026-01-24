@echo off
set BRANCHE_MAIN=main

echo ==========================================
echo ETAPE 2 : MERGE VERS MAIN ET PUSH
echo ==========================================

:: 1. Demande de la branche à fusionner
echo Quelle branche viens-tu de tester et valider ?
set /p BRANCHE_UPDATE="Nom de la branche a fusionner : "

:: 2. Retour sur Main
echo [1/4] Basculement sur %BRANCHE_MAIN%...
git checkout %BRANCHE_MAIN%

:: 3. Mise à jour du Main local
echo [2/4] Mise a jour du main local...
git pull origin %BRANCHE_MAIN%

:: 4. Fusion
echo [3/4] Fusion de %BRANCHE_UPDATE% vers %BRANCHE_MAIN%...
git merge %BRANCHE_UPDATE%

:: 5. Envoi
echo [4/4] Envoi vers GitHub...
git push origin %BRANCHE_MAIN%

echo.
echo ==========================================
echo SUCCES !
echo ==========================================
echo.
pause
@echo off
set BRANCHE_MAIN=main

echo ==========================================
echo ETAPE 1 : RECUPERATION ET TEST
echo ==========================================

:: 1. Sauvegarde locale
echo [1/6] Sauvegarde des modifications locales (git stash)...
git stash

:: 2. Recuperation des infos distantes pour voir les nouvelles branches
echo [2/6] Mise a jour de la liste des branches (git fetch)...
git fetch origin --prune

:: 3. Affichage et Choix de la branche
echo.
echo Voici les branches distantes disponibles :
echo ------------------------------------------
git branch -r | findstr /v "HEAD" | findstr /v "%BRANCHE_MAIN%"
echo ------------------------------------------
echo.
set /p BRANCHE_UPDATE="Nom de la branche a tester (ex: update-claude) : "

:: 4. Basculement
echo.
echo [3/6] Basculement sur la branche %BRANCHE_UPDATE%...
git checkout %BRANCHE_UPDATE%
git pull origin %BRANCHE_UPDATE%

:: 5. Dependances
echo [4/6] Installation des dependances (npm install)...
call npm install

:: 6. Test
echo [5/6] Lancement du serveur...
echo.
echo ---------------------------------------------------
echo Note le nom de la branche (%BRANCHE_UPDATE%),
echo tu en auras besoin pour le fichier 2.
echo.
echo Ctrl+C pour arreter le serveur quand tu as fini.
echo ---------------------------------------------------
npm run dev
pause
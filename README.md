# OpenAI Image Generation Web App Demo mit Open-SaaS

Eine kleine Demo basierend auf Open-SaaS.

Das Tutorial ist auf YouTube: [Link](https://www.youtube.com/@derddima)

Über eine Eingabemaske können verschiedene Einstellungen vorgenommen werden mit welchen dann die OpenAI images.generate API aufgerufen wird. Das Erzeugte Bild wird heruntergeladen, abgelegt und per eigener API zur Verfügung gestellt. 

Das Projekt basiert auf [OpenSaas](https://opensaas.sh) und [Wasp](https://wasp-lang.dev).

Die für die App relevanten Codeanteile befinden sich im Verzeichnis: app/src/draw

## Start

Um die Anwendung lokal zu starten muss [Wasp](https://wasp-lang.dev) installiert sein. 
Im Anwendungsverzeichnis dann in das app/ Verzeichnis wecheln und jeweils in eigenem Terminal Fenstern folgende Befehle ausführen:
1. `wasp start db` Startet die Datenbank
2. `wasp db migrate-dev` Nur beim aller ersten Start der Anwendung oder bei Änderungen am Prisma Shema. Die Datenbank wird eingerichtet.
3. `wasp start` Startet zwei node Instanzen, einmal für das Frontend und einmal für das Backend.

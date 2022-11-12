# product-app
vollständige demo-app bestehend aus backend und frontend. die app beinhaltet user-registrierung und eine einfache verwaltung von produkten. zweck der app ist die verwendung und das zusammenspiel der aktuell modernsten web-frameworks und technologien (JS-basiert) zu demonstrieren. 
 
BACKEND:


    Techstack:
  
      NestJS
     
      postgres (docker container)
      
      Prisma (Datensynchronisation, ORM, ...),
      
      argon2+passport-jwt (token management),
      
      class-validator (parameter validdierung)


  > ACHTUNG: migrationsskripte enthalten zum teil unix-commands, daher in einem UNIX terminal wie z.b. git bash oder auf einem unixbasierten system ausführen.


    0.) pakete installieren
    
    1.) .env file erstellen und umgebungsvariablen setzen

        > cp .env-example .env
    
    2.) docker postgres container starten

        > docker compose up product-db -d
   
    3.) migrationsskripte ausführen

        > yarn db:dev:restart
    
    4.) server starten

         > yarn start:dev
    
    5.) prisma studio starten (optional - es kann auch z.b. PgAdmin verwendet werden)

        > npx prisma studio
        
        
        
        
 FRONTEND:
 
    Techstack:
    
        - Angular 13  (framework)
        
        - Tailwind CSS (styling)
  
  
    0.) npm packages installieren

        > yarn install

    1.) frontend starten

        > yarn start

    2.) Browser starten und

        http://localhost:4200 aufrufen

    3.) Neuen Benutzer registrieren

    4.) Produkte anlegen, bearbeiten, löschen usw

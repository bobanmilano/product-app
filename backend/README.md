
Verwendeter Technologiestack: 

- NestJS (backend), 
- postgres (docker container)
- Prisma (Datensynchronisation, ORM, ...), 
- argon2+passport-jwt (token management), 
- class-validator (parameter validation) 


ACHTUNG: migrationsskripte enthalten zum teil unix-commands, daher 
in einer linux shell wie z.b. git bash oder auf einem unixbasierten system ausführen. 

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

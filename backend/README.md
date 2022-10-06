
Verwendeter Technologiestack: 

- NestJS (backend), 
- postgres (docker container)
- Prisma (Datenpersistenz, ORM, ...), 
- argon2+passport-jwt (token management), 
- class-validator (parameter validation) 


ACHTUNG: migrationsskripte enthalten zum teil unix-commands, daher 
in einer linux shell wie z.b. git bash oder auf einem unixbasierten system ausführen. 

 1.) docker postgres container starten  
 
	> docker compose up product-db -d
	
	
2.) migrationsskripte ausführen

	> yarn db:dev:restart
	
	
3.) server starten	

	> yarn db:dev
	
	
4.) prisma studio starten (optional - es kann auch z.b. PgAdmin verwendet werden)
	
	> npx prisma studio

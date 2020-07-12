## todo
1. Build local file saving as well
2. role based access setting
3. field validation discuss and finalize

4. Deploy as soon as possible( Find the deploying platform first- Heroku??)
- Check and fix npm vulnarabilities - done but recheck once deployed
- turn image transformations on and add more optimizations once deployed and hosted
- Configure sendgrid mail to other mode once deployed?? The maximum limit of sendgrid??
5. Testing
5. making mail noreply
6. Change email button href in the .env and add twitter link


## done
- Complete mail sending after discussing with oshan/ ruchira aiyala
- Project update
- Project get
- Project delete soft delete?
- Fixed name folder paths of cloudinary
- Finish register
- Finish login
- Decouple mailsender abstract and impl logic
- Comment all files
- Create a email template for inviting users
- Finish invite
- Create project

## restrictions
- Email- sendgrid - 100 mails per day
- Images - cloudinary ~ 200 image uploads per day(with transformations)

## docker commands
- to rebuild the server image
	```bash
	docker build -t sasnaka-sansada .
	```
- to run the db and server together(uncommenting the last line of the dockerfile)
  ```bash
	docker-compose up
	```
- to run db and server interactively
 ```bash
	docker-compose run --service-ports db -d
  docker-compose run --service-ports sasnaka-backend
	```
- to exit containers
```bash
	docker-compose down
	```

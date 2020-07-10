## todo
- making mail noreply
- Change email button href in the .env and add twitter link
- Configure sendgrid mail to other mode once deployed?? The maximum limit of sendgrid??
- Deploy as soon as possible( Find the deploying platform first- Heroku??)
- Check and fix npm vulnarabilities
- turn image transformations on once deployed and hosted
- role based access setting
- field validation discuss and finalize
- Build local file saving as well

## done
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

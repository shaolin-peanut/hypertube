stop-docker:
	docker stop $$(docker ps -aq)

clear-images:
	docker rmi $$(docker images -aq)

clear-containers:
	docker rm $$(docker ps -aq)

clear-volumes:
	docker volume rm $$(docker volume ls -q)
.PHONY: all image copy package clean

all: package

image:
	docker build --tag amazonlinux:nodejs .

copy:
	rsync -av --progress src/ build --exclude node_modules

package: copy image
	docker run --rm --volume ${PWD}/build:/build amazonlinux:nodejs npm install --production

clean:
	rm -r build/node_modules
	docker rmi --force amazonlinux:nodejs

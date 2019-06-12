# FLUX MAIL
Aplicación para administración de correo electrónico de FLUX

Versión actual: 1.0.0

## Tecnologías utilizadas:
- node.js 6.11 LTS
- npm 4.5.0
- jspm 0.16.45
- gulp 3.9.1

## Generación de ejecutable de la aplicación
El ejecutable de la aplicación se la realiza mediante la construcción de una imagen de Docker.

Pasos:
1.- Instalar node si es necesario, hacerlo solo la primera vez. En Linux, ejecutar el siguiente comando:
> `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
> `source ~/.bashrc`
> `nvm install --lts`

2.- Descargarse el proyecto:
>`git clone ssh://git@proyectos:7999/flux/fwk-flux-mail.git`

3.- Instalar las librerías globales del proyecto, ejecutar solo la primera vez:
> `npm set registry http://svr-mj0359sd:8181/repository/npm-all/`
> `npm install -g npm@4.5.0`
> `npm install -g jspm@0.16.45`
> `npm install -g gulp@3.9.1`

4.- Compilar el proyecto:
> `npm install`
> `npm run build` 

5.- Construir la imagen Docker. Para construir la imagen Docker del proyecto, ejecutar el siguiente comando:
>`docker build -t cfavorita/fwk-flux-mail:1.0.0 .`
Cambiar el 1.0.0 por la version correspondiente del proyecto

6.- Una vez generada la imagen, se puede levantar el servidor node con la aplicacion ejecutando el siguiente comando:
>`docker run -d --restart unless-stopped --name fwk-flux-mail -e NODE_ENV='pru' -p 3000:3000 cfavorita/fwk-flux-mail:1.0.0`
- Cambiar la variable de entorno NODE_ENV segun el ambiente de la aplicacion, los valores posibles son 'dev', 'pru' y 'pro' para Desarrollo, pruebas y producción respectivamente.
- Cambiar el puerto de la aplicación según sea necesario.

7.- Se puede guardar la imagen en formato tar, utilizamos el siguiente comando:
>`docker save -o fwk-flux-mail.tar cfavorita/fwk-flux-mail:1.0.0`

8.- Se puede cargar la imagen en formato tar al docker system utilizando el siguiente comando:
>`docker load -i fwk-flux-mail.tar`

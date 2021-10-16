FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY frontend/*.html /usr/share/nginx/html/
COPY frontend/*.css /usr/share/nginx/html/
COPY frontend/*.ttf /usr/share/nginx/html/
COPY frontend/*.js /usr/share/nginx/html/
COPY frontend/img/* /usr/share/nginx/html/img/
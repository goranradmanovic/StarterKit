StarterKit for fast frontend development
========================================

## Directory structure

```
root/
	production/
		public/
			index.html
		views/
			*.html
		compiled/  -- Output compiled html files
			**/
				*.html
		assets
			css/
				style.min.css
			js/
				main.min.js
			images/
				*.jpg, *.jpeg, *.png, *.gif, *.ico .ect
			icons/
				*.svg
			data/*json
	gulp/
		*.js
	src/
		sass/
			0-tools/
				*.sass, *.scss
			1-base
				*.sass, *.scss
			2-modules/
				*.sass, *scss
			3-sections/
				*.sass, *.scss
			4-layouts/
				*.sass, *.scss
			style.sass
		js/
			controllers/
				*.js
			factory/
				*js
			filters/
				*js
			main.js
		images/
			*.jpg, *.jpeg, *.png, *.gif, *.ico .ect		
		templates/
			includes/
				*pug
			partials/
				*pug
			index.pug
		views/
			*pug
		data/*json
```

### Gulp packages (manual install in the terminal)

1. Install gulp in the project npm install gulp --save-dev
2. Install sass in the project npm install gulp-sass --save-dev
3. Install autoprefixer in the project npm install gulp-autoprefixer --save-dev
4. Install jade in the project npm install gulp-jade --save-dev
5. Install browserSync in the project npm install browser-sync --save-dev
6. Install imagemin in the project npm install gulp-imagemin --save-dev
7. Install concat in the project npm install gulp-concat --save-dev
8. Install uglify in the project npm install gulp-uglify --save-dev
9. Install plumber in the project npm install gulp-plumber --save-dev

### Gulp packages (automatic install in the terminal from package.json file)

1. npm install


### Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc.

```shell
$ gulp
```
### File browser optimzation

This will minify and optimize all images.

```shell
$ gulp imagemin
```
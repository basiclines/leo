var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;
var replace = require('gulp-replace');
var jsdoc = require('jsdoc-api');

function createTable(source) {
	let table = ''
	let doc = jsdoc.explainSync({ files: [source] })

	let header = function() {
		return `| Method/Property | Params  | Description  |
| :----------- | :----------- | :------------ |
`
	}

	let row = function(info) {
		return `| ${info.name} | ${info.params} | ${info.description} |
`
	}

	let explodeParams = function(params) {
		return params.reduce(function(buffer, item, idx) {
			return buffer += `${item.name} *&lt;${item.type.names[0]}&gt;*${(idx < params.length - 1) ? ', ' : ''}`
		}, '')
	}

	table += header()

	doc.forEach(function(block) {
		if (block.description) {
			let info = {
				name: `**.${block.name}${(block.kind == 'function') ? '()' : ''}**`,
				params: (block.params) ? explodeParams(block.params) : '',
				description: block.description
			}
			table += row(info)
		}
	})

	return table
}

gulp.task('minify-js', function() {
	return gulp.src('dist/leo.js')
		.pipe(uglify())
		.pipe(rename('leo.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('docs', function() {
	let listTable = createTable('src/list.js', )
	let elementTable = createTable('src/element.js', )
	let objectTable = createTable('src/object.js', '')

	gulp.src(['readme.template'])
	.pipe(replace('{{ list_table }}', listTable))
	.pipe(replace('{{ element_table }}', elementTable))
	.pipe(replace('{{ object_table }}', objectTable))
	.pipe(rename('README.md'))
	.pipe(gulp.dest('./'));
});
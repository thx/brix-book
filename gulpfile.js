let gulp = require('gulp')
let gutil = require('gulp-util')
let cache = require('gulp-cached')
let debug = (title) => {
    return require('gulp-debug')({
        title
    })
}
let shell = require('gulp-shell')

function onFileChange(event) {
    gutil.log('File ' + gutil.colors.green(event.path) + ' was ' + event.type + ', running tasks...')
}

gulp.task('doc:loader', function() {
    var title = this.seq.slice(-1)[0]
    var globs = ['../brix-loader/README.md']
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-loader'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})
gulp.task('doc:base', function() {
    var title = this.seq.slice(-1)[0]
    var globs = ['../brix-base/README.md']
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-base'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})

gulp.task('doc:event', function() {
    var title = this.seq.slice(-1)[0]
    var globs = ['../brix-event/README.md']
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-event'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})

gulp.task('doc:components', function() {
    var title = this.seq.slice(-1)[0]
    var globs = [
        '../brix-components/src/**/README.md',
        '../brix-components/src/**/demo.html',
        '../brix-components/src/**/examples.md',
        '../brix-components/src/**/examples.html'
    ]
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-components'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})
gulp.task('doc:release', function() {
    var title = this.seq.slice(-1)[0]
    var globs = ['../brix-release/CHANGELOG.md']
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-release'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})

gulp.task('doc:release', function() {
    var title = this.seq.slice(-1)[0]
    var globs = ['../brix-release/CHANGELOG.md']
    var doit = function() {
        gulp.src(globs).pipe(cache(title)).pipe(debug(title))
            .pipe(gulp.dest('../brix-book/brix-release'))
    }
    doit()
    gulp.watch(globs, function(event) {
        onFileChange(event)
        doit()
    })
})

// --------------------

let cmds = [
    'gitbook build',
    'git status',
    'git add .',
    'git commit -m "update"',
    'git push origin master; git push gitlab master;',
    'git checkout gh-pages',
    'cp -fr _book/* ./',
    'git status',
    'git add .',
    'git commit -m "update"',
    'git push origin gh-pages; git push gitlab gh-pages;',
    'git checkout master'
]
gulp.task('publish', shell.task(cmds, {
    verbose: true,
    ignoreErrors: true
}))

gulp.task('doc', ['doc:loader', 'doc:base', 'doc:event', 'doc:components', 'doc:release'])
gulp.task('default', ['doc'])
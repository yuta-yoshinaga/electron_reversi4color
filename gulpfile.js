var gulp = require("gulp");
var winInstaller = require('electron-windows-installer');
gulp.task('create_windows_installer', function(done) {
  winInstaller({
    appDirectory: './Reversi4Color-win32-x64',
    outputDirectory: './windows_installer',
    iconUrl: 'file://' + __dirname + + 'resources/app/images/favicon.ico'
  }).then(done).catch(done);
});
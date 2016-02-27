(function() {
  var Avrgirl = require('avrgirl-arduino');

  var avrgirl = new Avrgirl({
    board: 'leonardo',
    debug: true
  });

  function handleFileSelect(e) {
    e.preventDefault();

    var file = fileInput.files[0];
    var filepath = file.path;

    if (!file.name.match('\.hex$')) {
      console.log('not a hex');
      return;
    }

    screenText.textContent = "uploading...";

    avrgirl.flash(file.path, function (error) {
      if (error) {
        console.error(error);
        screenText.textContent = "oops, try again!";
      } else {
        console.info('done.');
        screenText.textContent = "upload complete!";
      }
    });
  }

  function handleFileChange(e) {
    e.preventDefault();

    var file = fileInput.files[0];
    var filename = file.name;

    var fileNameInfo = document.getElementById('filename');
    fileNameInfo.innerHTML = filename;
  }

  var fileInput = document.getElementById('fileInput');
  var uploadBtn = document.getElementById('uploadBtn');
  var screenText = document.getElementById('screenText');

  uploadBtn.addEventListener('click', handleFileSelect, false);
  fileInput.addEventListener('change', handleFileChange, false);
})();

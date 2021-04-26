function converterParaBase64() {
    var files = document.getElementById('input_file').files;
    if(files.length > 0) {
        var file = files[0];
        var readerFile = new FileReader()
        readerFile.onload = loadEvent => {
            var stringBase64 = loadEvent.target.result;
            var ImageElemet = document.createElement('img');
            ImageElemet.src = stringBase64;
            ImageElemet.id = 'base64holder';
            document.getElementById('idImageHolder').innerHTML = ImageElemet.outerHTML;
            document.getElementById('input_inv').value = `${stringBase64}`
        }
        readerFile.readAsDataURL(file);
    }
}
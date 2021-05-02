function convBase64() {
    const files = document.getElementById('input_file').files;
    if(files.length > 0) {
        const file = files[0];
        const readerFile = new FileReader()
        readerFile.onload = loadEvent => {
            const stringBase64 = loadEvent.target.result;
            const ImageElemet = document.createElement('img');
            ImageElemet.src = stringBase64;
            ImageElemet.id = 'base64holder';
            document.getElementById('idImageHolder').innerHTML = ImageElemet.outerHTML;
            document.getElementById('input_base64').value = `${stringBase64}`
        }
        readerFile.readAsDataURL(file);
    }
}
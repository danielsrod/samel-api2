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
        }
        readerFile.readAsDataURL(file);
    }
}


function enviar() {

    var nome = document.getElementById('input_nome').value;
    var telefone = document.getElementById('input_telefone').value;
    var cpf = document.getElementById('input_cpf').value;
    var email = document.getElementById('input_email').value;
    var base64 = document.getElementById('base64holder').src;

    console.log('usuario cadastrado');
    console.log(nome);
    console.log(telefone);
    console.log(cpf);
    console.log(email);
    console.log(base64);

}
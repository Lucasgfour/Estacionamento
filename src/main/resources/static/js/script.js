var codigo = 0;

var tabela = document.getElementById("tabDados");
var Ano = new Date().getFullYear();

var TxPlaca = document.getElementById("TxPlaca");
var TxModelo = document.getElementById("TxModelo");
var TxMarca = document.getElementById("TxMarca");
var TxAno = document.getElementById("TxAno");
var TxValor = document.getElementById("TxValor");

function changeYear() {
    ano = parseInt(TxAno.value);
    if(ano > this.Ano) {
        TxAno.value = this.Ano;
    }
}

function changeValor() {
    vlr = parseFloat(TxValor.value);
    if(vlr < 0) {
        TxValor.value = 0;
    }
}

function mostrarAlerta(Msg) {
    document.getElementById("cadMsgTxt").innerHTML = Msg;
    document.getElementById("btnClMsg").click();
}

function listar() {
	for(var i = this.tabela.rows.length -1; i >= 0 ; i--) { this.tabela.deleteRow(i); }
    fetch('/Veiculo', {method:'GET'})
    .then(response => response.json())
    .then(data => {
        if(data.condicao) {
            for(const registro of data.resultado) {
				var row = this.tabela.insertRow(-1);
				row.insertCell(-1).innerHTML = registro.placa;
				row.insertCell(-1).innerHTML = registro.modelo;
				row.insertCell(-1).innerHTML = registro.marca;
                row.insertCell(-1).innerHTML = registro.ano;
                row.insertCell(-1).innerHTML = 'R$ ' + registro.valor;
                row.insertCell(-1).innerHTML = '' +
                '<div class="btn-group" role="group">' + 
                '    <button type="button text-center" onclick="openCadastro(' + registro.codigo + ')" class="btn btn-secondary"><i class="bi bi-pencil-fill"></i></button>' +
                '    <button type="button text-center" onclick="deletar(' + registro.codigo + ')" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>' +
                '</div>';
            }
        } else {
            alert(data.mensagem);
        }
    });
}

function openCadastro(id) {
    this.codigo = id;
    atualizarCad();
}

function deletar(codigo) {
    if(confirm("Tem certeza que deseja deletar ?")) {
        fetch('/Veiculo/' + codigo, {method:'DELETE'})
        .then(response => response.json())
	    .then(data => {
            if(data.condicao) {
                listar();
            } else {
                alert(data.mensagem);
            }
        });
    }
}

function atualizarCad() {
    if(this.codigo == 0) {
        this.TxPlaca.value = "";
        this.TxModelo.value = "";
        this.TxMarca.value = "";
        this.TxAno.value = new Date().getFullYear();
        this.TxValor.value = "0";
    } else {
        fetch('/Veiculo/' + this.codigo, {method:'GET'})
        .then(response => response.json())
	    .then(data => {
            if(data.condicao) {
                var obj = data.resultado;
                document.getElementById("TxPlaca").value = obj.placa;
                document.getElementById("TxModelo").value = obj.modelo;
                document.getElementById("TxMarca").value = obj.marca;
                document.getElementById("TxAno").value = obj.ano;
                document.getElementById("TxValor").value = obj.valor;
                document.getElementById("btnCancela").click();
            } else {
                alert(data.mensagem);
            }
        });
    }
}

function salvar() {
    var data = JSON.stringify(VeiculoToJSON());
    var metodo = getMethod();
    fetch('/Veiculo', {method: metodo, body: data, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }})
    .then(response => response.json())
    .then(data => {
        if(data.condicao) {
            listar();
			document.getElementById("btnNovo").click();
        } else {
            mostrarAlerta(data.mensagem);
        }
    })
    .catch(erro => {
        mostrarAlerta(erro);
    });
}

function getMethod() {
	if(this.codigo > 0) { return 'PUT'; } else { return 'POST'; }
}

function VeiculoToJSON() {
    var saida = {
        codigo: this.codigo,
        placa: TxPlaca.value,
        modelo: TxModelo.value,
        marca: TxMarca.value,
        ano: parseInt(TxAno.value),
        valor: parseFloat(TxValor.value)
    }
    return saida;
}
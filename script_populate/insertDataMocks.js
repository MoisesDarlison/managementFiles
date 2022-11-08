const fs = require('fs')
const path = require('path')

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function buildUserData(person) {
    const newPerson = Object.values(person)

    newPerson.splice(11, 1)
    newPerson.push(Object.values(person[11]))

    return newPerson.toString().replaceAll(',', ';')
}


function getDataClient() {
    const defaultName = makeId(4) + makeId(5) + makeId(5)
    const person = {
        nome: defaultName,
        mae: defaultName + makeId(4),
        pai: defaultName + makeId(5),
        site: "http://" + makeId(19) + ".com.br",
        email: defaultName + "@" + makeId(4) + ".com.br",
        senha: "aQ4&!P#k4",
        rg: "BR-" + Math.floor(Math.random() * 20),
        cpf: Math.floor(Math.random() * 999) + "." + Math.floor(Math.random() * 999) + "." + Math.floor(Math.random() * 999) + "-" + Math.floor(Math.random() * 99),
        telefone: "(" + Math.floor(Math.random() * 99) + ") 9" + Math.floor(Math.random() * 9999) + "-" + Math.floor(Math.random() * 9999),
        celular: "(" + Math.floor(Math.random() * 99) + ") 9" + Math.floor(Math.random() * 9999) + "-" + Math.floor(Math.random() * 9999),
        dataNascimento: new Date().toLocaleString(),
        endereco: {
            cep: Math.floor(Math.random() * 99999) + "-" + Math.floor(Math.random() * 999),
            logradouro: makeId(12),
            complemento: makeId(12),
            numero: Math.floor(Math.random() * 999),
            bairro: makeId(12),
            cidade: makeId(18),
            estado: makeId(2),
            estadoSigla: makeId(2)
        },
        usuario: defaultName.replace(" ", ""),
        altura: (Math.random() * 1.8).toFixed(2),
        peso: Math.floor(Math.random() * 200)
    }

    return buildUserData(person)
}

function getHeader() {
    return 'nome;mae;pai;site;email;senha;rg;cpf;telefone;celular;dataNascimento;usuario;altura;peso;cep;logradouro;complemento;numero;bairro;cidade;estado;estadoSigla;'
}

async function main() {
    const pathConcat = path.join(__dirname, '..', 'files', 'data.txt')
    try {
        fs.appendFile(pathConcat, getHeader() + '\n', (err) => {
            if (err) throw err;
        });
        for (let index = 0; index < 150000; index++) {
            fs.appendFileSync(pathConcat, getDataClient() + '\n', (err) => {
                if (err) throw err;
            });
            if (index % 500 == 0) {
                console.log(index)
            }
        }
    } catch (error) {
        console.log(error.message);
    }

    const data = fs.readFileSync(pathConcat, { encoding: 'utf8', flag: 'r' });


    console.log(data);
}

main()
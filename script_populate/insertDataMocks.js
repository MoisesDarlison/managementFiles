const fs = require('fs')
const path = require('path')

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function buildUserData(person, separateWords = ';') {
    let buildPerson = ''
    Object.values(person).forEach(element => {
        if (typeof element !== 'object') {
            buildPerson += element + separateWords
        } else {
            buildPerson += buildUserData(element, separateWords)
        }
    });
    return buildPerson
}

function getBuildedHeader(person, separateWords = ';') {
    let buildHeader = ''
    for (const [key, value] of Object.entries(person)) {
        if (typeof value !== 'object') {
            buildHeader += key + separateWords
        } else {
            buildHeader += getBuildedHeader(value, separateWords)
        }
    }

    return buildHeader
}



function getDataClient(idCount = 'x') {
    const defaultName = makeId(4) + makeId(5) + makeId(5)
    const person = {
        nome: defaultName,
        mae: defaultName + makeId(4),
        pai: defaultName + makeId(5),
        site: "http://" + makeId(19) + ".com.br",
        email: defaultName + "@" + makeId(4) + ".com.br",
        idCount: idCount,
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

    return person
}


async function main() {
    const pathConcat = path.join(__dirname, '..', 'files', 'data.txt')
    try {
        fs.appendFileSync(pathConcat, getBuildedHeader(getDataClient(), '|') + '\n', (err) => {
            if (err) throw err;
        });
        for (let index = 0; index < 230000; index++) {
            fs.appendFileSync(pathConcat, buildUserData(getDataClient(index), '|') + '\n', (err) => {
                if (err) throw err;
            });
            if (index % 500 == 0) {
                console.log(index)
            }
        }
        console.log("Finished", index)
    } catch (error) {
        console.log(error.message);
    }

}

main()
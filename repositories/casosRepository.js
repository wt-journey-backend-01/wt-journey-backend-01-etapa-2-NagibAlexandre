const { v4: uuidv4 } = require('uuid');

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "a2c4e19d-7f0b-4d55-9b3c-123456789abc",
        titulo: "roubo a residência",
        descricao: "Furto ocorrido às 03:15 da manhã do dia 15/06/2024 em uma casa no bairro Jardim América. Roupas e eletrônicos foram levados.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "b3d5f2e0-9a1c-4f88-8d7e-23456789abcd",
        titulo: "tráfico de drogas",
        descricao: "Operação policial resultou na apreensão de entorpecentes na região central da cidade no dia 10/07/2024.",
        status: "solucionado",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "c4e6a3f1-0b2d-5e99-9e8f-3456789abcde",
        titulo: "fraude bancária",
        descricao: "Denúncia de transações financeiras suspeitas realizadas em conta corrente de uma agência local em 01/07/2024.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "d5f7b402-1c3e-6fab-af90-456789abcdef",
        titulo: "vandalismo",
        descricao: "Pichação e danos ao patrimônio público ocorridos na praça central durante a madrugada de 05/07/2024.",
        status: "solucionado",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    }
];

function findAllCasos() {
    return casos;
}

function findCasoById(id) {
    return casos.find(caso => caso.id === id)
}

function createCaso(data) {

    const newCase = {
        id: uuidv4(),
        ...data
    }
    casos.push(newCase);

    return newCase;
}

function updateCaso(id, data) {
    const index = casos.findIndex(caso => caso.id === id);
    casos[index] = { ...casos[index], ...data };

    return casos[index];
}

function removeCaso(id) {
    const index = casos.findIndex(caso => caso.id === id);

    casos.splice(index, 1);
    return true;
}

module.exports = {
    findAllCasos,
    findCasoById,
    createCaso,
    updateCaso,
    removeCaso

}
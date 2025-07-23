const { v4: uuidv4 } = require('uuid');

const agentes = [
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        nome: "Carlos Silva",
        dataDeIncorporacao: "2005-03-15",
        cargo: "inspetor"
    },
    {
        id: "9f8c2a9d-0b4a-4a8d-8b7a-c0f95f61e0e9",
        nome: "Ana Souza",
        dataDeIncorporacao: "2010-07-22",
        cargo: "delegado"
    },
    {
        id: "d3b07384-d9a6-4a6a-85b1-4c79e4986d33",
        nome: "Mariana Oliveira",
        dataDeIncorporacao: "2015-01-10",
        cargo: "inspetor"
    },
    {
        id: "6c7a4e04-2104-4fcd-a43d-4b3f1f4a777d",
        nome: "José Pereira",
        dataDeIncorporacao: "2000-11-30",
        cargo: "delegado"
    },
    {
        id: "83a4c2ea-69f5-45c3-b9f3-88e5978bdbaf",
        nome: "Luciana Costa",
        dataDeIncorporacao: "2018-06-05",
        cargo: "inspetor"
    }

];

function findAllAgentes() {
    return agentes;
}

function findAgenteById(id) {
    return agentes.find(agente => agente.id === id);
}

function createAgente(data) {
    const novoAgente = {
        id: uuidv4(),
        ...data
    };
    agentes.push(novoAgente);
    return novoAgente;
}

function updateAgente(id, data) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes[index] = { ...agentes[index], ...data };
        return agentes[index];
    }
    return null;
}

function removeAgente(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    findAllAgentes,
    findAgenteById,
    createAgente,
    updateAgente,
    removeAgente
};

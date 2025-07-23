const agentesRepository = require('../repositories/agentesRepository');

function validarAgente(data, isPatch = false) {
  const errors = [];

  if (!isPatch || data.nome !== undefined) {
    if (!data.nome || typeof data.nome !== 'string') {
      errors.push("O campo 'nome' é obrigatório e deve ser uma string.");
    }
  }

  if (!isPatch || data.dataDeIncorporacao !== undefined) {
    if (!data.dataDeIncorporacao || !/^\d{4}-\d{2}-\d{2}$/.test(data.dataDeIncorporacao)) {
      errors.push("Campo 'dataDeIncorporacao' deve seguir a formatação 'YYYY-MM-DD'.");
    }
  }

  if (!isPatch || data.cargo !== undefined) {
    if (!data.cargo || typeof data.cargo !== 'string') {
      errors.push("O campo 'cargo' é obrigatório e deve ser uma string.");
    }
  }

  return errors;
}

function getAllAgentes(req, res) {
  let agentes = agentesRepository.findAllAgentes();

  const { cargo, sort } = req.query;

  if (cargo) {
    agentes = agentes.filter(a => a.cargo === cargo);
  }

  if (sort) {
    if (sort === 'dataDeIncorporacao') {
      agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (sort === '-dataDeIncorporacao') {
      agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    } else {
      return res.status(400).json({
        status: 400,
        message: "Parâmetros inválidos",
        errors: ["O parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'."]
      });
    }
  }

  return res.status(200).json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findAgenteById(id);

  if (!agente) {
    return res.status(404).json({
      status: 404,
      message: `Agente com id '${id}' não encontrado.`
    });
  }

  return res.status(200).json(agente);
}

function createAgente(req, res) {
  const data = req.body;

  const errors = validarAgente(data);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const novoAgente = agentesRepository.createAgente(data);

  return res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
  const { id } = req.params;
  const data = req.body;

  const agenteExistente = agentesRepository.findAgenteById(id);
  if (!agenteExistente) {
    return res.status(404).json({
      status: 404,
      message: `Agente com id '${id}' não encontrado.`
    });
  }

  const errors = validarAgente(data);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const agenteAtualizado = agentesRepository.updateAgente(id, data);

  return res.status(200).json(agenteAtualizado);
}

function patchAgente(req, res) {
  const { id } = req.params;
  const data = req.body;

  const agenteExistente = agentesRepository.findAgenteById(id);
  if (!agenteExistente) {
    return res.status(404).json({
      status: 404,
      message: `Agente com id '${id}' não encontrado.`
    });
  }

  const errors = validarAgente(data, true);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const agenteAtualizado = { ...agenteExistente, ...data };
  agentesRepository.updateAgente(id, agenteAtualizado);

  return res.status(200).json(agenteAtualizado);
}

function deleteAgente(req, res) {
  const { id } = req.params;

  const agenteExistente = agentesRepository.findAgenteById(id);
  if (!agenteExistente) {
    return res.status(404).json({
      status: 404,
      message: `Agente com id '${id}' não encontrado.`
    });
  }

  agentesRepository.removeAgente(id);

  return res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente
};

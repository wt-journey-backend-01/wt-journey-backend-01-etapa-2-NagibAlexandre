const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

function validarCaso(data, isPatch = false) {
  const errors = [];

  if (!isPatch || data.titulo !== undefined) {
    if (!data.titulo || typeof data.titulo !== 'string') {
      errors.push("O campo titulo é obrigatório e deve ser uma string.");
    }
  }

  if (!isPatch || data.descricao !== undefined) {
    if (!data.descricao || typeof data.descricao !== 'string') {
      errors.push("O campo descricao é obrigatório e deve ser uma string.");
    }
  }

  if (!isPatch || data.status !== undefined) {
    if (!['aberto', 'solucionado'].includes(data.status)) {
      errors.push("O campo status pode ser somente aberto ou solucionado.");
    }
  }

  if ('id' in data) {
    errors.push("O campo 'id' não pode ser alterado.");
  }

  if (!isPatch || data.agente_id !== undefined) {
    if (!data.agente_id || typeof data.agente_id !== 'string') {
      errors.push("O campo agente_id é obrigatório e deve ser uma string.");
    } else {
      const agente = agentesRepository.findAgenteById(data.agente_id);
      if (!agente) {
        errors.push(`Agente com id ${data.agente_id} não encontrado.`);
      }
    }
  }

  return errors;
}

function getAllCasos(req, res) {
  let casos = casosRepository.findAllCasos();

  const { agente_id, status, q } = req.query;

  if (agente_id) {
    casos = casos.filter(c => c.agente_id === agente_id);
  }

  if (status) {
    if (!['aberto', 'solucionado'].includes(status)) {
      return res.status(400).json({
        status: 400,
        message: "Parâmetros inválidos",
        errors: ["O parâmetro status pode ser somente aberto ou solucionado."]
      });
    }
    casos = casos.filter(c => c.status === status);
  }

  if (q) {
    const queryLower = q.toLowerCase();
    casos = casos.filter(c =>
      (c.titulo && c.titulo.toLowerCase().includes(queryLower)) ||
      (c.descricao && c.descricao.toLowerCase().includes(queryLower))
    );
  }

  return res.status(200).json(casos);
}

function getCasoById(req, res) {
  const { id } = req.params;
  const caso = casosRepository.findCasoById(id);
  if (!caso) {
    return res.status(404).json({
      status: 404,
      message: `Caso com id ${id} não encontrado.`
    });
  }
  return res.status(200).json(caso);
}

function createCaso(req, res) {
  const data = req.body;

  const errors = validarCaso(data);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const novoCaso = casosRepository.createCaso(data);

  return res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const { id } = req.params;
  const data = req.body;

  const casoExistente = casosRepository.findCasoById(id);
  if (!casoExistente) {
    return res.status(404).json({
      status: 404,
      message: `Caso com id ${id} não encontrado.`
    });
  }

  const errors = validarCaso(data);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const casoAtualizado = casosRepository.updateCaso(id, data);

  return res.status(200).json(casoAtualizado);
}

function patchCaso(req, res) {
  const { id } = req.params;
  const data = req.body;

  const casoExistente = casosRepository.findCasoById(id);
  if (!casoExistente) {
    return res.status(404).json({
      status: 404,
      message: `Caso com id ${id} não encontrado.`
    });
  }

  const errors = validarCaso(data, true);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors
    });
  }

  const casoAtualizado = casosRepository.updateCaso(id, { ...casoExistente, ...data });

  return res.status(200).json(casoAtualizado);
}

function deleteCaso(req, res) {
  const { id } = req.params;

  const casoExistente = casosRepository.findCasoById(id);
  if (!casoExistente) {
    return res.status(404).json({
      status: 404,
      message: `Caso com id ${id} não encontrado.`
    });
  }

  casosRepository.removeCaso(id);

  return res.status(204).send();
}

function getAgenteDoCaso(req, res) {
  const { caso_id } = req.params;
  const caso = casosRepository.findCasoById(caso_id);
  if (!caso) {
    return res.status(404).json({
      status: 404,
      message: `Caso com id ${caso_id} não encontrado.`
    });
  }

  const agente = agentesRepository.findAgenteById(caso.agente_id);
  if (!agente) {
    return res.status(404).json({
      status: 404,
      message: `Agente responsável com id ${caso.agente_id} não encontrado.`
    });
  }

  return res.status(200).json(agente);
}

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
  getAgenteDoCaso
};

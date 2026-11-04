const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/jsonDatabase");

const arquivo = "fornecedores.json";
const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/", (req, res) => {
  const fornecedores = readData(arquivo);

  res.render("fornecedor/index", {
    fornecedores,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.get("/cadastro", (req, res) => {
  res.render("fornecedor/form-fornecedor", {
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/", (req, res) => {
  const fornecedores = readData(arquivo);
  const nome = sanitizeText(req.body.nome);
  const cnpj = sanitizeText(req.body.cnpj);
  const telefone = sanitizeText(req.body.telefone);

  if (!nome || nome.length < 2) {
    return res.redirect("/fornecedor/cadastro?error=Informe%20um%20nome%20válido.");
  }

  if (!cnpj || cnpj.length < 11) {
    return res.redirect("/fornecedor/cadastro?error=Informe%20um%20CNPJ%20válido.");
  }

  if (!telefone || telefone.length < 10) {
    return res.redirect("/fornecedor/cadastro?error=Informe%20um%20telefone%20válido.");
  }

  const novoId = fornecedores.length ? Math.max(...fornecedores.map((fornecedor) => fornecedor.id)) + 1 : 1;
  fornecedores.push({ id: novoId, nome, cnpj, telefone });
  writeData(arquivo, fornecedores);

  res.redirect("/fornecedor?success=Fornecedor%20cadastrado%20com%20sucesso!");
});

router.get("/editar/:id", (req, res) => {
  const id = Number(req.params.id);
  const fornecedores = readData(arquivo);
  const fornecedor = fornecedores.find((item) => item.id === id);

  if (!fornecedor) {
    return res.redirect("/fornecedor?error=Fornecedor%20n%C3%A3o%20encontrado.");
  }

  res.render("fornecedor/editar", {
    fornecedor,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/editar/:id", (req, res) => {
  const id = Number(req.params.id);
  const fornecedores = readData(arquivo);
  const nome = sanitizeText(req.body.nome);
  const cnpj = sanitizeText(req.body.cnpj);
  const telefone = sanitizeText(req.body.telefone);
  const fornecedor = fornecedores.find((item) => item.id === id);

  if (!fornecedor) {
    return res.redirect("/fornecedor?error=Fornecedor%20n%C3%A3o%20encontrado.");
  }

  if (!nome || nome.length < 2) {
    return res.redirect(`/fornecedor/editar/${id}?error=Informe%20um%20nome%20válido.`);
  }

  if (!cnpj || cnpj.length < 11) {
    return res.redirect(`/fornecedor/editar/${id}?error=Informe%20um%20CNPJ%20válido.`);
  }

  if (!telefone || telefone.length < 10) {
    return res.redirect(`/fornecedor/editar/${id}?error=Informe%20um%20telefone%20válido.`);
  }

  fornecedor.nome = nome;
  fornecedor.cnpj = cnpj;
  fornecedor.telefone = telefone;

  writeData(arquivo, fornecedores);
  res.redirect("/fornecedor?success=Fornecedor%20atualizado%20com%20sucesso!");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number(req.params.id);
  const fornecedores = readData(arquivo);
  const fornecedorExiste = fornecedores.some((fornecedor) => fornecedor.id === id);

  if (!fornecedorExiste) {
    return res.redirect("/fornecedor?error=Fornecedor%20n%C3%A3o%20encontrado.");
  }

  const fornecedoresAtualizados = fornecedores.filter((fornecedor) => fornecedor.id !== id);
  writeData(arquivo, fornecedoresAtualizados);

  return res.redirect("/fornecedor?success=Fornecedor%20removido%20com%20sucesso!");
});

module.exports = router;

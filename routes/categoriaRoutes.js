const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/jsonDatabase");

const arquivo = "categorias.json";
const sanitizeText = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/", (req, res) => {
  const categorias = readData(arquivo);

  res.render("categorias/index", {
    categorias,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.get("/cadastro", (req, res) => {
  res.render("categorias/form-cadastro", {
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/", (req, res) => {
  const categorias = readData(arquivo);
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);

  if (!nome || nome.length < 2) {
    return res.redirect("/categorias/cadastro?error=Informe%20um%20nome%20válido.");
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect("/categorias/cadastro?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.");
  }

  const novoId = categorias.length ? Math.max(...categorias.map((categoria) => categoria.id)) + 1 : 1;
  categorias.push({ id: novoId, nome, descricao });
  writeData(arquivo, categorias);

  res.redirect("/categorias?success=Categoria%20cadastrada%20com%20sucesso!");
});

router.get("/excluir/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const categorias = readData(arquivo);
  const categoriaExiste = categorias.some((categoria) => categoria.id === id);

  if (!categoriaExiste) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  const categoriasAtualizadas = categorias.filter((categoria) => categoria.id !== id);
  writeData(arquivo, categoriasAtualizadas);

  return res.redirect("/categorias?success=Categoria%20removida%20com%20sucesso!");
});

router.get("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const categorias = readData(arquivo);
  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  res.render("categorias/editar", {
    categoria,
    success: req.query.success || "",
    error: req.query.error || ""
  });
});

router.post("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const categorias = readData(arquivo);
  const nome = sanitizeText(req.body.nome);
  const descricao = sanitizeText(req.body.descricao);
  const categoria = categorias.find((item) => item.id === id);

  if (!categoria) {
    return res.redirect("/categorias?error=Categoria%20n%C3%A3o%20encontrada.");
  }

  if (!nome || nome.length < 2) {
    return res.redirect(`/categorias/editar/${id}?error=Informe%20um%20nome%20válido.`);
  }

  if (!descricao || descricao.length < 3) {
    return res.redirect(`/categorias/editar/${id}?error=Informe%20uma%20descri%C3%A7%C3%A3o%20válida.`);
  }

  categoria.nome = nome;
  categoria.descricao = descricao;

  writeData(arquivo, categorias);
  res.redirect("/categorias?success=Categoria%20atualizada%20com%20sucesso!");
});

module.exports = router;

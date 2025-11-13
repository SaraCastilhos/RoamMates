document.addEventListener("DOMContentLoaded", () => {
  const nomePerfil = document.getElementById("nomePerfil");
  const emailPerfil = document.getElementById("emailPerfil");
  const bioPerfil = document.getElementById("bioPerfil");
  const inputFoto = document.getElementById("inputFoto");
  const fotoPerfil = document.getElementById("fotoPerfil");

  const listaInteresses = document.getElementById("listaInteresses");
  const novoInteresse = document.getElementById("novoInteresse");
  const btnAddInteresse = document.getElementById("btnAddInteresse");

  const viagensPassadas = document.getElementById("viagensPassadas");
  const viagensFuturas = document.getElementById("viagensFuturas");
  const addViagemPassada = document.getElementById("addViagemPassada");
  const addViagemFutura = document.getElementById("addViagemFutura");
  const btnAddPassada = document.getElementById("btnAddPassada");
  const btnAddFutura = document.getElementById("btnAddFutura");

  const listaComentarios = document.getElementById("listaComentarios");
  const comentarioTexto = document.getElementById("comentarioTexto");
  const btnEnviarComentario = document.getElementById("btnEnviarComentario");

  const btnSalvar = document.getElementById("btnSalvar");

  // ==== Carregar dados do usuário logado ====
  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!usuarioLogado) {
    alert("Nenhum usuário logado. Faça login primeiro!");
    window.location.href = "login.html";
    return;
  }

  // Carrega informações básicas
  nomePerfil.textContent = usuarioLogado.nome;
  emailPerfil.textContent = usuarioLogado.email;

  // Se houver dados adicionais, carrega
  bioPerfil.value = usuarioLogado.bio || "";
  fotoPerfil.src = usuarioLogado.foto || "/IMG/user-default.png";

  // Interesses
  if (usuarioLogado.interesses) renderTags(usuarioLogado.interesses);

  // Viagens
  if (usuarioLogado.viagensPassadas) renderList(viagensPassadas, usuarioLogado.viagensPassadas);
  if (usuarioLogado.viagensFuturas) renderList(viagensFuturas, usuarioLogado.viagensFuturas);

  // Comentários
  if (usuarioLogado.comentarios) renderComentarios(usuarioLogado.comentarios);

  // ==== Adicionar novo interesse ====
  btnAddInteresse.addEventListener("click", () => {
    const interesse = novoInteresse.value.trim();
    if (!interesse) return;

    usuarioLogado.interesses = usuarioLogado.interesses || [];
    usuarioLogado.interesses.push(interesse);
    novoInteresse.value = "";

    renderTags(usuarioLogado.interesses);
    salvarUsuario();
  });

  // ==== Adicionar viagem passada ====
  btnAddPassada.addEventListener("click", () => {
    const destino = addViagemPassada.value.trim();
    if (!destino) return;

    usuarioLogado.viagensPassadas = usuarioLogado.viagensPassadas || [];
    usuarioLogado.viagensPassadas.push(destino);
    addViagemPassada.value = "";

    renderList(viagensPassadas, usuarioLogado.viagensPassadas);
    salvarUsuario();
  });

  // ==== Adicionar viagem futura ====
  btnAddFutura.addEventListener("click", () => {
    const destino = addViagemFutura.value.trim();
    if (!destino) return;

    usuarioLogado.viagensFuturas = usuarioLogado.viagensFuturas || [];
    usuarioLogado.viagensFuturas.push(destino);
    addViagemFutura.value = "";

    renderList(viagensFuturas, usuarioLogado.viagensFuturas);
    salvarUsuario();
  });

  // ==== Upload da foto ====
  inputFoto.addEventListener("change", () => {
    const file = inputFoto.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      fotoPerfil.src = e.target.result;
      usuarioLogado.foto = e.target.result;
      salvarUsuario();
    };
    reader.readAsDataURL(file);
  });

  // ==== Salvar bio e demais informações ====
  btnSalvar.addEventListener("click", () => {
    usuarioLogado.bio = bioPerfil.value;
    salvarUsuario();
    alert("Perfil atualizado com sucesso!");
  });

  // ==== Adicionar comentário ====
  btnEnviarComentario.addEventListener("click", () => {
    const texto = comentarioTexto.value.trim();
    if (!texto) return;

    usuarioLogado.comentarios = usuarioLogado.comentarios || [];
    const novoComentario = {
      texto,
      data: new Date().toLocaleString("pt-BR")
    };
    usuarioLogado.comentarios.push(novoComentario);

    comentarioTexto.value = "";
    renderComentarios(usuarioLogado.comentarios);
    salvarUsuario();
  });

  // ==== Funções auxiliares ====
  function renderTags(tags) {
    listaInteresses.innerHTML = "";
    tags.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      listaInteresses.appendChild(li);
    });
  }

  function renderList(container, items) {
    container.innerHTML = "";
    items.forEach(i => {
      const li = document.createElement("li");
      li.textContent = i;
      container.appendChild(li);
    });
  }

  function renderComentarios(comentarios) {
    listaComentarios.innerHTML = "";
    comentarios.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${usuarioLogado.nome}</strong>: ${c.texto} <br><small>${c.data}</small>`;
      listaComentarios.appendChild(li);
    });
  }

  // ==== Salvar usuário no localStorage ====
  function salvarUsuario() {
    // Atualiza o usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // Atualiza a lista completa de usuários
    const idx = usuarios.findIndex(u => u.email === usuarioLogado.email);
    if (idx !== -1) {
      usuarios[idx] = usuarioLogado;
    } else {
      usuarios.push(usuarioLogado);
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
});

// =============================
// 👤 CONTROLE DE LOGIN 
// =============================

const usuarioAtivo = JSON.parse(localStorage.getItem('usuarioLogado'));
const nomeUsuario = document.getElementById('nomeUsuario');
const linkLogin = document.getElementById('linkLogin');
const usuarioLogadoEl = document.getElementById('usuarioLogado');
const btnSair = document.getElementById('btnSair');

if (usuarioAtivo) {
  nomeUsuario.textContent = `Olá, ${usuarioAtivo.nome.split(' ')[0]}!`;
  usuarioLogadoEl.style.display = 'flex';
  linkLogin.style.display = 'none';
} else {
  usuarioLogadoEl.style.display = 'none';
  linkLogin.style.display = 'inline';
}

btnSair?.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  alert('Você saiu da sua conta.');
  window.location.reload();
});
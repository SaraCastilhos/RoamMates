lucide.createIcons();

// ===== PEGAR USUÁRIO LOGADO =====
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const usuarioSpan = document.getElementById('usuarioLogado');
if (usuarioLogado) {
  usuarioSpan.textContent = '@' + usuarioLogado.nome.toLowerCase().replace(/\s+/g, '_');
} else {
  alert('Você precisa estar logado para acessar o chat.');
  window.location.href = 'login.html';
}

// ===== LISTA DE CONTATOS =====
const contatos = [
  { nome: "Selena Dias", usuario: "selena_dias", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
  { nome: "Lucas Ian", usuario: "lucas_ian", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { nome: "Ana S.", usuario: "ana_s", foto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe" },
  { nome: "Riana Anjos", usuario: "riana_anjos", foto: "https://randomuser.me/api/portraits/women/56.jpg" }
];

const listaContatos = document.getElementById('listaContatos');
contatos.forEach(contato => {
  const div = document.createElement('div');
  div.className = 'contato';
  div.innerHTML = `
    <img src="${contato.foto}" alt="${contato.nome}">
    <div>
      <h3>${contato.nome}</h3>
      <p>@${contato.usuario}</p>
    </div>
  `;
  div.onclick = () => abrirChat(contato);
  listaContatos.appendChild(div);
});

// ===== ABRIR CHAT =====
let contatoAtual = null;

function abrirChat(contato) {
  contatoAtual = contato;
  document.getElementById("nomeContato").textContent = contato.nome;
  document.getElementById("usuarioContato").textContent = "@" + contato.usuario;
  document.getElementById("fotoContato").src = contato.foto;

  document.querySelector(".chat").classList.add("ativo");
  document.querySelector(".lista").style.display = "none";

  carregarMensagens();
}

// ===== VOLTAR À LISTA =====
function voltarLista() {
  document.querySelector(".chat").classList.remove("ativo");
  document.querySelector(".lista").style.display = "flex";
}

// ===== ENVIAR MENSAGEM =====
const input = document.getElementById("mensagemInput");
const enviarBtn = document.getElementById("enviarBtn");
const mensagens = document.getElementById("mensagens");

enviarBtn.onclick = enviarMensagem;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensagem();
});

function enviarMensagem() {
  const texto = input.value.trim();
  if (!texto || !contatoAtual) return;

  const msg = { remetente: usuarioLogado.email, texto, data: new Date().toLocaleString() };
  salvarMensagem(contatoAtual.usuario, msg);

  mostrarMensagem(msg, true);
  input.value = "";
}

// ===== SALVAR MENSAGENS =====
function salvarMensagem(usuarioContato, mensagem) {
  const chave = `chat_${usuarioLogado.email}_${usuarioContato}`;
  const historico = JSON.parse(localStorage.getItem(chave)) || [];
  historico.push(mensagem);
  localStorage.setItem(chave, JSON.stringify(historico));
}

// ===== CARREGAR MENSAGENS =====
function carregarMensagens() {
  mensagens.innerHTML = '';
  const chave = `chat_${usuarioLogado.email}_${contatoAtual.usuario}`;
  const historico = JSON.parse(localStorage.getItem(chave)) || [];
  historico.forEach(msg => mostrarMensagem(msg, msg.remetente === usuarioLogado.email));
}

// ===== EXIBIR MENSAGEM =====
function mostrarMensagem(msg, enviada) {
  const div = document.createElement("div");
  div.className = "msg " + (enviada ? "enviada" : "recebida");
  div.textContent = msg.texto;
  mensagens.appendChild(div);
  mensagens.scrollTop = mensagens.scrollHeight;
}

// ===== BUSCA DE CONTATOS =====
const campoBusca = document.querySelector('.busca input');

campoBusca.addEventListener('input', () => {
  const termo = campoBusca.value.trim().toLowerCase();

  // Limpa a lista antes de mostrar o resultado filtrado
  listaContatos.innerHTML = '';

  // Filtra os contatos que combinam com o termo
  const filtrados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(termo) ||
    contato.usuario.toLowerCase().includes(termo)
  );

  // Exibe os contatos filtrados
  if (filtrados.length > 0) {
    filtrados.forEach(contato => {
      const div = document.createElement('div');
      div.className = 'contato';
      div.innerHTML = `
        <img src="${contato.foto}" alt="${contato.nome}">
        <div>
          <h3>${contato.nome}</h3>
          <p>@${contato.usuario}</p>
        </div>
      `;
      div.onclick = () => abrirChat(contato);
      listaContatos.appendChild(div);
    });
  } else {
    listaContatos.innerHTML = '<p style="text-align:center; color:#777;">Nenhum contato encontrado</p>';
  }
});

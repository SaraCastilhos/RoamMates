// =============================
// 🔍 BUSCA EM TEMPO REAL
// =============================

// Pega os elementos principais
const campoBusca = document.getElementById('campoBusca');
const listas = document.querySelectorAll('.listaDestinos');

const mensagemSemResultados = document.createElement('p');
mensagemSemResultados.textContent = 'Nenhum resultado encontrado 😢';
mensagemSemResultados.classList.add('sem-resultados');
mensagemSemResultados.style.display = 'none';
listas[0].parentNode.appendChild(mensagemSemResultados);

function filtrarDestinos() {
    const termo = campoBusca.value.trim().toLowerCase();
    let resultados = 0;

    listas.forEach(lista => {
        const cards = lista.querySelectorAll('.card');
        cards.forEach(card => {
            const nome = card.dataset.nome.toLowerCase();
            if (nome.includes(termo)) {
                card.style.display = 'block';
                resultados++;
            } else {
                card.style.display = 'none';
            }
        });
    });

    mensagemSemResultados.style.display = resultados === 0 ? 'block' : 'none';
}

campoBusca.addEventListener('input', filtrarDestinos);

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

    const botao = document.querySelectorAll('.add');
    botao.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.textContent = "✅ Amigos";
            btn.style.background = "#4CAF50";
            btn.disabled = true;
        });
    });

    const botoes = document.querySelectorAll('.entrar');
    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.textContent = "✅ Participando";
            btn.style.background = "#4CAF50";
            btn.disabled = true;
        });
    });

} else {
    usuarioLogadoEl.style.display = 'none';
    linkLogin.style.display = 'inline';

    const botao = document.querySelectorAll('.add');
    botao.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Cadastre-se para adicionar como amigo!');
        });
    });

    const botoes = document.querySelectorAll('.entrar');
    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Cadastre-se para participar de um grupo!');
        });
    });
}

btnSair?.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Você saiu da sua conta.');
    window.location.reload();
});

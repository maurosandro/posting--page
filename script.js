// Seletores - Entrada de dados
const form = document.querySelector('#form-post');
const tituloPost = document.querySelector('#titulo-post');
const conteudoPost = document.querySelector('#conteudo-post');

// Seletores - Saída de dados (Renderização)
const renderizadorTitulo = document.querySelector('#renderizador-titulo');
const renderizadorConteudo = document.querySelector('#renderizador-conteudo');
const cardPost = document.querySelector('#card-post');
const dataPost = document.querySelector('#data-post');

// Seletores - Feedback
const loading = document.querySelector('#loading');
const mensagemSucesso = document.querySelector('#mensagem-sucesso');
const mensagemErro = document.querySelector('#mensagem-erro');

// Função para formatar data
function formatarData() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

// Função para mostrar loading
function mostrarLoading() {
    loading.style.display = 'block';
    cardPost.style.display = 'none';
    mensagemSucesso.style.display = 'none';
    mensagemErro.style.display = 'none';
}

// Função para esconder loading
function esconderLoading() {
    loading.style.display = 'none';
}

// Função para mostrar mensagem de sucesso
function mostrarSucesso() {
    mensagemSucesso.style.display = 'block';
    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
    }, 3000);
}

// Função para mostrar mensagem de erro
function mostrarErro() {
    mensagemErro.style.display = 'block';
    setTimeout(() => {
        mensagemErro.style.display = 'none';
    }, 3000);
}

// Função para publicar o post
async function publicarPost(data) {
    try {
        // Mostrar loading
        mostrarLoading();

        // Fazer requisição POST
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        // Converter resposta para JSON
        const resultado = await response.json();
        
        // Esconder loading
        esconderLoading();

        // Renderizar o post
        renderizadorTitulo.innerHTML = resultado.title;
        renderizadorConteudo.innerHTML = resultado.body;
        dataPost.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/128/747/747310.png" width="18" height="18" alt="Calendário" style="vertical-align: middle; margin-right: 5px;">${formatarData()}`;
        
        // Mostrar card do post
        cardPost.style.display = 'block';
        
        // Mostrar mensagem de sucesso
        mostrarSucesso();

        // Scroll suave até o post renderizado
        cardPost.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Limpar formulário
        form.reset();

        console.log('Post publicado com sucesso:', resultado);

    } catch (error) {
        console.error('Erro ao publicar post:', error);
        esconderLoading();
        mostrarErro();
    }
}

// Event Listener - Submit do formulário
form.addEventListener('submit', (e) => {
    // Prevenir comportamento padrão do formulário
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (tituloPost.value.trim() === '' || conteudoPost.value.trim() === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Montar objeto data com os valores do formulário
    const data = {
        title: tituloPost.value,
        body: conteudoPost.value,
        userId: 1
    };

    // Publicar o post
    publicarPost(data);
});

// Event Listeners para os botões de ação (simulação)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-acao')) {
        const acao = e.target.textContent.trim();
        console.log(`Ação realizada: ${acao}`);
        
        // Feedback visual
        const btnOriginal = e.target.innerHTML;
        e.target.style.backgroundColor = '#667eea';
        e.target.style.color = 'white';
        
        setTimeout(() => {
            e.target.style.backgroundColor = '';
            e.target.style.color = '';
        }, 300);
    }
});

// Adicionar efeito de foco nos inputs
tituloPost.addEventListener('focus', () => {
    tituloPost.parentElement.style.transform = 'scale(1.01)';
    tituloPost.parentElement.style.transition = 'transform 0.3s ease';
});

tituloPost.addEventListener('blur', () => {
    tituloPost.parentElement.style.transform = 'scale(1)';
});

conteudoPost.addEventListener('focus', () => {
    conteudoPost.parentElement.style.transform = 'scale(1.01)';
    conteudoPost.parentElement.style.transition = 'transform 0.3s ease';
});

conteudoPost.addEventListener('blur', () => {
    conteudoPost.parentElement.style.transform = 'scale(1)';
});

// Log inicial
console.log('Sistema de postagem inicializado!');
console.log('API: https://jsonplaceholder.typicode.com/posts');
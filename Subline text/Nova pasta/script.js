// =====================================================
// AURA CLICKER
// =====================================================


// =====================================================
// VARIÁVEIS PRINCIPAIS
// =====================================================

let aura = 0;

let auraPorClique = 1;

let auraPorSegundo = 0;

let multiplicador = 1;

let cliques = 0;

let chanceCritico = 0;

let chanceDourada = 0;

let nivel = 1;


// =====================================================
// RENASCIMENTO
// =====================================================

let renascimentos = 0;

let multiplicadorRenascimento = 1;


// =====================================================
// PREÇOS
// =====================================================

let precoClique = 50;

let precoAuto = 100;

let precoCritico = 250;

let precoPoderoso = 500;

let precoAuto2 = 750;

let precoTurbo = 2000;

let precoMultiplicador = 5000;

let precoDourada = 10000;

let precoMega = 25000;

let precoCosmica = 100000;


// =====================================================
// ELEMENTOS HTML
// =====================================================

const quantidade =
    document.getElementById("quantidade");

const porClique =
    document.getElementById("porClique");

const porSegundo =
    document.getElementById("porSegundo");

const criticoTexto =
    document.getElementById("critico");

const cliquesTexto =
    document.getElementById("cliques");

const nivelNumero =
    document.getElementById("nivelNumero");

const botaoAura =
    document.getElementById("botaoAura");

const mensagem =
    document.getElementById("mensagem");


// =====================================================
// FORMATAR NÚMEROS
// =====================================================

function formatarNumero(numero) {

    return Math.floor(numero).toLocaleString("pt-BR");

}


// =====================================================
// MULTIPLICADOR TOTAL
// =====================================================

function multiplicadorTotal() {

    return multiplicador * multiplicadorRenascimento;

}


// =====================================================
// REQUISITO DO RENASCIMENTO
// =====================================================

function calcularRequisitoRenascimento() {

    /*
        Cada renascimento aumenta o custo.

        0 renascimentos = 1.000
        1 renascimento  = 10.000
        2 renascimentos  = 100.000
        3 renascimentos  = 1.000.000
        etc.
    */

    return 1000 * Math.pow(10, renascimentos);

}


// =====================================================
// ATUALIZAR TELA
// =====================================================

function atualizarTela() {

    quantidade.textContent =
        formatarNumero(aura);


    porClique.textContent =
        formatarNumero(auraPorClique);


    porSegundo.textContent =
        formatarNumero(auraPorSegundo);


    criticoTexto.textContent =
        Math.floor(chanceCritico * 100) + "%";


    cliquesTexto.textContent =
        formatarNumero(cliques);


    nivelNumero.textContent =
        nivel;


    // =================================================
    // MULTIPLICADORES
    // =================================================

    document.getElementById(
        "multiplicadorNivel"
    ).textContent =
        multiplicador + "x";


    document.getElementById(
        "multiplicadorRenascimento"
    ).textContent =
        multiplicadorRenascimento + "x";


    document.getElementById(
        "multiplicadorTotal"
    ).textContent =
        multiplicadorTotal() + "x";


    // =================================================
    // PREÇOS
    // =================================================

    document.getElementById(
        "precoClique"
    ).textContent =
        formatarNumero(precoClique);


    document.getElementById(
        "precoAuto"
    ).textContent =
        formatarNumero(precoAuto);


    document.getElementById(
        "precoCritico"
    ).textContent =
        formatarNumero(precoCritico);


    document.getElementById(
        "precoPoderoso"
    ).textContent =
        formatarNumero(precoPoderoso);


    document.getElementById(
        "precoAuto2"
    ).textContent =
        formatarNumero(precoAuto2);


    document.getElementById(
        "precoTurbo"
    ).textContent =
        formatarNumero(precoTurbo);


    document.getElementById(
        "precoMultiplicador"
    ).textContent =
        formatarNumero(precoMultiplicador);


    document.getElementById(
        "precoDourada"
    ).textContent =
        formatarNumero(precoDourada);


    document.getElementById(
        "precoMega"
    ).textContent =
        formatarNumero(precoMega);


    document.getElementById(
        "precoCosmica"
    ).textContent =
        formatarNumero(precoCosmica);


    // =================================================
    // RENASCIMENTO
    // =================================================

    const requisito =
        calcularRequisitoRenascimento();


    document.getElementById(
        "requisitoRenascimento"
    ).textContent =
        formatarNumero(requisito);


    document.getElementById(
        "renascimentos"
    ).textContent =
        renascimentos;


    document.getElementById(
        "bonusRenascimento"
    ).textContent =
        multiplicadorRenascimento + "x";


    // =================================================
    // SALVAR
    // =================================================

    salvarJogo();

}


// =====================================================
// CLICAR NA AURA
// =====================================================

botaoAura.addEventListener(
    "click",
    function(event) {

        let ganho =
            auraPorClique *
            multiplicadorTotal();


        cliques++;


        // =================================================
        // CRÍTICO
        // =================================================

        if (Math.random() < chanceCritico) {

            ganho *= 5;

            mostrarMensagem(
                "💥 CRÍTICO! 5X AURA!"
            );

        }


        // =================================================
        // AURA DOURADA
        // =================================================

        if (Math.random() < chanceDourada) {

            ganho *= 2;

            mostrarMensagem(
                "👑 AURA DOURADA! 2X!"
            );

        }


        aura += ganho;


        criarTexto(
            "+" +
            formatarNumero(ganho) +
            " AURA",
            event.clientX,
            event.clientY
        );


        verificarNivel();

        atualizarTela();

    }
);


// =====================================================
// TEXTO FLUTUANTE
// =====================================================

function criarTexto(texto, x, y) {

    const elemento =
        document.createElement("div");


    elemento.className =
        "pop";


    elemento.textContent =
        texto;


    elemento.style.left =
        x + "px";


    elemento.style.top =
        y + "px";


    document.body.appendChild(
        elemento
    );


    setTimeout(
        function() {

            elemento.remove();

        },
        800
    );

}


// =====================================================
// FUNÇÃO PARA COMPRAR MELHORIA
// =====================================================

function comprarMelhoria(
    preco,
    sucesso
) {

    if (aura >= preco) {

        aura -= preco;

        sucesso();

        atualizarTela();

    } else {

        mostrarMensagem(
            "❌ Aura insuficiente!"
        );

    }

}


// =====================================================
// 1 - FORÇA DO CLIQUE
// =====================================================

document.getElementById(
    "upgradeClique"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoClique,

            function() {

                auraPorClique += 1;

                precoClique =
                    Math.floor(
                        precoClique * 1.7
                    );

                mostrarMensagem(
                    "💪 Clique ficou mais forte!"
                );

            }

        );

    }
);


// =====================================================
// 2 - AURA AUTOMÁTICA
// =====================================================

document.getElementById(
    "upgradeAuto"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoAuto,

            function() {

                auraPorSegundo += 1;

                precoAuto =
                    Math.floor(
                        precoAuto * 1.8
                    );

                mostrarMensagem(
                    "🤖 +1 aura por segundo!"
                );

            }

        );

    }
);


// =====================================================
// 3 - CRÍTICO
// =====================================================

document.getElementById(
    "upgradeCritico"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoCritico,

            function() {

                chanceCritico += 0.05;

                precoCritico =
                    Math.floor(
                        precoCritico * 2
                    );

                mostrarMensagem(
                    "💥 +5% de crítico!"
                );

            }

        );

    }
);


// =====================================================
// 4 - CLIQUE PODEROSO
// =====================================================

document.getElementById(
    "upgradePoderoso"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoPoderoso,

            function() {

                auraPorClique += 5;

                precoPoderoso =
                    Math.floor(
                        precoPoderoso * 1.9
                    );

                mostrarMensagem(
                    "⚡ +5 aura por clique!"
                );

            }

        );

    }
);


// =====================================================
// 5 - SUPER AURA
// =====================================================

document.getElementById(
    "upgradeAuto2"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoAuto2,

            function() {

                auraPorSegundo += 10;

                precoAuto2 =
                    Math.floor(
                        precoAuto2 * 2
                    );

                mostrarMensagem(
                    "🔥 +10 aura por segundo!"
                );

            }

        );

    }
);


// =====================================================
// 6 - TURBO
// =====================================================

document.getElementById(
    "upgradeTurbo"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoTurbo,

            function() {

                auraPorSegundo += 25;

                precoTurbo =
                    Math.floor(
                        precoTurbo * 2.2
                    );

                mostrarMensagem(
                    "🚀 TURBO ATIVADO!"
                );

            }

        );

    }
);


// =====================================================
// 7 - MULTIPLICADOR
// =====================================================

document.getElementById(
    "upgradeMultiplicador"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoMultiplicador,

            function() {

                multiplicador++;

                precoMultiplicador =
                    Math.floor(
                        precoMultiplicador * 3
                    );

                mostrarMensagem(
                    "💎 +1x multiplicador!"
                );

            }

        );

    }
);


// =====================================================
// 8 - AURA DOURADA
// =====================================================

document.getElementById(
    "upgradeDourada"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoDourada,

            function() {

                chanceDourada += 0.10;

                precoDourada =
                    Math.floor(
                        precoDourada * 2.5
                    );

                mostrarMensagem(
                    "👑 +10% de Aura Dourada!"
                );

            }

        );

    }
);


// =====================================================
// 9 - MEGA CLIQUE
// =====================================================

document.getElementById(
    "upgradeMega"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoMega,

            function() {

                auraPorClique += 50;

                precoMega =
                    Math.floor(
                        precoMega * 2.5
                    );

                mostrarMensagem(
                    "🌟 MEGA CLIQUE!"
                );

            }

        );

    }
);


// =====================================================
// 10 - AURA CÓSMICA
// =====================================================

document.getElementById(
    "upgradeCosmica"
).addEventListener(
    "click",
    function() {

        comprarMelhoria(

            precoCosmica,

            function() {

                auraPorSegundo += 100;

                precoCosmica =
                    Math.floor(
                        precoCosmica * 3
                    );

                mostrarMensagem(
                    "☄️ AURA CÓSMICA!"
                );

            }

        );

    }
);


// =====================================================
// SISTEMA DE NÍVEIS
// =====================================================

function verificarNivel() {

    let novoNivel = 1;


    if (aura >= 100)
        novoNivel = 2;


    if (aura >= 500)
        novoNivel = 3;


    if (aura >= 2000)
        novoNivel = 4;


    if (aura >= 10000)
        novoNivel = 5;


    if (aura >= 50000)
        novoNivel = 6;


    if (aura >= 250000)
        novoNivel = 7;


    if (aura >= 1000000)
        novoNivel = 8;


    if (aura >= 10000000)
        novoNivel = 9;


    if (aura >= 100000000)
        novoNivel = 10;


    if (novoNivel > nivel) {

        nivel = novoNivel;

        multiplicador++;


        mostrarMensagem(
            "🔥 SUBIU PARA O NÍVEL " +
            nivel +
            "!"
        );

    }

}


// =====================================================
// AURA AUTOMÁTICA
// =====================================================

setInterval(
    function() {

        if (auraPorSegundo > 0) {

            aura +=
                auraPorSegundo *
                multiplicadorTotal();


            verificarNivel();

            atualizarTela();

        }

    },
    1000
);


// =====================================================
// RENASCIMENTO
// =====================================================

document.getElementById(
    "botaoRenascimento"
).addEventListener(
    "click",
    function() {

        const requisito =
            calcularRequisitoRenascimento();


        if (aura < requisito) {

            mostrarMensagem(
                "❌ Você precisa de " +
                formatarNumero(requisito) +
                " Aura para renascer!"
            );

            return;

        }


        const proximoBonus =
            multiplicadorRenascimento + 1;


        const confirmou =
            confirm(

                "♻️ RENASCIMENTO\n\n" +

                "Renascimento atual: " +
                renascimentos +
                "\n\n" +

                "Você perderá:\n" +
                "• Toda a Aura\n" +
                "• Melhorias\n" +
                "• Nível\n" +
                "• Multiplicadores normais\n\n" +

                "Você ganhará:\n" +
                "♻️ +1x multiplicador permanente\n\n" +

                "Seu multiplicador de renascimento irá para " +
                proximoBonus +
                "x.\n\n" +

                "Deseja continuar?"

            );


        if (!confirmou) {

            return;

        }


        // =================================================
        // RESET DA PARTIDA
        // =================================================

        aura = 0;

        auraPorClique = 1;

        auraPorSegundo = 0;

        multiplicador = 1;

        cliques = 0;

        chanceCritico = 0;

        chanceDourada = 0;

        nivel = 1;


        // =================================================
        // PREÇOS VOLTAM AO INÍCIO
        // =================================================

        precoClique = 50;

        precoAuto = 100;

        precoCritico = 250;

        precoPoderoso = 500;

        precoAuto2 = 750;

        precoTurbo = 2000;

        precoMultiplicador = 5000;

        precoDourada = 10000;

        precoMega = 25000;

        precoCosmica = 100000;


        // =================================================
        // AUMENTA O RENASCIMENTO
        // =================================================

        renascimentos++;

        multiplicadorRenascimento++;


        mostrarMensagem(
            "♻️ RENASCIMENTO #" +
            renascimentos +
            " REALIZADO! +" +
            multiplicadorRenascimento +
            "x!"
        );


        salvarJogo();

        atualizarTela();

    }
);


// =====================================================
// MENSAGENS
// =====================================================

function mostrarMensagem(texto) {

    mensagem.textContent =
        texto;


    setTimeout(
        function() {

            mensagem.textContent =
                "";

        },
        2000
    );

}


// =====================================================
// SALVAR JOGO
// =====================================================

function salvarJogo() {

    const dados = {

        aura,

        auraPorClique,

        auraPorSegundo,

        multiplicador,

        cliques,

        chanceCritico,

        chanceDourada,

        nivel,

        renascimentos,

        multiplicadorRenascimento,

        precoClique,

        precoAuto,

        precoCritico,

        precoPoderoso,

        precoAuto2,

        precoTurbo,

        precoMultiplicador,

        precoDourada,

        precoMega,

        precoCosmica

    };


    localStorage.setItem(
        "auraClickerSave",
        JSON.stringify(dados)
    );

}


// =====================================================
// CARREGAR JOGO
// =====================================================

function carregarJogo() {

    const salvo =
        localStorage.getItem(
            "auraClickerSave"
        );


    if (!salvo) {

        return;

    }


    try {

        const dados =
            JSON.parse(salvo);


        aura =
            dados.aura ?? 0;


        auraPorClique =
            dados.auraPorClique ?? 1;


        auraPorSegundo =
            dados.auraPorSegundo ?? 0;


        multiplicador =
            dados.multiplicador ?? 1;


        cliques =
            dados.cliques ?? 0;


        chanceCritico =
            dados.chanceCritico ?? 0;


        chanceDourada =
            dados.chanceDourada ?? 0;


        nivel =
            dados.nivel ?? 1;


        renascimentos =
            dados.renascimentos ?? 0;


        multiplicadorRenascimento =
            dados.multiplicadorRenascimento ?? 1;


        precoClique =
            dados.precoClique ?? 50;


        precoAuto =
            dados.precoAuto ?? 100;


        precoCritico =
            dados.precoCritico ?? 250;


        precoPoderoso =
            dados.precoPoderoso ?? 500;


        precoAuto2 =
            dados.precoAuto2 ?? 750;


        precoTurbo =
            dados.precoTurbo ?? 2000;


        precoMultiplicador =
            dados.precoMultiplicador ?? 5000;


        precoDourada =
            dados.precoDourada ?? 10000;


        precoMega =
            dados.precoMega ?? 25000;


        precoCosmica =
            dados.precoCosmica ?? 100000;


    } catch (erro) {

        console.error(
            "Erro ao carregar o save:",
            erro
        );

    }

}


// =====================================================
// SALVAMENTO AUTOMÁTICO
// =====================================================

setInterval(
    function() {

        salvarJogo();

    },
    5000
);


// =====================================================
// APAGAR PROGRESSO
// =====================================================

document.getElementById(
    "reset"
).addEventListener(
    "click",
    function() {

        const confirmou =
            confirm(

                "⚠️ ATENÇÃO!\n\n" +

                "Isso vai apagar TODO o seu progresso.\n\n" +

                "Aura, melhorias, níveis e RENASCIMENTOS serão apagados.\n\n" +

                "Tem certeza?"

            );


        if (!confirmou) {

            return;

        }


        localStorage.removeItem(
            "auraClickerSave"
        );


        location.reload();

    }
);


// =====================================================
// INICIAR JOGO
// =====================================================

carregarJogo();

verificarNivel();

atualizarTela();


// =====================================================
// SALVAR ANTES DE SAIR
// =====================================================

window.addEventListener(
    "beforeunload",
    function() {

        salvarJogo();

    }
);
// =====================================================
// BLOQUEAR ENTER
// =====================================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
    }

});
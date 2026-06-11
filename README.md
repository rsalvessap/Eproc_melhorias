# Melhorias eproc TJSP

Coleção de userscripts para melhorar a usabilidade do sistema eproc do TJSP (1º grau, 2º grau e homologação).

> Novos scripts serão adicionados conforme as melhorias forem desenvolvidas.

---

## Requisitos

### 1. Instalar o Tampermonkey

O Tampermonkey é uma extensão de navegador que permite instalar e executar userscripts.

| Navegador | Link |
|-----------|------|
| Chrome | [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/) |
| Edge | [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |

Após instalar, o ícone do Tampermonkey aparecerá na barra de extensões do navegador.

---

## Scripts disponíveis

### Filtro Localizador

**Arquivo:** `filtro-localizador-evento.user.js`

Substitui o campo de seleção de **Localizador** por uma versão com campo de pesquisa/filtro, evitando a necessidade de rolar listas extensas.

**Funcionalidades:**
- Campo de busca com filtro por texto no seletor de localizador (`selNovoLocalizador`)
- Normalização de acentos na busca (ex: digitar "vara" encontra "Vara Cível")
- Mensagem de feedback quando nenhum resultado é encontrado
- Compatível com os ambientes de produção e homologação do eproc TJSP

**Ambientes compatíveis:**
- `eproc-1g-sp.tjsp.jus.br` — 1º grau produção
- `eproc-2g-sp.tjsp.jus.br` — 2º grau produção
- `eproc-1g-sp-hml.tjsp.jus.br` — 1º grau homologação
- `eproc-2g-sp-hml.tjsp.jus.br` — 2º grau homologação

#### Como instalar

1. Com o Tampermonkey instalado, acesse o link abaixo:

   **[Clique aqui para instalar](https://raw.githubusercontent.com/rsalvessap/Eproc_melhorias/main/filtro-localizador-evento.user.js)**

2. O Tampermonkey abrirá uma tela de confirmação mostrando os detalhes do script.

3. Clique em **"Instalar"**.

4. Pronto. O script será ativado automaticamente ao acessar o eproc.

#### Como usar

1. Abra qualquer processo no eproc e acesse a tela de movimentação/peticionamento onde o campo de localizador aparece.
2. O campo exibirá um seletor com campo de busca no lugar da lista original.
3. Digite parte do nome do localizador para filtrar as opções.
4. Clique na opção desejada para selecioná-la.

---

## Atualização dos scripts

Quando uma nova versão de um script for publicada, o Tampermonkey pode notificá-lo automaticamente (se a opção de verificação de atualizações estiver ativada).

Para verificar manualmente:
1. Clique no ícone do Tampermonkey na barra do navegador.
2. Acesse **"Painel"**.
3. Clique na aba **"Atualizações"** e depois em **"Verificar atualizações"**.

---

## Problemas ou sugestões

Abra uma [issue](https://github.com/rsalvessap/Eproc_melhorias/issues) neste repositório descrevendo o problema ou a melhoria desejada.

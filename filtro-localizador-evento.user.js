// ==UserScript==
// @name         Filtro Localizador e Evento - eproc TJSP
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Adiciona campo de pesquisa ao selNovoLocalizador e ao txtEvento no eproc
// @author       Você
// @match        https://eproc-1g-sp-hml.tjsp.jus.br/*
// @match        https://eproc-1g-sp.tjsp.jus.br/*
// @match        https://eproc-2g-sp.tjsp.jus.br/*
// @match        https://eproc-2g-sp-hml.tjsp.jus.br/*
// @match        https://*.tjsp.jus.br/controlador.php*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // ─── FILTRO DO LOCALIZADOR (selNovoLocalizador) ───────────────────────────

    function aplicarFiltroLocalizador() {
        var sel = document.getElementById('selNovoLocalizador');
        if (!sel) return false;
        if ($(sel).data('multipleSelect')) return true;
        if (typeof $.fn.multipleSelect === 'undefined') return false;

        // Capturar posicionamento absoluto ANTES de esconder
        var selCs = window.getComputedStyle(sel);
        var posProps = {
            position: selCs.position,
            top: selCs.top,
            left: selCs.left,
            width: selCs.width
        };

        sel.style.display = 'none';

        $(sel).multipleSelect({
            single: true,
            filter: true,
            liveSearch: true,
            liveSearchNormalize: true,
            noMatchesFound: 'Nenhum resultado encontrado',
            keepOpen: false,
            placeholder: 'Selecionar localizador...',
            onClick: function () {
                setTimeout(function () {
                    try {
                        if (typeof marcarLocalizadorPrincipal === 'function') {
                            marcarLocalizadorPrincipal(sel);
                        }
                        if (typeof habilitarLocalizadoresSecundarios === 'function') {
                            habilitarLocalizadoresSecundarios(sel);
                        }
                    } catch (e) {}
                }, 50);
            }
        });

        // Aplicar posicionamento absoluto correto no widget gerado
        var msParent = sel.nextElementSibling;
        if (msParent && msParent.classList.contains('ms-parent')) {
            msParent.style.position = posProps.position;
            msParent.style.top = posProps.top;
            msParent.style.left = posProps.left;
            msParent.style.width = posProps.width;
        }

        return true;
    }

    // ─── FILTRO DO EVENTO (txtEvento) ─────────────────────────────────────────

    function aplicarFiltroEvento() {
        var txt = document.getElementById('txtEvento');
        var hdn = document.getElementById('hdnEvento');
        if (!txt || !hdn) return false;
        if (document.getElementById('selEventoFiltro')) return true;
        if (typeof $.fn.multipleSelect === 'undefined') return false;
        if (typeof objAjaxAutoCompEvento === 'undefined') return false;

        var obj = objAjaxAutoCompEvento;
        var itens = obj.arrItens.filter(function (i) { return i && i.descricao; });
        if (itens.length === 0) return false;

        // Capturar largura do txtEvento original
        var txtWidth = Math.round(txt.getBoundingClientRect().width) || 369;

        // Criar select com todos os eventos
        var sel = document.createElement('select');
        sel.id = 'selEventoFiltro';
        sel.className = 'infraSelect';

        var opt0 = document.createElement('option');
        opt0.value = '';
        opt0.text = 'Selecionar evento...';
        sel.add(opt0);

        itens.forEach(function (item) {
            var opt = document.createElement('option');
            opt.value = item.id;
            opt.text = item.descricao; // já contém o código ex: "Ato ordinário (11383)"
            sel.add(opt);
        });

        // Inserir o select logo após o txtEvento
        txt.parentElement.insertBefore(sel, txt.nextSibling);

        // Esconder o txtEvento original e o "Listar Todos"
        txt.style.display = 'none';
        var lblListar = document.getElementById('lblListarEvento');
        if (lblListar) lblListar.style.display = 'none';

        // Aplicar multipleSelect
        $(sel).multipleSelect({
            single: true,
            filter: true,
            liveSearch: true,
            liveSearchNormalize: true,
            noMatchesFound: 'Nenhum resultado encontrado',
            keepOpen: false,
            width: txtWidth + 'px',
            placeholder: 'Selecionar evento...',
            onClick: function (view) {
                if (!view.value) return;
                // Preencher os campos originais do eproc
                obj.elem.value = view.text;
                obj.hdn.value = view.value;
                try { obj.processarResultado(); } catch (e) {}
            }
        });

        // Se o txtEvento já tinha um valor (ex: ao recarregar), sincronizar
        if (hdn.value) {
            $(sel).multipleSelect('setSelects', [hdn.value]);
        }

        return true;
    }

    // ─── INICIALIZAÇÃO COM POLLING ────────────────────────────────────────────

    var locDone = false;
    var evtDone = false;

    var iv = setInterval(function () {
        if (!locDone) locDone = aplicarFiltroLocalizador();
        if (!evtDone) evtDone = aplicarFiltroEvento();
        if (locDone && evtDone) clearInterval(iv);
    }, 100);

    setTimeout(function () { clearInterval(iv); }, 15000);

})();

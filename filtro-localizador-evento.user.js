// ==UserScript==
// @name         Filtro Localizador - eproc TJSP
// @namespace    http://tampermonkey.net/
// @version      6.1
// @description  Adiciona campo de pesquisa ao selNovoLocalizador no eproc
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

    // ─── INICIALIZAÇÃO COM POLLING ────────────────────────────────────────────

    var iv = setInterval(function () {
        if (aplicarFiltroLocalizador()) clearInterval(iv);
    }, 100);

    setTimeout(function () { clearInterval(iv); }, 15000);

})();

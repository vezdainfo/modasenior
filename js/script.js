
// script.js - acessibilidade: leitura por voz e melhorias de navegação por teclado
document.addEventListener('DOMContentLoaded', function(){
  // leitura por voz - botão com data-tts-text ou atributo data-tts
  document.querySelectorAll('[data-tts]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      const text = btn.getAttribute('data-tts') || document.querySelector('main')?.innerText || '';
      if('speechSynthesis' in window){
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR';
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      } else {
        alert('Leitura por voz não suportada neste navegador.');
      }
    });
  });

  // allow Enter on focused product cards to open link (improves keyboard interaction)
  document.querySelectorAll('.card').forEach(function(card){
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        const link = card.querySelector('a');
        if(link) link.click();
      }
    });
  });

  // small helper: focus visible outline for keyboard users only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});


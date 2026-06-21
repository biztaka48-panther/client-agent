/**
 * contact.js — お問い合わせフォームバリデーション
 */
(function() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successEl = document.querySelector('.form-success');

  function showError(group, msg) {
    group.classList.add('has-error');
    var errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  }

  function clearError(group) {
    group.classList.remove('has-error');
  }

  function validate() {
    var valid = true;

    var nameGroup = form.querySelector('.form-group[data-field="name"]');
    var emailGroup = form.querySelector('.form-group[data-field="email"]');

    if (nameGroup) {
      var nameInput = nameGroup.querySelector('input');
      clearError(nameGroup);
      if (!nameInput || !nameInput.value.trim()) {
        showError(nameGroup, 'お名前をご入力ください');
        valid = false;
      }
    }

    if (emailGroup) {
      var emailInput = emailGroup.querySelector('input');
      clearError(emailGroup);
      if (!emailInput || !emailInput.value.trim()) {
        showError(emailGroup, 'メールアドレスをご入力ください');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showError(emailGroup, '正しいメールアドレスをご入力ください');
        valid = false;
      }
    }

    return valid;
  }

  form.addEventListener('submit', function(e) {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    // Formspree 未設定の場合はデモ表示
    var action = form.getAttribute('action');
    if (!action || action.includes('XXXXXX')) {
      e.preventDefault();
      form.style.display = 'none';
      if (successEl) successEl.classList.add('is-visible');
    }
  });

  // リアルタイムバリデーション解除
  form.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener('input', function() {
      var group = input.closest('.form-group');
      if (group) clearError(group);
    });
  });
})();

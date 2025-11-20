(function(){
  const ADMIN_USER = 'maleo';
  const ADMIN_PASS = 'maleo2901';
  const SESSION_KEY = 'admin-session-token';

  function generateToken(){
    return btoa(Date.now() + Math.random());
  }

  function checkSession(){
    return !!sessionStorage.getItem(SESSION_KEY);
  }

  function initAuth(){
    const $loginScreen = document.getElementById('login-screen');
    const $adminContent = document.getElementById('admin-content');
    const $loginForm = document.getElementById('login-form');
    const $loginUsername = document.getElementById('login-username');
    const $loginPassword = document.getElementById('login-password');
    const $loginError = document.getElementById('login-error');
    const $logoutBtn = document.getElementById('logout-btn');

    if(!$loginForm){
      console.warn('Form elements not found, waiting...');
      setTimeout(initAuth, 100);
      return;
    }

    function login(username, password){
      console.log('Checking credentials:', {username, password});
      if(username === ADMIN_USER && password === ADMIN_PASS){
        const token = generateToken();
        sessionStorage.setItem(SESSION_KEY, token);
        console.log('Login successful, token saved');
        showAdminPanel();
        return true;
      }
      console.log('Credentials incorrect');
      return false;
    }

    function showLoginScreen(){
      $loginScreen.classList.add('active');
      $adminContent.classList.remove('active');
      $logoutBtn.style.display = 'none';
      $loginForm.reset();
    }

    function showAdminPanel(){
      $loginScreen.classList.remove('active');
      $adminContent.classList.add('active');
      $logoutBtn.style.display = 'block';
      if(window.initAdmin){
        window.initAdmin();
      }
    }

    function logout(){
      sessionStorage.removeItem(SESSION_KEY);
      showLoginScreen();
    }

    $loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = ($loginUsername.value || '').trim();
      const password = $loginPassword.value || '';

      console.log('Form submitted with:', {username, password});

      if(login(username, password)){
        $loginError.style.display = 'none';
      }else{
        $loginError.style.display = 'block';
        $loginError.textContent = 'Username atau password salah';
        $loginPassword.value = '';
      }
    });

    $logoutBtn.addEventListener('click', logout);

    if(checkSession()){
      console.log('Session found, showing admin panel');
      showAdminPanel();
    }else{
      console.log('No session, showing login screen');
      showLoginScreen();
    }
  }

  document.addEventListener('DOMContentLoaded', initAuth);
  if(document.readyState === 'interactive' || document.readyState === 'complete'){
    initAuth();
  }
})();

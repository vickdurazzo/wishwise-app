import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenType, UserProfile } from '../types';

interface AuthScreenProps {
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  currentUser,
  onLogin,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register extra states
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // UI status
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Perform login
    const userName = email.toLowerCase().includes('mari') || email.toLowerCase().includes('camila')
      ? 'Camila'
      : email.split('@')[0];

    const loggedUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email.trim(),
      avatarUrl: ASSETS.profile,
      isAuthenticated: true,
    };

    onLogin(loggedUser);
    onNavigate('meus-desejos');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    if (!agreedTerms) {
      setErrorMessage('Você deve concordar com os termos para prosseguir.');
      return;
    }

    const derivedName = email.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: formattedName,
      email: email.trim(),
      avatarUrl: ASSETS.profile,
      isAuthenticated: true,
    };

    onLogin(newUser);
    onNavigate('meus-desejos');
  };

  const handleDemoAccountLogin = () => {
    const demoUser: UserProfile = {
      id: 'demo-camila',
      name: 'Camila',
      email: 'marividurazzo@gmail.com',
      avatarUrl: ASSETS.profile,
      isAuthenticated: true,
    };
    onLogin(demoUser);
    onNavigate('meus-desejos');
  };

  const handleGoogleLogin = () => {
    const googleUser: UserProfile = {
      id: `google-${Date.now()}`,
      name: 'Camila Vidurazzo',
      email: 'marividurazzo@gmail.com',
      avatarUrl: ASSETS.profile,
      isAuthenticated: true,
    };
    onLogin(googleUser);
    onNavigate('meus-desejos');
  };

  return (
    <div className="flex flex-col w-full pb-16 pt-8 sm:pt-12 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center pt-2 pb-1">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md mb-3 ring-2 ring-[#2d6a4f]/15 p-2">
          <img
            src={ASSETS.logo}
            alt="Logo Quarentena de Desejos"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#181a2e]">
          WishWise
        </h2>
        <p className="text-xs sm:text-sm text-[#707973] mt-1 max-w-xs">
          Espaço de clareza e reflexão para compras conscientes.
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#2d6a4f]/10 flex flex-col gap-5">
        {/* Toggle Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#f4f2ff] rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMessage('');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-[#0f5238] shadow-xs'
                : 'text-[#707973] hover:text-[#181a2e]'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMessage('');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-[#0f5238] shadow-xs'
                : 'text-[#707973] hover:text-[#181a2e]'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20 text-[#ba1a1a] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-[#b1f0ce]/40 border border-[#006c48]/20 text-[#006c48] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
            {/* Field: Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#181a2e]" htmlFor="loginEmail">
                E-mail
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  mail
                </span>
                <input
                  id="loginEmail"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#181a2e]" htmlFor="loginPassword">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-[11px] text-[#0f5238] hover:underline font-semibold cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  lock
                </span>
                <input
                  id="loginPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-11 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#707973] hover:text-[#181a2e] cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#404943]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0f5238] focus:ring-[#0f5238] border-gray-300 cursor-pointer"
                />
                <span>Lembrar de mim neste dispositivo</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#0f5238] hover:bg-[#2d6a4f] text-white text-sm font-bold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Entrar</span>
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
            {/* Field: Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#181a2e]" htmlFor="regEmail">
                E-mail
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  mail
                </span>
                <input
                  id="regEmail"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#181a2e]" htmlFor="regPassword">
                Senha
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  lock
                </span>
                <input
                  id="regPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-11 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#707973] hover:text-[#181a2e] cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Field: Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#181a2e]" htmlFor="regConfirmPassword">
                Confirmar Senha
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  lock_reset
                </span>
                <input
                  id="regConfirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-11 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-[#707973] hover:text-[#181a2e] cursor-pointer"
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-[#404943] pt-1">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#0f5238] focus:ring-[#0f5238] border-gray-300 cursor-pointer flex-shrink-0"
              />
              <span>
                Concordo com as práticas de privacidade consciente e armazenamento seguro dos meus desejos.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#0f5238] hover:bg-[#2d6a4f] text-white text-sm font-bold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Criar Minha Conta</span>
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-[#f4f2ff] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#707973] font-medium uppercase tracking-wider absolute">
            Ou acesse com
          </span>
        </div>

        {/* Social / Alternative buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 rounded-xl border border-[#2d6a4f]/15 hover:bg-[#f4f2ff] text-xs font-semibold text-[#181a2e] flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span>Continuar com Google</span>
          </button>

          {/* Quick Demo Access */}
          <button
            type="button"
            onClick={handleDemoAccountLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-[#edecff] hover:bg-[#e0e0fc] text-xs font-semibold text-[#0f5238] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Acessar com perfil padrão (Camila)</span>
          </button>
        </div>
      </div>

      {/* Return link */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => onNavigate('meus-desejos')}
          className="text-xs text-[#707973] hover:text-[#0f5238] font-medium flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Voltar para Meus Desejos</span>
        </button>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-[#181a2e]/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#181a2e] w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#181a2e]">Recuperar Senha</h3>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setForgotSent(false);
                }}
                className="w-8 h-8 rounded-full bg-[#f4f2ff] flex items-center justify-center text-[#707973] hover:text-[#181a2e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {forgotSent ? (
              <div className="flex flex-col items-center text-center gap-2 py-3">
                <div className="w-12 h-12 rounded-full bg-[#b1f0ce] text-[#006c48] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
                </div>
                <h4 className="text-sm font-bold text-[#181a2e]">E-mail enviado!</h4>
                <p className="text-xs text-[#707973]">
                  Enviamos as instruções de redefinição de senha para <strong>{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setForgotSent(false);
                  }}
                  className="w-full mt-3 py-2.5 rounded-full bg-[#0f5238] text-white text-xs font-bold"
                >
                  Entendi
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-[#707973]">
                  Informe seu e-mail cadastrado e enviaremos um link seguro para redefinir sua senha.
                </p>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-xs rounded-xl p-3 outline-none focus:ring-1 focus:ring-[#0f5238]"
                />
                <button
                  type="button"
                  disabled={!forgotEmail.includes('@')}
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 rounded-full bg-[#0f5238] disabled:opacity-50 text-white text-xs font-bold"
                >
                  Enviar Link de Recuperação
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

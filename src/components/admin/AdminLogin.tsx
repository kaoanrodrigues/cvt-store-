import React, { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../data/storeContext';
import { CvtLogo } from '../CvtLogo';

export const AdminLogin: React.FC = () => {
  const { login, setCurrentView } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username.trim(), password.trim(), rememberMe);
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas. Verifique seu usuário e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 selection:bg-yellow-400 selection:text-black">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-zinc-950/80 to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <CvtLogo size="lg" />
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 bg-yellow-400 rotate-45" />
            <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-athletic tracking-wider">
              Painel Administrativo
            </h1>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Acesso restrito para gestão de catálogo, estoque e IA de negócios
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-athletic uppercase tracking-wider">
                  Autenticação Segura
                </h2>
                <p className="text-[11px] text-zinc-400">Banco de Dados Relacional</p>
              </div>
            </div>
          </div>

          {error && (
            <div 
              data-testid="login-error-alert"
              className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg flex items-center gap-2 animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                Usuário ou E-mail
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  data-testid="admin-username-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 font-sans"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 font-athletic">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  data-testid="admin-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-yellow-400 focus:ring-yellow-400 accent-yellow-400"
                />
                <span>Lembrar deste dispositivo</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              data-testid="admin-login-submit-btn"
              className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all font-athletic shadow-lg active:scale-98 mt-2"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>{loading ? 'Validando Acesso...' : 'Entrar no Painel Gerencial'}</span>
            </button>
          </form>

          {/* Default Credentials Hint */}
          <div className="mt-6 p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-xs text-zinc-400 space-y-1 font-mono">
            <p className="text-[11px] text-yellow-400 font-bold uppercase font-athletic">Credenciais Padrão:</p>
            <p>Usuário: <span className="text-white font-bold">admin</span></p>
            <p>Senha: <span className="text-white font-bold">cvtadmin2026</span></p>
          </div>
        </div>

        {/* Back to store */}
        <div className="text-center mt-6">
          <button
            type="button"
            data-testid="login-back-to-store-btn"
            onClick={() => setCurrentView('store')}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-yellow-400 font-bold uppercase tracking-wider font-athletic transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Vitrine da Loja</span>
          </button>
        </div>
      </div>
    </div>
  );
};


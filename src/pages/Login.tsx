import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MapPin, Mail, Lock } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (email && password) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Redireciona para a página principal do app após login bem-sucedido
        navigate('/app');
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (error) {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950 flex flex-col">
      {/* Navegação */}
      <nav className="border-b border-dark-800/10 w-full bg-dark-900/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-dark-50">Floripa Turismo</span>
          </Link>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-dark-800/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-dark-800/20 rounded-full blur-3xl animate-pulse-slow" />
          </div>

          {/* Card de Login */}
          <div className="relative bg-dark-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-dark-50">Bem-vindo de volta</h2>
              <p className="mt-2 text-dark-200">Entre para continuar sua jornada</p>
            </div>

            {error && (
              <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-50 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-dark-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-dark-800/20 rounded-lg 
                               bg-dark-900/50 placeholder-dark-400 text-dark-50 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-dark-50 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-dark-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-dark-800/20 rounded-lg 
                               bg-dark-900/50 placeholder-dark-400 text-dark-50 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-dark-800/20 bg-dark-900/50 text-primary 
                             focus:ring-primary/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-50">
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/recuperar-senha" className="font-medium text-primary hover:text-primary-dark">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full hover:scale-105 transition-transform"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-dark-200">
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="font-medium text-primary hover:text-primary-dark">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

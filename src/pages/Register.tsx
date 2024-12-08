import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MapPin, Mail, Lock, User, Phone } from 'lucide-react';
import { useState, FormEvent } from 'react';

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const password_confirmation = formData.get('password_confirmation') as string;

    if (password !== password_confirmation) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Simulando um cadastro bem-sucedido
      // Em produção, aqui seria feito o cadastro real

      // Redireciona para a página de login após cadastro bem-sucedido
      navigate('/login');
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-light via-background-soft to-ocean-dark flex flex-col">
      {/* Navegação */}
      <nav className="border-b border-white/10 w-full bg-ocean-light/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-700">Floripa Turismo</span>
          </Link>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-pulse-slow" />
          </div>

          {/* Card de Cadastro */}
          <div className="relative bg-white/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-700">Crie sua conta</h2>
              <p className="mt-2 text-gray-600">Comece sua jornada em Florianópolis</p>
            </div>

            {error && (
              <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirme sua senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-primary/50 focus:border-primary/50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-white/20 bg-white/50 text-primary 
                           focus:ring-primary/50"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Li e aceito os{' '}
                  <Link to="/termos" className="font-medium text-primary hover:text-primary/80">
                    termos de uso
                  </Link>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full hover:scale-105 transition-transform"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                  Entre aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
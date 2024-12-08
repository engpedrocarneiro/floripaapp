import { HeroSection } from '../components/ui/hero-section';
import { FeaturesSection } from '../components/ui/features-section';
import { Footer } from '../components/ui/footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-ocean-light flex flex-col">
      {/* Navegação */}
      <nav className="border-b border-white/10 fixed w-full bg-ocean-light/80 backdrop-blur-sm z-50">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-700">Floripa Turismo</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="ghost" className="bg-white/30 hover:bg-white/40">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link to="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};
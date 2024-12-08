import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-950 text-dark-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-dark-50">Floripa Turismo</span>
            </div>
            <p className="mt-4 text-dark-300 max-w-md">
              Seu guia completo para aproveitar o melhor de Florianópolis. 
              Planeje sua viagem de forma inteligente e descubra experiências únicas.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-50 tracking-wider uppercase">
              Links Rápidos
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/login" className="text-dark-300 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className="text-dark-300 hover:text-primary">
                  Cadastro
                </Link>
              </li>
              <li>
                <Link to="/app" className="text-dark-300 hover:text-primary">
                  App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-50 tracking-wider uppercase">
              Contato
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>contato@floripaturismo.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>(48) 9999-9999</span>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-dark-50 tracking-wider uppercase">
                Redes Sociais
              </h3>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-dark-300 hover:text-primary">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-dark-300 hover:text-primary">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-dark-300 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800">
          <p className="text-center text-dark-400">
            © {new Date().getFullYear()} Floripa Turismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
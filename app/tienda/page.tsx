import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gamepad2, ShoppingCart, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Retro Game Store</h1>
        <nav>
          <Button variant="ghost" className="text-white mr-2">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Carrito
          </Button>
          <Button variant="ghost" className="text-white" asChild>
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Link>
          </Button>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bienvenido a la nostalgia gaming
          </h2>
          <p className="text-xl text-white mb-6">
            Descubre nuestra colección de consolas y juegos retro
          </p>
          <Button asChild>
            <Link href="/tienda">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Explorar tienda
            </Link>
          </Button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['NES', 'SNES', 'PlayStation'].map((console) => (
            <div key={console} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {console}
              </h3>
              <p className="mb-4 text-gray-600">
                Revive los clásicos con nuestra selección de juegos para{' '}
                {console}.
              </p>
              <Button variant="outline">Ver juegos</Button>
            </div>
          ))}
        </section>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>&copy; 2024 Retro Game Store. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

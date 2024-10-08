import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import { Home, Link } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Button>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Explorar tienda
        </Link>
      </Button>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acceso a Retro Game Store
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

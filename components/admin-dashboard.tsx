"use client"

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createSupabaseClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const supabase = createSupabaseClient();
    if (!supabase) {
      setError('Error al inicializar el cliente de Supabase. Por favor, contacte al administrador.');
      setLoading(false);
      return;
    }

    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setError('Error al obtener la información del usuario. Por favor, inténtalo de nuevo.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createSupabaseClient();
    if (!supabase) {
      setError('Error al inicializar el cliente de Supabase. Por favor, contacte al administrador.');
      return;
    }

    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createSupabaseClient();
    if (!supabase) {
      setError('Error al inicializar el cliente de Supabase. Por favor, contacte al administrador.');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      toast({
        title: "Correo electrónico actualizado",
        description: "Se ha enviado un enlace de confirmación a tu nuevo correo electrónico.",
      });
      setNewEmail('');
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
      setError('Error al actualizar el correo electrónico. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createSupabaseClient();
    if (!supabase) {
      setError('Error al inicializar el cliente de Supabase. Por favor, contacte al administrador.');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada exitosamente.",
      });
      setNewPassword('');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setError('Error al actualizar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Último inicio de sesión:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Actualizar Información</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateEmail} className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email">Nuevo Correo Electrónico</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Actualizar Correo Electrónico</Button>
              </form>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Actualizar Contraseña</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Button onClick={handleLogout} className="mt-4">Cerrar Sesión</Button>
    </div>
  );
}
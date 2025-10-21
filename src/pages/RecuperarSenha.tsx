import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

const cpfSchema = z.object({
  cpf: z.string().min(11, 'CPF inválido'),
});

const tokenSchema = z.object({
  token: z.string().length(6, 'Token deve ter 6 dígitos'),
});

const passwordSchema = z.object({
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string(),
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
});

type CpfForm = z.infer<typeof cpfSchema>;
type TokenForm = z.infer<typeof tokenSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function RecuperarSenha() {
  const [step, setStep] = useState<'cpf' | 'token' | 'password'>('cpf');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const cpfForm = useForm<CpfForm>({
    resolver: zodResolver(cpfSchema),
  });

  const tokenForm = useForm<TokenForm>({
    resolver: zodResolver(tokenSchema),
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitCpf = async (data: CpfForm) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/recuperar-senha', data);
      setUserEmail(response.data.email);
      setStep('token');
      toast({
        title: 'Token enviado!',
        description: `Verifique seu email: ${response.data.email}`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'CPF não encontrado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitToken = async (data: TokenForm) => {
    setIsLoading(true);
    try {
      await api.post('/auth/validar-token', data);
      setStep('password');
      toast({
        title: 'Token válido!',
        description: 'Agora defina sua nova senha',
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.response?.data?.message || 'Token inválido',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: PasswordForm) => {
    setIsLoading(true);
    try {
      await api.post('/auth/redefinir-senha', { senha: data.senha });
      toast({
        title: 'Senha redefinida!',
        description: 'Você já pode fazer login com sua nova senha',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Não foi possível redefinir a senha',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Recuperar Senha</h1>
          <p className="text-white/80">Siga os passos para redefinir sua senha</p>
        </div>

        <Card className="shadow-elevated">
          {step === 'cpf' && (
            <>
              <CardHeader>
                <CardTitle>Informe seu CPF</CardTitle>
                <CardDescription>
                  Enviaremos um token de recuperação para seu email cadastrado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={cpfForm.handleSubmit(onSubmitCpf)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      {...cpfForm.register('cpf')}
                      disabled={isLoading}
                    />
                    {cpfForm.formState.errors.cpf && (
                      <p className="text-sm text-destructive">
                        {cpfForm.formState.errors.cpf.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar Token'}
                  </Button>

                  <div className="text-center">
                    <Link to="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                      <ArrowLeft className="h-3 w-3" />
                      Voltar para login
                    </Link>
                  </div>

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
                    <p className="text-muted-foreground">Token de teste: <strong>123456</strong></p>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {step === 'token' && (
            <>
              <CardHeader>
                <CardTitle>Digite o Token</CardTitle>
                <CardDescription>
                  Enviamos um código de 6 dígitos para {userEmail}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={tokenForm.handleSubmit(onSubmitToken)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token">Token</Label>
                    <Input
                      id="token"
                      placeholder="000000"
                      maxLength={6}
                      {...tokenForm.register('token')}
                      disabled={isLoading}
                    />
                    {tokenForm.formState.errors.token && (
                      <p className="text-sm text-destructive">
                        {tokenForm.formState.errors.token.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Validando...' : 'Validar Token'}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setStep('cpf')}
                      className="text-sm"
                    >
                      Não recebi o token
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {step === 'password' && (
            <>
              <CardHeader>
                <CardTitle>Nova Senha</CardTitle>
                <CardDescription>
                  Defina uma nova senha segura para sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha">Nova Senha</Label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="••••••"
                      {...passwordForm.register('senha')}
                      disabled={isLoading}
                    />
                    {passwordForm.formState.errors.senha && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.senha.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <Input
                      id="confirmarSenha"
                      type="password"
                      placeholder="••••••"
                      {...passwordForm.register('confirmarSenha')}
                      disabled={isLoading}
                    />
                    {passwordForm.formState.errors.confirmarSenha && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.confirmarSenha.message}
                      </p>
                    )}
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1">
                    <p className="font-medium text-muted-foreground">A senha deve conter:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>Mínimo de 6 caracteres</li>
                      <li>Letras e números (recomendado)</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

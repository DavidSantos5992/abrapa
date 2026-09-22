import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { LucideIcon } from "lucide-react";
import { Building2, Mail, User, Phone, FileText, CheckCircle2, Heart, Users, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import catarina from "@/assets/abrapa-official/catarina.png";
import laura from "@/assets/abrapa-official/laura.png";
import milena from "@/assets/abrapa-official/milena.png";
import natal from "@/assets/abrapa-official/natal.png";
import criancas from "@/assets/abrapa-official/dia-criancas.png";
import move from "@/assets/abrapa-official/semana-move.png";
const formSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  telefone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone inválido"),
  mensagem: z.string().trim().min(10, "Mensagem deve ter no mínimo 10 caracteres").max(1000, "Mensagem muito longa"),
});

const Parceiros = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const message = `Olá, ABRAPA! Meu nome é ${values.nome}. E-mail: ${values.email}. Telefone: ${values.telefone}. ${values.mensagem}`;
    window.open(`https://wa.me/5511964968794?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    toast.info("Mensagem preparada. Confirme o envio no WhatsApp.");
  };

  const parceirosOficiais = [
    {nome:"Magalu",logo:"magaluParceiros.png"}, {nome:"Liz",logo:"lizPaceiros.png"},
    {nome:"Covabra",logo:"covabraParceiros.png"}, {nome:"SESC",logo:"sescParceiros.png"},
    {nome:"Klabin",logo:"klabinParceiros.png"}, {nome:"The One IT",logo:"BannerToia.png"}
  ].map((partner,index) => ({...partner,id:index+1,logo:"/partners/"+partner.logo,categoria:"Parceiro",tipo:"Parceiro",descricao:"Parceiro apresentado pela ABRAPA em seu site oficial.",website:"",icon:Building2}));

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Parceiros e solidariedade"
        description="Conheça os parceiros apresentados pela ABRAPA Jundiaí e entre em contato para conversar sobre formas de contribuir."
        url="https://abrapajundiai.org.br/parceiros"
        keywords="ABRAPA Jundiaí, parceiros, solidariedade"
      />
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Parceiros e Solidariedade
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Juntos por dignidade, inclusão e apoio às famílias
              </p>
            </div>
          </div>
        </section>

        {/* Parceiros por Categoria */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Nossos Parceiros
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Instituições que fazem a diferença ao lado da ABRAPA
              </p>
            </div>

            {/* Destaques dos Principais Parceiros */}
            <div className="mb-16">
              <h3 className="text-center font-semibold text-lg text-muted-foreground mb-8">
                Parceiros apresentados pela ABRAPA
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {parceirosOficiais.map(partner => <div key={partner.id} className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center"><img src={partner.logo} alt={partner.nome} className="h-8 w-auto mx-auto mb-2 object-contain" /><div className="font-semibold text-sm text-red-800">{partner.nome}</div><div className="text-xs text-red-600">Parceiro</div></div>)}
              </div>
            </div>
            {/* Estatísticas dos Parceiros */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="font-bold text-2xl text-foreground">Apoio</div>
                <div className="text-sm text-muted-foreground">Pessoas e famílias</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="font-bold text-2xl text-foreground">União</div>
                <div className="text-sm text-muted-foreground">Rede de solidariedade</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <div className="font-bold text-2xl text-foreground">Respeito</div>
                <div className="text-sm text-muted-foreground">Dignidade humana</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                  <Handshake className="w-8 h-8" />
                </div>
                <div className="font-bold text-2xl text-foreground">Inclusão</div>
                <div className="text-sm text-muted-foreground">Participação comunitária</div>
              </div>
            </div>

            {/* Destaque: Semana Move no SESC */}
            <div className="mb-16 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 md:p-12 shadow-strong animate-fade-in">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Parceiro em Destaque
                  </div>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                    Semana Move no SESC
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A ABRAPA registra a participação de uma criança assistida na Semana Move no SESC. A atividade mostra a presença do esporte nas ações de inclusão divulgadas pela instituição.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Foto do Espaço */}
                  <div className="rounded-2xl overflow-hidden shadow-medium">
                    <img
                      src={move}
                      alt="Semana Move no SESC — registro da ABRAPA"
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>

                  {/* Vídeo do Assistido */}
                  <div className="rounded-2xl overflow-hidden shadow-medium bg-black">
                    <img src={move} alt="Registro da participação na Semana Move no SESC divulgado pela ABRAPA" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-soft">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-foreground">Inclusão pelo esporte</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destaque: Natal Solidário */}
            <div className="mb-16 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 md:p-12 shadow-strong animate-fade-in">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Doação Especial
                  </div>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                    Natal Solidário
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A ABRAPA compartilha uma celebração de Natal realizada com o apoio de amigos, parceiros e padrinhos. Brinquedos, roupas, calçados, medicamentos e cestas básicas fazem parte das ações registradas.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Vídeo da Entrega */}
                  <div className="rounded-2xl overflow-hidden shadow-medium bg-black">
                    <img src={natal} alt="Natal Solidário da ABRAPA" className="w-full aspect-video object-contain" />
                  </div>

                  {/* Informação Adicional */}
                  <div className="flex flex-col justify-center space-y-6 p-6">
                    <div className="space-y-4">
                      <h4 className="font-heading font-bold text-2xl text-foreground">
                        Sobre a Doação
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Heart className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Solidariedade</p>
                            <p className="text-sm text-muted-foreground">Brinquedos, roupas e cestas básicas</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Amigos e contribuintes</p>
                            <p className="text-sm text-muted-foreground">Doadores solidários</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Handshake className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Impacto Significativo</p>
                            <p className="text-sm text-muted-foreground">Beneficia múltiplas famílias assistidas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p id="registro-natal" className="text-sm text-green-800 leading-relaxed">
                        O site oficial registra a celebração de Natal e agradece a participação de amigos, parceiros e padrinhos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-soft">
                    <Heart className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-foreground">Apoio às crianças e famílias</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Parceiros */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parceirosOficiais.map((parceiro, index) => (
                <div
                  key={parceiro.id}
                  className="w-full min-w-0 bg-card rounded-2xl p-6 shadow-soft hover:shadow-strong transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className={`
                      w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden
                      ${!parceiro.logo ? (
                        parceiro.categoria === 'Saúde' ? 'bg-red-100 text-red-600' :
                        parceiro.categoria === 'Empresarial' ? 'bg-red-100 text-red-600' :
                        parceiro.categoria === 'Governamental' ? 'bg-green-100 text-green-600' :
                        parceiro.categoria === 'Sociedade Civil' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      ) : 'bg-white border border-gray-200'}
                    `}>
                      {parceiro.logo ? (
                        <img
                          src={parceiro.logo}
                          alt={`Logo ${parceiro.nome}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <parceiro.icon className="w-7 h-7" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-col items-start gap-2 mb-2 sm:flex-row sm:justify-between">
                        <h3 className="font-bold text-lg text-foreground leading-tight">
                          {parceiro.nome}
                        </h3>
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${parceiro.tipo === 'Parceiro Estratégico' ? 'bg-primary/10 text-primary' :
                            parceiro.tipo === 'Patrocinador' ? 'bg-green-100 text-green-700' :
                            parceiro.tipo === 'Apoiador' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'}
                        `}>
                          {parceiro.tipo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full">
                          {parceiro.categoria}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {parceiro.descricao}
                      </p>
                      {parceiro.website && (
                        <a
                          href={parceiro.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-primary text-sm font-medium hover:underline"
                        >
                          Visitar site →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chamada para Novos Parceiros */}
            <div className="mt-16 text-center bg-muted rounded-2xl p-8 animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                  Converse com a ABRAPA
                </h3>
                <p className="text-muted-foreground mb-6">
                  Entre em contato pelo canal oficial para conhecer o trabalho da ABRAPA e conversar sobre formas de contribuir.
                </p>
                <Button
                  className="gradient-hero shadow-glow hover:opacity-90 transition-smooth"
                  onClick={() => document.getElementById("voluntariado")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Entre em Contato
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Voluntariado */}
        <section id="voluntariado" className="py-16 bg-muted" tabIndex={-1}>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Entre em Contato
                </h2>
                <p className="text-muted-foreground">
                  Preencha os campos para preparar uma mensagem no WhatsApp oficial da ABRAPA.
                </p>
              </div>

              {submitted ? (
                <div className="bg-card rounded-2xl p-12 shadow-medium text-center animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">
                    Obrigado pelo interesse!
                  </h3>
                  <p className="text-muted-foreground">
                    Sua mensagem foi preparada. Confirme o envio no WhatsApp; o formulário não envia dados automaticamente.
                  </p>
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-8 shadow-medium animate-slide-up">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Nome Completo</FormLabel>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="Seu nome completo"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email</FormLabel>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="seu@email.com"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Telefone</FormLabel>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <FormControl>
                                <Input
                                  placeholder="(11) 12345-6789"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mensagem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Mensagem</FormLabel>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <FormControl>
                                <Textarea
                                  placeholder="Conte-nos como podemos ajudar ou como deseja contribuir..."
                                  className="pl-10 min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full gradient-hero shadow-glow hover:opacity-90 transition-smooth"
                        size="lg"
                      >
                        Abrir WhatsApp
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiros;

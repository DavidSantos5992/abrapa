import { Link } from "react-router-dom";
import { Heart, Users, Target, HandHeart, ArrowRight, Quote, Wind } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/abrapa-official/banner-home.png";
import communityEvent from "@/assets/abrapa-official/natal.png";
import supportCare from "@/assets/abrapa-official/dia-criancas.png";

const Index = () => {
  const stats = [{"value":"Jundiaí","label":"Atuação regional"},{"value":"Famílias","label":"Apoio e acolhimento"},{"value":"Inclusão","label":"Respeito e dignidade"},{"value":"Apoio","label":"Solidariedade em ação"}];

  const services = [
{icon:Heart,title:"Apoio às famílias",description:"Assistência a pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares."},
{icon:Users,title:"Suporte material",description:"Apoio com cestas básicas, suplementos, medicamentos, fraldas e roupas, conforme as necessidades das famílias."},
{icon:Target,title:"Dignidade e inclusão",description:"Combate ao preconceito e valorização de cada pessoa com empatia e respeito."},
{icon:HandHeart,title:"Artesanato e convivência",description:"Atividades de aprendizado, criatividade e acolhimento para as pessoas assistidas."}
];

  const testimonials = [{"name":"Missão","role":"Compromisso institucional","text":"Promover qualidade de vida e dignidade, oferecendo apoio, assistência e combate ao preconceito a pessoas em vulnerabilidade em Jundiaí e região."},{"name":"Visão","role":"Um futuro mais inclusivo","text":"Ser referência no apoio humanitário, social e de saúde em Jundiaí e região, inspirando uma sociedade solidária e livre de discriminação."},{"name":"Valores","role":"Princípios da ABRAPA","text":"Empatia, solidariedade, ética e inclusão orientam o cuidado com cada pessoa e a promoção da dignidade."}];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ABRAPA Jundiaí | Apoio, cuidado e solidariedade"
        description="A ABRAPA é a Associação Brasileira de Apoio aos Portadores de Aids. Apoia pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região."
        url="https://abrapajundiai.org.br"
        image="/abrapa-social.png"
        keywords="ABRAPA Jundiaí, apoio social, solidariedade"
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-start justify-start overflow-hidden pt-28 md:items-center md:justify-center md:pt-20">
          <div className="absolute inset-0 z-0 bg-white">
            <img
              src={heroImage}
              alt="Banner institucional da ABRAPA Jundiaí"
              className="absolute bottom-0 right-0 w-[200%] max-w-none h-auto md:w-full md:h-full md:object-cover md:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Juntos por Cuidado e Dignidade
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                A ABRAPA é a Associação Brasileira de Apoio aos Portadores de Aids. Apoia pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <DonateButton />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary transition-smooth"
                >
                  <Link to="/sobre">
                    Conheça Nossa História
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCounter
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sobre a ONG */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                  Sobre a ABRAPA
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A ABRAPA é a Associação Brasileira de Apoio aos Portadores de Aids. Apoia pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Somos uma ONG sem fins econômicos, independente de instituições partidárias, governamentais ou religiosas. Nossa missão reúne assistência, qualidade de vida e combate ao preconceito.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="gradient-hero shadow-glow hover:opacity-90 transition-smooth"
                >
                  <Link to="/sobre">
                    Saiba Mais
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <div className="rounded-2xl overflow-hidden shadow-medium">
                  <img
                    src={communityEvent}
                    alt="Evento comunitário da ABRAPA"
                    className="w-full h-64 object-cover hover:scale-105 transition-smooth"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-medium mt-8">
                  <img
                    src={supportCare}
                    alt="Celebração do Dia das Crianças divulgada pela ABRAPA"
                    className="w-full h-64 object-cover hover:scale-105 transition-smooth"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Como Ajudamos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ações de assistência, acolhimento e inclusão para pessoas e famílias
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-strong transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mb-6 shadow-glow">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                O Que Nos Move
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Missão, visão e valores divulgados pela ABRAPA
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Quote className="w-10 h-10 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    {testimonial.text}
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Casos Urgentes Destaque */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Conheça Nossas Iniciativas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Projetos e ações apresentados nos canais oficiais da ABRAPA
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Projeto Catarina</h3>
                <p className="text-sm text-muted-foreground mb-3">Solidariedade e apoio à alimentação especial</p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Projeto</span>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700 rounded-full flex items-center justify-center mb-4">
                  <Wind className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-purple-700 mb-2">Projeto Laurinha</h3>
                <p className="text-sm text-purple-700 mb-3">Acolhimento à criança e à sua família</p>
                <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full">Projeto</span>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Projeto Milena</h3>
                <p className="text-sm text-muted-foreground mb-3">Apoio às necessidades da criança e da família</p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Projeto</span>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Cestas básicas</h3>
                <p className="text-sm text-muted-foreground mb-3">Alimentação e dignidade para famílias assistidas</p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Projeto</span>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="gradient-hero shadow-glow hover:opacity-90 transition-smooth"
              >
                <Link to="/campanhas">
                  Conheça os Projetos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
                Faça Parte Dessa História
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Sua contribuição apoia o trabalho da ABRAPA. Conheça as formas de ajudar e entre em contato.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-medium"
                >
                  <Link to="/contato">Fale Conosco</Link>
                </Button>
                <DonateButton />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

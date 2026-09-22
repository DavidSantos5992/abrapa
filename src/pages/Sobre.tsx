import { Users, Target, Heart, Award, Quote, MapPin, Navigation } from "lucide-react";
import teamImage from "@/assets/abrapa-official/natal.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import SEO from "@/components/SEO";

const Sobre = () => {
  const valores = [{icon:Heart,title:"Empatia",description:"Valorizar cada pessoa com respeito e acolhimento."},{icon:Target,title:"Ética",description:"Agir com responsabilidade e respeito à dignidade humana."},{icon:Users,title:"Inclusão",description:"Contribuir para uma sociedade livre de discriminação."},{icon:Award,title:"Solidariedade",description:"Unir esforços para apoiar pessoas e famílias em vulnerabilidade."}];

  const equipe = [{"nome":"Cestas básicas","cargo":"Apoio material","especialidade":"Alimentação para as famílias assistidas."},{"nome":"Suplementos e remédios","cargo":"Assistência","especialidade":"Apoio às necessidades das pessoas assistidas."},{"nome":"Artesanato","cargo":"Convivência","especialidade":"Aprendizado, criatividade e acolhimento."},{"nome":"Ações comunitárias","cargo":"Inclusão","especialidade":"Celebrações e atividades com crianças e famílias."}];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Sobre Nós - ABRAPA"
        description="A ABRAPA é a Associação Brasileira de Apoio aos Portadores de Aids. Apoia pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região."
        url="https://abrapajundiai.org.br/sobre"
        image="/abrapa-social.png"
        keywords="ABRAPA Jundiaí, missão, valores, apoio social"
      />
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Sobre a ABRAPA
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Uma história de solidariedade, dignidade e combate ao preconceito
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                  Nossa História
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A ABRAPA é a Associação Brasileira de Apoio aos Portadores de Aids. Apoia pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região.
                  </p>
                  <p>
                    Promover qualidade de vida e dignidade, oferecendo apoio, assistência e combate ao preconceito a pessoas em vulnerabilidade em Jundiaí e região.
                  </p>
                  <p>
                    A instituição é independente de organizações partidárias, governamentais ou religiosas e não tem fins econômicos. Seu apoio alcança pessoas de todas as faixas etárias.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-strong animate-scale-in">
                <img
                  src={teamImage}
                  alt="Registro do Projeto Natal divulgado pela ABRAPA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Nossos Valores
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Princípios que guiam nosso trabalho e nossa dedicação
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((valor, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center mb-4">
                    <valor.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">
                    {valor.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {valor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Frentes de Apoio
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ações apresentadas pela instituição em seus canais oficiais
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipe.map((membro, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center shadow-glow">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {membro.nome}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {membro.cargo}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {membro.especialidade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos de Beneficiários */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Nosso Compromisso
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Acolher, respeitar e apoiar cada pessoa
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-strong animate-scale-in">
                <Quote className="w-12 h-12 text-primary mb-6" />
                <div className="space-y-4 text-muted-foreground leading-relaxed"><p>Promover qualidade de vida e dignidade, oferecendo apoio, assistência e combate ao preconceito a pessoas em vulnerabilidade em Jundiaí e região.</p><p>A assistência se estende aos familiares das pessoas que vivem com HIV/AIDS, respeitando a realidade e as necessidades de cada família.</p><p>A ABRAPA divulga ações de apoio material, convivência e inclusão. Cada contribuição ajuda a sustentar esse trabalho.</p></div>
                <div className="border-t border-border mt-8 pt-6">
                  <p className="font-semibold text-foreground text-lg mb-2">ABRAPA Jundiaí</p>
                  <p className="text-sm text-muted-foreground italic">
                    Compromisso institucional baseado nas informações publicadas pela própria ABRAPA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 bg-background" aria-labelledby="localizacao-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 id="localizacao-heading" className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Onde Estamos
                </h2>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                  Rua Secundino Veiga, 119 — Centro, Jundiaí — SP
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-medium border border-border">
                <iframe
                  title="Mapa da localização da ABRAPA Jundiaí"
                  src="https://www.google.com/maps?q=Rua+Secundino+Veiga,+119,+Centro,+Jundia%C3%AD,+SP&output=embed"
                  className="block w-full h-72 md:h-96 border-0 pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Rua+Secundino+Veiga,+119,+Centro,+Jundia%C3%AD,+SP&dir_action=navigate"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir rota para a ABRAPA Jundiaí no GPS"
                  className="absolute inset-0 flex items-end justify-center pb-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary group"
                >
                  <span className="inline-flex items-center gap-2 rounded-lg gradient-hero px-5 py-3 text-white font-semibold shadow-medium group-hover:opacity-90 transition-smooth">
                    <Navigation className="w-5 h-5" aria-hidden="true" />
                    Abrir no GPS
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Voluntários */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
                Uma Rede de Solidariedade
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Amigos, parceiros e contribuintes participam das ações divulgadas pela ABRAPA. Entre em contato para conhecer o trabalho e conversar sobre como contribuir.
              </p>
              <div className="grid sm:grid-cols-3 gap-8 mt-12">
                <AnimatedCounter
                  value="Apoio"
                  label="Pessoas e famílias"
                  index={0}
                />
                <AnimatedCounter
                  value="Jundiaí"
                  label="E região"
                  index={1}
                />
                <AnimatedCounter
                  value="Inclusão"
                  label="Dignidade e respeito"
                  index={2}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;

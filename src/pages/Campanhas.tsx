import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Calendar, MapPin, Heart, Baby, Users, Droplets, ShoppingCart, Share2, Wind } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";
import ShareModal from "@/components/ShareModal";
import SEO from "@/components/SEO";
import catarina from "@/assets/abrapa-official/catarina.png";
import laura from "@/assets/abrapa-official/laura.png";
import milena from "@/assets/abrapa-official/milena.png";
import natal from "@/assets/abrapa-official/natal.png";
import criancas from "@/assets/abrapa-official/dia-criancas.png";
import move from "@/assets/abrapa-official/semana-move.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Campaign {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  gallery: string[];
  active: boolean;
  imageAlt: string;
  galleryAlts?: string[];
  ctaLabel?: string;
}

interface CaseNeed {
  id: number;
  name: string;
  age: string;
  icon: LucideIcon;
  condition: string;
  description: string;
  needs: string[];
  monthlyNeed?: string;
  urgency: 'alta' | 'media' | 'baixa';
  type: 'individual' | 'institutional';
}

const Campanhas = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseNeed | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{title: string, description: string} | null>(null);

  const handleShare = (caso: CaseNeed) => {
    setShareData({
      title: `Conheça ${caso.name} - ONG ABRAPA`,
      description: `${caso.name} ${caso.age ? `(${caso.age})` : ''} é um projeto divulgado pela ABRAPA. ${caso.condition}. ${caso.description.substring(0, 150)}...`
    });
    setShareModalOpen(true);
  };

  const handleCampaignShare = (campaign: Campaign) => {
    setShareData({
      title: `${campaign.title} - ONG ABRAPA`,
      description: campaign.description
    });
    setShareModalOpen(true);
  };

  const campanhasAtivas: Campaign[] = [{id:1,title:"Projeto Catarina",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"O Projeto Catarina é apresentado pela ABRAPA como uma iniciativa de apoio às necessidades de alimentação especial de uma criança e de sua família.",image:catarina,gallery:[catarina],active:true,imageAlt:"Registro oficial: Catarina — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"},{id:2,title:"Projeto Laurinha",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"O Projeto Laurinha mobiliza solidariedade para apoiar uma criança com cardiopatia congênita e sua família, conforme apresentado no site da ABRAPA.",image:laura,gallery:[laura],active:true,imageAlt:"Registro oficial: Laurinha — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"},{id:3,title:"Projeto Milena",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"O Projeto Milena faz parte das iniciativas divulgadas pela ABRAPA para apoiar crianças com necessidades específicas e suas famílias.",image:milena,gallery:[milena],active:true,imageAlt:"Registro oficial: Milena — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"}];
  const campanhasPassadas: Campaign[] = [{id:10,title:"Projeto Natal",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"A ABRAPA registra uma celebração de Natal com entrega de brinquedos, roupas, calçados, medicamentos e cestas básicas às crianças e famílias assistidas.",image:natal,gallery:[natal],active:false,imageAlt:"Registro oficial: Projeto Natal — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"},{id:11,title:"Projeto Dia das Crianças",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"A festa do Dia das Crianças reúne a solidariedade de amigos e contribuintes em uma celebração dedicada às crianças assistidas pela ABRAPA.",image:criancas,gallery:[criancas],active:false,imageAlt:"Registro oficial: Dia das Crianças — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"},{id:12,title:"Projeto Semana Move no SESC",date:"Divulgado pela ABRAPA",location:"Jundiaí e região",description:"A ABRAPA compartilha a participação de uma criança assistida na Semana Move no SESC, em uma atividade de inclusão pelo esporte.",image:move,gallery:[move],active:false,imageAlt:"Registro oficial: Semana Move no SESC — ABRAPA Jundiaí",ctaLabel:"Apoiar a ABRAPA"}];
  const casosUrgentes: CaseNeed[] = [{id:1,name:"Projeto Catarina",age:"",icon:Heart,condition:"Apoio à criança e à família",description:"O Projeto Catarina é apresentado pela ABRAPA como uma iniciativa de apoio às necessidades de alimentação especial de uma criança e de sua família.",needs:["Apoio à alimentação especial","Contribuições para o trabalho da ABRAPA"],urgency:'baixa',type:'individual'},{id:2,name:"Projeto Laurinha",age:"",icon:Heart,condition:"Apoio à criança e à família",description:"O Projeto Laurinha mobiliza solidariedade para apoiar uma criança com cardiopatia congênita e sua família, conforme apresentado no site da ABRAPA.",needs:["Solidariedade à criança e à família","Contribuições para o trabalho da ABRAPA"],urgency:'baixa',type:'individual'},{id:3,name:"Projeto Milena",age:"",icon:Heart,condition:"Apoio à criança e à família",description:"O Projeto Milena faz parte das iniciativas divulgadas pela ABRAPA para apoiar crianças com necessidades específicas e suas famílias.",needs:["Apoio às necessidades da criança","Contribuições para o trabalho da ABRAPA"],urgency:'baixa',type:'individual'}];
  const necessidadesInstitucionais: CaseNeed[] = [
  {id:20,name:"Cestas básicas",age:"",icon:ShoppingCart,condition:"Apoio às famílias",description:"A ABRAPA divulga a entrega de cestas básicas às crianças e suas famílias, levando alimento e dignidade.",needs:["Converse com a ABRAPA sobre as necessidades atuais e a entrega de alimentos."],urgency:'baixa',type:'institutional'},
  {id:21,name:"Suplementos e remédios",age:"",icon:Heart,condition:"Assistência material",description:"A instituição apoia as necessidades de suplementos e remédios das pessoas assistidas e de suas famílias.",needs:["Entre em contato com a ABRAPA para conhecer as necessidades atuais."],urgency:'baixa',type:'institutional'}
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Campanhas e projetos da ABRAPA"
        description="Conheça os projetos Catarina, Laurinha e Milena e as ações de apoio às famílias divulgadas pela ABRAPA Jundiaí."
        url="https://abrapajundiai.org.br/campanhas"
        keywords="ABRAPA Jundiaí, projetos, campanhas, solidariedade"
      />
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Campanhas e Necessidades
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Conheça nossas ações, projetos de apoio e as necessidades que precisam da sua solidariedade
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Heart className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Projetos de Apoio</p>
                  <p className="text-sm opacity-80">Iniciativas apresentadas nos canais oficiais</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Necessidades da ONG</p>
                  <p className="text-sm opacity-80">Itens essenciais para continuar ajudando</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold">Projetos Divulgados</p>
                  <p className="text-sm opacity-80">Projetos e registros de ações</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos Divulgados */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Projetos Divulgados
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conheça as iniciativas apresentadas pela ABRAPA
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              {campanhasAtivas.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="group w-full text-left animate-slide-up rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-smooth md:grid md:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
                    <div className="relative min-h-72 md:min-h-[460px] overflow-hidden bg-red-50">
                      <img
                        src={campaign.image}
                        alt={campaign.imageAlt}
                        width={1024}
                        height={1536}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.02] transition-smooth"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Projeto
                      </div>
                    </div>
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3 text-foreground group-hover:text-primary transition-smooth">
                        {campaign.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{campaign.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{campaign.location}</span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-6 whitespace-pre-line">
                        {campaign.description}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <DonateButton size="default">{campaign.ctaLabel}</DonateButton>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          Conheça a história
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projetos de Apoio */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Casos Que Precisam de Ajuda
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Histórias reais de pessoas que contam com nossa solidariedade
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {casosUrgentes.map((caso, index) => (
                <Card
                  key={caso.id}
                  className={`hover:shadow-strong transition-smooth animate-slide-up ${
                    caso.condition === 'Memorial'
                      ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950'
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          caso.condition === 'Memorial' ? 'bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700' :
                          caso.urgency === 'alta' ? 'bg-red-100 text-red-600' :
                          caso.urgency === 'media' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <caso.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className={`text-xl ${caso.condition === 'Memorial' ? 'text-purple-700 dark:text-purple-300' : ''}`}>
                            {caso.name}
                          </CardTitle>
                          {caso.age && <CardDescription className={caso.condition === 'Memorial' ? 'text-purple-600 dark:text-purple-400' : ''}>{caso.age}</CardDescription>}
                        </div>
                      </div>
                      <Badge variant={caso.condition === 'Memorial' ? 'default' : caso.urgency === 'alta' ? 'destructive' : caso.urgency === 'media' ? 'secondary' : 'default'}
                        className={caso.condition === 'Memorial' ? 'bg-purple-600 hover:bg-purple-700' : ''}>
                        {caso.condition === 'Memorial' ? '💙 Memória' : caso.urgency === 'alta' ? 'Urgente' : caso.urgency === 'media' ? 'Importante' : 'Apoio'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm font-semibold mb-2 ${caso.condition === 'Memorial' ? 'text-purple-700 dark:text-purple-300' : 'text-primary'}`}>
                      {caso.condition}
                    </p>
                    <p className={`text-sm mb-4 ${caso.condition === 'Memorial' ? 'text-purple-700 dark:text-purple-300 whitespace-pre-line' : 'text-muted-foreground line-clamp-3'}`}>
                      {caso.description}
                    </p>
                    {caso.monthlyNeed && (
                      <div className="bg-muted p-3 rounded-lg mb-4">
                        <p className="text-sm font-semibold">Necessidade mensal: {caso.monthlyNeed}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        variant="link"
                        className={`h-auto p-0 font-semibold text-sm ${caso.condition === 'Memorial' ? 'text-purple-700 dark:text-purple-300' : 'text-primary'}`}
                        onClick={() => setSelectedCase(caso)}
                      >
                        Ver detalhes
                      </Button>
                      {caso.condition !== 'Memorial' && <DonateButton size="sm" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Necessidades Institucionais */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Necessidades Institucionais
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Itens essenciais para o funcionamento da ONG
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {necessidadesInstitucionais.map((necessidade, index) => (
                <Card
                  key={necessidade.id}
                  className="hover:shadow-strong transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <necessidade.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{necessidade.name}</CardTitle>
                          <CardDescription>{necessidade.condition}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">Institucional</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {necessidade.description}
                    </p>
                    {necessidade.monthlyNeed && (
                      <div className="bg-background border p-3 rounded-lg mb-4">
                        <p className="text-sm font-semibold">Custo mensal: {necessidade.monthlyNeed}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-primary font-semibold text-sm"
                        onClick={() => setSelectedCase(necessidade)}
                      >
                        Ver detalhes
                      </Button>
                      <DonateButton size="sm" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campanhas Passadas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Eventos e Ações
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Conheça o histórico de ações transformadoras da ABRAPA
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <span className="font-bold text-lg">{campanhasPassadas.length}</span>
                <span className="text-sm">ações apresentadas no site oficial</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campanhasPassadas.map((campaign, index) => (
                <button
                  type="button"
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className="group w-full text-left animate-slide-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={`Abrir galeria da campanha ${campaign.title}`}
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-smooth">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={campaign.image}
                        alt={campaign.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute top-4 right-4 bg-muted text-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Registro
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-smooth">
                        {campaign.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{campaign.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{campaign.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {campaign.description}
                      </p>
                      <div className="mt-4 text-primary font-semibold text-sm group-hover:underline">
                        Ver galeria →
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Galeria */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl md:text-2xl">
              {selectedCampaign?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{selectedCampaign.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{selectedCampaign.location}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                {selectedCampaign.description}
              </p>
              {selectedCampaign.active && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <DonateButton className="sm:flex-1">{selectedCampaign.ctaLabel}</DonateButton>
                  <Button
                    variant="outline"
                    className="sm:flex-1 gap-2"
                    onClick={() => handleCampaignShare(selectedCampaign)}
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar campanha
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCampaign.gallery.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={selectedCampaign.galleryAlts?.[index] ?? `${selectedCampaign.title}, registro ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 md:h-80 object-contain bg-muted hover:scale-[1.02] transition-smooth"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes do Caso */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center gap-3">
              {selectedCase && (
                <>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedCase.urgency === 'alta' ? 'bg-red-100 text-red-600' :
                    selectedCase.urgency === 'media' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <selectedCase.icon className="w-6 h-6" />
                  </div>
                  <div>
                    {selectedCase.name}
                    {selectedCase.age && <p className="text-sm font-normal text-muted-foreground">{selectedCase.age}</p>}
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-6">
              <div className="flex gap-2">
                <Badge variant={selectedCase.urgency === 'alta' ? 'destructive' : selectedCase.urgency === 'media' ? 'secondary' : 'default'}>
                  {selectedCase.urgency === 'alta' ? 'Urgente' : selectedCase.urgency === 'media' ? 'Importante' : 'Apoio'}
                </Badge>
                <Badge variant="outline">
                  {selectedCase.type === 'individual' ? 'Caso Individual' : 'Necessidade Institucional'}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">{selectedCase.condition}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCase.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Necessidades:</h4>
                <ul className="space-y-2">
                  {selectedCase.needs.map((need, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedCase.type === 'individual'
                    ? "Qualquer doação ou gesto de solidariedade faz a diferença na vida desta pessoa."
                    : "Esta necessidade institucional beneficia múltiplos assistidos pela ONG."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <DonateButton className="flex-1" />
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => handleShare(selectedCase)}
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Compartilhamento */}
      {shareData && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title={shareData.title}
          description={shareData.description}
          url={window.location.origin + "/campanhas"}
        />
      )}
    </div>
  );
};

export default Campanhas;

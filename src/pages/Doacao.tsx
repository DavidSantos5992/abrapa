import { donationPix } from "@/lib/donation";
import { Heart, Users, Shield, Handshake, Gift, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import supportCare from "@/assets/abrapa-official/natal.png";

const Doacao = () => {
  const impactStories = [{icon:Heart,title:"Apoio às famílias",description:"Assistência a pessoas em vulnerabilidade e a seus familiares.",impact:"Dignidade e acolhimento"},{icon:Users,title:"Cestas básicas",description:"Entrega de alimentos às crianças e suas famílias, conforme divulgado pela ABRAPA.",impact:"Alimentação e apoio material"},{icon:Shield,title:"Inclusão",description:"Combate ao preconceito e valorização de cada pessoa com empatia e respeito.",impact:"Solidariedade e respeito"},{icon:Gift,title:"Suplementos e remédios",description:"Apoio às necessidades das pessoas assistidas e de suas famílias.",impact:"Assistência às famílias"}];

  const paymentMethods = [
    {
      icon: Smartphone,
      title: "PIX",
      description: "Código publicado no site oficial da ABRAPA",
      highlight: true
    }
  ];

  const testimonials = [{"name":"Apoio material","role":"Ações da ABRAPA","text":"Cestas básicas, suplementos, remédios, fraldas e roupas estão entre as formas de apoio divulgadas pela instituição."},{"name":"Convivência e inclusão","role":"Ações da ABRAPA","text":"As aulas de artesanato proporcionam aprendizado, criatividade e acolhimento às pessoas assistidas."}];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <SEO
        title="Faça sua Doação - ABRAPA"
        description="Apoie o trabalho da ABRAPA Jundiaí. Consulte as informações oficiais para doação via PIX."
        url="https://abrapajundiai.org.br/doacao"
        image="/abrapa-social.png"
        keywords="ABRAPA Jundiaí, doação, PIX, solidariedade"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Faça a Diferença
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Sua Doação
                  <span className="text-primary block">Apoia Famílias</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Contribua com o trabalho da ABRAPA em Jundiaí e região. Sua solidariedade ajuda a apoiar pessoas em vulnerabilidade e suas famílias.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Apoio</div>
                  <div className="text-sm text-gray-600">Famílias Apoiadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Jundiaí</div>
                  <div className="text-sm text-gray-600">E região</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Inclusão</div>
                  <div className="text-sm text-gray-600">Dignidade</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <DonateButton size="lg" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Doar Agora
                </DonateButton>

              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={supportCare}
                  alt="Projeto Natal divulgado pela ABRAPA"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 left-0 lg:-left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Juntos Somos Mais Fortes</div>
                    <div className="text-sm text-gray-600">Sua solidariedade importa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Doe pelo PIX da ABRAPA
          </h2>
          <p className="text-gray-600 text-lg">
            Copie o código oficial abaixo e escolha o valor no aplicativo do seu banco.
          </p>
          {/* Deploy trigger: 2025-10-13 */}
        </div>            <Card className="p-8">
              <CardContent className="space-y-8">
                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Forma de Pagamento</h3>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.title}
                        className={`p-4 rounded-xl border ${
                          method.highlight
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                        }`}
                      >
                        <method.icon className={`w-8 h-8 mb-3 ${method.highlight ? "text-primary" : "text-gray-600"}`} />
                        <h4 className="font-semibold text-gray-900">{method.title}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* PIX Info */}
                  <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-semibold text-red-900 mb-2">📱 Como doar via PIX:</h4>
                    <div className="text-sm text-red-800 space-y-1">
                      <p><strong>1.</strong> Clique no botão "Copiar PIX e Doar" abaixo</p>
                      <p><strong>2.</strong> O código PIX será copiado automaticamente</p>
                      <p><strong>3.</strong> Abra o app do seu banco e escolha PIX copia e cola</p>
                      <p><strong>4.</strong> Confira a favorecida ABRAPA, escolha o valor e confirme</p>
                    </div>
                    <div className="mt-3 p-3 bg-white rounded-lg border border-red-200">
                      <p className="text-xs text-red-700 font-medium">PIX copia e cola — Banco Itaú:</p>
                      <p className="break-all font-mono text-xs text-red-900 font-semibold">{donationPix}</p>
                      <p className="text-xs text-red-600 mt-1">ABRAPA Jundiaí · CNPJ 07.055.645/0001-70</p><p className="text-xs text-red-600 mt-1">Itaú · Agência 0796 · Conta 63.623-1</p><p className="text-xs text-red-600 mt-1">PagSeguro · Agência 0001 · Conta 02001239-9</p><a className="mt-3 inline-block text-sm underline" href="https://wa.me/5511964968794" target="_blank" rel="noopener noreferrer">Tire dúvidas com a ABRAPA</a>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <div className="pt-6 border-t">
                  <DonateButton size="lg" className="w-full">
                    <Heart className="w-5 h-5 mr-2" />
                    Copiar PIX e Doar
                  </DonateButton>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Favorecida: ABRAPA · CNPJ 07.055.645/0001-70
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Sua Doação Faz a Diferença
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Veja o impacto direto que suas contribuições têm na vida das pessoas que apoiamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStories.map((story, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <story.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{story.description}</p>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="text-sm font-semibold text-primary">{story.impact}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O Que Sua Contribuição Apoia
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="text-gray-600 italic">{testimonial.text}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white space-y-6">
            <h2 className="text-3xl text-white font-bold">
              Juntos, Podemos Fazer Mais
            </h2>
            <p className="text-xl text-white opacity-90">
              Sua generosidade transforma vidas. Cada doação é um gesto de amor e esperança
              para quem mais precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DonateButton className="text-white border border-white/50">
                <Heart className="w-5 h-5 mr-2" />
                Doar Agora
              </DonateButton>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doacao;

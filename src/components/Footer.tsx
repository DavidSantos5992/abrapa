import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import logoABRAPA from "@/assets/abrapa-official/logo-abrapa.png";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logoABRAPA}
                alt="Logo ABRAPA"
                className="w-10 h-10 object-contain"
              />
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ABRAPA
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Apoio a pessoas em vulnerabilidade que vivem com HIV/AIDS e seus familiares em Jundiaí e região.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Parceiros
                </Link>
              </li>
              <li>
                <Link to="/campanhas" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Campanhas
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/doacao" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Doação
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <button
                  onClick={() => {
                    const address = "Rua Secundino Veiga, 119 — Centro, Jundiaí — SP";
                    const encodedAddress = encodeURIComponent(address);

                    // Detecta se é iOS e abre o Apple Maps, senão abre Google Maps
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

                    if (isIOS) {
                      window.open(`maps://maps.apple.com/?q=${encodedAddress}`, "_blank");
                    } else {
                      window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
                    }
                  }}
                  className="hover:text-primary transition-smooth cursor-pointer text-left"
                  title="Abrir no aplicativo de mapas"
                >
                  Rua Secundino Veiga, 119 — Centro, Jundiaí — SP
                </button>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+5511964968794"
                  className="hover:text-primary transition-smooth"
                  title="Ligar para a ABRAPA"
                >
                  (11) 96496-8794
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+551145211248"
                  className="hover:text-primary transition-smooth"
                  title="Ligar para a ABRAPA"
                >
                  (11) 4521-1248
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:contato@abrapajundiai.org.br"
                  className="break-all hover:text-primary transition-smooth"
                >
                  contato@abrapajundiai.org.br
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Redes Sociais</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/15prhtfZ7e/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/abrapa_jundiai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ABRAPA. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-sm text-muted-foreground"><Link to="/contato" className="hover:text-primary">Entre em contato com a ABRAPA Jundiaí</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

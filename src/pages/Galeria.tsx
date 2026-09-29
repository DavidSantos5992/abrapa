import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, LayoutGrid, ChevronLeft, ChevronRight, Download, Share2, Heart, Users, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { childrensDayCampaigns } from "@/data/childrensDayCampaigns";
import { timelessCampaigns } from "@/data/timelessCampaigns";

import catarina from "@/assets/abrapa-official/catarina.png";
import laura from "@/assets/abrapa-official/laura.png";
import milena from "@/assets/abrapa-official/milena.png";
import natal from "@/assets/abrapa-official/natal.png";
import criancas from "@/assets/abrapa-official/dia-criancas.png";
import move from "@/assets/abrapa-official/semana-move.png";
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
}

const childrensDayGalleryImages: GalleryImage[] = childrensDayCampaigns.flatMap(({ year, title, category, description, images }) =>
  images.map((src, index) => ({
    id: Number(`${year}${String(index + 1).padStart(2, "0")}`),
    src,
    alt: `Registro da campanha ${title}, foto ${index + 1}`,
    title: `${title} - Foto ${String(index + 1).padStart(2, "0")}`,
    category,
    date: year,
    description,
    tags: ["ABRAPA", category, year],
  })),
);

const timelessGalleryImages: GalleryImage[] = timelessCampaigns.flatMap(({ title, category, description, images }, campaignIndex) =>
  images.map((src, imageIndex) => ({
    id: 100000 + campaignIndex * 1000 + imageIndex + 1,
    src,
    alt: `Registro da campanha ${title}, foto ${imageIndex + 1}`,
    title: `${title} - Foto ${String(imageIndex + 1).padStart(2, "0")}`,
    category,
    date: "",
    description,
    tags: ["ABRAPA", category],
  })),
);

const galleryImages: GalleryImage[] = [
  ...childrensDayGalleryImages,
  ...timelessGalleryImages,
  {id:1,src:natal,alt:"Material oficial da ABRAPA: Projeto Natal",title:"Projeto Natal",category:"Eventos",date:"",description:"A ABRAPA registra uma celebração de Natal com entrega de brinquedos, roupas, calçados, medicamentos e cestas básicas às crianças e famílias assistidas.",tags:["ABRAPA","solidariedade"]},{id:2,src:criancas,alt:"Material oficial da ABRAPA: Dia das Crianças",title:"Dia das Crianças",category:"Eventos",date:"",description:"A festa do Dia das Crianças reúne a solidariedade de amigos e contribuintes em uma celebração dedicada às crianças assistidas pela ABRAPA.",tags:["ABRAPA","solidariedade"]},{id:3,src:move,alt:"Material oficial da ABRAPA: Semana Move no SESC",title:"Semana Move no SESC",category:"Eventos",date:"",description:"A ABRAPA compartilha a participação de uma criança assistida na Semana Move no SESC, em uma atividade de inclusão pelo esporte.",tags:["ABRAPA","solidariedade"]},{id:4,src:catarina,alt:"Material oficial da ABRAPA: Projeto Catarina",title:"Projeto Catarina",category:"Projetos",date:"",description:"O Projeto Catarina é apresentado pela ABRAPA como uma iniciativa de apoio às necessidades de alimentação especial de uma criança e de sua família.",tags:["ABRAPA","solidariedade"]},{id:5,src:laura,alt:"Material oficial da ABRAPA: Projeto Laurinha",title:"Projeto Laurinha",category:"Projetos",date:"",description:"O Projeto Laurinha mobiliza solidariedade para apoiar uma criança com cardiopatia congênita e sua família, conforme apresentado no site da ABRAPA.",tags:["ABRAPA","solidariedade"]},{id:6,src:milena,alt:"Material oficial da ABRAPA: Projeto Milena",title:"Projeto Milena",category:"Projetos",date:"",description:"O Projeto Milena faz parte das iniciativas divulgadas pela ABRAPA para apoiar crianças com necessidades específicas e suas famílias.",tags:["ABRAPA","solidariedade"]},
];

const IMAGES_PER_PAGE = 12;
const IMAGE_HASH_PREFIX = "#imagem-";

const getGalleryYear = (date: string) => date ? date.slice(0, 4) : "Sem data";

const formatGalleryDate = (date: string) => {
  if (!date) return "Sem data publicada";
  if (/^\d{4}$/.test(date)) {
    return date;
  }

  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split("-").map(Number);
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
      timeZone: "America/Sao_Paulo"
    }).format(new Date(year, month - 1, 1, 12));
  }

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo"
  }).format(new Date(year, month - 1, day, 12));
};

const Galeria = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedYear, setSelectedYear] = useState<string>("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Categorias e anos únicos
  const categories = ["Todas", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const years = ["Todos", ...Array.from(new Set(galleryImages.map(img => getGalleryYear(img.date)))).sort().reverse()];

  // Filtrar imagens
  const filteredImages = useMemo(() => {
    return galleryImages.filter(image => {
      const categoryMatch = selectedCategory === "Todas" || image.category === selectedCategory;
      const yearMatch = selectedYear === "Todos" || getGalleryYear(image.date) === selectedYear;
      return categoryMatch && yearMatch;
    });
  }, [selectedCategory, selectedYear]);

  useEffect(() => {
    const imageId = hash.startsWith(IMAGE_HASH_PREFIX)
      ? Number(hash.slice(IMAGE_HASH_PREFIX.length))
      : NaN;
    setSelectedImage(galleryImages.find((image) => image.id === imageId) ?? null);
  }, [hash]);

  // Paginar imagens
  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    return filteredImages.slice(0, startIndex + IMAGES_PER_PAGE);
  }, [filteredImages, currentPage]);

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const hasMore = currentPage < totalPages;

  const loadMore = async () => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      // Simular loading
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("Todas");
    setSelectedYear("Todos");
    setCurrentPage(1);
  };

  // Navegação no modal
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  }, [filteredImages, selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigateImage("prev");
      if (event.key === "ArrowRight") navigateImage("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  const handleShare = async () => {
    if (!selectedImage) return;

    const shareData = {
      title: selectedImage.title,
      text: selectedImage.description,
      url: `${window.location.origin}/galeria${IMAGE_HASH_PREFIX}${selectedImage.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      toast.success("Link da galeria copiado.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Não foi possível compartilhar esta imagem.");
    }
  };

  const handleDownload = () => {
    if (!selectedImage) return;

    const link = document.createElement("a");
    const extension = selectedImage.src.match(/\.([a-z0-9]+)(?:\?|$)/i)?.[1] ?? "jpg";
    link.href = selectedImage.src;
    link.download = `${selectedImage.title.toLowerCase().replace(/ /g, "-")}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const closeSelectedImage = () => {
    setSelectedImage(null);
    if (window.location.hash.startsWith(IMAGE_HASH_PREFIX)) {
      navigate("/galeria", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <SEO
        title="Galeria de Fotos - ABRAPA"
        description="Veja nossa galeria com todas as ações, campanhas e eventos realizados pela ABRAPA. Momentos especiais de apoio e solidariedade em Jundiaí."
        url="https://abrapajundiai.org.br/galeria"
        image="/abrapa-social.png"
        keywords="ABRAPA Jundiaí, galeria, projetos, eventos"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <ImageIcon className="w-8 h-8 text-primary" />
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Nossa Galeria
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Momentos que Fazem a{" "}
              <span className="text-primary">Diferença</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore nossa galeria e veja os momentos especiais, campanhas realizadas e o impacto das nossas ações na comunidade.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{galleryImages.length}</div>
                <div className="text-sm text-gray-600">Fotos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">Categorias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{new Set(galleryImages.map(image => image.category)).size}</div>
                <div className="text-sm text-gray-600">Frentes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-gray-50 border-b">
        <h2 className="sr-only">Filtros da galeria</h2>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 shadow-md sm:grid-cols-2 lg:grid-cols-[auto_minmax(160px,190px)_minmax(240px,334px)_1fr] lg:items-end"
          >
            <Button onClick={resetFilters} className="w-full gap-2 sm:w-auto">
              <LayoutGrid className="h-4 w-4" />
              Ver todas
            </Button>

            <div className="space-y-2">
              <span className="block text-sm font-semibold text-gray-800">Ano</span>
              <Select
                value={selectedYear}
                onValueChange={(value) => {
                  setSelectedYear(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-12 w-full" aria-label="Filtrar por ano">
                  <SelectValue placeholder="Todos os anos" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year === "Todos" ? "Todos os anos" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-semibold text-gray-800">Campanha</span>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-12 w-full" aria-label="Filtrar por categoria">
                  <SelectValue placeholder="Todas as campanhas" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "Todas" ? "Todas as campanhas" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="font-semibold text-gray-600 sm:col-span-2 lg:col-span-1 lg:self-center lg:justify-self-end lg:pt-6" aria-live="polite">
              {filteredImages.length} {filteredImages.length === 1 ? 'foto encontrada' : 'fotos encontradas'}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de Imagens */}
      <section className="py-16">
        <h2 className="sr-only">Fotos das ações da ABRAPA</h2>
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedYear}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedImages.map((image, index) => (
                <motion.button
                  type="button"
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ampliar imagem: ${image.title}`}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <LazyImage
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                        <p className="text-xs opacity-90">{image.category}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {image.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatGalleryDate(image.date)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Botão Carregar Mais */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <Button
                onClick={loadMore}
                disabled={isLoading}
                size="lg"
                className="gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
                {isLoading ? 'Carregando...' : 'Carregar Mais'}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal de Imagem */}
      <Dialog open={!!selectedImage} onOpenChange={closeSelectedImage}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-0 overflow-hidden flex flex-col" aria-describedby={undefined}>
          {selectedImage && (
            <>
              {/* Header */}
              <DialogHeader className="p-4 md:p-6 pb-4 shrink-0 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="text-lg md:text-xl font-bold truncate">
                      {selectedImage.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {selectedImage.category}
                      </Badge>
                      <span className="text-xs md:text-sm text-gray-500">
                        {formatGalleryDate(selectedImage.date)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="gap-2 hidden md:flex" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 hidden md:flex" onClick={handleDownload}>
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    {/* Botões mobile apenas com ícones */}
                    <Button variant="outline" size="sm" className="md:hidden p-2" onClick={handleShare} aria-label="Compartilhar imagem">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="md:hidden p-2" onClick={handleDownload} aria-label="Baixar imagem">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              {/* Imagem - Container com altura calculada */}
              <div className="flex-1 relative flex items-center justify-center p-4 md:p-6 overflow-hidden min-h-0">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                  />
                </div>

                {/* Navegação */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 md:w-10 md:h-10 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                  onClick={() => navigateImage('prev')}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 md:w-10 md:h-10 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                  onClick={() => navigateImage('next')}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 pt-4 border-t shrink-0">
                <p className="text-gray-600 mb-3 text-sm md:text-base line-clamp-2">
                  {selectedImage.description}
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {selectedImage.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Galeria;

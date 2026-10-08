import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";

const instagramProfileUrl = "https://www.instagram.com/abrapa_jundiai/";

type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
  timestamp: string | null;
};

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch("/api/instagram");

  if (!response.ok) {
    throw new Error("Não foi possível carregar as publicações do Instagram.");
  }

  const result: { posts?: InstagramPost[] } = await response.json();
  return Array.isArray(result.posts) ? result.posts.slice(0, 3) : [];
}

function getPostAltText(post: InstagramPost, publishedAt: string) {
  const caption = post.caption.replace(/\s+/g, " ").trim();
  return caption
    ? `Foto publicada pela ABRAPA no Instagram em ${publishedAt}: ${caption.slice(0, 180)}`
    : `Foto publicada pela ABRAPA no Instagram em ${publishedAt}`;
}

function getPublishedAt(timestamp?: string | null) {
  if (!timestamp) return "recentemente";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "recentemente";

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

const InstagramFeed = () => {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["instagram-feed"],
    queryFn: fetchInstagramPosts,
    staleTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <section aria-labelledby="instagram-feed-title" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2
              id="instagram-feed-title"
              className="font-heading text-3xl font-bold text-foreground md:text-4xl"
            >
              Acompanhe a ABRAPA no Instagram
            </h2>
            <p className="mt-3 text-muted-foreground">
              Veja as publicações mais recentes da ABRAPA Jundiaí.
            </p>
          </div>
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary px-5 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Instagram aria-hidden="true" className="h-5 w-5" />
            Ver perfil
          </a>
        </div>

        {isLoading ? (
          <div
            aria-busy="true"
            aria-live="polite"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <span className="sr-only">Carregando publicações do Instagram</span>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="aspect-square animate-pulse rounded-2xl bg-background"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const publishedAt = getPublishedAt(post.timestamp);

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-background shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <img
                    src={post.imageUrl}
                    alt={getPostAltText(post, publishedAt)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-primary shadow-sm"
                  >
                    <Instagram className="h-5 w-5" />
                  </span>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-background px-6 py-10 text-center">
            <p className="mb-5 text-muted-foreground">
              {isError
                ? "Não foi possível carregar as publicações agora. Acompanhe as novidades diretamente no perfil da ABRAPA."
                : "Não há publicações de fotos disponíveis no momento. Acompanhe as novidades diretamente no perfil da ABRAPA."}
            </p>
            <a
              href={instagramProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Abrir Instagram da ABRAPA
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;

const sortAssets = (assets: Record<string, string>) =>
  Object.entries(assets)
    .sort(([left], [right]) => left.localeCompare(right, "pt-BR", { numeric: true }))
    .map(([, src]) => src);

const images2025 = sortAssets(
  import.meta.glob<string>("../assets/campaigns/dia-das-criancas/2025/*.jpg", {
    eager: true,
    import: "default",
  }),
);

const images2024 = sortAssets(
  import.meta.glob<string>("../assets/campaigns/dia-das-criancas/2024/*.jpg", {
    eager: true,
    import: "default",
  }),
);

export const childrensDayCampaigns = [
  {
    year: "2025",
    title: "Dia das Crianças 2025",
    category: "Dia das Crianças",
    description: "Registros da campanha Dia das Crianças da ABRAPA em 2025.",
    location: "Jundiaí e região",
    sourceUrl: "https://drive.google.com/drive/folders/1v-4XJb7x4yiYpfYZ7pC2kxQT8mXL9G3Q",
    images: images2025,
  },
  {
    year: "2024",
    title: "Dia das Crianças 2024",
    category: "Dia das Crianças",
    description: "Registros da campanha Dia das Crianças da ABRAPA em 2024.",
    location: "Jundiaí e região",
    sourceUrl: "https://drive.google.com/drive/folders/1RlX3Bv89KxnJ7347nq1URdvkSLH_Q6me",
    images: images2024,
  },
];

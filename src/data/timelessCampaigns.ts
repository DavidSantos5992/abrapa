const sortAssets = (assets: Record<string, string>) =>
  Object.entries(assets)
    .sort(([left], [right]) => left.localeCompare(right, "pt-BR", { numeric: true }))
    .map(([, src]) => src);

const campaignAssets = import.meta.glob<string>("../assets/campaigns/**/*.{jpg,JPG,jpeg,JPEG}", {
  eager: true,
  import: "default",
  query: "?url",
});

const imagesIn = (folder: string) =>
  sortAssets(
    Object.fromEntries(
      Object.entries(campaignAssets).filter(([path]) => path.includes(`/campaigns/${folder}/`)),
    ),
  );

export const timelessCampaigns = [
  {
    title: "Entregas de Remédios e Cestas",
    category: "Entregas de Remédios e Cestas",
    folder: "Entregas Remédios e Cesta",
    description: "Registros das entregas de remédios e cestas realizadas pela ABRAPA.",
  },
  {
    title: "Dia das Mães",
    category: "Dia das Mães",
    folder: "Dia das Mães",
    description: "Registros da campanha Dia das Mães da ABRAPA.",
  },
  {
    title: "Páscoa",
    category: "Páscoa",
    folder: "Páscoa ",
    description: "Registros da campanha de Páscoa da ABRAPA.",
  },
  {
    title: "Natal",
    category: "Natal",
    folder: "Natal ",
    description: "Registros da campanha de Natal da ABRAPA.",
  },
  {
    title: "Doações Insanos",
    category: "Doações Insanos",
    folder: "Doações insanos",
    description: "Registros das doações da campanha Insanos.",
  },
].map(({ folder, ...campaign }) => ({
  ...campaign,
  images: imagesIn(folder),
}));

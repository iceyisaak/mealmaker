// origins.constants.ts
export interface Origin {
  id: string;
  label: string;
  emoji: string;
  accent: string;
}

export const ORIGINS: Origin[] = [
  { id: "American", label: "American", emoji: "🇺🇸", accent: "#C8102E" },
  { id: "British", label: "British", emoji: "🇬🇧", accent: "#012169" },
  { id: "Canadian", label: "Canadian", emoji: "🇨🇦", accent: "#FF0000" },
  { id: "Chinese", label: "Chinese", emoji: "🇨🇳", accent: "#DE2910" },
  { id: "Croatian", label: "Croatian", emoji: "🇭🇷", accent: "#FF0000" },
  { id: "Dutch", label: "Dutch", emoji: "🇳🇱", accent: "#AE1C28" },
  { id: "Egyptian", label: "Egyptian", emoji: "🇪🇬", accent: "#CE1126" },
  { id: "French", label: "French", emoji: "🇫🇷", accent: "#0055A4" },
  { id: "Greek", label: "Greek", emoji: "🇬🇷", accent: "#0D5EAF" },
  { id: "Indian", label: "Indian", emoji: "🇮🇳", accent: "#FF9933" },
  { id: "Irish", label: "Irish", emoji: "🇮🇪", accent: "#169B62" },
  { id: "Italian", label: "Italian", emoji: "🇮🇹", accent: "#009246" },
  { id: "Jamaican", label: "Jamaican", emoji: "🇯🇲", accent: "#009B3A" },
  { id: "Japanese", label: "Japanese", emoji: "🇯🇵", accent: "#BC002D" },
  { id: "Kenyan", label: "Kenyan", emoji: "🇰🇪", accent: "#006600" },
  { id: "Malaysian", label: "Malaysian", emoji: "🇲🇾", accent: "#CC0001" },
  { id: "Mexican", label: "Mexican", emoji: "🇲🇽", accent: "#006847" },
  { id: "Moroccan", label: "Moroccan", emoji: "🇲🇦", accent: "#C1272D" },
  { id: "Polish", label: "Polish", emoji: "🇵🇱", accent: "#DC143C" },
  { id: "Portuguese", label: "Portuguese", emoji: "🇵🇹", accent: "#006600" },
  { id: "Russian", label: "Russian", emoji: "🇷🇺", accent: "#D52B1E" },
  { id: "Spanish", label: "Spanish", emoji: "🇪🇸", accent: "#C60B1E" },
  { id: "Thai", label: "Thai", emoji: "🇹🇭", accent: "#A51931" },
  { id: "Tunisian", label: "Tunisian", emoji: "🇹🇳", accent: "#E70013" },
  { id: "Turkish", label: "Turkish", emoji: "🇹🇷", accent: "#E30A17" },
  { id: "Ukrainian", label: "Ukrainian", emoji: "🇺🇦", accent: "#005BBB" },
  { id: "Vietnamese", label: "Vietnamese", emoji: "🇻🇳", accent: "#DA251D" },
];

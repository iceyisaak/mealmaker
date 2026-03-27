export const CATEGORY_META: Record<
  string,
  { icon: string; tagline: string; color: string }
> = {
  Side: {
    icon: "🍞",
    tagline: "The perfect accompaniment",
    color: "from-amber-900/40 to-stone-900/0",
  },
  Beef: {
    icon: "🥩",
    tagline: "Bold, hearty, satisfying",
    color: "from-red-900/40 to-stone-900/0",
  },
  Chicken: {
    icon: "🍗",
    tagline: "Versatile and beloved",
    color: "from-yellow-900/40 to-stone-900/0",
  },
  Dessert: {
    icon: "🍰",
    tagline: "Sweet endings",
    color: "from-pink-900/40 to-stone-900/0",
  },
  Lamb: {
    icon: "🫕",
    tagline: "Rich and aromatic",
    color: "from-orange-900/40 to-stone-900/0",
  },
  Pasta: {
    icon: "🍝",
    tagline: "Comfort in every strand",
    color: "from-amber-900/40 to-stone-900/0",
  },
  Pork: {
    icon: "🥓",
    tagline: "Smoky, rich, irresistible",
    color: "from-rose-900/40 to-stone-900/0",
  },
  Seafood: {
    icon: "🦞",
    tagline: "Fresh from the ocean",
    color: "from-cyan-900/40 to-stone-900/0",
  },
  Starter: {
    icon: "🥗",
    tagline: "Begin the experience",
    color: "from-green-900/40 to-stone-900/0",
  },
  Vegan: {
    icon: "🥦",
    tagline: "Plant-powered goodness",
    color: "from-emerald-900/40 to-stone-900/0",
  },
  Vegetarian: {
    icon: "🫑",
    tagline: "Nature on the plate",
    color: "from-lime-900/40 to-stone-900/0",
  },
  Breakfast: {
    icon: "🍳",
    tagline: "Start the day right",
    color: "from-yellow-900/40 to-stone-900/0",
  },
  Goat: {
    icon: "🐐",
    tagline: "A world apart",
    color: "from-stone-700/40 to-stone-900/0",
  },
  Miscellaneous: {
    icon: "🍴",
    tagline: "Something for everyone",
    color: "from-stone-900/40 to-stone-900/0",
  },
};

export const getFallbackMeta = (category: string) => ({
  icon: "🍽️",
  tagline: `Explore ${category} recipes`,
  color: "from-stone-900/40 to-stone-900/0",
});

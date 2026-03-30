import { useState, useRef, useEffect } from "react";
import {
  useGetMealCategories,
  useGetMeals,
  useGetMealOrigin,
  useGetMealsByCategory,
  useGetMealsByOrigin,
} from "../../apis/recipe-api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "chef";
  timestamp: Date;
}

const heroBg =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2670&auto=format&fit=crop";

export const ChefbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm ChefBot. I can help you find the perfect dish. Would you like to explore recipes by Cuisine, Category, or a specific Ingredient?",
      sender: "chef",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // API Hooks
  const { data: categories } = useGetMealCategories();
  const { data: origins } = useGetMealOrigin();
  const { refetch: fetchByName } = useGetMeals(searchQuery);
  const { refetch: fetchByCategory } = useGetMealsByCategory(searchQuery);
  const { refetch: fetchByOrigin } = useGetMealsByOrigin(searchQuery);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatRecipe = (meal: any) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) ingredients.push(`${meas} ${ing}`.trim());
    }
    return `🍳 **${meal.strMeal}**\n\n🛒 *Ingredients:*\n${ingredients.map((i) => `• ${i}`).join("\n")}\n\n📝 *Instructions:*\n${meal.strInstructions.substring(0, 600)}...`;
  };

  const generateResponse = async (query: string): Promise<string> => {
    const lower = query.toLowerCase();

    // 1. Intent: Browse Categories
    if (lower.includes("category") || lower.includes("categories")) {
      const names = categories
        ?.slice(0, 10)
        .map((c) => c.strCategory)
        .join(", ");
      return `I have recipes in these categories: ${names}. Which one sounds good?`;
    }

    // 2. Intent: Browse Cuisines (Origins)
    if (
      lower.includes("cuisine") ||
      lower.includes("origin") ||
      lower.includes("country")
    ) {
      const names = origins
        ?.slice(0, 10)
        .map((o) => o.strArea)
        .join(", ");
      return `I can cook dishes from: ${names}. Any specific region you're interested in?`;
    }

    // 3. Dynamic Search Logic
    // Check if the input matches a known category
    const matchedCat = categories?.find((c) =>
      lower.includes(c.strCategory.toLowerCase()),
    );
    if (matchedCat) {
      setSearchQuery(matchedCat.strCategory);
      const { data } = await fetchByCategory();
      return `Found some great ${matchedCat.strCategory} dishes:\n${data
        ?.slice(0, 5)
        .map((m) => `• ${m.strMeal}`)
        .join("\n")}\n\nWhich one would you like the full recipe for?`;
    }

    // Check if the input matches a known origin
    const matchedOrigin = origins?.find((o) =>
      lower.includes(o.strArea.toLowerCase()),
    );
    if (matchedOrigin) {
      setSearchQuery(matchedOrigin.strArea);
      const { data } = await fetchByOrigin();
      return `Here is some authentic ${matchedOrigin.strArea} inspiration:\n${data
        ?.slice(0, 5)
        .map((m) => `• ${m.strMeal}`)
        .join("\n")}\n\nShall I get the instructions for one of these?`;
    }

    // 4. Specific Search (Ingredients or Name)
    setSearchQuery(query);
    const { data } = await fetchByName();
    if (data && data.length > 0) {
      if (data.length === 1) return formatRecipe(data[0]);
      return `I found a few matches for "${query}":\n${data
        .slice(0, 5)
        .map((m) => `• ${m.strMeal}`)
        .join("\n")}\n\nTell me the full name of the one you want to cook!`;
    }

    return "I want to make sure I find exactly what you need. Are we looking for a specific ingredient, a type of cuisine, or a meal category?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userQuery = inputValue;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userQuery,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await generateResponse(userQuery);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "chef",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark font-barlow text-stone-cream">
      {/* Hero */}
      <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-12 text-center overflow-hidden">
        <img
          src={heroBg}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          alt=""
        />
        <div className="relative">
          <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.4em] text-amber-brand">
            AI Culinary Guide
          </span>
          <h1 className="font-playfair text-4xl font-black text-ink">
            ChefBot
          </h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col h-[600px] rounded-xl border border-stone-warm/10 bg-surface-card shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-surface-hover p-4 border-b border-stone-warm/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-brand/20 flex items-center justify-center text-xl">
              👨‍🍳
            </div>
            <div>
              <h2 className="font-playfair font-bold text-white">ChefBot</h2>
              <p className="text-[10px] text-stone-muted uppercase tracking-widest italic">
                Live Kitchen Assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-dark/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-amber-brand text-white"
                      : "bg-surface-hover text-stone-cream border border-stone-warm/5"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-stone-muted animate-pulse">
                Chef is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-surface-hover border-t border-stone-warm/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about cuisines, categories, or ingredients..."
                className="flex-1 bg-surface-card border border-stone-warm/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-brand transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping}
                className="bg-amber-brand hover:bg-amber-light px-6 py-2 rounded-lg text-white font-bold transition-all disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefbotPage;

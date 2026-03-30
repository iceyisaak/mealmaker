import { useState, useRef, useEffect } from "react";
import {
  useGetMealCategories,
  useGetMeals,
  useGetMealOrigin,
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
      text: "Hello! I'm ChefBot. I can help you find recipes by Category, Cuisine, or by the Ingredients you have. What are we cooking today?",
      sender: "chef",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- API Hooks ---
  const { data: categories } = useGetMealCategories();
  const { data: origins } = useGetMealOrigin();
  const { data: meals, isFetching } = useGetMeals(searchQuery);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ THE BRAIN: Watch for API results and respond only when data is ready
  useEffect(() => {
    if (searchQuery && !isFetching && meals) {
      let responseText = "";

      if (meals.length > 0) {
        // If it's a single result, we could format the whole recipe,
        // but for discovery, we list the top matches.
        const list = meals
          .slice(0, 5)
          .map((m) => `• ${m.strMeal}`)
          .join("\n");
        responseText = `I found some great options for "${searchQuery}":\n\n${list}\n\nWhich one would you like the full recipe for?`;
      } else {
        responseText = `I couldn't find any recipes for "${searchQuery}". Try a different ingredient or a broader category!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: responseText,
          sender: "chef",
          timestamp: new Date(),
        },
      ]);

      setIsTyping(false);
      setSearchQuery(""); // Clear the trigger
    }
  }, [meals, isFetching, searchQuery]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userQuery = inputValue.trim();
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

    const lower = userQuery.toLowerCase();

    // 1. Check Categories API data for matches
    const matchedCat = categories?.find((c) =>
      lower.includes(c.strCategory.toLowerCase()),
    );
    if (matchedCat) {
      setSearchQuery(matchedCat.strCategory);
      return;
    }

    // 2. Check Origins API data for matches
    const matchedOrigin = origins?.find((o) =>
      lower.includes(o.strArea.toLowerCase()),
    );
    if (matchedOrigin) {
      setSearchQuery(matchedOrigin.strArea);
      return;
    }

    // 3. Fallback: General Ingredient/Name Search
    setSearchQuery(userQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark font-barlow text-stone-cream">
      {/* Hero section */}
      <div className="relative border-b border-amber-brand/10 bg-stone-cream px-6 py-12 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-stone-cream/70" />
        </div>
        <div className="relative">
          <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.3em] text-amber-brand">
            AI Kitchen Assistant
          </span>
          <h1 className="mb-3 font-playfair text-5xl font-black text-ink">
            ChefBot
          </h1>
        </div>
      </div>

      {/* Chat interface */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-stone-warm/10 bg-surface-card shadow-2xl">
          {/* Header */}
          <div className="border-b border-stone-warm/10 bg-surface-hover px-6 py-4 flex items-center gap-3">
            <div className="h-10 w-10 items-center justify-center rounded-full bg-amber-brand/20 flex text-xl">
              👨‍🍳
            </div>
            <div>
              <h2 className="font-playfair text-lg font-semibold text-white">
                ChefBot
              </h2>
              <p className="text-xs text-stone-muted">
                Online • Powered by TheMealDB
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-amber-brand text-white"
                      : "bg-surface-hover text-stone-cream border border-stone-warm/5"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="mt-1 text-[10px] opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="rounded-lg bg-surface-hover px-4 py-2 text-xs text-amber-brand italic">
                  Chef is checking the kitchen...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-stone-warm/10 bg-surface-hover/50 px-6 py-4">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Try 'Chicken', 'Italian', or 'Dessert'..."
                className="flex-1 rounded-lg border border-stone-warm/10 bg-surface-card px-4 py-2.5 text-sm text-white focus:border-amber-brand focus:outline-none"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="rounded-lg bg-amber-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-amber-light disabled:opacity-50"
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

import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  useGetMealCategories,
  useGetMeals,
  useGetMealOrigin,
} from "../../apis/recipe-api";
import { Link } from "@tanstack/react-router";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

interface Message {
  id: string;
  text: string | ReactNode;
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
  const [engine, setEngine] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- API Hooks ---
  const { data: categories } = useGetMealCategories();
  const { data: origins } = useGetMealOrigin();
  const { data: meals, isFetching } = useGetMeals(searchQuery);

  // Initialize AI Engine
  useEffect(() => {
    const initEngine = async () => {
      const res = await CreateMLCEngine("Llama-3-8B-Instruct-q4f16_1-MLC");
      setEngine(res);
    };
    initEngine();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Helper to add bot messages
  const addBotMessage = (content: string | ReactNode) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: content,
        sender: "chef",
        timestamp: new Date(),
      },
    ]);
  };

  const handleAIResponse = async (prompt: string) => {
    if (!engine) {
      addBotMessage(
        "I'm still setting up my kitchen tools. Try again in a second!",
      );
      return;
    }

    setIsTyping(true);
    try {
      const reply = await engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are ChefBot. Keep responses brief and culinary-focused.",
          },
          { role: "user", content: prompt },
        ],
      });

      const botText = reply.choices[0].message.content || "I'm stumped!";
      addBotMessage(botText);
    } catch (e) {
      addBotMessage("My stove is acting up! Can you try that again?");
    } finally {
      setIsTyping(false);
    }
  };

  // Watch for API results
  useEffect(() => {
    if (searchQuery && !isFetching && meals) {
      if (meals.length > 0) {
        const mealElements = (
          <div className="flex flex-col gap-2">
            <p>I found some great options for "{searchQuery}":</p>
            <ul className="space-y-1">
              {meals.slice(0, 5).map((m) => (
                <li key={m.idMeal} className="flex items-start gap-2">
                  <span>•</span>
                  <Link
                    to="/meal/$id"
                    params={{ id: m.idMeal }}
                    className="text-amber-brand underline hover:text-amber-light transition-colors font-medium"
                  >
                    {m.strMeal}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[11px] opacity-70 italic">
              Click a recipe to see the full details.
            </p>
          </div>
        );
        addBotMessage(mealElements);
      } else {
        handleAIResponse(`I couldn't find recipes for ${searchQuery}.`);
      }
      setIsTyping(false);
      setSearchQuery("");
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
    const matchedCat = categories?.find((c) =>
      lower.includes(c.strCategory.toLowerCase()),
    );
    const matchedOrigin = origins?.find((o) =>
      lower.includes(o.strArea.toLowerCase()),
    );

    if (matchedCat) {
      setSearchQuery(matchedCat.strCategory);
    } else if (matchedOrigin) {
      setSearchQuery(matchedOrigin.strArea);
    } else {
      setSearchQuery(userQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark font-barlow text-stone-cream">
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

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-stone-warm/10 bg-surface-card shadow-2xl">
          <div className="border-b border-stone-warm/10 bg-surface-hover px-6 py-4 flex items-center gap-3">
            {/* Avatar Container with Relative Positioning */}
            <div className="relative">
              <div className="h-10 w-10 items-center justify-center rounded-full bg-amber-brand/20 flex text-xl">
                👨‍🍳
              </div>
              {/* Green Online Dot */}
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-surface-hover ring-1 ring-green-500/20 animate-pulse"></span>
            </div>

            <div>
              <h2 className="font-playfair text-lg font-semibold text-white">
                ChefBot
              </h2>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-stone-muted">
                  Online • Powered by Local AI
                </p>
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto px-6 py-6 space-y-4 bg-surface-dark/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed animate-fade-up ${
                    message.sender === "user"
                      ? "bg-amber-brand text-white"
                      : "bg-surface-hover text-stone-cream border border-stone-warm/5"
                  }`}
                >
                  {typeof message.text === "string" ? (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  ) : (
                    message.text
                  )}
                  <p className="mt-1 text-[10px] opacity-50 text-right">
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
                className="rounded-lg bg-amber-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-amber-light disabled:opacity-50 transition-colors"
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

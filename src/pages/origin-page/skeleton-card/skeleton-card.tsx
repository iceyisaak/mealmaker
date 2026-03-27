export const SkeletonCard = ({ i }: { i: number }) => (
  <div
    className="bg-white rounded-xl overflow-hidden shadow-md animate-[fadeUp_0.4s_ease_both]"
    style={{ animationDelay: `${i * 80}ms` }}
  >
    <div
      className="aspect-[4/3] w-full animate-[shimmer_1.4s_infinite]
                    bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                    bg-[length:200%_100%]"
    />
    <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
      <div
        className="h-3 w-[30%] rounded-sm animate-[shimmer_1.4s_infinite]
                      bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                      bg-[length:200%_100%]"
      />
      <div
        className="h-3 w-[75%] rounded-sm animate-[shimmer_1.4s_infinite]
                      bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200
                      bg-[length:200%_100%]"
      />
    </div>
  </div>
);

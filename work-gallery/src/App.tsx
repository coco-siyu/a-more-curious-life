import { useCallback, useEffect, useState } from "react";
import Gallery from "./Gallery";
import { EXHIBITS } from "./exhibits";

export default function App() {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const exhibitCount = EXHIBITS.length;

  const go = useCallback(
    (direction: number) => {
      setFocused(false);
      setIndex((current) => (current + direction + exhibitCount) % exhibitCount);
    },
    [exhibitCount],
  );

  const select = useCallback((nextIndex: number) => {
    setIndex((currentIndex) => {
      setFocused(currentIndex === nextIndex ? (current) => !current : true);
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") go(1);
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(-1);
      else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setFocused((current) => !current);
      } else if (event.key === "Escape") setFocused(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go]);

  const exhibit = EXHIBITS[index] ?? EXHIBITS[0];

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <Gallery index={index} focused={focused} onSelect={select} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/50" />

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
        <div>
          <a
            className="pointer-events-auto inline-block font-display text-3xl leading-none tracking-tight hover:opacity-60 md:text-5xl"
            href="../index.html"
            aria-label="Return to A More Curious Life"
          >
            Coco Chen
          </a>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Permanent Collection · Works 2023–2026
          </p>
          <a
            className="pointer-events-auto mt-3 inline-block text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            href="../index.html"
          >
            ← A More Curious Life
          </a>
        </div>
        <p className="hidden text-right text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">
          ← → to walk
          <br />
          Enter / click to inspect
        </p>
      </header>

      <nav
        className="absolute bottom-0 left-0 flex w-full flex-col gap-4 p-6 md:w-auto md:p-8"
        aria-label="Gallery exhibits"
      >
        <div
          className={`transition-opacity duration-500 ${focused ? "opacity-0 md:opacity-100" : "opacity-100"}`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {exhibit.label}
          </p>
          <p className="font-display text-2xl md:text-4xl">{exhibit.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="border border-border px-4 py-2 text-sm hover:bg-foreground hover:text-background"
            aria-label="Previous exhibit"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setFocused((current) => !current)}
            className="bg-primary px-4 py-2 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90"
          >
            {focused ? "Step back" : "Inspect"}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="border border-border px-4 py-2 text-sm hover:bg-foreground hover:text-background"
            aria-label="Next exhibit"
          >
            →
          </button>
        </div>
        <ol className="flex gap-1">
          {EXHIBITS.map((item, itemIndex) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={`Open ${item.title}`}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => {
                  setFocused(false);
                  setIndex(itemIndex);
                }}
                className={`h-8 w-9 border text-xs ${
                  itemIndex === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.id}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <aside
        aria-hidden={!focused}
        inert={!focused}
        className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border border-border bg-plaque p-8 text-plaque-foreground shadow-xl transition-transform duration-700 ease-out md:bottom-8 md:right-8 md:top-auto md:h-auto md:max-h-[80vh] ${
          focused ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <button
          type="button"
          onClick={() => setFocused(false)}
          className="absolute right-4 top-4 text-xs uppercase tracking-widest opacity-60 hover:opacity-100"
        >
          Close ✕
        </button>
        <p className="text-xs uppercase tracking-[0.3em] opacity-60">
          {exhibit.label} · {exhibit.category}
        </p>
        <h2 className="mt-3 font-display text-4xl leading-none">{exhibit.title}</h2>
        <p className="mt-2 text-sm italic opacity-80">
          {exhibit.medium}, {exhibit.year}
        </p>
        <hr className="my-5 border-plaque-foreground/30" />
        <p className="text-sm leading-relaxed">{exhibit.overview}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] opacity-60">Materials</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {exhibit.stack.map((item) => (
            <li key={item} className="border border-plaque-foreground/40 px-2 py-1 text-xs">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {exhibit.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="bg-plaque-foreground px-3 py-2 text-xs uppercase tracking-widest text-plaque hover:bg-primary"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] opacity-50">
          Acc. no. CC.{exhibit.year}.{exhibit.id}
        </p>
      </aside>
    </main>
  );
}

"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

const IntroContext = createContext(false);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const sync = () => setDone(document.documentElement.dataset.intro === "done");
    sync();
    window.addEventListener("awx:intro-complete", sync);
    return () => window.removeEventListener("awx:intro-complete", sync);
  }, []);

  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>;
}

export function useIntroDone() {
  return useContext(IntroContext);
}

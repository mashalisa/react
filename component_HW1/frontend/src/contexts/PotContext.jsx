import { useState } from "react";
import { createContext } from "react";

export const PotContext = createContext(null);

export function PotContextProvider({ children }) {
	const [pot, setPot] = useState(null);
	return <PotContext.Provider value={{ pot, setPot }}>{children}</PotContext.Provider>;
}


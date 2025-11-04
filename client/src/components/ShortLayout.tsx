import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface ShortLayoutProps {
    children: ReactNode;
}

export const ShortLayout = ({children}: ShortLayoutProps) => {
    return (
        <>
            <Header isShort/>
            <main>{children}</main>
            <Footer />
        </>
    )
}
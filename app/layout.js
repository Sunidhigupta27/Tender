import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollEffects from "@/components/ScrollEffects";

export const metadata = {
  title: "Tender Agent — AI assistant for Indian tenders",
  description:
    "Tender Agent is an AI-based tender assistant. Review your company information and ask natural-language questions to find and analyse the tenders that fit your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('ta-theme');if(t==='dark'||t==='light')d.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
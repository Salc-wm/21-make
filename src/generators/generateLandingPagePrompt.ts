import type { PromptConfig } from '../types';

export const landingPageDesignStyles = [
  "Neobrutalist (raw, bold, confrontational with structured impact)",
  "Swiss/International (grid-based, systematic, ultra-clean typography)",
  "Editorial (magazine-inspired, sophisticated typography, article-focused)",
  "Glassmorphism (translucent layers, blurred backgrounds, depth)",
  "Retro-futuristic (80s vision of the future, refined nostalgia)",
  "Bauhaus (geometric simplicity, primary shapes, form follows function)",
  "Art Deco (elegant patterns, luxury, vintage sophistication)",
  "Minimal (extreme reduction, maximum whitespace, essential only)",
  "Flat (no depth, solid colors, simple icons, clean)",
  "Material (Google-inspired, cards, subtle shadows, motion)",
  "Neumorphic (soft shadows, extruded elements, tactile)",
  "Monochromatic (single color variations, tonal depth)",
  "Scandinavian (hygge, natural materials, warm minimalism)",
  "Japandi (Japanese-Scandinavian fusion, zen meets hygge)",
  "Dark Mode First (designed for dark interfaces, high contrast elegance)",
  "Modernist (clean lines, functional beauty, timeless)",
  "Organic/Fluid (flowing shapes, natural curves, sophisticated blob forms)",
  "Corporate Professional (trust-building, established, refined)",
  "Tech Forward (innovative, clean, future-focused)",
  "Luxury Minimal (premium restraint, high-end simplicity)",
  "Neo-Geo (refined geometric patterns, mathematical beauty)",
  "Kinetic (motion-driven, dynamic but controlled)",
  "Gradient Modern (sophisticated color transitions, depth through gradients)",
  "Typography First (type as the hero, letterforms as design)",
  "Metropolitan (urban sophistication, cultural depth)"
];

export function generateLandingPagePrompt(config: PromptConfig): string {
  // If a specific design style is selected in the UI (that matches the string exactly), we use it. 
  // Otherwise, if it's left as "Random" or anything generic, we randomly pick one from the array.
  let selectedStyle = config.designStyle;
  
  if (!selectedStyle || selectedStyle === 'random' || selectedStyle === 'minimal') {
    const randomIndex = Math.floor(Math.random() * landingPageDesignStyles.length);
    selectedStyle = landingPageDesignStyles[randomIndex];
  } else {
    // Check if the provided style is in our extended list, if so, get the full description
    const foundStyle = landingPageDesignStyles.find(
      s => s.toLowerCase().startsWith(selectedStyle.toLowerCase())
    );
    if (foundStyle) {
      selectedStyle = foundStyle;
    }
  }

  const lang = config.promptLanguage === 'en' ? 'en' : 'pt';
  const projectName = config.projectName ? ` for a project named "${config.projectName}"` : '';

  if (lang === 'pt') {
    return `Gera um prompt de criação de uma LANDING PAGE DE PÁGINA ÚNICA${projectName ? ' para um projeto chamado "' + config.projectName + '"' : ''}, focada num conceito de negócio ou serviço inovador, e desenhada estritamente de acordo com o seguinte estilo visual: ${selectedStyle}. Descreve intensamente a qualidade principal e a emoção que este estilo específico evoca - qual deverá ser o estado de espírito ("mood") que os visitantes experienciam assim que aterram na página? Como é que a hierarquia visual e o fluxo ("flow") global os devem fazer sentir à medida que fazem scroll ao longo desta experiência coesa de uma única página? Inclui uma nota para a integração de elementos coloridos apropriados de forma a reforçar estrategicamente o impacto emocional do design.

Explica a filosofia de design a adotar, colocando a lente na emoção e na experiência do utilizador. Como se deve sentir a tipografia - autoritária, acolhedora, ou vanguardista? Que sensação devem as interações e as animações criar na interação - fluidas e líquidas, precisas e reativas, ou gentis e orgânicas? Descreve em detalhe como a jornada do utilizador, encapsulada numa única página, deve progredir emocionalmente, moldando um arco narrativo completo desde a primeira impressão no topo ("hero section"), conduzindo até à inevitável conversão na "call-to-action" (CTA) final.

Por fim, fornece pontos de referência altamente abstratos que captem verdadeiramente a essência desta estética. Pensa nas sensações transmitidas por certos tipos de espaços físicos, movimentos culturais conhecidos, períodos artísticos relevantes, estilos arquitetónicos ou filosofias de design que encarnem este ambiente de forma tangível. Faz alusão à qualidade emocional de experiências premium, de ambientes altamente sofisticados, ou do artesanato de luxo ("refined craftsmanship") que deverão servir de motor inspiracional para a interface. Explica como estas referências puramente abstratas devem influenciar a elevada elegância e qualidade emocional da landing page concluída, evitando cuidadosamente a menção a qualquer marca atual ou plataformas específicas. (IMPORTANTE: Trata-se sempre de UMA ÚNICA PÁGINA / LANDING PAGE de "scrolling" contínuo. Foca-te na atmosfera e nunca em instruções excessivamente técnicas).`;
  }

  // English (default)
  return `Generate a ONE-PAGE LANDING PAGE creation prompt${projectName} based on an innovative business or service concept, designed strictly following this visual style: ${selectedStyle}. Describe intensely the core emotional qualities and feeling this specific style evokes - what mood should visitors experience as soon as they arrive? How should the visual hierarchy and overall flow make them feel as they scroll continuously through this single cohesive page? Include a note to incorporate colorful elements as appropriate to strategically enhance the design's emotional impact.

Explain the design philosophy through the lens of emotion and user experience. How should the typography feel - authoritative, welcoming, or cutting-edge? What sensation should the interactions and animations create upon engagement - smooth and liquid, snappy and precise, or gentle and organic? Describe in detail how the single-page journey should emotionally progress, establishing a complete narrative arc from the very first impression in the hero section, flowing seamlessly down through the storytelling, and culminating in the final call-to-action (CTA).

Lastly, provide highly abstract reference points that truly capture this aesthetic's essence. Think deeply about the feelings evoked by certain types of physical spaces, prominent cultural movements, relevant artistic periods, architectural styles, or overarching design philosophies that embody this specific vibe. Relate these to the emotional qualities of premium experiences, highly sophisticated environments, or refined craftsmanship that must drive and inspire the interface. Explain how these purely abstract references should directly influence the elevated emotional quality and visual sophistication of the final completed landing page, purposefully without naming specific contemporary brands or platforms. (IMPORTANT: This is fundamentally ONE COHESIVE LANDING PAGE with a continuous scrolling experience. Focus heavily on feeling, atmosphere, and conceptual abstract references rather than overly technical specifics).`;
}

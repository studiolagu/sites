/* ==========================================================
   CONFIGURAÇÃO CENTRAL — edite aqui para personalizar o site.
   Tudo que está marcado como PLACEHOLDER deve ser substituído
   por informações reais do(a) fotógrafo(a).
   ========================================================== */
window.SITE = {
  brand: "Ale Santos",
  brandFull: "Ale Santos Fotografias",
  logo: "img/logo.png",            // logo escuro (menu). Vazio = usa o nome em texto
  logoLight: "img/logo-light.png", // logo branco (rodapé)
  favicon: "img/favicon.png",
  tagline:"Mais do que fotografias, histórias que merecem ser lembradas.",
  city: "Lages",
  state: "SC",
  region: "Lages e região serrana de Santa Catarina",
  serviceArea: "Atendo em Lages, na Serra Catarinense e em outras cidades mediante consulta.",

  contact: {
    whatsapp: "5549900000000",          // PLACEHOLDER: DDI+DDD+número, só dígitos
    whatsappLabel: "(49) 90000-0000",   // PLACEHOLDER
    instagram: "alesantosfotografias",  // PLACEHOLDER: usuário sem @
    email: "contato@exemplo.com.br"     // PLACEHOLDER
  },

  /* Cores (aplicadas como variáveis CSS) */
  colors: {
    bg: "#f4f2ee",
    ink: "#161616",
    sage: "#7d8b80",
    soft: "#e7e4dd"
  },

  /* Se "src" ficar vazio, é gerada uma imagem demonstrativa.
     Para usar fotos reais: src: "img/casamento-01.jpg" */
  categories: [
    { id: "casamentos", label: "Casamentos" },
    { id: "ensaios", label: "Ensaios individuais" },
    { id: "familias", label: "Famílias" },
    { id: "eventos", label: "Eventos" },
    { id: "retratos", label: "Retratos profissionais" },
    { id: "moda", label: "Moda e editorial" },
    { id: "produtos", label: "Produtos e publicidade" }
  ],

  heroImage: "img/hero.webp",          // foto principal desktop (paisagem, ~2400px)
  heroImageMobile: "img/hero-m.webp",  // versão para celular (retrato). Vazio = usa a de desktop
  heroPosition: "center 60%",          // enquadramento no desktop
  heroPositionMobile: "45% center",    // enquadramento no celular
  aboutImage: "img/retrato_ale.jpg",  // retrato do(a) fotógrafo(a)

  /* ratio: tall | portrait (retrato) | wide (paisagem) | square — define o filtro de orientação
     src = foto grande (lightbox) | thumb = miniatura do grid | project = nome do projeto (opcional) */
  portfolio: [
    { cat: "casamentos", ratio: "tall", project: "", title: "Cerimônia sob arco de flores", src: "img/casamento-arco.webp", thumb: "img/casamento-arco-thumb.webp" },
    { cat: "ensaios", ratio: "tall", project: "", title: "Ensaio de casal no pinheiral", src: "img/pinheiral.webp", thumb: "img/pinheiral-thumb.webp" },
    { cat: "familias", ratio: "tall", project: "", title: "Ensaio gestante", src: "img/gestante.webp", thumb: "img/gestante-thumb.webp" },
    { cat: "eventos", ratio: "tall", project: "", title: "Evento social", src: "img/debutante.webp", thumb: "img/debutante-thumb.webp" },
    { cat: "casamentos", ratio: "tall", project: "", title: "Noivos na cidade", src: "img/casal-rua.webp", thumb: "img/casal-rua-thumb.webp" },
    { cat: "ensaios", ratio: "tall", project: "", title: "Ensaio com estrelinha", src: "img/sparkler.webp", thumb: "img/sparkler-thumb.webp" },
    { cat: "casamentos", ratio: "tall", project: "", title: "Casamento à noite", src: "img/casamento-noite.webp", thumb: "img/casamento-noite-thumb.webp" },
    { cat: "moda", ratio: "tall", project: "", title: "Editorial vestido verde", src: "img/vestido-verde.webp", thumb: "img/vestido-verde-thumb.webp" },
    { cat: "ensaios", ratio: "tall", project: "", title: "Ensaio com cavalos", src: "img/cavalos.webp", thumb: "img/cavalos-thumb.webp" },
    { cat: "casamentos", ratio: "tall", project: "", title: "Abraço dos noivos", src: "img/casamento-abraco.webp", thumb: "img/casamento-abraco-thumb.webp" }
  ],

  services: [
    { name: "Casamentos", desc: "Cobertura sensível de cerimônia e celebração, do making of aos últimos momentos da festa.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-casamentos.webp" },
    { name: "Ensaios individuais", desc: "Sessões com direção leve para você se sentir à vontade e aparecer do seu jeito.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-ensaios.webp" },
    { name: "Famílias", desc: "Registros naturais de vínculos, afeto e rotinas que merecem ser guardados.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-familias.webp" },
    { name: "Eventos", desc: "Cobertura de aniversários, formaturas e eventos corporativos com olhar atento.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-eventos.webp" },
    { name: "Retratos profissionais", desc: "Imagens para perfis, sites e redes que transmitem confiança e personalidade.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-retratos.webp" },
    { name: "Moda, produtos e publicidade", desc: "Fotografia editorial e comercial para marcas e criadores.", includes: ["Detalhes a combinar no orçamento"], src: "img/svc-moda.webp" }
  ],

  differentials: [
    { title: "Atendimento personalizado", text: "Cada projeto começa com uma conversa para entender o que importa para você." },
    { title: "Direção durante o ensaio", text: "Orientação tranquila para você ficar à vontade diante da câmera." },
    { title: "Equipamento profissional", text: "Recursos adequados para cada tipo de luz e ambiente." },
    { title: "Tratamento cuidadoso", text: "Edição com critério, respeitando o estilo e a naturalidade das imagens." },
    { title: "Entrega em alta qualidade", text: "Fotografias finalizadas e prontas para guardar, imprimir e compartilhar." },
    { title: "Compromisso com cada projeto", text: "Atenção aos detalhes do primeiro contato à entrega final." }
  ],

  /* DEMONSTRATIVOS — substitua por depoimentos reais */
  testimonials: [
    { text: "Depoimento demonstrativo: aqui entrará o relato real de um cliente sobre a experiência.", name: "Nome do cliente", type: "Casamento", demo: true },
    { text: "Depoimento demonstrativo: substitua este texto por uma avaliação autêntica.", name: "Nome do cliente", type: "Ensaio individual", demo: true },
    { text: "Depoimento demonstrativo: ideal para destacar atendimento, entrega e resultado.", name: "Nome do cliente", type: "Família", demo: true }
  ],

  /* Respostas editáveis — sem condições comerciais inventadas */
  faq: [
    { q: "Como funciona o agendamento?", a: "Você entra em contato pelo formulário ou WhatsApp, conversamos sobre o projeto e confirmamos data e detalhes. (Editar com o processo real.)" },
    { q: "Com quanto tempo de antecedência devo contratar?", a: "Informe a data prevista no formulário e verificamos a disponibilidade. (Editar com a orientação real.)" },
    { q: "Como recebo as fotografias?", a: "A forma de entrega é combinada durante o orçamento. (Editar com o processo real.)" },
    { q: "Qual é o prazo de entrega?", a: "O prazo varia conforme o tipo de trabalho e é informado no orçamento. (Editar com o prazo real.)" },
    { q: "Você atende em outras cidades?", a: "Sim, consulte disponibilidade e condições de deslocamento pelo contato. (Editar conforme a realidade.)" },
    { q: "Como funciona o pagamento?", a: "As formas de pagamento são apresentadas junto ao orçamento. (Editar com as condições reais.)" },
    { q: "Como posso solicitar um orçamento?", a: "Preencha o formulário nesta página ou chame no WhatsApp. O contato é sem compromisso." }
  ]
};

(() => {
  "use strict";
  const SUPABASE_URL = "https://zitqgkmrndmivgkmzuvq.supabase.co";
  const SUPABASE_KEY = "sb_publishable_PIZUvRRpR8JzfVfFIngvHg_SPDfmZBh";
  const CONFIG_TABLE = "site_config";
  const DEFAULTS = {
    name: "Igor Auto Elétrica",
    phone: "5584981535031",
    insta: "igor_auto.eletrica",
    address: "Av. João Paulo II, 49E - Nova Esperança, Parnamirim - RN, 59144-850",
    heroTitle: "ENERGIA E PRECISÃO PARA SEGUIR EM FRENTE.",
    heroText: "Especialistas em elétrica automotiva, com atenção técnica e atendimento próximo para manter seu veículo em funcionamento.",
    services: [
      ["Elétrica automotiva","Soluções e reparos em sistemas elétricos do veículo."],
      ["Alternadores","Verificação e manutenção do sistema de carga."],
      ["Motores de partida","Diagnóstico e manutenção do sistema de partida."],
      ["Faróis e iluminação","Cuidados com faróis e iluminação automotiva."]
    ],
    footer: "Igor Auto Elétrica. Atendimento em elétrica automotiva em Nova Esperança, Parnamirim - RN."
  };
  let config = {...DEFAULTS};
  const $ = (s, root=document) => root.querySelector(s);
  const cleanPhone = value => String(value || "").replace(/\D/g, "");
  const waUrl = (message="Olá! Conheci a Igor Auto Elétrica pelo site e gostaria de informações sobre um atendimento.") => {
    const phone = cleanPhone(config.phone);
    return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : "";
  };
  const setText = (selector, value) => { const el=$(selector); if(el && value) el.textContent=value; };
  function renderConfig() {
    document.querySelectorAll("[data-business-name]").forEach(el => el.textContent=config.name);
    document.querySelectorAll("[data-business-address]").forEach(el => el.textContent=config.address);
    document.querySelectorAll("[data-business-phone]").forEach(el => el.textContent=config.phone || "Contato pelo WhatsApp");
    document.querySelectorAll("[data-business-instagram]").forEach(el => { el.href=`https://instagram.com/${String(config.insta||"igor_auto.eletrica").replace(/^@/,"")}`; });
    document.querySelectorAll("[data-whatsapp]").forEach(el => {
      const href=waUrl(el.dataset.message || undefined);
      if(href){el.href=href;el.target="_blank";el.rel="noopener noreferrer";}
      else {el.href="contato.html";el.removeAttribute("target");}
    });
    document.querySelectorAll("[data-year]").forEach(el => el.textContent=String(new Date().getFullYear()));
    const map=$("[data-map]");
    if(map) map.src=`https://www.google.com/maps?q=${encodeURIComponent(config.address)}&output=embed`;
    const services=$("[data-services]");
    if(services){
      const symbols=["⌁","ϟ","↗","✳"];
      services.replaceChildren();
      config.services.forEach(([name,description],index)=>{
        const article=document.createElement("article");article.className="service-card reveal";
        const icon=document.createElement("div");icon.className="service-symbol";icon.setAttribute("aria-hidden","true");icon.textContent=symbols[index%symbols.length];
        const title=document.createElement("h3");title.textContent=name;
        const desc=document.createElement("p");desc.textContent=description;
        const link=document.createElement("a");link.className="arrow";link.href="servicos.html";link.setAttribute("aria-label",`Conhecer ${name}`);link.textContent="→";
        article.append(icon,title,desc,link);services.append(article);
      });
      observeReveals();
    }
  }
  async function loadConfig() {
    if(!window.supabase?.createClient) return;
    try{
      const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
      const {data,error}=await client.from(CONFIG_TABLE).select("config").eq("id","main").maybeSingle();
      if(error) throw error;
      if(!data?.config) return;
      const saved=data.config;
      config={...config,...saved};
      if(typeof saved.services==="string"){
        config.services=saved.services.split("\n").filter(Boolean).map(line=>{
          const [name,...rest]=line.split("|");return [name.trim(),rest.join("|").trim()];
        });
      }
      renderConfig();
    }catch(error){console.warn("Configuração remota indisponível; usando conteúdo público padrão.",error);}
  }
  function observeReveals(){
    const items=document.querySelectorAll(".reveal:not([data-observed])");
    if(!("IntersectionObserver" in window)){items.forEach(el=>el.classList.add("is-visible"));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    }),{threshold:.12});
    items.forEach(el=>{el.dataset.observed="true";observer.observe(el);});
  }
  function initMenu(){
    const toggle=$("[data-menu-toggle]"),nav=$("[data-nav]");
    if(!toggle||!nav)return;
    toggle.addEventListener("click",()=>{
      const open=nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
      toggle.textContent=open?"×":"☰";
    });
    nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
      nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";
    }));
  }
  function initHeader(){
    const header=$(".site-header");
    if(!header)return;
    const update=()=>header.classList.toggle("is-scrolled",window.scrollY>10);
    update();window.addEventListener("scroll",update,{passive:true});
  }
  function initForms(){
    document.querySelectorAll("[data-contact-form]").forEach(form=>form.addEventListener("submit",event=>{
      event.preventDefault();
      const data=new FormData(form);
      const message=[
        "Olá! Gostaria de falar com a Igor Auto Elétrica.",
        `Nome: ${data.get("name")||""}`,
        `Assunto: ${data.get("subject")||"Atendimento"}`,
        `Mensagem: ${data.get("message")||""}`
      ].join("\n");
      const href=waUrl(message);
      if(href) window.open(href,"_blank","noopener,noreferrer");
      else {const notice=$("[data-form-notice]",form);if(notice)notice.textContent="O WhatsApp ainda não está configurado. Entre em contato pelo Instagram.";}
    }));
  }
  document.addEventListener("DOMContentLoaded",()=>{
    initMenu();initHeader();renderConfig();observeReveals();initForms();loadConfig();
  });
})();
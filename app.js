(() => {
"use strict";
const URL="https://zitqgkmrndmivgkmzuvq.supabase.co",KEY="sb_publishable_PIZUvRRpR8JzfVfFIngvHg_SPDfmZBh",TABLE="site_config";
const DEFAULTS={name:"Igor Auto Elétrica",phone:"5584981535031",insta:"igor_auto.eletrica",address:"Av. João Paulo II, 49E - Nova Esperança, Parnamirim - RN, 59144-850",heroTitle:"ENERGIA E PRECISÃO PARA SEGUIR EM FRENTE.",heroText:"Especialistas em elétrica automotiva, com atenção técnica e atendimento próximo para manter seu veículo em funcionamento.",btn:"Falar pelo WhatsApp",btnLink:"",logo:"",banner:"",pano:"",footer:"Igor Auto Elétrica. Atendimento em elétrica automotiva em Nova Esperança, Parnamirim - RN.",services:[{name:"Elétrica automotiva",description:"Soluções e reparos em sistemas elétricos do veículo.",active:true},{name:"Alternadores",description:"Verificação e manutenção do sistema de carga.",active:true},{name:"Motores de partida",description:"Diagnóstico e manutenção do sistema de partida.",active:true},{name:"Faróis e iluminação",description:"Cuidados com faróis e iluminação automotiva.",active:true}],theme:"midnight",customTheme:{primary:"#163b63",secondary:"#245a91",background:"#080b10",surface:"#111a27",text:"#f2f4f7",muted:"#a7b0bd",accent:"#d6a928",radius:18,font:"Manrope"},mascot:{enabled:true,outfit:"standard",expression:"happy",animation:"idle",followEyes:true,chase:true,chaseSpeed:1,boredAfter:15,sadAfter:45},gallery:[],reviews:{url:"",rating:"",count:""}};
const THEMES={midnight:{primary:"#163b63",secondary:"#245a91",background:"#080b10",surface:"#111a27",text:"#f2f4f7",muted:"#a7b0bd",accent:"#d6a928",radius:18,font:"Manrope"},ocean:{primary:"#145a78",secondary:"#247da0",background:"#071721",surface:"#102b39",text:"#eef8fb",muted:"#a9c4ce",accent:"#70c6d8",radius:18,font:"Manrope"},light:{primary:"#244f79",secondary:"#3979ad",background:"#f3f6fa",surface:"#fff",text:"#182536",muted:"#627184",accent:"#c18d19",radius:14,font:"Manrope"},performance:{primary:"#163b63",secondary:"#286db0",background:"#070a0f",surface:"#121a25",text:"#f4f6f8",muted:"#9ba8b8",accent:"#e0b331",radius:10,font:"Sora"}};
let cfg=JSON.parse(JSON.stringify(DEFAULTS)),db=null,viewerUrl=null;
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const digits=()=>String(cfg.phone||"").replace(/\D/g,"");
const whatsapp=(msg)=>digits()?"https://wa.me/"+digits()+"?text="+encodeURIComponent(msg||"Olá! Conheci a Igor Auto Elétrica pelo site e gostaria de informações sobre um atendimento."):"";
function initDb(){if(window.supabase&&window.supabase.createClient)db=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true}})}
function theme(){const t=cfg.theme==="custom"?cfg.customTheme:(THEMES[cfg.theme]||THEMES.midnight),r=document.documentElement.style;r.setProperty("--blue",t.primary);r.setProperty("--blue2",t.secondary);r.setProperty("--ink",t.background);r.setProperty("--surface",t.surface);r.setProperty("--white",t.text);r.setProperty("--muted",t.muted);r.setProperty("--accent",t.accent);r.setProperty("--radius",Number(t.radius||18)+"px");r.setProperty("--font",t.font==="Sora"?"Sora,Manrope,sans-serif":"Manrope,system-ui,sans-serif")}
function renderServices(){const host=$("[data-services]")||$("#svc");if(!host)return;host.replaceChildren();(Array.isArray(cfg.services)?cfg.services:DEFAULTS.services).filter(x=>x&&x.active!==false).forEach((s,i)=>{const card=document.createElement("article");card.className="service-card";const icon=document.createElement("div");icon.className="service-symbol";icon.textContent=["ϟ","⌁","↗","✳"][i%4];const h=document.createElement("h3");h.textContent=s.name||"Serviço";const p=document.createElement("p");p.textContent=s.description||"";const a=document.createElement("a");a.className="arrow";a.href=whatsapp("Olá! Gostaria de informações sobre "+h.textContent+".")||"contato.html";a.textContent="↗";card.append(icon,h,p,a);host.append(card)})}
function renderGallery(){const host=$("[data-gallery]");if(!host)return;host.replaceChildren();(cfg.gallery||[]).filter(x=>x&&x.url).forEach(x=>{const a=document.createElement("a");a.className="gallery-tile gallery-image";a.href=x.url;a.target="_blank";a.rel="noopener";const img=document.createElement("img");img.src=x.url;img.alt=x.alt||"Imagem da oficina";img.loading="lazy";a.append(img);host.append(a)})}
function renderMascot(){const m=$("#mascot");if(!m)return;const s=cfg.mascot||{};m.hidden=s.enabled===false;m.dataset.outfit=s.outfit||"standard";m.dataset.expression=s.expression||"happy";m.dataset.animation=s.animation||"idle";m.dataset.follow=s.followEyes===false?"off":"on";m.dataset.chase=s.chase===false?"off":"on";m.style.setProperty("--chase-speed",String(Math.max(.35,Math.min(2,Number(s.chaseSpeed)||1))))}
function renderReviews(){const host=$("[data-reviews]");if(!host)return;const r=cfg.reviews||{};if(!r.url)return;host.replaceChildren();const p=document.createElement("p");p.textContent="Consulte as avaliações públicas da Igor Auto Elétrica.";const a=document.createElement("a");a.className="button button-quiet";a.href=r.url;a.target="_blank";a.rel="noopener";a.textContent="Ver avaliações no Google ↗";host.append(p,a);if(r.rating&&r.count){const small=document.createElement("small");small.textContent="Nota informada: "+r.rating+" · "+r.count+" avaliações";host.append(small)}}
function apply(){document.body.dataset.theme=cfg.theme||"midnight";theme();all("[data-business-name]").forEach(e=>e.textContent=cfg.name);all("[data-business-address]").forEach(e=>e.textContent=cfg.address);all("[data-business-instagram]").forEach(e=>{e.href="https://instagram.com/"+String(cfg.insta||"").replace(/^@/,"");e.target="_blank";e.rel="noopener"});all("[data-whatsapp]").forEach(e=>{const u=whatsapp(e.dataset.message);e.href=u||"contato.html";if(u){e.target="_blank";e.rel="noopener noreferrer"}});all("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());all("[data-footer-text]").forEach(e=>e.textContent=cfg.footer);const title=$("[data-hero-title]"),desc=$("[data-hero-text]");if(title)title.textContent=cfg.heroTitle;if(desc)desc.textContent=cfg.heroText;const map=$("[data-map]");if(map)map.src="https://www.google.com/maps?q="+encodeURIComponent(cfg.address)+"&output=embed";const route=$("[data-map-route]");if(route)route.href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(cfg.address);const banner=$("[data-hero-image]");if(banner&&cfg.banner)banner.style.backgroundImage='linear-gradient(90deg,#080b10e8,transparent),url("'+cfg.banner+'")';renderServices();renderGallery();renderMascot();renderReviews();if(cfg.pano&&$("#pano"))initPano(cfg.pano);const logo=$("[data-logo-image]");if(logo&&cfg.logo){logo.hidden=false;logo.src=cfg.logo}}
async function load(){initDb();if(!db)return;try{const q=await db.from(TABLE).select("config").eq("id","main").maybeSingle();if(q.error)throw q.error;if(q.data&&q.data.config){cfg=Object.assign({},DEFAULTS,q.data.config);if(typeof cfg.services==="string")cfg.services=cfg.services.split("\\n").filter(Boolean).map(line=>{const p=line.split("|");return{name:p.shift().trim(),description:p.join("|").trim(),active:true}})}}catch(e){console.warn("Configuração Supabase indisponível; usando dados locais padrão.",e)}}
function initTransitions(){
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduced){requestAnimationFrame(()=>{document.body.classList.add("page-ready");document.body.classList.remove("page-enter")});}
 if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
  all(".reveal").forEach(el=>observer.observe(el));
 }else all(".reveal").forEach(el=>el.classList.add("is-visible"));
 document.addEventListener("click",e=>{
  const link=e.target.closest("a[href]");if(!link||reduced||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(link.target==="_blank"||link.hasAttribute("download"))return;
  let url;try{url=new URL(link.href,location.href)}catch{return}
  if(url.origin!==location.origin||url.pathname===location.pathname||url.hash)return;
  e.preventDefault();document.body.classList.remove("page-ready");document.body.classList.add("page-leave");
  setTimeout(()=>location.assign(url.href),150);
 });
}
function initMenu(){const b=$("[data-menu-toggle]"),n=$("[data-nav]");if(!b||!n)return;b.addEventListener("click",()=>{const o=n.classList.toggle("is-open");b.setAttribute("aria-expanded",String(o));b.textContent=o?"×":"☰"});n.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{n.classList.remove("is-open");b.setAttribute("aria-expanded","false");b.textContent="☰"}))}
function initMascot(){
 const m=$("#mascot");if(!m)return;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 const finePointer=matchMedia("(hover: hover) and (pointer: fine)").matches;
 let idleTimer=0,interactionTimer=0,lastX=22;
 const settings=()=>cfg.mascot||{};
 const setMood=mood=>{if(!m.hidden)m.dataset.expression=mood};
 const resetIdle=()=>{
  clearTimeout(idleTimer);clearTimeout(interactionTimer);
  setMood("happy");
  idleTimer=setTimeout(()=>setMood("bored"),Math.max(8,Number(settings().boredAfter)||15)*1000);
  interactionTimer=setTimeout(()=>setMood("sad"),Math.max(Number(settings().boredAfter)||15,Number(settings().sadAfter)||45)*1000);
 };
 const moveTo=(left)=>{
  const width=m.getBoundingClientRect().width||118;
  const max=Math.max(8,innerWidth-width-12);
  lastX=Math.max(8,Math.min(max,left));
  m.style.setProperty("--mascot-left",lastX+"px");
 };
 if(!reduced)resetIdle();
 document.addEventListener("pointermove",e=>{
  if(!finePointer||reduced||m.hidden)return;
  const s=settings(),r=m.getBoundingClientRect(),eyes=m.querySelectorAll(".duck-pupil");
  const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
  if(s.followEyes!==false){
   const x=Math.max(-4,Math.min(4,dx/24)),y=Math.max(-3,Math.min(3,dy/28));
   eyes.forEach(p=>{p.style.transform="translate("+x+"px,"+y+"px)"});
  }
  const sameHeight=Math.abs(dy)<125;
  if(s.chase!==false&&sameHeight){
   const speed=Math.max(.35,Math.min(2,Number(s.chaseSpeed)||1));
   const target=e.clientX-r.width/2;
   moveTo(lastX+(target-lastX)*Math.min(.18,.09*speed));
   if(!reduced)m.dataset.animation="run";
   setMood("happy");resetIdle();
  }else if(!sameHeight&&m.dataset.animation==="run"){
   m.dataset.animation=s.animation||"idle";
  }
 },{passive:true});
 m.addEventListener("pointerenter",()=>{setMood("happy");resetIdle()});
 m.addEventListener("pointerleave",()=>{if(!reduced)m.dataset.animation=settings().animation||"idle"});
 document.addEventListener("touchstart",()=>{if(!m.hidden){setMood("happy");resetIdle()}},{passive:true});
 window.addEventListener("resize",()=>moveTo(Math.min(lastX,innerWidth-(m.offsetWidth||118)-12)));
}
function initPano(url){if(!window.THREE){const n=$("#noPano");if(n){n.hidden=false;n.textContent="O visualizador 360° precisa de conexão com a internet."}return}if(viewerUrl===url)return;viewerUrl=url;const n=$("#noPano");if(n)n.hidden=true;const el=$("#pano");if(!el)return;el.replaceChildren();const w=()=>Math.max(el.clientWidth,1),h=()=>Math.max(el.clientHeight,1),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,w()/h(),1,1100),renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setSize(w(),h());el.append(renderer.domElement);const geometry=new THREE.SphereGeometry(500,60,40);geometry.scale(-1,1,1);new THREE.TextureLoader().load(url,t=>scene.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:t}))),undefined,()=>{const n=$("#noPano");if(n){n.hidden=false;n.textContent="Não foi possível carregar a imagem panorâmica."}});let lon=0,lat=0,fov=75,drag=false,lx=0,ly=0,auto=true;const zoom=d=>{fov=Math.max(35,Math.min(100,fov+d));camera.fov=fov;camera.updateProjectionMatrix();const z=$("#zoomLabel");if(z)z.textContent="Zoom "+(75/fov).toFixed(1).replace(".0","")+"×"};if($("#zoomIn"))$("#zoomIn").onclick=()=>zoom(-7);if($("#zoomOut"))$("#zoomOut").onclick=()=>zoom(7);el.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?-4:4)};el.onpointerdown=e=>{drag=true;auto=false;lx=e.clientX;ly=e.clientY;el.setPointerCapture(e.pointerId)};el.onpointerup=el.onpointercancel=()=>drag=false;el.onpointermove=e=>{if(!drag)return;lon-=(e.clientX-lx)*.2;lat=Math.max(-85,Math.min(85,lat+(e.clientY-ly)*.2));lx=e.clientX;ly=e.clientY};const resize=()=>{camera.aspect=w()/h();camera.updateProjectionMatrix();renderer.setSize(w(),h())};addEventListener("resize",resize);(function loop(){if(viewerUrl!==url){renderer.dispose();geometry.dispose();return}requestAnimationFrame(loop);if(auto)lon+=.025;const p=THREE.MathUtils.degToRad(90-lat),t=THREE.MathUtils.degToRad(lon);camera.lookAt(500*Math.sin(p)*Math.cos(t),500*Math.cos(p),500*Math.sin(p)*Math.sin(t));renderer.render(scene,camera)})()}
function initForms(){all("[data-contact-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(f),msg="Olá! Gostaria de falar com a Igor Auto Elétrica.\nNome: "+(d.get("name")||"")+"\nAssunto: "+(d.get("subject")||"Atendimento")+"\nMensagem: "+(d.get("message")||"");const u=whatsapp(msg);if(u)window.open(u,"_blank","noopener,noreferrer");else $("[data-form-notice]",f).textContent="WhatsApp não configurado. Entre em contato pelo Instagram."}))}
document.addEventListener("DOMContentLoaded",async()=>{document.body.classList.add("page-enter");initTransitions();initMenu();initForms();await load();apply();initMascot()});
window.IgorSite={get config(){return cfg},get client(){return db},defaults:DEFAULTS,themes:THEMES,apply:apply,table:TABLE,bucket:"site-assets",load:load};
})();
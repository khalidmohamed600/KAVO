// KAVO lead form relay: static site POST -> Telegram group with Khalid + Abdelaziz.
// Secrets (set with: wrangler secret put BOT_TOKEN / CHAT_ID): bot token from @BotFather, target group chat id.
// Neither secret ever appears in the site's public code.
const SITE_ORIGIN = 'https://khalidmohamed600.github.io';
const BUDGET = {'under-10k':'أقل من 10,000 جنيه','10k-30k':'10,000 - 30,000 جنيه','30k-100k':'30,000 - 100,000 جنيه','100k-plus':'أكتر من 100,000 جنيه','unknown':'لسه مش متأكد'};
const clean = (v,n)=>String(v==null?'':v).replace(/[<>]/g,'').trim().slice(0,n);
const j = (o,s,h)=>new Response(JSON.stringify(o),{status:s,headers:Object.assign({},h,{'Content-Type':'application/json'})});
function cors(req){const o=req.headers.get('Origin');if(o!==SITE_ORIGIN)return null;
  return {'Access-Control-Allow-Origin':SITE_ORIGIN,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};}
export default {
  async fetch(request, env) {
    const h = cors(request);
    if (request.method === 'OPTIONS') return h ? new Response(null,{status:204,headers:h}) : new Response(null,{status:403});
    if (request.method !== 'POST') return new Response('not found',{status:404});
    if (!h) return new Response('forbidden',{status:403});
    let d; try { d = await request.json(); } catch { return j({ok:false},400,h); }
    if (String(d.company2||'')) return j({ok:true},200,h); // honeypot: silent accept
    const name=clean(d.name,80), brand=clean(d.brand,80), wa=clean(d.whatsapp,24);
    if (!name||!brand||!wa) return j({ok:false,error:'missing'},400,h);
    const text=['🟢 طلب جديد من موقع KAVO','',
      'الاسم: '+name,'البراند: '+brand,'واتساب: '+wa,
      'بيبيع: '+(clean(d.product,120)||'-'),
      'الميزانية: '+(BUDGET[d.budget]||'-'),
      'الهدف: '+(clean(d.goal,600)||'-')].join('\n');
    const tg = await fetch('https://api.telegram.org/bot'+env.BOT_TOKEN+'/sendMessage',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:env.CHAT_ID,text:text,disable_web_page_preview:true})});
    if (!tg.ok) return j({ok:false},502,h);
    return j({ok:true},200,h);
  }
};

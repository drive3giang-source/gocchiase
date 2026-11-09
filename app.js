const P=window.POSTS||[];
const fmt=d=>{if(!d)return'';const x=new Date(d);return isNaN(x)?d:x.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})};
const read=b=>Math.max(1,Math.round(b.split(/\s+/).length/200))+' phút đọc';
const card=p=>`<a class="card" href="post.html?p=${p.slug}"><div class="img" style="background-image:url('${p.image}')"><span class="tag">${p.category}</span></div>
<div class="c"><small>${fmt(p.date)} · ${read(p.body)}</small><h3>${p.title}</h3><p>${p.summary}</p></div></a>`;
function renderHome(){let cat='Tất cả',q='';
 const cats=['Tất cả',...new Set(P.map(p=>p.category))];
 const draw=()=>{const L=P.filter(p=>(cat==='Tất cả'||p.category===cat)&&(p.title+p.summary).toLowerCase().includes(q));
  document.getElementById('cats').innerHTML=cats.map(c=>`<button class="${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
  const f=L[0];document.getElementById('featured').innerHTML=f?`<a class="feat" href="post.html?p=${f.slug}"><div class="img" style="background-image:url('${f.image}')"></div><div class="c"><span class="tag">${f.category}</span><h2>${f.title}</h2><p>${f.summary}</p><small>${fmt(f.date)} · ${read(f.body)}</small></div></a>`:'<p class="empty">Không có bài viết phù hợp.</p>';
  document.getElementById('grid').innerHTML=L.slice(1).map(card).join('');
  document.querySelectorAll('.cats button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;draw()});};
 document.getElementById('q').oninput=e=>{q=e.target.value.toLowerCase();draw()};draw();}
function renderPost(){const s=new URLSearchParams(location.search).get('p');const p=P.find(x=>x.slug===s)||P[0];const el=document.getElementById('post');
 if(!p){el.innerHTML='<p>Không tìm thấy bài.</p>';return}document.title=p.title;
 el.innerHTML=`<span class="tag">${p.category}</span><h1>${p.title}</h1><small>${fmt(p.date)} · ${read(p.body)}</small>
 ${p.image?`<img class="cover" src="${p.image}">`:''}<div class="body">${window.marked?marked.parse(p.body):p.body.replace(/\n/g,'<br>')}</div>`;
 document.getElementById('more').innerHTML=P.filter(x=>x!==p).slice(0,3).map(card).join('');}
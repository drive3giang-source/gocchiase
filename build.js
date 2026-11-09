// Gom bài viết trong /posts thành posts.js (không bao giờ làm hỏng bản build)
const fs=require('fs');const path=require('path');
try{
 const dir=path.join(__dirname,'posts');const out=[];
 const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.md')):[];
 for(const f of files){
  const raw=fs.readFileSync(path.join(dir,f),'utf8');
  const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta={};let body=raw;
  if(m){body=m[2];m[1].split(/\r?\n/).forEach(l=>{const i=l.indexOf(':');if(i>0)meta[l.slice(0,i).trim()]=l.slice(i+1).trim().replace(/^["']|["']$/g,'');});}
  out.push({slug:f.replace(/\.md$/,''),title:meta.title||f,date:meta.date||'',category:meta.category||'Khác',image:meta.image||'',summary:meta.summary||'',body});
 }
 out.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
 fs.writeFileSync(path.join(__dirname,'posts.js'),'window.POSTS='+JSON.stringify(out)+';');
 console.log('Da tao',out.length,'bai');
}catch(e){console.log('Loi build (giu posts.js cu):',e.message);}

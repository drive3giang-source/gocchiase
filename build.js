// Gom các bài viết trong /posts thành posts.json
const fs=require('fs');
const dir='posts';const out=[];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))){
  const raw=fs.readFileSync(dir+'/'+f,'utf8');
  const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta={};let body=raw;
  if(m){body=m[2];m[1].split(/\r?\n/).forEach(l=>{const i=l.indexOf(':');if(i>0)meta[l.slice(0,i).trim()]=l.slice(i+1).trim().replace(/^["']|["']$/g,'');});}
  out.push({slug:f.replace('.md',''),title:meta.title||f,date:meta.date||'',image:meta.image||'',summary:meta.summary||'',body});
}
out.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
fs.writeFileSync('posts.json',JSON.stringify(out));
console.log('Đã tạo',out.length,'bài');

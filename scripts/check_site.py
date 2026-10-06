"""Check static Pages output without third-party dependencies."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[]; self.ids=set(); self.links=[]; self.h1=0; self.schema=False; self.data=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags.append((tag,a))
        if 'id' in a: self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        if tag in ('a','link','script','img'):
            v=a.get('href',a.get('src',''))
            if v:self.links.append(v)
        if tag=='script' and a.get('type')=='application/ld+json':self.schema=True
    def handle_data(self,data):
        if self.schema:self.data.append(data)
    def handle_endtag(self,tag):
        if tag=='script' and self.schema:
            json.loads(''.join(self.data));self.data=[];self.schema=False
pages={}
for p in ROOT.rglob('*.html'):
    if 'Legacy' in p.parts:continue
    x=Page();x.feed(p.read_text());pages[p]=x
errors=[]
for p,x in pages.items():
    redirect=p.name=='meet-the-owners.html'
    if not redirect:
        if x.h1!=1:errors.append(f'{p}: {x.h1} H1 elements')
        for key in ('description','viewport'):
            if not any(t=='meta' and a.get('name')==key for t,a in x.tags):errors.append(f'{p}: missing {key}')
        if p.name!='404.html' and not any(t=='link' and a.get('rel')=='canonical' for t,a in x.tags):errors.append(f'{p}: missing canonical')
        for t,a in x.tags:
            if t=='img' and not all(k in a for k in ('alt','width','height')):errors.append(f'{p}: image missing attributes')
    for link in x.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        if link=='#':errors.append(f'{p}: dead # link');continue
        target=ROOT/unquote(u.path).lstrip('/') if u.path.startswith('/') else p.parent/unquote(u.path)
        if not u.path:target=p
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{p}: missing target {link}')
        elif u.fragment and target in pages and u.fragment not in pages[target].ids:errors.append(f'{p}: missing anchor {link}')
ET.parse(ROOT/'sitemap.xml')
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML files; local links, anchors, metadata, image dimensions, JSON-LD, and sitemap.')

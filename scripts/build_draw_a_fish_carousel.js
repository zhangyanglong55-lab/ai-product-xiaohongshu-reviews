const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve('output/2026-08-23-draw-a-fish');
const mascot = fs.readFileSync(path.join(outDir, 'fish-mascot.png')).toString('base64');
const official = fs.readFileSync(path.join(outDir, 'official-og-card.png')).toString('base64');

const W = 1080;
const H = 1440;
const C = { bg: '#DDF8F7', ink: '#102A43', blue: '#1769E0', coral: '#FF5B4D', yellow: '#FFD84D', white: '#FFFFFF', pale: '#F8FFFE', muted: '#547086', green: '#32B56B' };

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
}

function tspans(lines, x, y, size, gap, weight = 700, color = C.ink, anchor = 'start') {
  return `<text x="${x}" y="${y}" font-family="PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : gap}">${esc(line)}</tspan>`).join('')}</text>`;
}

function base(inner, page, accent = C.blue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="1080" height="1440" fill="${C.bg}"/>
  <circle cx="80" cy="170" r="120" fill="#FFFFFF" opacity=".42"/>
  <circle cx="1030" cy="1280" r="190" fill="#FFFFFF" opacity=".32"/>
  <path d="M0 90 C250 40 470 130 700 80 S980 30 1080 80" fill="none" stroke="#FFFFFF" stroke-width="6" opacity=".7"/>
  <rect x="60" y="55" width="400" height="64" rx="32" fill="${accent}"/>
  ${tspans(['AI 玩具箱 · 今日实测'], 260, 98, 28, 0, 700, C.white, 'middle')}
  ${inner}
  ${tspans([String(page).padStart(2,'0') + ' / 07'], 980, 1380, 24, 0, 600, C.muted, 'end')}
  </svg>`;
}

const slides = [];

slides.push(base(`
  <rect x="65" y="160" width="950" height="180" rx="34" fill="${C.coral}"/>
  ${tspans(['本期评测产品｜Draw A Fish'], 540, 270, 49, 0, 800, C.white, 'middle')}
  ${tspans(['我画的鱼，', '被 AI 拦在缸外？'], 70, 465, 82, 98, 900, C.ink)}
  <rect x="70" y="670" width="940" height="450" rx="40" fill="${C.white}"/>
  <image href="data:image/png;base64,${official}" x="90" y="690" width="900" height="450" preserveAspectRatio="xMidYMid slice"/>
  <rect x="110" y="1070" width="860" height="112" rx="28" fill="#102A43"/>
  ${tspans(['AI 水族馆保安，到底有多严格？'], 540, 1141, 36, 0, 700, C.white, 'middle')}
`, 1, C.coral));

slides.push(base(`
  ${tspans(['它把“画鱼”', '做成了 3 步小游戏'], 70, 250, 70, 86, 900, C.ink)}
  <rect x="70" y="500" width="940" height="650" rx="42" fill="${C.white}"/>
  <circle cx="190" cy="650" r="74" fill="${C.yellow}"/>${tspans(['1'],190,676,72,0,900,C.ink,'middle')}
  ${tspans(['随手画一条鱼'], 310, 675, 48, 0, 800)}
  <path d="M190 755 V850" stroke="${C.blue}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="190" cy="920" r="74" fill="#A7E8FF"/>${tspans(['2'],190,946,72,0,900,C.ink,'middle')}
  ${tspans(['AI 判断“像不像”'], 310, 945, 48, 0, 800)}
  <path d="M190 1025 V1090" stroke="${C.blue}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="190" cy="1160" r="74" fill="#BDECCB"/>${tspans(['3'],190,1186,72,0,900,C.ink,'middle')}
  ${tspans(['通过后进入全球鱼缸'], 310, 1185, 48, 0, 800)}
`, 2));

slides.push(base(`
  ${tspans(['规则比我想象中', '还要具体'], 70, 250, 74, 90, 900, C.ink)}
  <rect x="70" y="500" width="940" height="640" rx="42" fill="${C.white}"/>
  <rect x="110" y="555" width="12" height="120" rx="6" fill="${C.coral}"/>
  ${tspans(['① 鱼必须朝右画'], 155, 625, 48, 0, 800)}
  ${tspans(['方向不对？先点 Flip 翻个面。'], 155, 680, 30, 0, 500, C.muted)}
  <rect x="110" y="745" width="12" height="120" rx="6" fill="${C.yellow}"/>
  ${tspans(['② 每画一笔都在识别'], 155, 815, 48, 0, 800)}
  ${tspans(['背景颜色会跟着 AI 判断变化。'], 155, 870, 30, 0, 500, C.muted)}
  <rect x="110" y="935" width="12" height="120" rx="6" fill="${C.green}"/>
  ${tspans(['③ 通过才准下水'], 155, 1005, 48, 0, 800)}
  ${tspans(['AI 真成了水族馆门卫。'], 155, 1060, 30, 0, 500, C.muted)}
`, 3, C.coral));

slides.push(base(`
  ${tspans(['我真的画了一条，', '结果有点节目效果'], 70, 250, 68, 84, 900, C.ink)}
  <rect x="60" y="460" width="960" height="780" rx="42" fill="${C.white}"/>
  <image href="data:image/png;base64,${mascot}" x="85" y="485" width="500" height="670" preserveAspectRatio="xMidYMid slice"/>
  <rect x="600" y="520" width="365" height="230" rx="30" fill="#EEF8FF"/>
  ${tspans(['画布：', '笔画记录成功'], 635, 590, 38, 56, 800)}
  <rect x="600" y="790" width="365" height="300" rx="30" fill="#FFF4E0"/>
  ${tspans(['提交：', '这一轮没有', '明显反馈'], 635, 860, 38, 56, 800)}
  ${tspans(['好玩是真的，', '反馈还可以更明确。'], 635, 1160, 29, 40, 600, C.muted)}
`, 4, C.yellow));

slides.push(base(`
  ${tspans(['它的 AI', '其实藏在浏览器里'], 70, 250, 74, 90, 900, C.ink)}
  <rect x="70" y="505" width="940" height="610" rx="42" fill="${C.white}"/>
  <circle cx="250" cy="700" r="120" fill="#EAF2FF"/>
  ${tspans(['画笔'],250,720,46,0,800,C.blue,'middle')}
  <path d="M380 700 H500" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
  <path d="M485 675 L520 700 L485 725" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="670" cy="700" r="140" fill="#FFF3C4"/>
  ${tspans(['ONNX', '识别模型'],670,690,42,52,900,C.ink,'middle')}
  ${tspans(['每次笔画 → 浏览器本地推理 → 实时判断'], 540, 930, 40, 0, 800, C.ink, 'middle')}
  ${tspans(['不是聊天机器人，是一个专门认鱼的“小脑袋”'], 540, 1005, 29, 0, 500, C.muted, 'middle')}
`, 5));

slides.push(base(`
  ${tspans(['优点很可爱，', '槽点也很真实'], 70, 250, 74, 90, 900, C.ink)}
  <rect x="70" y="500" width="450" height="650" rx="40" fill="${C.white}"/>
  <rect x="90" y="520" width="410" height="90" rx="26" fill="${C.green}"/>
  ${tspans(['喜欢的'], 295, 580, 40, 0, 800, C.white, 'middle')}
  ${tspans(['✓ 免费就能玩', '✓ 不登录也能画', '✓ 全球鱼缸很治愈', '✓ 开源，创意够纯粹'], 115, 690, 34, 80, 700)}
  <rect x="560" y="500" width="450" height="650" rx="40" fill="${C.white}"/>
  <rect x="580" y="520" width="410" height="90" rx="26" fill="${C.coral}"/>
  ${tspans(['想吐槽的'], 785, 580, 40, 0, 800, C.white, 'middle')}
  ${tspans(['× 界面比较朴素', '× 英文对小白不友好', '× 反馈有点隐晦', '× 鼠标画鱼手感一般'], 605, 690, 34, 80, 700)}
`, 6, C.green));

slides.push(base(`
  ${tspans(['最后打分'], 70, 250, 82, 0, 900, C.ink)}
  ${tspans(['小而怪，但真的会让人多画几条'], 70, 330, 34, 0, 600, C.muted)}
  <rect x="70" y="430" width="940" height="730" rx="48" fill="${C.white}" stroke="#B8E7E4" stroke-width="4"/>
  ${tspans(['趣味性'], 130, 560, 40, 0, 800)}${tspans(['★★★★★'], 910, 560, 44, 0, 800, C.coral, 'end')}
  ${tspans(['上手难度'], 130, 690, 40, 0, 800)}${tspans(['★★★★☆'], 910, 690, 44, 0, 800, C.coral, 'end')}
  ${tspans(['AI 惊喜感'], 130, 820, 40, 0, 800)}${tspans(['★★★★☆'], 910, 820, 44, 0, 800, C.coral, 'end')}
  ${tspans(['稳定反馈'], 130, 950, 40, 0, 800)}${tspans(['★★★☆☆'], 910, 950, 44, 0, 800, C.coral, 'end')}
  <line x1="130" y1="1020" x2="910" y2="1020" stroke="#D8ECEB" stroke-width="3"/>
  ${tspans(['综合评分'], 130, 1100, 44, 0, 900)}${tspans(['4.0 / 5'], 910, 1100, 58, 0, 900, C.blue, 'end')}
  <rect x="160" y="1210" width="760" height="100" rx="30" fill="${C.ink}"/>
  ${tspans(['你画的鱼，能骗过 AI 吗？'], 540, 1275, 36, 0, 700, C.white, 'middle')}
`, 7, C.blue));

(async () => {
  for (let i = 0; i < slides.length; i++) {
    const file = path.join(outDir, `${String(i + 1).padStart(2, '0')}.png`);
    await sharp(Buffer.from(slides[i])).png().toFile(file);
    console.log(file);
  }
  const thumbs = [];
  for (let i = 0; i < slides.length; i++) {
    const input = path.join(outDir, `${String(i + 1).padStart(2, '0')}.png`);
    const buffer = await sharp(input).resize(270, 360).toBuffer();
    thumbs.push({ input: buffer, left: (i % 4) * 290 + 20, top: Math.floor(i / 4) * 380 + 20 });
  }
  await sharp({ create: { width: 1180, height: 780, channels: 4, background: '#F4FAFA' } })
    .composite(thumbs)
    .png()
    .toFile(path.join(outDir, '整套预览.png'));
})();

import type { Question } from "./questions";

const fireAct = "https://elaws.e-gov.go.jp/document?lawid=323AC1000000186";
const officialGuide = "https://www.shoubo-shiken.or.jp/kikenbutsu/guide.html";
const officialSubjects = "https://www.shoubo-shiken.or.jp/kikenbutsu/annai/subject.html";

export const otsu4Questions: Question[] = [
  {
    id: "otsu4-designated-gasoline", number: 1, subject: "危険物に関する法令", subjectSlug: "law", difficulty: "基礎",
    prompt: "ガソリンの指定数量として、正しいものはどれか。",
    choices: ["50L", "100L", "200L", "400L", "1,000L"], correctIndex: 2,
    explanation: "ガソリンは第1石油類・非水溶性液体に該当し、指定数量は200Lです。数量問題では、品名だけでなく水溶性か非水溶性かも確認します。",
    sourceLabel: "消防法 別表第一（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-designated-multiple", number: 2, subject: "危険物に関する法令", subjectSlug: "law", difficulty: "標準",
    prompt: "同一場所でガソリン100Lと灯油500Lを貯蔵するとき、指定数量の倍数はいくつか。",
    choices: ["0.5倍", "0.75倍", "1.0倍", "1.5倍", "2.0倍"], correctIndex: 2,
    explanation: "ガソリンは100÷200=0.5、灯油は500÷1,000=0.5です。異なる危険物を同一場所で扱う場合は、それぞれの数量を指定数量で割った値を合計するため1.0倍になります。",
    sourceLabel: "消防法 第10条・別表第一（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-unlicensed-handling", number: 3, subject: "危険物に関する法令", subjectSlug: "law", difficulty: "基礎",
    prompt: "製造所等で、危険物取扱者免状を持たない者が第4類危険物を取り扱うための条件として正しいものはどれか。",
    choices: ["消防署への事前届出だけでよい", "甲種または取扱可能な乙種危険物取扱者の立会いが必要", "丙種危険物取扱者の立会いがあれば全ての第4類を扱える", "作業経験が6か月あればよい", "指定数量未満なら常に立会い不要"], correctIndex: 1,
    explanation: "製造所等では、無資格者は甲種またはその類を取り扱える乙種危険物取扱者が立ち会う場合に限り、危険物を取り扱えます。",
    sourceLabel: "消防法 第13条（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-facility-rule", number: 4, subject: "危険物に関する法令", subjectSlug: "law", difficulty: "基礎",
    prompt: "指定数量以上の危険物の貯蔵または取扱いについて、原則として正しいものはどれか。",
    choices: ["どの建物でも消火器があればよい", "市町村長等の許可を受けた製造所・貯蔵所・取扱所以外では行えない", "屋外であれば場所の制限はない", "危険物取扱者がいれば施設の許可は不要", "夜間だけであれば一般倉庫で扱える"], correctIndex: 1,
    explanation: "指定数量以上の危険物は、原則として許可を受けた製造所、貯蔵所または取扱所以外で貯蔵・取扱いできません。",
    sourceLabel: "消防法 第10条（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-exam-subjects", number: 5, subject: "危険物に関する法令", subjectSlug: "law", difficulty: "基礎",
    prompt: "乙種危険物取扱者試験の合格基準として正しいものはどれか。",
    choices: ["総得点が60%以上ならよい", "法令だけ70%以上が必要", "3科目それぞれ60%以上が必要", "2科目が60%以上ならよい", "科目基準はなく上位60%が合格"], correctIndex: 2,
    explanation: "乙種は、法令・基礎的な物理学及び化学・性質並びに火災予防及び消火の方法の各科目で、それぞれ60%以上が必要です。",
    sourceLabel: "消防試験研究センター「試験の方法」", sourceUrl: "https://www.shoubo-shiken.or.jp/kikenbutsu/annai/way.html", contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-flash-point", number: 6, subject: "基礎的な物理学・化学", subjectSlug: "science", difficulty: "基礎",
    prompt: "引火点の説明として最も適切なものはどれか。",
    choices: ["液体が自然に発火する最低温度", "燃焼が継続する最低温度", "火源を近づけたときに引火するのに十分な蒸気を発生する最低温度", "液体が沸騰を始める温度", "物質が固体から液体になる温度"], correctIndex: 2,
    explanation: "引火点は、火源を近づけたときに一時的に燃え出すのに十分な濃度の蒸気を発生する最低温度です。発火点や燃焼点とは区別します。",
    sourceLabel: "消防試験研究センター 乙種試験の出題範囲", sourceUrl: officialSubjects, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-vapor-density", number: 7, subject: "基礎的な物理学・化学", subjectSlug: "science", difficulty: "標準",
    prompt: "空気より重い可燃性蒸気が漏えいした場合、特に注意すべき場所はどれか。",
    choices: ["天井付近だけ", "高い棚の上だけ", "床面、くぼみ、排水溝など低い場所", "屋外の風上だけ", "水面の内部だけ"], correctIndex: 2,
    explanation: "第4類危険物の蒸気には空気より重いものが多く、低所に滞留して離れた火源まで流れる危険があります。低所の換気と火源管理が重要です。",
    sourceLabel: "消防試験研究センター 危険物取扱者受験案内", sourceUrl: officialGuide, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-static-electricity", number: 8, subject: "基礎的な物理学・化学", subjectSlug: "science", difficulty: "基礎",
    prompt: "危険物を配管で移送するときの静電気対策として、不適切なものはどれか。",
    choices: ["設備を接地する", "流速を必要以上に高くする", "導電性のある材料を用いる", "注入口を液面に近づける", "乾燥しすぎないよう配慮する"], correctIndex: 1,
    explanation: "流速を高くすると摩擦による静電気が発生・蓄積しやすくなります。接地、適切な流速、落下距離を小さくすることなどが基本対策です。",
    sourceLabel: "消防試験研究センター 乙種試験の出題範囲", sourceUrl: officialSubjects, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-radiation", number: 9, subject: "基礎的な物理学・化学", subjectSlug: "science", difficulty: "基礎",
    prompt: "真空中でも熱が伝わる伝熱の形態はどれか。",
    choices: ["伝導", "対流", "放射", "蒸発", "融解"], correctIndex: 2,
    explanation: "放射は電磁波によって熱を伝えるため、物質のない真空中でも伝わります。伝導と対流には物質が必要です。",
    sourceLabel: "消防試験研究センター 乙種試験の出題範囲", sourceUrl: officialSubjects, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-vapor-pressure", number: 10, subject: "基礎的な物理学・化学", subjectSlug: "science", difficulty: "標準",
    prompt: "密閉されていない容器内の液体について、一般に温度が上昇したときの変化として正しいものはどれか。",
    choices: ["蒸気圧は低下する", "蒸発しにくくなる", "蒸気圧は上昇し、蒸発しやすくなる", "引火の危険は必ずなくなる", "液体の質量は必ず増える"], correctIndex: 2,
    explanation: "一般に液温が上がると蒸気圧が上昇し、可燃性蒸気が発生しやすくなります。高温時ほど換気と火源管理が重要です。",
    sourceLabel: "消防試験研究センター 乙種試験の出題範囲", sourceUrl: officialSubjects, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-class4-feature", number: 11, subject: "性質・火災予防・消火", subjectSlug: "properties", difficulty: "基礎",
    prompt: "第4類危険物に共通する性状として正しいものはどれか。",
    choices: ["すべて水に溶ける", "すべて水より重い", "引火性の液体である", "酸素を大量に放出する固体である", "水と接触すると必ず発火する"], correctIndex: 2,
    explanation: "第4類は引火性液体です。ガソリン、アルコール類、灯油、軽油、重油、動植物油類などが含まれます。水溶性や比重は品名によって異なります。",
    sourceLabel: "消防試験研究センター「危険物取扱者免状の種類」", sourceUrl: officialGuide, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-gasoline-fire", number: 12, subject: "性質・火災予防・消火", subjectSlug: "properties", difficulty: "基礎",
    prompt: "ガソリン火災に棒状の水を直接放射することが不適切な主な理由はどれか。",
    choices: ["ガソリンが水と爆発的に反応するから", "ガソリンが水に浮き、燃焼面を広げるおそれがあるから", "水が酸素を発生させるから", "水がガソリンを固体にするから", "ガソリンが水を完全に吸収するから"], correctIndex: 1,
    explanation: "ガソリンは水に溶けにくく水より軽いため、棒状注水では燃焼中の液体を押し流して火面を拡大するおそれがあります。泡、粉末、二酸化炭素などを用います。",
    sourceLabel: "消防試験研究センター 第4類危険物の対象例", sourceUrl: officialGuide, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-alcohol-fire", number: 13, subject: "性質・火災予防・消火", subjectSlug: "properties", difficulty: "標準",
    prompt: "アルコール類の火災に泡消火剤を使用する場合、適しているものはどれか。",
    choices: ["一般のたん白泡だけ", "耐アルコール泡", "水だけを大量放射", "湿った砂だけ", "どの泡でも性能は同じ"], correctIndex: 1,
    explanation: "アルコール類は水溶性で一般の泡を壊しやすいため、耐アルコール泡を使用します。水溶性危険物かどうかは消火方法を選ぶ重要な判断材料です。",
    sourceLabel: "消防試験研究センター 第4類危険物の対象例", sourceUrl: officialGuide, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-kerosene-category", number: 14, subject: "性質・火災予防・消火", subjectSlug: "properties", difficulty: "標準",
    prompt: "灯油の分類と指定数量の組合せとして正しいものはどれか。",
    choices: ["特殊引火物・50L", "第1石油類・200L", "アルコール類・400L", "第2石油類・1,000L", "第3石油類・2,000L"], correctIndex: 3,
    explanation: "灯油は第2石油類の非水溶性液体で、指定数量は1,000Lです。軽油も同じ区分です。",
    sourceLabel: "消防法 別表第一（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
  {
    id: "otsu4-acetone-category", number: 15, subject: "性質・火災予防・消火", subjectSlug: "properties", difficulty: "標準",
    prompt: "アセトンの分類として正しいものはどれか。",
    choices: ["特殊引火物", "第1石油類・水溶性液体", "第1石油類・非水溶性液体", "第2石油類・水溶性液体", "アルコール類"], correctIndex: 1,
    explanation: "アセトンは第1石油類の水溶性液体です。水溶性の第1石油類の指定数量は400Lで、非水溶性の200Lとは異なります。",
    sourceLabel: "消防法 別表第一（e-Gov法令検索）", sourceUrl: fireAct, contentType: "予想問題", sourceCheckedAt: "2026-08-24",
  },
];


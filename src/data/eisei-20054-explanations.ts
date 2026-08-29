// GSCで表示実績が確認できた令和8年4月公表問題の検証済み解説。
// 正答は安全衛生技術試験協会の公表PDF（LC20260415-1）と照合済み。
export const eisei20054Explanations: Record<
  string,
  { explanation: string; explanationSourceLabel: string; explanationSourceUrl: string }
> = {
  "official-20054-q14": {
    explanation:
      "正解は(2)。騒音対策は、まず騒音発生源対策、次に伝ぱ経路対策を検討し、それでも必要な場合に聴覚保護具の使用や作業時間の制限などの受音者対策を組み合わせます。聴覚保護具の使用を最優先とする記述は不適切です。他肢の、対策管理者の選任、移動する騒音源に対する個人ばく露測定、雇入れ時健康診断の聴力検査周波数、事後措置で加齢性難聴の影響を考慮することは、いずれもガイドラインに沿った内容です。",
    explanationSourceLabel: "厚生労働省 職場のあんぜんサイト「騒音対策」",
    explanationSourceUrl: "https://anzeninfo.mhlw.go.jp/yougo/yougo73_1.html",
  },
  "official-20054-q22": {
    explanation:
      "正解は(5)。労働衛生コンサルタントの診断・指導を受けた事業者に、その記録を作成して3年間保存する義務は定められていません。コンサルタントには、業務に関して知り得た秘密を漏らし、又は盗用してはならない義務があります（労働安全衛生法第86条第2項）。他肢は、試験区分、指定登録機関による登録、報酬を得て行う診断・指導の業務、秘密漏えい等による登録取消しについての正しい記述です。",
    explanationSourceLabel: "労働安全衛生法（e-Gov法令検索）",
    explanationSourceUrl: "https://elaws.e-gov.go.jp/document?lawid=347AC0000000057",
  },
  "official-20054-q25": {
    explanation:
      "正解は(5)。事業場に附属する炊事場には専用の履物を備え、土足のまま立ち入らせないこととされています（労働安全衛生規則第630条第15号）。洗浄剤を含むマットがあっても、土足での立入りを認めることはできません。他肢は、開放可能な窓面積、労働者1人当たりの気積、休養室の設置要件、作業面の照度のいずれについても法令上の基準を満たしています。",
    explanationSourceLabel: "労働安全衛生規則（e-Gov法令検索）",
    explanationSourceUrl: "https://elaws.e-gov.go.jp/document?lawid=347M50002000032",
  },
  "official-20054-q34": {
    explanation:
      "正解は(2)。高齢者は若年者より高い照度を必要とすることが一般的ですが、水晶体の混濁によりまぶしさを感じやすい場合もあるため、照明の配置や輝度差への配慮が必要です。他肢は、1ルクスは1カンデラの光源から1m離れた面の照度であること、目より上の壁や天井は明るい色が望ましいこと、光源と視線の角度は30度以上とすること、全般照明は局部照明の10分の1以上を目安とすることに反しています。",
    explanationSourceLabel: "安全衛生技術試験協会 令和8年4月 第一種衛生管理者免許試験（公表問題）",
    explanationSourceUrl: "https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260415-1",
  },
  "official-20054-q39": {
    explanation:
      "正解は(5)。糸球体で濾し出された原尿に含まれる電解質の多くは、尿細管から血液中へ再吸収されます。他肢は、尿は通常弱酸性であること、血中の蛋白質は通常糸球体を通過しないこと、老廃物は糸球体からボウマン嚢へ濾し出されること、原尿中の水分の大部分は尿細管で再吸収されることに反しています。",
    explanationSourceLabel: "安全衛生技術試験協会 令和8年4月 第一種衛生管理者免許試験（公表問題）",
    explanationSourceUrl: "https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260415-1",
  },
  "official-20054-q40": {
    explanation:
      "正解は(2)。赤血球は血球の中で最も多いものの、全血液の体積に占める割合（ヘマトクリット値）は成人男性でおおむね45%前後であり、約60%ではありません。他肢の、血液が血漿と有形成分から成ること、血小板が血液凝固に関与すること、フィブリノーゲンがフィブリンへ変化して凝固すること、A型の血清が抗B抗体を持つことは正しい記述です。",
    explanationSourceLabel: "安全衛生技術試験協会 令和8年4月 第一種衛生管理者免許試験（公表問題）",
    explanationSourceUrl: "https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260415-1",
  },
  "official-20054-q41": {
    explanation:
      "正解は(2)。眼の調節は、毛様体筋の収縮・弛緩によって水晶体の厚みを変えて行います。硝子体の厚みを調節するわけではありません。他肢の、遠見視力検査を5mで行うこと、角膜の歪みなどによる乱視、視野のおおよその範囲、暗い場所で徐々に見えるようになる暗順応は正しい記述です。",
    explanationSourceLabel: "安全衛生技術試験協会 令和8年4月 第一種衛生管理者免許試験（公表問題）",
    explanationSourceUrl: "https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260415-1",
  },
};

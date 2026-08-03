// Self-contained legal/trust-page content for all four locales.
// Kept separate from the next-intl message files so these long-form pages
// don't bloat `messages/*.json` and can use real line breaks via template
// literals. `GuideView`/`LegalView` split each `body` on `\n` into <p>s.

export type Locale = 'en' | 'de' | 'ja' | 'zh';

export interface LegalSection {
  title: string;
  body: string; // may contain \n for multiple paragraphs
}

export interface LegalDoc {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: LegalSection[];
  conclusion?: string;
  contactEmail?: string; // only used by the contact page
}

export const LEGAL_PAGES = [
  { slug: 'privacy', key: 'privacy' },
  { slug: 'about', key: 'about' },
  { slug: 'contact', key: 'contact' },
  { slug: 'terms', key: 'terms' },
] as const;

export type LegalSlug = (typeof LEGAL_PAGES)[number]['slug'];

export function getLegalBySlug(slug: string): LegalSlug | null {
  return (LEGAL_PAGES.find((p) => p.slug === slug)?.slug as LegalSlug) ?? null;
}

export const legalContent: Record<LegalSlug, Record<Locale, LegalDoc>> = {
  privacy: {
    en: {
      metaTitle: 'Privacy Policy — HEIC Converter',
      metaDescription:
        'How HEIC Converter protects your privacy: 100% in-browser conversion, no file uploads, no tracking, no accounts. Your photos never leave your device.',
      h1: 'Privacy Policy',
      intro:
        'Your privacy matters. This page explains exactly what HEIC Converter does — and, just as important, what it does not do — with your files and your data.',
      sections: [
        {
          title: 'In-Browser Conversion, No Uploads',
          body: 'HEIC Converter runs entirely inside your web browser using WebAssembly. When you add a photo, it is decoded and re-encoded on your own device. Your files are never uploaded to our servers, sent to the cloud, or stored anywhere else — they simply never leave your computer or phone.',
        },
        {
          title: 'We Do Not See Your Photos',
          body: 'Because conversion happens locally, we never receive, transmit, or process the contents of your images. We cannot view them, copy them, or hand them to a third party. Even our own team has no access to what you convert.',
        },
        {
          title: 'No Accounts, No Sign-Up',
          body: 'You can use every feature without creating an account or providing an email address. There is no profile to build and nothing to link back to you.',
        },
        {
          title: 'Analytics and Cookies',
          body: 'We use privacy-friendly, aggregated analytics to understand general usage, such as which features are popular. This measures page views and performance — it is not used to identify you personally, and we do not sell or share this information.',
        },
        {
          title: 'Advertising',
          body: 'This site may show ads through Google AdSense. AdSense may use cookies to serve ads based on your general region and browsing context. You can control personalized ads in your Google Ad Settings. Ads never affect how your files are processed — conversion stays 100% local.',
        },
        {
          title: 'Data We Might Store',
          body: 'The only data we might retain is anonymous, technical log information (such as browser type and error reports) used to keep the site running smoothly. This never includes your photos.',
        },
        {
          title: "Children's Privacy",
          body: 'HEIC Converter does not knowingly collect personal information from children. Because no photos are uploaded in the first place, there is no image data to collect.',
        },
      ],
      conclusion:
        'In short: your photos are yours. They are processed on your device, in your browser, and they stay there. If you have any questions about this policy, reach out via our Contact page.',
    },
    de: {
      metaTitle: 'Datenschutzerklärung — HEIC Converter',
      metaDescription:
        'Wie HEIC Converter Ihre Privatsphäre schützt: 100 % browser-interne Konvertierung, keine Uploads, keine Verfolgung, keine Konten. Ihre Fotos verlassen niemals Ihr Gerät.',
      h1: 'Datenschutzerklärung',
      intro:
        'Ihre Privatsphäre ist uns wichtig. Diese Seite erklärt genau, was HEIC Converter mit Ihren Dateien und Daten tut — und, ebenso wichtig, was nicht.',
      sections: [
        {
          title: 'Konvertierung im Browser, ohne Uploads',
          body: 'HEIC Converter läuft vollständig in Ihrem Webbrowser über WebAssembly. Wenn Sie ein Foto hinzufügen, wird es auf Ihrem eigenen Gerät dekodiert und neu codiert. Ihre Dateien werden niemals auf unsere Server hochgeladen, in die Cloud gesendet oder anderswo gespeichert — sie verlassen schlicht nie Ihren Computer oder Ihr Handy.',
        },
        {
          title: 'Wir sehen Ihre Fotos nicht',
          body: 'Da die Konvertierung lokal stattfindet, empfangen, übertragen oder verarbeiten wir den Inhalt Ihrer Bilder niemals. Wir können sie weder ansehen noch kopieren oder an Dritte weitergeben. Nicht einmal unser Team hat Zugriff auf das, was Sie konvertieren.',
        },
        {
          title: 'Keine Konten, keine Anmeldung',
          body: 'Sie können jede Funktion nutzen, ohne ein Konto zu erstellen oder eine E-Mail-Adresse anzugeben. Es gibt kein Profil und nichts, das mit Ihnen verknüpft wird.',
        },
        {
          title: 'Analysen und Cookies',
          body: 'Wir verwenden datenschutzfreundliche, aggregierte Analysen, um die allgemeine Nutzung (etwa beliebte Funktionen) zu verstehen. Damit werden Seitenaufrufe und Leistung gemessen — nicht Sie persönlich identifiziert. Wir verkaufen oder teilen diese Informationen nicht.',
        },
        {
          title: 'Werbung',
          body: 'Diese Seite kann Werbung über Google AdSense schalten. AdSense kann Cookies verwenden, um Anzeigen auf Basis Ihrer Region und Ihres Browser-Kontexts zu schalten. Personalisierte Anzeigen können Sie in den Google-Anzeigeneinstellungen steuern. Werbung beeinflusst die Verarbeitung Ihrer Dateien nie — die Konvertierung bleibt zu 100 % lokal.',
        },
        {
          title: 'Daten, die wir speichern könnten',
          body: 'Die einzigen Daten, die wir möglicherweise speichern, sind anonyme technische Protokollinformationen (wie Browsertyp und Fehlerberichte), die den reibungslosen Betrieb sichern. Ihre Fotos gehören nie dazu.',
        },
        {
          title: 'Privatsphäre von Kindern',
          body: 'HEIC Converter erfasst wissentlich keine personenbezogenen Daten von Kindern. Da gar keine Fotos hochgeladen werden, gibt es erst recht keine Bilddaten zu erfassen.',
        },
      ],
      conclusion:
        'Kurz gesagt: Ihre Fotos gehören Ihnen. Sie werden auf Ihrem Gerät, in Ihrem Browser verarbeitet und bleiben dort. Fragen zu dieser Erklärung beantworten wir gern über die Kontaktseite.',
    },
    ja: {
      metaTitle: 'プライバシーポリシー — HEIC Converter',
      metaDescription:
        'HEIC Converter がプライバシーを守る仕組み：ブラウザー内で 100% 処理、アップロードなし、追跡なし、アカウント不要。写真がデバイスから出ることはありません。',
      h1: 'プライバシーポリシー',
      intro:
        'プライバシーは大切です。このページでは、HEIC Converter があなたのファイルやデータに対して何をするか——そして同じくらい重要なこととして、何をしないか——を説明します。',
      sections: [
        {
          title: 'ブラウザー内で処理、アップロードなし',
          body: 'HEIC Converter は WebAssembly を使ってブラウザー内だけで動作します。写真を追加すると、あなたのデバイス上でデコードと再エンコードが行われます。ファイルがサーバーにアップロードされたり、クラウドに送信されたり、他へ保存されたりすることは一切なく、デバイスから出ることはありません。',
        },
        {
          title: '私たちは写真を見ません',
          body: '処理がローカルで行われるため、私たちが画像の内容を受信・送信・解析することはありません。閲覧・複製・第三者への提供もできません。変換した内容は私たちのチームにも一切見えません。',
        },
        {
          title: 'アカウント不要、登録不要',
          body: 'すべての機能を、アカウント作成やメールアドレス入力なしで使えます。あなたに関連付けるプロフィールもデータも作られません。',
        },
        {
          title: 'アクセス解析と Cookie',
          body: '私たちは、一般的な利用状況（人気の機能など）を理解するために、プライバシーに配慮した集計解析を使っています。これはページビューやパフォーマンスの測定であり、あなた個人を識別するものではなく、情報の販売や共有もしません。',
        },
        {
          title: '広告について',
          body: '本サイトでは Google AdSense による広告を表示することがあります。AdSense は地域やブラウザーの状況に基づいて広告を配信するため Cookie を使う場合があります。パーソナライズド広告は Google 広告設定で制御できます。広告がファイルの処理に影響することはなく、変換は常に 100% ローカルです。',
        },
        {
          title: '保存する可能性があるデータ',
          body: '私たちが保存する可能性があるのは、サイトの円滑な運用のための匿名の技術ログ（ブラウザーの種類やエラー報告など）だけです。写真が含まれることは絶対にありません。',
        },
        {
          title: 'お子様のプライバシー',
          body: 'HEIC Converter は、意図的に子供から個人データを収集することはありません。そもそも写真がアップロードされないため、収集する画像データ自体が存在しません。',
        },
      ],
      conclusion:
        'つまり、写真はあなたのものです。デバイス上のブラウザー内で処理され、そこに留まります。本ポリシーについて質問があれば、お問い合わせページからどうぞ。',
    },
    zh: {
      metaTitle: '隐私政策 — HEIC Converter',
      metaDescription:
        'HEIC Converter 如何保护你的隐私：100% 浏览器内转换，不上传文件、不追踪、无需账号。你的照片永远不会离开你的设备。',
      h1: '隐私政策',
      intro:
        '我们重视你的隐私。本页明确说明 HEIC Converter 对你的文件和数据处理做了什么——同样重要的是，没做什么。',
      sections: [
        {
          title: '浏览器内转换，无需上传',
          body: 'HEIC Converter 完全在你的网页浏览器中通过 WebAssembly 运行。当你添加照片时，解码与重新编码都在你自己的设备上完成。你的文件从不上传到我们的服务器、不会发往云端，也不会存储到其他任何地方——它们根本不会离开你的电脑或手机。',
        },
        {
          title: '我们看不到你的照片',
          body: '因为转换在本地完成，我们永远不会接收、传输或处理你图片的内容。我们无法查看、复制，也不会交给第三方。即便是我们的团队，也无权访问你转换的内容。',
        },
        {
          title: '无需账号，无需注册',
          body: '你可以使用全部功能，而无需创建账号或提供邮箱地址。没有需要建立的档案，也没有任何信息与你关联。',
        },
        {
          title: '分析与 Cookie',
          body: '我们使用注重隐私的聚合分析来了解整体使用情况，例如哪些功能受欢迎。这衡量的是页面浏览量与性能，并不用于识别你的个人身份，我们也不会出售或共享这些信息。',
        },
        {
          title: '广告',
          body: '本站点可能通过 Google AdSense 展示广告。AdSense 可能使用 Cookie，根据你所在的地区和浏览环境投放广告。你可以在 Google 广告设置中控制个性化广告。广告永远不会影响你文件的处理方式——转换始终 100% 在本地完成。',
        },
        {
          title: '我们可能存储的数据',
          body: '我们可能保留的唯一数据，是用于保障站点平稳运行的匿名技术日志（如浏览器类型和错误报告）。其中绝不包含你的照片。',
        },
        {
          title: '儿童隐私',
          body: 'HEIC Converter 不会故意收集儿童的个人信息。由于照片从一开始就不会被上传，也就不存在可供收集的图像数据。',
        },
      ],
      conclusion:
        '简而言之：照片属于你。它们在你的设备上、在你的浏览器里被处理，并始终留在那里。若对本政策有疑问，请通过联系页面与我们沟通。',
    },
  },

  about: {
    en: {
      metaTitle: 'About HEIC Converter',
      metaDescription:
        'HEIC Converter is a free, privacy-first tool that turns iPhone HEIC photos into JPG, PNG, WebP, or PDF — entirely in your browser.',
      h1: 'About HEIC Converter',
      intro:
        'HEIC Converter is a free online tool built for one job: letting you open and use your iPhone photos anywhere, without giving up your privacy.',
      sections: [
        {
          title: 'Why We Built It',
          body: 'iPhone photos are great, but HEIC files are a headache on Windows, Android, and most websites. Most converters solve this by uploading your pictures to a server. We believed there was a better way — one that never takes your photos off your device.',
        },
        {
          title: 'Our Approach: Local First',
          body: 'Everything runs in your browser with WebAssembly. That means conversion starts instantly, works offline after the first load, and keeps your files private by design. No upload, no account, no waiting.',
        },
        {
          title: 'What You Get',
          body: 'Convert HEIC to JPG, PNG, WebP, or PDF. Batch dozens of images at once. Merge photos into a single PDF. All for free, with no file-size limit and no watermark.',
        },
        {
          title: 'Our Promise',
          body: 'We will never sell your data, because we never receive it. We will keep the core tool free and private. And we will keep improving it based on what you tell us.',
        },
      ],
      conclusion:
        'Thanks for using HEIC Converter. If something is missing or could be better, let us know on the Contact page — we read every message.',
    },
    de: {
      metaTitle: 'Über HEIC Converter',
      metaDescription:
        'HEIC Converter ist ein kostenloses, datenschutzorientiertes Werkzeug, das iPhone-HEIC-Fotos in JPG, PNG, WebP oder PDF verwandelt — ganz im Browser.',
      h1: 'Über HEIC Converter',
      intro:
        'HEIC Converter ist ein kostenloses Online-Werkzeug, das einen Job erledigt: Ihre iPhone-Fotos überall nutzbar zu machen, ohne Ihre Privatsphäre aufzugeben.',
      sections: [
        {
          title: 'Warum wir es gebaut haben',
          body: 'iPhone-Fotos sind toll, aber HEIC-Dateien sind unter Windows, Android und den meisten Websites eine Plage. Die meisten Konverter lösen das, indem sie Ihre Bilder auf einen Server hochladen. Wir hielten einen besseren Weg für möglich — einen, der Ihre Fotos niemals vom Gerät nimmt.',
        },
        {
          title: 'Unser Ansatz: Lokal zuerst',
          body: 'Alles läuft mit WebAssembly in Ihrem Browser. Das bedeutet: Die Konvertierung startet sofort, funktioniert nach dem ersten Laden offline und hält Ihre Dateien von Natur aus privat. Kein Upload, kein Konto, kein Warten.',
        },
        {
          title: 'Was Sie erhalten',
          body: 'Konvertieren Sie HEIC in JPG, PNG, WebP oder PDF. Verarbeiten Sie Dutzende Bilder auf einmal. Fassen Sie Fotos zu einem einzigen PDF zusammen. Alles kostenlos, ohne Dateigrößenlimit und ohne Wasserzeichen.',
        },
        {
          title: 'Unser Versprechen',
          body: 'Wir verkaufen Ihre Daten niemals, weil wir sie nie erhalten. Wir halten das Kernwerkzeug kostenlos und privat. Und wir verbessern es stetig auf Basis Ihrer Rückmeldungen.',
        },
      ],
      conclusion:
        'Danke, dass Sie HEIC Converter nutzen. Wenn etwas fehlt oder besser gehen könnte, melden Sie sich über die Kontaktseite — wir lesen jede Nachricht.',
    },
    ja: {
      metaTitle: 'HEIC Converter について',
      metaDescription:
        'HEIC Converter は、iPhone の HEIC 写真を JPG・PNG・WebP・PDF に変換する、無料でプライバシー重視のブラウザーツールです。',
      h1: 'HEIC Converter について',
      intro:
        'HEIC Converter は、たった一つの目的のために作られた無料のオンラインツールです。プライバシーを犠牲にせず、どこでも iPhone の写真を開いて使えるようにすることです。',
      sections: [
        {
          title: '作った理由',
          body: 'iPhone の写真は素晴らしいですが、HEIC ファイルは Windows・Android・多くのウェブサイトで頭の痛い存在です。多くの変換ツールは写真をサーバーにアップロードしてこれを解決します。私たちは、写真をデバイスから出さない別の方法があると考えました。',
        },
        {
          title: '私たちの方針：ローカル最優先',
          body: 'すべては WebAssembly でブラウザー内で動きます。そのため変換は即座に始まり、一度読み込めばオフラインでも動作し、設計上ファイルは常にプライベートです。アップロードもアカウントも待ち時間もありません。',
        },
        {
          title: '得られるもの',
          body: 'HEIC を JPG・PNG・WebP・PDF に変換。数十枚の画像を一度に一括処理。写真を 1 つの PDF にまとめ。すべて無料、ファイルサイズ制限なし、透かしなし。',
        },
        {
          title: '私たちの約束',
          body: '私たちはあなたのデータを売りません。そもそも受け取らないからです。中核のツールは無料かつプライベートを維持します。そして皆さんの声をもとに改善し続けます。',
        },
      ],
      conclusion:
        'HEIC Converter をご利用いただきありがとうございます。不足している機能や改善点があれば、お問い合わせページまで — すべてのメッセージを読んでいます。',
    },
    zh: {
      metaTitle: '关于 HEIC Converter',
      metaDescription:
        'HEIC Converter 是一款免费、以隐私为先的工具，可把 iPhone 的 HEIC 照片转为 JPG、PNG、WebP 或 PDF——全程在浏览器中完成。',
      h1: '关于 HEIC Converter',
      intro:
        'HEIC Converter 是一个免费的在线工具，只为做好一件事：让你在任何地方都能打开并使用 iPhone 照片，同时不牺牲隐私。',
      sections: [
        {
          title: '我们为什么做它',
          body: 'iPhone 照片很棒，但 HEIC 文件在 Windows、Android 和大多数网站上都很头疼。多数转换器靠把照片上传到服务器来解决这个问题。我们相信有更好的方式——一种永远不把你的照片带离设备的方式。',
        },
        {
          title: '我们的思路：本地优先',
          body: '一切都在浏览器里通过 WebAssembly 运行。这意味着转换即刻开始，首次加载后可离线工作，并且从设计上就保护你的文件隐私。无需上传、无需账号、无需等待。',
        },
        {
          title: '你能得到什么',
          body: '把 HEIC 转为 JPG、PNG、WebP 或 PDF。一次批量处理几十张图片。把多张照片合并成一个 PDF。全部免费，无文件大小限制，无水印。',
        },
        {
          title: '我们的承诺',
          body: '我们永远不会出售你的数据，因为我们根本收不到它。我们会让核心工具保持免费与私密。并且会根据你的反馈持续改进。',
        },
      ],
      conclusion:
        '感谢你使用 HEIC Converter。如果少了什么功能，或哪里可以更好，请通过联系页面告诉我们——每一条留言我们都会看。',
    },
  },

  contact: {
    en: {
      metaTitle: 'Contact HEIC Converter',
      metaDescription:
        'Questions, feedback, or a bug to report? Contact the HEIC Converter team — we read every message.',
      h1: 'Contact Us',
      intro: "We'd love to hear from you — whether it's a bug, a feature idea, or just a thank-you.",
      sections: [
        {
          title: 'Email',
          body: 'The fastest way to reach us is by email. We aim to reply within a couple of business days.',
        },
        {
          title: 'Feedback and Ideas',
          body: 'Have a format you wish we supported, or a workflow that feels awkward? Tell us. The roadmap is shaped by user requests.',
        },
        {
          title: 'Report a Problem',
          body: 'If a file fails to convert, mention your device, browser, and the camera or app that produced the photo. That helps us reproduce and fix it quickly.',
        },
      ],
      contactEmail: 'hello@heic2any.online',
    },
    de: {
      metaTitle: 'HEIC Converter kontaktieren',
      metaDescription:
        'Fragen, Feedback oder ein Fehler? Kontaktieren Sie das HEIC-Converter-Team — wir lesen jede Nachricht.',
      h1: 'Kontakt',
      intro: 'Wir freuen uns von Ihnen zu hören — ob Fehler, Idee oder einfach ein Dankeschön.',
      sections: [
        {
          title: 'E-Mail',
          body: 'Der schnellste Weg, uns zu erreichen, ist per E-Mail. Wir antworten in der Regel innerhalb von ein paar Werktagen.',
        },
        {
          title: 'Feedback und Ideen',
          body: 'Ein Format, das wir unterstützen sollen, oder ein umständlicher Ablauf? Sagen Sie es uns. Die Roadmap wird von Nutzerwünschen geprägt.',
        },
        {
          title: 'Problem melden',
          body: 'Scheitert eine Datei bei der Konvertierung, nennen Sie Gerät, Browser sowie Kamera oder App, mit der das Foto erstellt wurde. So können wir es schnell nachstellen und beheben.',
        },
      ],
      contactEmail: 'hello@heic2any.online',
    },
    ja: {
      metaTitle: 'HEIC Converter へのお問い合わせ',
      metaDescription:
        '質問、フィードバック、不具合の報告はこちら。HEIC Converter チームがすべてのメッセージを読んでいます。',
      h1: 'お問い合わせ',
      intro: 'バグ報告、機能のアイデア、ただの感謝など、ぜひお聞かせください。',
      sections: [
        {
          title: 'メール',
          body: '最も早く連絡できるのはメールです。通常、数営業日以内に返信します。',
        },
        {
          title: 'フィードバックとアイデア',
          body: '対応してほしい形式や、使いにくい手順はありますか？ ぜひ教えてください。ロードマップはユーザーの要望で形作られます。',
        },
        {
          title: '不具合の報告',
          body: '変換に失敗したファイルがあれば、デバイス・ブラウザ・その写真を作ったカメラやアプリをお知らせください。再現と修正の助けになります。',
        },
      ],
      contactEmail: 'hello@heic2any.online',
    },
    zh: {
      metaTitle: '联系 HEIC Converter',
      metaDescription: '有问题、建议或想反馈 bug？联系 HEIC Converter 团队——我们每一条留言都会看。',
      h1: '联系我们',
      intro: '无论是 bug、功能想法，还是一句感谢，我们都乐意听到你的声音。',
      sections: [
        {
          title: '邮箱',
          body: '联系我们最快的方式是发邮件。我们通常会在几个工作日内回复。',
        },
        {
          title: '反馈与建议',
          body: '有希望我们支持格式，或某个流程用着别扭？告诉我们。产品路线圖由用户需求决定。',
        },
        {
          title: '反馈问题',
          body: '如果某个文件转换失败，请说明你的设备、浏览器，以及拍摄该照片的相机或应用。这有助于我们复现并快速修复。',
        },
      ],
      contactEmail: 'hello@heic2any.online',
    },
  },

  terms: {
    en: {
      metaTitle: 'Terms of Service — HEIC Converter',
      metaDescription:
        'The terms that govern use of HEIC Converter’s free, browser-based HEIC conversion tool.',
      h1: 'Terms of Service',
      intro: 'By using HEIC Converter you agree to the following straightforward terms.',
      sections: [
        {
          title: 'The Service',
          body: 'HEIC Converter is provided as-is, free of charge, for converting image files in your browser. We may update or discontinue features at any time.',
        },
        {
          title: 'Acceptable Use',
          body: 'Use the tool for lawful purposes only. Do not attempt to disrupt the service, reverse-engineer it to harm others, or use it to process files you do not have the right to handle.',
        },
        {
          title: 'No Warranty',
          body: 'Conversion runs locally on your device. While we work hard to support many HEIC variants, we cannot guarantee every file, camera, or codec will convert perfectly. Results are provided without warranty.',
        },
        {
          title: 'Your Files Stay Yours',
          body: 'Because files are processed on your device and never uploaded, you retain full ownership and responsibility for them. We are not liable for any loss or damage arising from use of the tool.',
        },
        {
          title: 'Advertising',
          body: 'The site may display third-party ads, including Google AdSense. Those providers have their own policies, and we are not responsible for their content.',
        },
        {
          title: 'Changes to These Terms',
          body: 'We may revise these terms occasionally. Continued use of the site after changes means you accept the updated terms.',
        },
      ],
      conclusion: 'Questions about these terms? Contact us and we will be happy to clarify.',
    },
    de: {
      metaTitle: 'Nutzungsbedingungen — HEIC Converter',
      metaDescription:
        'Die Bedingungen für die Nutzung des kostenlosen, browser-basierten HEIC-Konverters von HEIC Converter.',
      h1: 'Nutzungsbedingungen',
      intro: 'Mit der Nutzung von HEIC Converter stimmen Sie den folgenden klaren Bedingungen zu.',
      sections: [
        {
          title: 'Der Dienst',
          body: 'HEIC Converter wird kostenlos und unverändert zum Konvertieren von Bilddateien in Ihrem Browser bereitgestellt. Wir können Funktionen jederzeit aktualisieren oder einstellen.',
        },
        {
          title: 'Zulässige Nutzung',
          body: 'Nutzen Sie das Werkzeug nur für rechtmäßige Zwecke. Versuchen Sie nicht, den Dienst zu stören, ihn zu reverse-engineeren, um andere zu schädigen, oder Dateien zu verarbeiten, für die Sie keine Rechte haben.',
        },
        {
          title: 'Keine Gewähr',
          body: 'Die Konvertierung läuft lokal auf Ihrem Gerät. Wir bemühen uns, viele HEIC-Varianten zu unterstützen, können aber nicht garantieren, dass jede Datei, Kamera oder jeder Codec perfekt konvertiert. Ergebnisse erfolgen ohne Gewähr.',
        },
        {
          title: 'Ihre Dateien bleiben Ihre',
          body: 'Da Dateien auf Ihrem Gerät verarbeitet und nie hochgeladen werden, behalten Sie das volle Eigentum und die Verantwortung dafür. Wir haften nicht für Verluste oder Schäden aus der Nutzung des Werkzeugs.',
        },
        {
          title: 'Werbung',
          body: 'Die Seite kann Fremdwerbung, einschließlich Google AdSense, anzeigen. Diese Anbieter haben eigene Richtlinien, und wir sind nicht für deren Inhalte verantwortlich.',
        },
        {
          title: 'Änderungen dieser Bedingungen',
          body: 'Wir können diese Bedingungen gelegentlich überarbeiten. Die weitere Nutzung der Seite nach Änderungen gilt als Zustimmung zu den aktualisierten Bedingungen.',
        },
      ],
      conclusion: 'Fragen zu diesen Bedingungen? Kontaktieren Sie uns — wir klären gern.',
    },
    ja: {
      metaTitle: '利用規約 — HEIC Converter',
      metaDescription:
        'HEIC Converter の無料ブラウザー版 HEIC 変換ツールを利用する際の規約です。',
      h1: '利用規約',
      intro: 'HEIC Converter を利用することで、以下の明確な規約に同意したことになります。',
      sections: [
        {
          title: '本サービス',
          body: 'HEIC Converter は、ブラウザーで画像ファイルを変換するための無料・現状有姿のサービスとして提供します。機能は随時更新または終了する場合があります。',
        },
        {
          title: '適切な利用',
          body: 'ツールは合法的な目的でのみ利用してください。サービスを妨害したり、他者を害するためにリバースエンジニアリングしたり、取り扱う権利のないファイルを処理したりしないでください。',
        },
        {
          title: '無保証',
          body: '変換はお使いのデバイス上でローカルに行われます。多くの HEIC 亜種に対応するよう努めていますが、すべてのファイル・カメラ・コーデックが完璧に変換されることを保証するものではありません。結果は無保証で提供されます。',
        },
        {
          title: 'ファイルはあなたのもの',
          body: 'ファイルはデバイス上で処理され、アップロードされることはないため、所有権と責任は常にあなたにあります。ツールの利用に伴ういかなる損失や損害についても、当方は責任を負いません。',
        },
        {
          title: '広告について',
          body: '本サイトは Google AdSense を含む第三者の広告を表示する場合があります。これらの提供元には独自のポリシーがあり、当方はその内容について責任を負いません。',
        },
        {
          title: '本規約の変更',
          body: '本規約は随時改定されることがあります。変更後のサイトの利用は、更新された規約への同意とみなされます。',
        },
      ],
      conclusion: '本規約について質問がありましたら、お問い合わせください。喜んで説明します。',
    },
    zh: {
      metaTitle: '服务条款 — HEIC Converter',
      metaDescription: '使用 HEIC Converter 免费、基于浏览器的 HEIC 转换工具所适用的条款。',
      h1: '服务条款',
      intro: '使用 HEIC Converter 即表示你同意以下简明条款。',
      sections: [
        {
          title: '服务说明',
          body: 'HEIC Converter 按"现状"免费提供，用于在浏览器中转换图像文件。我们可随时更新或停止某些功能。',
        },
        {
          title: '合理使用',
          body: '仅可将工具用于合法目的。不要试图干扰服务、通过反向工程损害他人，或处理你无权处理的文件。',
        },
        {
          title: '不提供担保',
          body: '转换在你的设备上本地运行。尽管我们努力支持多种 HEIC 变体，但无法保证每个文件、相机或编解码器都能完美转换。结果按"不提供担保"提供。',
        },
        {
          title: '文件始终归你所有',
          body: '由于文件在你的设备上处理、从不上传，你对其保有完整所有权与责任。对于因使用本工具而产生的任何损失或损害，我们不承担责任。',
        },
        {
          title: '广告',
          body: '站点可能展示第三方广告，包括 Google AdSense。这些提供方有各自的策略，我们对其内容不承担责任。',
        },
        {
          title: '条款的变更',
          body: '我们可能不时修订本条款。变更后继续使用本站点，即表示你接受更新后的条款。',
        },
      ],
      conclusion: '对条款有疑问？联系我们，我们很乐意说明。',
    },
  },
};

export function getLegalMeta(locale: string, slug: string) {
  const doc = legalContent[slug as LegalSlug]?.[locale as Locale];
  if (!doc) return null;
  return { title: doc.metaTitle, description: doc.metaDescription };
}

export function buildLegalAlternates(locale: string, slug: string) {
  const languages: Record<string, string> = {};
  for (const loc of ['en', 'de', 'ja', 'zh'] as const) {
    languages[loc] = loc === 'en' ? `/${slug}/` : `/${loc}/${slug}/`;
  }
  return {
    canonical: locale === 'en' ? `/${slug}/` : `/${locale}/${slug}/`,
    languages,
  };
}

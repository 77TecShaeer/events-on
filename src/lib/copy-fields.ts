export type CopyField = {
  path: string;
  label: string;
  hint?: string;
  area?: boolean;
  list?: boolean;
  group?: string;
  extra?: boolean;
};

export type CopySection = {
  id: string;
  label: string;
  hint?: string;
  extra?: boolean;
  fields: CopyField[];
};

export const COPY_SECTIONS: CopySection[] = [
  {
    id: "home",
    label: "الصفحة الرئيسية",
    hint: "الكلام اللي الناس بتشوفه أول ما تفتح الموقع.",
    fields: [
      { path: "home.kicker", label: "كلمة صغيرة فوق العنوان", group: "أول الشاشة" },
      { path: "home.title", label: "العنوان الكبير", group: "أول الشاشة" },
      { path: "home.titleAccent", label: "تكملة العنوان", group: "أول الشاشة" },
      { path: "home.lead", label: "الجملة اللي تحت العنوان", area: true, group: "أول الشاشة" },
      {
        path: "home.cycle",
        label: "الكلمات اللي بتتحرك",
        hint: "كل سطر كلمة.",
        area: true,
        list: true,
        group: "أول الشاشة",
      },
      { path: "home.servicesTitle", label: "عنوان جزء الخدمات", group: "الخدمات" },
      { path: "home.servicesLead", label: "كلام تحت عنوان الخدمات", area: true, group: "الخدمات" },
      { path: "home.workTitle", label: "عنوان جزء الأعمال", group: "الأعمال" },
      { path: "home.workNote", label: "ملاحظة تحت الأعمال", area: true, group: "الأعمال" },
      { path: "home.proofTitle", label: "عنوان الثلاث جمل", group: "ثلاث جمل" },
      { path: "home.stat1", label: "الجملة الأولى — العنوان", group: "ثلاث جمل" },
      { path: "home.stat1Label", label: "الجملة الأولى — الشرح", area: true, group: "ثلاث جمل" },
      { path: "home.stat2", label: "الجملة التانية — العنوان", group: "ثلاث جمل" },
      { path: "home.stat2Label", label: "الجملة التانية — الشرح", area: true, group: "ثلاث جمل" },
      { path: "home.stat3", label: "الجملة التالتة — العنوان", group: "ثلاث جمل" },
      { path: "home.stat3Label", label: "الجملة التالتة — الشرح", area: true, group: "ثلاث جمل" },
      { path: "home.egyptKicker", label: "كلمة صغيرة", group: "الاستوديو" },
      { path: "home.egyptTitle", label: "العنوان", group: "الاستوديو" },
      { path: "home.egyptLead", label: "الكلام", area: true, group: "الاستوديو" },
      { path: "home.historyKicker", label: "كلمة صغيرة", group: "قصتنا على الرئيسية" },
      { path: "home.historyTitle", label: "العنوان", group: "قصتنا على الرئيسية" },
      { path: "home.historyLead", label: "الكلام", area: true, group: "قصتنا على الرئيسية" },
      { path: "home.teamKicker", label: "كلمة صغيرة", group: "الفريق على الرئيسية" },
      { path: "home.teamTitle", label: "العنوان", group: "الفريق على الرئيسية" },
      { path: "home.teamLead", label: "الكلام", area: true, group: "الفريق على الرئيسية" },
      { path: "home.ctaTitle", label: "العنوان", group: "آخر الصفحة" },
      { path: "home.ctaLead", label: "الكلام", area: true, group: "آخر الصفحة" },
    ],
  },
  {
    id: "about",
    label: "عنّا",
    fields: [
      { path: "about.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "about.title", label: "العنوان" },
      { path: "about.lead", label: "المقدمة", area: true },
      { path: "about.body", label: "الفقرة الأولى", area: true },
      { path: "about.body2", label: "الفقرة التانية", area: true },
      { path: "about.processTitle", label: "عنوان خطوات الشغل" },
      { path: "about.discover", label: "الخطوة 1 — الاسم" },
      { path: "about.discoverBody", label: "الخطوة 1 — الشرح", area: true },
      { path: "about.design", label: "الخطوة 2 — الاسم" },
      { path: "about.designBody", label: "الخطوة 2 — الشرح", area: true },
      { path: "about.produce", label: "الخطوة 3 — الاسم" },
      { path: "about.produceBody", label: "الخطوة 3 — الشرح", area: true },
    ],
  },
  {
    id: "services",
    label: "صفحة الخدمات",
    hint: "عنوان الصفحة. الخدمات نفسها من قائمة الخدمات.",
    fields: [
      { path: "services.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "services.title", label: "العنوان" },
      { path: "services.lead", label: "المقدمة", area: true },
    ],
  },
  {
    id: "work",
    label: "صفحة الأعمال",
    hint: "عنوان الصفحة. المشاريع نفسها من قائمة الأعمال.",
    fields: [
      { path: "work.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "work.title", label: "العنوان" },
      { path: "work.lead", label: "المقدمة", area: true },
      { path: "work.sample", label: "كلمة عيّنة على الصور" },
    ],
  },
  {
    id: "team",
    label: "صفحة الفريق",
    fields: [
      { path: "team.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "team.title", label: "العنوان" },
      { path: "team.lead", label: "المقدمة", area: true },
    ],
  },
  {
    id: "history",
    label: "صفحة قصتنا",
    fields: [
      { path: "history.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "history.title", label: "العنوان" },
      { path: "history.lead", label: "المقدمة", area: true },
    ],
  },
  {
    id: "contact",
    label: "صفحة تواصل",
    fields: [
      { path: "contact.kicker", label: "كلمة صغيرة فوق العنوان" },
      { path: "contact.title", label: "العنوان" },
      { path: "contact.lead", label: "المقدمة", area: true },
      { path: "contact.whatsappLead", label: "عنوان جزء الواتساب" },
      { path: "contact.whatsappBody", label: "كلام جزء الواتساب", area: true },
      { path: "form.name", label: "اسم خانة الاسم" },
      { path: "form.company", label: "اسم خانة الشركة" },
      { path: "form.email", label: "اسم خانة الإيميل" },
      { path: "form.phone", label: "اسم خانة الموبايل" },
      { path: "form.message", label: "اسم خانة الرسالة", area: true },
      { path: "form.submit", label: "زر الإرسال" },
      { path: "whatsappPrefill", label: "أول رسالة بتتكتب في واتساب", area: true },
      { path: "form.sending", label: "الكلام وهو بيبعت", extra: true },
      { path: "form.success", label: "الكلام بعد ما الرسالة توصل", extra: true },
      { path: "form.error", label: "الكلام لو الإرسال فشل", extra: true },
      { path: "form.missing", label: "الكلام لو الفورم لسه مش شغال", area: true, extra: true },
      { path: "contact.unavailable", label: "الكلام لو الواتساب مش متظبط", area: true, extra: true },
    ],
  },
  {
    id: "chrome",
    label: "القائمة والأزرار",
    fields: [
      { path: "nav.home", label: "الرئيسية" },
      { path: "nav.about", label: "عنّا" },
      { path: "nav.services", label: "الخدمات" },
      { path: "nav.work", label: "الأعمال" },
      { path: "nav.team", label: "الفريق" },
      { path: "nav.history", label: "قصتنا" },
      { path: "nav.contact", label: "تواصل" },
      { path: "nav.switchTo", label: "زر تغيير اللغة" },
      { path: "cta.brief", label: "زر ابعت الموجز" },
      { path: "cta.whatsapp", label: "زر واتساب" },
      { path: "cta.viewWork", label: "زر شوف الشغل" },
      { path: "cta.viewServices", label: "زر كل الخدمات" },
      { path: "cta.viewTeam", label: "زر شوف الفريق" },
      { path: "cta.viewHistory", label: "زر اقرأ القصة" },
    ],
  },
  {
    id: "footer",
    label: "أسفل الموقع",
    fields: [
      { path: "footer.tagline", label: "السطر تحت الاسم" },
      { path: "footer.house", label: "وصف قصير", area: true },
      { path: "footer.pages", label: "عنوان قائمة الصفحات" },
      { path: "footer.studio", label: "عنوان قائمة الاستوديو" },
      { path: "footer.nights", label: "عنوان قائمة الليالي" },
      { path: "footer.talk", label: "عنوان قائمة التواصل" },
      { path: "footer.social", label: "عنوان السوشيال" },
      { path: "footer.reels", label: "عنوان الريلز" },
      { path: "footer.reelsKicker", label: "كلمة صغيرة فوق الريلز" },
      { path: "footer.reelsLead", label: "كلام تحت الريلز", area: true },
      { path: "footer.onInstagram", label: "زر إنستجرام" },
      { path: "footer.instagram", label: "إنستجرام" },
      { path: "footer.linkedin", label: "لينكدإن" },
      { path: "footer.facebook", label: "فيسبوك" },
      { path: "footer.tiktok", label: "تيك توك" },
      { path: "footer.youtube", label: "يوتيوب" },
      { path: "footer.rights", label: "سطر الحقوق" },
      { path: "footer.sampleReel", label: "كلمة عيّنة على الريلز", extra: true },
      { path: "footer.sample", label: "ملاحظة العيّنات", area: true, extra: true },
    ],
  },
  {
    id: "tech",
    label: "تفاصيل زيادة",
    extra: true,
    hint: "مش محتاج تلمس دي إلا لو في حاجة باينة غلط.",
    fields: [
      { path: "nav.skip", label: "تخطي إلى المحتوى" },
      { path: "nav.openMenu", label: "فتح القائمة" },
      { path: "nav.closeMenu", label: "إغلاق القائمة" },
      { path: "nav.useLight", label: "الوضع الفاتح" },
      { path: "nav.useDark", label: "الوضع الغامق" },
    ],
  },
];

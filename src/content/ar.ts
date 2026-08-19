import type { Service, WorkItem, TeamMember, HistoryBeat } from "./en";

export const services: Service[] = [
  { id: "events", title: "إيفنتس", body: "الليلة اللي الشركة بتعملها لموظفينها — بعقل إنتاج واحد." },
  { id: "exhibitions", title: "حفلات سنوية", body: "نهاية السنة والتجمعات — القاعة اللي الشركة كلها تمشي فيها." },
  { id: "booths", title: "تيم دايز", body: "أوفسايت ويوم للفريق: مسار واضح، وظهر يشتغل، ومكان للحديث." },
  { id: "conference", title: "كيك أوف", body: "تاون هول وكيك أوف ومؤتمرات داخلية يخلّوا البرنامج يتنفس." },
  { id: "management", title: "إدارة الإيفنت", body: "جدول العرض والمورّدين واللوجستيات الهادية اللي الموظف مش بيشوفها." },
  { id: "hospitality", title: "ضيافة", body: "حركة العشا والاستراحات والوقفة بين الكلام." },
  { id: "production", title: "إنتاج", body: "إدارة العرض والإشارات، وليلة تمشي في وقتها." },
  { id: "stage", title: "مسرح", body: "منصات وخطوط نظر تخدم المتحدث — والناس في القاعة." },
  { id: "av", title: "صوت وصورة", body: "صوت وصورة يفضلوا واضحين في قاعة صعبة." },
  { id: "led", title: "شاشات LED", body: "حيطان نور بتستخدم بقصد — مش كخلفية رخيصة." },
  { id: "lighting", title: "إضاءة", body: "الوجوه أولًا، بعدين المعمارية. اللون قرار." },
  { id: "fabrication", title: "تصنيع", body: "بتتبنى في الورشة، بتتركّب عندكم — زي ما الرسم وعد." },
  { id: "installation", title: "تركيب", body: "دخول في الليل من غير دراما. فك الصبح من غير بقايا." },
  { id: "projects", title: "إدارة المشروعات", body: "مالك واحد للجدول والميزانية وآخر تعديل قبل الأبواب." },
  { id: "structure", title: "هياكل", body: "تراس وإطارات مسرح والعظم اللي التصميم يتعلّق عليه." },
  { id: "printing", title: "طباعة", body: "جرافيكس تتحمّل التركيب والحرارة والإضاءة وألف موبايل." },
  { id: "signage", title: "لافتات", body: "إرشاد يوصل الناس للقاعة اللي قصدوها." },
  { id: "branding", title: "هوية", body: "هويتكم مطبّقة — مش متعاد اختراعها لليلة واحدة." },
  { id: "logistics", title: "لوجستيات", body: "المسار من المخزن للقاعة، متظبط على البوابة." },
  { id: "transport", title: "نقل", body: "فريق وبضاعة وعربية تخلي ميعاد النداء صادق." },
  { id: "warehouse", title: "مخزن", body: "تحضير برّه الموقع عشان القاعة تفضل قاعة، مش مخزن." },
  { id: "packaging", title: "تغليف", body: "نحمي البناء عشان يوصل زي ما اتصمم." },
  { id: "registration", title: "تسجيل", body: "بادجات وطوابير من غير ما تبقى هي الانطباع الأول." },
  { id: "maintenance", title: "صيانة", body: "إصلاح في الموقع عشان قطعة سايبة متعملش الحكاية." },
];

export const work: WorkItem[] = [
  { id: "w1", title: "كيك أوف داخلي", category: "كيك أوف", venue: "قاعة", tone: "pink", image: "/media/work/w1.jpg", alt: "عيّنة: قاعة لكيك أوف شركة" },
  { id: "w2", title: "تاون هول", category: "داخلي", venue: "قاعة", tone: "green", image: "/media/work/w2.jpg", alt: "عيّنة: موظفين في قاعة" },
  { id: "w3", title: "ليلة جوائز", category: "جوائز", venue: "مسرح", tone: "ink", image: "/media/work/w3.jpg", alt: "عيّنة: إضاءة مسرح في ليلة جوائز" },
  { id: "w4", title: "تيم داي", category: "تيم داي", venue: "أوفسايت", tone: "green", image: "/media/work/w4.jpg", alt: "عيّنة: يوم للفريق" },
  { id: "w5", title: "عشاء الشركة", category: "ضيافة", venue: "عشاء", tone: "pink", image: "/media/work/w5.jpg", alt: "عيّنة: عشاء شركة" },
  { id: "w6", title: "مؤتمر داخلي", category: "كيك أوف", venue: "قاعة", tone: "ink", image: "/media/work/w6.jpg", alt: "عيّنة: قاعة مؤتمر داخلي" },
  { id: "w7", title: "جلسة برنامج", category: "داخلي", venue: "جلسة", tone: "green", image: "/media/work/w7.jpg", alt: "عيّنة: جلسة داخلية" },
  { id: "w8", title: "حفلة سنوية", category: "حفلة", venue: "ضيافة", tone: "pink", image: "/media/work/w8.jpg", alt: "عيّنة: ترابيزات حفلة سنوية" },
];

export const featuredWorkIds = ["w3", "w2", "w8"] as const;

export const team: TeamMember[] = [
  { id: "t1", role: "إنتاج", focus: "إدارة العرض، الإشارات، ليلة الشركة", tone: "pink", image: "/media/team/t1.jpg", alt: "عيّنة بورتريه: إنتاج" },
  { id: "t2", role: "تصميم", focus: "الفراغ، الجرافيك، مسار الناس", tone: "green", image: "/media/team/t2.jpg", alt: "عيّنة بورتريه: تصميم" },
  { id: "t3", role: "تصنيع", focus: "من الورشة للأرض، زي الرسم", tone: "ink", image: "/media/team/t3.jpg", alt: "عيّنة بورتريه: تصنيع" },
  { id: "t4", role: "صوت وصورة", focus: "صوت، صورة، شاشات، إضاءة", tone: "pink", image: "/media/team/t4.jpg", alt: "عيّنة بورتريه: صوت وصورة" },
  { id: "t5", role: "لوجستيات", focus: "الدخول، النقل، الفك", tone: "green", image: "/media/team/t5.jpg", alt: "عيّنة بورتريه: لوجستيات" },
  { id: "t6", role: "حسابات", focus: "الموجز، العميل، الساعة", tone: "ink", image: "/media/team/t6.jpg", alt: "عيّنة بورتريه: حسابات" },
];

export const history: HistoryBeat[] = [
  {
    id: "h1",
    index: "01",
    title: "الموجز دخل الأول.",
    body: "حفلة سنوية، تيم داي، كيك أوف. قعدنا مع الناس والقاعة قبل ما حد يرسم حيطة.",
    image: "/media/history/h1.jpg",
    alt: "عيّنة: اجتماع موجز حول ترابيزة",
  },
  {
    id: "h2",
    index: "02",
    title: "بعدين الورشة اشتغلت.",
    body: "اللي الرسم وعد به اتعمل — مش ديكور، قاعة لازم تشيل الشركة ليلة كاملة.",
    image: "/media/history/h2.jpg",
    alt: "عيّنة: أدوات على بنش الورشة",
  },
  {
    id: "h3",
    index: "03",
    title: "الإنتاج قعد في نفس البيت.",
    body: "تصميم، تصنيع، صوت وصورة، ولوجستيات بطلوا تسليمات. مالك واحد. نداء واحد.",
    image: "/media/history/h3.jpg",
    alt: "عيّنة: غرفة تحكم إنتاج",
  },
  {
    id: "h4",
    index: "04",
    title: "الأرض علّمت الباقي.",
    body: "تركيب بالليل. الأبواب. آخر تعديل. فريق بيفضل لحد ما الفك ينضف.",
    image: "/media/history/h4.jpg",
    alt: "عيّنة: جمهور تحت إضاءة المسرح",
  },
  {
    id: "h5",
    index: "05",
    title: "نفس الشغل لسه.",
    body: "Keep the event ON. من أول حديث للقاعة الفاضية.",
    image: "/media/history/h5.jpg",
    alt: "عيّنة: قاعة فاضية بعد الليلة",
  },
];


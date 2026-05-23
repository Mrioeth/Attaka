import { Project, BlogPost, Tender } from './types';

export const projectsData: Project[] = [
  {
    id: "3rd-ring",
    titleEn: "The Third Ring Road Development",
    titleAr: "مشروع الطريق الدائري الثالث",
    locationEn: "Tripoli, Libya",
    locationAr: "طرابلس، ليبيا",
    type: "grid",
    status: "ongoing",
    coords: { x: 38, y: 15 }, // positions on custom map
    specs: {
      kilometers: 42,
      poles: 1120,
      co2Saved: 340 // LED efficiency vs old sodium lights
    },
    descriptionEn: "A high-visibility national grid project in partnership with GECOL and the Ministry of Transportation. Modernizing the multi-lane ring corridor with 18-meter reinforced high-mast structures, automated twilight sensors, and double-arm LED hubs engineered for intense atmospheric humidity and coastal winds.",
    descriptionAr: "مشروع وطني هام ومستمر بالشراكة مع الشركة العامة للكهرباء (GECOL) ووزارة المواصلات لتطوير الطريق الدائري الثالث بالكامل. يتم تركيب هياكل أعمدة مرتفعة بارتفاع 18 متراً مجهزة بمصابيح LED ثنائية الأذرع وحساسات إعتام آلية صُممت للصمود أمام الرياح الساحلية الشديدة والرطوبة المستمرة.",
    beforeImg: "sodium",
    afterImg: "led",
    image: "/src/assets/images/libya_highway_lighting_1779468396076.png"
  },
  {
    id: "coastal-solar",
    titleEn: "Coastal Highway Solar Corridor Segment",
    titleAr: "ممر الإنارة الشمسية للطريق الساحلي السريع",
    locationEn: "Tripoli to Misrata Corridor",
    locationAr: "ممر الطريق الساحلي الرابط بين طرابلس ومصراتة",
    type: "solar",
    status: "completed",
    coords: { x: 52, y: 17 },
    specs: {
      kilometers: 165,
      poles: 3450,
      co2Saved: 4890
    },
    descriptionEn: "libya's largest single off-grid solar road program. Installed individual self-cleaning active PV solar poles structured with deep-gel lithium battery vault attachments. Supplying continuous 120lm/W illumination that bypasses grid load and provides safe traffic flow during critical summer power shortages.",
    descriptionAr: "أكبر مشروع إنارة شمسية مستقل بالمملكة الإقليمية لقطاع الطرق الليبية الساحلية. يتضمن تركيب أعمدة إنارة شمسية ذكية ذاتية التنظيف ومقاومة للغبار مجهزة بغرف بطاريات ليثيوم مدفونة ومؤمنة، لتقديم إنارة مستمرة بقوة 120 لومن لكل واط دون الاعتماد على الشبكة المتهالكة.",
    beforeImg: "sodium",
    afterImg: "solar",
    image: "/src/assets/images/solar_street_pole_1779468414277.png"
  },
  {
    id: "benghazi-bypass",
    titleEn: "Benghazi Smart Ring Bypass Bypass",
    titleAr: "طريق بنغازي الدائري الالتفافي الشمالي",
    locationEn: "Benghazi City North",
    locationAr: "شمال مدينة بنغازي، ليبيا",
    type: "grid",
    status: "completed",
    coords: { x: 84, y: 19 },
    specs: {
      kilometers: 78,
      poles: 1980,
      co2Saved: 850
    },
    descriptionEn: "Comprehensive layout mapping and grid installation. Features integrated high-power copper armor cabling, lightning protection caps, and micro-controller communication boxes that feed active diagnostic reports back to the Benghazi regional maintenance station.",
    descriptionAr: "تصميم وتنفيذ متكامل للبنية الأساسية لشبكة إنارة ممر الالتفاف الشمالي ببنغازي. يشمل المشروع مد الكابلات النحاسية المدرعة المقاومة للأحمال العالية، ومظلات الحماية من الصواعق، وخزانات الكهرو-ميكانيك المزودة بمعالجات صغيرة لإرسال تقارير الأعطال الذاتية الفورية.",
    beforeImg: "sodium",
    afterImg: "led",
    image: "/src/assets/images/high_mast_grid_poles_1779468435475.png"
  },
  {
    id: "sebha-desert",
    titleEn: "Sebha Remote Solar Green Highway",
    titleAr: "ممر سبها الصحراوي الأخضر المستقل",
    locationEn: "Sebha Southern Sector",
    locationAr: "القطاع الجنوبي بمدينة سبها",
    type: "solar",
    status: "completed",
    coords: { x: 48, y: 58 },
    specs: {
      kilometers: 90,
      poles: 2100,
      co2Saved: 3220
    },
    descriptionEn: "Highly resilient solar pole grid created for harsh desert environments with rapid temperature changes. The smart lithium battery units are buried underground at optimized depths to avoid high temperature degradation, delivering flawless 12-hour active operations despite extreme Sahara heat waves.",
    descriptionAr: "مشروع إنارة ريادي فائق التحمل بالصحراء الكبرى لمواجهة التغيرات الشديدة في درجات الحرارة. تم دفن وحدات بطاريات الليثيوم على أعماق مدروسة ومكيفة تحت الرمال لتفادي درجات الحرارة القياسية، لتقديم إنارة تامة لمدة 12 ساعة متواصلة ومكافحة أعطال قطع التيار بالمنطقة الجنوبية.",
    beforeImg: "sodium",
    afterImg: "solar",
    image: "/src/assets/images/sebha_desert_solar_1779468456252.png"
  },
  {
    id: "misrata-port",
    titleEn: "Misrata Industrial Port Approach Road",
    titleAr: "طريق مدخل ميناء مصراتة الصناعي والمنطقة الحرة",
    locationEn: "Misrata, Libya",
    locationAr: "مصراتة، ليبيا",
    type: "grid",
    status: "completed",
    coords: { x: 59, y: 22 },
    specs: {
      kilometers: 35,
      poles: 840,
      co2Saved: 290
    },
    descriptionEn: "High-mast industrial lighting grid. Provides specialized anti-corrosive galvanized steel structures and highly focused anti-glare high-lumen luminaires designed to sustain heavy freight truck vibrations and sea spray elements.",
    descriptionAr: "مشروع تصميم وتثبيت أبراج عالية مخصصة للشوارع الساحلية والمناطق الصناعية الحرة بمصراتة. يركز المشروع على هياكل الأعمدة المجلفنة المقاومة للتآكل والأملاح البحرية، ومصابيح عالية الشدة ومضادة للتوهج لتحمل الاهتزاز المستمر للشاحنات الثقيلة.",
    beforeImg: "sodium",
    afterImg: "led",
    image: "/src/assets/images/high_mast_grid_poles_1779468435475.png"
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "future-solar-libya",
    titleEn: "The Future of Solar Energy in Libya: Overcoming Grid Shortages",
    titleAr: "مستقبل الطاقة الشمسية في ليبيا: القضاء على عجز الشبكة العامة",
    date: "2026-04-12",
    categoryEn: "Renewable Tech",
    categoryAr: "تكنولوجيا مستدامة",
    summaryEn: "How self-contained lithium photovoltaic street lighting poles offer Libya a strategic, local step towards zero grid dependency.",
    summaryAr: "كيف تقدم أعمدة الإنارة الكهروضوئية الذكية والمستقلة بالكامل لليبيا بديلاً إستراتيجياً فورياً للحد من الانقطاعات والأحمال الزائدة.",
    contentEn: "Libya boasts some of the highest solar irradiance levels in North Africa, exceeding 2,200 kWh per square meter annually. While constructing giant centralized solar farms remains a long-term goal, local off-grid solar street lights represent an immediate, decentralized deployment that requires zero expensive high-voltage substations or cable layouts.\n\nAt Attaka, our designs focus on thermal-resilient LiFePO4 battery modules equipped with smart ambient control to optimize run times dynamically according to seasons, bringing reliable, safe public spaces to Libyan streets without drawing a single watt from the strained national thermal generators.",
    contentAr: "تتمتع ليبيا بأعلى معدلات الإشعاع الكهروضوئي في شمال أفريقيا بأكثر من 2200 كيلوواط/ساعة للمتر المربع سنوياً. في حين تظل المزارع الشمسية العملاقة مشروعاً متوسط الأجل، فإن تركيب أعمدة السولار المستقلة يمثل الحل اللامركزي الفوري والأكثر كفاءة لحماية القرى والمدن.\n\nتركز تصميمات أعمدة شركة الطاقة على دمج بطاريات الليثيوم المعزولة كيميائياً وحرارياً وتبريدها تحت الأرض، فضلاً عن إضافة حساسات ومتحكمات ذكية لتعديل السطوع تلقائياً وفقاً للرصيف ومحيط الممر، مما يوفر طرقاً مضاءة بسلام دون تطلب كيلوواط واحد من المحطات العامة.",
    readTimeEn: "4 min",
    readTimeAr: "٤ دقائق"
  },
  {
    id: "smart-lighting-cost",
    titleEn: "Reducing Municipal Costs with Smart Solid-State LED Engineering",
    titleAr: "كيف تساهم تقنيات LED الصلبة في خفض ميزانيات البلديات بليبيا",
    date: "2026-05-18",
    categoryEn: "Infrastructure Efficiency",
    categoryAr: "كفاءة البنية الأساسية",
    summaryEn: "A technical evaluation of mercury-sodium retrofitting and how modern light emission scales down long-term maintenance budgets.",
    summaryAr: "دراسة هندسية ومقارنة لتحديث مصابيح الزئبق والصوديوم لتقنيات LED الصلبة، والديناميكية الاقتصادية لجرود الصيانة.",
    contentEn: "Municipal entities throughout Libya are challenged by the short lifespans of older metal-halide and high-pressure sodium streetlights, which routinely fail under dusty air and voltage spikes. Retrofitting these structures with heavy-duty solid-state LEDs reduces direct energy consumption by up to 60%.\n\nMore importantly, LED components last 5x longer, drastically eliminating the frequency of high-altitude bucket-truck dispatches for simple bulb replacements—saving fuel, engineering labor, and equipment strain.",
    contentAr: "تواجه البلديات في ليبيا معاناة متكررة في الاستهلاك المستمر لأعمدة صوديوم كبريتية سريعة التلف جراء التخبط في الجهود الكهربائية وهبوب الرمال. استبدال هذه المصابيح بتقنية Solid-state LED يقلل الاستهلاك المباشر للطاقة بنسبة تتجاوز 60%.\n\nالأهم من ذلك، أن عمر مصابيح LED الافتراضي الطويل يلغي تماماً الحاجة لتحريك رافعات الصيانة العالية لتغيير اللمبات بشكل متكرر، موفراً نفقات الوقود وأجور التشغيل لفرق الصيانة والبلديات.",
    readTimeEn: "5 min",
    readTimeAr: "٥ دقائق"
  }
];

export const tendersData: Tender[] = [
  {
    id: "tnd-098",
    titleEn: "Procurement B2B Bid: High-Volt Armor Copper Cabling Supply",
    titleAr: "عطاء توريد: مشروع كابلات النحاس المدرعة عازلة الرطوبة",
    type: "tender",
    departmentEn: "Grid Distribution Dept",
    departmentAr: "قسم شبكات التوزيع والجهد العالي",
    deadlineEn: "2026-06-30",
    deadlineAr: "30 يونيو 2026",
    locationEn: "Misrata Hub Warehouse",
    locationAr: "مستودع مصراتة المركزي",
    requirementsEn: [
      "Compliance with GECOL Standards Standard 202-V or equivalent CENELEC specifications.",
      "Provision of testing certifications from certified European laboratories (ISO/KEMA).",
      "Ability to ship and unload 45,000 meters in three scheduled batches starting July 2026."
    ],
    requirementsAr: [
      "مطابقة تامة لمواصفات الشركة العامة للكهرباء (GECOL) معيار 202-V أو ما يعادلها أوروبياً.",
      "تقديم شهادات الفحص والاختبار المستقلة من معامل أوروبية معتمدة (مثل KEMA/ISO).",
      "القدرة الاستيعابية لشحن وتفريغ 45,000 متر طولي على ثلاث دفعات مجدولة انطلاقاً من يوليو 2026."
    ]
  },
  {
    id: "car-041",
    titleEn: "Senior Smart Grid Integration Engineer",
    titleAr: "مهندس أول تكامل الشبكات الذكية والمتحكمات الشمسية",
    type: "career",
    departmentEn: "Renewable Innovation Team",
    departmentAr: "فريق أبحاث وابتكار الطاقة المتجددة",
    deadlineEn: "2026-06-15",
    deadlineAr: "15 يونيو 2026",
    locationEn: "Tripoli Tech Office",
    locationAr: "مكتب التقنية الرئيسي - طرابلس",
    requirementsEn: [
      "B.Sc. or Masters in Electrical Engineering or Renewable Technologies.",
      "Minimum 4 years field experience with industrial solar logic microcontrollers, charge controllers, and IoT remote interfaces.",
      "Fluent in English and technical Arabic, with deep understanding of Middle-East/North-African local grid challenges."
    ],
    requirementsAr: [
      "شهادة بكالوريوس أو ماجستير في الهندسة الكهربائية أو هندسة الطاقة المتجددة.",
      "خبرة ميدانية لا تقل عن 4 سنوات في برمجة وتركيب لوحات التحكم الشمسية الذكية وحسابات تفريغ البطاريات ونظم IoT.",
      "إتقان اللغتين العربية والإنجليزية التقنية وفهم عميق لطبيعة وتحديات الشبكة الليبية الساحلية والمستقلة."
    ]
  },
  {
    id: "tnd-102",
    titleEn: "Subcontractor Bid: Concrete Sub-Base Foundation Casting (800 Poles)",
    titleAr: "علاقات المقاولة الفرعية: صب القواعد الإسمنتية وتثبيت 800 عمود إنارة",
    type: "tender",
    departmentEn: "Infrastructure Construction Group",
    departmentAr: "إدارة الإنشاءات والمشروعات المدنية",
    deadlineEn: "2026-07-05",
    deadlineAr: "5 يوليو 2026",
    locationEn: "Sebha Southern Sector",
    locationAr: "القطاع والمدخل الجنوبي بسبها",
    requirementsEn: [
      "Registered civil works entity holding valid local municipal certificates and permits.",
      "Proven execution background of casting heavy industrial wind-resistant foundations (min 300 KN/m resisting).",
      "Providing detailed health and safety protocol matching international work directives."
    ],
    requirementsAr: [
      "شركة مقاولات وأعمال مدنية مسجلة وحاصلة على تراخيص وتصاريح بلدية محلية سارية المفعول.",
      "خبرة سابقة مثبتة في صب القواعد الإسمنتية الهيكلية للأعمدة الشاهقة المقاومة للرياح (قدرة صمود 300 KN/م كحد أدنى).",
      "تقديم دليل بروتوكول السلامة والصحة المهنية المطابق للمواصفات الدولية."
    ]
  }
];

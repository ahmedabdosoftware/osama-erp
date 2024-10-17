import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // start with normal mode
    darkMode: false,
    mood: "normal",

    // for website
    langNow: localStorage.getItem('ourLangauge') || 'En',
    mapbranche: "Jeddah",
    showHeader: true,
    lan: {
      Ar: {
        
        // boxProduct info "used"
        askByWats:"اطلب عبر الواتساب",
        detailsProduct:"التفاصيل",
        detailsOfProduct:"تفاصيل المنتج",
        relatedOfProduct:"شاهد ايضا",

        // nav section "used"
        home: "الرئيسية",
        about: "من نحن",
        service: "خداماتنا",
        contact: "تواصل معنا ",

        // background section "used"
        textBackground: " نبتكر حلولًا مخصصة لمشاريع الديكور الأنيقة" ,
        textBackgroundDown: ".نحن ملتزمون بتقديم حلول تصميم أنيقة ومخصصة لمشاريع الديكور، مع التركيز على بناء علاقات دائمة ومتميزة مع عملائنا الكرام",
        lastestProjects:"الاطلاع على اخر الاعمال",
        branches: "الفروع",
       // service: "الخدمات",
        catalog:"كاتلوج",
        serviceUnder: ": نمتلك خبرات كبيرة فى عدة خدمات ",
        catalogUnder:"يمكنك الاطلاع على الكاتلوج وعمل فلترة للخدمة التى تهتم بها",
        
        // unused data 
        placeholder:"ادخل رقم الطلب الخاص بك ",
        packageDel: "تم تسليم الطرد",
        HappyClinnts: "عملاء سعداء",
        ReviewStar: "تقييمات 5 نجوم",
        track: "تتبع الشحنة ",

        // about section "used"
        aboutContent: ".نحن شركة متخصصة في مجال الديكورات، نقدم حلولاً مبتكرة وفريدة من نوعها لتلبية احتياجات العملاء من الكرانيش وبديل الرخام بفضل فريق عمل متميز يلتزم بأعلى معايير الجودة",
        message: "رسالتنا",
        ourMessageContent: "هدف شركتنا هو أن تكون الرائدة في مجال الديكور الداخلي والخارجي وتقديم تصاميم متميزة تضيف قيمة وجمال لكل مشروع",
        through: "من خلالنا",
        throughContent: " تقديم خدمات تصميم وتنفيذ تغطي معظم أنحاء الجمهورية وتتميز بأعلى مستويات الجودة- الاستثمار في موظفينا ومنحهم الصلاحيات التي تساعدهم على أداء مهامهم بكفاءة وإبداع",
        Quality: "سياسة الجودة",
        QualityContent: "تلتزم إدارتنا بتقديم خدمات تتميز بأعلى مستويات الجودة لعملائنا، مع السعي الدائم لتجاوز توقعاتهم من خلال تحسين مستمر في الأداء وتقديم خدمات مهنية وفعالة من حيث التكلفة باستخدام أحدث الأساليب",
        means: "وسائل",
        meansContent: "الجودة في شركتنا هي مسؤولية شخصية لكل موظف. لضمان الحفاظ على مستويات الجودة والأداء، نوفر كافة الوسائل اللازمة والتدريب المستمر والدعم. هذا يساهم في خلق بيئة عمل مثالية تحفز الموظفين على الإبداع والتفاني. قيمنا تشمل: المبادرة، الجودة، الشفافية، التعاون، والولاء",
      
        // Commitments section "used"
    Commitments: "التزاماتنا",
    CommitmentsContent: "نحن ملتزمون بتقديم أفضل الخدمات في مجال الديكور، ونضمن رضا عملائنا من خلال الالتزام بأعلى معايير الجودة والاحترافية. عملاؤنا هم محور اهتمامنا، ونسعى دائماً لتقديم حلول مخصصة تلبي احتياجاتهم الفريدة.",
    tow: "هدفنا",
    towContent: "نسعى لبناء علاقات طويلة الأمد مع عملائنا من خلال تقديم خدمات متميزة تلبي احتياجاتهم وتفوق توقعاتهم",
    three: "معايير الجودة",
    threeContent: "نؤمن بأن الجودة هي مفتاح النجاح، لذلك نحرص على اتباع أعلى معايير الجودة في جميع مراحل العمل",
    four: "الابتكار",
    fourContent: "نسعى دائماً لتقديم حلول مبتكرة تلبي احتياجات العملاء وتتماشى مع أحدث الاتجاهات في مجال الديكور",
    five: "التواصل المستمر",
    fiveContent: "نحرص على التواصل المستمر مع عملائنا لضمان تحقيق رؤيتهم وتصميماتهم بأفضل شكل ممكن",
    six: "خدمات ما بعد البيع",
    sixContent: "نحن ملتزمون بتقديم خدمات ما بعد البيع لدعم عملائنا وضمان رضاهم التام عن خدماتنا",
    siven: "الالتزام بالمواعيد",
    sivenContent: "ندرك أهمية الالتزام بالمواعيد النهائية ونسعى لتحقيق ذلك في جميع مشاريعنا",


        // comman between Commitments and about section "used"
        seeMore: "المزيد",
        seeLess: "اقل",

        // how To Send Your Order "used"
        howToSendYourOrder: "كيف تقوم بارسال طلبك",
        placeOrder: "قم بتقديم الطلب",
        orderDescription: "اطلب شحنتك لتسليمها إلى أي مكان بأمان وبسرعة",
        waitForArrival: "انتظر الوصول",
        arrivalDescription: "انتظر وصول شحنتك في الوقت المحدد بكل هدوء وسلام",
        finishAndRate: "انهاء الطلب وتقييمنا",
        finishAndRateDescription: "تصل شحنتك بأمان إلى الموقع المحدد دون تأخير",

  
        //reviews  "used" but we wanna change data
        reviews: "التقييمات",
        review1: "شكرًا لكم راسيل على هذه الخدمة الرائعة",
        review1Author: "فارس كنان",
        review1Role: "عميل",
        review1Text: "شركة محترمة ومنظمين في عملهم، نأمل أن يكون هذا ليس آخر تعامل معكم. حياكم الله",
        review2: "العامل جدا خدوم و الشركة كتير منظمة ",
        review2Author: "محسن راجح",
        review2Role: "عميل",
        review3: " العامل في التوصيل محترم للغاية. هذه الشركة منظمة وآمنة",
        review3Author: "شذى حمد",
        review3Role: "عميل",
        review4:"شركة محترمة تلتزم بالمواعيد ولن يكون اخر تعامل ان شاء الله ",
        review4Author:"محمد سعيد",
        review4Role: "عميل",
        review5: "تعامل راقى وشركة محترمة للامانة",
        review5Role: "Client",
        review5Author: "ابو نواف",
        review6: "حياكم الله على هذا التنظيم ",
        review6Role: "عميل",
        review6Author: " صادق احمد",

        // footer info "used" but we wanna change the data
        contactUs: "التواصل معنا",
        contactUsText: "اتصل بنا",
        contactUsEmail: "Example@gmail.com",
        contactUsPhone: "8002480022",
        quickLinks: "روابط سريعة",
        quickLinksHome: "الرئيسية",
        quickLinksServices: "الخدمات",
        quickLinksAbout: "حول",
        quickLinksBranches: "الفروع",
        location: "الموقع",
        locationMainCenter: "المركز الرئيسي: جدة - منطقة المهجر",
        locationHours: "07:00 صباحًا - 03:00 مساءً",
        copyright: "RASIL لتكنولوجيا المعلومات — 2024 ©",

        // branchesInfo "used" but we wanna change the data
        branchesInfo: "الفروع",
        Jeddah: {
          name: "جــــدة",
          phone: "0569286392",
          phone1: "0569286398",
          phone2: "",
          map: "https://goo.gl/maps/5FZECFMtfuhKsXCA8",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا",
        },
        AlQunfudhah: {
          name: "القنفــــذة",
          phone: "0569286258",
          phone1: "0569286264",
          phone2: "",
          map: "https://goo.gl/maps/JwaWq66bxJygXyPg7",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        Samtah: {
          name: "صـــامــطة",
          phone: "0569286405",
          phone1: "0569286435",
          phone2: "",
          map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        AhadAlMasarihah: {
          name: "أحد المسارحة/الحصمة",
          phone: "0569286408",
          phone1: "",
          phone2: "",
          map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        BishaDarab: {
          name: "بيــش/الــدرب",
          phone: "0569286462",
          phone1: "",
          phone2: "",
          map: "https://goo.gl/maps/neDgiXi9mjJqqGRy9",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        Jizan: {
          name: "جازان",
          phone: "0569286332",
          phone1: "",
          phone2: "",
          map: "https://goo.gl/maps/w1j2quVhijWYhpvJA",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        Sabya: {
          name: "صبيــــا",
          phone: "0569286309",
          phone1: "0569286367",
          phone2: "0569286475",
          map: "https://goo.gl/maps/neDgiXi9mjJqqGRy9",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        AbuArish: {
          name: "أبو عريـــش",
          phone: "0569286402",
          phone1: "0569286458",
          phone2: "0569286459",
          map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        },
        SakakaArarDumatalJandal: {
          name: "سكاكا/عرعر/دومة الجندل",
          phone: "0534758525",
          phone1: "0534758527",
          phone2: "0534758579",
          map: "https://goo.gl/maps/2qPWiUqyXUwvq6Qf6",
          address: "أضف عنوان هنا",
          schedule: "أضف جدول زمني هنا"
        }

        
      },
      En: {
        // boxProduct info "used"
        detailsProduct:"details",
        askByWats:"ask by whats",
        detailsOfProduct:"Product Details",
        relatedOfProduct:"related products",

        
        // unused data
        catalog:"catalog",
        placeholder:"enter your order for search",
        packageDel: "package delivered",
        HappyClinnts: "Happy clients",
        ReviewStar: "5 stars Reviews",
        track: "Track Order",
        
        // nav section "used"
        home: "home",
        about: "about",
        service: "service",
        contact: " contact us",

        // background section "used"
        textBackground: "Creating tailored solutions for elegant décor projects.",
        textBackgroundDown: "We’re dedicated to delivering elegant design solutions and building lasting customer relationships.",
        lastestProjects:"Check out our latest projects",
        branches: "branches",
        //service: "service",
        serviceUnder: " we have a great export in multi service :",
        catalogUnder: " you can see our catalog and make filtring for your interest :",
        
        // about section "used"
        aboutContent: "We are a specialized company in décor, providing innovative and unique solutions to meet the needs of our customers in cornices and marble alternatives through a dedicated team committed to the highest quality standards.",
        message: "Our Message",
        ourMessageContent: "Our goal is to be the leader in interior and exterior décor, offering distinguished designs that add value and beauty to every project.",
        through: "Through Us",
        throughContent: "1- Providing design and implementation services that cover most regions of the Republic with the highest quality standards.\n2- Investing in our employees and empowering them to perform their duties with efficiency and creativity.",
        Quality: "Quality Policy",
        QualityContent: "Our management is fully committed to providing services characterized by the highest quality standards to our clients, continually striving to exceed their expectations through continuous improvement in performance and offering professional and cost-effective services using the latest methods.",
        means: "Means",
        meansContent: "Quality in our company is a personal responsibility for every employee. To ensure maintaining quality and performance levels, we provide all necessary means, continuous training, and support. This contributes to creating an ideal work environment that motivates employees to be creative and dedicated. Our values include: Initiative, Quality, Transparency, Cooperation, and Loyalty.",
        
        // Commitments section "used"
        Commitments: "Our Commitments",
        CommitmentsContent: "We are committed to providing the best services in the field of décor, ensuring customer satisfaction through adherence to the highest standards of quality and professionalism. Our clients are our top priority, and we always strive to deliver customized solutions that meet their unique needs.",
        tow: "Our Goal",
        towContent: "We aim to build long-term relationships with our clients by providing exceptional services that meet their needs and exceed their expectations.",
        three: "Quality Standards",
        threeContent: "We believe that quality is the key to success, and therefore we adhere to the highest quality standards at all stages of our work.",
        four: "Innovation",
        fourContent: "We always strive to provide innovative solutions that meet the needs of our clients and align with the latest trends in the décor field.",
        five: "Continuous Communication",
        fiveContent: "We ensure continuous communication with our clients to realize their vision and designs in the best possible way.",
        six: "After-Sales Services",
        sixContent: "We are committed to providing after-sales services to support our clients and ensure their complete satisfaction with our services.",
        siven: "Timely Delivery",
        sivenContent: "We recognize the importance of meeting deadlines and strive to achieve this in all our projects.",
        
        // comman between Commitments and about section "used"
        seeMore: "see more",
        seeLess: "see less",

        // how To Send Your Order section "used"
        howToSendYourOrder: "how to send your order",
        placeOrder: "Place an order",
        orderDescription: "Request your shipment to be delivered to anywhere safely and faster.",
        waitForArrival: "Wait for arrival",
        arrivalDescription: "Wait for your shipment to arrive on time with complete peace of mind.",
        finishAndRate: "Finish and rate us",
        finishAndRateDescription: "Your shipment arrives safely at the specified location without delay.",
        
        
       // branches section "used" but we wanna change the data  
        branchesInfo: "BRANCHES",
       Jeddah: {
        name: "Jeddah",
        phone: "0569286392",
        phone1: "0569286398",
        phone2: "",
        map: "https://goo.gl/maps/5FZECFMtfuhKsXCA8",
        address: "add your address here",
        schedule: "add your time table here",
      },
      AlQunfudhah: {
        name: "Al Qunfudhah",
        phone: "0569286258",
        phone1: "0569286264",
        phone2: "",
        map: "https://goo.gl/maps/JwaWq66bxJygXyPg7",
        address: "add your address here",
        schedule: "add your time table here",
       
      },
      Samtah: {
        name: "Samtah",
        phone: "0569286405",
        phone1: "0569286435",
        phone2: "",
        map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
        address: "add your address here",
        schedule: "add your time table here",
       
      },
      AhadAlMasarihah: {
        name: "Ahad Al-Masarihah",
        phone: "0569286408",
        phone1: "",
        phone2: "",
        map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
        address: "add your address here",
        schedule: "add your time table here",
      },
      BishaDarab: {
        name: "Bisha/Darab",
        phone: "0569286462",
        phone1: "",
        phone2: "",
        map: "https://goo.gl/maps/neDgiXi9mjJqqGRy9",
        address: "add your address here",
        schedule: "add your time table here",
      },
      Jizan: {
        name: "Jizan",
        phone: "0569286332",
        phone1: "",
        phone2: "",
        map: "https://goo.gl/maps/w1j2quVhijWYhpvJA",
        address: "add your address here",
        schedule: "add your time table here",
      },
      Sabya: {
        name: "Sabya",
        phone: "0569286309",
        phone1: "0569286367",
        phone2: "0569286475",
        map: "https://goo.gl/maps/neDgiXi9mjJqqGRy9",
        address: "add your address here",
        schedule: "add your time table here",
      },
      AbuArish: {
        name: "Abu Arish",
        phone: "0569286402",
        phone1: "0569286458",
        phone2: "0569286459",
        map: "https://goo.gl/maps/h9JPNpchp6s8tYgs9",
        address: "add your address here",
        schedule: "add your time table here",
      },
      SakakaArarDumatalJandal: {
        name: "Sakaka/Arar/Dumat al-Jandal",
        phone: "0534758525",
        phone1: "0534758527",
        phone2: "0534758579",
        map: "https://goo.gl/maps/2qPWiUqyXUwvq6Qf6",
        address: "add your address here",
        schedule: "add your time table here",
      },

        // reviews section "used" but we wanna change the data  
        reviews: "REVIEWS",
        review1: "Thank you RASIL for this wonderful service.",
        review1Author: "Fares Kenan",
        review1Role: "Client",
        review1Text: "شركة محترمة ومنظمين في شغلهم ان شاء الله لن يكون اخر تعامل معكم حياكم الله.",
        review2: "The delivery worker is very respectable. This company is organized and safe.",
        review2Author: "Mohsen Raje",
        review2Role: "Client",
        review3: "The delivery worker is very respectable. This company is organized and safe",
        review3Role: "Client",
        review3Author: "Shaza Hamd",
        review4: "A respectable company that adheres to deadlines, and this will not be the last interaction, God willing",
        review4Role: "Client",
        review4Author: "mohamed said",
        review5: "Classy dealings and a respectable, honest company",
        review5Role: "Client",
        review5Author: "abu noaf",
        review6: "May God bless you for this organization",
        review6Role: "Client",
        review6Author: "sadik ahmed",

        // footer section "used" but we wanna change the data  
        contactUs: "CONTACT WITH US",
        contactUsText: "Contact us",
        contactUsEmail: "Example@gmail.com",
        contactUsPhone: "8002480022",
        quickLinks: "Quick links",
        quickLinksHome: "HOME",
        quickLinksServices: "SERVICES",
        quickLinksAbout: "ABOUT",
        quickLinksBranches: "BRANCHES",
        location: "Location",
        locationMainCenter: "Main center: Jeddah - Al Mahjar district",
        locationHours: "07:00 AM - 03:00 PM",
        copyright: "RASIL for information technology—2024 ©"
      }
    }
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (state.darkMode == true) {
        state.mood = "dark";
      }else {
        state.mood = "normal";
      }
    },

    // for website 
    changeTheLang(state, lang) {
      localStorage.setItem("ourLangauge", lang);
      state.langNow = lang;
    },
    changeMapbranche(state, bran) {
      //localStorage.setItem("branche", bran);
      state.mapbranche = bran;
    },

  },
  getters: {
    catchLang(state) {
      if (state.langNow === "En") {
        return state.lan.En;
      } else if (state.langNow === "Ar") {
        return state.lan.Ar;
      }
    },
    myLanguage(state) {
      if (state.langNow === "En") {
        return "En";
      } else if (state.langNow === "Ar") {
        return  "Ar";
      }
    },
  },
  actions: {},
  modules: {},
});

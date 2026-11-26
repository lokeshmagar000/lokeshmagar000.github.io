/* ==========================================================
   content.js — ALL the words, links and pictures of the site.
   ----------------------------------------------------------
   You only need to edit THIS file to change text, links or
   screenshots. Every text has two versions:
     en = English, ne = Nepali (नेपाली)
   A link that is null shows a "Coming soon" badge instead.
   ========================================================== */

export const SITE = {
  // Your profile photo. Put the file in images/profile/ and
  // write its path here, e.g. "images/profile/profile.jpg".
  // While it is null, a round "L" badge is shown instead.
  photo: "images/profile/profile.jpg",

  social: [
    { name: "Facebook",  url: "https://www.facebook.com/iamlokeshmagar" },
    { name: "Instagram", url: "https://www.instagram.com/iamlokeshmagar" },
    { name: "TikTok",    url: "https://www.tiktok.com/@lokeshmagar000" },
    { name: "GitHub",    url: "https://github.com/lokeshmagar000" },
  ],

  // Contact email shown on the site
  email: "contact@lokmagar.com.np",
};

/* ---------- Text for the whole page, in both languages ---------- */
export const TEXT = {
  en: {
    navHome: "Home", navProjects: "Projects", navAbout: "About", navContact: "Contact",
    name: "Lok Bahadur Roka Magar",
    tagline: "App Developer & AI Content Creator from Nepal",
    intro: "I build apps for Mac and Android, and create AI-powered fact videos in Nepali and English.",
    ctaProjects: "See my projects", ctaContact: "Contact me",
    projectsTitle: "Projects", projectsSub: "Things I design and build.",
    features: "Key features", getIt: "Get it on",
    live: "Live", comingSoon: "Coming soon", screenshotsSoon: "Screenshots coming soon",
    aboutTitle: "About me",
    // ✍️ YOUR BIO: replace this text with your own words.
    bio: "App developer and AI content creator from Nepal. I build fast, beautiful apps for Mac and Android, and make fact videos in Nepali and English. My goal is to build world-class apps from Nepal and share knowledge in my own language.",
    aboutFrom: "From Dang, Nepal 🇳🇵",
    findMe: "Find me online",
    contactTitle: "Let's talk", contactSub: "Have an idea or a question? Email me.",
    fName: "Name", fEmail: "Email", fMessage: "Message", fSend: "Send message",
    fSending: "Sending…", fSent: "Message sent ✓ I will reply soon.",
    fError: "Something went wrong. Please try again.",
    fInvalid: "Please fill in every field correctly.",
    fNotReady: "The contact form is not connected yet.",
    footer: "© 2026 Lok Bahadur Roka Magar",
    themeLabel: "Switch light / dark mode", menuLabel: "Open menu", closeLabel: "Close",
  },
  ne: {
    navHome: "गृहपृष्ठ", navProjects: "प्रोजेक्टहरू", navAbout: "मेरो बारेमा", navContact: "सम्पर्क",
    name: "लोक बहादुर रोका मगर",
    tagline: "नेपालका एप डेभलपर तथा एआई कन्टेन्ट क्रिएटर",
    intro: "म म्याक र एन्ड्रोइडका लागि एपहरू बनाउँछु, र नेपाली तथा अंग्रेजीमा एआईको सहायताले तथ्य भिडियोहरू सिर्जना गर्छु।",
    ctaProjects: "मेरा प्रोजेक्टहरू हेर्नुहोस्", ctaContact: "सम्पर्क गर्नुहोस्",
    projectsTitle: "प्रोजेक्टहरू", projectsSub: "मैले डिजाइन गरेर बनाएका कुराहरू।",
    features: "मुख्य विशेषताहरू", getIt: "डाउनलोड / हेर्नुहोस्",
    live: "लाइभ", comingSoon: "छिट्टै आउँदैछ", screenshotsSoon: "स्क्रिनसटहरू छिट्टै",
    aboutTitle: "मेरो बारेमा",
    // ✍️ तपाईंको परिचय: यो लेख आफ्नै शब्दमा बदल्नुहोस्।
    bio: "नेपालका एप डेभलपर तथा एआई कन्टेन्ट क्रिएटर। म म्याक र एन्ड्रोइडका लागि छिटो र सुन्दर एपहरू बनाउँछु, र नेपाली तथा अंग्रेजीमा तथ्य भिडियोहरू बनाउँछु। नेपालबाट विश्वस्तरीय एपहरू बनाउने र आफ्नै भाषामा ज्ञान बाँड्ने मेरो लक्ष्य हो।",
    aboutFrom: "दाङ, नेपालबाट 🇳🇵",
    findMe: "अनलाइनमा भेट्नुहोस्",
    contactTitle: "कुरा गरौँ", contactSub: "कुनै विचार वा प्रश्न छ? मलाई इमेल गर्नुहोस्।",
    fName: "नाम", fEmail: "इमेल", fMessage: "सन्देश", fSend: "सन्देश पठाउनुहोस्",
    fSending: "पठाउँदै…", fSent: "सन्देश पठाइयो ✓ म छिट्टै जवाफ दिनेछु।",
    fError: "केही गडबड भयो। फेरि प्रयास गर्नुहोस्।",
    fInvalid: "कृपया सबै ठाउँ सही रूपमा भर्नुहोस्।",
    fNotReady: "सम्पर्क फारम अझै जोडिएको छैन।",
    footer: "© 2026 लोक बहादुर रोका मगर",
    themeLabel: "लाइट / डार्क मोड बदल्नुहोस्", menuLabel: "मेनु खोल्नुहोस्", closeLabel: "बन्द गर्नुहोस्",
  },
};

/* ---------- Your three projects ----------
   screenshots: add your pictures to the project's folder, then
   list them here, e.g. ["images/rokaplayer/library.webp", ...].
   Keep each picture under 500 KB (WebP or JPG).               */
export const PROJECTS = [
  {
    id: "rokaplayer",
    name: "RokaPlayer",
    icon: "images/rokaplayer/icon.webp",
    accent: "#e5484d",
    tagline: { en: "Big movies. True HDR.", ne: "ठूला चलचित्र। साँचो HDR।" },
    desc: {
      en: "A native video player for Mac and Android, made for big, high-quality movies. The Android version can even play big files on phones without hardware support.",
      ne: "म्याक र एन्ड्रोइडका लागि बनेको नेटिभ भिडियो प्लेयर, ठूला र उच्च गुणस्तरका चलचित्रहरूका लागि। एन्ड्रोइड संस्करणले हार्डवेयर सपोर्ट नभएका फोनमा पनि ठूला फाइलहरू चलाउन सक्छ।",
    },
    features: {
      en: ["Plays huge 4K/8K MKV files smoothly", "True HDR and Dolby Vision", "Many audio and subtitle languages", "Media library with posters and TV show pages", "Clean Apple-style Liquid Glass design"],
      ne: ["ठूला 4K/8K MKV फाइलहरू सहजै चलाउँछ", "साँचो HDR र Dolby Vision", "धेरै अडियो र सबटाइटल भाषाहरू", "पोस्टर र टिभी सो पेजसहितको मिडिया लाइब्रेरी", "सफा, एप्पल शैलीको Liquid Glass डिजाइन"],
    },
    screenshots: [
      "images/rokaplayer/library.webp",
      "images/rokaplayer/player.webp",
      "images/rokaplayer/audio.webp",
      "images/rokaplayer/hw-sw.webp",
      "images/rokaplayer/info.webp",
      "images/rokaplayer/settings.webp",
    ],
    links: [
      { label: "Website & download", url: "https://rokaplayer-da765.web.app" },
    ],
  },
  {
    id: "rokaconnect",
    name: "RokaConnect",
    icon: "images/rokaconnect/icon.webp",
    accent: "#3e8bff",
    tagline: { en: "Your phone and Mac, together.", ne: "तपाईंको फोन र म्याक, सँगसँगै।" },
    desc: {
      en: "A Mac + Android app pair that makes your phone and Mac work together like one ecosystem.",
      ne: "म्याक र एन्ड्रोइडको एप जोडी, जसले तपाईंको फोन र म्याकलाई एउटै इकोसिस्टमझैँ सँगै काम गराउँछ।",
    },
    features: {
      en: ["Real notification sync", "Fast file sending", "Dynamic Island–style pop-up on Android", "Apple-style Liquid Glass design"],
      ne: ["वास्तविक नोटिफिकेसन सिङ्क", "छिटो फाइल पठाउने सुविधा", "एन्ड्रोइडमा डाइनामिक आइल्यान्ड शैलीको पप-अप", "एप्पल शैलीको Liquid Glass डिजाइन"],
    },
    screenshots: [
      "images/rokaconnect/android-home.webp",
      "images/rokaconnect/android-portal.webp",
      "images/rokaconnect/mac-settings.webp",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/lokeshmagar000/Rokaconnect" },
    ],
  },
  {
    id: "namaste-facts",
    name: "Namaste Facts",
    icon: "images/namaste-facts/icon.webp",
    accent: "#f5a623",
    live: true, // shows a green "Live" badge on the card
    tagline: { en: "Small facts, big wonder", ne: "सानो तथ्य, ठूलो अचम्म" },
    desc: {
      en: "A fact-video channel in Nepali and English. Every topic becomes two short videos — one in each language.",
      ne: "नेपाली र अंग्रेजीमा तथ्य भिडियो च्यानल। हरेक विषयबाट दुईवटा छोटा भिडियो बन्छन् — दुवै भाषामा एक-एक।",
    },
    features: {
      en: ["AI research with checked facts", "Natural voiceover", "Subtitles for easy watching", "On YouTube, Facebook, Instagram and TikTok"],
      ne: ["जाँचिएका तथ्यसहित एआई अनुसन्धान", "प्राकृतिक आवाज (भ्वाइसओभर)", "सजिलै हेर्न सबटाइटल", "युट्युब, फेसबुक, इन्स्टाग्राम र टिकटकमा"],
    },
    screenshots: [],
    // Each platform has a Nepali (ne) and an English (en) page.
    links: [
      { label: "YouTube",
        ne: "https://www.youtube.com/@namastefactsnepali",
        en: "https://www.youtube.com/@namastefacts.official" },
      { label: "Facebook",
        ne: "https://www.facebook.com/namastefacts.nepali",
        en: "https://www.facebook.com/namastefactsofficial" },
      { label: "Instagram",
        ne: "https://www.instagram.com/namastefacts.nepali/",
        en: "https://www.instagram.com/namastefacts.official/" },
      { label: "TikTok",
        ne: "https://www.tiktok.com/@namaste.facts.nep",
        en: "https://www.tiktok.com/@namaste.facts" },
    ],
  },
];

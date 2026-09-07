// Voice Assistant Audio & Speech Synthesis Engine

export const speakMessage = (text, lang = 'ta') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported by this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (lang === 'ta') {
      utterance.lang = 'ta-IN';
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
    } else {
      utterance.lang = 'en-IN';
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
    }

    // Find available voices in browser
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const matchedVoice = voices.find(v => v.lang.includes(lang === 'ta' ? 'ta' : 'en'));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech error:', err);
  }
};

export const PAGE_VOICE_SCRIPTS = {
  home: {
    ta: 'வணக்கம் மற்றும் ஏஜிஎஸ் கார்டன் சிட்டி ரியல் எஸ்டேட்டிற்கு தங்களை அன்புடன் வரவேற்கிறோம் சார்! உங்கள் கனவு இல்லத்தை கண்டறிய நாங்கள் உங்களுக்கு உதவுகிறோம்.',
    en: 'Vanakkam and Welcome to AGS Garden City Luxury Real Estate, Sir! Let us guide you to your perfect dream residence.'
  },
  properties: {
    ta: 'ஏஜிஎஸ் கார்டன் சிட்டியின் அனைத்து சரிபார்க்கப்பட்ட ஆடம்பர அடுக்குமாடி குடியிருப்புகள் மற்றும் வில்லாக்களை பார்வையிடுங்கள் சார்.',
    en: 'Explore all verified luxury apartments, sea view villas, and penthouses in AGS Garden City, Sir.'
  },
  'property-detail': {
    ta: 'இந்த சொத்தின் முழு விவரங்கள், படங்கள் மற்றும் முன்பதிவு தொகையை பார்வையிடுங்கள் சார்.',
    en: 'Here are the complete property specifications, image gallery, and reservation token details, Sir.'
  },
  checkout: {
    ta: 'உங்கள் முன்பதிவை ரேஸர்பே ஆன்லைன் அல்லது நேரடி பண பரிவர்த்தனை மூலம் பாதுகாப்பாக பூர்த்தி செய்யுங்கள் சார்.',
    en: 'Complete your secure token booking with Razorpay online or choose Cash on Site Visit, Sir.'
  },
  trends: {
    ta: 'சென்னை ரியல் எஸ்டேட் விலை உயர்வு மற்றும் சந்தை வளர்ச்சி புள்ளிவிவரங்கள் இதோ சார்.',
    en: 'Here is the detailed Chennai real estate price trends, appreciation rates, and market intelligence from AGS Garden City, Sir.'
  },
  'ai-finder': {
    ta: 'செயற்கை நுண்ணறிவு மூலம் உங்கள் விருப்பத்திற்கேற்ப சிறந்த வீட்டை உடனடியாக கண்டறியுங்கள் சார்.',
    en: 'Describe your requirements and let AGS Garden City AI Matcher find your dream property instantaneously, Sir.'
  },
  'price-drop': {
    ta: 'பிரத்யேக தள்ளுபடி விலையில் உள்ள சொத்துக்களை பார்வையிடுங்கள் சார்.',
    en: 'Explore exclusive off-market flash price drop residences in Chennai, Sir.'
  },
  saved: {
    ta: 'நீங்கள் சேமித்து வைத்துள்ள விருப்பமான வீடுகளின் பட்டியல் இதோ சார்.',
    en: 'Here is your shortlisted wishlist of dream residences, Sir.'
  },
  verified: {
    ta: 'நூறு சதவீதம் சட்டபூர்வமாக சரிபார்க்கப்பட்ட சிஎம்டிஏ மற்றும் ரேரா சொத்துக்கள் இதோ சார்.',
    en: 'Explore 100 percent legally audited CMDA and RERA verified properties, Sir.'
  },
  calculator: {
    ta: 'உங்கள் மாத வீட்டுக் கடன் தவணை தொகையை எளிதாக கணக்கிடுங்கள் சார்.',
    en: 'Calculate your estimated monthly home loan installments and financial schedule, Sir.'
  },
  admin: {
    ta: 'ஏஜிஎஸ் கார்டன் சிட்டி நிர்வாக மேலாண்மை மற்றும் வாடிக்கையாளர் முன்பதிவு பக்கத்திற்கு வரவேற்கிறோம் சார்.',
    en: 'Welcome to AGS Garden City Admin Management Portal. Manage all customer site visits and token bookings, Sir.'
  }
};

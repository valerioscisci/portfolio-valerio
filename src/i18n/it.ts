const it = {
  common: {
    contactMe: 'Contattami',
    blog: 'Blog',
  },
  navbar: {
    home: 'Home',
    about: 'Chi Sono',
    portfolio: 'Portfolio',
    contact: 'Contattami',
  },
  slider: {
    heading1: 'testtesttesttesttest\ntesttesttesttesttest',
    heading2: '',
    heading3: '',
    heading4: '',
  },
  welcome: {
    heading: 'The wanderer developer',
    subHeading:
      'Realizzo siti web e applicazioni mobile, viaggiando e documentando il tutto',
    introParagraph:
      'Il mio nome è Valerio e sono un ingegnere informatico specializzato in sviluppo web oltre ad essere un appassionato di tutto ciò che riguarda il mondo dei viaggi. ' +
      'Da qualche anno a questa parte ho preso la decisione di non voler passare la maggior parte della vita chiuso tra le quattro mura di un ufficio. ' +
      'Pertanto, ho voluto sfruttare la tecnologia e le mie conoscenze per organizzare la mia vita lavorativa svincolandomi dal dover vivere in un solo luogo: sono a tutti gli effetti un nomade digitale. ',
    introButton: 'scopri altro su di me',
    secondParagraph:
      "Se hai un progetto in mente che preveda la realizzazione di un sito web o di un'applicazione mobile, contattami! Allo stesso modo, se sei un developer e vuoi fare due chiacchiere sul lavoro da remoto, sulle scelte che ho preso o riguardo qualcosa di più specifico, sono a disposizione.",
    citParagraph:
      'Freedom is living life as you want to live it. You can have that freedom now. Cit. ',
  },
  parallax: {
    heading: 'Spezzare la routine è la miglior abitudine che TU possa avere',
  },
  knownTechs: {
    heading: 'Progetti realizzati con ',
    noProjectsTitle: 'Nessun progetto trovato...',
    visitProject: 'Visita il sito',
    learnMore: 'Altre informazioni',
    github: 'Codice open source',
    noProjectsDescription:
      'Non ho ancora realizzato alcun progetto utilizzando questa tecnologia quindi il TUO potrebbe essere il primo! Per questo, avrai anche diritto ad uno sconto se decidi di collaborare con me per la prima volta.',
  },
  instagram: {
    visitProfile: 'Visita il mio profilo Instagram',
    noPhotosDescription:
      "Non è stato possibile caricare le foto dal mio profilo Instagram...Visitalo direttamente dall'app o dal sito cliccando su questo riquadro!",
  },
  blogSection: {
    title: 'Blog su viaggi e tecnologia',
    description:
      'A breve verrà aggiunta una sezione dove parlerò di come sia possibile lavorare viaggiando e pubblicherò articoli sulle mie conoscenze riguardanti principalmente lo sviluppo web. \n\n...STAY TUNED...',
    comingSoon: 'Coming Soon',
    subscribe: 'Iscriviti alla newsletter',
  },
  newsletter: {
    subscribe: 'Iscriviti alla newsletter',
    infoText:
      "Iscrivendoti riceverai delle email contenenti aggiornamenti sui miei viaggi e argomenti d'interesse per sviluppatori web.",
    subscribeButton: 'Iscriviti',
  },
  servicesSection: {
    title: 'Cosa posso fare per te',
    services: {
      newWebsite: {
        name: 'Creazione di siti web',
        description:
          'Posso aiutarti nel processo di progettazione, creazione e hosting del tuo sito web.',
      },
      newMobileApp: {
        name: 'Creazione di applicazioni mobile',
        description:
          'Posso sviluppare la tua app mobile compatibile con dispositivi Android e Apple.',
      },
      helpYourTeam: {
        name: 'Supporto team di sviluppo',
        description:
          'Se il tuo team è in difficoltà per il troppo carico di lavoro, sono disponibile a svolgere alcuni task per portare a termine lo sviluppo del tuo progetto per tempo.',
      },
      one2one: {
        name: '1-to-1 talks',
        description:
          'Se sei uno sviluppatore che magari si sta affacciando al mondo del lavoro e vuoi fare una chiacchierata sono a disposizione :)',
      },
      codeReview: {
        name: 'Revisione di codice',
        description:
          "Se hai del codice che vuoi migliorare, possiamo senz'altro farlo insieme.",
      },
    },
  },
  reviewsSection: {
    title: 'Compagnie e clienti con cui ho collaborato',
    talkAboutMe: 'Dicono di me...',
  },
  contactForm: {
    title: 'Costruiamo insieme il tuo progetto!',
    formLabels: {
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      send: 'Invia',
    },
    warning: 'Ti prego di leggere queste note prima di inviarmi un messaggio:',
    warnings: {
      one: 'Non sono interessato ad un lavoro come dipendente',
      two: "Non contattarmi con l'intenzione di fare spam",
      three:
        'Non sono la persona che fa per te se non sei disposto a collaborare al 100% da remoto e se non sei flessibile con gli orari',
    },
    thanks: 'Grazie per il messaggio!',
    error: "Errore durante l'invio, per favore prova di nuovo.",
  },
  footer: {
    copyright: 'The Wanderer Developer',
    contactInformation: 'Informazioni di contatto',
    usefulLinks: 'Link utili',
    policy: 'Policy',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
  },
};

export type I18NStrings = typeof it;

export default it;

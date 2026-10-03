import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;

export type Lesson = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
};

export type Chapter = {
  slug: string;
  title: LocalizedText;
  lessons: Lesson[];
};

export type Part = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  chapters: Chapter[];
};

export type LessonRef = {
  part: Part;
  chapter: Chapter;
  lesson: Lesson;
};

/**
 * Syllabus organized after Suellio Almeida - The Motor Racing Book Vol. 1 (Car Handling).
 * Modules I-III mirror the book; mountain roads and setup extend it for sim racing practice.
 * Publish status comes from content/es/lessons MDX frontmatter (master locale).
 */
export const curriculum: Part[] = [
  {
    slug: "foundations",
    title: { es: "Guías generales", en: "General guidelines" },
    summary: {
      es: "Cómo aprender, cómo sentarte y qué hábitos te hacen más rápido a largo plazo.",
      en: "How to learn, how to sit, and which habits make you faster long-term.",
    },
    chapters: [
      {
        slug: "how-to-learn",
        title: { es: "Cómo aprender", en: "How to learn" },
        lessons: [
          {
            slug: "learning-vs-practicing",
            title: {
              es: "Aprender vs practicar",
              en: "Learning vs practicing",
            },
            summary: {
              es: "Cuándo estudiar técnica y cuándo solo acumular vueltas.",
              en: "When to study technique and when to just rack up laps.",
            },
          },
          {
            slug: "efficiency-and-habits",
            title: {
              es: "Eficiencia y hábitos",
              en: "Efficiency and habits",
            },
            summary: {
              es: "Memoria muscular: el enemigo y el acelerador del progreso.",
              en: "Muscle memory: the enemy and the accelerator of progress.",
            },
          },
          {
            slug: "ego-and-discomfort",
            title: {
              es: "Ego y incomodidad",
              en: "Ego and discomfort",
            },
            summary: {
              es: "Bajar el ritmo para subir el nivel, y buscar la zona incómoda.",
              en: "Slow down to level up, and chase the uncomfortable zone.",
            },
          },
          {
            slug: "fitness-and-small-changes",
            title: {
              es: "Forma física y +1%",
              en: "Fitness and +1%",
            },
            summary: {
              es: "Mente y cuerpo al límite, y cambios pequeños que se acumulan.",
              en: "Mind and body on the limit, and small changes that compound.",
            },
          },
          {
            slug: "testing-new-techniques",
            title: {
              es: "Probar técnicas nuevas",
              en: "Testing new techniques",
            },
            summary: {
              es: "Cómo introducir un concepto sin destruir tu ritmo actual.",
              en: "How to introduce a concept without wrecking your current pace.",
            },
          },
        ],
      },
      {
        slug: "cockpit",
        title: { es: "Posición y controles", en: "Cockpit and controls" },
        lessons: [
          {
            slug: "posture",
            title: { es: "Postura", en: "Posture" },
            summary: {
              es: "Asiento, distancia y por qué la postura cambia lo que sientes.",
              en: "Seat, reach, and why posture changes what you feel.",
            },
          },
          {
            slug: "pedals-and-braking-seat",
            title: {
              es: "Pedales y asiento al frenar",
              en: "Pedals and the braking seat",
            },
            summary: {
              es: "Apoyo del cuerpo bajo frenada y dosificación limpia.",
              en: "Body support under braking and clean pedal metering.",
            },
          },
          {
            slug: "steering-wheel-setup",
            title: {
              es: "Volante y agarre",
              en: "Steering wheel and grip",
            },
            summary: {
              es: "Altura, ángulo y manos ligeras desde el primer kilómetro.",
              en: "Height, angle, and light hands from the first kilometer.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "braking",
    title: { es: "Módulo I — Frenada", en: "Module I — Braking" },
    summary: {
      es: "Visión, capacidad de frenada del coche y técnicas de recta a punta de curva.",
      en: "Vision, the car's braking capability, and straight-to-turn techniques.",
    },
    chapters: [
      {
        slug: "vision",
        title: { es: "Visión", en: "Vision" },
        lessons: [
          {
            slug: "planning-vision",
            title: {
              es: "Visión de planificación",
              en: "Planning vision",
            },
            summary: {
              es: "Mirar adelante para decidir antes de llegar.",
              en: "Look ahead so you decide before you arrive.",
            },
          },
          {
            slug: "assessment-vision",
            title: {
              es: "Visión de evaluación",
              en: "Assessment vision",
            },
            summary: {
              es: "Leer grip, trayectoria y errores mientras todavía hay margen.",
              en: "Read grip, path, and mistakes while you still have margin.",
            },
          },
        ],
      },
      {
        slug: "braking-capability",
        title: {
          es: "Capacidad de frenada",
          en: "Braking capability",
        },
        lessons: [
          {
            slug: "mechanical-grip",
            title: {
              es: "Grip mecánico",
              en: "Mechanical grip",
            },
            summary: {
              es: "Qué puede hacer el neumático sin ayuda aerodinámica.",
              en: "What the tire can do without aero help.",
            },
          },
          {
            slug: "aerodynamic-grip",
            title: {
              es: "Grip aerodinámico",
              en: "Aerodynamic grip",
            },
            summary: {
              es: "Cómo la carga aerodinámica cambia el límite al frenar.",
              en: "How downforce changes the limit under braking.",
            },
          },
          {
            slug: "low-vs-high-downforce-braking",
            title: {
              es: "Poca vs mucha carga al frenar",
              en: "Low vs high downforce under braking",
            },
            summary: {
              es: "Por qué el mismo coche frena distinto según la velocidad.",
              en: "Why the same car brakes differently by speed.",
            },
          },
        ],
      },
      {
        slug: "straight-line-braking",
        title: {
          es: "Frenada en recta",
          en: "Straight-line braking",
        },
        lessons: [
          {
            slug: "braking-to-a-stop",
            title: {
              es: "De recta a parada total",
              en: "Straight line to a full stop",
            },
            summary: {
              es: "El ejercicio base para entender el umbral de frenada.",
              en: "The base drill to understand threshold braking.",
            },
          },
          {
            slug: "press-less",
            title: {
              es: "Técnica Press Less",
              en: "Press Less technique",
            },
            summary: {
              es: "Empieza fuerte y suelta con intención, no al azar.",
              en: "Start hard and release with intent, not at random.",
            },
          },
          {
            slug: "compressions-crests-bumps",
            title: {
              es: "Compresiones, crestas y baches",
              en: "Compressions, crests, and bumps",
            },
            summary: {
              es: "Adaptar presión cuando el asfalto cambia la carga.",
              en: "Adapt pressure when the road changes load.",
            },
          },
          {
            slug: "initial-to-peak-pressure",
            title: {
              es: "Presión inicial, pico y referencias",
              en: "Initial pressure, peak, and references",
            },
            summary: {
              es: "Cómo construir el pico y anclarlo a marcas visuales.",
              en: "How to build peak pressure and anchor it to visual marks.",
            },
          },
          {
            slug: "light-hands-under-braking",
            title: {
              es: "Manos ligeras al frenar",
              en: "Light hands under braking",
            },
            summary: {
              es: "No pelear el volante mientras el morro se carga.",
              en: "Do not fight the wheel while the nose loads up.",
            },
          },
          {
            slug: "engine-braking-interference",
            title: {
              es: "Freno motor e interferencia",
              en: "Engine braking interference",
            },
            summary: {
              es: "Cuándo el motor ayuda… y cuándo estropea la frenada.",
              en: "When the engine helps—and when it ruins the stop.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "corner-geometry",
    title: {
      es: "Módulo II — Geometría de curva",
      en: "Module II — Corner geometry",
    },
    summary: {
      es: "Fases, posición, ángulo, MRP, apex y curvas compuestas.",
      en: "Stages, positioning, angle, MRP, apex, and compound corners.",
    },
    chapters: [
      {
        slug: "corner-stages",
        title: { es: "Fases de la curva", en: "Stages of a corner" },
        lessons: [
          {
            slug: "initial-conditions",
            title: {
              es: "Condiciones iniciales",
              en: "Importance of initial conditions",
            },
            summary: {
              es: "Lo que llevas a la curva decide casi todo lo que sigue.",
              en: "What you bring into the corner decides almost everything after.",
            },
          },
          {
            slug: "early-late-entry-exit",
            title: {
              es: "Entrada y salida tempranas vs tardías",
              en: "Early vs late entry and exit",
            },
            summary: {
              es: "Nombrar las fases para entrenarlas por separado.",
              en: "Name the phases so you can train them separately.",
            },
          },
          {
            slug: "entry-speed",
            title: {
              es: "Velocidad de entrada",
              en: "Entry speed",
            },
            summary: {
              es: "El número que más define si la curva se abre o se cierra.",
              en: "The number that most defines whether the corner opens or closes.",
            },
          },
        ],
      },
      {
        slug: "positioning-and-angle",
        title: {
          es: "Posición y ángulo",
          en: "Positioning and angle",
        },
        lessons: [
          {
            slug: "positioning",
            title: { es: "Posicionamiento", en: "Positioning" },
            summary: {
              es: "Dónde está el coche en la pista en cada metro.",
              en: "Where the car sits on the track at every meter.",
            },
          },
          {
            slug: "angle",
            title: { es: "Ángulo", en: "Angle" },
            summary: {
              es: "Hacia dónde apunta el morro respecto a la trayectoria ideal.",
              en: "Where the nose points relative to the ideal path.",
            },
          },
          {
            slug: "braking-and-turn-in-points",
            title: {
              es: "Puntos de frenada y turn-in",
              en: "Braking and turn-in points",
            },
            summary: {
              es: "Marcas fijas para repetir la misma geometría vuelta a vuelta.",
              en: "Fixed marks to repeat the same geometry lap after lap.",
            },
          },
          {
            slug: "changes-of-direction",
            title: {
              es: "Cambios de dirección",
              en: "Changes of direction",
            },
            summary: {
              es: "Cómo enlazar un giro con el siguiente sin perder plataforma.",
              en: "How to link one turn into the next without losing platform.",
            },
          },
          {
            slug: "checkpoints",
            title: { es: "Checkpoints", en: "Checkpoints" },
            summary: {
              es: "Puntos de control intermedios para diagnosticar errores.",
              en: "Intermediate control points to diagnose mistakes.",
            },
          },
          {
            slug: "sensing-position-and-angle",
            title: {
              es: "Sentir posición y ángulo",
              en: "Sensing position and angle",
            },
            summary: {
              es: "Calibrar la percepción antes de corregir con inputs.",
              en: "Calibrate perception before you correct with inputs.",
            },
          },
          {
            slug: "double-lefts-and-rights",
            title: {
              es: "Dobles izquierdas y derechas",
              en: "Double lefts and double rights",
            },
            summary: {
              es: "Tratar dos curvas del mismo sentido como un solo problema.",
              en: "Treat two same-direction corners as one problem.",
            },
          },
          {
            slug: "deceiving-corners",
            title: {
              es: "Curvas engañosas",
              en: "Deceiving corners",
            },
            summary: {
              es: "Cuando la forma de la pista te miente sobre el límite.",
              en: "When track shape lies to you about the limit.",
            },
          },
        ],
      },
      {
        slug: "mrp-and-apex",
        title: {
          es: "MRP y apex",
          en: "MRP and apex",
        },
        lessons: [
          {
            slug: "maximum-rotation-point",
            title: {
              es: "Punto de máxima rotación (MRP)",
              en: "Maximum Rotation Point (MRP)",
            },
            summary: {
              es: "El momento en que el coche ha girado lo que necesitaba.",
              en: "The moment the car has rotated as much as it needs.",
            },
          },
          {
            slug: "bouncing-off-the-apex",
            title: {
              es: "Rebotar en el apex",
              en: "Bouncing off the apex",
            },
            summary: {
              es: "Usar el interior como referencia dinámica, no como destino.",
              en: "Use the inside as a dynamic reference, not a destination.",
            },
          },
          {
            slug: "double-apex",
            title: {
              es: "Doble apex: poca vs mucha carga",
              en: "Double apex: low vs high downforce",
            },
            summary: {
              es: "Cuándo la curva pide dos toques al interior.",
              en: "When the corner asks for two touches on the inside.",
            },
          },
          {
            slug: "mrp-vs-apex",
            title: {
              es: "MRP frente al apex",
              en: "MRP vs apex",
            },
            summary: {
              es: "No son lo mismo: dónde rotas vs dónde tocas el bordillo.",
              en: "Not the same: where you rotate vs where you kiss the curb.",
            },
          },
          {
            slug: "early-vs-late-apex",
            title: {
              es: "Apex temprano vs tardío",
              en: "Early apex vs late apex",
            },
            summary: {
              es: "Compromisos de salida y cuándo sacrificar la entrada.",
              en: "Exit trade-offs and when to sacrifice the entry.",
            },
          },
        ],
      },
      {
        slug: "complex-corners",
        title: {
          es: "Curvas complejas",
          en: "Complex corners",
        },
        lessons: [
          {
            slug: "compound-corners",
            title: {
              es: "Curvas compuestas",
              en: "Compound corners",
            },
            summary: {
              es: "Qué sacrificar, cómo ajustar y el error más común.",
              en: "What to sacrifice, how to adjust, and the most common mistake.",
            },
          },
          {
            slug: "elevation-and-camber",
            title: {
              es: "Elevación y peralte",
              en: "Elevation and camber changes",
            },
            summary: {
              es: "Compresiones, crestas y cambios de grip en el asfalto.",
              en: "Compressions, crests, and grip changes in the asphalt.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "car-handling",
    title: {
      es: "Módulo III — Manejo del coche",
      en: "Module III — Car handling",
    },
    summary: {
      es: "Trail braking, String Theory, oversteer/understeer y aplicación de gas.",
      en: "Trail braking, String Theory, oversteer/understeer, and throttle application.",
    },
    chapters: [
      {
        slug: "limit-mindset",
        title: {
          es: "Mentalidad al límite",
          en: "Limit mindset",
        },
        lessons: [
          {
            slug: "learning-time-limit",
            title: {
              es: "Al límite de tu tiempo de aprendizaje",
              en: "On the limit of your learning time",
            },
            summary: {
              es: "Entrenar en la zona donde aún puedes procesar información.",
              en: "Train in the zone where you can still process information.",
            },
          },
          {
            slug: "driving-the-line-vs-the-car",
            title: {
              es: "Conducir la línea vs conducir el coche",
              en: "Driving the line vs driving the car",
            },
            summary: {
              es: "La trayectoria ideal no sirve si el coche no apunta.",
              en: "The ideal path is useless if the car is not pointing.",
            },
          },
          {
            slug: "overdriving",
            title: {
              es: "Qué es overdriving de verdad",
              en: "What overdriving really is",
            },
            summary: {
              es: "Velocidad primero vs rotación primero: dos errores distintos.",
              en: "Speed first vs rotation first: two different mistakes.",
            },
          },
          {
            slug: "driving-or-setup",
            title: {
              es: "¿Cambiar la conducción o el setup?",
              en: "Change the driving or change the setup?",
            },
            summary: {
              es: "Diagnosticar si el problema es el piloto o el coche.",
              en: "Diagnose whether the problem is the driver or the car.",
            },
          },
        ],
      },
      {
        slug: "balance-and-trail",
        title: {
          es: "Equilibrio y trail braking",
          en: "Balance and trail braking",
        },
        lessons: [
          {
            slug: "feeling-oversteer-understeer",
            title: {
              es: "Sentir oversteer y understeer",
              en: "Feeling oversteer and understeer",
            },
            summary: {
              es: "Definiciones, sensaciones y qué coche elegir para aprender.",
              en: "Definitions, sensations, and which car to choose to learn.",
            },
          },
          {
            slug: "what-is-trail-braking",
            title: {
              es: "Qué es el trail braking",
              en: "What is trail braking?",
            },
            summary: {
              es: "Freno + dirección como una sola herramienta de rotación.",
              en: "Brake + steering as one rotation tool.",
            },
          },
          {
            slug: "string-theory",
            title: {
              es: "String Theory",
              en: "The String Theory",
            },
            summary: {
              es: "Ratios, alta carga y la versión avanzada del concepto.",
              en: "Ratios, high downforce, and the advanced version of the idea.",
            },
          },
          {
            slug: "terminal-trail-pressure",
            title: {
              es: "Presión terminal de trail",
              en: "Terminal trail braking pressure",
            },
            summary: {
              es: "Hasta dónde puedes mantener freno sin matar la rotación.",
              en: "How far you can keep brake without killing rotation.",
            },
          },
        ],
      },
      {
        slug: "rotation-tools",
        title: {
          es: "Herramientas de rotación",
          en: "Rotation tools",
        },
        lessons: [
          {
            slug: "three-tools-for-rotation",
            title: {
              es: "Tres herramientas en la entrada",
              en: "Three tools for rotation on entry",
            },
            summary: {
              es: "Dirección, trail braking y freno motor — y cómo combinarlos.",
              en: "Steering, trail braking, and engine braking—and how to combine them.",
            },
          },
          {
            slug: "engine-braking-fwd-rwd",
            title: {
              es: "Freno motor en FWD vs RWD",
              en: "Engine braking in FWD vs RWD",
            },
            summary: {
              es: "El mismo pedal, efectos opuestos según el eje motriz.",
              en: "The same pedal, opposite effects by driven axle.",
            },
          },
          {
            slug: "weight-transfer-as-tool",
            title: {
              es: "Transferencia de peso como herramienta",
              en: "Weight transfer as a tool",
            },
            summary: {
              es: "Gestionar rotación frenando y acelerando en apoyo.",
              en: "Manage rotation while braking and accelerating in load.",
            },
          },
          {
            slug: "steering-angle-vs-force",
            title: {
              es: "Ángulo vs fuerza de dirección",
              en: "Steering angle vs steering force",
            },
            summary: {
              es: "No es lo mismo girar el volante que cargar el neumático.",
              en: "Turning the wheel is not the same as loading the tire.",
            },
          },
          {
            slug: "exponential-vs-linear-steering",
            title: {
              es: "Dirección exponencial vs lineal",
              en: "Exponential vs linear steering",
            },
            summary: {
              es: "Cómo dosificar el volante según peralte y elevación.",
              en: "How to meter the wheel with camber and elevation.",
            },
          },
        ],
      },
      {
        slug: "light-hands-balance",
        title: {
          es: "Manos ligeras y equilibrio",
          en: "Light hands and balance",
        },
        lessons: [
          {
            slug: "light-hands-technique",
            title: {
              es: "Técnica de manos ligeras",
              en: "Light Hands technique",
            },
            summary: {
              es: "Incluye contravolante: menos pelea, más información.",
              en: "Including countersteer: less fight, more information.",
            },
          },
          {
            slug: "light-hands-parts-2-3",
            title: {
              es: "Manos ligeras: partes 2 y 3",
              en: "Light Hands parts 2 and 3",
            },
            summary: {
              es: "Profundizar el concepto e inducir understeer a propósito.",
              en: "Deepen the idea and deliberately induce understeer.",
            },
          },
          {
            slug: "induce-understeer-entry",
            title: {
              es: "Inducir understeer en la entrada",
              en: "Inducing understeer to correct oversteer on entry",
            },
            summary: {
              es: "Usar push controlado para salvar un coche nervioso.",
              en: "Use controlled push to save a nervous car.",
            },
          },
          {
            slug: "make-or-let-rotate",
            title: {
              es: "Hacer girar o dejar girar",
              en: "Make the car rotate or let it rotate?",
            },
            summary: {
              es: "Trail braking: forzar rotación vs acompañarla.",
              en: "Trail braking: force rotation vs accompany it.",
            },
          },
          {
            slug: "induce-understeer-exit",
            title: {
              es: "Inducir understeer en la salida",
              en: "Inducing understeer to correct oversteer on exit",
            },
            summary: {
              es: "Abrir el morro para estabilizar la zaga al gas.",
              en: "Open the nose to stabilize the rear on throttle.",
            },
          },
          {
            slug: "brake-release-balance-trap",
            title: {
              es: "El problema de soltar freno para equilibrar",
              en: "The problem with brake release for balance",
            },
            summary: {
              es: "Por qué “soltar para arreglar” suele empeorar el coche.",
              en: "Why “release to fix it” often makes the car worse.",
            },
          },
          {
            slug: "fishing-the-grip",
            title: {
              es: "Pescar el grip",
              en: "Fishing the grip",
            },
            summary: {
              es: "Convivir con coches oversteery sin pelear cada metro.",
              en: "Live with oversteery cars without fighting every meter.",
            },
          },
          {
            slug: "combining-handling-techniques",
            title: {
              es: "Combinar técnicas de manejo",
              en: "Combining handling techniques",
            },
            summary: {
              es: "Encadenar manos ligeras, trail y gas en un solo flujo.",
              en: "Chain light hands, trail, and throttle into one flow.",
            },
          },
          {
            slug: "inducing-oversteer-on-entry",
            title: {
              es: "Inducir oversteer a propósito",
              en: "Inducing oversteer on entry deliberately",
            },
            summary: {
              es: "¿Se puede hacer girar el coche de competición a conciencia?",
              en: "Can you spin the race car on purpose—usefully?",
            },
          },
        ],
      },
      {
        slug: "throttle-and-platform",
        title: {
          es: "Gas y plataforma",
          en: "Throttle and platform",
        },
        lessons: [
          {
            slug: "throttle-application-speed",
            title: {
              es: "Velocidad de aplicación del gas",
              en: "Speed of throttle application",
            },
            summary: {
              es: "Segundo nivel: dosificar hacia el límite de tracción según potencia.",
              en: "Second level: meter toward traction limit across horsepower ranges.",
            },
          },
          {
            slug: "throttle-vs-steering-angle",
            title: {
              es: "Gas vs ángulo de dirección",
              en: "Throttle application vs steering angle",
            },
            summary: {
              es: "Cuánto volante puedes llevar cuando abres el acelerador.",
              en: "How much wheel you can carry as you open the throttle.",
            },
          },
          {
            slug: "throttle-in-fwd",
            title: {
              es: "Gas en tracción delantera",
              en: "Throttle in front-wheel drive",
            },
            summary: {
              es: "El eje delantero tira y gira: reglas distintas al RWD.",
              en: "The front axle pulls and steers: different rules than RWD.",
            },
          },
          {
            slug: "platform-unity",
            title: {
              es: "Plataforma: la idea de unidad",
              en: "Platform — the idea of unity",
            },
            summary: {
              es: "El coche como un solo cuerpo estable, no piezas peleadizas.",
              en: "The car as one stable body, not fighting pieces.",
            },
          },
          {
            slug: "smooth-vs-fast-inputs",
            title: {
              es: "¿Suave es rápido?",
              en: "Smooth is fast?",
            },
            summary: {
              es: "Velocidad de input vs velocidad de corrección.",
              en: "Input speed vs correction speed.",
            },
          },
          {
            slug: "hesitation",
            title: { es: "Vacilación", en: "Hesitation" },
            summary: {
              es: "El medio segundo de duda que te roba el límite.",
              en: "The half-second of doubt that steals the limit.",
            },
          },
          {
            slug: "handling-refresh-rate",
            title: {
              es: "Tasa de refresco del handling",
              en: "Car handling's refresh rate",
            },
            summary: {
              es: "Con qué frecuencia percibes y corriges oversteer/understeer.",
              en: "How often you perceive and correct oversteer/understeer.",
            },
          },
          {
            slug: "rotation-tendencies",
            title: {
              es: "Tendencias de rotación",
              en: "Rotation tendencies",
            },
            summary: {
              es: "Entrada y salida: patrones que se repiten coche a coche.",
              en: "Entry and exit: patterns that repeat car to car.",
            },
          },
          {
            slug: "handling-problems-and-solutions",
            title: {
              es: "Problemas de manejo y soluciones",
              en: "Handling problems and solutions",
            },
            summary: {
              es: "Mapa de síntomas → causa → corrección en pista.",
              en: "Symptom → cause → on-track fix map.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "mountain-roads",
    title: {
      es: "Carreteras de montaña",
      en: "Mountain roads",
    },
    summary: {
      es: "Aplicar el handling de circuito a touge, blind corners y descensos.",
      en: "Apply circuit handling to touge, blind corners, and downhill runs.",
    },
    chapters: [
      {
        slug: "touge-fundamentals",
        title: {
          es: "Fundamentos de touge",
          en: "Touge fundamentals",
        },
        lessons: [
          {
            slug: "mountain-line",
            title: {
              es: "Línea de montaña",
              en: "Mountain line",
            },
            summary: {
              es: "Fuera-dentro-fuera real frente a visión ciega y cresta.",
              en: "Real outside-inside-outside vs blind vision and crests.",
            },
          },
          {
            slug: "commitment-and-rhythm",
            title: {
              es: "Compromiso y ritmo",
              en: "Commitment and rhythm",
            },
            summary: {
              es: "Encadenar curvas sin reset mental en cada apex.",
              en: "Link corners without a mental reset at every apex.",
            },
          },
          {
            slug: "hairpins-and-heel-toe",
            title: {
              es: "Horquillas y heel-toe",
              en: "Hairpins and heel-toe",
            },
            summary: {
              es: "Rotación lenta, freno motor y cambios limpios en bajada.",
              en: "Slow rotation, engine braking, and clean downshifts downhill.",
            },
          },
          {
            slug: "blind-crests-and-camber",
            title: {
              es: "Crestas ciegas y peralte",
              en: "Blind crests and camber",
            },
            summary: {
              es: "Confiar en referencias cuando no ves la salida.",
              en: "Trust references when you cannot see the exit.",
            },
          },
        ],
      },
      {
        slug: "assetto-touge",
        title: {
          es: "Touge en Assetto Corsa",
          en: "Touge in Assetto Corsa",
        },
        lessons: [
          {
            slug: "ac-mountain-practice",
            title: {
              es: "Práctica en mapas de montaña",
              en: "Practice on mountain maps",
            },
            summary: {
              es: "Cómo usar mods de touge para entrenar visión y compromiso.",
              en: "How to use touge mods to train vision and commitment.",
            },
          },
          {
            slug: "street-car-vs-race-car-mountain",
            title: {
              es: "Callejero vs coche de carrera en montaña",
              en: "Street car vs race car on mountain roads",
            },
            summary: {
              es: "Adaptar String Theory y trail a poca carga y más masa.",
              en: "Adapt String Theory and trail to low downforce and more mass.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "setup",
    title: {
      es: "Setup — Assetto Corsa",
      en: "Setup — Assetto Corsa",
    },
    summary: {
      es: "Cuando el handling falla: neumáticos, suspensión, aero y diferencial.",
      en: "When handling fails: tires, suspension, aero, and differential.",
    },
    chapters: [
      {
        slug: "setup-diagnosis",
        title: {
          es: "Diagnóstico antes de tocar",
          en: "Diagnose before you touch",
        },
        lessons: [
          {
            slug: "is-it-you-or-the-setup",
            title: {
              es: "¿Eres tú o el setup?",
              en: "Is it you or the setup?",
            },
            summary: {
              es: "Reglas para no compensar con setup un error de técnica.",
              en: "Rules so you do not mask technique errors with setup.",
            },
          },
          {
            slug: "reading-tire-temps",
            title: {
              es: "Leer temperaturas de neumático",
              en: "Reading tire temperatures",
            },
            summary: {
              es: "Qué te dice el triángulo interior-medio-exterior.",
              en: "What the inside-middle-outside triangle tells you.",
            },
          },
        ],
      },
      {
        slug: "tires-and-alignment",
        title: {
          es: "Neumáticos y alineación",
          en: "Tires and alignment",
        },
        lessons: [
          {
            slug: "pressure-and-camber",
            title: {
              es: "Presión y camber",
              en: "Pressure and camber",
            },
            summary: {
              es: "Base de grip térmico y contacto del hombro del neumático.",
              en: "Thermal grip base and tire shoulder contact.",
            },
          },
          {
            slug: "toe-and-caster",
            title: {
              es: "Toe y caster",
              en: "Toe and caster",
            },
            summary: {
              es: "Estabilidad en recta vs respuesta al girar.",
              en: "Straight-line stability vs turn-in response.",
            },
          },
        ],
      },
      {
        slug: "springs-dampers-arb",
        title: {
          es: "Muelles, amortiguadores y barras",
          en: "Springs, dampers, and ARBs",
        },
        lessons: [
          {
            slug: "springs-and-ride-height",
            title: {
              es: "Muelles y altura",
              en: "Springs and ride height",
            },
            summary: {
              es: "Plataforma, bottoming y balance de roll.",
              en: "Platform, bottoming, and roll balance.",
            },
          },
          {
            slug: "dampers-and-arb",
            title: {
              es: "Amortiguadores y barras estabilizadoras",
              en: "Dampers and anti-roll bars",
            },
            summary: {
              es: "Transitorios: entrada nerviosa vs salida perezosa.",
              en: "Transients: nervous entry vs lazy exit.",
            },
          },
        ],
      },
      {
        slug: "aero-and-diff",
        title: {
          es: "Aero y diferencial",
          en: "Aero and differential",
        },
        lessons: [
          {
            slug: "wings-and-splitters",
            title: {
              es: "Alas y splitter",
              en: "Wings and splitters",
            },
            summary: {
              es: "Equilibrio de carga y cómo afecta frenada y salida.",
              en: "Downforce balance and how it affects braking and exit.",
            },
          },
          {
            slug: "differential-preload-power-coast",
            title: {
              es: "Diferencial: preload, power y coast",
              en: "Differential: preload, power, and coast",
            },
            summary: {
              es: "Rotación en entrada vs tracción en salida.",
              en: "Rotation on entry vs traction on exit.",
            },
          },
        ],
      },
    ],
  },
];

export function flattenLessons(): LessonRef[] {
  return curriculum.flatMap((part) =>
    part.chapters.flatMap((chapter) =>
      chapter.lessons.map((lesson) => ({ part, chapter, lesson })),
    ),
  );
}

export function findLesson(partSlug: string, lessonSlug: string): LessonRef | null {
  const match = flattenLessons().find(
    (item) => item.part.slug === partSlug && item.lesson.slug === lessonSlug,
  );
  return match ?? null;
}

export function getAdjacentLessons(partSlug: string, lessonSlug: string): {
  previous: LessonRef | null;
  next: LessonRef | null;
} {
  const items = flattenLessons();
  const index = items.findIndex(
    (item) => item.part.slug === partSlug && item.lesson.slug === lessonSlug,
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? (items[index - 1] ?? null) : null,
    next: index < items.length - 1 ? (items[index + 1] ?? null) : null,
  };
}

export function getLessonHref(item: LessonRef): `/learn/${string}/${string}` {
  return `/learn/${item.part.slug}/${item.lesson.slug}`;
}

export function countLessons(part: Part): number {
  return part.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
}

/**
 * Publishes Module I (braking) with denser original Apex School content.
 * Concepts aligned to Suellio Almeida Vol.1 Module I — original wording.
 *
 * Usage: npx tsx scripts/publish-module-1.ts
 */
import fs from "node:fs/promises";
import path from "node:path";

type Sections = {
  concept: string;
  why: string;
  example: string;
  exercise: string;
};

type Lesson = {
  slug: string;
  titleEs: string;
  titleEn: string;
  brief: string;
  es: Sections;
  en: Sections;
};

const part = "braking";

const lessons: Lesson[] = [
  {
    slug: "planning-vision",
    titleEs: "Visión de planificación",
    titleEn: "Planning vision",
    brief: `# Brief: Visión de planificación

## Concepto
Mirar ~1 s por delante del coche para decidir inputs con antelación útil.

## Física
Sin tiempo visual, el freno y el turn-in se improvisan cuando el grip ya está comprometido.

## Ejemplo
Recta a alta velocidad: miras la marca de frenada y el inicio de la zona, no el capó.

## Ejercicio
5 vueltas nombrando la siguiente referencia ~1 s antes de usarla.

## Errores típicos
- Mirar demasiado lejos (información inútil)
- Mirar solo el morro
`,
    es: {
      concept:
        "La visión de planificación es mirar lo bastante lejos como para decidir antes de actuar, pero no tan lejos que la información deje de servir. En la práctica: mira hacia donde el coche estará en aproximadamente un segundo. Ese horizonte te da margen para programar freno, turn-in y salida sin reaccionar a ciegas.",
      why: "Con mala visión frenas tarde, giras tarde y corriges de golpe. El cerebro necesita datos con antelación: baches, pianos, elevación, marcas. Si solo miras el capó, llegas al input cuando el neumático ya está al límite y no queda margen mental. Planificar mueve la decisión a una zona más segura.",
      example:
        "Recta a 240 km/h hacia una curva de 2ª. No miras el final de la siguiente colina. Miras el cartel de 100 m, luego el piano de entrada. Esa secuencia es planificación útil: cada mirada alimenta el siguiente input, no un paisaje lejano que aún no puedes usar.",
      exercise:
        "Cinco vueltas en la misma recta. Un segundo antes de cada referencia di en voz alta qué harás (freno / giro / gas). Si llegas en silencio, esa curva no cuenta. Meta: nombrar a tiempo al menos 8 de 10 referencias del sector.",
    },
    en: {
      concept:
        "Planning vision means looking far enough ahead to decide before you act—but not so far that the information stops being useful. In practice: look where the car will be in about one second. That horizon gives you time to program brake, turn-in, and exit instead of reacting blind.",
      why: "Bad vision makes you brake late, turn late, and correct abruptly. The brain needs data early: bumps, curbs, elevation, marks. If you only stare at the hood, you arrive at the input when the tire is already at the limit and mental margin is gone. Planning moves the decision into a safer zone.",
      example:
        "A 240 km/h straight into a 2nd-gear corner. You do not stare at the end of the next hill. You look at the 100 m board, then the entry curb. That sequence is useful planning: each glance feeds the next input, not a distant landscape you cannot use yet.",
      exercise:
        "Five laps on the same straight. About one second before each reference say aloud what you will do (brake / turn / throttle). Arrive silent and that corner does not count. Goal: name at least 8 of 10 sector references on time.",
    },
  },
  {
    slug: "assessment-vision",
    titleEs: "Visión de evaluación",
    titleEn: "Assessment vision",
    brief: `# Brief: Visión de evaluación

## Concepto
Un vistazo corto al morro para comprobar posición; luego vuelves a planificar.

## Física
Plan ≠ realidad: sin check, acumulas error de línea metro a metro.

## Ejemplo
¿Estás sobre el piano interior como querías? Check de 0,1 s y vuelve la mirada adelante.

## Ejercicio
En un sector, cuenta cuántos ciclos plan→check haces por vuelta.

## Errores típicos
- Solo planificar y nunca mirar dónde estás
- Quedarte mirando el bordillo y olvidar el horizonte
`,
    es: {
      concept:
        "La visión de evaluación es un vistazo rápido justo delante del coche: ¿estoy donde planeé? Un décimo de segundo basta. Luego vuelves a planificar. El patrón es plan → check → plan → check, varias veces por sector.",
      why: "Las cosas no salen siempre como en el mapa mental. Un error pequeño a la salida de una curva se convierte en un error grande a la entrada de la siguiente. Sin evaluación, sigues ejecutando un plan obsoleto. Con ella, corriges posición y ángulo mientras aún hay grip de sobra.",
      example:
        "En una curva compuesta miras el apex lejano (plan), luego un instante el piano bajo tu rueda interior (check): ¿estás encima o te has abierto? Ajustas y vuelves a mirar la siguiente referencia. En curvas ciegas usas más evaluación: solo puedes planificar hasta donde se ve.",
      exercise:
        "Elige un sector con dos o tres curvas. Durante 8 vueltas, cada vez que hagas un check di «check». Al final anota cuántos checks hiciste por vuelta. Meta: al menos 4 checks conscientes por sector sin perder la mirada de planificación más de un instante.",
    },
    en: {
      concept:
        "Assessment vision is a quick glance just ahead of the car: am I where I planned? A tenth of a second is enough. Then you return to planning. The pattern is plan → check → plan → check, several times per sector.",
      why: "Things do not always match the mental map. A small exit error becomes a big entry error into the next corner. Without assessment you keep executing an obsolete plan. With it, you correct position and angle while grip margin remains.",
      example:
        "In a compound corner you look at the far apex (plan), then briefly at the curb under your inside tire (check): on it or already wide? You adjust and look to the next reference. In blind corners you assess more: you can only plan as far as you can see.",
      exercise:
        "Pick a sector with two or three corners. For 8 laps, say «check» every time you assess. Log how many checks per lap. Goal: at least 4 conscious checks per sector without parking your eyes on the curb.",
    },
  },
  {
    slug: "mechanical-grip",
    titleEs: "Grip mecánico",
    titleEn: "Mechanical grip",
    brief: `# Brief: Grip mecánico

## Concepto
Grip por peso del coche sobre el asfalto (carga vertical), sin aero.

## Física
Más carga en el contacto → más fuerza de frenada posible, hasta saturar el compuesto.

## Ejemplo
Frenada lenta o coche sin alas: el techo es casi solo mecánico.

## Ejercicio
Umbral a baja velocidad vs media; compara % de pedal limpio.

## Errores típicos
- Pedir el mismo pico a cualquier velocidad
- Ignorar elevación y peralte
`,
    es: {
      concept:
        "El grip mecánico es la adherencia que viene del peso del coche empujando el neumático contra el asfalto. En plano es bastante estable. Con crestas, compresiones o peralte cambia mucho, aunque no haya alas.",
      why: "Para frenar necesitas fuerza entre goma y pista. Sin carga vertical no hay desaceleración limpia. Por eso el método «frena más tarde y reza» suele acabar en bloqueo: primero conviene encontrar el techo mecánico frenando duro en una referencia segura, y solo después mover esa referencia más adelante.",
      example:
        "De 90 a 0 km/h en una zona sin downforce relevante, el umbral se siente corto y constante. Si aplicas el mismo golpe que usarías a 250 km/h, saturas el eje delantero demasiado pronto. El techo mecánico no es el techo de alta velocidad.",
      exercise:
        "En la misma recta: 5 frenadas 90→0 buscando el umbral limpio, luego 5 de 160→80. Anota el % aproximado del pico en cada caso. Objetivo: dos techos conscientes, no un solo estilo de pedal para todas las velocidades.",
    },
    en: {
      concept:
        "Mechanical grip is the adhesion that comes from the car's weight pushing the tire into the asphalt. On flat ground it is fairly steady. Crests, compressions, or camber change it a lot—even with no wings.",
      why: "Braking needs force between rubber and track. Without vertical load there is no clean deceleration. That is why «brake later and hope» often ends in lockup: first find the mechanical ceiling by braking hard at a safe mark, then move that mark later.",
      example:
        "From 90 to 0 km/h in a low-aero zone, the threshold feels short and steady. Use the same hit you would at 250 km/h and you saturate the front axle too early. The mechanical ceiling is not the high-speed ceiling.",
      exercise:
        "On the same straight: 5 stops 90→0 hunting a clean threshold, then 5 from 160→80. Log approximate peak % in each case. Goal: two conscious ceilings, not one pedal style for every speed.",
    },
  },
  {
    slug: "aerodynamic-grip",
    titleEs: "Grip aerodinámico",
    titleEn: "Aerodynamic grip",
    brief: `# Brief: Grip aerodinámico

## Concepto
Carga extra del aire que crece con la velocidad y cae al frenar.

## Física
Más velocidad → más downforce → más grip; al desacelerar, ese soporte desaparece.

## Ejemplo
Monoplaza alado: pico altísimo al inicio; hay que soltar al bajar de velocidad.

## Ejercicio
Misma marca, dos velocidades de llegada; compara cuándo debes soltar.

## Errores típicos
- Mantener el pico de alta velocidad hasta el turn-in lento
`,
    es: {
      concept:
        "El grip aerodinámico es soporte extra: el aire empuja el coche hacia el suelo. Aumenta con la velocidad y se desvanece al frenar. No sustituye al mecánico: lo amplifica mientras vas rápido.",
      why: "Al inicio de una frenada rápida hay mucha carga; el neumático aguanta un pico alto. Conforme caes de velocidad, la aero deja de ayudar y el mismo % de pedal supera el límite mecánico. Por eso en coches de mucha carga el soltado no es opcional: el techo se mueve.",
      example:
        "Fórmula o GT con mucha ala: a 270 km/h el freno puede morder limpio cerca del 100%. Si mantienes ese 100% hasta 120 km/h, el eje delantero se satura. El pico y la presión terminal (al ir casi parado) pueden diferir muchísimo.",
      exercise:
        "Misma marca de frenada. Una llegada rápida y una más lenta. Busca el % máximo limpio en cada una y anota cuánto antes debes empezar a soltar en la llegada rápida. Dibuja mentalmente pico vs terminal.",
    },
    en: {
      concept:
        "Aerodynamic grip is extra support: air pushes the car into the ground. It rises with speed and fades as you brake. It does not replace mechanical grip—it amplifies it while you are fast.",
      why: "At the start of a fast stop there is lots of load; the tire takes a high peak. As speed drops, aero stops helping and the same pedal % exceeds the mechanical limit. On high-downforce cars release is mandatory: the ceiling moves.",
      example:
        "A high-wing formula or GT: at 270 km/h the brake can bite cleanly near 100%. Hold that 100% down to 120 km/h and the front saturates. Peak and terminal pressure (near a stop) can differ a lot.",
      exercise:
        "Same brake mark. One fast arrival and one slower. Find the maximum clean % in each and note how much earlier you must start releasing on the fast arrival. Sketch peak vs terminal in your head.",
    },
  },
  {
    slug: "low-vs-high-downforce-braking",
    titleEs: "Poca vs mucha carga al frenar",
    titleEn: "Low vs high downforce under braking",
    brief: `# Brief: Poca vs mucha carga al frenar

## Concepto
El perfil de presión cambia: poca aero = pico ≈ terminal; mucha aero = pico alto y soltado fuerte.

## Física
Con mucha carga el techo cae con la velocidad; con poca, el techo es más plano.

## Ejemplo
Turismo vs fórmula en la misma recta de boxes.

## Ejercicio
Dibuja dos curvas presión-tiempo tras sentir ambos perfiles (o ala alta/baja).

## Errores típicos
- Copiar el estilo de un coche a otro
- Soltar de más o de menos en alta carga
`,
    es: {
      concept:
        "No hay un único buen perfil de frenada. Con poca carga, el pico útil y la presión al ir casi parado se parecen: puedes mantener casi la misma fuerza. Con mucha carga, el pico es brutal al inicio y la presión terminal es mucho más baja: hay que soltar.",
      why: "La curva grip-vs-velocidad es distinta. Usar un perfil de fórmula en un callejero bloquea. Usar un perfil de turismo en un monoplaza te deja corto o te hace llegar al turn-in con el eje saturado. Reconocer el perfil es parte de leer el coche.",
      example:
        "Misma recta. En un turismo el pedal sube a un pico medio-alto y baja poco. En un coche alado sube cerca del máximo y empieza a caer mucho antes del mismo turn-in. El error típico en alta carga: soltar de más (te quedas bajo el límite) o soltar de menos (bloqueas tarde).",
      exercise:
        "Si puedes, dos coches o ala alta vs baja. Misma marca. Siente la forma del pedal. En papel dibuja dos trazas presión-tiempo. Objetivo: decir cuál es cuál sin mirar el setup de aero.",
    },
    en: {
      concept:
        "There is no single good brake profile. Low downforce: useful peak and near-stop pressure look similar—you can hold nearly the same force. High downforce: a brutal early peak and a much lower terminal—you must release.",
      why: "Grip-vs-speed is a different curve. A formula profile in a street car locks. A touring profile in an open-wheeler leaves you short or arrives at turn-in with a saturated axle. Reading the profile is part of reading the car.",
      example:
        "Same straight. In a touring car the pedal climbs to a medium-high peak and eases little. In a winged car it climbs near maximum and starts falling long before the same turn-in. Classic high-DF mistakes: release too much (under the limit) or too little (late lockup).",
      exercise:
        "If you can, two cars or high vs low wing. Same mark. Feel pedal shape. Sketch two pressure-time traces. Goal: tell which is which without looking at the aero setup.",
    },
  },
  {
    slug: "braking-to-a-stop",
    titleEs: "De recta a parada total",
    titleEn: "Straight line to a full stop",
    brief: `# Brief: De recta a parada total

## Concepto
Laboratorio del umbral: pico limpio en recta, sin girar.

## Física
Todo el círculo de adherencia disponible en longitudinal.

## Ejemplo
Recta de boxes, volante a 0°, freno hasta parado o casi.

## Ejercicio
10 paradas; busca pico repetible sin bloqueo.

## Errores típicos
- Empezar frenando más tarde en vez de más duro
- Meter dirección «para estabilizar»
`,
    es: {
      concept:
        "Frenar en recta hasta parar (o casi) es el laboratorio del umbral: sin curva, sin trail, solo presión. Si no puedes repetir un pico limpio aquí, no lo tendrás en el turn-in. Primero el techo; después mueves la referencia.",
      why: "El error habitual es frenar más tarde y luego pelear. Mejor: misma marca segura, más duro, hasta sentir el límite longitudinal. El miedo bloquea el aprendizaje; el bloqueo o el ABS temprano matan el flujo de la sesión. En recta aíslas la variable.",
      example:
        "Entras a 180 km/h en la recta de boxes, volante a cero, y buscas la máxima desaceleración sin bloqueo. En poca carga, el pico puede parecerse a la presión terminal. En mucha carga, el pico es alto y luego debes soltar aunque no gires.",
      exercise:
        "Diez paradas o reducciones fuertes desde la misma velocidad. Anota bloqueo/ABS (sí/no) y el % del pico limpio. Meta: 8 de 10 sin bloqueo y variación de pico menor al 10 por ciento. Luego, solo entonces, prueba a mover la marca un poco más tarde.",
    },
    en: {
      concept:
        "Straight-line braking to a stop (or nearly) is the threshold lab: no corner, no trail, only pressure. If you cannot repeat a clean peak here, you will not have it at turn-in. Ceiling first; move the mark later.",
      why: "The usual mistake is braking later then fighting. Better: same safe mark, harder, until you feel the longitudinal limit. Fear blocks learning; early lockup or ABS kills session flow. On a straight you isolate the variable.",
      example:
        "You arrive at 180 km/h on the pit straight, wheel at zero, and hunt maximum deceleration without lockup. Low DF: peak may look like terminal. High DF: peak is high, then you must release even without turning.",
      exercise:
        "Ten full stops or hard slows from the same speed. Log lockup/ABS (yes/no) and clean peak %. Goal: 8 of 10 with no lockup and peak variation under 10 percent. Only then try moving the mark a little later.",
    },
  },
  {
    slug: "press-less",
    titleEs: "Técnica Press Less",
    titleEn: "Press Less technique",
    brief: `# Brief: Técnica Press Less

## Concepto
Suelta el freno dejando de empujar (músculos «abajo»), no levantando el pie.

## Física
El pedal vuelve solo; al «press less» controlas el release con precisión.

## Ejemplo
100 → 99 → 98… sintiendo relajar el mismo grupo muscular.

## Ejercicio
Release ultra lento primero; luego acelera la velocidad del soltado.

## Errores típicos
- Pensar en «levantar» el pie
- Soltar en un escalón por pánico
`,
    es: {
      concept:
        "Press Less es soltar el freno sin «levantar» el pie. Sigues empujando, pero cada vez menos: 100, 99, 98… El pedal tiene resistencia; si dejas de empujar tanto, sube solo. Usas solo el grupo muscular que empuja hacia abajo, no el que levanta.",
      why: "La mayoría pierde precisión porque piensa en quitar el pie. Eso da un escalón brusco. Press Less entrena sensibilidad: primero un soltado ridículamente lento; cuando lo controlas, acelerar el release es fácil. Así decides qué hacer con el freno, no si eres capaz de soltarlo.",
      example:
        "Tras el pico en recta, en vez de arrancar el pie, relajas el mismo empujón milímetro a milímetro. En un coche de mucha carga esto evita soltar de más (quedarte flojo) o de menos (bloquear tarde). También evita cambios constantes que ensucian la referencia de frenada.",
      exercise:
        "Ocho frenadas: pico al 100% (o al máximo limpio) y release consciente lo más lento posible durante al menos 2 segundos. Luego ocho con release más rápido pero igual de suave. Anota cuántas tuvieron un escalón. Meta: cero escalones en el segundo bloque.",
    },
    en: {
      concept:
        "Press Less means releasing the brake without «lifting» the foot. You keep pressing, just less and less: 100, 99, 98… The pedal has resistance; press less and it rises on its own. Use only the push-down muscle group, not the lift group.",
      why: "Most drivers lose precision because they think about taking the foot off. That creates a harsh step. Press Less builds feel: first a ridiculously slow release; once you own that, speeding the release up is easy. You decide what to do with the brake, not whether you can release it.",
      example:
        "After the peak on a straight, instead of snatching the foot away, you ease the same push millimeter by millimeter. On a high-DF car this avoids releasing too much (going soft) or too little (late lockup). It also stops constant adjustments that muddy the braking reference.",
      exercise:
        "Eight stops: peak at 100% (or max clean) and a conscious release as slow as possible for at least 2 seconds. Then eight with a faster but equally smooth release. Log how many had a step. Goal: zero steps in the second block.",
    },
  },
  {
    slug: "compressions-crests-bumps",
    titleEs: "Compresiones, crestas y baches",
    titleEn: "Compressions, crests, and bumps",
    brief: `# Brief: Compresiones, crestas y baches

## Concepto
La elevación cambia el grip: compresión = más; cresta = menos.

## Física
Sin carga vertical el umbral cae; hay que adaptar la presión en vivo.

## Ejemplo
Frenada que sube, cruza una cresta y baja (tipo Corkscrew).

## Ejercicio
Marca una cresta; suelta 10–20% al pasar y recupera después.

## Errores típicos
- Tratar toda la zona como grip constante
- Bloquear en el bache por no modular
`,
    es: {
      concept:
        "En plano el umbral es una línea. Con elevación, baila. Compresión: el asfalto «empuja» el coche y puedes frenar más duro. Cresta: el asfalto se aleja y el umbral cae. Baches y parches hacen lo mismo a escala pequeña.",
      why: "La presión óptima no es un número fijo para toda la zona. Si mantienes el pico en una cresta, bloqueas. Si no aprovechas una compresión, dejas grip en la mesa. Frenar es un input activo: lees la carga y ajustas, no un interruptor.",
      example:
        "Una frenada ciega que sube, pasa por una cresta y luego baja. En la cresta el volante se pone ligero: sueltas un poco. Al recuperar apoyo puedes volver a subir presión antes del giro. La traza de freno deja de ser un triángulo limpio: tiene valles y picos.",
      exercise:
        "Identifica una cresta o bache en tu zona de frenada. Diez repeticiones: reduce entre un 10 y un 20 por ciento al pasar y recupera después. Compara bloqueos con cinco repeticiones «planas». Meta: menos bloqueos con el ajuste consciente.",
    },
    en: {
      concept:
        "On flat ground the threshold is a line. With elevation it dances. Compression: the road «pushes» the car and you can brake harder. Crest: the road falls away and the threshold drops. Bumps and patches do the same at small scale.",
      why: "Optimal pressure is not one number for the whole zone. Hold the peak over a crest and you lock. Miss a compression and you leave grip on the table. Braking is an active input: read load and adjust—not a switch.",
      example:
        "A blind braking zone that climbs, crosses a crest, then drops. On the crest the wheel goes light—you ease. When support returns you can rebuild pressure before turn-in. The brake trace stops being a clean triangle: it has valleys and peaks.",
      exercise:
        "Find a crest or bump in your braking zone. Ten reps: cut 10 to 20 percent across it, then rebuild. Compare lockups with five «flat» reps. Goal: fewer lockups with the conscious adjustment.",
    },
  },
  {
    slug: "initial-to-peak-pressure",
    titleEs: "Presión inicial, pico y referencias",
    titleEn: "Initial pressure, peak, and references",
    brief: `# Brief: Presión inicial, pico y referencias

## Concepto
Separar inicio del freno y pico; anclar cada uno a una marca visual.

## Física
Un ramp-up lento mueve el pico decenas de metros y mata la consistencia.

## Ejemplo
Cartel = inicio; sombra = pico; piano = turn-in.

## Ejercicio
10 frenadas con orden fijo inicio→pico→giro.

## Errores típicos
- «Patear» el pedal
- Usar una sola marca sin saber si es inicio o pico
`,
    es: {
      concept:
        "La frenada tiene fases: contacto inicial, pico (máxima presión útil) y release. Quieres llegar al pico rápido, pero con control: primero tocas el pedal y luego aprietas (squeeze), no lo pateas. Cada fase necesita una referencia clara.",
      why: "Entre el inicio y el pico el coche sigue avanzando metros. Si el ramp-up es lento o irregular, tu «marca de 150 m» a veces es el inicio y a veces el pico. La velocidad de entrada cambia cada vuelta. Coches ligeros y rígidos toleran un squeeze más rápido; pesados y blandos, un poco más lento… pero siempre medido en «parpadeos», no en media recta.",
      example:
        "Decides: cartel = inicio, sombra del puente = pico, fin del piano = turn-in. Aunque el tráfico cambie, la forma de la frenada se mantiene. Si mezclas inicio y pico en la misma marca, nunca sabrás qué estás midiendo.",
      exercise:
        "Elige tres marcas. Diez frenadas cumpliendo el orden: inicio en 1, pico en 2, giro en 3. Si mezclas el orden, no cuenta. Meta: 8 de 10 en secuencia correcta, con pico dentro de un margen estrecho de %.",
    },
    en: {
      concept:
        "Braking has phases: initial contact, peak (maximum useful pressure), and release. You want the peak quickly but under control: touch the pedal first, then squeeze—do not kick it. Each phase needs a clear reference.",
      why: "Between onset and peak the car still covers meters. If the ramp-up is slow or inconsistent, your «150 m mark» is sometimes onset and sometimes peak. Entry speed changes every lap. Light, stiff cars accept a quicker squeeze; heavy, soft cars a slightly slower one—but still measured in «blinks», not half a straight.",
      example:
        "You decide: board = onset, bridge shadow = peak, end of curb = turn-in. Even when traffic changes, the brake shape holds. If you mix onset and peak on the same mark, you never know what you are measuring.",
      exercise:
        "Pick three marks. Ten stops in order: onset at 1, peak at 2, turn-in at 3. Wrong order does not count. Goal: 8 of 10 correct sequence, with peak inside a tight % band.",
    },
  },
  {
    slug: "light-hands-under-braking",
    titleEs: "Manos ligeras al frenar",
    titleEn: "Light hands under braking",
    brief: `# Brief: Manos ligeras al frenar

## Concepto
Al frenar duro, manos relajadas: el coche se equilibra solo en lateral.

## Física
Agarre fuerte mete ángulo residual y roba grip longitudinal.

## Ejemplo
Asociación: pico de freno = manos ligeras, al mismo tiempo.

## Ejercicio
10 frenadas en recta; falla si aprietas el aro o giras de más.

## Errores típicos
- Death grip en el volante
- Seguir girando al empezar a frenar
`,
    es: {
      concept:
        "El mejor freno ocurre en recta, con el coche equilibrado izquierda-derecha. Manos ligeras dejan que el volante se autocentre y que el tren delantero se adapte a microbaches. Manos de hierro meten 1–2° de dirección sin que te des cuenta y matan el pico.",
      why: "El círculo de adherencia es limitado: 100% freno implica casi 0% giro. Si aprietas el aro, introduces fuerza lateral y dejas de estar al 50/50. Además filtras el feedback. La regla mental es: freno duro y manos ligeras a la vez, desde el inicio del pico hasta empezar el turn-in (y el giro se añade progresivo, no de golpe).",
      example:
        "Vienes de una curva y frenas. Si mantienes el mismo ángulo de volante al clavar el freno, bloqueas o desequilibras. Primero aligeras manos y enderezas; luego construyes el pico. En baches, las manos flojas dejan que el coche «baile» un poco y conserve el equilibrio lateral.",
      exercise:
        "Diez frenadas en recta con agarre bajo (subjetivo 3/10). Si aprietas el aro o giras más de unos pocos grados, esa repetición falla. Meta: 8 de 10 exitosas. Luego asocia en voz alta: «freno — manos ligeras» en cada pico.",
    },
    en: {
      concept:
        "Peak braking happens in a straight line with the car balanced left-right. Light hands let the wheel self-center and the front end adapt to small bumps. Iron hands sneak in 1–2° of lock and kill the peak.",
      why: "The grip circle is limited: 100% brake means almost 0% turn. Squeeze the rim and you add lateral force and leave 50/50 balance. You also filter feedback. Mental rule: hard brake and light hands together, from peak onset until turn-in starts (then add steering progressively, not as a slap).",
      example:
        "You exit a corner and brake. If you keep the same steering angle as you hit the brakes, you lock or unsettle. First lighten the hands and straighten; then build the peak. Over bumps, soft hands let the car «dance» a little and keep lateral balance.",
      exercise:
        "Ten straight-line stops with a light grip (subjective 3/10). If you squeeze the rim or steer more than a few degrees, that rep fails. Goal: 8 of 10. Then say aloud each peak: «brake — light hands».",
    },
  },
  {
    slug: "engine-braking-interference",
    titleEs: "Freno motor e interferencia",
    titleEn: "Engine braking interference",
    brief: `# Brief: Freno motor e interferencia

## Concepto
El freno motor suma frenada solo en el eje motriz y mueve el bias efectivo.

## Física
RWD: más efecto atrás al bajar marcha. FWD: más estrés delante.

## Ejemplo
Downshift temprano a 2ª en entrada: zaga nerviosa (RWD) o morro saturado (FWD).

## Ejercicio
Misma curva: downshift temprano vs tardío; elige el más estable.

## Errores típicos
- Ignorar el eje motriz
- Blip inconsistente
`,
    es: {
      concept:
        "El pedal reparte frenada según el bias (por ejemplo 55/45). El freno motor añade otra capa: actúa solo en las ruedas motrices, como un freno ligero extra. No vas en punto muerto al frenar; ese efecto siempre está.",
      why: "En RWD, bajar marcha pronto es como meter más freno atrás: puede rotar o poner nerviosa la zaga. En FWD, carga aún más el eje que también dirige. El bias «de etiqueta» ya no es el bias real. Controlar cuándo haces el downshift es parte del equilibrio de la frenada y de la entrada.",
      example:
        "Curva de 3ª a 2ª en un RWD. Si clavas 2ª muy pronto, la zaga se inquieta antes del trail. Si retrasas el cambio con un blip limpio, el pico de freno se siente más predecible. En FWD, el mismo downshift temprano puede empujar el morro o saturar el eje delantero bajo frenada.",
      exercise:
        "Misma curva y misma marca de freno. Cinco entradas con downshift temprano y cinco con downshift justo antes del turn-in (blip consistente). Anota en cuál el coche empuja o gira de más. Quédate con la opción más estable al 95% de ritmo.",
    },
    en: {
      concept:
        "The pedal splits braking by bias (e.g. 55/45). Engine braking adds another layer: it acts only on the driven wheels, like light extra braking. You are not in neutral when you brake; that effect is always there.",
      why: "In RWD, an early downshift is like adding rear brake: it can rotate or unsettle the rear. In FWD, it loads the axle that also steers even more. Label bias is no longer real bias. Timing the downshift is part of braking and entry balance.",
      example:
        "A 3rd-to-2nd corner in a RWD car. Stab 2nd too early and the rear gets nervous before trail. Delay the shift with a clean blip and the brake peak feels more predictable. In FWD, the same early downshift can push the nose or saturate the front under braking.",
      exercise:
        "Same corner and brake mark. Five entries with an early downshift and five with the downshift just before turn-in (consistent blip). Note which one pushes or rotates too much. Keep the more stable option at 95% pace.",
    },
  },
];

function mdxFile(title: string, slug: string, sections: Sections): string {
  return `---
title: ${JSON.stringify(title)}
part: ${part}
slug: ${slug}
status: published
sections:
  - what
  - why
  - example
  - exercise
---

<Concept>
${sections.concept}
</Concept>

<Why>
${sections.why}
</Why>

<Example>
${sections.example}
</Example>

<Exercise>
${sections.exercise}
</Exercise>
`;
}

async function main() {
  const root = process.cwd();
  for (const lesson of lessons) {
    const briefPath = path.join(root, "content", "briefs", part, `${lesson.slug}.md`);
    const esPath = path.join(root, "content", "es", "lessons", part, `${lesson.slug}.mdx`);
    const enPath = path.join(root, "content", "en", "lessons", part, `${lesson.slug}.mdx`);

    await fs.writeFile(briefPath, lesson.brief.trimStart(), "utf8");
    await fs.writeFile(esPath, mdxFile(lesson.titleEs, lesson.slug, lesson.es), "utf8");
    await fs.writeFile(enPath, mdxFile(lesson.titleEn, lesson.slug, lesson.en), "utf8");
    console.log(`published ${part}/${lesson.slug}`);
  }
  console.log(`Done: ${lessons.length} Module I lessons`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

/**
 * Writes published briefs + MDX (ES master, EN translation) for foundations + braking.
 * Overwrites existing shell files for these lessons only.
 *
 * Usage: npx tsx scripts/publish-batch-1.ts
 */
import fs from "node:fs/promises";
import path from "node:path";

type LessonContent = {
  part: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  brief: string;
  es: { concept: string; why: string; example: string; exercise: string };
  en: { concept: string; why: string; example: string; exercise: string };
};

const lessons: LessonContent[] = [
  {
    part: "foundations",
    slug: "learning-vs-practicing",
    titleEs: "Aprender vs practicar",
    titleEn: "Learning vs practicing",
    brief: `# Brief: Aprender vs practicar

## Concepto
Aprender es cambiar un input a propósito; practicar es repetir lo que ya sabes.

## Física
Sin foco, la memoria muscular congela el error. Con foco, el neumático y el tiempo de vuelta se usan como feedback.

## Ejemplo
Diez vueltas en una horquilla midiendo solo el punto de turn-in, no el tiempo de sector.

## Ejercicio
3 bloques de 5 vueltas: (1) solo turn-in, (2) solo presión de freno, (3) combinar. Anota el objetivo de cada bloque.

## Errores típicos
- Dar vueltas "para calentar" sin objetivo
- Cambiar tres cosas a la vez
`,
    es: {
      concept:
        "Aprender es forzar un cambio concreto en cómo conduces. Practicar es repetir un patrón que ya conoces. Ambos hacen falta, pero en momentos distintos: si solo practicas, fijas el nivel actual; si solo aprendes sin repetición, no automatizas.",
      why: "El coche responde a lo que tus manos y pies ya saben hacer. Si entrenas sin objetivo, refuerzas el mismo timing de freno y el mismo ángulo de volante. Cuando eliges una variable (punto de frenada, suavidad del gas), el feedback del grip y del tiempo te dice si el cambio funciona.",
      example:
        "En una horquilla de 90° con buena referencia visual, decides que hoy solo estudias el turn-in: misma velocidad de entrada, mismo % de freno, y mueves el giro medio metro antes o después. El resto de la pista lo conduces en piloto automático.",
      exercise:
        "Elige una curva. Haz 5 vueltas midiendo solo el punto de turn-in (marca en el bordillo). Otras 5 solo la presión máxima de freno (0–100%). Otras 5 combinando ambos. Anota qué bloque bajó el tiempo de sector. No mires el tiempo de vuelta completa hasta el final.",
    },
    en: {
      concept:
        "Learning means deliberately changing one input. Practicing means repeating a pattern you already know. You need both, but at different times: practice alone freezes your current level; learning alone without repetition never becomes automatic.",
      why: "The car answers what your hands and feet already know how to do. Aimless laps reinforce the same brake timing and steering angle. When you isolate one variable (braking point, throttle smoothness), grip and sector time tell you whether the change works.",
      example:
        "On a 90° hairpin with a clear visual mark, you decide today is only about turn-in: same entry speed, same brake pressure, and you move the steer half a meter earlier or later. Everywhere else you drive on autopilot.",
      exercise:
        "Pick one corner. Do 5 laps measuring only turn-in (curb mark). 5 more only peak brake pressure (0–100%). 5 more combining both. Note which block lowered sector time. Do not look at full lap time until the end.",
    },
  },
  {
    part: "foundations",
    slug: "efficiency-and-habits",
    titleEs: "Eficiencia y hábitos",
    titleEn: "Efficiency and habits",
    brief: `# Brief: Eficiencia y hábitos

## Concepto
La memoria muscular acelera lo bueno y también lo malo; diseña hábitos a propósito.

## Física
Inputs repetidos bajo carga crean patrones. Un hábito de manos tensas reduce información del neumático delantero.

## Ejemplo
Siempre aprietas el volante al pico de freno: el morro se carga y tú dejas de sentir microcorrecciones.

## Ejercicio
10 frenadas en recta con checklist: hombros bajos, agarre 4/10, mirada lejos.

## Errores típicos
- Corregir con más fuerza en vez de menos
- Hablar de "sensación" sin un checklist
`,
    es: {
      concept:
        "La memoria muscular no distingue técnica buena de mala: solo repite. La eficiencia es diseñar hábitos que te den más información por metro recorrido, no más esfuerzo.",
      why: "Bajo frenada y apoyo, el cuerpo se pone rígido por defecto. Manos tensas filtran las vibraciones del neumático; hombros altos retrasan las correcciones. Un hábito limpio (agarre ligero, mirada lejos) deja que el coche te hable antes de que pidas más dirección.",
      example:
        "Notas que en cada pico de freno aprietas el volante. El coche sigue recto, pero llegas al turn-in sin haber sentido el umbral. El hábito pelea el coche en vez de leerlo.",
      exercise:
        "En una recta larga, 10 frenadas a parada o a 40 km/h. Antes de cada una di en voz alta: hombros abajo, agarre 4/10, mirada al horizonte. Si fallas el checklist, esa repetición no cuenta. Anota cuántas de 10 cumpliste.",
    },
    en: {
      concept:
        "Muscle memory does not judge good vs bad technique—it only repeats. Efficiency means designing habits that give you more information per meter, not more effort.",
      why: "Under braking and load, the body goes stiff by default. Tight hands filter tire vibration; high shoulders delay corrections. A clean habit (light grip, eyes far) lets the car speak before you ask for more steering.",
      example:
        "You notice that at every brake peak you squeeze the wheel. The car stays straight, but you arrive at turn-in without feeling the threshold. The habit fights the car instead of reading it.",
      exercise:
        "On a long straight, 10 stops or slows to 40 km/h. Before each one say aloud: shoulders down, grip 4/10, eyes on the horizon. If you miss the checklist, that rep does not count. Log how many of 10 you hit.",
    },
  },
  {
    part: "foundations",
    slug: "ego-and-discomfort",
    titleEs: "Ego y incomodidad",
    titleEn: "Ego and discomfort",
    brief: `# Brief: Ego y incomodidad

## Concepto
El ego pide tiempo de vuelta; el aprendizaje pide incomodidad controlada.

## Física
Ir al 100% de tu límite actual cierra el margen para experimentar con rotación y presión.

## Ejemplo
Bajas 0,3 s con un setup nuevo y te niegas a probar trail más profundo porque "ya eres rápido".

## Ejercicio
Una sesión entera 95% de ritmo, un solo objetivo técnico, sin mirar ranking.

## Errores típicos
- Abandonar un drill porque el tiempo sube
- Compararte con un ghost más rápido a mitad de aprendizaje
`,
    es: {
      concept:
        "El ego quiere el mejor tiempo ahora. Aprender exige bajar un poco el ritmo para meter una técnica nueva. La incomodidad útil es la de no saber aún; la tóxica es pelear el coche para no «perder» una vuelta.",
      why: "Al 100% de tu límite actual no queda agarre mental ni físico para variar el trail o el ángulo. Necesitas margen de grip y de atención. Ese margen se compra bajando el ritmo a propósito, no esperando a «sentirte listo».",
      example:
        "Llevas media sesión siendo el más rápido del lobby. Introduces Press Less y pierdes 0,4 s. El ego quiere volver al estilo viejo. Si lo haces, nunca automatizas el nuevo pico de freno.",
      exercise:
        "Una sesión de 20 minutos a ~95% de tu ritmo habitual. Un solo objetivo (por ejemplo: manos más ligeras al frenar). Prohibido mirar el ranking o el ghost. Al final, solo anotas si cumpliste el objetivo en 8 de 10 vueltas.",
    },
    en: {
      concept:
        "Ego wants the best time now. Learning needs a slightly lower pace to install a new technique. Useful discomfort is not knowing yet; toxic discomfort is fighting the car so you do not «lose» a lap.",
      why: "At 100% of your current limit there is no mental or physical grip left to vary trail or angle. You need grip and attention margin. That margin is bought by deliberately slowing down—not by waiting until you «feel ready».",
      example:
        "Half a session you are fastest in the lobby. You introduce Press Less and lose 0.4 s. Ego wants the old style back. If you quit, you never automate the new brake peak.",
      exercise:
        "One 20-minute session at ~95% of your usual pace. One goal only (e.g. lighter hands under braking). No ranking or ghost. At the end, only log whether you hit the goal on 8 of 10 laps.",
    },
  },
  {
    part: "foundations",
    slug: "fitness-and-small-changes",
    titleEs: "Forma física y +1%",
    titleEn: "Fitness and +1%",
    brief: `# Brief: Forma física y +1%

## Concepto
Mente y cuerpo al límite: el +1% diario compone más que un fin de semana heroico.

## Física
Fatiga → inputs tardíos → correcciones agresivas → más fatiga.

## Ejemplo
Tras 40 minutos sin pausa, el pie de freno llega 5 m tarde en la misma curva.

## Ejercicio
Bloques de 15 min + 3 min de pausa; un micro-objetivo por bloque (+1%).

## Errores típicos
- Sesiones maratón sin foco
- Cambiar setup y técnica el mismo día
`,
    es: {
      concept:
        "Ir rápido de forma sostenible exige cuerpo y cabeza que aguanten el límite. El +1% es un cambio pequeño por sesión que se acumula: mejor que un domingo de seis horas sin método.",
      why: "La fatiga retrasa el pie de freno y endurece las manos. Eso genera correcciones grandes, que gastan más energía. El ciclo se rompe con pausas y con objetivos mínimos que puedas cumplir incluso cansado.",
      example:
        "Misma chicane, misma marca. A los 40 minutos seguidos frenadas 5 m más tarde y el volante «tira». No es el setup: es el sistema nervioso pidiendo menos precisión.",
      exercise:
        "Tres bloques de 15 minutos con 3 minutos de pausa. Cada bloque un +1% distinto (mirada más lejos / pico de freno más limpio / gas más lineal). Anota un sí/no por bloque. No acumules más de dos cambios técnicos en el mismo día.",
    },
    en: {
      concept:
        "Sustainable speed needs a body and mind that can hold the limit. The +1% is one small change per session that compounds—better than a six-hour Sunday with no method.",
      why: "Fatigue delays the brake foot and hardens the hands. That creates big corrections, which burn more energy. Break the loop with rests and with tiny goals you can still hit when tired.",
      example:
        "Same chicane, same mark. After 40 straight minutes you brake 5 m later and the wheel «pulls». It is not the setup—it is the nervous system asking for less precision.",
      exercise:
        "Three 15-minute blocks with 3-minute rests. Each block a different +1% (eyes farther / cleaner brake peak / more linear throttle). Log yes/no per block. Do not stack more than two technique changes on the same day.",
    },
  },
  {
    part: "foundations",
    slug: "testing-new-techniques",
    titleEs: "Probar técnicas nuevas",
    titleEn: "Testing new techniques",
    brief: `# Brief: Probar técnicas nuevas

## Concepto
Introduce una técnica con protocolo: baseline → cambio → comparar → decidir.

## Física
Sin baseline, no sabes si el grip o el reloj mejoró por el cambio o por suerte.

## Ejemplo
Pruebas trail más profundo en una curva sin haber medido 5 vueltas de control.

## Ejercicio
5 vueltas baseline, 8 con el cambio, 3 de vuelta al estilo viejo; decide con datos.

## Errores típicos
- Cambiar y olvidar el estilo anterior
- Juzgar en una sola vuelta limpia
`,
    es: {
      concept:
        "Probar una técnica no es «hoy conduzco distinto». Es un experimento: midęs un baseline, aplicas un solo cambio, comparas y decides si se queda.",
      why: "El grip y el tráfico meten ruido. Sin vueltas de control, atribuyes al azar o al ego el resultado. El protocolo aísla la variable (por ejemplo, presión terminal de trail) del resto de la conducción.",
      example:
        "Quieres soltar el freno más tarde en una curva de media velocidad. Si empiezas a soltar tarde sin baseline, no sabrás si el subviraje nuevo viene del trail o de haber entrado 3 km/h más rápido.",
      exercise:
        "Elige una curva y una métrica (tiempo de sector o velocidad mínima). 5 vueltas baseline con tu estilo actual. 8 vueltas con un solo cambio. 3 vueltas volviendo al estilo viejo. Quédate con el cambio solo si gana en media, no en la mejor vuelta suelta.",
    },
    en: {
      concept:
        "Testing a technique is not «today I drive differently». It is an experiment: measure a baseline, apply one change, compare, and decide whether it stays.",
      why: "Grip and traffic add noise. Without control laps you credit luck or ego. The protocol isolates the variable (e.g. terminal trail pressure) from the rest of your driving.",
      example:
        "You want to release the brake later in a medium-speed corner. If you start releasing late with no baseline, you will not know whether new understeer comes from trail or from carrying 3 km/h more entry speed.",
      exercise:
        "Pick one corner and one metric (sector time or minimum speed). 5 baseline laps in your current style. 8 laps with one change only. 3 laps back to the old style. Keep the change only if it wins on average—not on a single purple lap.",
    },
  },
  {
    part: "foundations",
    slug: "posture",
    titleEs: "Postura",
    titleEn: "Posture",
    brief: `# Brief: Postura

## Concepto
La postura decide qué sientes y qué tan rápido puedes corregir.

## Física
Brazos demasiado doblados o estirados cambian el torque que aplicas al volante y la lectura del neumático.

## Ejemplo
Asiento lejos: en el apex tiras del volante hacia ti y metes oversteer de entrada.

## Ejercicio
Ajuste: muñecas sobre la corona con brazos casi rectos; pedales a presión completa sin despegar la espalda.

## Errores típicos
- Copiar la postura de un streamer sin probar
- Subir el asiento "para ver mejor" y perder apoyo lumbar
`,
    es: {
      concept:
        "La postura no es estética: es el canal por el que llega la información del coche y la vía por la que sales las correcciones. Si te sientas mal, todo lo demás se entrena torcido.",
      why: "Brazos muy flexionados exageran el ángulo de dirección; muy extendidos te hacen tirar del volante. Sin apoyo firme en el asiento, el cuerpo se convierte en amortiguador y filtra los mensajes del eje delantero bajo frenada.",
      example:
        "Asiento demasiado lejos: en una curva cerrada acercas el torso y tiras. El coche gira de más justo cuando necesitabas manos ligeras. Parece oversteer «del setup»; es geometría de tu cuerpo.",
      exercise:
        "Ajusta hasta poder apoyar las muñecas sobre la corona con los hombros pegados al asiento y los brazos casi rectos. Pisa freno a fondo sin que la espalda se despegue. Da 5 vueltas solo notando si el volante «pesa» menos en el pico de freno. Anota sí/no.",
    },
    en: {
      concept:
        "Posture is not cosmetics: it is the channel for car information and the path for corrections. Sit poorly and everything else trains crooked.",
      why: "Very bent arms exaggerate steering angle; over-stretched arms make you pull the wheel. Without firm seat support, your body becomes a damper and filters front-axle messages under braking.",
      example:
        "Seat too far: in a tight corner you lean in and pull. The car rotates too much exactly when you needed light hands. It feels like setup oversteer; it is your body geometry.",
      exercise:
        "Adjust until you can rest your wrists on the rim with shoulders on the seat and arms almost straight. Floor the brake without your back leaving the seat. Drive 5 laps only noticing whether the wheel «weighs» less at brake peak. Log yes/no.",
    },
  },
  {
    part: "foundations",
    slug: "pedals-and-braking-seat",
    titleEs: "Pedales y asiento al frenar",
    titleEn: "Pedals and the braking seat",
    brief: `# Brief: Pedales y asiento al frenar

## Concepto
El asiento es el ancla del pie de freno; sin ancla, la presión baila.

## Física
Si el cuerpo se desliza, el pie modula sin querer y nunca alcanzas un pico repetible.

## Ejemplo
Talón inestable: el pico de freno llega tarde y con un segundo empujón.

## Ejercicio
10 frenadas; objetivo: un solo ramp-up a X% sin «doble bomba».

## Errores típicos
- Talón en el aire
- Usar el freno para «sujetarte» en el asiento
`,
    es: {
      concept:
        "Bajo frenada fuerte, el asiento debe sujetarte para que el pie solo piense en presión. Si te sujetas con el pedal, la dosificación deja de ser limpia.",
      why: "La transferencia de peso al eje delantero es predecible solo si el input de freno es predecible. Un cuerpo que se desliza introduce un segundo impulso en el pedal: el neumático ve dos picos en vez de uno.",
      example:
        "En una recta de alta velocidad, tu talón flota. Llegas al 80%, te recolocas, y das otro empujón al 95%. El ABS (o el bloqueo sim) aparece en el segundo pico, no en el primero.",
      exercise:
        "10 frenadas en recta hasta ~40 km/h. Meta: un solo ramp-up continuo hasta un % elegido (p. ej. 90) sin doble bomba. Cuenta cuántas de 10 fueron limpias. Si fallas más de 3, acerca el asiento o sube el apoyo lumbar antes de seguir.",
    },
    en: {
      concept:
        "Under hard braking the seat must hold you so the foot only thinks about pressure. If you brace on the pedal, metering stops being clean.",
      why: "Weight transfer to the front axle is predictable only if the brake input is predictable. A sliding body adds a second shove on the pedal: the tire sees two peaks instead of one.",
      example:
        "On a high-speed straight your heel floats. You hit 80%, reshape, then shove to 95%. ABS (or sim lockup) appears on the second peak, not the first.",
      exercise:
        "10 straight-line slows to ~40 km/h. Goal: one continuous ramp to a chosen % (e.g. 90) with no double pump. Count how many of 10 are clean. If you miss more than 3, move the seat closer or raise lumbar support before continuing.",
    },
  },
  {
    part: "foundations",
    slug: "steering-wheel-setup",
    titleEs: "Volante y agarre",
    titleEn: "Steering wheel and grip",
    brief: `# Brief: Volante y agarre

## Concepto
Altura, ángulo y fuerza de agarre definen si «peleas» o «lees» el coche.

## Física
Agarre 9/10 oculta el feedback del neumático; el FFB se vuelve ruido.

## Ejemplo
Giro de 90° con manos a las 10 y 2 apretando: contravolante lento y exagerado.

## Ejercicio
Misma curva 8 vueltas: agarre 3/10 vs 7/10; anota cuál corrige oversteer antes.

## Errores típicos
- Volante demasiado bajo «estilo F1» sin probar
- Cambiar FFB en vez de soltar las manos
`,
    es: {
      concept:
        "El volante debe dejarte girar sin encogerte y sin aplastar el aro. La fuerza de agarre es parte del setup del piloto: demasiado fuerte, dejas de sentir; demasiado flojo, pierdes precisión.",
      why: "El neumático delantero habla por fuerza y vibración. Si tus manos aplastan el rim, ese mensaje se pierde y respondes tarde. Manos ligeras adelantan el contravolante y reducen el ángulo total que necesitas.",
      example:
        "Curva de media velocidad donde el coche suele empujar la zaga a mitad de apoyo. Con agarre 9/10 el contravolante llega después del pico de yaw. Con 4/10 lo pillas antes y con menos grados.",
      exercise:
        "Misma curva, 4 vueltas agarre ~3/10 y 4 vueltas ~7/10 (escala subjetiva). Anota en cuál detectas antes el inicio de oversteer. Quédate con el valor más bajo que aún te dé precisión en el apex.",
    },
    en: {
      concept:
        "The wheel should let you turn without crouching or crushing the rim. Grip force is part of the driver setup: too hard and you stop feeling; too soft and you lose precision.",
      why: "The front tire speaks through force and vibration. If your hands crush the rim, that message dies and you answer late. Light hands bring countersteer earlier and cut the total angle you need.",
      example:
        "A medium-speed corner where the rear often steps at mid-load. At grip 9/10 countersteer arrives after peak yaw. At 4/10 you catch it earlier with fewer degrees.",
      exercise:
        "Same corner, 4 laps at ~3/10 grip and 4 at ~7/10 (subjective scale). Note which one lets you feel oversteer onset sooner. Keep the lowest value that still gives apex precision.",
    },
  },
  // --- BRAKING ---
  {
    part: "braking",
    slug: "planning-vision",
    titleEs: "Visión de planificación",
    titleEn: "Planning vision",
    brief: `# Brief: Visión de planificación

## Concepto
Mirar lejos para decidir frenada y turn-in antes de llegar.

## Física
Si miras el morro, reaccionas tarde; el input llega cuando el grip ya está comprometido.

## Ejemplo
En una recta a 250 km/h miras la marca de 100 m, no el capó.

## Ejercicio
5 vueltas nombrando en voz alta la siguiente referencia 2 s antes de usarla.

## Errores típicos
- Mirar el apex desde demasiado lejos sin checkpoints
- Olvidar la salida al planificar la entrada
`,
    es: {
      concept:
        "La visión de planificación es elegir referencias con antelación: dónde frenarás, dónde girarás y hacia dónde saldrás. No es «mirar bonito»; es programar inputs.",
      why: "A alta velocidad, el tiempo entre ver y actuar se come metros. Si fijas la mirada en el capó o en el apex demasiado pronto, improvisas la presión de freno. Planificar mueve la decisión a una zona con más margen de grip.",
      example:
        "Recta de 250 km/h hacia una curva de 2ª. Decides: cartel → inicio de freno; final de piano → turn-in; piano exterior de salida → objetivo. Llegas ejecutando, no inventando.",
      exercise:
        "5 vueltas. Dos segundos antes de cada referencia di en voz alta qué harás («freno», «giro», «gas»). Si llegas en silencio, esa curva no cuenta. Anota cuántas referencias nombraste a tiempo.",
    },
    en: {
      concept:
        "Planning vision means choosing references early: where you will brake, turn, and exit. It is not «looking pretty»; it is programming inputs.",
      why: "At high speed, the gap between seeing and acting eats meters. If you stare at the hood or lock onto the apex too soon, you improvise brake pressure. Planning moves the decision into a zone with more grip margin.",
      example:
        "A 250 km/h straight into a 2nd-gear corner. You decide: sign → brake start; end of curb → turn-in; exit outside curb → target. You arrive executing, not inventing.",
      exercise:
        "5 laps. Two seconds before each reference say aloud what you will do («brake», «turn», «throttle»). If you arrive silent, that corner does not count. Log how many references you named on time.",
    },
  },
  {
    part: "braking",
    slug: "assessment-vision",
    titleEs: "Visión de evaluación",
    titleEn: "Assessment vision",
    brief: `# Brief: Visión de evaluación

## Concepto
Mientras frenas y giras, lees grip y trayectoria para corregir a tiempo.

## Física
La evaluación usa el margen restante: si solo miras el apex, no ves el deslizamiento.

## Ejemplo
Notas que el morro empuja 10 m antes del apex y abres un grado el volante.

## Ejercicio
En 8 frenadas, di «ok / push / slide» al llegar al turn-in.

## Errores típicos
- Evaluar solo después de la curva
- Corregir sin haber nombrado el síntoma
`,
    es: {
      concept:
        "La visión de evaluación es el escaneo durante la maniobra: ¿el coche apunta?, ¿el freno sigue mordiendo?, ¿la línea se abre? Planificas antes; evalúas mientras.",
      why: "El grip cambia con carga, temperatura y micro-baches. Si no miras el espacio entre el morro y la cuerda, solo notas el error cuando ya estás ancho. Evaluar temprano permite soltar un poco de freno o de ángulo mientras aún hay margen.",
      example:
        "En trail braking hacia un apex ciego, ves que el piano interior se «aleja». Nombras understeer, abres 1–2° de volante y mantienes un poco más de freno en vez de añadir dirección.",
      exercise:
        "8 entradas a la misma curva. Al turn-in di en voz alta: ok / push / slide. Después de la sesión, cuenta cuántas veces el veredicto coincidió con lo que hizo el coche en la salida. Entrena hasta 6/8 aciertos.",
    },
    en: {
      concept:
        "Assessment vision is the scan during the maneuver: is the car pointing, is the brake still biting, is the line opening? You plan before; you assess while.",
      why: "Grip changes with load, temperature, and small bumps. If you do not watch the space between nose and cord, you only notice the error when you are already wide. Early assessment lets you ease brake or angle while margin remains.",
      example:
        "Trail braking toward a blind apex, you see the inside curb «move away». You name understeer, open 1–2° of wheel, and keep a bit more brake instead of adding lock.",
      exercise:
        "8 entries to the same corner. At turn-in say aloud: ok / push / slide. After the session, count how often the call matched what the car did on exit. Train until 6/8 correct.",
    },
  },
  {
    part: "braking",
    slug: "mechanical-grip",
    titleEs: "Grip mecánico",
    titleEn: "Mechanical grip",
    brief: `# Brief: Grip mecánico

## Concepto
Grip del neumático por carga vertical y compuesto, sin depender de aero.

## Física
Más carga en el eje → más fuerza longitudinal posible, hasta el límite del compuesto.

## Ejemplo
Frenada a baja velocidad: el límite es casi solo mecánico.

## Ejercicio
Frenadas a 80→0 y 160→80; compara distancia relativa y sensación de umbral.

## Errores típicos
- Esperar el mismo pico de freno a cualquier velocidad
- Ignorar temperatura de neumático
`,
    es: {
      concept:
        "El grip mecánico es lo que el neumático puede hacer por sí solo: carga vertical, temperatura y compuesto. Es la base de toda frenada, con o sin alerones.",
      why: "La fuerza de frenado útil crece con la carga sobre el contacto, pero no de forma infinita: el compuesto satura. Entender el techo mecánico evita pedir 100% de pedal cuando el eje delantero aún no está cargado.",
      example:
        "De 80 a 0 km/h en una zona sin downforce relevante, el umbral se siente «corto» y constante. Si aplicas el mismo golpe que a 250 km/h, bloqueas o activas ABS antes de tiempo.",
      exercise:
        "En la misma recta: 5 frenadas 80→0 buscando el umbral, luego 5 de 160→80. Anota si el % de pedal al umbral es distinto. Objetivo: dos picos conscientes, no un solo estilo para todas las velocidades.",
    },
    en: {
      concept:
        "Mechanical grip is what the tire can do on its own: vertical load, temperature, and compound. It is the base of every stop, with or without wings.",
      why: "Useful braking force grows with load on the contact patch, but not forever—the compound saturates. Knowing the mechanical ceiling stops you from asking 100% pedal before the front axle is loaded.",
      example:
        "From 80 to 0 km/h in a low-aero zone, the threshold feels «short» and steady. If you use the same hit as at 250 km/h, you lock or trip ABS early.",
      exercise:
        "On the same straight: 5 stops 80→0 hunting threshold, then 5 from 160→80. Note whether pedal % at threshold differs. Goal: two conscious peaks, not one style for every speed.",
    },
  },
  {
    part: "braking",
    slug: "aerodynamic-grip",
    titleEs: "Grip aerodinámico",
    titleEn: "Aerodynamic grip",
    brief: `# Brief: Grip aerodinámico

## Concepto
La carga aerodinámica añade grip que crece con la velocidad y cae al frenar.

## Física
Downforce ∝ velocidad² (aprox.): al desacelerar, pierdes soporte justo cuando quieres más freno.

## Ejemplo
Coche de alta carga: pico inicial muy alto; hay que soltar antes de lo que dicta el grip mecánico.

## Ejercicio
Compara 2 frenadas en el mismo punto a distinta velocidad de llegada.

## Errores típicos
- Mantener presión de alta velocidad hasta el turn-in lento
`,
    es: {
      concept:
        "El grip aerodinámico es soporte extra del aire sobre el coche. Sube con la velocidad y se desvanece al frenar. No sustituye al mecánico: lo amplifica temporalmente.",
      why: "Al inicio de una frenada rápida hay mucha carga; el neumático aguanta un pico alto. Conforme caes de velocidad, la aero deja de ayudar y el mismo % de pedal supera el límite mecánico. Por eso el release no es opcional en coches de mucha carga.",
      example:
        "Fórmula o GT de alta carga: a 270 km/h el freno muerde limpio al 100%. Si mantienes ese 100% hasta 120 km/h, el eje delantero se satura y el coche se pone nervioso o bloquea.",
      exercise:
        "Misma marca de frenada. Una llegada «larga» (más velocidad) y una más lenta. Busca el % máximo limpio en cada una. Anota cuánto antes debes empezar a soltar en la llegada rápida.",
    },
    en: {
      concept:
        "Aerodynamic grip is extra support from air over the car. It rises with speed and fades as you brake. It does not replace mechanical grip—it amplifies it temporarily.",
      why: "At the start of a fast stop there is lots of load; the tire takes a high peak. As speed drops, aero stops helping and the same pedal % exceeds the mechanical limit. That is why release is mandatory on high-downforce cars.",
      example:
        "High-downforce formula or GT: at 270 km/h the brake bites cleanly at 100%. Hold that 100% down to 120 km/h and the front saturates—the car gets nervous or locks.",
      exercise:
        "Same brake mark. One «long» arrival (more speed) and one slower. Find the maximum clean % in each. Note how much earlier you must start releasing on the fast arrival.",
    },
  },
  {
    part: "braking",
    slug: "low-vs-high-downforce-braking",
    titleEs: "Poca vs mucha carga al frenar",
    titleEn: "Low vs high downforce under braking",
    brief: `# Brief: Poca vs mucha carga al frenar

## Concepto
El perfil de presión cambia según haya poca o mucha aero.

## Física
Poca carga: pico más bajo, release más suave. Mucha carga: pico alto, release más agresivo.

## Ejemplo
Touring vs fórmula en la misma recta de boxes.

## Ejercicio
Dos coches o dos setups (ala alta/baja); misma marca; compara forma del pedal.

## Errores típicos
- Copiar el estilo de un coche a otro
`,
    es: {
      concept:
        "No hay un único «buen» perfil de frenada. Con poca carga el pico es más modesto y el soltado más largo; con mucha carga el pico es brutal y el soltado más temprano y claro.",
      why: "La curva de grip disponible vs velocidad es distinta. Si usas un perfil de fórmula en un callejero de poca aero, bloqueas. Si usas un perfil de turismo en un monoplaza, te quedas corto y matas la rotación al llegar tarde.",
      example:
        "Misma recta de boxes. En un turismo el freno sube a ~85% y baja despacio. En un coche de mucha ala sube a ~100% y empieza a caer mucho antes del mismo turn-in.",
      exercise:
        "Si puedes, dos coches o ala alta vs baja. Misma marca visual. Graba o siente la forma del pedal. Dibuja en papel dos curvas presión-tiempo. Objetivo: reconocer cuál es cuál sin mirar el HUD de aero.",
    },
    en: {
      concept:
        "There is no single «good» brake profile. Low downforce means a modest peak and a longer release; high downforce means a brutal peak and an earlier, clearer release.",
      why: "Available grip vs speed is a different curve. Use a formula profile in a low-aero street car and you lock. Use a touring profile in an open-wheeler and you brake late, then kill rotation.",
      example:
        "Same pit straight. In a touring car the brake climbs to ~85% and eases slowly. In a high-wing car it climbs to ~100% and starts falling long before the same turn-in.",
      exercise:
        "If you can, two cars or high vs low wing. Same visual mark. Record or feel pedal shape. Sketch two pressure-time curves on paper. Goal: tell which is which without looking at an aero HUD.",
    },
  },
  {
    part: "braking",
    slug: "braking-to-a-stop",
    titleEs: "De recta a parada total",
    titleEn: "Straight line to a full stop",
    brief: `# Brief: De recta a parada total

## Concepto
Ejercicio base: encontrar el umbral de frenada sin girar.

## Física
Aísla longitudinal: todo el grip del eje delantero va a desacelerar.

## Ejemplo
Recta de boxes, 0° de volante, freno hasta parado.

## Ejercicio
10 paradas; cuenta bloqueos o ABS; busca el % máximo limpio.

## Errores típicos
- Meter dirección «para estabilizar»
- Soltar por miedo antes del umbral
`,
    es: {
      concept:
        "Frenar en recta hasta parar es el laboratorio del umbral: sin curva, sin trail, solo presión. Si no puedes repetir un pico limpio aquí, no lo tendrás en el turn-in.",
      why: "Con el volante recto, el círculo de adherencia está casi todo disponible en longitudinal. Aprendes el techo del neumático y la forma del ramp-up sin confundirlo con rotación o transferencias laterales.",
      example:
        "Entras a 180 km/h en la recta de boxes, volante a 0°, y buscas la máxima desaceleración sin bloqueo. La referencia no es el tiempo: es la calidad del pico.",
      exercise:
        "10 paradas completas desde la misma velocidad. Anota bloqueos/ABS (sí/no) y el % aproximado del pico limpio. Meta: 8/10 sin bloqueo y con variación de pico menor al 10%.",
    },
    en: {
      concept:
        "Straight-line braking to a stop is the threshold lab: no corner, no trail, only pressure. If you cannot repeat a clean peak here, you will not have it at turn-in.",
      why: "With the wheel straight, almost all of the grip circle is available longitudinally. You learn the tire ceiling and the ramp-up shape without mixing in rotation or lateral transfer.",
      example:
        "You arrive at 180 km/h on the pit straight, wheel at 0°, and hunt maximum deceleration without lockup. The reference is not time—it is peak quality.",
      exercise:
        "10 full stops from the same speed. Log lockups/ABS (yes/no) and approximate clean peak %. Goal: 8/10 with no lockup and peak variation under 10%.",
    },
  },
  {
    part: "braking",
    slug: "press-less",
    titleEs: "Técnica Press Less",
    titleEn: "Press Less technique",
    brief: `# Brief: Técnica Press Less

## Concepto
Pico alto temprano y luego soltar con intención mientras cae la velocidad.

## Física
Al frenar pierdes aero y margen; «press less» evita saturar el eje delantero.

## Ejemplo
100% inicial → release progresivo hacia el turn-in, no un escalón tarde.

## Ejercicio
Misma marca; 8 frenadas con release consciente vs 8 «aguantando».

## Errores típicos
- Pico flojo y luego apretar más cerca de la curva
- Soltar en un escalón único por pánico
`,
    es: {
      concept:
        "Press Less significa: llega al pico pronto y luego reduce presión a propósito a medida que el coche pierde velocidad (y a menudo aero). No es frenar flojo; es no quedarte pegado al máximo.",
      why: "El grip disponible cae mientras desaceleras. Mantener el mismo % convierte un pico legal en saturación. Soltar con forma da margen para dirigir y evita el bloqueo tardío que destroza la entrada.",
      example:
        "Marca a 150 m. Subes a pico en los primeros metros y ya estás bajando presión cuando pasas el cartel de 50 m, aún en recta. Llegas al turn-in con el eje delantero vivo.",
      exercise:
        "Misma marca, misma velocidad de llegada. 8 vueltas «aguantando» el pico hasta cerca del giro. 8 con Press Less (pico temprano + release). Compara bloqueos y velocidad mínima a 10 m del apex. Quédate con el método que dé menos saturación.",
    },
    en: {
      concept:
        "Press Less means: hit the peak early, then deliberately reduce pressure as the car loses speed (and often aero). It is not soft braking—it is not sticking to maximum.",
      why: "Available grip falls while you decelerate. Holding the same % turns a legal peak into saturation. Shaped release leaves room to steer and avoids the late lockup that ruins entry.",
      example:
        "Mark at 150 m. You reach peak in the first meters and are already releasing as you pass the 50 m board, still straight. You arrive at turn-in with a live front axle.",
      exercise:
        "Same mark, same arrival speed. 8 laps «holding» the peak until near turn-in. 8 with Press Less (early peak + release). Compare lockups and minimum speed 10 m before apex. Keep the method with less saturation.",
    },
  },
  {
    part: "braking",
    slug: "compressions-crests-bumps",
    titleEs: "Compresiones, crestas y baches",
    titleEn: "Compressions, crests, and bumps",
    brief: `# Brief: Compresiones, crestas y baches

## Concepto
La carga vertical cambia con el asfalto; la presión de freno debe adaptarse.

## Física
Compresión = más carga = más grip. Cresta = descarga = menos grip.

## Ejemplo
Frenar en una cresta con el mismo % que en plano → bloqueo.

## Ejercicio
Marca una cresta; practica soltar 10–20% al pasar por ella.

## Errores típicos
- Tratar toda la zona de frenada como grip constante
`,
    es: {
      concept:
        "El asfalto no es un laboratorio plano. Compresiones cargan el coche; crestas y baches lo descargan. La presión de freno debe seguir la carga, no el ego.",
      why: "Sin carga vertical el neumático no puede convertir presión de pedal en desaceleración limpia. En una cresta el mismo 90% supera el límite; en una compresión ese 90% puede estar por debajo del umbral.",
      example:
        "Frenada que cruza una cresta a mitad de zona. Si mantienes el pico, el volante se pone ligero y el eje delantero bloquea justo en lo alto. Soltar un poco al subir y recuperar al bajar estabiliza el coche.",
      exercise:
        "Identifica una cresta en tu zona de frenada. 10 repeticiones: reduce 10–20% de presión al pasar por ella y recupera después. Cuenta cuántas veces evitas bloqueo comparado con 5 repeticiones «planas».",
    },
    en: {
      concept:
        "Asphalt is not a flat lab. Compressions load the car; crests and bumps unload it. Brake pressure must follow load, not ego.",
      why: "Without vertical load the tire cannot turn pedal pressure into clean deceleration. On a crest the same 90% exceeds the limit; in a compression that 90% may sit under threshold.",
      example:
        "A braking zone that crosses a crest mid-way. If you hold the peak, the wheel goes light and the front locks right at the top. Ease a little on the way up and rebuild on the way down to stabilize the car.",
      exercise:
        "Find a crest in your braking zone. 10 reps: cut 10–20% pressure across it, then rebuild. Count how often you avoid lockup versus 5 «flat» reps.",
    },
  },
  {
    part: "braking",
    slug: "initial-to-peak-pressure",
    titleEs: "Presión inicial, pico y referencias",
    titleEn: "Initial pressure, peak, and references",
    brief: `# Brief: Presión inicial, pico y referencias

## Concepto
Separar el inicio del freno, el pico y las marcas visuales que los anclan.

## Física
Un ramp-up demasiado lento desperdicia metros; demasiado brusco satura antes de cargar el eje.

## Ejemplo
Inicio en el cartel, pico en la sombra, turn-in en el piano.

## Ejercicio
Define 3 marcas; 10 frenadas cumpliendo el orden inicio→pico→giro.

## Errores típicos
- Pico en el mismo instante que el inicio
- Mover el punto de frenada y el pico a la vez
`,
    es: {
      concept:
        "La frenada tiene fases: inicio (contacto), pico (máxima presión útil) y release hacia el giro. Cada fase necesita una referencia visual si quieres repetirla.",
      why: "Sin anclas, el pie improvisa metros. Un pico demasiado pronto, antes de que el peso llegue al morro, satura. Un pico eterno, sin inicio claro, desperdicia distancia de frenado.",
      example:
        "Cartel = inicio. Sombra del puente = pico. Fin del piano = turn-in. Aunque el tráfico cambie, las tres marcas mantienen la forma de la frenada.",
      exercise:
        "Elige 3 marcas en una recta. 10 frenadas. Cumple el orden: inicio en marca 1, pico en marca 2, inicio de giro en marca 3. Si mezclas el orden, no cuenta. Meta: 8/10 en secuencia correcta.",
    },
    en: {
      concept:
        "Braking has phases: onset (contact), peak (maximum useful pressure), and release toward turn-in. Each phase needs a visual reference if you want to repeat it.",
      why: "Without anchors the foot improvises meters. A peak too early—before weight arrives on the nose—saturates. An endless peak with no clear onset wastes stopping distance.",
      example:
        "Board = onset. Bridge shadow = peak. End of curb = turn-in. Even when traffic changes, the three marks keep the brake shape.",
      exercise:
        "Pick 3 marks on a straight. 10 stops. Keep the order: onset at mark 1, peak at mark 2, turn-in at mark 3. Wrong order does not count. Goal: 8/10 in the correct sequence.",
    },
  },
  {
    part: "braking",
    slug: "light-hands-under-braking",
    titleEs: "Manos ligeras al frenar",
    titleEn: "Light hands under braking",
    brief: `# Brief: Manos ligeras al frenar

## Concepto
No pelear el volante mientras el eje delantero se carga.

## Física
Manos duras añaden ángulo o fuerza que roba grip longitudinal.

## Ejemplo
Pico de freno con hombros tensos: el coche se desvía y «corriges» con más pelea.

## Ejercicio
10 frenadas en recta con agarre 3/10; penaliza si giras más de 5°.

## Errores típicos
- Usar el volante para equilibrar un cuerpo mal sentado
`,
    es: {
      concept:
        "Bajo frenada fuerte el morro se carga solo. Tus manos deben permitir esa carga, no dirigir ni aplastar el volante. Manos ligeras = más freno limpio.",
      why: "Cada grado o newton extra en el aro consume parte del círculo de adherencia del neumático delantero. Si pelees el FFB, reduces desaceleración y generas microdesvíos que luego «arreglas» con más pelea.",
      example:
        "En una frenada de alta velocidad el volante tira un poco por asfalto irregular. Con manos ligeras dejas que hable y corrige 1–2°. Con manos de hierro metes 10° y matas el pico.",
      exercise:
        "10 frenadas en recta, agarre ~3/10. Si giras más de ~5° o aprietas el aro, esa repetición falla. Meta: 8/10 exitosas con el coche casi recto hasta el final del pico.",
    },
    en: {
      concept:
        "Under hard braking the nose loads itself. Your hands should allow that load—not steer or crush the wheel. Light hands = more clean braking.",
      why: "Every extra degree or newton on the rim spends part of the front tire's grip circle. If you fight FFB, you cut deceleration and create micro-weaves you then «fix» with more fight.",
      example:
        "In a high-speed stop the wheel tugs from uneven asphalt. With light hands you let it speak and correct 1–2°. With iron hands you add 10° and kill the peak.",
      exercise:
        "10 straight-line stops, grip ~3/10. If you steer more than ~5° or squeeze the rim, that rep fails. Goal: 8/10 successful with the car nearly straight through the peak.",
    },
  },
  {
    part: "braking",
    slug: "engine-braking-interference",
    titleEs: "Freno motor e interferencia",
    titleEn: "Engine braking interference",
    brief: `# Brief: Freno motor e interferencia

## Concepto
El freno motor suma o resta estabilidad según eje motriz y marcha.

## Física
En RWD, cortar gas puede rotar el coche; en FWD, puede empujar el morro o estabilizar según el caso.

## Ejemplo
Reducir a 2ª demasiado pronto en entrada: zaga nerviosa antes del trail.

## Ejercicio
Misma curva: 5 entradas con downshift temprano vs 5 con downshift tardío.

## Errores típicos
- Ignorar el eje motriz
- Blip inconsistente que mete tirones
`,
    es: {
      concept:
        "El freno motor es desaceleración que no pasa por el pedal de freno. Puede ayudar a la rotación o interferir con el equilibrio justo cuando buscas un pico limpio.",
      why: "Al bajar marcha, el eje motriz recibe un par negativo. En RWD eso puede desencadenar oversteer de entrada; en FWD puede alterar el agarre del eje que también dirige. El pedal de freno ya no es la única historia.",
      example:
        "Curva de 3ª a 2ª. Si clavas 2ª muy pronto, la zaga se pone nerviosa antes de empezar el trail. Si retrasas el downshift y haces un blip limpio, el pico de freno se siente más predecible.",
      exercise:
        "Misma curva, misma marca de freno. 5 entradas con downshift temprano y 5 con downshift justo antes del turn-in (blip consistente). Anota en cuál el coche empuja o gira de más. Elige la opción más estable al 95% de ritmo.",
    },
    en: {
      concept:
        "Engine braking is deceleration that does not come from the brake pedal. It can help rotation or interfere with balance right when you want a clean peak.",
      why: "On a downshift the driven axle sees negative torque. In RWD that can trigger entry oversteer; in FWD it can change grip on the axle that also steers. The brake pedal is no longer the whole story.",
      example:
        "A 3rd-to-2nd corner. Stab 2nd too early and the rear gets nervous before trail starts. Delay the downshift with a clean blip and the brake peak feels more predictable.",
      exercise:
        "Same corner, same brake mark. 5 entries with an early downshift and 5 with the downshift just before turn-in (consistent blip). Note which one pushes or rotates too much. Pick the more stable option at 95% pace.",
    },
  },
];

function mdxFile(
  title: string,
  part: string,
  slug: string,
  sections: { concept: string; why: string; example: string; exercise: string },
): string {
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
    const briefPath = path.join(root, "content", "briefs", lesson.part, `${lesson.slug}.md`);
    const esPath = path.join(root, "content", "es", "lessons", lesson.part, `${lesson.slug}.mdx`);
    const enPath = path.join(root, "content", "en", "lessons", lesson.part, `${lesson.slug}.mdx`);

    await fs.writeFile(briefPath, lesson.brief.trimStart(), "utf8");
    await fs.writeFile(esPath, mdxFile(lesson.titleEs, lesson.part, lesson.slug, lesson.es), "utf8");
    await fs.writeFile(enPath, mdxFile(lesson.titleEn, lesson.part, lesson.slug, lesson.en), "utf8");
    console.log(`published ${lesson.part}/${lesson.slug}`);
  }
  console.log(`Done: ${lessons.length} lessons × brief+es+en`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

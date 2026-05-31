// DeutschLern — Grammar Database
// 36 rules covering full Goethe-Zertifikat A1–C1 curriculum
// Each rule: {id, level, topic, title, explanation, keyPoints[], examples[], errors[], exercises[], tags[]}

window.DB_GRAMMAR = [

// ═══════════════════════════════════════════════
// A1 GRAMMAR
// ═══════════════════════════════════════════════
{
  id:"g_a1_01", level:"A1", topic:"verbs",
  title:"Present tense — regular verbs (Präsens)",
  explanation:"Regular German verbs follow a predictable pattern. Remove the infinitive ending -en and add the personal endings: -e, -st, -t, -en, -t, -en.",
  keyPoints:[
    "Stem = infinitive minus -en (e.g. lern- from lernen)",
    "ich: -e | du: -st | er/sie/es: -t",
    "wir: -en | ihr: -t | sie/Sie: -en",
    "Stems ending in -t/-d add an extra -e for pronunciation (du arbeitest)"
  ],
  examples:[
    {de:"Ich lerne Deutsch.",en:"I am learning German.",note:"ich form: stem + e"},
    {de:"Du lernst schnell.",en:"You learn quickly.",note:"du form: stem + st"},
    {de:"Er lernt jeden Tag.",en:"He learns every day.",note:"er form: stem + t"},
    {de:"Wir lernen zusammen.",en:"We learn together.",note:"wir form: stem + en"},
    {de:"Sie arbeitet im Büro.",en:"She works in the office.",note:"extra -e after -t stem"}
  ],
  errors:[
    "Saying 'du lernst' → always correct, not 'du lernen'",
    "Forgetting extra -e: 'er arbeitt' → er arbeitet",
    "Using infinitive for conjugation: 'ich lernen' → ich lerne"
  ],
  exercises:[
    {type:"conjugation",prompt:"Conjugate 'lernen' — ich ___",answer:"lerne",hint:"Remove -en, add -e"},
    {type:"conjugation",prompt:"Conjugate 'spielen' — du ___",answer:"spielst",hint:"Remove -en, add -st"},
    {type:"conjugation",prompt:"Conjugate 'arbeiten' — er ___",answer:"arbeitet",hint:"Stem ends in -t, add extra -e"},
    {type:"fillBlank",prompt:"Wir ___ (wohnen) in Berlin.",answer:"wohnen",hint:"wir = stem + en"},
    {type:"errorCorrect",prompt:"Du spielen Fußball. → Fix the error.",answer:"Du spielst Fußball.",hint:"du takes -st ending"},
    {type:"fillBlank",prompt:"Sie (sie = she) ___ (tanzen) sehr gut.",answer:"tanzt",hint:"er/sie/es takes -t ending"}
  ],
  tags:["Präsens","conjugation","regular verbs","A1"]
},
{
  id:"g_a1_02", level:"A1", topic:"verbs",
  title:"Irregular verbs — sein and haben",
  explanation:"'sein' (to be) and 'haben' (to have) are the most important verbs in German. They are both irregular and must be memorised.",
  keyPoints:[
    "sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind",
    "haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben",
    "Used as main verbs and as auxiliaries for Perfekt tense",
    "sein is used with verbs of motion/change of state in Perfekt"
  ],
  examples:[
    {de:"Ich bin Student.",en:"I am a student.",note:"sein as main verb"},
    {de:"Sie hat eine Schwester.",en:"She has a sister.",note:"haben as main verb"},
    {de:"Wir sind müde.",en:"We are tired.",note:"wir form of sein"},
    {de:"Er hat Hunger.",en:"He is hungry.",note:"haben for feelings/states"},
    {de:"Bist du bereit?",en:"Are you ready?",note:"question with sein"}
  ],
  errors:[
    "'Ich bin haben' → ich habe (never mix the two)",
    "'Er ist ein Buch' → Er hat ein Buch (ownership = haben)",
    "'Du bist kalt' could mean 'you are cold (unfriendly)' — 'mir ist kalt' = I feel cold"
  ],
  exercises:[
    {type:"conjugation",prompt:"sein — ich ___",answer:"bin",hint:"Most irregular form"},
    {type:"conjugation",prompt:"haben — du ___",answer:"hast",hint:"Like 'hast thou' in old English"},
    {type:"conjugation",prompt:"sein — wir ___",answer:"sind",hint:"Think of English 'are'"},
    {type:"fillBlank",prompt:"Er ___ (haben) zwei Schwestern.",answer:"hat",hint:"er/sie/es form of haben"},
    {type:"choice",prompt:"___ du Geschwister? (Bist/Hast)",answer:"Hast",hint:"Siblings = possession → haben"},
    {type:"errorCorrect",prompt:"Ich bin Hunger. → Fix the error.",answer:"Ich habe Hunger.",hint:"Hunger/Durst = haben, not sein"}
  ],
  tags:["sein","haben","irregular","A1"]
},
{
  id:"g_a1_03", level:"A1", topic:"verbs",
  title:"Modal verbs — können, müssen, wollen, dürfen, sollen, mögen",
  explanation:"Modal verbs express ability, necessity, permission, desire. They are always paired with an infinitive, which goes to the END of the sentence.",
  keyPoints:[
    "können = can/be able to | müssen = must/have to | wollen = want to",
    "dürfen = may/be allowed to | sollen = should/supposed to | mögen = like",
    "Infinitive goes to the END: Ich kann Deutsch sprechen.",
    "Modals drop the umlaut in singular: ich kann (not kann), du kannst",
    "ich/er/sie/es have the same form: ich kann = er kann"
  ],
  examples:[
    {de:"Ich kann gut schwimmen.",en:"I can swim well.",note:"können = ability"},
    {de:"Du musst jetzt lernen.",en:"You must study now.",note:"müssen = necessity"},
    {de:"Wir wollen nach Berlin fahren.",en:"We want to go to Berlin.",note:"wollen = desire"},
    {de:"Darf ich hier sitzen?",en:"May I sit here?",note:"dürfen = permission"},
    {de:"Er soll um 8 Uhr kommen.",en:"He is supposed to come at 8.",note:"sollen = obligation"}
  ],
  errors:[
    "Putting infinitive in second position: 'Ich kann sprechen Deutsch' → infinitive goes last",
    "Adding -t to er form: 'er kannet' → er kann",
    "Using 'muss' for negative prohibition: 'Du musst nicht' = you don't have to (not forbidden). Use 'darf nicht' for prohibition."
  ],
  exercises:[
    {type:"wordOrder",prompt:"Rearrange: kann / Ich / spielen / Gitarre",answer:"Ich kann Gitarre spielen.",hint:"Modal verb 2nd position, infinitive last"},
    {type:"fillBlank",prompt:"Er ___ (können) sehr gut kochen.",answer:"kann",hint:"er/sie/es form of können"},
    {type:"choice",prompt:"___ ich bitte das Fenster öffnen? (Kann/Muss)",answer:"Kann",hint:"Permission/polite request = können"},
    {type:"errorCorrect",prompt:"Ich muss gehen sofort. → Fix the word order.",answer:"Ich muss sofort gehen.",hint:"Infinitive always at the end"},
    {type:"fillBlank",prompt:"Wir ___ (müssen) morgen früh aufstehen.",answer:"müssen",hint:"wir form keeps umlaut"}
  ],
  tags:["modal verbs","können","müssen","word order","A1"]
},
{
  id:"g_a1_04", level:"A1", topic:"wordOrder",
  title:"Word order — verb in second position (V2 rule)",
  explanation:"In German main clauses, the conjugated verb ALWAYS comes in second position — no matter what element starts the sentence.",
  keyPoints:[
    "Subject-Verb-Object is the default: Ich lerne Deutsch.",
    "If something else starts the sentence, verb still comes 2nd: Heute lerne ich Deutsch.",
    "The subject then moves to position 3: Heute | lerne | ich Deutsch.",
    "Questions without question words: verb comes first (inversion): Lernst du Deutsch?"
  ],
  examples:[
    {de:"Ich lerne Deutsch.",en:"I learn German.",note:"Default SVO order"},
    {de:"Heute lerne ich Deutsch.",en:"Today I learn German.",note:"Time word first → verb still 2nd"},
    {de:"In Berlin wohne ich gern.",en:"I like living in Berlin.",note:"Place first → inversion"},
    {de:"Morgen fahren wir nach München.",en:"Tomorrow we go to Munich.",note:"Adverb first"},
    {de:"Lernst du Deutsch?",en:"Are you learning German?",note:"Yes/no question = verb first"}
  ],
  errors:[
    "'Heute ich lerne Deutsch' → Heute lerne ich Deutsch (verb must be 2nd)",
    "'Ich lerne heute Deutsch und ich gehe morgen.' — correct! Both are main clauses.",
    "Don't confuse with subordinate clauses where verb goes LAST"
  ],
  exercises:[
    {type:"wordOrder",prompt:"Rearrange: Deutsch / lerne / Ich",answer:"Ich lerne Deutsch.",hint:"Standard SVO"},
    {type:"wordOrder",prompt:"Rearrange: lerne / Heute / ich / Deutsch",answer:"Heute lerne ich Deutsch.",hint:"Time word first → verb 2nd, subject 3rd"},
    {type:"errorCorrect",prompt:"Morgen ich fahre nach Berlin. → Fix the error.",answer:"Morgen fahre ich nach Berlin.",hint:"Adverb first means verb must come before subject"},
    {type:"fillBlank",prompt:"Nächste Woche ___ wir (fliegen) nach London.",answer:"fliegen",hint:"wir form, verb stays 2nd position"}
  ],
  tags:["word order","V2","inversion","A1"]
},
{
  id:"g_a1_05", level:"A1", topic:"articles",
  title:"Articles — der, die, das (nominative case)",
  explanation:"German has three genders: masculine (der), feminine (die), and neuter (das). In the nominative case (subject), use these forms. The indefinite articles are ein/eine/ein.",
  keyPoints:[
    "der = masculine: der Mann, der Tisch, der Zug",
    "die = feminine: die Frau, die Schule, die Straße",
    "das = neuter: das Kind, das Buch, das Auto",
    "Plural always uses 'die': die Männer, die Frauen",
    "Indefinite: ein Mann, eine Frau, ein Kind"
  ],
  examples:[
    {de:"Der Mann ist groß.",en:"The man is tall.",note:"masculine nominative"},
    {de:"Die Schule ist alt.",en:"The school is old.",note:"feminine nominative"},
    {de:"Das Kind spielt.",en:"The child plays.",note:"neuter nominative"},
    {de:"Ein Hund bellt.",en:"A dog barks.",note:"masculine indefinite"},
    {de:"Eine Katze schläft.",en:"A cat is sleeping.",note:"feminine indefinite"}
  ],
  errors:[
    "Guessing gender: there are patterns but many must be memorised",
    "-ung, -heit, -keit endings → always feminine: die Zeitung",
    "-chen, -lein endings → always neuter: das Mädchen",
    "Male people are usually masculine, but das Mädchen (girl) is neuter!"
  ],
  exercises:[
    {type:"article",prompt:"___ Tisch (table) ist braun. (masculine)",answer:"Der",hint:"der = masculine"},
    {type:"article",prompt:"___ Schule ist groß. (feminine)",answer:"Die",hint:"die = feminine"},
    {type:"article",prompt:"___ Kind (child) schläft. (neuter)",answer:"Das",hint:"das = neuter"},
    {type:"article",prompt:"___ (indefinite, feminine) Frau wartet.",answer:"Eine",hint:"feminine indefinite = eine"},
    {type:"choice",prompt:"die Zeitung / der Zeitung / das Zeitung?",answer:"die Zeitung",hint:"-ung endings are always feminine"},
    {type:"article",prompt:"___ Mädchen ist jung. (neuter — exception!)",answer:"Das",hint:"das Mädchen — -chen is always neuter"}
  ],
  tags:["articles","gender","nominative","der die das","A1"]
},
{
  id:"g_a1_06", level:"A1", topic:"cases",
  title:"Nominative and Accusative cases",
  explanation:"German has four cases. Nominative = subject (who does the action). Accusative = direct object (what receives the action). Only masculine articles change in accusative.",
  keyPoints:[
    "Nominative (subject): der/die/das, ein/eine/ein",
    "Accusative (direct object): den/die/das, einen/eine/ein",
    "ONLY masculine der → den and ein → einen in accusative",
    "feminine die and neuter das do NOT change",
    "Ask 'What/Who receives the action?' to find the accusative"
  ],
  examples:[
    {de:"Der Mann kauft einen Hund.",en:"The man buys a dog.",note:"Mann = nom (subject), Hund = acc (object)"},
    {de:"Ich sehe die Frau.",en:"I see the woman.",note:"die doesn't change in accusative"},
    {de:"Er liest das Buch.",en:"He reads the book.",note:"das doesn't change in accusative"},
    {de:"Sie kauft einen Apfel.",en:"She buys an apple.",note:"ein → einen (masculine accusative)"},
    {de:"Ich habe keinen Hunger.",en:"I am not hungry.",note:"kein also changes: keinen"}
  ],
  errors:[
    "Changing die/das in accusative: 'Ich sehe den Frau' → die Frau (stays!)",
    "Forgetting den: 'Ich kaufe ein Hund' → einen Hund",
    "Remember: only masculine changes! der → den, ein → einen"
  ],
  exercises:[
    {type:"article",prompt:"Ich kaufe ___ (ein, m) Kaffee.",answer:"einen",hint:"masculine direct object → einen"},
    {type:"article",prompt:"Er sieht ___ (die) Frau.",answer:"die",hint:"feminine stays die in accusative"},
    {type:"article",prompt:"Wir haben ___ (kein, m) Hunger.",answer:"keinen",hint:"kein follows ein: keinen in acc masculine"},
    {type:"choice",prompt:"Ich suche ___ Schlüssel (m). (der/den/dem)",answer:"den",hint:"Direct object, masculine → den"},
    {type:"errorCorrect",prompt:"Ich kaufe ein Apfel. → Fix the error.",answer:"Ich kaufe einen Apfel.",hint:"Apple is masculine → einen in accusative"}
  ],
  tags:["nominative","accusative","cases","articles","A1"]
},
{
  id:"g_a1_07", level:"A1", topic:"negation",
  title:"Negation — nicht and kein",
  explanation:"'nicht' negates verbs, adjectives, and adverbs. 'kein' negates nouns (replaces ein/eine/ein). They have different positions in the sentence.",
  keyPoints:[
    "kein = not a / no — replaces ein: Ich habe kein Auto.",
    "nicht = not — goes after verb, before adjective/adverb",
    "kein follows ein-word endings: kein (m/n nom), keine (f), keinen (m acc)",
    "nicht goes at the end of a clause when negating the whole verb",
    "'Ich arbeite nicht.' vs 'Ich habe kein Geld.'"
  ],
  examples:[
    {de:"Ich habe kein Auto.",en:"I don't have a car.",note:"kein replaces ein (neuter)"},
    {de:"Das ist nicht richtig.",en:"That is not correct.",note:"nicht before adjective"},
    {de:"Er kommt nicht.",en:"He is not coming.",note:"nicht at end negating verb"},
    {de:"Sie hat keine Zeit.",en:"She has no time.",note:"keine = feminine kein"},
    {de:"Ich bin kein Lehrer.",en:"I am not a teacher.",note:"kein after sein"}
  ],
  errors:[
    "Using 'nicht' with nouns: 'Ich habe nicht Auto' → kein Auto",
    "Position: 'Ich nicht komme' → Ich komme nicht",
    "Forgetting to change kein endings: 'Ich habe kein Hunger' → keinen Hunger (m acc)"
  ],
  exercises:[
    {type:"choice",prompt:"Ich habe _____ Hunger. (nicht/keinen)",answer:"keinen",hint:"Hunger is a noun → kein; masculine accusative → keinen"},
    {type:"fillBlank",prompt:"Das ist ___ (not) mein Buch.",answer:"nicht",hint:"nicht negates the whole predicate"},
    {type:"choice",prompt:"Sie hat _____ Schwester. (nicht/keine)",answer:"keine",hint:"Schwester is a noun, feminine → keine"},
    {type:"errorCorrect",prompt:"Ich habe nicht Zeit. → Fix the error.",answer:"Ich habe keine Zeit.",hint:"Zeit is a noun → kein, feminine → keine"},
    {type:"fillBlank",prompt:"Er kommt ___ (not) heute.",answer:"nicht",hint:"nicht negates the verb"},
    {type:"fillBlank",prompt:"Wir haben ___ (kein, n) Geld.",answer:"kein",hint:"Geld is neuter, neuter nom = kein"}
  ],
  tags:["negation","nicht","kein","A1"]
},
{
  id:"g_a1_08", level:"A1", topic:"pronouns",
  title:"Personal pronouns",
  explanation:"Personal pronouns replace nouns. German has formal (Sie) and informal (du/ihr) second-person forms. Always capitalise Sie (formal).",
  keyPoints:[
    "ich (I), du (you informal sg), er/sie/es (he/she/it)",
    "wir (we), ihr (you informal pl), sie (they), Sie (you formal sg+pl)",
    "Sie (formal) always takes the same verb form as sie (they)",
    "Use du/ihr with friends, family, children; Sie with strangers/authority"
  ],
  examples:[
    {de:"Ich lerne Deutsch.",en:"I am learning German.",note:"ich = 1st person sg"},
    {de:"Du sprichst gut.",en:"You speak well.",note:"du = informal singular"},
    {de:"Er/Sie/Es wohnt hier.",en:"He/She/It lives here.",note:"3rd person singular"},
    {de:"Sie sprechen sehr gut Deutsch.",en:"You speak German very well. (formal)",note:"Sie formal = sie they form"},
    {de:"Ihr kommt aus England.",en:"You (all) come from England.",note:"ihr = informal plural"}
  ],
  errors:[
    "Capitalising 'sie' (she/they) — only 'Sie' (formal) is always capitalised",
    "Using du for formal situations: always use Sie with adults you don't know",
    "ihr vs Sie: ihr = group of friends, Sie = formal (singular or plural)"
  ],
  exercises:[
    {type:"choice",prompt:"___ bin Lehrer. (Ich/Er)",answer:"Ich",hint:"First person singular"},
    {type:"fillBlank",prompt:"___ (formal 'you') sprechen sehr gut Deutsch.",answer:"Sie",hint:"Always capitalised, formal address"},
    {type:"choice",prompt:"My friend and I = ___ (wir/ihr)",answer:"wir",hint:"wir = we (1st person plural)"},
    {type:"errorCorrect",prompt:"sie (formal) kommt morgen. → Fix the capitalisation.",answer:"Sie kommt morgen.",hint:"Formal Sie always capitalised"}
  ],
  tags:["pronouns","du","Sie","formal","A1"]
},

// ═══════════════════════════════════════════════
// A2 GRAMMAR
// ═══════════════════════════════════════════════
{
  id:"g_a2_01", level:"A2", topic:"tenses",
  title:"Past tense — Perfekt (conversational past)",
  explanation:"The Perfekt is used in spoken German to talk about past events. It uses haben or sein as an auxiliary + the past participle (Partizip II) at the END of the sentence.",
  keyPoints:[
    "Most verbs use haben: Ich habe gegessen.",
    "Verbs of motion and change of state use sein: Ich bin gegangen.",
    "Partizip II of regular verbs: ge- + stem + -(e)t: gelernt, gearbeitet",
    "Partizip II of irregular verbs: ge- + stem + -en (often vowel change): gesehen, gegessen",
    "Auxiliary goes to position 2; Partizip II goes to the END"
  ],
  examples:[
    {de:"Ich habe Deutsch gelernt.",en:"I learned German.",note:"regular verb, haben"},
    {de:"Wir sind nach Berlin gefahren.",en:"We went to Berlin.",note:"motion verb → sein"},
    {de:"Er hat das Buch gelesen.",en:"He read the book.",note:"irregular: lesen → gelesen"},
    {de:"Sie ist um 8 Uhr aufgestanden.",en:"She got up at 8.",note:"aufstehen = motion → sein"},
    {de:"Habt ihr gut geschlafen?",en:"Did you sleep well?",note:"question with Perfekt"}
  ],
  errors:[
    "Using haben with motion verbs: 'Ich habe gegangen' → Ich bin gegangen",
    "Partizip II in wrong position: 'Ich habe gelernt Deutsch' → gelernt goes last",
    "Forgetting ge-: 'Ich habe lernt' → gelernt",
    "Verbs with inseparable prefixes: verstehen → verstanden (no ge-!)"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Ich ___ (haben) gestern viel gelernt.",answer:"habe",hint:"haben auxiliary, 1st person sg"},
    {type:"fillBlank",prompt:"Wir ___ (sein) nach Hamburg gefahren.",answer:"sind",hint:"fahren = motion → sein"},
    {type:"transform",prompt:"Rewrite in Perfekt: 'Ich lerne Deutsch.'",answer:"Ich habe Deutsch gelernt.",hint:"haben + ge-lern-t"},
    {type:"errorCorrect",prompt:"Er hat nach Hause gegangen. → Fix the error.",answer:"Er ist nach Hause gegangen.",hint:"gehen = motion → sein"},
    {type:"fillBlank",prompt:"Sie ___ (sein) früh aufgestanden.",answer:"ist",hint:"aufstehen = motion/change → sein"},
    {type:"transform",prompt:"Rewrite in Perfekt: 'Er schläft.'",answer:"Er hat geschlafen.",hint:"schlafen → haben + geschlafen"}
  ],
  tags:["Perfekt","past tense","haben","sein","Partizip II","A2"]
},
{
  id:"g_a2_02", level:"A2", topic:"cases",
  title:"Dative case — indirect object",
  explanation:"The dative case marks the indirect object — the receiver of an action. Key dative prepositions include: mit, nach, bei, von, zu, aus, seit, gegenüber.",
  keyPoints:[
    "dem (m/n), der (f), den (pl) + -n added to noun",
    "einem (m/n), einer (f) — indefinite article dative",
    "Key dative prepositions (always dative): mit, nach, bei, von, zu, aus, seit",
    "Dative verbs (dat object only): helfen, danken, gehören, gefallen, glauben",
    "Indirect object in double-object sentences: 'Ich gebe dem Mann das Buch.'"
  ],
  examples:[
    {de:"Ich helfe dem Mann.",en:"I help the man.",note:"helfen takes dative"},
    {de:"Sie wohnt bei ihrer Mutter.",en:"She lives at her mother's.",note:"bei = always dative"},
    {de:"Ich fahre mit dem Bus.",en:"I go by bus.",note:"mit = always dative"},
    {de:"Ich gebe dem Kind das Buch.",en:"I give the child the book.",note:"indirect + direct object"},
    {de:"Das gehört mir.",en:"That belongs to me.",note:"dative pronoun mir"}
  ],
  errors:[
    "Using accusative after dative prepositions: 'mit den Bus' → mit dem Bus",
    "Forgetting dative verbs: 'Ich helfe den Mann' → dem Mann",
    "Dative pronouns: mir (me), dir (you), ihm (him), ihr (her), uns (us), euch (you pl), ihnen (them)"
  ],
  exercises:[
    {type:"article",prompt:"Ich helfe ___ (dem/den) Mann.",answer:"dem",hint:"helfen always takes dative: dem (m)"},
    {type:"fillBlank",prompt:"Sie fährt mit ___ (das/dem) Fahrrad.",answer:"dem",hint:"mit = dative prep, neuter → dem"},
    {type:"article",prompt:"Das Buch gehört ___ (die/der) Frau.",answer:"der",hint:"gehören takes dative: der (f)"},
    {type:"errorCorrect",prompt:"Ich wohne bei meinen Bruder. → Fix the case.",answer:"Ich wohne bei meinem Bruder.",hint:"bei = dative: meinem (m dative)"},
    {type:"fillBlank",prompt:"Ich gebe ___ (du → dative) das Geld.",answer:"dir",hint:"dative of du = dir"}
  ],
  tags:["dative","cases","prepositions","A2"]
},
{
  id:"g_a2_03", level:"A2", topic:"wordOrder",
  title:"Subordinate clauses — verb goes to the end",
  explanation:"In subordinate clauses (introduced by conjunctions like weil, dass, obwohl, wenn), the conjugated verb moves to the VERY END of the clause.",
  keyPoints:[
    "Common subordinating conjunctions: weil (because), dass (that), obwohl (although), wenn (when/if), als (when-past), ob (whether)",
    "The verb goes to the last position: ...weil ich krank bin.",
    "Separable verbs reunite: ...weil ich früh aufstehe.",
    "Modal verbs: infinitive before modal at end: ...weil ich früh aufstehen muss.",
    "Comma before the subordinate clause!"
  ],
  examples:[
    {de:"Ich bleibe zu Hause, weil ich krank bin.",en:"I stay at home because I am ill.",note:"weil → verb at end"},
    {de:"Er sagt, dass er Hunger hat.",en:"He says that he is hungry.",note:"dass → verb at end"},
    {de:"Obwohl es regnet, gehe ich spazieren.",en:"Although it is raining, I go for a walk.",note:"obwohl clause first → main clause inverts"},
    {de:"Ich schlafe nicht, weil ich Kaffee getrunken habe.",en:"I can't sleep because I drank coffee.",note:"Perfekt in subordinate clause"},
    {de:"Wenn ich Zeit habe, lerne ich Deutsch.",en:"When I have time, I learn German.",note:"wenn clause first → verb-first in main"}
  ],
  errors:[
    "'weil ich bin krank' → weil ich krank bin (verb must be LAST)",
    "Missing comma: 'Ich lerne Deutsch weil es interessant ist.' → needs comma before weil",
    "Confusing weil (because) with denn (also 'because' but keeps normal word order)"
  ],
  exercises:[
    {type:"wordOrder",prompt:"Combine: 'Ich lerne Deutsch.' + 'Es ist interessant.' using 'weil'",answer:"Ich lerne Deutsch, weil es interessant ist.",hint:"weil → verb goes to end of clause"},
    {type:"errorCorrect",prompt:"Er kommt nicht, weil er hat keine Zeit. → Fix the word order.",answer:"Er kommt nicht, weil er keine Zeit hat.",hint:"In weil-clause, verb must be last"},
    {type:"fillBlank",prompt:"Ich weiß, dass du Deutsch ___ (lernen).",answer:"lernst",hint:"dass-clause: conjugated verb at end"},
    {type:"wordOrder",prompt:"Combine: 'Ich bin müde.' + 'Ich arbeite viel.' using 'weil'",answer:"Ich bin müde, weil ich viel arbeite.",hint:"weil-clause: verb last"},
    {type:"errorCorrect",prompt:"Obwohl es ist kalt, gehe ich laufen. → Fix.",answer:"Obwohl es kalt ist, gehe ich laufen.",hint:"obwohl-clause: conjugated verb at end"}
  ],
  tags:["subordinate clauses","weil","dass","word order","verb final","A2"]
},
{
  id:"g_a2_04", level:"A2", topic:"adjectives",
  title:"Adjective endings — predicate and attributive",
  explanation:"Predicate adjectives (after sein) have no ending. Attributive adjectives (before a noun) take endings that depend on gender, case, and whether a definite or indefinite article precedes them.",
  keyPoints:[
    "Predicate: Das Buch ist interessant. (no ending)",
    "After definite article (der/die/das): add -e or -en",
    "After indefinite article (ein/eine): add -er/-e/-es or -en",
    "Without article: strong endings mirroring the article",
    "Shortcut: after definite articles → -e (nom/acc neuter-f) or -en (all other)"
  ],
  examples:[
    {de:"Das Buch ist interessant.",en:"The book is interesting.",note:"predicate = no ending"},
    {de:"Das interessante Buch liegt dort.",en:"The interesting book is there.",note:"def article + neuter → -e"},
    {de:"Ich lese ein interessantes Buch.",en:"I'm reading an interesting book.",note:"indef article + neuter acc → -es"},
    {de:"Der alte Mann wartet.",en:"The old man waits.",note:"def article + masculine → -e"},
    {de:"Sie trinkt kalten Kaffee.",en:"She drinks cold coffee.",note:"no article + masculine acc → -en"}
  ],
  errors:[
    "Adding endings to predicate adjectives: 'Das Buch ist interessantes' → interessant",
    "Using -e for all positions: 'ein alte Mann' → ein alter Mann",
    "This is a complex area — focus on the most common patterns first"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Das Buch ist sehr gut___. (predicate)",answer:"gut",hint:"Predicate adjectives have no ending"},
    {type:"fillBlank",prompt:"Der alt___ Mann schläft. (after definite article)",answer:"alte",hint:"After definite article, masculine nominative → -e"},
    {type:"fillBlank",prompt:"Ich habe einen gut___ Freund.",answer:"guten",hint:"After indefinite article, masculine accusative → -en"},
    {type:"choice",prompt:"ein schön___ Tag (m, nom): -er oder -e?",answer:"ein schöner Tag",hint:"Masculine nominative after ein: -er"}
  ],
  tags:["adjective endings","attributive","predicate","A2"]
},
{
  id:"g_a2_05", level:"A2", topic:"prepositions",
  title:"Two-way prepositions (Wechselpräpositionen)",
  explanation:"Nine prepositions take either dative (location) or accusative (direction): an, auf, hinter, in, neben, über, unter, vor, zwischen. Location = dative (Wo?). Direction = accusative (Wohin?).",
  keyPoints:[
    "Location/state (Wo?): dative — Das Buch liegt auf dem Tisch.",
    "Direction/movement (Wohin?): accusative — Ich lege das Buch auf den Tisch.",
    "The nine: an, auf, hinter, in, neben, über, unter, vor, zwischen",
    "Tip: liegen/stehen/hängen/sein = location = dative",
    "Tip: legen/stellen/hängen/fahren = direction = accusative"
  ],
  examples:[
    {de:"Das Buch liegt auf dem Tisch.",en:"The book is on the table.",note:"location = dative: dem"},
    {de:"Ich lege das Buch auf den Tisch.",en:"I put the book on the table.",note:"direction = accusative: den"},
    {de:"Das Kind sitzt in der Schule.",en:"The child is at school.",note:"location, feminine = der"},
    {de:"Das Kind geht in die Schule.",en:"The child goes to school.",note:"direction, feminine = die"},
    {de:"Er hängt das Bild an die Wand.",en:"He hangs the picture on the wall.",note:"direction = accusative"}
  ],
  errors:[
    "'Ich fahre in dem Park' → in den Park (movement → accusative)",
    "'Das Buch liegt auf den Tisch' → auf dem Tisch (location → dative)",
    "Contractions: in + dem = im, an + dem = am, in + das = ins, an + das = ans"
  ],
  exercises:[
    {type:"choice",prompt:"Das Buch liegt auf ___ Tisch (m). (dem/den)",answer:"dem",hint:"liegt = location (Wo?) → dative"},
    {type:"choice",prompt:"Ich lege das Buch auf ___ Tisch (m). (dem/den)",answer:"den",hint:"legen = direction (Wohin?) → accusative"},
    {type:"fillBlank",prompt:"Sie geht in ___ (die) Schule.",answer:"die",hint:"Wohin? direction → accusative, feminine stays die"},
    {type:"errorCorrect",prompt:"Er wohnt in den Stadtmitte. → Fix the case.",answer:"Er wohnt in der Stadtmitte.",hint:"wohnen = location → dative, feminine → der"},
    {type:"choice",prompt:"Die Katze sitzt unter ___ Stuhl (m). (dem/den)",answer:"dem",hint:"sitzen = location → dative"}
  ],
  tags:["Wechselpräpositionen","dative","accusative","prepositions","A2"]
},
{
  id:"g_a2_06", level:"A2", topic:"comparatives",
  title:"Comparatives and superlatives",
  explanation:"To compare things in German, add -er for comparative and -(e)sten for superlative. Many common adjectives have umlaut changes.",
  keyPoints:[
    "Comparative: adjective + -er (schnell → schneller)",
    "als = than: Ich bin größer als du.",
    "Superlative: am + adjective + -sten (schnellsten)",
    "Common irregular forms: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten",
    "Adjectives ending in -t/-d/-s/-z add -esten: kurz → am kürzesten"
  ],
  examples:[
    {de:"Berlin ist größer als München.",en:"Berlin is bigger than Munich.",note:"größer = comparative of groß"},
    {de:"Das ist das schönste Museum.",en:"That is the most beautiful museum.",note:"superlative before noun"},
    {de:"Ich laufe schneller als er.",en:"I run faster than him.",note:"schneller = comparative"},
    {de:"Das schmeckt am besten.",en:"That tastes best.",note:"gut → besser → am besten"},
    {de:"Ich mag Kaffee lieber als Tee.",en:"I like coffee more than tea.",note:"gern → lieber"}
  ],
  errors:[
    "'mehr schön' → schöner (no 'mehr' for adjectives, only for 'viel')",
    "Forgetting umlaut: 'alter' → no, 'alt → älter'; 'groß → größer'",
    "Using 'wie' for comparison: 'größer wie' → größer ALS"
  ],
  exercises:[
    {type:"transform",prompt:"Form the comparative: schnell",answer:"schneller",hint:"Add -er to the stem"},
    {type:"fillBlank",prompt:"Berlin ist größer ___ München.",answer:"als",hint:"than = als in comparisons"},
    {type:"transform",prompt:"Form: gut → comparative",answer:"besser",hint:"Irregular! gut → besser"},
    {type:"fillBlank",prompt:"Das ist das schön___ Bild hier.",answer:"schönste",hint:"Superlative before noun: -ste"},
    {type:"choice",prompt:"'I like it best' = am liebsten / am meistens?",answer:"am liebsten",hint:"gern → lieber → am liebsten"}
  ],
  tags:["comparatives","superlatives","als","A2"]
},
{
  id:"g_a2_07", level:"A2", topic:"imperative",
  title:"The Imperative — giving commands and instructions",
  explanation:"The imperative is used for commands, instructions, and requests. There are three forms: du (informal sg), ihr (informal pl), and Sie (formal).",
  keyPoints:[
    "du form: verb stem only (no pronoun): Lern! Komm! (often +e for pronunciation: Arbeite!)",
    "ihr form: conjugated ihr form without pronoun: Lernt! Kommt!",
    "Sie form: infinitive + Sie: Lernen Sie! Kommen Sie!",
    "Separable verbs: prefix goes to end: Steh auf! Komm rein!",
    "Bitte (please) makes commands more polite"
  ],
  examples:[
    {de:"Lern Deutsch!",en:"Learn German! (to a friend)",note:"du imperative: stem only"},
    {de:"Lernt Deutsch!",en:"Learn German! (to a group)",note:"ihr imperative"},
    {de:"Lernen Sie Deutsch!",en:"Learn German! (formal)",note:"Sie imperative"},
    {de:"Steh bitte auf!",en:"Please stand up!",note:"separable verb: aufstehen"},
    {de:"Seid ruhig!",en:"Be quiet! (plural)",note:"irregular: sein → seid"}
  ],
  errors:[
    "Adding pronoun to du imperative: 'Lern du!' → just Lern!",
    "Wrong form for groups: 'Lern!' to a group → Lernt!",
    "Forgetting -e for pronunciation: 'Arbeit!' → Arbeite! (stem ends in -t)"
  ],
  exercises:[
    {type:"transform",prompt:"Give the 'du' imperative of 'kommen'",answer:"Komm!",hint:"Remove -en from infinitive"},
    {type:"transform",prompt:"Give the 'Sie' imperative of 'warten'",answer:"Warten Sie!",hint:"Infinitive + Sie"},
    {type:"transform",prompt:"Give the 'ihr' imperative of 'lernen'",answer:"Lernt!",hint:"ihr conjugation without pronoun"},
    {type:"errorCorrect",prompt:"Komm du sofort her! → Fix.",answer:"Komm sofort her!",hint:"du imperative never uses the pronoun 'du'"},
    {type:"transform",prompt:"Imperative (du) of 'aufstehen'",answer:"Steh auf!",hint:"Separable: prefix goes to end"}
  ],
  tags:["imperative","commands","A2"]
},

// ═══════════════════════════════════════════════
// B1 GRAMMAR
// ═══════════════════════════════════════════════
{
  id:"g_b1_01", level:"B1", topic:"tenses",
  title:"Konjunktiv II — hypotheticals, wishes, polite requests",
  explanation:"Konjunktiv II expresses hypothetical situations, wishes, and polite requests. The most useful forms come from 'würden + infinitive'. A few key verbs have their own forms.",
  keyPoints:[
    "würde + infinitive: Ich würde gern reisen. (I would like to travel.)",
    "Key irregular forms: wäre (sein), hätte (haben), könnte (können), müsste (müssen), dürfte (dürfen)",
    "Polite requests: Könnten Sie mir helfen? (Could you help me?)",
    "Wishes: Ich wünschte, ich wäre reich. (I wish I were rich.)",
    "Irrealis: Wenn ich Zeit hätte, würde ich Sport treiben. (If I had time, I would exercise.)"
  ],
  examples:[
    {de:"Ich würde gern nach Japan reisen.",en:"I would like to travel to Japan.",note:"würde + infinitive = polite wish"},
    {de:"Könnten Sie mir bitte helfen?",en:"Could you please help me?",note:"polite request with könnten"},
    {de:"Wenn ich Geld hätte, kaufte ich ein Auto.",en:"If I had money, I would buy a car.",note:"conditional with hätte"},
    {de:"Das wäre schön.",en:"That would be nice.",note:"wäre = Konj II of sein"},
    {de:"Er sollte mehr lernen.",en:"He should study more.",note:"sollte = soft obligation"}
  ],
  errors:[
    "Using Konjunktiv I instead: 'ich sei' → ich wäre (for hypotheticals)",
    "Using würde with sein/haben/modals: 'ich würde sein' → ich wäre",
    "Forgetting umlaut: 'hatte' (simple past) vs 'hätte' (Konj II) — different meanings!"
  ],
  exercises:[
    {type:"transform",prompt:"Make polite: 'Helfen Sie mir?' → use könnten",answer:"Könnten Sie mir helfen?",hint:"könnten = Konj II of können"},
    {type:"fillBlank",prompt:"Ich ___ (würde/wäre) gern Arzt.",answer:"wäre",hint:"sein → wäre in Konjunktiv II, not würde"},
    {type:"transform",prompt:"Express wish: 'Ich habe kein Auto.' → Wenn...",answer:"Wenn ich ein Auto hätte...",hint:"haben → hätte in Konjunktiv II"},
    {type:"fillBlank",prompt:"___ (können, Konj II) Sie mir bitte sagen, wo der Bahnhof ist?",answer:"Könnten",hint:"Polite request: könnten + Sie"},
    {type:"errorCorrect",prompt:"Das würde sein fantastisch. → Fix.",answer:"Das wäre fantastisch.",hint:"sein never uses würde in Konjunktiv II"}
  ],
  tags:["Konjunktiv II","würde","hätte","wäre","B1"]
},
{
  id:"g_b1_02", level:"B1", topic:"tenses",
  title:"Preterite — Präteritum (written past tense)",
  explanation:"The Präteritum is used in written German (newspapers, literature, formal reports). In speech, Perfekt is preferred — except for sein, haben, and modals, which always use Präteritum.",
  keyPoints:[
    "Regular verbs: stem + -te endings: lernte, arbeitete",
    "sein → war, waren; haben → hatte, hatten",
    "Modal verbs: musste, konnte, wollte, durfte, sollte",
    "Irregular verbs have vowel changes: gehen → ging, kommen → kam, fahren → fuhr",
    "In spoken German, use Perfekt (not Präteritum) except for sein/haben/modals"
  ],
  examples:[
    {de:"Ich war gestern krank.",en:"I was ill yesterday.",note:"war = Präteritum of sein"},
    {de:"Er hatte keine Zeit.",en:"He had no time.",note:"hatte = Präteritum of haben"},
    {de:"Sie musste früh aufstehen.",en:"She had to get up early.",note:"musste = Präteritum of müssen"},
    {de:"Das Kind weinte laut.",en:"The child cried loudly.",note:"regular: weinen → weinte"},
    {de:"Er ging nach Hause.",en:"He went home.",note:"irregular: gehen → ging"}
  ],
  errors:[
    "Using Präteritum in casual speech for regular verbs: 'Ich lernte' sounds literary → say 'Ich habe gelernt'",
    "Using Perfekt with sein/haben in writing: 'Ich bin gewesen' → ich war (in narrative text)",
    "Confusing regular -te with irregular forms: 'gehte' → ging"
  ],
  exercises:[
    {type:"transform",prompt:"Präteritum of 'sein' — er ___",answer:"war",hint:"sein → war (irregular)"},
    {type:"transform",prompt:"Präteritum of 'haben' — sie (they) ___",answer:"hatten",hint:"haben → hatte; plural → hatten"},
    {type:"transform",prompt:"Präteritum of 'müssen' — ich ___",answer:"musste",hint:"Remove umlaut: müssen → musste"},
    {type:"fillBlank",prompt:"Als Kind ___ ich (sein) sehr aktiv.",answer:"war",hint:"war = Präteritum of sein"},
    {type:"errorCorrect",prompt:"Als Kind hatte ich gespielt Fußball. → Fix (use Präteritum).",answer:"Als Kind spielte ich Fußball.",hint:"Regular Präteritum: spielen → spielte"}
  ],
  tags:["Präteritum","past tense","sein","haben","B1"]
},
{
  id:"g_b1_03", level:"B1", topic:"verbs",
  title:"Reflexive verbs",
  explanation:"Reflexive verbs use a reflexive pronoun (mich, dich, sich, uns, euch, sich) that refers back to the subject. Many German verbs are reflexive that English equivalents aren't.",
  keyPoints:[
    "Accusative reflexive pronouns: mich, dich, sich, uns, euch, sich",
    "Dative reflexive pronouns: mir, dir, sich, uns, euch, sich",
    "Accusative when verb has no other object: Ich wasche mich.",
    "Dative when verb has another accusative object: Ich wasche mir die Hände.",
    "Common reflexive verbs: sich freuen, sich ärgern, sich erinnern, sich fühlen, sich befinden"
  ],
  examples:[
    {de:"Ich wasche mich.",en:"I wash myself.",note:"accusative: no other object"},
    {de:"Ich wasche mir die Hände.",en:"I wash my hands.",note:"dative: die Hände = accusative object"},
    {de:"Er freut sich über das Geschenk.",en:"He is pleased about the gift.",note:"sich freuen = always reflexive"},
    {de:"Sie erinnert sich nicht daran.",en:"She doesn't remember it.",note:"sich erinnern = always reflexive"},
    {de:"Wie fühlen Sie sich?",en:"How do you feel?",note:"sich fühlen"}
  ],
  errors:[
    "Using non-reflexive form: 'Ich freue nicht' → Ich freue mich nicht",
    "Wrong case: 'Ich wasche mich die Hände' → mir (dative) when there's another object",
    "Forgetting sich for 3rd person: 'Er wäscht ihn' means he washes someone else!"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Ich freue ___ (reflexive, acc) über deinen Besuch.",answer:"mich",hint:"ich → mich (accusative reflexive)"},
    {type:"fillBlank",prompt:"Er hat ___ (reflexive) erkältet.",answer:"sich",hint:"er → sich (3rd person reflexive)"},
    {type:"choice",prompt:"Ich wasche ___ die Haare. (mich/mir)",answer:"mir",hint:"Dative when there is another accusative object (die Haare)"},
    {type:"errorCorrect",prompt:"Wir ärgern über das Wetter. → Fix.",answer:"Wir ärgern uns über das Wetter.",hint:"sich ärgern is always reflexive: uns (wir)"},
    {type:"fillBlank",prompt:"Erinnern Sie ___ noch daran?",answer:"sich",hint:"Sie → sich (formal/3rd person reflexive)"}
  ],
  tags:["reflexive verbs","sich","mich","B1"]
},
{
  id:"g_b1_04", level:"B1", topic:"verbs",
  title:"Separable and inseparable prefix verbs",
  explanation:"Separable prefixes detach from the verb and move to the end of the sentence. Inseparable prefixes stay attached and the Partizip II does NOT take ge-.",
  keyPoints:[
    "Separable prefixes (stressed): ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, weg-",
    "In main clause: prefix goes to end: Ich rufe dich an.",
    "In Partizip II: prefix + ge + stem: angerufen",
    "Inseparable prefixes (unstressed): be-, emp-, ent-, er-, ge-, miss-, ver-, zer-",
    "Inseparable Partizip II: NO ge-: verstanden (not *vergestanden)"
  ],
  examples:[
    {de:"Ich stehe um 7 Uhr auf.",en:"I get up at 7.",note:"separable: aufstehen → stehe...auf"},
    {de:"Ich habe um 7 Uhr aufgestanden.",en:"I got up at 7.",note:"Partizip II: auf + ge + standen"},
    {de:"Er ruft mich morgen an.",en:"He will call me tomorrow.",note:"anrufen: ruf...an"},
    {de:"Sie versteht das Problem nicht.",en:"She doesn't understand the problem.",note:"inseparable: verstehen → stays together"},
    {de:"Ich habe das verstanden.",en:"I understood that.",note:"inseparable Partizip: NO ge-: verstanden"}
  ],
  errors:[
    "Keeping separable prefix attached: 'Ich aufstehe' → Ich stehe auf",
    "Adding ge- to inseparable verbs: 'geversanden' → verstanden",
    "Separating inseparable verbs: 'Ich stehe ver mein Problem' → wrong concept"
  ],
  exercises:[
    {type:"wordOrder",prompt:"Rearrange: an / Ich / rufe / dich",answer:"Ich rufe dich an.",hint:"separable anrufen: prefix at end"},
    {type:"transform",prompt:"Partizip II of 'aufstehen'",answer:"aufgestanden",hint:"auf + ge + standen"},
    {type:"transform",prompt:"Partizip II of 'verstehen'",answer:"verstanden",hint:"inseparable prefix: NO ge-"},
    {type:"errorCorrect",prompt:"Ich aufstehe um 7 Uhr. → Fix.",answer:"Ich stehe um 7 Uhr auf.",hint:"Separable prefix goes to the end"},
    {type:"fillBlank",prompt:"Hast du die Tür ___ (zumachen, Partizip II)?",answer:"zugemacht",hint:"separable: zu + ge + macht"}
  ],
  tags:["separable verbs","inseparable verbs","prefixes","Partizip II","B1"]
},
{
  id:"g_b1_05", level:"B1", topic:"clauses",
  title:"Relative clauses",
  explanation:"Relative clauses describe a noun using a relative pronoun (der, die, das — but inflected by case). The verb goes to the end of the relative clause.",
  keyPoints:[
    "The relative pronoun agrees in GENDER with the noun it refers to",
    "The CASE is determined by the role in the relative clause",
    "Forms mirror the definite article, but genitive and dative plural add -en: dessen, deren, denen",
    "Nominative: der/die/das | Accusative: den/die/das | Dative: dem/der/dem",
    "Comma before and after relative clause"
  ],
  examples:[
    {de:"Der Mann, der dort sitzt, ist mein Vater.",en:"The man who is sitting there is my father.",note:"der Mann → der (nom in rel clause)"},
    {de:"Das Buch, das ich lese, ist interessant.",en:"The book I am reading is interesting.",note:"das Buch → das (acc in rel clause)"},
    {de:"Die Frau, der ich helfe, ist krank.",en:"The woman I am helping is ill.",note:"helfen + dative → der (f dative)"},
    {de:"Das ist der Mann, den ich kenne.",en:"That is the man I know.",note:"den = masculine accusative"},
    {de:"Das ist die Stadt, in der ich wohne.",en:"That is the city I live in.",note:"preposition + relative pronoun"}
  ],
  errors:[
    "Using 'den' for all relative pronouns: 'die Frau, den ich sehe' → die ich sehe",
    "Putting verb in wrong position: 'der dort sitzt Mann' → relative clause verb at end",
    "Missing commas around relative clause"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Der Mann, ___ dort sitzt, ist müde. (nom, m)",answer:"der",hint:"masculine nominative relative pronoun = der"},
    {type:"fillBlank",prompt:"Das Buch, ___ ich lese, ist gut. (acc, n)",answer:"das",hint:"neuter accusative relative pronoun = das"},
    {type:"fillBlank",prompt:"Die Frau, ___ ich helfe, ist nett. (dative, f)",answer:"der",hint:"helfen takes dative; feminine dative = der"},
    {type:"errorCorrect",prompt:"Das ist das Haus, das ich wohne darin. → Fix.",answer:"Das ist das Haus, in dem ich wohne.",hint:"Preposition + relative pronoun (dative after 'in' for location)"},
    {type:"fillBlank",prompt:"Der Mann, ___ (acc, m) ich kenne, heißt Peter.",answer:"den",hint:"kennen takes accusative; masculine accusative = den"}
  ],
  tags:["relative clauses","relative pronouns","B1"]
},
{
  id:"g_b1_06", level:"B1", topic:"tenses",
  title:"Future — werden + infinitive and present tense",
  explanation:"German expresses future using either present tense (with time adverb) or werden + infinitive. Werden + infinitive can also express assumptions about the present.",
  keyPoints:[
    "Present + time adverb (most common in speech): Morgen fahre ich nach Berlin.",
    "werden + infinitive (deliberate future/assumptions): Ich werde das Projekt beenden.",
    "Conjugation: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden",
    "Assumption: Das wird er wissen. (He will probably know that.)",
    "Prediction: Es wird regnen. (It will rain.)"
  ],
  examples:[
    {de:"Morgen fahre ich nach Berlin.",en:"Tomorrow I will go to Berlin.",note:"Present + time word (natural speech)"},
    {de:"Ich werde nächstes Jahr studieren.",en:"I will study next year.",note:"werden + infinitive for deliberate plan"},
    {de:"Es wird morgen regnen.",en:"It will rain tomorrow.",note:"prediction with werden"},
    {de:"Er wird es wissen.",en:"He will probably know.",note:"assumption about present"},
    {de:"Du wirst das schaffen!",en:"You will manage it!",note:"confident prediction/encouragement"}
  ],
  errors:[
    "Using 'werden' without infinitive: 'Ich werde nach Berlin' → Ich werde nach Berlin fahren",
    "Putting infinitive in wrong position: 'Ich werde fahren nach Berlin' → fahren goes last",
    "Overusing werden: in spoken German, present + time adverb is more natural"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Ich ___ (werden) das Buch lesen.",answer:"werde",hint:"ich form of werden"},
    {type:"wordOrder",prompt:"Rearrange: werde / nach / Ich / Berlin / fahren",answer:"Ich werde nach Berlin fahren.",hint:"werden in position 2, infinitive at end"},
    {type:"transform",prompt:"Express future: 'Sie lernt Deutsch.' (mit werden)",answer:"Sie wird Deutsch lernen.",hint:"werden + infinitive at end"},
    {type:"fillBlank",prompt:"Er ___ (werden) pünktlich ankommen.",answer:"wird",hint:"er form of werden"}
  ],
  tags:["future tense","werden","B1"]
},

// ═══════════════════════════════════════════════
// B2 GRAMMAR
// ═══════════════════════════════════════════════
{
  id:"g_b2_01", level:"B2", topic:"voice",
  title:"Passive voice — Vorgangspassiv and Zustandspassiv",
  explanation:"The passive shifts focus from the actor to the action/result. Vorgangspassiv (process) uses werden + Partizip II. Zustandspassiv (state) uses sein + Partizip II.",
  keyPoints:[
    "Vorgangspassiv: wird/werden + Partizip II — Das Buch wird gelesen.",
    "Agent (by whom): von + dative — Das Buch wird von ihr gelesen.",
    "Zustandspassiv: ist/sind + Partizip II — Das Fenster ist geöffnet.",
    "Vorgangspassiv = the action happening | Zustandspassiv = the resulting state",
    "Tenses: Past passive: Das Buch wurde gelesen. Perfect: Das Buch ist gelesen worden."
  ],
  examples:[
    {de:"Das Buch wird gelesen.",en:"The book is being read.",note:"Vorgangspassiv present"},
    {de:"Das Fenster wurde geöffnet.",en:"The window was opened.",note:"Vorgangspassiv past"},
    {de:"Das Fenster ist geöffnet.",en:"The window is open.",note:"Zustandspassiv: resulting state"},
    {de:"Der Brief wird von ihr geschrieben.",en:"The letter is being written by her.",note:"von + dative = agent"},
    {de:"Das Gesetz ist beschlossen worden.",en:"The law has been passed.",note:"Perfekt passive: worden"}
  ],
  errors:[
    "Using sein for Vorgangspassiv: 'Das Buch ist gelesen' = state (already read) not action",
    "Using werden for Zustandspassiv: 'Das Fenster wird geöffnet' = being opened (action) vs 'ist geöffnet' = is open (state)",
    "Perfekt passive: 'ist geschrieben geworden' → ist geschrieben WORDEN (worden, not geworden!)"
  ],
  exercises:[
    {type:"transform",prompt:"Active → Passive: 'Man baut eine Brücke.'",answer:"Eine Brücke wird gebaut.",hint:"werden + Partizip II; man is dropped"},
    {type:"choice",prompt:"The window is open (state) = ___ (wird geöffnet / ist geöffnet)",answer:"ist geöffnet",hint:"State → Zustandspassiv with sein"},
    {type:"transform",prompt:"Passive past: 'Das Lied wird gesungen.' → yesterday",answer:"Das Lied wurde gesungen.",hint:"Present wurde = Präteritum of werden"},
    {type:"errorCorrect",prompt:"Das Projekt ist vollendet geworden. → Fix.",answer:"Das Projekt ist vollendet worden.",hint:"Passive Perfekt: worden not geworden"},
    {type:"fillBlank",prompt:"Der Täter ___ (passive, Präteritum) von der Polizei verhaftet.",answer:"wurde",hint:"Vorgangspassiv past: wurde + Partizip II"}
  ],
  tags:["passive","Vorgangspassiv","Zustandspassiv","B2"]
},
{
  id:"g_b2_02", level:"B2", topic:"clauses",
  title:"Extended participial phrases (Partizipialkonstruktionen)",
  explanation:"Participial phrases use the present or past participle to create compact relative-clause alternatives. Very common in written German.",
  keyPoints:[
    "Present participle: infinitive + -d: laufend, singend",
    "Past participle: as in Perfekt: geschrieben, gebaut",
    "Extended attribute: comes between article and noun with all modifiers inside",
    "Equivalent of relative clause: 'der dort sitzende Mann' = 'der Mann, der dort sitzt'",
    "Very common in written/formal German; rare in speech"
  ],
  examples:[
    {de:"Der schlafende Hund träumt.",en:"The sleeping dog is dreaming.",note:"present participle as adjective"},
    {de:"Das geöffnete Fenster lässt Luft herein.",en:"The opened window lets air in.",note:"past participle as adjective"},
    {de:"Der von vielen gelesene Roman...",en:"The novel read by many...",note:"extended participial phrase"},
    {de:"Die im letzten Jahr erschienene Studie...",en:"The study published last year...",note:"extended attributive"},
    {de:"Der auf dem Tisch liegende Brief ist wichtig.",en:"The letter lying on the table is important.",note:"vs relative clause"}
  ],
  errors:[
    "Using participial phrases in casual speech — they are formal/written style",
    "Missing adjective endings: 'der schlafend Hund' → der schlafende Hund",
    "Don't confuse with Vorgangspassiv: being built = wird gebaut (not 'gebaute')"
  ],
  exercises:[
    {type:"transform",prompt:"Convert to participial phrase: 'der Mann, der schläft'",answer:"der schlafende Mann",hint:"schlaf- + -end + adjective ending -e"},
    {type:"transform",prompt:"Convert to participial phrase: 'das Buch, das gelesen wurde'",answer:"das gelesene Buch",hint:"Past participle + adjective ending -e"},
    {type:"fillBlank",prompt:"Die vor einem Jahr ___ (erscheinen, Partizip) Studie ist wichtig.",answer:"erschienene",hint:"Past participle of erscheinen + adjective ending -e"},
    {type:"analysis",prompt:"Identify what 'das schnell wachsende Unternehmen' means in full.",answer:"das Unternehmen, das schnell wächst",hint:"Extended participial phrase = relative clause equivalent"}
  ],
  tags:["participles","Partizipialkonstruktion","B2","written German"]
},
{
  id:"g_b2_03", level:"B2", topic:"clauses",
  title:"Infinitive constructions with 'zu'",
  explanation:"Infinitive clauses with 'zu' are used after many verbs, adjectives, and nouns. With separable verbs, 'zu' is inserted between prefix and stem.",
  keyPoints:[
    "Standard: Ich versuche, Deutsch zu lernen.",
    "With separable verb: zu goes between prefix and stem: aufzustehen",
    "um...zu = in order to: Ich lerne, um zu bestehen.",
    "ohne...zu = without doing: ohne zu fragen",
    "anstatt...zu = instead of doing: anstatt zu arbeiten",
    "After haben, sein + adjective, modal equivalents"
  ],
  examples:[
    {de:"Ich versuche, jeden Tag zu lernen.",en:"I try to learn every day.",note:"zu + infinitive, comma before clause"},
    {de:"Es ist wichtig, pünktlich aufzustehen.",en:"It is important to get up on time.",note:"separable: auf-zu-stehen"},
    {de:"Ich lerne, um die Prüfung zu bestehen.",en:"I study in order to pass the exam.",note:"um...zu = in order to"},
    {de:"Er geht, ohne zu grüßen.",en:"He leaves without saying hello.",note:"ohne...zu"},
    {de:"Sie hat vor, zu studieren.",en:"She plans to study.",note:"vorhaben + zu"}
  ],
  errors:[
    "Missing zu: 'Ich versuche lernen' → zu lernen",
    "Separable verb: 'zu aufzustehen' → aufzustehen (zu goes IN BETWEEN)",
    "Missing comma: 'Ich versuche Deutsch zu lernen' — needs comma in formal writing",
    "Don't use zu after modal verbs: 'Ich kann zu schwimmen' → Ich kann schwimmen"
  ],
  exercises:[
    {type:"transform",prompt:"Combine: 'Ich versuche. + Ich lerne Deutsch.'",answer:"Ich versuche, Deutsch zu lernen.",hint:"zu + infinitive at end, comma before clause"},
    {type:"fillBlank",prompt:"Es ist wichtig, früh auf___stehen.",answer:"aufzustehen",hint:"Separable verb: auf + zu + stehen"},
    {type:"wordOrder",prompt:"Form: Ich / lerne / bestehen / Prüfung / um / zu / die",answer:"Ich lerne, um die Prüfung zu bestehen.",hint:"um...zu = in order to; infinitive at very end"},
    {type:"errorCorrect",prompt:"Er plant zu Deutschland zu besuchen. → Fix.",answer:"Er plant, Deutschland zu besuchen.",hint:"zu goes before infinitive, not before the object"}
  ],
  tags:["zu-infinitive","um zu","ohne zu","B2"]
},
{
  id:"g_b2_04", level:"B2", topic:"clauses",
  title:"Double connectors and logical conjunctions",
  explanation:"Double connectors link parallel elements and show logical relationships. They appear in pairs and require attention to word order.",
  keyPoints:[
    "sowohl...als auch = both...and: sowohl interessant als auch nützlich",
    "weder...noch = neither...nor: weder ich noch er",
    "entweder...oder = either...or: entweder du oder ich",
    "nicht nur...sondern auch = not only...but also",
    "zwar...aber = indeed/admittedly...but: Das ist zwar teuer, aber gut.",
    "einerseits...andererseits = on the one hand...on the other"
  ],
  examples:[
    {de:"Das ist sowohl billig als auch praktisch.",en:"That is both cheap and practical.",note:"sowohl...als auch"},
    {de:"Weder ich noch mein Bruder war dabei.",en:"Neither I nor my brother was there.",note:"weder...noch"},
    {de:"Das ist nicht nur teuer, sondern auch nutzlos.",en:"That is not only expensive but also useless.",note:"nicht nur...sondern auch"},
    {de:"Das ist zwar schwierig, aber machbar.",en:"That is admittedly difficult, but doable.",note:"zwar...aber (concession)"},
    {de:"Entweder du kommst, oder ich gehe.",en:"Either you come, or I leave.",note:"entweder...oder — inversion after oder!"}
  ],
  errors:[
    "'sowohl...und auch' → sowohl...ALS auch",
    "'zwar...doch' — doch can be used but aber is safer",
    "Word order after 'sondern auch': main clause word order, not subordinate"
  ],
  exercises:[
    {type:"fillBlank",prompt:"Das Essen ist sowohl lecker ___ auch günstig.",answer:"als",hint:"sowohl...ALS auch (not und)"},
    {type:"fillBlank",prompt:"Ich mag ___ Kaffee ___ Tee. (neither...nor)",answer:"weder / noch",hint:"weder...noch"},
    {type:"transform",prompt:"Combine: 'Das ist teuer. Und es ist nutzlos.' (nicht nur...sondern auch)",answer:"Das ist nicht nur teuer, sondern auch nutzlos.",hint:"nicht nur before first quality, sondern auch before second"},
    {type:"choice",prompt:"'admittedly good but expensive': zwar gut, ___ teuer",answer:"aber",hint:"zwar...ABER for concession"}
  ],
  tags:["double connectors","sowohl","weder","nicht nur","B2"]
},

// ═══════════════════════════════════════════════
// C1 GRAMMAR
// ═══════════════════════════════════════════════
{
  id:"g_c1_01", level:"C1", topic:"style",
  title:"Konjunktiv I — reported speech",
  explanation:"Konjunktiv I is used to report what someone said without endorsing it. It is the standard in newspapers, official reports, and academic writing.",
  keyPoints:[
    "Forms: from infinitive stem, add Konjunktiv I endings: -e, -est, -e, -en, -et, -en",
    "er/sie/es form is most distinctive: er sage, er habe, er sei",
    "sein: sei; haben: habe; werden: werde; modals follow same pattern",
    "If Konjunktiv I looks like indicative, use Konjunktiv II instead",
    "Reporting verbs: sagen, berichten, erklären, betonen, hinweisen"
  ],
  examples:[
    {de:"Er sagt, er sei krank.",en:"He says he is ill.",note:"sei = Konj I of sein"},
    {de:"Sie berichtete, das Projekt habe Erfolg gehabt.",en:"She reported the project had been successful.",note:"habe = Konj I of haben"},
    {de:"Die Regierung erklärte, die Wirtschaft wachse.",en:"The government stated the economy was growing.",note:"wachse = Konj I of wachsen"},
    {de:"Laut Polizei sei der Täter flüchtig.",en:"According to police, the suspect is at large.",note:"laut + Konj I in news"},
    {de:"Er behauptete, er habe das nicht gewusst.",en:"He claimed he had not known that.",note:"Perfekt Konj I: habe + Partizip II"}
  ],
  errors:[
    "Using indicative in reported speech: 'Er sagt, er ist krank.' — grammatically OK in speech, but use Konjunktiv I in formal writing",
    "Using Konjunktiv II when Konjunktiv I is distinct: 'er würde sagen' → er sage (if sei, habe, werde are unambiguous)",
    "Confusing Konjunktiv I and II: sei (Konj I) vs wäre (Konj II)"
  ],
  exercises:[
    {type:"transform",prompt:"Reported speech: 'Ich bin krank.' (Er sagt, ...)",answer:"Er sagt, er sei krank.",hint:"sein → sei in Konjunktiv I"},
    {type:"transform",prompt:"Reported speech: 'Wir haben gewonnen.' (Sie meldeten, ...)",answer:"Sie meldeten, sie hätten gewonnen.",hint:"Perfekt Konj I: hätten + Partizip II"},
    {type:"fillBlank",prompt:"Der Minister erklärte, die Lage ___ (sein, Konj I) stabil.",answer:"sei",hint:"sein → sei (er/sie/es form, Konjunktiv I)"},
    {type:"analysis",prompt:"Why is Konjunktiv II sometimes used in reported speech instead of Konjunktiv I?",answer:"When Konjunktiv I forms look identical to the indicative (e.g. wir kommen = Konj I AND indicative), use Konjunktiv II to make reported speech clear."}
  ],
  tags:["Konjunktiv I","reported speech","indirect speech","C1","formal"]
},
{
  id:"g_c1_02", level:"C1", topic:"style",
  title:"Nominalisierung — converting verbs and adjectives to nouns",
  explanation:"Academic and formal German prefers nominalised forms. Converting verbs and adjectives to nouns creates a more elevated, compressed style.",
  keyPoints:[
    "Verb → noun: often infinitive or derived noun: forschen → die Forschung, wachsen → das Wachstum",
    "Adjective → noun (with article): das Schöne, das Wichtige",
    "Common suffixes: -ung (f), -heit (f), -keit (f), -schaft (f), -nis (n), -tum (n)",
    "Nominalisation compresses information: 'Die Tatsache, dass...' vs 'Es ist Tatsache, dass...'",
    "Overuse of nominalisations is called 'Nominalstil' — academic style but can obscure meaning"
  ],
  examples:[
    {de:"die Verbesserung der Situation",en:"the improvement of the situation",note:"verbessern → die Verbesserung (-ung)"},
    {de:"das Wachstum der Wirtschaft",en:"the growth of the economy",note:"wachsen → das Wachstum"},
    {de:"die Untersuchung des Phänomens",en:"the investigation of the phenomenon",note:"untersuchen → die Untersuchung"},
    {de:"das Scheitern des Projekts",en:"the failure of the project",note:"scheitern → das Scheitern (infinitive as noun)"},
    {de:"die Wichtigkeit der Bildung",en:"the importance of education",note:"wichtig → die Wichtigkeit (-keit)"}
  ],
  errors:[
    "Wrong gender: -ung is always feminine, -heit/-keit always feminine",
    "Using verbal style in academic writing when nominalisation is expected",
    "Stacking too many nominalisations: obscures meaning even for native speakers"
  ],
  exercises:[
    {type:"transform",prompt:"Nominalise: 'entwickeln'",answer:"die Entwicklung",hint:"-ung suffix, always feminine"},
    {type:"transform",prompt:"Nominalise: 'wichtig'",answer:"die Wichtigkeit",hint:"-keit suffix, always feminine"},
    {type:"transform",prompt:"Nominalise: 'wachsen' (use -tum suffix)",answer:"das Wachstum",hint:"-tum suffix → neuter"},
    {type:"fillBlank",prompt:"Die ___ (forschen → noun) macht Fortschritte.",answer:"Forschung",hint:"-ung suffix from Verb"},
    {type:"analysis",prompt:"What gender is any noun ending in -heit or -keit?",answer:"Always feminine (die)"}
  ],
  tags:["Nominalisierung","nominalisation","word formation","C1","academic"]
},
{
  id:"g_c1_03", level:"C1", topic:"clauses",
  title:"Complex sentence structures and multi-clause sentences",
  explanation:"C1 writing requires long, complex sentences with multiple embedded clauses, coordinated with logical connectors. Mastery of word order within all clause types is essential.",
  keyPoints:[
    "Multiple subordinate clauses can be embedded or coordinated",
    "Verb-final rule applies in each subordinate clause independently",
    "Coherent linking: causal (da, weil), concessive (obwohl, wenngleich), conditional (sofern, falls), consecutive (sodass)",
    "Infinitive clauses can extend sentences elegantly: um...zu, anstatt...zu, ohne...zu",
    "Maintain consistent register throughout — don't mix formal and informal markers"
  ],
  examples:[
    {de:"Da die Ressourcen begrenzt sind, ist es notwendig, effizientere Lösungen zu entwickeln.",en:"Since resources are limited, it is necessary to develop more efficient solutions.",note:"da-clause + infinitive clause"},
    {de:"Obwohl die Kosten gestiegen sind, hat das Unternehmen, das in nachhaltige Technologien investiert, seinen Marktanteil erhöht.",en:"Although costs have risen, the company that invested in sustainable technologies has increased its market share.",note:"Multiple embedded clauses"},
    {de:"Es bleibt zu hoffen, dass die Politik, sofern sie die wissenschaftlichen Erkenntnisse berücksichtigt, geeignete Maßnahmen ergreift.",en:"It remains to be hoped that politics, if it takes scientific findings into account, will take appropriate measures.",note:"Complex embedded structure"}
  ],
  errors:[
    "Verb order errors in embedded clauses within longer sentences",
    "Losing track of the main verb position when multiple clauses precede it",
    "Inconsistent register: mixing academic tone with colloquialisms"
  ],
  exercises:[
    {type:"analysis",prompt:"Identify all clauses in: 'Da die Wirtschaft wächst, obwohl die Inflation steigt, investieren viele Unternehmen.'",answer:"Main clause: investieren viele Unternehmen. | da-clause (causal): da die Wirtschaft wächst | obwohl-clause (concessive): obwohl die Inflation steigt"},
    {type:"transform",prompt:"Combine using 'obwohl' and 'da': 'Es regnet.' + 'Ich gehe spazieren.' + 'Ich mag frische Luft.'",answer:"Obwohl es regnet, gehe ich spazieren, da ich frische Luft mag.",hint:"obwohl-clause inverts main clause; da-clause follows"},
    {type:"errorCorrect",prompt:"Weil die Preise steigen, ist die Inflation hoch, da viele Faktoren es spielen eine Rolle. → Fix the final clause.",answer:"Weil die Preise steigen, ist die Inflation hoch, da viele Faktoren eine Rolle spielen.",hint:"da-clause: verb must be at the end"},
    {type:"transform",prompt:"Make more complex: 'Das Projekt ist erfolgreich. Wir hatten Probleme.' → combine with 'obwohl' and 'sodass'",answer:"Obwohl wir Probleme hatten, ist das Projekt so erfolgreich, sodass wir weitermachen können.",hint:"obwohl for concession, sodass for consequence"},
    {type:"errorCorrect",prompt:"Sofern die Regierung handelt, wird die Situation, die kritisch ist, sich verbessern können. → Improve the relative clause position.",answer:"Sofern die Regierung handelt, wird sich die kritische Situation verbessern können.",hint:"Use participial phrase instead of embedded relative clause for elegance"},
    {type:"fillBlank",prompt:"Es ist notwendig, ___ (um / damit) die Emissionen zu reduzieren, Gesetze zu ändern.",answer:"um",hint:"um...zu = in order to (one subject); damit when subjects differ"},
    {type:"analysis",prompt:"Why is 'Da' preferred over 'weil' at the start of a sentence in formal writing?",answer:"'Da' (since/as) typically opens the sentence in formal/written German. 'Weil' (because) is used in spoken language or mid-sentence. Both send verb to end, but 'da' signals a known/shared premise rather than a direct cause."}
  ],
  tags:["complex sentences","subordinate clauses","word order","C1"]
},
{
  id:"g_c1_04", level:"C1", topic:"style",
  title:"Concessive and adversative structures",
  explanation:"Academic writing requires nuanced concession — acknowledging counter-arguments before refuting them. Master the formal concessive connectors for C1.",
  keyPoints:[
    "wenngleich / obgleich / obschon = even though (more formal than obwohl)",
    "zwar...aber / zwar...jedoch / zwar...doch = admittedly...but",
    "gleichwohl / dennoch / nichtsdestotrotz = nevertheless",
    "ungeachtet (+ gen) = regardless of: ungeachtet der Kosten",
    "trotz (+ gen) = despite: trotz der Schwierigkeiten",
    "Structure: Concede the point → use adversative → make main argument"
  ],
  examples:[
    {de:"Wenngleich die Kosten hoch sind, überwiegen die Vorteile.",en:"Even though the costs are high, the advantages outweigh them.",note:"wenngleich = formal obwohl"},
    {de:"Das Projekt ist zwar teuer, jedoch unverzichtbar.",en:"The project is admittedly expensive, but indispensable.",note:"zwar...jedoch = formal version"},
    {de:"Trotz aller Schwierigkeiten gelang die Umsetzung.",en:"Despite all difficulties, implementation succeeded.",note:"trotz + genitive"},
    {de:"Ungeachtet der Kritik hält die Regierung an ihrem Kurs fest.",en:"Regardless of criticism, the government maintains its course.",note:"ungeachtet + genitive"},
    {de:"Die Maßnahme ist unpopulär; gleichwohl ist sie notwendig.",en:"The measure is unpopular; nevertheless it is necessary.",note:"gleichwohl = formal nevertheless"}
  ],
  errors:[
    "Using colloquial connectors in academic text: 'aber trotzdem' → gleichwohl or dennoch",
    "'trotz' with dative: 'trotz dem Regen' → trotz des Regens (genitive!)",
    "Overusing 'jedoch' — varies register using dennoch, gleichwohl, nichtsdestotrotz"
  ],
  exercises:[
    {type:"fillBlank",prompt:"___ der hohen Kosten wurde das Projekt genehmigt. (despite, + gen)",answer:"Trotz",hint:"trotz + genitive = despite"},
    {type:"transform",prompt:"Make more formal: 'Obwohl es schwierig ist, versuchen wir es.'",answer:"Wenngleich es schwierig ist, versuchen wir es.",hint:"wenngleich = formal obwohl"},
    {type:"fillBlank",prompt:"Das ist zwar teuer, ___ (but/nevertheless) notwendig.",answer:"jedoch",hint:"zwar...jedoch = formal concessive pair"},
    {type:"choice",prompt:"'Despite the rain' = trotz dem Regen / trotz des Regens?",answer:"trotz des Regens",hint:"trotz always takes the GENITIVE case"},
    {type:"transform",prompt:"Make more formal: 'Trotzdem ist es wichtig.'",answer:"Gleichwohl ist es wichtig.",hint:"gleichwohl = formal nevertheless"}
  ],
  tags:["concessive","wenngleich","trotz","gleichwohl","C1","formal","academic"]
},
{
  id:"g_c1_05", level:"C1", topic:"style",
  title:"Genitive case — usage and common constructions",
  explanation:"The genitive expresses possession and is used after certain prepositions. In academic writing it is essential; in spoken German it is often replaced by 'von + dative'.",
  keyPoints:[
    "Definite article genitive: des (m/n), der (f/pl)",
    "Masculine and neuter nouns add -(e)s: des Mannes, des Buches",
    "Genitive prepositions: wegen, trotz, während, aufgrund, angesichts, ungeachtet, statt",
    "Genitive attribute: das Buch des Lehrers (= the teacher's book)",
    "Genitive can replace von: die Meinung der Experten = die Meinung von Experten"
  ],
  examples:[
    {de:"Das Buch des Lehrers liegt auf dem Tisch.",en:"The teacher's book is on the table.",note:"genitive attribute: des + masculine"},
    {de:"Wegen des schlechten Wetters blieb ich zu Hause.",en:"Because of the bad weather I stayed home.",note:"wegen + genitive"},
    {de:"Aufgrund der Forschungsergebnisse muss man schlussfolgern...",en:"Based on the research findings one must conclude...",note:"aufgrund + genitive (academic)"},
    {de:"Angesichts der globalen Herausforderungen...",en:"In view of the global challenges...",note:"angesichts + genitive"},
    {de:"Die Qualität der Arbeit hat sich verbessert.",en:"The quality of the work has improved.",note:"genitive attribute feminine"}
  ],
  errors:[
    "Using von instead of genitive in formal writing: 'das Buch von dem Lehrer' → des Lehrers",
    "Missing -s/-es on masculine/neuter nouns: 'des Buch' → des Buches",
    "'wegen' in casual speech takes dative: 'wegen dem Regen' — acceptable in speech but use genitive in writing"
  ],
  exercises:[
    {type:"transform",prompt:"'das Haus / der Mann' → genitive phrase",answer:"das Haus des Mannes",hint:"masculine genitive: des + -es ending on noun"},
    {type:"fillBlank",prompt:"Aufgrund ___ (die schlechte Wirtschaftslage) steigt die Arbeitslosigkeit.",answer:"der schlechten Wirtschaftslage",hint:"aufgrund + genitive: der (f genitive)"},
    {type:"choice",prompt:"'wegen' takes: (accusative / dative / genitive)?",answer:"genitive",hint:"wegen, trotz, während, aufgrund, angesichts = genitive prepositions"},
    {type:"transform",prompt:"Replace: 'die Meinung von den Experten' → use genitive",answer:"die Meinung der Experten",hint:"von den Experten → der Experten (pl genitive = der)"},
    {type:"errorCorrect",prompt:"Das ist das Auto des Frauen. → Fix.",answer:"Das ist das Auto der Frau.",hint:"feminine genitive: der Frau (no -s added to Frau)"}
  ],
  tags:["genitive","wegen","aufgrund","possession","C1"]
}
];

// ─── Helper functions ─────────────────────────
window.GRAMMAR_HELPERS = {
  byLevel: (level) => window.DB_GRAMMAR.filter(g => g.level === level),
  byTopic: (level, topic) => window.DB_GRAMMAR.filter(g => g.level === level && g.topic === topic),
  byId: (id) => window.DB_GRAMMAR.find(g => g.id === id),
  random: (level) => {
    const pool = level ? window.DB_GRAMMAR.filter(g => g.level === level) : window.DB_GRAMMAR;
    return pool[Math.floor(Math.random() * pool.length)];
  },
  exercisesByType: (type) => window.DB_GRAMMAR.flatMap(g => g.exercises.filter(e => e.type === type)),
  topics: (level) => [...new Set(window.DB_GRAMMAR.filter(g => g.level === level).map(g => g.topic))]
};

console.log('DB_GRAMMAR loaded:', window.DB_GRAMMAR.length, 'rules');

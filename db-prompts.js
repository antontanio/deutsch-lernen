// DeutschLern — Prompts Database (complete)
window.DB_PROMPTS = { speaking: [], writing: [] };

// ═══ A1 SPEAKING ═══
window.DB_PROMPTS.speaking.push(
{id:"sp_a1_001",level:"A1",part:"Teil 1",title:"Sich vorstellen",timeMinutes:3,prepSeconds:0,
prompt:"Stell dich vor! Sag wie du heißt, wie alt du bist, woher du kommst, welche Sprachen du sprichst und was du gern machst.",
promptEn:"Introduce yourself! Say your name, age, where you are from, what languages you speak and what you like doing.",
task:"Give a complete self-introduction covering all five points.",
phraseBank:["Ich heiße...","Mein Name ist...","Ich bin ... Jahre alt.","Ich komme aus...","Ich wohne in...","Ich spreche...","Mein Hobby ist...","Ich mache gern...","Ich bin Schüler/in."],
requiredElements:["name","age","origin","language","hobby"],
requiredPhrases:["Ich heiße","Ich bin","Jahre alt","Ich komme"],
modelAnswer:"Hallo! Ich heiße Maria. Ich bin siebzehn Jahre alt. Ich komme aus Australien und wohne jetzt in Berlin. Ich spreche Englisch und lerne Deutsch. Mein Hobby ist Musik hören.",
rubric:{content:{weight:40,criteria:["States name","States age","States country","States language","States hobby"]},vocabulary:{weight:30,criteria:["Correct A1 personal vocabulary","Correct pronouns"]},grammar:{weight:20,criteria:["Correct sein forms","Present tense correct","Basic word order"]},fluency:{weight:10,criteria:["Stays on topic","Completes introduction"]}},
wordCount:{min:30,max:80},
commonErrors:["'Ich alt bin' → Ich bin alt","'ich heißen' → Ich heiße","'Ich habe 17' → Ich bin 17 Jahre alt"],
aiAssistRecommended:false},

{id:"sp_a1_002",level:"A1",part:"Teil 2",title:"Informationen erfragen",timeMinutes:5,prepSeconds:0,
prompt:"Du planst eine Reise. Frag deinen Partner nach: Abfahrtszeit, Kosten, Dauer der Reise, was man mitnehmen soll.",
promptEn:"You are planning a trip. Ask your partner about: departure time, cost, duration, what to bring.",
task:"Ask four questions to get the required travel information.",
phraseBank:["Wann fährt der Zug ab?","Wie viel kostet die Fahrt?","Wie lange dauert die Reise?","Was soll ich mitnehmen?","Um wie viel Uhr?","Wie teuer ist...?","Entschuldigung, ich verstehe nicht."],
requiredElements:["departure time question","cost question","duration question","packing question"],
requiredPhrases:["Wann","Wie viel kostet","Wie lange"],
modelAnswer:"Wann fährt der Zug ab? Wie viel kostet eine Fahrkarte? Wie lange dauert die Reise? Was soll ich mitbringen?",
rubric:{content:{weight:40,criteria:["Asks departure time","Asks cost","Asks duration","Asks what to bring"]},vocabulary:{weight:30,criteria:["Question words: wann, wie viel, wie lange","Travel vocabulary"]},grammar:{weight:20,criteria:["Correct verb position in questions","Correct question words"]},interaction:{weight:10,criteria:["Responds to answers","Asks for clarification"]}},
wordCount:{min:20,max:60},
commonErrors:["'Der Zug fährt wann ab?' → Wann fährt der Zug ab?","'Was kostet?' → Wie viel kostet?"],
aiAssistRecommended:false},

{id:"sp_a1_003",level:"A1",part:"Teil 3",title:"Eine Bitte formulieren",timeMinutes:3,prepSeconds:0,
prompt:"Du bist im Hotel. Erkläre das Problem und bitte höflich um Hilfe: kein heißes Wasser, das Zimmer ist zu laut.",
promptEn:"You are at a hotel. Explain the problem and politely ask for help: no hot water, room too noisy.",
task:"Explain two problems politely and request help.",
phraseBank:["Entschuldigung, ich habe ein Problem.","Es gibt kein heißes Wasser.","Das Zimmer ist sehr laut.","Können Sie mir bitte helfen?","Ich möchte bitte...","Danke schön."],
requiredElements:["polite address","problem 1 (no hot water)","problem 2 (noise)","request for help"],
requiredPhrases:["Entschuldigung","Ich habe ein Problem","bitte"],
modelAnswer:"Entschuldigung, ich habe ein Problem. Es gibt kein heißes Wasser in meinem Zimmer. Und das Zimmer ist sehr laut. Können Sie mir bitte helfen?",
rubric:{content:{weight:40,criteria:["Opens politely","Describes problem 1","Describes problem 2","Makes request"]},vocabulary:{weight:30,criteria:["Hotel vocabulary","Polite expressions"]},grammar:{weight:20,criteria:["Correct present tense","Correct modal können"]},interaction:{weight:10,criteria:["Appropriate register","Responds to receptionist"]}},
wordCount:{min:20,max:60},
commonErrors:["Missing Entschuldigung opening","Direct demands instead of polite requests"],
aiAssistRecommended:false}
);

// ═══ A2 SPEAKING ═══
window.DB_PROMPTS.speaking.push(
{id:"sp_a2_001",level:"A2",part:"Teil 1",title:"Mein Alltag",timeMinutes:5,prepSeconds:60,
prompt:"Erzähl über deinen Alltag: wann du aufstehst, was du frühstückst, wie du zur Schule/Arbeit kommst, was du abends machst.",
promptEn:"Talk about your daily routine: when you get up, what you eat for breakfast, how you get to school/work, what you do in the evenings.",
task:"Describe your daily routine covering all four points with linking words.",
phraseBank:["Ich stehe um ... Uhr auf.","Zum Frühstück esse ich...","Ich fahre mit dem Bus/Fahrrad...","Es dauert ... Minuten.","Zuerst...","Dann...","Danach...","Abends...","Ich mag es, wenn..."],
requiredElements:["wake-up time","breakfast","transport","evening activity"],
requiredPhrases:["Ich stehe","Zum Frühstück","Ich fahre","Dann"],
modelAnswer:"Ich stehe um halb sieben auf. Zum Frühstück esse ich Toast und trinke Orangensaft. Dann fahre ich mit dem Bus zur Schule — das dauert zwanzig Minuten. Abends mache ich zuerst Hausaufgaben und höre dann Musik.",
rubric:{content:{weight:35,criteria:["Wake-up time","Breakfast described","Transport described","Evening described"]},vocabulary:{weight:25,criteria:["Daily routine vocab","Time expressions","Transport vocab"]},grammar:{weight:25,criteria:["Correct present tense","Linking words used","Correct prepositions"]},fluency:{weight:15,criteria:["Speaks 2+ minutes","Uses connectors","Natural flow"]}},
wordCount:{min:50,max:120},
commonErrors:["Missing connectors: dann/danach/zuerst","'mit Bus' → mit dem Bus"],
aiAssistRecommended:false},

{id:"sp_a2_002",level:"A2",part:"Teil 2",title:"Gemeinsam planen — Ein Fest",timeMinutes:5,prepSeconds:30,
prompt:"Ihr wollt zusammen ein Fest organisieren. Sprecht über: Datum und Uhrzeit, Ort, Essen und Trinken, Aktivitäten. Einigt euch auf einen Plan.",
promptEn:"You want to organise a party together. Talk about: date and time, location, food and drink, activities. Agree on a plan.",
task:"Discuss party plans with your partner and reach agreement on all four points.",
phraseBank:["Wie wäre es mit...?","Ich schlage vor...","Das ist eine gute Idee.","Ich bin einverstanden.","Was meinst du?","Ich finde, wir sollten...","Das klingt gut.","Wir könnten..."],
requiredElements:["date/time proposal","location suggestion","food/drink discussion","activity suggestion","agreement"],
requiredPhrases:["Wie wäre es","Ich schlage vor","Ich bin einverstanden"],
modelAnswer:"Wie wäre es mit Samstag? — Das klingt gut! Wir könnten es bei mir zu Hause machen. — Super! Ich schlage vor, wir grillen. — Einverstanden! Als Aktivität könnten wir tanzen.",
rubric:{content:{weight:30,criteria:["Proposes date","Suggests location","Discusses food","Suggests activity","Agreement reached"]},vocabulary:{weight:25,criteria:["Party vocabulary","Suggestion phrases"]},grammar:{weight:25,criteria:["Modals: könnten/sollten","Konjunktiv II for suggestions"]},interaction:{weight:20,criteria:["Takes turns","Responds to partner","Reaches agreement"]}},
wordCount:{min:60,max:150},
commonErrors:["Not responding to suggestions","Using only one phrase type"],
aiAssistRecommended:false}
);

// ═══ B1 SPEAKING ═══
window.DB_PROMPTS.speaking.push(
{id:"sp_b1_001",level:"B1",part:"Teil 1",title:"Umweltschutz präsentieren",timeMinutes:7,prepSeconds:120,
prompt:"Präsentiere: 'Umweltschutz — was kann jeder tun?' Erkläre das Problem, nenne mindestens drei Maßnahmen und gib deine Meinung.",
promptEn:"Present: 'Environmental protection — what can everyone do?' Explain the problem, name three measures and give your opinion.",
task:"Structured presentation: introduction, problem, three measures, personal opinion, conclusion.",
phraseBank:["Ich möchte heute über ... sprechen.","Das Thema ist wichtig, weil...","Erstens... Zweitens... Drittens...","Meiner Meinung nach...","Ein wichtiger Aspekt ist...","Außerdem sollte man...","Zusammenfassend lässt sich sagen..."],
requiredElements:["introduction","problem description","measure 1","measure 2","measure 3","personal opinion","conclusion"],
requiredPhrases:["Ich möchte über","Erstens","Meiner Meinung nach","Zusammenfassend"],
modelAnswer:"Ich möchte heute über Umweltschutz sprechen. Das ist wichtig, weil der Klimawandel schlimmer wird. Erstens sollte man weniger Fleisch essen. Zweitens könnte man öfter Fahrrad fahren. Drittens ist Energie sparen wichtig. Meiner Meinung nach muss jeder Verantwortung übernehmen. Zusammenfassend: Kleine Schritte machen einen großen Unterschied.",
rubric:{content:{weight:30,criteria:["Introduction","Problem explained","Three measures named","Personal opinion","Conclusion"]},vocabulary:{weight:25,criteria:["Environment vocabulary","Structuring phrases","Opinion expressions"]},grammar:{weight:25,criteria:["sollte/könnte correct","weil + verb final","Present tense consistent"]},fluency:{weight:20,criteria:["Speaks 3+ minutes","Logical structure","Smooth delivery"]}},
wordCount:{min:80,max:200},
commonErrors:["No personal opinion given","Missing conclusion","Listing without linking words"],
aiAssistRecommended:false},

{id:"sp_b1_002",level:"B1",part:"Teil 2",title:"Stadt oder Land?",timeMinutes:8,prepSeconds:120,
prompt:"Diskutiert: Ist es besser, in der Stadt oder auf dem Land zu wohnen? Jeder nennt Vor- und Nachteile und begründet seine Meinung.",
promptEn:"Discuss: Is it better to live in the city or the countryside? Each names advantages and disadvantages and justifies their opinion.",
task:"Present both sides with justifications, then agree or respectfully disagree with partner.",
phraseBank:["Einerseits... andererseits...","Das stimmt, aber...","Ich sehe das anders.","Du hast recht, dass...","Ein Vorteil der Stadt ist...","Auf dem Land ist es ruhiger.","Ich finde es wichtiger, dass...","Das kommt darauf an."],
requiredElements:["city advantages","city disadvantages","rural advantages","rural disadvantages","personal preference with reason"],
requiredPhrases:["Einerseits","andererseits","Ein Vorteil","Ich finde"],
modelAnswer:"Einerseits bietet die Stadt viele Vorteile: gute Verkehrsanbindungen und Kultur. Andererseits ist es laut und teuer. Auf dem Land ist es ruhiger, aber es gibt weniger Arbeitsplätze. Ich persönlich finde die Stadt besser, weil ich gern viele Menschen treffe.",
rubric:{content:{weight:30,criteria:["City advantages","City disadvantages","Rural advantages","Rural disadvantages","Personal preference with reason"]},vocabulary:{weight:25,criteria:["Contrast vocab","Opinion vocab","City/rural vocab"]},grammar:{weight:25,criteria:["weil + verb final","Comparatives used","Adjective constructions"]},interaction:{weight:20,criteria:["Responds to partner","Agrees/disagrees politely","Builds on points"]}},
wordCount:{min:80,max:200},
commonErrors:["Only presenting one side","Missing comparison language","No personal opinion"],
aiAssistRecommended:false},

{id:"sp_b1_003",level:"B1",part:"Teil 3",title:"Schulprojekt planen",timeMinutes:6,prepSeconds:60,
prompt:"Ihr arbeitet an einem Schulprojekt 'Jugend und Medien'. Entscheidet: Welches Format? Wer macht was? Was ist das Ziel?",
promptEn:"You are working on a school project 'Youth and Media'. Decide: What format? Who does what? What is the goal?",
task:"Negotiate and reach decisions on format, tasks, and goal.",
phraseBank:["Ich würde vorschlagen...","Was hältst du von...?","Das finde ich besser, weil...","Können wir uns einigen auf...?","Ich übernehme...","Du könntest...","Unser Ziel wäre..."],
requiredElements:["format decision","task allocation","goal statement","agreement"],
requiredPhrases:["Ich würde vorschlagen","Was hältst du","Unser Ziel","einigen"],
modelAnswer:"Ich würde vorschlagen, ein Video zu machen. — Was hältst du von einer Präsentation? — Das finde ich besser, weil alle mitmachen können. Ich übernehme die Recherche, du machst die Folien. Unser Ziel wäre zu zeigen, wie soziale Medien Jugendliche beeinflussen.",
rubric:{content:{weight:30,criteria:["Format decided","Tasks allocated","Goal stated","Agreement reached"]},vocabulary:{weight:25,criteria:["Media vocabulary","Negotiation phrases","Decision expressions"]},grammar:{weight:25,criteria:["würde/könnten Konj II","weil + verb final","Infinitive constructions"]},interaction:{weight:20,criteria:["Takes turns fairly","Compromises","Clear agreement"]}},
wordCount:{min:70,max:180},
commonErrors:["Not allocating tasks","Missing goal statement","One person dominating"],
aiAssistRecommended:false}
);

// ═══ B2 SPEAKING ═══
window.DB_PROMPTS.speaking.push(
{id:"sp_b2_001",level:"B2",part:"Teil 1",title:"Digitalisierung der Bildung",timeMinutes:10,prepSeconds:300,
prompt:"Präsentiere 'Digitalisierung in der Bildung'. Stelle Argumente für und gegen digitale Lernmittel vor, beziehe Stellung und verteidige deine Meinung in der Diskussion.",
promptEn:"Present 'Digitalisation in education'. Present arguments for and against digital learning tools, take a position and defend it.",
task:"Structured presentation followed by defence of position under questioning.",
phraseBank:["Die vorliegende Frage ist vielschichtig.","Auf der einen Seite lässt sich argumentieren...","Dem steht entgegen, dass...","Ich vertrete die These, dass...","Diese Einwände können wie folgt entkräftet werden:","Zu bedenken wäre außerdem..."],
requiredElements:["thesis statement","pro-arguments (min 2)","counter-arguments (min 2)","rebuttal","personal position","conclusion"],
requiredPhrases:["Ich vertrete die These","Auf der einen Seite","Dem steht entgegen","Diese Einwände"],
modelAnswer:"Ich vertrete die These, dass digitale Hilfsmittel das Lernen verbessern können. Auf der einen Seite fördern sie individuelles Lernen. Auf der anderen Seite gibt es Bedenken zur digitalen Kluft. Diese Einwände können entkräftet werden, wenn Schulen klare Regeln setzen. Zusammenfassend überwiegen die Vorteile.",
rubric:{content:{weight:30,criteria:["Clear thesis","2+ pro-arguments","2+ counter-arguments","Rebuttal","Position","Conclusion"]},language:{weight:30,criteria:["B2 vocabulary","Complex structures","Formal register"]},structure:{weight:20,criteria:["Logical sequence","Clear transitions","Time management"]},interaction:{weight:20,criteria:["Handles questions","Defends position","Stays focused"]}},
wordCount:{min:150,max:350},
commonErrors:["Not addressing counter-arguments","No clear thesis","Weak conclusion"],
aiAssistRecommended:true,
aiAssistReason:"AI can assess argument quality, logical coherence and whether rebuttals are convincing."},

{id:"sp_b2_002",level:"B2",part:"Teil 2",title:"Diskussion: Globalisierung",timeMinutes:12,prepSeconds:300,
prompt:"Nehmt an einer moderierten Diskussion über Globalisierung teil. Vertretet unterschiedliche Standpunkte, bezieht euch auf Gegenargumente.",
promptEn:"Participate in a moderated discussion on globalisation. Represent different viewpoints, respond to counter-arguments.",
task:"Participate in structured debate, building on others' arguments and moderating when needed.",
phraseBank:["Wenn ich kurz ergänzen darf...","Das sehe ich etwas anders.","Ich möchte auf den Punkt von ... eingehen.","Meines Erachtens...","Darf ich hier einhaken?","Ich stimme zwar zu, dass..., aber...","Könnten wir zum nächsten Punkt übergehen?"],
requiredElements:["own position","response to counter-argument","nuanced agreement","justified disagreement","linking to others' points"],
requiredPhrases:["Meines Erachtens","Ich möchte auf","Ich stimme zwar zu","Darf ich einhaken"],
modelAnswer:"Meines Erachtens hat die Globalisierung mehr Vorteile gebracht. — Ich möchte auf den Punkt von Maria eingehen: Sie hat recht, dass Jobs verloren gehen. Ich stimme zwar zu, dass das ein Problem ist, aber neue Jobs entstehen auch. — Darf ich hier einhaken? Die Frage ist, ob diese Jobs überall entstehen.",
rubric:{content:{weight:25,criteria:["Clear position","Responds to others","Uses evidence","Adds arguments"]},language:{weight:35,criteria:["Wide B2 vocabulary","Complex structures","Discourse markers"]},structure:{weight:20,criteria:["Builds on others coherently","Moderates when needed"]},interaction:{weight:20,criteria:["Active participation","Polite disagreement","Collaborative"]}},
wordCount:{min:120,max:300},
commonErrors:["Not building on others","Repeating same point","Not defending against challenges"],
aiAssistRecommended:true,
aiAssistReason:"AI can assess argumentation quality and sophistication of engagement with counter-positions."}
);

// ═══ C1 SPEAKING ═══
window.DB_PROMPTS.speaking.push(
{id:"sp_c1_001",level:"C1",part:"Teil 1",title:"KI und die Zukunft der Arbeit",timeMinutes:15,prepSeconds:900,
prompt:"Halte eine Präsentation über 'Künstliche Intelligenz und die Zukunft der Arbeit'. Analysiere aus wirtschaftlicher, sozialer und ethischer Perspektive, entwickle eine nuancierte Position und verteidige sie.",
promptEn:"Give a presentation on 'Artificial Intelligence and the Future of Work'. Analyse from economic, social and ethical perspectives, develop a nuanced position and defend it.",
task:"Academic presentation with multi-perspective analysis and defence under rigorous questioning.",
phraseBank:["Ich werde das Thema aus drei Perspektiven beleuchten.","Aus wirtschaftlicher Sicht lässt sich feststellen...","Unter sozialen Gesichtspunkten...","In ethischer Hinsicht stellt sich die Frage...","Diese scheinbar widersprüchlichen Befunde lassen sich vereinbaren...","Meine These lautet...","Abschließend lässt sich konstatieren...","Dem liegt die Annahme zugrunde, dass..."],
requiredElements:["thesis","economic analysis","social analysis","ethical analysis","synthesis","nuanced conclusion","rebuttal under questioning"],
requiredPhrases:["Meine These","Aus wirtschaftlicher Sicht","Unter sozialen Gesichtspunkten","In ethischer Hinsicht","Abschließend lässt sich"],
modelAnswer:"Meine These: KI verändert die Arbeitswelt grundlegend — die Chancen überwiegen, sofern der Wandel politisch gesteuert wird. Aus wirtschaftlicher Sicht schafft KI neue Branchen. Unter sozialen Gesichtspunkten entsteht das Risiko einer Zwei-Klassen-Gesellschaft. In ethischer Hinsicht stellt sich die Frage der Verantwortung. Diese Befunde lassen sich vereinbaren: durch Umschulungsprogramme und Regulierung. Abschließend: KI ist kein Schicksal, sondern eine Gestaltungsaufgabe.",
rubric:{content:{weight:25,criteria:["Clear thesis","Economic perspective","Social perspective","Ethical perspective","Synthesis","Strong conclusion"]},language:{weight:35,criteria:["C1 vocabulary","Complex structures","Academic register","Discourse markers","Nominalisations"]},structure:{weight:20,criteria:["Logical progression","Clear signposting","Coherent argumentation"]},interaction:{weight:20,criteria:["Handles complex questions","Adapts under pressure","Acknowledges argument limits"]}},
wordCount:{min:200,max:500},
commonErrors:["Only one perspective","No synthesis","Thesis abandoned under questioning"],
aiAssistRecommended:true,
aiAssistReason:"C1 requires assessment of argumentation depth and academic register only AI can reliably evaluate."},

{id:"sp_c1_002",level:"C1",part:"Teil 2",title:"Nachhaltigkeit vs. Wirtschaftswachstum",timeMinutes:15,prepSeconds:900,
prompt:"Führt eine akademische Debatte über Nachhaltigkeit und Wirtschaftswachstum. Analysiert die Grundprämissen, entwickelt ein differenziertes Urteil und geht auf Einwände ein.",
promptEn:"Conduct an academic debate on sustainability and economic growth. Analyse the basic premises, develop a differentiated judgement and respond to objections.",
task:"Academic debate requiring sophisticated analysis, premise questioning, and synthesis.",
phraseBank:["Diese Dichotomie greift zu kurz.","Der entscheidende Punkt ist...","Wenn man die Prämisse in Frage stellt...","Ich möchte das aus einer anderen Perspektive beleuchten.","Das führt uns zur eigentlichen Frage...","Eine differenzierte Betrachtung zeigt...","Diese Kritik trifft zwar zu, aber..."],
requiredElements:["premise analysis","acknowledgement of complexity","own position","sophisticated rebuttal","synthesis"],
requiredPhrases:["Diese Dichotomie","Wenn man die Prämisse","Eine differenzierte Betrachtung","Die entscheidende Frage"],
modelAnswer:"Diese Dichotomie greift zu kurz. Wenn man die Prämisse in Frage stellt, erkennt man: Es geht nicht um Wachstum per se. Eine differenzierte Betrachtung zeigt: nachhaltige Innovation ermöglicht Wachstum. Die entscheidende Frage lautet: Wachstum wovon und für wen?",
rubric:{content:{weight:20,criteria:["Premise analysis","Complexity acknowledged","Position developed","Sophisticated rebuttal","Synthesis"]},language:{weight:40,criteria:["C1+ vocabulary","Nominalisierungen","Complex structures","Academic discourse","Nuanced qualification"]},structure:{weight:20,criteria:["Dialectical structure","Premise-to-conclusion","No logical gaps"]},interaction:{weight:20,criteria:["Rigorous under questioning","Acknowledges strong counter-points","Doesn't collapse position"]}},
wordCount:{min:200,max:500},
commonErrors:["Treating as simple for/against","Not engaging with premises","Vocabulary below C1"],
aiAssistRecommended:true,
aiAssistReason:"Requires assessment of argumentation sophistication and C1 academic register only AI can evaluate."}
);

// ═══ A1 WRITING ═══
window.DB_PROMPTS.writing.push(
{id:"wr_a1_001",level:"A1",type:"Formular",title:"Anmeldeformular ausfüllen",timeMinutes:15,
prompt:"Fülle das Anmeldeformular für einen Deutschkurs aus: Name, Vorname, Geburtsdatum, Nationalität, E-Mail, aktuelles Deutschniveau.",
promptEn:"Fill in the registration form for a German course: surname, first name, date of birth, nationality, email, current German level.",
task:"Complete all six fields of the registration form correctly.",
phraseBank:["Name:","Vorname:","Geburtsdatum: (TT.MM.JJJJ)","Nationalität:","E-Mail:","Deutschkenntnisse:"],
scaffold:"Name: ___\nVorname: ___\nGeburtsdatum: ___ (TT.MM.JJJJ)\nNationalität: ___\nE-Mail: ___\nAktuelle Deutschkenntnisse: ___",
requiredElements:["Name","Vorname","Geburtsdatum","Nationalität","E-Mail","Deutschkenntnisse"],
requiredPhrases:["Name:","Vorname:","Geburtsdatum:"],
modelAnswer:"Name: Müller\nVorname: Max\nGeburtsdatum: 15.03.2007\nNationalität: australisch\nE-Mail: max.mueller@email.com\nAktuelle Deutschkenntnisse: Anfänger / A1",
rubric:{content:{weight:50,criteria:["All six fields completed","Information plausible"]},accuracy:{weight:30,criteria:["Date format correct: DD.MM.YYYY","Email format correct"]},legibility:{weight:20,criteria:["Clear entries","All fields filled"]}},
wordCount:{min:10,max:50},
commonErrors:["Wrong date format '15/03/2007' → 15.03.2007","Missing fields"],
aiAssistRecommended:false},

{id:"wr_a1_002",level:"A1",type:"Nachricht",title:"Kurze Nachricht schreiben",timeMinutes:15,
prompt:"Schreib eine kurze Nachricht an deinen Freund Jonas. Du kannst heute nicht kommen (du bist krank). Schlage einen neuen Termin vor.",
promptEn:"Write a short message to your friend Jonas. You cannot come today (you are ill). Suggest a new time.",
task:"Write a short informal message with greeting, reason for cancellation, and new time suggestion.",
phraseBank:["Hallo Jonas!","Leider kann ich heute nicht kommen.","Ich bin krank.","Können wir uns ... treffen?","Wie wäre es mit ...?","Bis dann!","Liebe Grüße,"],
scaffold:"Hallo ___!\nLeider kann ich heute nicht kommen, weil ___.\nKönnen wir uns ___ treffen?\n___ Grüße,\n___",
requiredElements:["greeting","reason for cancellation","new time suggestion","sign-off"],
requiredPhrases:["Hallo","Leider kann ich","krank","Können wir"],
modelAnswer:"Hallo Jonas!\nLeider kann ich heute nicht kommen, weil ich krank bin. Können wir uns am Freitag treffen? Wie wäre es mit 15 Uhr?\nLiebe Grüße,\nMax",
rubric:{content:{weight:40,criteria:["Greeting present","States cannot come","Gives reason (illness)","Proposes alternative time"]},structure:{weight:30,criteria:["Has greeting","Has sign-off","3+ sentences"]},grammar:{weight:20,criteria:["weil + verb final","Correct modal: kann","Correct pronouns"]},vocabulary:{weight:10,criteria:["Appropriate informal register","leider used"]}},
wordCount:{min:30,max:60},
commonErrors:["'weil ich bin krank' → weil ich krank bin","Missing sign-off","No alternative time proposed"],
aiAssistRecommended:false}
);

// ═══ A2 WRITING ═══
window.DB_PROMPTS.writing.push(
{id:"wr_a2_001",level:"A2",type:"Brief",title:"Brief an einen Brieffreund",timeMinutes:20,
prompt:"Schreib einen Brief an deinen Brieffreund Luca in Italien. Beschreibe dein Hobby, warum du es magst, wie oft du es machst, und frage ihn nach seinem Hobby.",
promptEn:"Write a letter to your pen friend Luca in Italy. Describe your hobby, why you like it, how often you do it, and ask him about his hobby.",
task:"Write an informal letter covering all four required elements.",
phraseBank:["Lieber Luca!","Ich schreibe dir über mein Hobby.","Ich mache gern...","Ich mag es, weil...","Ich mache das ... mal pro Woche.","Was ist dein Hobby?","Schreib mir bald!","Liebe Grüße,"],
scaffold:"Lieber Luca!\nIch schreibe dir über mein Hobby. Ich ___ gern ___.\nIch mag es, weil ___. Ich mache das ___ pro Woche.\nWas ist dein Hobby? ___?\nLiebe Grüße,\n___",
requiredElements:["greeting","hobby name","reason for liking it","frequency","question about pen friend's hobby","sign-off"],
requiredPhrases:["Lieber","Ich mag es, weil","pro Woche","Was ist dein"],
modelAnswer:"Lieber Luca!\nIch schreibe dir über mein Hobby. Ich spiele gern Fußball. Ich mag es, weil es sehr spannend ist und ich gern im Team spiele. Ich spiele dreimal pro Woche. Was ist dein Hobby? Spielst du auch Sport?\nLiebe Grüße,\nMax",
rubric:{content:{weight:40,criteria:["Names hobby","Gives reason","States frequency","Asks question","Greeting + sign-off"]},structure:{weight:25,criteria:["Informal greeting","Sign-off","Logical flow"]},grammar:{weight:25,criteria:["weil + verb final","Frequency adverbs correct","Present tense consistent"]},vocabulary:{weight:10,criteria:["Hobby vocabulary","Frequency words"]}},
wordCount:{min:60,max:100},
commonErrors:["'weil es ist spannend' → weil es spannend ist","Missing question for pen friend","No frequency mentioned"],
aiAssistRecommended:false},

{id:"wr_a2_002",level:"A2",type:"E-Mail",title:"E-Mail an eine Schule",timeMinutes:20,
prompt:"Schreib eine E-Mail an eine Sprachschule. Frag nach: Kursangebot, Preis, Unterrichtszeiten, und ob es Hausaufgaben gibt.",
promptEn:"Write an email to a language school. Ask about: course options, price, lesson times, and whether there is homework.",
task:"Write a formal enquiry email with four specific questions.",
phraseBank:["Sehr geehrte Damen und Herren,","Ich interessiere mich für...","Könnten Sie mir bitte mitteilen,...","Wie viel kostet...?","Wann findet der Unterricht statt?","Gibt es Hausaufgaben?","Mit freundlichen Grüßen,"],
scaffold:"Sehr geehrte Damen und Herren,\nIch interessiere mich für ___.\nKönnten Sie mir bitte mitteilen:\n- Was für Kurse ___?\n- Wie viel ___?\n- Wann ___?\n- Gibt es ___?\nMit freundlichen Grüßen,\n___",
requiredElements:["formal greeting","interest stated","course question","price question","time question","homework question","formal sign-off"],
requiredPhrases:["Sehr geehrte","Ich interessiere mich","Könnten Sie","Mit freundlichen Grüßen"],
modelAnswer:"Sehr geehrte Damen und Herren,\nIch interessiere mich für einen Deutschkurs. Könnten Sie mir bitte mitteilen, welche Kurse Sie anbieten? Wie viel kostet ein Kurs? Wann findet der Unterricht statt? Und gibt es Hausaufgaben?\nMit freundlichen Grüßen,\nMax Müller",
rubric:{content:{weight:40,criteria:["Formal opening","States interest","Asks about courses","Asks price","Asks times","Asks homework","Formal closing"]},structure:{weight:25,criteria:["Formal greeting","Formal sign-off","Logical order"]},grammar:{weight:25,criteria:["Correct question formation","Polite modal: könnten","Formal register throughout"]},vocabulary:{weight:10,criteria:["Formal vocabulary","No informal contractions"]}},
wordCount:{min:60,max:100},
commonErrors:["Using informal Hallo instead of Sehr geehrte","Missing Mit freundlichen Grüßen","Only asking 2-3 questions instead of 4"],
aiAssistRecommended:false}
);

// ═══ B1 WRITING ═══
window.DB_PROMPTS.writing.push(
{id:"wr_b1_001",level:"B1",type:"Forumsbeitrag",title:"Meinung im Forum",timeMinutes:25,
prompt:"Schreib einen Forumsbeitrag (80–100 Wörter) zum Thema: 'Sollten Schüler Handys in der Schule benutzen dürfen?' Erkläre deine Meinung mit zwei Argumenten.",
promptEn:"Write a forum post (80–100 words) on: 'Should pupils be allowed to use mobile phones at school?' Explain your opinion with two arguments.",
task:"Write an opinion post with clear position and two justified arguments.",
phraseBank:["Meiner Meinung nach...","Ich bin der Ansicht, dass...","Erstens...","Zweitens...","Einerseits...andererseits...","Ein weiteres Argument ist...","Deshalb denke ich...","Zusammenfassend..."],
scaffold:"Meiner Meinung nach ___.\nErstens ___. [Argument + Begründung]\nZweitens ___. [Argument + Begründung]\nDeshalb denke ich, dass ___.",
requiredElements:["clear position","argument 1 with justification","argument 2 with justification","conclusion"],
requiredPhrases:["Meiner Meinung nach","Erstens","Zweitens","Deshalb"],
modelAnswer:"Meiner Meinung nach sollten Schüler Handys in der Schule benutzen dürfen. Erstens können Schüler damit schnell Informationen suchen und ihr Lernen unterstützen. Zweitens lernen sie, Technologie verantwortungsvoll zu nutzen. Natürlich gibt es auch Nachteile: Handys können ablenken. Deshalb denke ich, dass klare Regeln wichtig sind.",
rubric:{content:{weight:30,criteria:["Clear position stated","Argument 1 with reason","Argument 2 with reason","Conclusion"]},language:{weight:30,criteria:["Opinion vocabulary","Connectors: erstens, zweitens","Justification language"]},structure:{weight:25,criteria:["Logical progression","Topic sentence","Concluding sentence"]},grammar:{weight:15,criteria:["Correct subordinate clauses","Modal verbs correct","B1 structures"]}},
wordCount:{min:80,max:100},
commonErrors:["No justification for arguments","Only listing without connectors","Missing conclusion"],
aiAssistRecommended:false},

{id:"wr_b1_002",level:"B1",type:"Brief",title:"Formeller Beschwerdebrief",timeMinutes:30,
prompt:"Schreib einen formellen Brief (100–120 Wörter) an ein Hotel. Du warst letzte Woche dort. Es gab Probleme: Das Zimmer war laut, das Frühstück war kalt, und das WLAN hat nicht funktioniert. Forder eine Entschädigung.",
promptEn:"Write a formal letter (100–120 words) to a hotel. You stayed there last week. There were problems: the room was noisy, breakfast was cold, WiFi didn't work. Request compensation.",
task:"Formal complaint letter with three problems described and compensation requested.",
phraseBank:["Sehr geehrte Damen und Herren,","Ich schreibe Ihnen bezüglich meines Aufenthalts...","Leider muss ich mich beschweren, dass...","Erstens war... Zweitens... Drittens...","Ich erwarte eine Entschädigung von...","Ich bitte Sie, dieses Problem zu lösen.","Mit freundlichen Grüßen,"],
scaffold:"Sehr geehrte Damen und Herren,\nIch schreibe bezüglich meines Aufenthalts vom ___ bis ___.\nLeider muss ich mich beschweren: Erstens ___. Zweitens ___. Drittens ___.\nIch erwarte ___.\nMit freundlichen Grüßen,\n___",
requiredElements:["formal greeting","stay mentioned","problem 1 (noise)","problem 2 (cold breakfast)","problem 3 (WiFi)","compensation demand","formal sign-off"],
requiredPhrases:["Sehr geehrte","Ich schreibe bezüglich","Leider muss ich mich beschweren","Ich erwarte","Mit freundlichen Grüßen"],
modelAnswer:"Sehr geehrte Damen und Herren,\nIch schreibe Ihnen bezüglich meines Aufenthalts letzte Woche in Ihrem Hotel. Leider muss ich mich beschweren. Erstens war das Zimmer sehr laut. Zweitens war das Frühstück kalt und kaum genießbar. Drittens hat das WLAN während meines gesamten Aufenthalts nicht funktioniert. Diese Probleme haben meinen Aufenthalt erheblich beeinträchtigt. Ich erwarte eine angemessene Entschädigung. Mit freundlichen Grüßen,\nMax Müller",
rubric:{content:{weight:30,criteria:["Formal opening","Stay referenced","All 3 problems mentioned","Compensation demanded","Formal closing"]},language:{weight:30,criteria:["Formal register throughout","Complaint vocabulary","Polite but firm tone"]},structure:{weight:25,criteria:["Logical sequence","Numbered problems","Clear demand"]},grammar:{weight:15,criteria:["Perfekt or Präteritum for past events","Formal Sie-forms","Subordinate clauses correct"]}},
wordCount:{min:100,max:120},
commonErrors:["Using informal language","Forgetting compensation demand","Mixing tenses incorrectly"],
aiAssistRecommended:false},

{id:"wr_b1_003",level:"B1",type:"Erörterung",title:"Vor- und Nachteile: Soziale Medien",timeMinutes:30,
prompt:"Schreib einen Text (100–130 Wörter) über Vor- und Nachteile von sozialen Medien für Jugendliche. Komm zu einem Schluss.",
promptEn:"Write a text (100–130 words) about the advantages and disadvantages of social media for young people. Reach a conclusion.",
task:"Balanced discussion of pros and cons with a justified conclusion.",
phraseBank:["Soziale Medien haben sowohl Vor- als auch Nachteile.","Einerseits...andererseits...","Ein wichtiger Vorteil ist...","Ein großer Nachteil ist...","Auf der anderen Seite...","Alles in allem finde ich...","Meiner Meinung nach überwiegen..."],
scaffold:"Soziale Medien haben sowohl Vor- als auch Nachteile.\nEin Vorteil ist ___. Außerdem ___.\nAuf der anderen Seite ___. Ein Nachteil ist ___.\nAlles in allem finde ich, dass ___.",
requiredElements:["balanced introduction","advantage 1","advantage 2","disadvantage 1","disadvantage 2","conclusion with personal stance"],
requiredPhrases:["sowohl","einerseits","andererseits","Alles in allem"],
modelAnswer:"Soziale Medien haben sowohl Vor- als auch Nachteile für Jugendliche. Einerseits können Jugendliche mit Freunden in Kontakt bleiben und Informationen teilen. Außerdem bieten sie kreative Möglichkeiten. Andererseits kann man zu viel Zeit damit verbringen und unter Druck geraten. Ein weiterer Nachteil ist, dass Cybermobbing möglich ist. Alles in allem finde ich, dass soziale Medien nützlich sind, wenn man sie mit Maß benutzt.",
rubric:{content:{weight:30,criteria:["Balanced intro","2 advantages","2 disadvantages","Justified conclusion"]},language:{weight:30,criteria:["Contrast vocabulary: einerseits/andererseits","sowohl...als auch","Opinion phrases"]},structure:{weight:25,criteria:["Clear paragraph structure","Topic → advantages → disadvantages → conclusion"]},grammar:{weight:15,criteria:["Subordinate clauses","wenn + verb final","Varied sentence structure"]}},
wordCount:{min:100,max:130},
commonErrors:["One-sided argument","No personal conclusion","Not using contrast connectors"],
aiAssistRecommended:false}
);

// ═══ B2 WRITING ═══
window.DB_PROMPTS.writing.push(
{id:"wr_b2_001",level:"B2",type:"Erörterung",title:"Klimapolitik — Erörterung",timeMinutes:40,
prompt:"Schreib eine Erörterung (150–200 Wörter): 'Sollte die Regierung CO₂-Steuern einführen?' Stelle Argumente pro und kontra dar, widerlege das stärkste Gegenargument und komm zu einer begründeten Schlussfolgerung.",
promptEn:"Write a discussion essay (150–200 words): 'Should the government introduce CO₂ taxes?' Present arguments for and against, refute the strongest counter-argument and reach a reasoned conclusion.",
task:"Argumentative essay with thesis, balanced arguments, rebuttal, and conclusion.",
phraseBank:["Die Frage, ob..., ist viel diskutiert.","Befürworter argumentieren, dass...","Kritiker hingegen betonen...","Diesem Einwand lässt sich entgegnen...","Es wäre verfehlt zu behaupten...","Unter Abwägung aller Argumente...","Zusammenfassend lässt sich festhalten...","Angesichts dieser Überlegungen..."],
scaffold:"Die Frage, ob CO₂-Steuern eingeführt werden sollen, ist viel diskutiert.\nBefürworter argumentieren, dass ___. Außerdem ___.\nKritiker hingegen betonen, dass ___.\nDiesem Einwand lässt sich entgegnen: ___.\nUnter Abwägung aller Argumente komme ich zu dem Schluss, dass ___.",
requiredElements:["thesis/introduction","pro-arguments (min 2)","counter-argument","rebuttal of counter-argument","reasoned conclusion"],
requiredPhrases:["Befürworter argumentieren","Kritiker hingegen","Diesem Einwand lässt sich entgegnen","Unter Abwägung"],
modelAnswer:"Die Frage, ob CO₂-Steuern eingeführt werden sollen, ist gesellschaftlich viel diskutiert. Befürworter argumentieren, dass solche Steuern klimaschädliches Verhalten teurer machen und Innovationen fördern. Außerdem könnten die Einnahmen für den Klimaschutz genutzt werden. Kritiker hingegen betonen, dass CO₂-Steuern sozial ungerecht seien, da einkommensschwache Haushalte stärker belastet werden. Diesem Einwand lässt sich entgegnen, dass ein Teil der Einnahmen direkt an Bürger zurückgezahlt werden kann. Unter Abwägung aller Argumente komme ich zu dem Schluss, dass CO₂-Steuern ein wirksames Instrument sind, wenn sie sozial ausgestaltet werden.",
rubric:{content:{weight:25,criteria:["Clear introduction","2+ pro-arguments","Counter-argument stated","Rebuttal present","Reasoned conclusion"]},language:{weight:35,criteria:["B2 vocabulary range","Formal academic register","Varied connectors","Complex structures"]},structure:{weight:25,criteria:["Clear paragraphs","Logical sequence","Balanced presentation"]},grammar:{weight:15,criteria:["Konjunktiv II for indirect speech: seien","Passive constructions","Complex sentences"]}},
wordCount:{min:150,max:200},
commonErrors:["No rebuttal of counter-argument","Too informal register","Not reaching a clear conclusion"],
aiAssistRecommended:true,
aiAssistReason:"AI can assess whether the rebuttal is logically convincing and whether the B2 register is maintained throughout."}
);

// ═══ C1 WRITING ═══
window.DB_PROMPTS.writing.push(
{id:"wr_c1_001",level:"C1",type:"Akademischer Aufsatz",title:"Akademischer Aufsatz: Demokratie im digitalen Zeitalter",timeMinutes:60,
prompt:"Schreib einen akademischen Aufsatz (220–280 Wörter): 'Stärkt oder schwächt das Internet die Demokratie?' Analysiere das Thema differenziert, entwickle eine kohärente These und stütze sie mit Belegen und einer Synthese widersprüchlicher Aspekte.",
promptEn:"Write an academic essay (220–280 words): 'Does the internet strengthen or weaken democracy?' Analyse the topic in a nuanced way, develop a coherent thesis and support it with evidence and a synthesis of contradictory aspects.",
task:"Full academic essay with thesis, nuanced multi-sided analysis, evidence, synthesis, and conclusion.",
phraseBank:["Die vorliegende Frage berührt fundamentale Aspekte moderner Demokratie.","Meine These lautet, dass...","Aus einer ersten Perspektive betrachtet...","Dem steht die Beobachtung entgegen, dass...","Diese scheinbar widersprüchlichen Befunde lassen sich vereinbaren...","Es wäre jedoch vereinfachend zu behaupten...","Eine differenzierte Betrachtung legt nahe...","Abschließend lässt sich konstatieren...","Daraus ergibt sich die Schlussfolgerung..."],
scaffold:"[These/Einleitung]\nDie vorliegende Frage berührt... Meine These lautet, dass...\n[Analyse Perspektive 1]\nAus einer ersten Perspektive...\n[Analyse Perspektive 2]\nDem steht entgegen, dass...\n[Synthese]\nDiese scheinbar widersprüchlichen Befunde lassen sich vereinbaren...\n[Schluss]\nAbschließend lässt sich konstatieren...",
requiredElements:["clear thesis","perspective 1 with evidence","perspective 2 with evidence","synthesis of contradictions","nuanced conclusion"],
requiredPhrases:["Meine These","Aus einer ersten Perspektive","Dem steht","lassen sich vereinbaren","Abschließend lässt sich konstatieren"],
modelAnswer:"Die Frage, ob das Internet die Demokratie stärkt oder schwächt, berührt fundamentale Aspekte unserer Zeit. Meine These lautet, dass das Internet sowohl demokratisierend als auch antidemokratisch wirkt — je nach Regulierung und Medienkompetenz. Aus einer ersten Perspektive betrachtet, ermöglicht das Internet breite Partizipation: Bürger können sich informieren, organisieren und ihre Stimme erheben. Dem steht die Beobachtung entgegen, dass Echokammern, Desinformation und die Macht einiger Plattformkonzerne demokratische Diskurse verzerren. Diese scheinbar widersprüchlichen Befunde lassen sich vereinbaren: Das Internet ist ein Werkzeug — seine demokratische Wirkung hängt von politischer Regulierung, Bildung und zivilgesellschaftlichem Engagement ab. Es wäre vereinfachend, das Internet pauschal als Bedrohung oder Heilsbringer zu bezeichnen. Abschließend lässt sich konstatieren: Eine differenzierte Medienpolitik ist die entscheidende Variable.",
rubric:{content:{weight:20,criteria:["Clear thesis","Evidence for perspective 1","Evidence for perspective 2","Genuine synthesis","Nuanced conclusion"]},language:{weight:40,criteria:["C1 vocabulary throughout","Nominalisierungen","Academic discourse markers","Complex sentence structures","Subjunctive for hedging","No colloquialisms"]},structure:{weight:25,criteria:["Clear paragraphs","Logical progression","Thesis maintained","Synthesis not just summary"]},grammar:{weight:15,criteria:["Konjunktiv I/II correct","Passive constructions","Participial phrases","Genitive constructions"]}},
wordCount:{min:220,max:280},
commonErrors:["No genuine synthesis (just summary)","Thesis not maintained throughout","C1 vocabulary absent — text reads like B1","No evidence to support claims"],
aiAssistRecommended:true,
aiAssistReason:"Academic register, thesis coherence, quality of synthesis, and C1-level complexity all require AI assessment to evaluate meaningfully."}
);

// ─── Helper functions ────────────────────────────────────────
window.DB_PROMPTS.speaking.byLevel = (level) => window.DB_PROMPTS.speaking.filter(p => p.level === level);
window.DB_PROMPTS.speaking.byId = (id) => window.DB_PROMPTS.speaking.find(p => p.id === id);
window.DB_PROMPTS.speaking.random = (level) => {
  const pool = level ? window.DB_PROMPTS.speaking.filter(p => p.level === level) : window.DB_PROMPTS.speaking;
  return pool[Math.floor(Math.random() * pool.length)];
};
window.DB_PROMPTS.speaking.needsAI = (level) => window.DB_PROMPTS.speaking.filter(p => p.level === level && p.aiAssistRecommended);

window.DB_PROMPTS.writing.byLevel = (level) => window.DB_PROMPTS.writing.filter(p => p.level === level);
window.DB_PROMPTS.writing.byId = (id) => window.DB_PROMPTS.writing.find(p => p.id === id);
window.DB_PROMPTS.writing.random = (level) => {
  const pool = level ? window.DB_PROMPTS.writing.filter(p => p.level === level) : window.DB_PROMPTS.writing;
  return pool[Math.floor(Math.random() * pool.length)];
};
window.DB_PROMPTS.writing.needsAI = (level) => window.DB_PROMPTS.writing.filter(p => p.level === level && p.aiAssistRecommended);

console.log('DB_PROMPTS loaded:',
  window.DB_PROMPTS.speaking.length, 'speaking prompts,',
  window.DB_PROMPTS.writing.length, 'writing prompts'
);

// ═══════════════════════════════════════════════
// v3.0 — MISSING PROMPTS
// ═══════════════════════════════════════════════

// A2 — info gap task (missing)
window.DB_PROMPTS.speaking.push({
  id:"sp_a2_003",level:"A2",part:"Teil 3",title:"Informationen austauschen — Reiseplan",timeMinutes:5,prepSeconds:30,
  prompt:"Du und dein Partner planen eine Reise. Du hast Karte A, dein Partner hat Karte B. Ihr habt verschiedene Informationen. Fragt einander und füllt die Lücken.",
  promptEn:"You and your partner are planning a trip. You have card A, your partner has card B. You have different information. Ask each other and fill in the gaps.",
  task:"Exchange travel information using question words and fill in all gaps.",
  phraseBank:["Weißt du, wann...?","Ich weiß, dass...","Hast du die Information über...?","Das weiß ich leider nicht.","Laut meiner Karte...","Kannst du mir sagen,...?"],
  requiredElements:["ask about departure","ask about price","ask about duration","provide own information","confirm information"],
  requiredPhrases:["Weißt du","Laut meiner","Kannst du mir sagen"],
  modelAnswer:"Weißt du, wann der Zug abfährt? — Laut meiner Karte fährt er um 9 Uhr ab. Und weißt du den Preis? — Das weiß ich leider nicht. Kannst du mir sagen, wie lange die Reise dauert?",
  rubric:{content:{weight:35,criteria:["Asks about departure","Asks about price","Provides own information","Confirms information"]},vocabulary:{weight:25,criteria:["Question structures","Travel vocabulary"]},grammar:{weight:25,criteria:["Correct question formation","Indirect questions with ob/wann"]},interaction:{weight:15,criteria:["Responds to partner","Asks for clarification"]}},
  wordCount:{min:40,max:100},
  commonErrors:["Forgetting to exchange information (only asking)","Not using Laut/weißt du structures"],
  aiAssistRecommended:false
});

// B2 — reflection task (missing)
window.DB_PROMPTS.speaking.push({
  id:"sp_b2_003",level:"B2",part:"Teil 3",title:"Reflexion — Sprachlernprozess",timeMinutes:8,prepSeconds:180,
  prompt:"Reflektiere über deinen eigenen Sprachlernprozess. Was hat dir geholfen? Was war schwierig? Wie hast du dich verbessert? Was würdest du anderen Lernenden empfehlen?",
  promptEn:"Reflect on your own language learning process. What helped you? What was difficult? How did you improve? What would you recommend to other learners?",
  task:"Structured personal reflection covering all four points with specific examples.",
  phraseBank:["Rückblickend kann ich sagen...","Was mir besonders geholfen hat...","Eine besondere Herausforderung war...","Im Laufe der Zeit habe ich gemerkt...","Anderen Lernenden würde ich empfehlen...","Ich würde es anders machen, indem..."],
  requiredElements:["what helped","what was difficult","how improved","recommendation for others"],
  requiredPhrases:["Rückblickend","Was mir geholfen hat","Eine Herausforderung war","würde ich empfehlen"],
  modelAnswer:"Rückblickend kann ich sagen, dass das regelmäßige Üben am wichtigsten war. Was mir besonders geholfen hat, waren Serien auf Deutsch. Eine besondere Herausforderung war die Grammatik, besonders die Fälle. Im Laufe der Zeit habe ich gemerkt, dass Fehler zum Lernen gehören. Anderen Lernenden würde ich empfehlen, täglich Deutsch zu hören.",
  rubric:{content:{weight:30,criteria:["What helped","What was difficult","How improved","Recommendation"]},language:{weight:30,criteria:["B2 vocabulary","Reflective language","Past tense use","Konjunktiv II for recommendations"]},structure:{weight:25,criteria:["Logical sequence","Personal examples","Specific details"]},fluency:{weight:15,criteria:["Speaks 3+ minutes","Natural delivery"]}},
  wordCount:{min:100,max:250},
  commonErrors:["Too vague — no specific examples","Not using Konjunktiv II for recommendations","Missing one of the four required elements"],
  aiAssistRecommended:true,
  aiAssistReason:"AI can assess whether the reflection is genuinely analytical versus superficial, and whether B2 register is maintained."
});

// B2 — report writing (missing)
window.DB_PROMPTS.writing.push({
  id:"wr_b2_002",level:"B2",type:"Bericht",title:"Bericht: Ergebnisse einer Umfrage",timeMinutes:40,
  prompt:"Schreib einen sachlichen Bericht (150–200 Wörter) über die Ergebnisse einer Umfrage zum Thema 'Jugendliche und Klimaschutz'. Nutze die folgenden Daten: 78% finden Klimaschutz wichtig; 45% ändern ihr Verhalten; 31% sind frustriert über Politik; 67% wollen mehr Aufklärung in der Schule.",
  promptEn:"Write a factual report (150–200 words) on the results of a survey on 'Young people and climate protection'. Use the following data: 78% find climate protection important; 45% change their behaviour; 31% are frustrated with politics; 67% want more education at school.",
  task:"Factual report presenting all four data points with analysis and a conclusion.",
  phraseBank:["Im Rahmen der Umfrage wurde festgestellt...","Laut den Ergebnissen...","Ein auffälliges Ergebnis ist...","Die Mehrheit der Befragten...","Bemerkenswert ist, dass...","Die Daten zeigen, dass...","Zusammenfassend lässt sich sagen..."],
  scaffold:"[Einleitung]: Im Rahmen einer Umfrage unter Jugendlichen wurde...\n[Hauptteil]: Laut den Ergebnissen...[4 Datenpunkte]\n[Analyse]: Ein auffälliges Ergebnis ist...\n[Schluss]: Zusammenfassend...",
  requiredElements:["introduction mentioning survey","data point 1 (78%)", "data point 2 (45%)","data point 3 (31%)","data point 4 (67%)","analysis","conclusion"],
  requiredPhrases:["Laut den Ergebnissen","Bemerkenswert ist","Zusammenfassend"],
  modelAnswer:"Im Rahmen einer Umfrage unter Jugendlichen wurden Einstellungen zum Klimaschutz untersucht. Laut den Ergebnissen halten 78% der Befragten Klimaschutz für wichtig. Allerdings geben nur 45% an, ihr eigenes Verhalten zu ändern. Bemerkenswert ist, dass 31% der Jugendlichen Frustration über die Politik äußern. Gleichzeitig wünschen sich 67% mehr Klimabildung in der Schule. Diese Diskrepanz zwischen Einstellung und Handeln ist aufschlussreich. Zusammenfassend lässt sich sagen, dass Jugendliche zwar klimabewusst sind, aber mehr Unterstützung durch Bildung und Politik benötigen.",
  rubric:{content:{weight:30,criteria:["Introduction","All 4 data points cited","Analysis of discrepancy","Clear conclusion"]},language:{weight:30,criteria:["Formal/neutral register","Reporting language: laut, bemerkenswert","Passive constructions","Complex sentences"]},structure:{weight:25,criteria:["Introduction-body-conclusion","Data presented logically","No personal opinions in main body"]},grammar:{weight:15,criteria:["Passive voice","Konjunktiv I for reported findings","Genitive used"]}},
  wordCount:{min:150,max:200},
  commonErrors:["Writing personal opinion instead of factual report","Not citing all four data points","Missing formal reporting language"],
  aiAssistRecommended:true,
  aiAssistReason:"AI can assess register consistency and whether the report maintains appropriate neutral tone throughout."
});

// B2 — cultural commentary (missing)
window.DB_PROMPTS.writing.push({
  id:"wr_b2_003",level:"B2",type:"Kommentar",title:"Kommentar: Kulturelles Phänomen",timeMinutes:40,
  prompt:"Schreib einen Kommentar (150–200 Wörter) zu folgendem Zitat: 'Sprache ist der Schlüssel zur Kultur.' Stimme zu oder widersprich. Belege deine Position mit konkreten Beispielen.",
  promptEn:"Write a commentary (150–200 words) on the following quote: 'Language is the key to culture.' Agree or disagree. Support your position with concrete examples.",
  task:"Opinion commentary on a quote with clear position, evidence, and conclusion.",
  phraseBank:["Das Zitat trifft meines Erachtens zu, weil...","Ich möchte diese These in Frage stellen.","Ein überzeugendes Beispiel dafür ist...","Man könnte zwar einwenden, dass...","Dies wird besonders deutlich, wenn man bedenkt...","Das Zitat beleuchtet einen wichtigen Aspekt..."],
  scaffold:"[Position zum Zitat]: Das Zitat... Ich bin der Meinung, dass...\n[Argument + Beispiel 1]: Erstens...\n[Argument + Beispiel 2]: Darüber hinaus...\n[Gegenargument + Entkräftung]: Man könnte einwenden...Dem lässt sich entgegnen...\n[Schluss]: Zusammenfassend...",
  requiredElements:["position stated","argument 1 with example","argument 2 with example","counter-argument addressed","conclusion"],
  requiredPhrases:["meines Erachtens","Ein Beispiel dafür","Man könnte einwenden","lässt sich entgegnen"],
  modelAnswer:"Das Zitat 'Sprache ist der Schlüssel zur Kultur' trifft meines Erachtens zu. Sprache trägt kulturelle Konzepte, die sich kaum übersetzen lassen. Ein Beispiel dafür ist das deutsche Wort 'Weltschmerz' — es beschreibt ein kulturspezifisches Lebensgefühl. Darüber hinaus ermöglicht Sprache Zugang zu Literatur, Humor und Traditionen. Man könnte zwar einwenden, dass man auch ohne Sprachkenntnisse Kunst oder Musik erleben kann. Dem lässt sich entgegnen, dass tiefes Kulturverständnis dennoch Sprache voraussetzt. Zusammenfassend: Sprache öffnet Türen, die anderen verschlossen bleiben.",
  rubric:{content:{weight:25,criteria:["Clear position on quote","2 arguments with examples","Counter-argument addressed","Conclusion"]},language:{weight:35,criteria:["B2 opinion vocabulary","Complex structures","Formal commentary register","No colloquialisms"]},structure:{weight:25,criteria:["Coherent argument structure","Position → evidence → rebuttal → conclusion"]},grammar:{weight:15,criteria:["Konjunktiv II for hypothetical","dass-clauses","Varied connectors"]}},
  wordCount:{min:150,max:200},
  commonErrors:["Not addressing a counter-argument","Informal register","No concrete examples","Position not clearly stated"],
  aiAssistRecommended:true,
  aiAssistReason:"AI can assess whether examples are genuinely apt and whether the rebuttal is logically convincing."
});

// C1 — analytical text (missing)
window.DB_PROMPTS.writing.push({
  id:"wr_c1_002",level:"C1",type:"Analyse",title:"Textanalyse: Politische Rede",timeMinutes:60,
  prompt:"Analysiere den folgenden fiktiven Auszug einer politischen Rede (220–280 Wörter): 'Wir stehen an einem Wendepunkt. Die alten Lösungen reichen nicht mehr aus. Nur wer bereit ist, Altes loszulassen, kann Neues gewinnen.' Analysiere Sprache, Argumentation, Rhetorik und Wirkung.",
  promptEn:"Analyse the following fictional extract from a political speech: 'We stand at a turning point. Old solutions are no longer sufficient. Only those ready to let go of the old can gain the new.' Analyse language, argumentation, rhetoric and effect.",
  task:"Academic text analysis covering language, rhetoric, argumentation, and effect — no personal opinion.",
  phraseBank:["Der Text lässt sich in folgende Aspekte gliedern:","Auf der sprachlichen Ebene fällt auf...","Rhetorisch bedient sich der Redner...","Die Argumentation folgt dem Schema...","Die intendierte Wirkung ist...","Durch die Verwendung von ... wird erreicht...","Besonders auffällig ist die Häufung von...","Dies erzeugt beim Rezipienten..."],
  scaffold:"[Einleitung — Kontext]: Der vorliegende Text ist...\n[Sprachliche Analyse]: Auf der sprachlichen Ebene...\n[Rhetorische Mittel]: Der Redner verwendet...\n[Argumentationsstruktur]: Die Argumentation...\n[Wirkung]: Die intendierte Wirkung...\n[Fazit]: Insgesamt lässt sich festhalten...",
  requiredElements:["introduction/context","language analysis","rhetorical devices","argumentation structure","intended effect","conclusion"],
  requiredPhrases:["Auf der sprachlichen Ebene","Rhetorisch","Die Argumentation","intendierte Wirkung","Insgesamt lässt sich"],
  modelAnswer:"Der vorliegende Text ist ein Auszug aus einer politischen Rede, der den Zuhörer zu Veränderungsbereitschaft aufrufen soll. Auf der sprachlichen Ebene fällt die Verwendung von Antithesen auf: 'altes Loslassen' versus 'Neues gewinnen'. Rhetorisch bedient sich der Redner der Anapher ('die alten Lösungen', 'Altes loszulassen') sowie des Dreisatzes. Die Argumentation folgt einer impliziten Wenn-dann-Struktur: Wandel wird als Notwendigkeit, nicht als Option dargestellt. Durch die Wahl des Begriffs 'Wendepunkt' wird eine Dringlichkeit erzeugt. Die intendierte Wirkung ist die Mobilisierung des Publikums durch das Gefühl kollektiver Verantwortung. Insgesamt lässt sich festhalten, dass der Text mit einfachen, aber wirksamen rhetorischen Mitteln ein Gemeinschaftsgefühl konstruiert.",
  rubric:{content:{weight:20,criteria:["Introduction","Language analysis","Rhetorical devices identified","Argumentation structure","Effect","Conclusion"]},language:{weight:40,criteria:["C1 academic register","Literary/analytical vocabulary","Passive and impersonal constructions","Nominalisierungen","No personal opinion intrusion"]},structure:{weight:25,criteria:["Analytical structure maintained","Evidence cited from text","Logical progression"]},grammar:{weight:15,criteria:["Passive constructions","Konjunktiv I for text claims","Genitive","Participial phrases"]}},
  wordCount:{min:220,max:280},
  commonErrors:["Mixing analysis with personal opinion","Not citing rhetorical devices by name","Failing to use academic register","No discussion of effect on audience"],
  aiAssistRecommended:true,
  aiAssistReason:"C1 text analysis requires assessment of academic register, depth of analysis, and correct use of literary/analytical terminology."
});

// C1 — synthesis task (missing)
window.DB_PROMPTS.writing.push({
  id:"wr_c1_003",level:"C1",type:"Synthese",title:"Synthese: Zwei Perspektiven auf Bildung",timeMinutes:70,
  prompt:"Synthetisiere die folgenden zwei Positionen zu einem kohärenten Text (250–300 Wörter): Position A: 'Bildung soll den Arbeitsmarkt vorbereiten.' Position B: 'Bildung soll zur Persönlichkeitsentwicklung beitragen.' Zeige Gemeinsamkeiten, Widersprüche und entwickle eine eigene, begründete Synthese.",
  promptEn:"Synthesise the following two positions into a coherent text: Position A: 'Education should prepare for the labour market.' Position B: 'Education should contribute to personal development.' Show common ground, contradictions and develop your own reasoned synthesis.",
  task:"Written synthesis showing both positions, their tension, common ground, and a reasoned original synthesis.",
  phraseBank:["Beiden Positionen gemeinsam ist...","Während Position A betont...","Position B hingegen hebt hervor...","Der scheinbare Widerspruch lässt sich auflösen...","Eine differenzierte Synthese würde lauten...","Jenseits dieser Dichotomie lässt sich argumentieren...","Die eigentliche Frage ist nicht ob...sondern wie..."],
  scaffold:"[Einleitung — Fragestellung]: Die vorliegende Frage...\n[Position A]: Befürworter des ersten Standpunkts...\n[Position B]: Demgegenüber betonen...\n[Gemeinsamkeiten]: Beiden Positionen ist gemeinsam...\n[Widerspruch]: Der zentrale Widerspruch liegt...\n[Synthese]: Eine differenzierte Synthese würde lauten...\n[Schluss]: ...",
  requiredElements:["framing of question","position A presented","position B presented","common ground identified","contradiction identified","original synthesis","conclusion"],
  requiredPhrases:["Beiden Positionen gemeinsam","Position A","Position B hingegen","lässt sich auflösen","Synthese"],
  modelAnswer:"Die Frage nach dem Zweck von Bildung ist grundlegend. Befürworter des ersten Standpunkts betonen, Bildung müsse konkrete Kompetenzen für den Arbeitsmarkt vermitteln. Position B hingegen hebt hervor, dass Bildung der Entfaltung des Individuums dienen soll. Beiden Positionen gemeinsam ist die Überzeugung, dass Bildung Zukunftsfähigkeit fördern soll. Der zentrale Widerspruch liegt in der Definition von Zukunftsfähigkeit: instrumentell-ökonomisch oder humanistisch-ganzheitlich. Eine differenzierte Synthese würde lauten: Bildung muss beides leisten — kritisches Denken als Grundlage sowohl beruflicher als auch persönlicher Entwicklung. Der scheinbare Widerspruch lässt sich auflösen, wenn man erkennt, dass persönlichkeitsbildende Kompetenzen langfristig auch arbeitsmarktrelevant sind. Die eigentliche Frage ist nicht ob, sondern wie diese Balance gestaltet wird.",
  rubric:{content:{weight:20,criteria:["Both positions fairly presented","Common ground identified","Contradiction named","Original synthesis developed","Conclusion"]},language:{weight:40,criteria:["C1 vocabulary","Nominalisierungen","Academic discourse markers","Hedging language","No colloquialisms","Precise formulation"]},structure:{weight:25,criteria:["Synthesis structure maintained","Not just summary","Genuine original argument"]},grammar:{weight:15,criteria:["Complex sentences","Konjunktiv II for hypotheticals","Passive","Genitive","Participial phrases"]}},
  wordCount:{min:250,max:300},
  commonErrors:["Writing a comparison instead of a synthesis","No original argument","Both positions presented but not synthesised","Register slips to B1 level"],
  aiAssistRecommended:true,
  aiAssistReason:"Synthesis requires genuine original argumentation beyond summary — only AI can assess whether a true synthesis (not just comparison) has been achieved."
});

// Rebuild helper functions (push adds to arrays, helpers still work)
window.DB_PROMPTS.speaking.byLevel = (level) => window.DB_PROMPTS.speaking.filter(p => p.level === level);
window.DB_PROMPTS.speaking.byId = (id) => window.DB_PROMPTS.speaking.find(p => p.id === id);
window.DB_PROMPTS.speaking.random = (level) => {
  const pool = level ? window.DB_PROMPTS.speaking.filter(p=>p.level===level) : window.DB_PROMPTS.speaking;
  return pool[Math.floor(Math.random()*pool.length)];
};
window.DB_PROMPTS.speaking.needsAI = (level) => window.DB_PROMPTS.speaking.filter(p=>p.level===level&&p.aiAssistRecommended);
window.DB_PROMPTS.writing.byLevel = (level) => window.DB_PROMPTS.writing.filter(p => p.level === level);
window.DB_PROMPTS.writing.byId = (id) => window.DB_PROMPTS.writing.find(p => p.id === id);
window.DB_PROMPTS.writing.random = (level) => {
  const pool = level ? window.DB_PROMPTS.writing.filter(p=>p.level===level) : window.DB_PROMPTS.writing;
  return pool[Math.floor(Math.random()*pool.length)];
};
window.DB_PROMPTS.writing.needsAI = (level) => window.DB_PROMPTS.writing.filter(p=>p.level===level&&p.aiAssistRecommended);

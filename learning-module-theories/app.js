// --- Language Toggle Logic ---
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('siteLang') || 'en';

const updateHtmlLanguage = () => {
    document.querySelectorAll('[data-en]').forEach(el => {
        // Only update innerHTML if it's not an input placeholder
        if(el.tagName !== 'INPUT' && el.tagName !== 'OPTION') {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        } else if (el.tagName === 'OPTION') {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        }
    });
    
    // Update placeholders
    document.querySelectorAll('input[placeholder][data-en], textarea[placeholder][data-en]').forEach(el => {
        el.setAttribute('placeholder', el.getAttribute(`data-${currentLang}`));
    });

    document.documentElement.lang = currentLang;
    langToggleBtn.textContent = currentLang === 'en' ? 'CZ' : 'EN';
    localStorage.setItem('siteLang', currentLang);
    
    // Force re-renders for currently active elements if needed
    // Lewin slider trigger
    const lewinEvt = new Event('input');
    document.getElementById('lewin-slider').dispatchEvent(lewinEvt);
    // Purpose select trigger
    const purposeEvt = new Event('change');
    document.getElementById('purpose-select').dispatchEvent(purposeEvt);
};

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'cz' : 'en';
    updateHtmlLanguage();
});


// 1. Piaget Simulator
const piagetBtns = document.querySelectorAll('.piaget-stage-btn');
const piagetOutput = document.getElementById('piaget-output');

const piagetData = {
    sensorimotor: {
        en: '<strong>Sensorimotor stage (0-2):</strong> Infants learn about the world through their senses and actions (grasping, looking). Object permanence develops.',
        cz: '<strong>Senzomotorické stádium (0-2):</strong> Kojenci se učí o světě prostřednictvím svých smyslů a akcí (uchopování, dívání se). Vyvíjí se stálost objektu.'
    },
    preoperational: {
        en: '<strong>Preoperational stage (2-7):</strong> Children think symbolically. Language develops, but thinking is still egocentric and lacks logical operations.',
        cz: '<strong>Předoperační stádium (2-7):</strong> Děti myslí symbolicky. Vyvíjí se řeč, ale myšlení je stále egocentrické a postrádá logické operace.'
    },
    concrete: {
        en: '<strong>Concrete Operational stage (7-11):</strong> Children begin to think logically about concrete events. They understand the concept of conservation.',
        cz: '<strong>Fáze konkrétních operací (7-11):</strong> Děti začínají logicky přemýšlet o konkrétních událostech. Chápou koncept zachování množství.'
    },
    formal: {
        en: '<strong>Formal Operational stage (11+):</strong> Adolescents begin to think abstractly and reason about hypothetical problems.',
        cz: '<strong>Formální operační stádium (11+):</strong> Dospívající začínají uvažovat abstraktně a přemýšlet o hypotetických problémech.'
    }
};

piagetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        piagetBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const stage = e.target.getAttribute('data-stage');
        piagetOutput.innerHTML = piagetData[stage][currentLang];
    });
});

// 2. Gopnik Hypothesis Sandbox
const gopnikBtn = document.getElementById('gopnik-test-btn');
const gopnikInput = document.getElementById('gopnik-hypothesis');
const gopnikResult = document.getElementById('gopnik-result');

gopnikBtn.addEventListener('click', () => {
    if(gopnikInput.value.trim() === '') {
        gopnikResult.textContent = currentLang === 'en' ? 'Please form a hypothesis first!' : 'Nejprve prosím vytvořte hypotézu!';
        return;
    }
    const msgEn = `Experiment completed! Result: The data confirms your hypothesis ("${gopnikInput.value}"). You have successfully updated your internal Bayesian model.`;
    const msgCz = `Experiment dokončen! Výsledek: Data potvrzují vaši hypotézu ("${gopnikInput.value}"). Úspěšně jste aktualizovali svůj vnitřní Bayesovský model.`;
    gopnikResult.textContent = currentLang === 'en' ? msgEn : msgCz;
});

// 3. Lewin Toggles
const lewinSlider = document.getElementById('lewin-slider');
const lewinOutput = document.getElementById('lewin-output');

const lewinData = {
    1: {
        en: '<strong>Autocratic:</strong> High productivity when leader is present, but low morale and high dependence.',
        cz: '<strong>Autokratický:</strong> Vysoká produktivita za přítomnosti vůdce, ale nízká morálka a vysoká závislost.'
    },
    2: {
        en: '<strong>Democratic:</strong> High student engagement, moderate to high productivity, high morale, and independent thinking.',
        cz: '<strong>Demokratický:</strong> Vysoké zapojení studentů, střední až vysoká produktivita, vysoká morálka a nezávislé myšlení.'
    },
    3: {
        en: '<strong>Laissez-Faire:</strong> Complete freedom. Can lead to low productivity and chaos unless students are highly motivated experts.',
        cz: '<strong>Laissez-Faire:</strong> Úplná svoboda. Může vést k nízké produktivitě a chaosu, pokud studenti nejsou vysoce motivovaní experti.'
    }
};

lewinSlider.addEventListener('input', (e) => {
    lewinOutput.innerHTML = lewinData[e.target.value][currentLang];
});

// 4. Rogers Journal (localStorage)
const rogersArea = document.getElementById('rogers-textarea');
const rogersSaveStatus = document.getElementById('rogers-save-status');

if(localStorage.getItem('rogersJournal')) {
    rogersArea.value = localStorage.getItem('rogersJournal');
}

let timeoutId;
rogersArea.addEventListener('input', () => {
    clearTimeout(timeoutId);
    rogersSaveStatus.textContent = currentLang === 'en' ? 'Saving...' : 'Ukládání...';
    timeoutId = setTimeout(() => {
        localStorage.setItem('rogersJournal', rogersArea.value);
        rogersSaveStatus.textContent = currentLang === 'en' ? 'Autosaved successfully.' : 'Úspěšně automaticky uloženo.';
        setTimeout(() => rogersSaveStatus.textContent = '', 2000);
    }, 1000);
});

// 5. SDT Checklist
const sdtChecks = document.querySelectorAll('.sdt-check');
const sdtFeedback = document.getElementById('sdt-feedback');

sdtChecks.forEach(check => {
    check.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.sdt-check:checked').length;
        if(checkedCount === 3) {
            sdtFeedback.textContent = currentLang === 'en' 
                ? 'Excellent! You have met all basic psychological needs for intrinsic motivation.' 
                : 'Výborně! Splnili jste všechny základní psychologické potřeby pro vnitřní motivaci.';
            sdtFeedback.style.color = 'var(--success-color)';
        } else if (checkedCount > 0) {
            sdtFeedback.textContent = currentLang === 'en' 
                ? `Good start. You are meeting ${checkedCount} out of 3 needs.` 
                : `Dobrý začátek. Naplňujete ${checkedCount} ze 3 potřeb.`;
            sdtFeedback.style.color = 'var(--accent-color)';
        } else {
            sdtFeedback.textContent = '';
        }
    });
});

// 6. Arendt & Biesta Purpose Mapping
const purposeSelect = document.getElementById('purpose-select');
const purposeOutput = document.getElementById('purpose-mapping-output');

const purposeData = {
    testing: {
        en: '<strong>Standardized Testing:</strong> Heavily focuses on <em>Qualification</em> (providing knowledge/skills for future roles). Low on Subjectification.',
        cz: '<strong>Standardizované testování:</strong> Silně se zaměřuje na <em>Kvalifikaci</em> (poskytování znalostí/dovedností pro budoucí role). Nízké zapojení Subjektifikace.'
    },
    civics: {
        en: '<strong>Community Service:</strong> High on <em>Socialization</em> (inserting individuals into existing social orders) and potentially <em>Subjectification</em> (becoming autonomous subjects).',
        cz: '<strong>Komunitní služby:</strong> Vysoké v <em>Socializaci</em> (začleňování jednotlivců do existujících společenských řádů) a potenciálně i <em>Subjektifikaci</em> (stávání se autonomními subjekty).'
    },
    art: {
        en: '<strong>Open-ended Art:</strong> Highly focuses on <em>Subjectification</em> (allowing the unique identity of the child to emerge, Arendt’s "natality").',
        cz: '<strong>Otevřené umělecké plátno:</strong> Vysoce se zaměřuje na <em>Subjektifikaci</em> (umožňuje vzniknutí unikátní identity dítěte, Arendtové "natalita").'
    }
};

purposeSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if(val === 'default') {
        purposeOutput.style.display = 'none';
    } else {
        purposeOutput.style.display = 'block';
        purposeOutput.innerHTML = purposeData[val][currentLang];
    }
});

// 7. Curriculum Mechanisms
const currBtns = {
    'curr-intended': {
        en: '<strong>Intended Curriculum:</strong> The official, documented goals, syllabi, and directives from the state or school board.',
        cz: '<strong>Zamýšlené kurikulum:</strong> Oficiální, dokumentované cíle, osnovy a směrnice od státu nebo školské rady.'
    },
    'curr-implemented': {
        en: '<strong>Implemented Curriculum:</strong> What the teacher actually translates into practice within the classroom.',
        cz: '<strong>Realizované kurikulum:</strong> To, co učitel skutečně překládá do praxe v rámci třídy.'
    },
    'curr-achieved': {
        en: '<strong>Achieved Curriculum:</strong> What the students actually learn and retain.',
        cz: '<strong>Dosažené kurikulum:</strong> To, co se studenti skutečně naučí a osvojí si.'
    },
    'curr-hidden': {
        en: '<strong style="color:#c0392b;">Hidden Curriculum:</strong> Unwritten, unofficial, and often unintended lessons, values, and perspectives that students learn.',
        cz: '<strong style="color:#e74c3c;">Skryté kurikulum:</strong> Nepsané, neoficiální a často nezamýšlené lekce, hodnoty a perspektivy, které si studenti osvojují.'
    }
};

const currOutput = document.getElementById('curr-output');

Object.keys(currBtns).forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        currOutput.innerHTML = currBtns[id][currentLang];
    });
});

// JSON Download for Assessment
const assessForm = document.getElementById('assessment-form');

assessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;

    const responses = {
        timestamp: new Date().toISOString(),
        studentLang: currentLang,
        q1_autonomy_response: q1,
        q2_lewin_response: q2,
        q3_hidden_curr_response: q3,
        rogers_journal_entry: localStorage.getItem('rogersJournal') || ''
    };

    const dataStr = JSON.stringify(responses, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_theories_assessment_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
});

// Expand Teacher Cheat Sheet on Print
const cheatSheetDetails = document.querySelector('.teacher-cheatsheet');
window.addEventListener('beforeprint', () => {
    if (cheatSheetDetails && !cheatSheetDetails.hasAttribute('open')) {
        cheatSheetDetails.setAttribute('open', 'true');
        cheatSheetDetails.dataset.wasClosed = 'true';
    }
});
window.addEventListener('afterprint', () => {
    if (cheatSheetDetails && cheatSheetDetails.dataset.wasClosed === 'true') {
        cheatSheetDetails.removeAttribute('open');
        delete cheatSheetDetails.dataset.wasClosed;
    }
});

// Run init language sync
updateHtmlLanguage();

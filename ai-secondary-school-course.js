document.addEventListener('DOMContentLoaded', () => {
    const decisions = [
        {
            label: { en: 'Decision 1', cz: 'Rozhodnutí 1' },
            title: {
                en: 'Jakub asks the chatbot to help with 3(x − 2) = 12. What do you suggest?',
                cz: 'Jakub požádá chatbota o pomoc s rovnicí 3(x − 2) = 12. Co mu doporučíte?'
            },
            context: {
                en: 'He is new to equations. The test is next week, and right now he wants to finish a practice sheet quickly.',
                cz: 'S rovnicemi teprve začíná. Test píše příští týden a teď chce rychle dokončit pracovní list.'
            },
            choices: [
                { text: { en: 'Ask AI for the complete solution, then copy the steps into the sheet.', cz: 'Požádat AI o celé řešení a opsat postup do pracovního listu.' }, correct: false,
                    feedback: { en: 'The sheet may look finished, but Jakub has practised copying a solution rather than recalling the steps. A correct-looking result does not show what he can do alone.', cz: 'Pracovní list může být hotový, Jakub si ale procvičil opisování řešení, ne vybavování postupu. Správně vypadající výsledek neukazuje, co zvládne samostatně.' } },
                { text: { en: 'Have him try the first step from memory, then ask AI for a hint if he gets stuck.', cz: 'Nechat ho zkusit první krok zpaměti a při záseku požádat AI o nápovědu.' }, correct: true,
                    feedback: { en: 'This keeps the important thinking with Jakub. A small hint can help him continue while still giving him practice retrieving and using what he knows.', cz: 'Důležité přemýšlení zůstává Jakubovi. Malá nápověda mu může pomoci pokračovat a zároveň si procvičuje vybavování a použití toho, co zná.' } },
                { text: { en: 'Tell him not to use AI at all, even after he has attempted the problem.', cz: 'Zakázat mu používat AI, i když se nejdřív pokusí příklad vyřešit.' }, correct: false,
                    feedback: { en: 'A blanket ban misses a chance to teach a useful role for AI. The key is to protect practice and understanding, then use the tool to support them.', cz: 'Úplný zákaz promarní příležitost ukázat užitečnou roli AI. Důležité je chránit procvičování a porozumění a teprve potom je nástrojem podpořit.' } }
            ]
        },
        {
            label: { en: 'Decision 2', cz: 'Rozhodnutí 2' },
            title: {
                en: 'The chatbot confidently says 3(x − 2) = 3x − 2. What should Jakub do next?',
                cz: 'Chatbot sebejistě tvrdí, že 3(x − 2) = 3x − 2. Co by měl Jakub udělat dál?'
            },
            context: {
                en: 'Jakub is still learning the distributive property. The answer sounds plausible, but the 3 has not been applied to both terms.',
                cz: 'Jakub se stále učí roznásobit závorku. Odpověď zní věrohodně, ale trojka nebyla vynásobena oběma členy.'
            },
            choices: [
                { text: { en: 'Accept it because the chatbot explains the step confidently.', cz: 'Přijmout odpověď, protože chatbot postup vysvětluje sebejistě.' }, correct: false,
                    feedback: { en: 'A confident tone is not evidence. If Jakub cannot check a basic step, he may carry a wrong rule into the test.', cz: 'Sebe jistý tón není důkaz. Pokud Jakub nedokáže ověřit základní krok, může si chybný postup odnést do testu.' } },
                { text: { en: 'Ask another chatbot the same question and use whichever answer comes back first.', cz: 'Zeptat se na totéž jiného chatbota a použít první odpověď.' }, correct: false,
                    feedback: { en: 'A second output may repeat the same error. Repeating a prompt is not a substitute for checking the maths.', cz: 'Druhý výstup může chybu zopakovat. Opakovat dotaz není náhrada za kontrolu matematiky.' } },
                { text: { en: 'Check the distribution and substitute a candidate answer into the original equation.', cz: 'Ověřit roznásobení a dosadit případné řešení do původní rovnice.' }, correct: true,
                    feedback: { en: 'Checking the rule and substituting into the original equation gives Jakub a way to catch the error. Critical use of AI depends on subject knowledge and verification, not trust in fluency.', cz: 'Kontrola pravidla a dosazení do původní rovnice pomohou Jakubovi chybu odhalit. Kritická práce s AI se opírá o znalosti předmětu a ověřování, ne o důvěru v plynulou odpověď.' } }
            ]
        },
        {
            label: { en: 'Decision 3', cz: 'Rozhodnutí 3' },
            title: {
                en: 'With AI open, Jakub gets most practice questions right. How will you check whether he is ready?',
                cz: 'S AI po ruce Jakub správně vyřeší většinu cvičných úloh. Jak ověříte, zda je připravený?'
            },
            context: {
                en: 'You need evidence of both what he can do independently and how he worked through a longer assignment.',
                cz: 'Potřebujete zjistit, co zvládne samostatně, i to, jak postupoval při delším úkolu.'
            },
            choices: [
                { text: { en: 'Grade only the completed AI-assisted practice sheet.', cz: 'Ohodnotit pouze hotový pracovní list vytvořený s pomocí AI.' }, correct: false,
                    feedback: { en: 'This measures the finished performance with assistance. It cannot tell you reliably whether Jakub can retrieve and apply the skills without that support.', cz: 'Tím měříte hotový výkon s pomocí. Spolehlivě z něj nezjistíte, zda Jakub dokáže znalosti vybavit a použít bez této podpory.' } },
                { text: { en: 'Check key skills briefly in class without AI, and review drafts or checkpoints for the longer assignment.', cz: 'Krátce ověřit Jakubovy dovednosti ve třídě bez AI a u delšího úkolu se soustředit na koncepty nebo průběžné kroky.' }, correct: true,
                    feedback: { en: 'A short independent check shows what Jakub can do on his own. Looking at the process of a longer task gives additional evidence without relying on unreliable AI-detection claims.', cz: 'Krátké samostatné ověření ukáže, co Jakub zvládne sám. Pohled na průběh delší práce přidá další důkazy a nespoléhá na nespolehlivé tvrzení, že lze AI použití vždy odhalit.' } },
                { text: { en: 'Run the submitted text through an AI detector and treat its score as proof.', cz: 'Ověřit odevzdaný text detektorem AI a jeho výsledek považovat za důkaz.' }, correct: false,
                    feedback: { en: 'AI-use detection is not a dependable substitute for assessment. Design the task to reveal learning: check essential knowledge and follow the work as it develops.', cz: 'Detekce AI není spolehlivou náhradou hodnocení. Navrhněte úkol tak, aby ukázal učení: ověřte klíčové znalosti a sledujte vznik práce.' } }
            ]
        },
        {
            label: { en: 'Decision 4', cz: 'Rozhodnutí 4' },
            title: {
                en: 'You are planning next week’s practice. What kind of AI support will you offer?',
                cz: 'Plánujete procvičování na příští týden. Jakou podporu AI nabídnete?'
            },
            context: {
                en: 'Your aim is not simply to make the worksheet easier. You want students to strengthen the basics and learn to judge AI output.',
                cz: 'Cílem není jen usnadnit práci. Chcete, aby si žáci upevnili základy a naučili se posuzovat výstupy AI.'
            },
            choices: [
                { text: { en: 'Let AI solve every problem so students can finish more questions.', cz: 'Dát žákům potřebný čas s jednoduchými úkoly a následně nechat AI vyřešit všechny těžké příklady, na kterých se hodina zasekne, aby žáci stihli plán.' }, correct: false,
                    feedback: { en: 'More completed questions may mean better immediate output, but students can become passive and miss the practice needed to build lasting knowledge.', cz: 'Více dokončených úloh může znamenat lepší okamžitý výsledek, žáci ale mohou zůstat pasivní a přijít o procvičování potřebné k vybudování trvalých znalostí.' } },
                { text: { en: 'Have students first solve a few problems unaided, then use AI for hints and ask them to verify one output.', cz: 'Nechat žáky nejprve samostatně vyřešit několik příkladů, poté použít AI pro nápovědy a ověřit jeden její výstup.' }, correct: true,
                    feedback: { en: 'This puts independent practice first, then makes AI a source of support that students must evaluate. The task and guidance shape whether the tool helps learning.', cz: 'Nejprve přichází samostatné procvičování, AI pak slouží jako zdroj podpory, který žáci musí vyhodnotit. O tom, zda nástroj pomáhá učení, rozhoduje zadání a vedení.' } },
                { text: { en: 'Allow AI only for students who already get every answer right.', cz: 'Povolit AI jen žákům, kteří už mají všechny odpovědi správně.' }, correct: false,
                    feedback: { en: 'Prior knowledge matters, but a simple pass-or-fail rule does not show students how to use AI critically. Structure the help as hints, checks, and reflection.', cz: 'Předchozí znalosti jsou důležité, jednoduché pravidlo správně/špatně ale žáky nenaučí kriticky pracovat s AI. Podporu nastavte jako nápovědy, kontroly a reflexi.' } }
            ]
        }
    ];

    const content = document.getElementById('decision-content');
    const feedbackBox = document.getElementById('feedback');
    const continueButton = document.getElementById('continue-button');
    const restartButton = document.getElementById('restart-button');
    const stepLabel = document.getElementById('step-label');
    const scoreLabel = document.getElementById('score-label');
    const progressTrack = document.getElementById('progress-track');
    const progressFill = document.getElementById('progress-fill');
    const languageButton = document.getElementById('lang-toggle');
    let currentStep = 0;
    let score = 0;

    const lang = () => document.documentElement.lang === 'cz' ? 'cz' : 'en';
    const words = {
        en: { score: 'Score', next: 'Continue', finish: 'See your result', restart: 'Start again', correct: 'Good call', rethink: 'Consider this consequence', complete: 'The story ends', resultHigh: 'You protected independent practice and used AI as a support for checking and feedback.', resultLow: 'The key idea is to keep learning visible: give students room to practise without AI, teach them to verify outputs, and assess essential knowledge directly.', resultScore: 'You chose the learning-supportive option in {score} of 4 decisions.' },
        cz: { score: 'Skóre', next: 'Pokračovat', finish: 'Zobrazit výsledek', restart: 'Začít znovu', correct: 'Dobrá volba', rethink: 'Zvažte tento důsledek', complete: 'Příběh končí', resultHigh: 'Ochránili jste samostatné procvičování a využili AI jako podporu pro kontrolu a zpětnou vazbu.', resultLow: 'Klíčové je zviditelnit učení: dát žákům prostor procvičovat bez AI, učit je ověřovat výstupy a přímo hodnotit základní znalosti.', resultScore: 'Volbu podporující učení jste zvolili v {score} ze 4 rozhodnutí.' }
    };

    function updateProgress() {
        const completed = Math.min(currentStep, decisions.length);
        const t = words[lang()];
        progressTrack.setAttribute('aria-valuenow', String(completed));
        progressFill.style.width = `${(completed / decisions.length) * 100}%`;
        scoreLabel.textContent = `${t.score}: ${score}`;
        if (currentStep < decisions.length) {
            stepLabel.textContent = `${decisions[currentStep].label[lang()]} ${currentStep + 1} ${lang() === 'cz' ? 'ze' : 'of'} ${decisions.length}`;
        }
    }

    function showDecision() {
        const t = words[lang()];
        const decision = decisions[currentStep];
        feedbackBox.hidden = true;
        feedbackBox.innerHTML = '';
        continueButton.hidden = true;
        restartButton.hidden = true;
        content.innerHTML = `
            <p class="decision-kicker">${decision.label[lang()]}</p>
            <h2 class="decision-title" id="decision-title">${decision.title[lang()]}</h2>
            <p class="decision-context">${decision.context[lang()]}</p>
            <div class="choice-list" role="group" aria-labelledby="decision-title">
                ${decision.choices.map((choice, index) => `
                    <button class="choice-button" type="button" data-choice="${index}">
                        <span class="choice-marker" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
                        <span>${choice.text[lang()]}</span>
                    </button>`).join('')}
            </div>`;

        content.querySelectorAll('.choice-button').forEach((button) => {
            button.addEventListener('click', () => selectChoice(Number(button.dataset.choice)));
        });
        updateProgress();
    }

    function selectChoice(choiceIndex) {
        const decision = decisions[currentStep];
        const choice = decision.choices[choiceIndex];
        const t = words[lang()];
        if (choice.correct) score += 1;
        content.querySelectorAll('.choice-button').forEach((button, index) => {
            button.disabled = true;
            if (decision.choices[index].correct) button.classList.add('is-correct');
            if (index === choiceIndex && !choice.correct) button.classList.add('is-incorrect');
        });

        feedbackBox.dataset.result = choice.correct ? 'correct' : 'incorrect';
        feedbackBox.innerHTML = `<strong>${choice.correct ? t.correct : t.rethink}</strong><p>${choice.feedback[lang()]}</p>`;
        feedbackBox.hidden = false;
        continueButton.textContent = currentStep === decisions.length - 1 ? t.finish : t.next;
        continueButton.hidden = false;
        continueButton.focus();
        updateProgress();
    }

    function showResult() {
        const t = words[lang()];
        const summary = score >= 3 ? t.resultHigh : t.resultLow;
        stepLabel.textContent = t.complete;
        progressTrack.setAttribute('aria-valuenow', String(decisions.length));
        progressFill.style.width = '100%';
        content.innerHTML = `
            <p class="decision-kicker">${t.complete}</p>
            <h2 class="decision-title">${t.resultScore.replace('{score}', score)}</h2>
            <p class="decision-context">${summary}</p>`;
        feedbackBox.hidden = true;
        continueButton.hidden = true;
        restartButton.hidden = false;
        restartButton.focus();
    }

    continueButton.addEventListener('click', () => {
        currentStep += 1;
        if (currentStep >= decisions.length) showResult();
        else showDecision();
    });

    restartButton.addEventListener('click', () => {
        currentStep = 0;
        score = 0;
        showDecision();
        content.querySelector('.choice-button')?.focus();
    });

    if (languageButton) languageButton.addEventListener('click', () => {
        window.setTimeout(() => {
            if (currentStep < decisions.length) showDecision();
            else showResult();
        }, 0);
    });

    showDecision();
});

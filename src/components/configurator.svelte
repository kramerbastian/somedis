<script lang="ts">
  import ChevronRight from './svelteIcons/chevron-right.svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { getConfiguratorSteps } from '../utils/configuratorSteps';
  import type { StepId, Steps } from '../utils/configuratorSteps';

  const steps = $state(getConfiguratorSteps());

  let currentStep = $state(steps.intro);
  let direction = $state(1);
  let history: StepId[] = [];
  let valid = $state(true);
  let loading = $state(false);

  function next() {
    direction = 1;

    if (currentStep.type != 'radio' || currentStep.value != undefined) {
      const selectedItem = currentStep.items?.find(
        (item) => item.value == currentStep.value,
      );
      console.log(selectedItem);
      if (selectedItem && selectedItem.next) {
        history.push(currentStep.id);
        currentStep = steps[selectedItem.next];
        return;
      } else if (currentStep.next) {
        history.push(currentStep.id);
        currentStep = steps[currentStep.next];
      } else {
        throw new Error('No path availible');
      }
    } else {
      valid = false;
    }
  }

  function prev() {
    direction = -1;
    if (history.length > 0) {
      currentStep = steps[history[history.length - 1]];
      history.pop();
    }
  }

  function handleKeypress(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      next();
    }
  }

  function evaluate(steps: Steps) {
    console.log(steps);
    let symptoms = 0;
    let consequences = 0;
    let timeCriterion = false;

    for (let key in steps) {
      const step = steps[key];

      if (!step.value) {
        continue;
      } else {
        if (step.id == 1 || step.id == 2 || step.id == 4 || step.id == 5) {
          symptoms += step.value;
        } else if (
          step.id == 3 ||
          step.id == 6 ||
          step.id == 7 ||
          step.id == 8 ||
          step.id == 9
        ) {
          consequences += step.value;
        } else if (step.id == 10 && step.value >= 3) {
          timeCriterion = true;
        }
      }
    }
    console.log(consequences);
    return {
      consequences,
      symptoms,
      socialMediaUseDisorder: consequences > 6 && symptoms > 8 && timeCriterion,
      hazardousSocialMediaUse: symptoms > 8,
      indicationOfNonspecificPsychologicalProblems: consequences > 6,
      timeCriterion,
    };
  }
</script>

<svelte:window on:keypress={handleKeypress} />

{#if currentStep.id == 'intro'}
  <footer
    class="fixed bottom-0 left-0 flex w-full flex-row gap-5 justify-between items-end px-8 sm:px-16 py-8 text-xs font-medium"
  >
    <div class="md:max-w-1/2">
      <a class="md:hidden block underline" href="/literatur"> Literatur </a>
      <p class="hidden md:block">
        Fragebogen nach: <a
          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8100192/"
          class="italic underline cursor-pointer"
          >Austermann, Paschke, Thomasius (2021).</a
        >
      </p>
      <p class="mt-1 hidden md:block">
        deutsche Übersetzung: <a
          href="https://cdn.sanity.io/files/72dc0gt7/production/215dc03f2bacd3a0acad4cdcca30f48893fbf2b0.pdf?dl=SOMEDIS-A.pdf"
          class="italic underline cursor-pointer"
          >Universitätsklinkum Hamburg-Eppendorf (2022).</a
        >
      </p>
    </div>
    <div class="flex gap-5">
      <a href="/impressum"> Impressum </a>
      <a href="/datenschutz"> Datenschutz </a>
    </div>
  </footer>
{/if}
{#if currentStep.id != 'intro' && currentStep.id != 'outro'}
  <div
    class="flex flex-row items-center justify-between absolute bottom-8 lg:bottom-32 left-0 gap-4 w-full px-8 sm:px-16 md:px-48 lg:px-64"
  >
    <button
      class="bg-black/5 hover:bg-black/10 font-semibold text-lg py-3 pr-8 pl-6 rounded-2xl flex flex-row items-center gap-2 cursor-pointer"
      onclick={prev}
    >
      <img src="/icons/chevron-right.svg" class="h-5 rotate-180" alt="left" />
      Zurück
    </button>
    <div class="relative">
      <button
        class="transition duration-1000 bg-black text-[#F9EBE0] font-semibold text-lg py-3 pl-8 pr-6 rounded-2xl flex flex-row items-center gap-2 cursor-pointer"
        onclick={next}
        type="submit"
      >
        Weiter
        <ChevronRight className="h-5" />
      </button>
      {#if !valid}
        <p
          class="text-red-800/60 font-medium text-sm absolute bottom-0 right-0 translate-y-full ml-2 text-nowrap"
        >
          Bitte prüfe deine Angaben.
        </p>
      {/if}
    </div>
  </div>
{/if}

{#key currentStep}
  {#if loading}
    <div
      class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-bg z-20"
    >
      <img
        src="/icons/spinner.svg"
        class="h-12 animate-spin"
        alt="loading..."
      />
    </div>
  {/if}
  <div
    class={`px-8 sm:px-16 md:px-48 lg:px-64 flex flex-col justify-between gap-8 lg:pt-16 absolute left-0`}
    in:fly={{ x: 300 * direction, duration: 300, easing: cubicOut }}
    out:fly={{ x: -300 * direction, duration: 300, easing: cubicOut }}
  >
    {#if currentStep.type == 'intro'}
      <h1 class="text-2xl font-bold">SOMEDIS-A</h1>
      <p class="text-sm md:text-base font-semibold -mt-6">
        <b>SO</b>cial <b>ME</b>dia <b>DI</b>sorder <b>S</b>cale for
        <b>A</b>dolescents
      </p>

      <p>
        {currentStep.description}
      </p>
      <p class="text-sm">
        <b>Hinweis:</b> Bei diesem Fragebogen handelt es sich um ein Screeningverfahren.
        Die Ergebnisse stellen keine klinische Diagnose dar. Eingetragene Informationen
        werden nicht gesammelt und verbleiben auf deinem Gerät.
      </p>

      <div class="flex flex-row items-center gap-6">
        <button
          class="transition duration-1000 bg-black text-[#F9EBE0] font-semibold text-lg py-3 pl-8 pr-6 rounded-2xl flex flex-row items-center gap-2 cursor-pointer"
          onclick={next}
          type="submit"
        >
          Start
          <ChevronRight className="h-5" />
        </button>
        <div class="flex flex-row gap-1 items-center font-medium text-sm">
          <img src="/icons/date.svg" class="h-5" alt="time" />
          ~5min
        </div>
      </div>
    {:else if currentStep.type == 'outro'}
      <div class="flex flex-col w-full h-full justify-center gap-2">
        <h2 class="text-xl font-semibold mt-6">Auswertung</h2>
        <p class="md:text-lg mt-2">
          Kognitiv-behaviorale Symptome: <b>{evaluate(steps)?.symptoms}</b>
        </p>
        <p class="md:text-lg">
          Negative Konsequenzen: <b>{evaluate(steps)?.consequences}</b>
        </p>
        <p class="md:text-lg border-b-2 border-black/10 pb-2">
          Zeitkriterium: <b
            >{evaluate(steps)?.timeCriterion ? 'erfüllt' : 'nicht erfüllt'}</b
          >
        </p>
        {#if evaluate(steps)?.socialMediaUseDisorder}
          <p class="mt-1">
            Deine Nutzung sozialer Medien zeigt Hinweise auf eine <b
              >mögliche Abhängigkeit</b
            >, da sowohl die Anzeichen für kognitiv-behaviorale Symptome als
            auch für negative Konsequenzen erfüllt sind und die Nutzung über
            einen längeren Zeitraum stattgefunden hat.
          </p>
        {:else if evaluate(steps)?.hazardousSocialMediaUse}
          <p class="mt-1">
            Deine Nutzung sozialer Medien weist <b>riskante Muster</b> auf, da kognitiv-behaviorale
            Symptome erkennbar sind. Dies kann ein erhöhtes Risiko für negative Folgen
            mit sich bringen.
          </p>
        {:else if evaluate(steps)?.indicationOfNonspecificPsychologicalProblems}
          <p class="mt-1">
            Deine Antworten deuten darauf hin, dass negative Konsequenzen
            auftreten, auch wenn keine starken kognitiv-behavioralen Symptome
            erkennbar sind. Dies kann auf <b
              >unspezifische psychische Belastungen</b
            >
            hinweisen, die weiter beobachtet werden sollten.
          </p>
        {:else}
          Deine Nutzung sozialer Medien zeigt aktuell <b
            >keine Hinweise auf riskante Nutzung oder Abhängigkeit.</b
          >
        {/if}
        <p class="text-sm mt-6">
          <b>Hinweis:</b> Bei diesem Fragebogen handelt es sich um ein Screeningverfahren.
          Die Ergebnisse stellen keine klinische Diagnose dar.
        </p>
      </div>
    {:else}
      <div>
        <h2 class="text-xl font-semibold">
          {currentStep.id}. {currentStep.heading}
        </h2>
        <p class="md:text-lg mt-2">
          {currentStep.description}
        </p>
        {#if currentStep.type == 'radio'}
          <div class="flex flex-col gap-4 mt-4">
            {#each currentStep.items as item}
              <label
                class="flex flex-row gap-3 text-lg font-medium items-center"
              >
                <input
                  class="appearance-none h-5 w-5 rounded-full border-2 border-black bg-black/10
                     checked:bg-black checked:[background-image:radial-gradient(#F9EBE0_40%,transparent_41%)]
                     checked:bg-center checked:bg-no-repeat checked:bg-[length:90%_90%]
                     transition-all"
                  type="radio"
                  value={item.value}
                  onclick={() => {
                    valid = true;
                  }}
                  bind:group={steps[currentStep.id].value}
                />

                {item.name}
                <span class="text-sm hidden sm:block">
                  {item.description}
                </span>
              </label>
            {/each}
          </div>
        {:else if currentStep.type == 'check'}
          <div class="flex flex-col gap-4 mt-4">
            {#each currentStep.items as item}
              <label
                class="flex flex-row gap-3 text-lg font-medium items-center"
              >
                <input
                  type="checkbox"
                  class="appearance-none h-6 w-6 border-2 border-black rounded-full bg-black/10
                         checked:bg-black
                         checked:[background-image:url('/icons/check-white.svg')]
                         checked:bg-center checked:bg-no-repeat checked:bg-[length:90%_90%]
                         transition-all duration-200"
                  value={item.name}
                  bind:group={steps[currentStep.id].value}
                />
                {item.name}
                <span class="text-sm hidden sm:block">
                  {item.description}
                </span>
              </label>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/key}

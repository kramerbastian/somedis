<script>
  import { slide } from 'svelte/transition';
  import { getLocalizedLink, supportedLocales } from '../utils/i18n';
  import { navigate } from 'astro:transitions/client';

  let { currentLanguage, currentRoute } = $props();

  let languageChange = $state(false);
  let nextLanguage = $state(currentLanguage);

  function getNextLanguage() {
    let currentLanguageIndex = supportedLocales.findIndex(
      (lang) => lang == currentLanguage,
    );
    if (currentLanguageIndex == -1) {
      currentLanguageIndex = 0;
    }
    if (currentLanguageIndex < supportedLocales.length - 1) {
      return supportedLocales[currentLanguageIndex + 1];
    } else {
      return supportedLocales[0];
    }
  }

  function onClick() {
    nextLanguage = getNextLanguage();
    languageChange = true;
    navigate(getLocalizedLink(currentRoute, getNextLanguage()));
    setTimeout(() => (languageChange = false), 1500);
  }
</script>

<button
  class="sm:h-16 sm:w-16 h-14 w-14 p-4 bg-black/5 hover:bg-black/10 transition rounded-full cursor-pointer relative"
  onclick={onClick}
>
  {#if languageChange}
    <span
      class="absolute top-1/2 left-1/2 -translate-1/2 sm:text-xl font-bold"
      transition:slide
    >
      {nextLanguage.toUpperCase()}
    </span>
  {:else}
    <img
      src="/icons/language.svg"
      alt="Language"
      class="absolute top-1/2 left-1/2 -translate-1/2"
      transition:slide
    />
  {/if}
</button>

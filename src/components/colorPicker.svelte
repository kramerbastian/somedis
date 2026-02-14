<script>
  import { setRandomColor } from '../utils/bg';

  let diceThrow = $state(false);

  function onClick() {
    diceThrow = true;
    setRandomColor();
    setTimeout(() => (diceThrow = false), 1000);
  }
</script>

<button
  id="color-picker"
  class="sm:h-16 sm:w-16 h-14 w-14 p-4 bg-black/5 hover:bg-black/10 transition rounded-full cursor-pointer"
  onclick={onClick}
>
  <img
    src="/icons/brush.svg"
    alt="Language"
    class={`h-full w-full ${diceThrow && 'animate-[spin_1s_ease-in-out_1]'}`}
  />
</button>

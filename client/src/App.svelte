<script lang="ts">

  import router from 'page'
  import company from "./pages/Company.svelte";
  import login from './pages/Login.svelte';
  import converters from './pages/StatusConverter.svelte';
  let page;

  router('/companies', (ctx) =>{
    page = company;
  })
  router('/login', (ctx) => {
    page = login;
  })
  router('/converters', (ctx) => {
    page = converters;
  })
  router.start()
</script>



<main>

  <svelte:component this={page} />
</main>

<style>
</style>
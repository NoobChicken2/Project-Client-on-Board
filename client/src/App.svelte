<script lang="ts">

  import router from 'page'
  import company from "./pages/Company.svelte";
  import login from './pages/Login.svelte'
  let page;

  router('/companies', (ctx) =>{
    page = company;
  })
  router('/login', (ctx) => {
    page = login;
  })
  router.start()
</script>



<main>

  <svelte:component this={page} />
</main>

<style>
</style>
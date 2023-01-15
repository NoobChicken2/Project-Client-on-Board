<script lang="ts">

  import router from 'page'
  import company from './pages/Company.svelte';
  import login from './pages/Login.svelte'
  import register from './pages/Customers.svelte'
  import ticket from './pages/Tickets.svelte'
  import converter from './pages/StatusConverter.svelte'
  import customerConverters from './pages/customerConverters.svelte'
    let currentRoute;
  import NavigationBar from "./components/NavigationBar.svelte";

  let page;
  let params;

  router('/companies', (ctx) =>{
    page = company;
  })
  router('/login', (ctx) => {
    page = login;
  })
  router('/customers', (ctx) =>{
      page = register;
  })
  router('/tickets', (ctx) =>{
      page = ticket;
  })
  router('/converters', (ctx) => {
      page = converter;
  })
  router('/customers/:id/converters', (ctx) => {
      page = customerConverters;
      currentRoute = ctx.pathname;
      params = ctx.params;
  })

  router.start()
</script>


<main>
<!--    <svelte:component this={page}/>-->
    <NavigationBar pageBody = {page}/>
<!--    <svelte:component this={page} />-->
</main>

<style>

</style>
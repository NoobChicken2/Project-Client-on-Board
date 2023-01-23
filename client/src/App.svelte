<script lang="ts">
    import router from 'page'

    import company from './pages/Company.svelte';
    import login from './pages/Login.svelte'
    import customers from './pages/Customers.svelte'
    import ticket from './pages/Tickets.svelte'
    import converter from './pages/StatusConverter.svelte'
    import customerConverters from './pages/customerConverters.svelte'
    import NavigationBar from "./components/NavigationBar.svelte";
    import customerTickets from "./pages/customerTickets.svelte";
    import converterLog from "./pages/ConverterLog.svelte";
    import main from './pages/Main.svelte';

    let currentRoute;
    let page;
    let params;

    router('/customer/:id', (ctx) => {
        page = customerTickets;
    })
    router('/companies', (ctx) =>{
        page = company;
    })
    router('/login', (ctx) => {
        page = login;
    })
    router('/customers', (ctx) =>{
        page = customers;
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
    router('/converters/:id/logs', (ctx) => {
        page = converterLog;
    })
    router('/', (ctx) => {
        page = main;
    })

    router.start();
</script>

<main>
    {#if page === login}
        <svelte:component this={page} />
    {:else}
        <NavigationBar pageBody = {page}/>
    {/if}
</main>

<style>

</style>
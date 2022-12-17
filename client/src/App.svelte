<script lang="ts">
    import NavigationBar from "./components/NavigationBar.svelte";
    import router from 'page'
    import statusConverter from "./Page/StatusConverter.svelte";
    import singleConverter from "./Page/SingleConverterPage.svelte";
    let page;

    router('/converterstatus', (ctx) => {
        page = statusConverter;
    })
    router('/converterinfo', (ctx) => {
        page = singleConverter;
    })
    router.start()
</script>
<main>
    <svelte:component this={page} />
</main>


<NavigationBar/>

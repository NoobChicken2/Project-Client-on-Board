<script>
    import NavigationBar from '../components/NavigationBar.svelte';

    let username = localStorage.getItem('username');
    let role = localStorage.getItem('role');

</script>

<NavigationBar />

<div class="container mh-100 bg-light mt-4">
    <!-- Navbar -->
<!--    <div class="container-fluid">-->
<!--        <p class="display-4 text-center">Welcome, {username}!</p>-->
<!--    </div>-->
<!--    <div class="mh-100 d-flex align-items-center justify-content-center bg-danger">-->
<!--        <div class="bg-black">-->
<!--            Text-->
<!--        </div>-->
<!--    </div>-->
</div>

<style>

</style>
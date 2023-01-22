<script>
    // import {username} from '../stores/store.ts';
    let username = localStorage.getItem('username');
    let collapseValue = "+";

    function collapseSpan(){
        if (collapseValue === "+") {
            collapseValue = "-";
        } else {
            collapseValue = "+";
        }
    }

</script>
<!-- Navbar -->

<style>

</style>
<script>
    import {afterUpdate} from "svelte";

    export let username;

    afterUpdate(() => {
        let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
        let dropdownList = dropdownTriggerList.map(function(element){
            return new bootstrap.Popover(element);
        });
    });
    document.addEventListener("DOMContentLoaded", function(){

    });

</script>

<div class="container mh-100 bg-light mt-4">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <!-- Container wrapper -->
        <div class="container-fluid">
            <!-- Navbar brand -->
            <p class="navbar-brand mb-0">Welcome, {username}!</p>
            <!-- Right elements -->
            <div class="d-flex align-items-center">
                <!-- Notifications  (NEEDS TO BE CHANGED AFTER WE HAVE A WAY TO GET TICKETS) -->
                <div class="dropdown">
                    <a
                            class="btn shadow-none bg-light dropdown-toggle d-flex align-items-center pe-auto pb-0 me-2 mb-0 mt-1"
                            href="#"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                    >
                        <p>Notifications</p>
                        <span class="badge rounded-pill badge-notification bg-danger">0</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <a class="dropdown-item" href="#">Smth</a>
                    </div>
                </div>
                <!-- Avatar (WILL BE CHANGED)-->
                <div class="dropdown">
                    <a
                            class="dropdown-toggle d-flex align-items-center"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                    >
                        <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                class="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                        />
                    </a>
                    <div class="dropdown-menu dropdown-menu-end mt-3 ms-4" aria-labelledby="navbarDropdownMenuAvatar">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <a class="dropdown-item" href="#">Smth</a>
                    </div>
                </div>
                <!-- Avatar -->
            </div>
            <!-- Right elements -->
        </div>
        <!-- Container wrapper -->
    </nav>
</div>

<style>
    .dropdown-toggle::after {
        content: none;
    }
</style>
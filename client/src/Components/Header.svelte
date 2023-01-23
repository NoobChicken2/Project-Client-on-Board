<script>
    import {afterUpdate, onMount} from "svelte";
    import {apiData} from "../stores/store";
    import {loadTickets} from "../scripts/ticketScript.ts";

    export let username;

    onMount(loadTickets);

    afterUpdate(() => {
        let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
        let dropdownList = dropdownTriggerList.map(function (element) {
            return new bootstrap.Popover(element);
        });
    });
    document.addEventListener("DOMContentLoaded", function () {

    });

    function redirectToTickets() {
        window.location.href="/tickets"
    }

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
                <!-- Notifications -->
                {#if localStorage.getItem('role') === 'CompanyAdmin' || localStorage.getItem('role') === 'Client'}
                    <div class="dropdown">
                        <a class="btn shadow-none bg-light dropdown-toggle d-flex align-items-center pe-auto pb-0 me-2 mb-0 mt-1"
                           href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <p>Notifications</p>
                            <span class="badge rounded-pill badge-notification bg-danger">{$apiData.length }</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <table>
                                <thead>
                                <tr>
                                    <th class="notification-column">Converter ID</th>
                                    <th class="notification-column">Issue</th>
                                </tr>
                                </thead>
                                <tbody>
                                {#each $apiData as Ticket}
                                    <tr on:click={redirectToTickets} class="clickable-row">
                                        <td class="notification-column">{Ticket.converter_id}</td>
                                        <td class="notification-column">{Ticket.log_event}</td>
                                    </tr>
                                {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                {/if}
                <!-- Avatar (WILL BE CHANGED)-->
                <!--                <div class="dropdown">-->
                <!--                    <a-->
                <!--                            class="dropdown-toggle d-flex align-items-center"-->
                <!--                            href="#"-->
                <!--                            id="navbarDropdownMenuAvatar"-->
                <!--                            data-bs-toggle="dropdown"-->
                <!--                            aria-expanded="false"-->
                <!--                    >-->
                <!--                        <img-->
                <!--                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"-->
                <!--                                class="rounded-circle"-->
                <!--                                height="25"-->
                <!--                                alt="Black and White Portrait of a Man"-->
                <!--                                loading="lazy"-->
                <!--                        />-->
                <!--                    </a>-->
                <!--                    <div class="dropdown-menu dropdown-menu-end mt-3 ms-4" aria-labelledby="navbarDropdownMenuAvatar">-->
                <!--                        <a class="dropdown-item" href="#">Action</a>-->
                <!--                        <a class="dropdown-item" href="#">Another action</a>-->
                <!--                        <a class="dropdown-item" href="#">Something else here</a>-->
                <!--                        <a class="dropdown-item" href="#">Smth</a>-->
                <!--                    </div>-->
                <!--                </div>-->
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

    .notification-column {
        padding: 10px;
    }


    tr.clickable-row:hover {
        background-color: #f5f5f5;
        color: #00f;
        cursor: pointer;

    }

    tr.clickable-row {
        border-bottom: 1px solid #ddd;
        transition: background-color 0.2s ease-in-out;
        animation: hover-effect 0.2s ease-in-out;
    }
    @keyframes hover-effect {
        from {
            background-color: transparent;
        }
        to {
            background-color: #f5f5f5;
        }
    }


    .dropdown-menu {
        max-width: 300px;
        min-width: 150px;
    }



    @media only screen and (min-width: 768px) {
        .dropdown-menu {
            width: 300px;
        }
    }


    .dropdown-menu {
        right: 0;
        left: auto;
    }

</style>
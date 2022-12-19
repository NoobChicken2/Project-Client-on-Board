<script>
    import NavigationBar from "../components/NavigationBar.svelte";
    import { Popover } from 'sveltestrap';
    import {onMount} from "svelte";
    import {loadTickets} from "../scripts/ticketScript.ts";
    import {apiData} from "../stores/store.ts";

    const myInput = document.getElementById('myInput');

    onMount(loadTickets)

</script>

<NavigationBar/>

<body>
    <div class="p-5 my-4 bg-light rounded-3 container">

        <!-- Page Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Tickets List</a>
        </nav>

        <!-- Table of tickets -->
        <table style="text-align: left" class="table table-hover" id="table__tickets">
            <thead class= "table-dark">
                <tr>
                    <th style="width: 50px" scope="col"></th>
                    <th style="width: 100px" scope="col">#id</th>
                    <th style="width: 300px" scope="col">Title</th>
                    <th style="width: 150px" scope="col">LogID</th>
                    <th style="width: 200px" scope="col">Date</th>
                    <th style="width: 50px" scope="col"></th>
                </tr>
            </thead>
            <tbody>

            {#each $apiData as Ticket}
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">{Ticket.ticket_id}</th>
                    <td>Test</td>
                    <td>{Ticket.log_id}</td>
                    <td>{Ticket.created_at}</td>
                    <button type="button" id="ticket-popover" class="bi bi-card-text btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
            {/each}

            </tbody>
        </table>

        <Popover placement="left" target="ticket-popover">
            <div slot="title">
                <b>Title</b>
            </div>
            <div>Description</div>
            <div>Status</div>
            <div>Date</div>
        </Popover>

    </div>
</body>

<style>
    main{
        top: 50px;
        left: 150px;
        position: absolute;
    }

    /*.popover{*/
    /*    width: 200px;*/
    /*    height: 200px;*/
    /*}*/

</style>
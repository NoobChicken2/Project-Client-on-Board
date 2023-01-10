<script>
    import NavigationBar from "../components/NavigationBar.svelte";
    import {afterUpdate, onMount} from "svelte";
    import {loadTickets} from "../scripts/ticketScript.ts";
    import {apiData} from "../stores/store.ts";

    onMount(loadTickets)

    afterUpdate(() => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function(element){
            return new bootstrap.Popover(element);
        });
        console.log("Test 1")
    });
    document.addEventListener("DOMContentLoaded", function(){

    });


</script>

<NavigationBar/>

<body>

    <div class="p-5 my-4 bg-light rounded-3 container">

        <!-- Page Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Tickets List</a>
        </nav>

        <!-- Table of tickets -->
        <table style="text-align: left" class="table table-hover; table-striped" id="table__tickets">
            <thead class= "table-dark">
                <tr>

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
                    <th scope="row">{Ticket.ticket_id}</th>
                    <td>Test</td>
                    <td>{Ticket.log_id}</td>
                    <td>{Ticket.created_at}</td>
                    <td>
                        <button  type="button"  class="bi bi-card-text btn-outline-dark"
                                 data-bs-toggle="popover" data-bs-placement="left"

                                 title="Popover title" data-bs-content="Popover on left."
                        ></button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
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
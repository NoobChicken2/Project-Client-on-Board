<script>
    import {afterUpdate, onMount} from "svelte";
    import {loadTickets} from "../scripts/ticketScript.ts";
    import {apiData} from "../stores/store.ts";

    onMount(loadTickets)

    afterUpdate(() => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function(element){
            return new bootstrap.Popover(element);
        });
    });
    document.addEventListener("DOMContentLoaded", function(){

    });
    $: console.log($apiData);
</script>


<body>
    <div class="p-4 my-4 bg-light rounded- container">

        <!-- Table of tickets -->
        <table style="text-align: left" class="table table-hover" id="table__tickets">
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
                    <td>{Ticket.log_event}</td>
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

    body, div {
        background: url("../lib/Image 2.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-x: hidden;
        height: 100vh;
    }

    main{
        top: 50px;
        left: 150px;
        position: absolute;
    }

    table{
        color: azure;
    }


    /*.popover{*/
    /*    width: 200px;*/
    /*    height: 200px;*/
    /*}*/

</style>